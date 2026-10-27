/* ==========================================================================
   moderador-preventivo.js
   --------------------------------------------------------------------------
   El filtro anti-acoso y de datos personales, la pausa reflexiva, la cola de
   reportes y la bitácora auditable. Es la parte preventiva del algoritmo:
   nada se publica sin pasar por aquí.
   ========================================================================== */

'use strict';

/* Los patrones que nunca deberían salir en un hilo público. */
var PATRONES_PRIVADOS = [
  { tipo: 'celular', aviso: 'un número de celular', regex: /(^|[^0-9])(3[0-9]{2}[ .-]?[0-9]{3}[ .-]?[0-9]{4})(?![0-9])/g },
  { tipo: 'documento', aviso: 'un documento de identidad', regex: /(^|[^0-9])((?:TI|CC|T\.I\.|P\.P\.T\.)\s*[:.]?\s*[0-9]{6,11})(?![0-9])/gi },
  { tipo: 'documento', aviso: 'un número de documento', regex: /(^|[^0-9])([0-9]{8,11})(?![0-9])/g },
  { tipo: 'correo', aviso: 'un correo personal', regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g },
  { tipo: 'direccion', aviso: 'una dirección', regex: /(?:calle|cll|carrera|cra|kr|diagonal|transversal)\s*[0-9]{1,3}\s*[#-]?\s*[0-9]{0,3}/gi }
];

/* Palabras que disparan la alerta alta: amenaza, acoso o pelea. */
var PALABRAS_ALTAS = ['amenaza', 'amenazo', 'acoso', 'acosar', 'pelea', 'pelear', 'golpear', 'matar', 'muerte', 'extorsion', 'te voy a', 'voy a romper', 'venganza'];

/* Palabras de alerta media: burla o insulto. */
var PALABRAS_MEDIAS = ['burla', 'burlar', 'insulto', 'insultar', 'idiota', 'estupido', 'estupida', 'tonto', 'tonta', 'bobo', 'bruto', 'perra', 'marica', 'fea', 'gordo', 'gorda', 'loser'];

/** Tapa un dato sensible dejando apenas una pista. */
function mascararDato(t) {
  var limpio = String(t || '').trim();
  if (limpio.length <= 3) return '•••';
  return limpio.slice(0, 2) + '•••••' + limpio.slice(-1);
}

/**
 * Paso 1 del algoritmo: busca celulares, documentos, correos y direcciones.
 * Devuelve la primera coincidencia con el dato ya enmascarado.
 */
function detectarDatosPrivados(texto) {
  var limpio = String(texto || '');
  for (var i = 0; i < PATRONES_PRIVADOS.length; i++) {
    var patron = PATRONES_PRIVADOS[i];
    patron.regex.lastIndex = 0;
    var hallado = patron.regex.exec(limpio);
    if (hallado) {
      var dato = hallado[2] || hallado[1] || hallado[0];
      return {
        encontrado: true,
        tipo: patron.tipo,
        aviso: patron.aviso,
        mascara: mascararDato(dato),
        mensaje: 'Por tu protección, no publiques números de celular ni documentos de identidad en hilos públicos.'
      };
    }
  }
  return { encontrado: false, tipo: '', aviso: '', mascara: '', mensaje: '' };
}

/**
 * Paso 2: nivel de alerta del lenguaje.
 * ALTO cuando hay amenaza o acoso; MEDIO cuando hay burla o gritos.
 */
function analizarLenguaje(texto) {
  var limpio = PIA.normalizar(texto);
  var hallazgos = [];
  var nivel = 'BAJO';
  PALABRAS_ALTAS.forEach(function (p) {
    if (limpio.indexOf(PIA.normalizar(p)) !== -1 && hallazgos.indexOf(p) === -1) {
      hallazgos.push(p);
      nivel = 'ALTO';
    }
  });
  PALABRAS_MEDIAS.forEach(function (p) {
    if (limpio.indexOf(PIA.normalizar(p)) !== -1 && hallazgos.indexOf(p) === -1) {
      hallazgos.push(p);
      if (nivel !== 'ALTO') nivel = 'MEDIO';
    }
  });
  var letras = String(texto || '').replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ]/g, '');
  var mayusculas = String(texto || '').replace(/[^A-ZÁÉÍÓÚÑ]/g, '');
  if (letras.length > 12 && mayusculas.length / letras.length > 0.7) {
    if (nivel !== 'ALTO') nivel = 'MEDIO';
    hallazgos.push('texto en mayúsculas sostenidas');
  }
  if (/[!?]{3,}/.test(String(texto || ''))) {
    if (nivel === 'BAJO') nivel = 'MEDIO';
    hallazgos.push('signos repetidos');
  }
  return { nivel: nivel, hallazgos: hallazgos, puntaje: hallazgos.length };
}

/** Etiqueta de color según el nivel de alerta. */
function badgeNivel(nivel) {
  var clase = nivel === 'ALTO' ? 'mal' : nivel === 'MEDIO' ? 'warn' : 'ok';
  return '<span class="badge ' + clase + '">' + nivel + '</span>';
}

/** Paso 3: pausa reflexiva antes de publicar. */
function mostrarPausaReflexiva(datos, analisis) {
  window.__pausaDatos = datos;
  var fuerte = analisis.nivel === 'ALTO';
  var marcas = analisis.hallazgos.map(function (x) { return '<span class="badge mal">' + PIA.esc(x) + '</span>'; }).join(' ');
  var cuerpo = '<div class="aviso ' + (fuerte ? 'mal' : 'warn') + '"><b>' + (fuerte ? 'Pausa reflexiva' : 'Revisa tu texto') + '.</b> ' +
    'Detectamos expresiones que podrían afectar la convivencia lolista. Por favor reformula tu idea con respeto antes de publicar.</div>' +
    '<p class="pequeno gris">Marcas encontradas: ' + (marcas || 'tono agresivo') + '</p>' +
    '<p class="pequeno">Consejo: describe el hecho y no a la persona. «Me molestó que…» funciona mejor que un insulto.</p>' +
    (fuerte ? '<p class="pequeno gris">Con alerta alta no hay opción de continuar: el contenido no se guarda.</p>' : '');
  var botones = '<button class="btn" onclick="descartarPausa()">Reformular</button>';
  if (!fuerte) botones += '<button class="btn pel" onclick="publicarPeseAlAviso()">Publicar de todos modos</button>';
  PIA.modal('Antes de publicar', cuerpo, botones);
}

/** Descarta el borrador detenido por la pausa reflexiva. */
function descartarPausa() {
  window.__pausaDatos = null;
  PIA.cerrarModal();
  PIA.toast('Reformula tu texto y vuelve a intentarlo.', 'warn');
}

/** Publica el borrador cuando la alerta era media y la persona decide seguir. */
function publicarPeseAlAviso() {
  var datos = window.__pausaDatos;
  window.__pausaDatos = null;
  PIA.cerrarModal();
  if (datos) guardarPublicacion(datos);
}

/** Informe de análisis reutilizable en el feed y en moderación. */
function informeAnalisis(texto) {
  var privado = detectarDatosPrivados(texto);
  var analisis = analizarLenguaje(texto);
  var html = '<div class="rejilla g2">';
  html += '<div class="aviso ' + (privado.encontrado ? 'mal' : 'ok') + '"><b>Datos privados:</b> ' +
    (privado.encontrado ? 'se detectó ' + PIA.esc(privado.aviso) + ' (' + PIA.esc(privado.mascara) + ')' : 'no se detectaron celulares, documentos, correos ni direcciones') + '.</div>';
  html += '<div class="aviso ' + (analisis.nivel === 'ALTO' ? 'mal' : analisis.nivel === 'MEDIO' ? 'warn' : 'ok') + '"><b>Nivel de alerta:</b> ' +
    analisis.nivel + (analisis.hallazgos.length ? ' · ' + analisis.hallazgos.map(function (x) { return PIA.esc(x); }).join(', ') : ' · sin expresiones hostiles') + '.</div>';
  html += '</div>';
  html += '<p class="pequeno gris">' + PIA.palabras(texto) + ' palabras. ' +
    (privado.encontrado ? 'La publicación se bloquearía de inmediato.' :
      analisis.nivel === 'ALTO' ? 'Se abriría la pausa reflexiva y no se publicaría.' :
        analisis.nivel === 'MEDIO' ? 'Se pediría reformular, con opción de continuar.' :
          'El texto pasaría el filtro sin problemas.') + '</p>';
  return html;
}

/** Panel de análisis en vivo del formulario del feed. */
function pintarPanelAnalisis() {
  var panel = document.getElementById('panelAnalisis');
  if (!panel) return;
  var texto = (PIA.valor('fTitulo') + ' ' + PIA.valor('fContenido')).trim();
  if (!texto) { panel.innerHTML = ''; return; }
  var r = informeAnalisis(texto);
  var caja = document.getElementById('fAviso');
  if (caja && caja.checked) {
    var u = usuarioActual();
    if (!u || !puede('publicar_aviso', u.rol)) {
      r += '<div class="aviso warn pequeno">Marcaste «Aviso Oficial Verificado», pero tu rol no puede publicarlos. La publicación se guardará como hilo normal o será rechazada.</div>';
    }
  }
  panel.innerHTML = r;
}

/* ---------------- Cola de reportes y bitácora ---------------- */

/** Etiqueta del estado de un reporte. */
function badgeEstadoReporte(estado) {
  var clase = estado === 'PENDIENTE' ? 'warn' : estado === 'EN_REVISION' ? 'info' : estado === 'RESUELTO_OCULTO' ? 'mal' : 'neutro';
  var texto = estado === 'RESUELTO_OCULTO' ? 'Resuelto con ocultamiento' : estado === 'EN_REVISION' ? 'En revisión' : (estado || 'Pendiente');
  return '<span class="badge ' + clase + '">' + PIA.esc(texto) + '</span>';
}

/** Pinta la cola de reportes, los indicadores y los filtros. */
function pintarModeracion() {
  var cont = document.getElementById('colaReportes');
  if (!cont) return;
  var aviso = document.getElementById('moderacionAviso');
  var u = usuarioActual();
  if (!u || !puede('moderar', u.rol)) {
    if (aviso) aviso.innerHTML = '<div class="aviso mal">Esta cola es solo para docentes, moderadores y administradores. <a href="index.html">Ingresa con tu rol</a>.</div>';
    cont.innerHTML = '<div class="vacio">No tienes permisos para ver la cola de reportes.</div>';
    ['mPendientes', 'mOcultas', 'mResueltos', 'mTotal'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = '—';
    });
    return;
  }
  if (aviso) aviso.innerHTML = '<div class="aviso ok pequeno">Moderando como <b>' + PIA.esc(u.username_publico) + '</b> ' + badgeRol(u.rol) + '. Cada decisión queda en la bitácora.</div>';
  var reportes = PIA.listar('reportes');
  var pubs = publicaciones();
  document.getElementById('mPendientes').textContent = reportes.filter(function (r) { return r.estado === 'PENDIENTE'; }).length;
  document.getElementById('mOcultas').textContent = pubs.filter(function (p) { return p.estado === 'OCULTO_MODERACION'; }).length;
  document.getElementById('mResueltos').textContent = reportes.filter(function (r) { return r.estado === 'RESUELTO_OCULTO' || r.estado === 'ARCHIVADO'; }).length;
  document.getElementById('mTotal').textContent = reportes.length;

  var estado = PIA.valor('mEstadoFiltro');
  var motivo = PIA.valor('mMotivoFiltro');
  var lista = reportes.filter(function (r) {
    if (estado && r.estado !== estado) return false;
    if (motivo && r.motivo !== motivo) return false;
    return true;
  }).sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });

  cont.innerHTML = PIA.tabla(
    ['Publicación', 'Motivo', 'Reporta', 'Fecha', 'Estado', ''],
    lista.map(function (r) {
      return [
        '<span class="mono">' + PIA.esc(r.codigo_pub) + '</span>',
        PIA.esc(r.motivo) + (r.detalle ? '<br><span class="pequeno gris">' + PIA.esc(r.detalle.slice(0, 80)) + '</span>' : ''),
        PIA.esc(r.reportado_por),
        PIA.fechaHora(r.fecha),
        badgeEstadoReporte(r.estado) + (r.moderador ? '<br><span class="pequeno gris">' + PIA.esc(r.moderador) + '</span>' : ''),
        '<div class="acciones"><button class="btn pq" onclick="abrirCaso(' + r.id + ')">Revisar</button>' +
        (r.id_publicacion && publicacionPorId(r.id_publicacion) ? '<button class="btn pq" onclick="abrirPublicacion(' + r.id_publicacion + ')">Ver hilo</button>' : '') +
        '</div>'
      ];
    }),
    { vacio: 'No hay reportes con esos filtros.' }
  );
}

/** Abre un caso de moderación con la publicación reportada. */
function abrirCaso(id) {
  var r = PIA.listar('reportes').filter(function (x) { return Number(x.id) === Number(id); })[0];
  if (!r) return;
  var pub = publicacionPorId(r.id_publicacion);
  var cuerpo = '<div class="fila" style="margin-bottom:10px">' + badgeEstadoReporte(r.estado) +
    '<span class="badge neutro">' + PIA.esc(r.motivo) + '</span></div>' +
    '<p class="pequeno gris">Reportado por ' + PIA.esc(r.reportado_por) + ' el ' + PIA.fechaHora(r.fecha) + '</p>' +
    '<p style="background:#f8fafc;border-radius:9px;padding:12px;font-size:13px">' + PIA.esc(r.detalle || 'Sin detalle adicional.') + '</p>';
  if (pub) {
    cuerpo += '<h3>Publicación reportada</h3>' +
      '<p class="pequeno"><b>' + PIA.esc(pub.codigo) + ' · ' + PIA.esc(pub.titulo) + '</b> · por ' + PIA.esc(pub.autor_publico) + '</p>' +
      '<p style="background:#f8fafc;border-radius:9px;padding:12px;font-size:13px;white-space:pre-wrap">' + PIA.esc(pub.contenido) + '</p>';
  } else {
    cuerpo += '<div class="aviso warn">La publicación reportada ya no existe.</div>';
  }
  cuerpo += '<div class="campo"><label for="mDecision">Decisión</label><select id="mDecision">' +
    '<option value="OCULTAR">Ocultar la publicación (falta confirmada)</option>' +
    '<option value="ARCHIVAR">Archivar sin sanción</option>' +
    '<option value="REVISAR">Dejar en revisión</option></select></div>' +
    '<div class="campo"><label for="mResolucion">Resolución (queda en la bitácora)</label>' +
    '<textarea id="mResolucion" placeholder="Qué se decidió y por qué"></textarea></div>';
  PIA.modal('Caso: ' + r.motivo, cuerpo,
    '<button class="btn" onclick="PIA.cerrarModal()">Cerrar</button>' +
    '<button class="btn p" onclick="resolverCaso(' + r.id + ')">Guardar decisión</button>');
}

/** Guarda la decisión de un caso. */
function resolverCaso(id) {
  var u = usuarioActual();
  if (!u) return;
  var rep = PIA.listar('reportes').filter(function (x) { return Number(x.id) === Number(id); })[0];
  if (!rep) return;
  var decision = PIA.valor('mDecision');
  var resolucion = PIA.valor('mResolucion');
  if (PIA.palabras(resolucion) < 4) {
    PIA.toast('Escribe una resolución de al menos 4 palabras.', 'mal');
    return;
  }
  var pub = publicacionPorId(rep.id_publicacion);
  var estado = decision === 'OCULTAR' ? 'RESUELTO_OCULTO' : decision === 'ARCHIVAR' ? 'ARCHIVADO' : 'EN_REVISION';
  PIA.actualizar('reportes', rep.id, {
    estado: estado, moderador: u.username_publico, resolucion: resolucion,
    resuelto: new Date().toISOString()
  });
  if (decision === 'OCULTAR' && pub) {
    PIA.actualizar('publicaciones', pub.id, { estado: 'OCULTO_MODERACION', motivo_moderacion: rep.motivo });
  }
  registrarBitacora('Moderación', 'Caso de ' + rep.motivo + ' en ' + (pub ? pub.codigo : 'publicación eliminada') + ': ' + resolucion);
  PIA.toast('Caso actualizado y registrado en la bitácora.');
  PIA.cerrarModal();
  pintarModeracion();
  pintarBitacora();
  pintarFeed();
}

/** Oculta una publicación desde el feed. */
function ocultarPublicacion(id) {
  var u = usuarioActual();
  if (!u || !puede('moderar', u.rol)) { PIA.toast('No tienes permisos de moderación.', 'mal'); return; }
  var p = publicacionPorId(id);
  if (!p) return;
  if (!confirm('¿Ocultar la publicación ' + p.codigo + '?')) return;
  PIA.actualizar('publicaciones', id, { estado: 'OCULTO_MODERACION', motivo_moderacion: 'Decisión directa de moderación' });
  registrarBitacora('Ocultamiento', 'Se ocultó la publicación ' + p.codigo + ' (' + p.titulo + ').');
  PIA.toast('Publicación oculta.');
  pintarFeed();
  pintarModeracion();
  pintarBitacora();
}

/** Restaura una publicación oculta. */
function restaurarPublicacion(id) {
  var u = usuarioActual();
  if (!u || !puede('moderar', u.rol)) { PIA.toast('No tienes permisos de moderación.', 'mal'); return; }
  var p = publicacionPorId(id);
  if (!p) return;
  PIA.actualizar('publicaciones', id, { estado: 'Activo', motivo_moderacion: '' });
  registrarBitacora('Restauración', 'Se restauró la publicación ' + p.codigo + ' (' + p.titulo + ').');
  PIA.toast('Publicación restaurada.');
  pintarFeed();
  pintarModeracion();
  pintarBitacora();
}

/** Pinta la bitácora auditable. */
function pintarBitacora() {
  var cont = document.getElementById('bitacora');
  if (!cont) return;
  var u = usuarioActual();
  if (!u || !puede('ver_bitacora', u.rol)) {
    cont.innerHTML = '<div class="vacio">La bitácora completa la ven docentes, moderadores y administradores.</div>';
    return;
  }
  var lista = PIA.listar('bitacora').slice().sort(function (a, b) {
    return String(b.fecha).localeCompare(String(a.fecha));
  }).slice(0, 20);
  cont.innerHTML = PIA.tabla(
    ['Fecha', 'Acción', 'Detalle', 'Responsable', 'Rol'],
    lista.map(function (b) {
      return [
        PIA.fechaHora(b.fecha), '<b>' + PIA.esc(b.accion) + '</b>',
        PIA.esc(b.detalle), PIA.esc(b.moderador), PIA.esc(b.rol)
      ];
    }),
    { vacio: 'Todavía no hay movimientos registrados.' }
  );
}

/** Analiza el texto de la caja de demostración. */
function analizarTextoDemo() {
  var caja = document.getElementById('analisisResultado');
  if (!caja) return;
  var texto = PIA.valor('analisisTexto');
  if (!texto) { PIA.toast('Escribe un texto para analizar.', 'mal'); return; }
  caja.innerHTML = informeAnalisis(texto);
}

/* El panel del feed se actualiza mientras se escribe. */
document.addEventListener('input', function (ev) {
  if (!ev.target) return;
  if (ev.target.id === 'fContenido' || ev.target.id === 'fTitulo') {
    if (ev.target.id === 'fContenido') {
      var cuenta = document.getElementById('fPalabras');
      if (cuenta) cuenta.textContent = PIA.palabras(ev.target.value);
    }
    pintarPanelAnalisis();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  pintarModeracion();
  pintarBitacora();
});