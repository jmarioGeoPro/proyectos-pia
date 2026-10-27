/* ==========================================================================
   feed-hilos.js
   --------------------------------------------------------------------------
   El feed cronológico, la publicación de hilos y avisos, los comentarios,
   los reportes, los grupos, los eventos y el perfil del usuario.
   Traduce el algoritmo Publicar_Hilo_Y_Moderar_Convivencia_LolaConnect.
   ========================================================================== */

'use strict';

/* Las categorías y las prioridades del feed. */
var CATEGORIAS = ['Academico', 'Cultura', 'Deporte', 'Bienestar', 'Institucional'];
var PRIORIDADES = ['Urgente', 'General', 'Evento'];

/* Los intereses que el estudiante puede marcar en su perfil. */
var INTERESES = ['Académico', 'Deportes', 'Música', 'Robótica', 'Lectura', 'Arte', 'Medio ambiente', 'Tecnología', 'Teatro', 'Ajedrez'];

/** Todas las publicaciones. */
function publicaciones() { return PIA.listar('publicaciones'); }

/** Una publicación por su id. */
function publicacionPorId(id) {
  var lista = publicaciones();
  for (var i = 0; i < lista.length; i++) {
    if (Number(lista[i].id) === Number(id)) return lista[i];
  }
  return null;
}

/** Los comentarios de una publicación. */
function comentariosDe(id) {
  return PIA.listar('comentarios').filter(function (c) { return Number(c.id_publicacion) === Number(id); })
    .sort(function (a, b) { return String(a.fecha).localeCompare(String(b.fecha)); });
}

/** Etiqueta de color según la categoría. */
function badgeCategoria(categoria) {
  var clase = categoria === 'Cultura' ? 'warn' : categoria === 'Deporte' ? 'ok' : categoria === 'Bienestar' ? 'neutro' : 'info';
  return '<span class="badge ' + clase + '">' + PIA.esc(categoria || 'General') + '</span>';
}

/** Etiqueta de color según la prioridad del aviso. */
function badgePrioridad(prioridad) {
  var clase = prioridad === 'Urgente' ? 'mal' : prioridad === 'Evento' ? 'warn' : 'neutro';
  return '<span class="badge ' + clase + '">' + PIA.esc(prioridad || 'General') + '</span>';
}

/** Etiqueta del estado de una publicación. */
function badgeEstadoPub(estado) {
  var clase = estado === 'Activo' ? 'ok' : estado === 'OCULTO_MODERACION' ? 'mal' : 'neutro';
  var texto = estado === 'OCULTO_MODERACION' ? 'Oculto por moderación' : (estado || 'Activo');
  return '<span class="badge ' + clase + '">' + PIA.esc(texto) + '</span>';
}

/**
 * El algoritmo Publicar_Hilo_Y_Moderar_Convivencia_LolaConnect.
 * Valida datos privados, lenguaje y rol antes de guardar un solo byte.
 */
function publicar() {
  var u = usuarioActual();
  if (!u) { PIA.toast('Inicia sesión para publicar en el feed.', 'mal'); return; }
  var titulo = PIA.valor('fTitulo');
  var categoria = PIA.valor('fCategoria');
  var contenido = PIA.valor('fContenido');
  var prioridad = PIA.valor('fPrioridad');
  var cajaAviso = document.getElementById('fAviso');
  var esAviso = !!(cajaAviso && cajaAviso.checked);

  if (titulo.length < 5) { PIA.toast('El título debe tener al menos 5 caracteres.', 'mal'); return; }
  if (PIA.palabras(contenido) < 10) { PIA.toast('El contenido debe tener al menos 10 palabras.', 'mal'); return; }
  if (!categoria) { PIA.toast('Elige la categoría del hilo.', 'mal'); return; }

  /* Paso 1: datos privados en el texto. */
  var privado = detectarDatosPrivados(titulo + ' ' + contenido);
  if (privado.encontrado) {
    PIA.modal('Advertencia de seguridad',
      '<div class="aviso mal"><b>Por tu protección, no publiques números de celular ni documentos de identidad en hilos públicos.</b></div>' +
      '<p class="pequeno">El texto contiene ' + PIA.esc(privado.aviso) + ': <b class="mono">' + PIA.esc(privado.mascara) + '</b>.</p>' +
      '<p class="pequeno gris">La Ley 1581 de 2012 protege los datos de niños, niñas y adolescentes. Este contenido no se guardó.</p>',
      '<button class="btn" onclick="PIA.cerrarModal()">Entendido</button>');
    return;
  }

  /* Pasos 2 y 3: análisis del lenguaje y pausa reflexiva. */
  var analisis = analizarLenguaje(titulo + ' ' + contenido);
  var datos = { titulo: titulo, categoria: categoria, contenido: contenido, esAviso: esAviso, prioridad: prioridad };
  if (analisis.nivel === 'ALTO' || analisis.nivel === 'MEDIO') {
    mostrarPausaReflexiva(datos, analisis);
    return;
  }
  guardarPublicacion(datos);
}

/** Guarda la publicación después de pasar los filtros (pasos 4, 5 y 6). */
function guardarPublicacion(datos) {
  var u = usuarioActual();
  if (!u) { PIA.toast('Inicia sesión para publicar.', 'mal'); return null; }
  if (datos.esAviso && !puede('publicar_aviso', u.rol)) {
    PIA.toast('Solo docentes y directivos autorizados pueden publicar Avisos Oficiales Verificados.', 'mal');
    return null;
  }
  var codigo = PIA.codigo('LC-2026-', 'publicaciones', 'codigo');
  var pub = PIA.insertar('publicaciones', {
    codigo: codigo,
    autor_id: u.id,
    autor_publico: u.username_publico,
    avatar: avatarDe(u),
    rol_autor: u.rol,
    categoria: datos.categoria,
    titulo: datos.titulo,
    contenido: datos.contenido,
    es_aviso: !!datos.esAviso,
    prioridad: datos.esAviso ? datos.prioridad : 'General',
    estado: 'Activo',
    fecha: new Date().toISOString()
  });
  registrarBitacora('Publicación', (pub.es_aviso ? 'Aviso oficial ' : 'Hilo ') + pub.codigo + ': ' + pub.titulo);
  PIA.toast(pub.es_aviso ? 'Aviso oficial publicado con insignia de verificación.' : 'Hilo publicado en el feed.');
  limpiarPublicacion();
  pintarFeed();
  pintarInicio();
  return pub;
}

/** Deja el formulario del feed limpio. */
function limpiarPublicacion() {
  ['fTitulo', 'fContenido'].forEach(function (id) { PIA.poner(id, ''); });
  PIA.poner('fCategoria', 'Academico');
  PIA.poner('fPrioridad', 'General');
  var caja = document.getElementById('fAviso');
  if (caja) caja.checked = false;
  var cuenta = document.getElementById('fPalabras');
  if (cuenta) cuenta.textContent = '0';
  var panel = document.getElementById('panelAnalisis');
  if (panel) panel.innerHTML = '';
}

/** Tarjeta de una publicación en el feed. */
function tarjetaPublicacion(p) {
  var u = usuarioActual();
  var moderador = u ? puede('moderar', u.rol) : false;
  var comentarios = comentariosDe(p.id).length;
  var extracto = String(p.contenido || '');
  if (extracto.length > 240) extracto = extracto.slice(0, 240) + '…';
  var estilo = 'border:1px solid var(--linea);border-radius:10px;padding:14px;margin-bottom:12px' +
    (p.es_aviso ? ';border-left:4px solid var(--primario);background:#fbfdff' : '');
  var html = '<div style="' + estilo + '">';
  html += '<div class="fila" style="justify-content:space-between;gap:8px">';
  html += '<div class="fila" style="gap:8px"><span style="font-size:22px">' + PIA.esc(p.avatar || '🦉') + '</span>' +
    '<div><b class="pequeno">' + PIA.esc(p.autor_publico) + '</b><br><span class="pequeno gris">' +
    PIA.esc(nombreRol(p.rol_autor)) + ' · ' + PIA.fechaHora(p.fecha) + '</span></div></div>';
  html += '<div class="fila" style="gap:6px">' +
    (p.es_aviso ? '<span class="badge ok">✔ Aviso verificado</span>' : '') +
    badgeCategoria(p.categoria) +
    (p.es_aviso ? badgePrioridad(p.prioridad) : '') +
    (p.estado === 'OCULTO_MODERACION' ? badgeEstadoPub(p.estado) : '') +
    '</div>';
  html += '</div>';
  html += '<h3 style="margin:10px 0 4px">' + PIA.esc(p.titulo) + '</h3>';
  html += '<p class="pequeno" style="line-height:1.6">' + PIA.esc(extracto) + '</p>';
  html += '<div class="fila" style="margin-top:10px">' +
    '<span class="badge neutro mono">' + PIA.esc(p.codigo) + '</span>' +
    '<span class="pequeno gris">' + comentarios + ' comentario(s)</span>' +
    '<div class="derecha fila">' +
    '<button class="btn pq" onclick="abrirPublicacion(' + p.id + ')">Leer y comentar</button>' +
    '<button class="btn pq" onclick="abrirFormularioReporte(' + p.id + ')">Reportar</button>' +
    (moderador ? '<button class="btn pq ' + (p.estado === 'OCULTO_MODERACION' ? 'ok' : 'pel') + '" onclick="' +
      (p.estado === 'OCULTO_MODERACION' ? 'restaurarPublicacion(' + p.id + ')' : 'ocultarPublicacion(' + p.id + ')') + '">' +
      (p.estado === 'OCULTO_MODERACION' ? 'Restaurar' : 'Ocultar') + '</button>' : '') +
    '</div></div>';
  html += '</div>';
  return html;
}

/** Pinta el feed con sus filtros. */
function pintarFeed() {
  var cont = document.getElementById('feed');
  if (!cont) return;
  var categoria = PIA.valor('qCategoria');
  var tipo = PIA.valor('qTipo');
  var texto = PIA.normalizar(PIA.valor('qTexto'));
  var u = usuarioActual();
  var moderador = u ? puede('moderar', u.rol) : false;
  var lista = publicaciones().slice().sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });
  var filtrada = lista.filter(function (p) {
    if (!moderador && p.estado === 'OCULTO_MODERACION') return false;
    if (categoria && p.categoria !== categoria) return false;
    if (tipo === 'aviso' && !p.es_aviso) return false;
    if (tipo === 'hilo' && p.es_aviso) return false;
    if (texto && PIA.normalizar(p.titulo + ' ' + p.contenido + ' ' + (p.autor_publico || '')).indexOf(texto) === -1) return false;
    return true;
  });
  if (!filtrada.length) {
    cont.innerHTML = '<div class="vacio">No hay publicaciones con esos filtros.</div>';
    return;
  }
  cont.innerHTML = filtrada.map(tarjetaPublicacion).join('');
}

/** Abre una publicación con sus comentarios. */
function abrirPublicacion(id) {
  var p = publicacionPorId(id);
  if (!p) return;
  var comentarios = comentariosDe(id);
  var html = '<div class="fila" style="margin-bottom:10px">' +
    (p.es_aviso ? '<span class="badge ok">✔ Aviso verificado</span>' : '<span class="badge info">Hilo</span>') +
    badgeCategoria(p.categoria) + badgePrioridad(p.es_aviso ? p.prioridad : 'General') + '</div>';
  html += '<p class="pequeno gris">' + PIA.esc(p.autor_publico) + ' · ' + PIA.fechaHora(p.fecha) + ' · ' + PIA.esc(p.codigo) + '</p>';
  html += '<p style="background:#f8fafc;border-radius:9px;padding:12px;font-size:13.5px;white-space:pre-wrap">' + PIA.esc(p.contenido) + '</p>';
  html += '<h3>Comentarios (' + comentarios.length + ')</h3>';
  if (comentarios.length) {
    html += comentarios.map(function (c) {
      return '<div style="border-left:3px solid var(--linea);padding:6px 10px;margin-bottom:8px">' +
        '<b class="pequeno">' + PIA.esc(c.avatar || '🦉') + ' ' + PIA.esc(c.autor_publico) + '</b> ' +
        '<span class="pequeno gris">' + PIA.fechaHora(c.fecha) + '</span>' +
        '<p class="pequeno">' + PIA.esc(c.contenido) + '</p></div>';
    }).join('');
  } else {
    html += '<p class="pequeno gris">Todavía no hay comentarios. Sé el primero en aportar.</p>';
  }
  html += '<div class="campo" style="margin-top:12px"><label for="cComentario">Tu comentario</label>' +
    '<textarea id="cComentario" placeholder="Aporta con respeto. Mínimo 4 palabras."></textarea></div>';
  PIA.modal(p.titulo, html,
    '<button class="btn" onclick="PIA.cerrarModal()">Cerrar</button>' +
    '<button class="btn p" onclick="comentar(' + p.id + ')">Comentar</button>');
}

/** Publica un comentario aplicando los mismos filtros. */
function comentar(id) {
  var u = usuarioActual();
  if (!u) { PIA.toast('Inicia sesión para comentar.', 'mal'); return; }
  var texto = PIA.valor('cComentario');
  if (PIA.palabras(texto) < 4) { PIA.toast('El comentario debe tener al menos 4 palabras.', 'mal'); return; }
  var privado = detectarDatosPrivados(texto);
  if (privado.encontrado) { PIA.toast('No publiques datos privados en un comentario.', 'mal'); return; }
  var analisis = analizarLenguaje(texto);
  if (analisis.nivel === 'ALTO') { PIA.toast('Comentario bloqueado: reformula sin agresividad.', 'mal'); return; }
  PIA.insertar('comentarios', {
    id_publicacion: Number(id), autor_id: u.id, autor_publico: u.username_publico,
    avatar: avatarDe(u), contenido: texto, fecha: new Date().toISOString(), estado: 'Activo'
  });
  PIA.toast('Comentario publicado.');
  abrirPublicacion(id);
  pintarFeed();
}

/** Formulario para reportar una publicación. */
function abrirFormularioReporte(id) {
  var u = usuarioActual();
  if (!u) { PIA.toast('Inicia sesión para reportar.', 'mal'); return; }
  var p = publicacionPorId(id);
  if (!p) return;
  var motivos = ['Acoso o burla', 'Datos personales', 'Lenguaje ofensivo', 'Spam o publicidad', 'Suplantación de identidad'];
  var cuerpo = '<p class="pequeno gris">Reportas: <b>' + PIA.esc(p.codigo) + ' · ' + PIA.esc(p.titulo) + '</b></p>' +
    '<div class="campo"><label for="rMotivo">Motivo</label><select id="rMotivo">' +
    motivos.map(function (m) { return '<option>' + m + '</option>'; }).join('') + '</select></div>' +
    '<div class="campo"><label for="rDetalle">¿Qué pasó?</label><textarea id="rDetalle" placeholder="Cuéntale al Comité de Convivencia lo que viste."></textarea></div>' +
    '<p class="pequeno gris">El reporte llega a la cola de moderación y queda en la bitácora auditable.</p>';
  PIA.modal('Reportar publicación', cuerpo,
    '<button class="btn" onclick="PIA.cerrarModal()">Cancelar</button>' +
    '<button class="btn pel" onclick="enviarReporte(' + p.id + ')">Enviar reporte</button>');
}

/** Envía el reporte a la cola de moderación. */
function enviarReporte(id) {
  var u = usuarioActual();
  if (!u) { PIA.toast('Inicia sesión para reportar.', 'mal'); return; }
  var motivo = PIA.valor('rMotivo');
  var detalle = PIA.valor('rDetalle');
  if (!motivo) { PIA.toast('Elige el motivo del reporte.', 'mal'); return; }
  var p = publicacionPorId(id);
  PIA.insertar('reportes', {
    id_publicacion: Number(id), codigo_pub: p ? p.codigo : '',
    motivo: motivo, detalle: detalle, reportado_por: u.username_publico,
    rol_reporta: u.rol, fecha: new Date().toISOString(),
    estado: 'PENDIENTE', moderador: '', resolucion: ''
  });
  registrarBitacora('Reporte', 'Se reportó ' + (p ? p.codigo : 'una publicación') + ' por ' + motivo + '.');
  PIA.toast('Reporte enviado al Comité de Convivencia.');
  PIA.cerrarModal();
  pintarInicio();
}

/* ---------------- Grupos y eventos ---------------- */

/** Pinta los clubes con el botón para unirse o salir. */
function pintarGrupos() {
  var cont = document.getElementById('grupos');
  if (!cont) return;
  var u = usuarioActual();
  var lista = PIA.listar('grupos');
  if (!lista.length) { cont.innerHTML = '<div class="vacio">Todavía no hay grupos.</div>'; return; }
  cont.innerHTML = '<div class="rejilla g2">' + lista.map(function (g) {
    var integrantes = g.integrantes || [];
    var dentro = u ? integrantes.indexOf(Number(u.id)) !== -1 : false;
    return '<div style="border:1px solid var(--linea);border-radius:10px;padding:14px">' +
      '<div class="fila" style="justify-content:space-between;gap:6px"><b>' + PIA.esc(g.nombre) + '</b>' + badgeCategoria(g.categoria) + '</div>' +
      '<p class="pequeno gris" style="margin:6px 0">' + PIA.esc(g.descripcion) + '</p>' +
      '<p class="pequeno"><b>Horario:</b> ' + PIA.esc(g.horario) + '<br><b>Lugar:</b> ' + PIA.esc(g.lugar) + '<br><b>Lidera:</b> ' + PIA.esc(g.lider) + '</p>' +
      '<div class="fila" style="margin-top:10px">' +
      '<span class="badge neutro">' + integrantes.length + ' integrantes</span>' +
      '<button class="btn pq ' + (dentro ? 'pel' : 'p') + '" onclick="unirseGrupo(' + g.id + ')">' + (dentro ? 'Salir del grupo' : 'Unirme') + '</button>' +
      '</div></div>';
  }).join('') + '</div>';
}

/** Une o saca al usuario del grupo. */
function unirseGrupo(id) {
  var u = usuarioActual();
  if (!u) { PIA.toast('Inicia sesión para unirte a un grupo.', 'mal'); return; }
  var g = PIA.listar('grupos').filter(function (x) { return Number(x.id) === Number(id); })[0];
  if (!g) return;
  var integrantes = (g.integrantes || []).slice();
  var posicion = integrantes.indexOf(Number(u.id));
  if (posicion === -1) {
    integrantes.push(Number(u.id));
    PIA.toast('Ya eres parte de ' + g.nombre + '.');
  } else {
    integrantes.splice(posicion, 1);
    PIA.toast('Saliste de ' + g.nombre + '.');
  }
  PIA.actualizar('grupos', g.id, { integrantes: integrantes });
  pintarGrupos();
}

/** Crea un grupo nuevo. */
function crearGrupo() {
  var u = usuarioActual();
  if (!u) { PIA.toast('Inicia sesión para crear un grupo.', 'mal'); return; }
  var nombre = PIA.valor('gNombre');
  var categoria = PIA.valor('gCategoria');
  var horario = PIA.valor('gHorario');
  var descripcion = PIA.valor('gDescripcion');
  if (nombre.length < 4) { PIA.toast('El nombre del grupo debe tener al menos 4 caracteres.', 'mal'); return; }
  if (PIA.palabras(descripcion) < 5) { PIA.toast('Describe el grupo con al menos 5 palabras.', 'mal'); return; }
  var privado = detectarDatosPrivados(nombre + ' ' + descripcion);
  if (privado.encontrado) { PIA.toast('El grupo no puede incluir datos privados: ' + privado.mascara, 'mal'); return; }
  PIA.insertar('grupos', {
    nombre: nombre, categoria: categoria, descripcion: descripcion,
    horario: horario || 'Por definir', lugar: 'Por definir',
    lider: u.username_publico, integrantes: [Number(u.id)]
  });
  registrarBitacora('Grupo creado', 'Se creó el grupo ' + nombre + '.');
  PIA.toast('Grupo creado.');
  ['gNombre', 'gHorario', 'gDescripcion'].forEach(function (campo) { PIA.poner(campo, ''); });
  pintarGrupos();
}

/** Pinta el calendario de eventos. */
function pintarEventos() {
  var cont = document.getElementById('eventos');
  if (!cont) return;
  var u = usuarioActual();
  var lista = PIA.listar('eventos').slice().sort(function (a, b) { return String(a.fecha).localeCompare(String(b.fecha)); });
  cont.innerHTML = PIA.tabla(
    ['Fecha', 'Evento', 'Hora', 'Lugar', 'Organiza', 'Asistentes', ''],
    lista.map(function (e) {
      var asistentes = e.asistentes || [];
      var dentro = u ? asistentes.indexOf(Number(u.id)) !== -1 : false;
      return [
        PIA.fecha(e.fecha),
        '<b>' + PIA.esc(e.titulo) + '</b><br><span class="pequeno gris">' + PIA.esc(e.descripcion) + '</span>',
        PIA.esc(e.hora), PIA.esc(e.lugar), PIA.esc(e.organiza),
        '<span class="badge neutro">' + asistentes.length + '</span>',
        '<button class="btn pq ' + (dentro ? 'ok' : '') + '" onclick="confirmarAsistencia(' + e.id + ')">' +
          (dentro ? 'Asistiré' : 'Confirmar') + '</button>'
      ];
    }),
    { vacio: 'No hay eventos programados.' }
  );
}

/** Confirma o retira la asistencia a un evento. */
function confirmarAsistencia(id) {
  var u = usuarioActual();
  if (!u) { PIA.toast('Inicia sesión para confirmar tu asistencia.', 'mal'); return; }
  var e = PIA.listar('eventos').filter(function (x) { return Number(x.id) === Number(id); })[0];
  if (!e) return;
  var asistentes = (e.asistentes || []).slice();
  var posicion = asistentes.indexOf(Number(u.id));
  if (posicion === -1) { asistentes.push(Number(u.id)); PIA.toast('Asistencia confirmada.'); }
  else { asistentes.splice(posicion, 1); PIA.toast('Retiraste tu confirmación.'); }
  PIA.actualizar('eventos', e.id, { asistentes: asistentes });
  pintarEventos();
}

/** Programa un evento institucional. */
function crearEvento() {
  var u = usuarioActual();
  if (!u) { PIA.toast('Inicia sesión para programar un evento.', 'mal'); return; }
  if (!puede('crear_evento', u.rol)) { PIA.toast('Solo docentes, moderadores y administradores programan eventos.', 'mal'); return; }
  var titulo = PIA.valor('eTitulo');
  var fecha = PIA.valor('eFecha');
  var hora = PIA.valor('eHora');
  var lugar = PIA.valor('eLugar');
  var organiza = PIA.valor('eOrganiza');
  if (titulo.length < 5) { PIA.toast('El título del evento debe tener al menos 5 caracteres.', 'mal'); return; }
  if (!fecha) { PIA.toast('Elige la fecha del evento.', 'mal'); return; }
  if (fecha < PIA.hoy()) { PIA.toast('La fecha del evento no puede ser anterior a hoy.', 'mal'); return; }
  PIA.insertar('eventos', {
    titulo: titulo, fecha: fecha, hora: hora || '10:00', lugar: lugar || 'Por definir',
    organiza: organiza || u.username_publico, descripcion: '', asistentes: [Number(u.id)]
  });
  registrarBitacora('Evento', 'Se programó el evento ' + titulo + ' para el ' + fecha + '.');
  PIA.toast('Evento programado.');
  ['eTitulo', 'eLugar', 'eOrganiza'].forEach(function (campo) { PIA.poner(campo, ''); });
  pintarEventos();
}

/* ---------------- Perfil ---------------- */

/** Pinta el formulario del perfil y su vista previa. */
function pintarPerfil() {
  var cont = document.getElementById('perfilForm');
  if (!cont) return;
  var aviso = document.getElementById('perfilAviso');
  var u = usuarioActual();
  if (!u) {
    if (aviso) aviso.innerHTML = '<div class="aviso warn">Inicia sesión para ver y editar tu perfil. <a href="index.html">Ir al acceso</a>.</div>';
    cont.innerHTML = '';
    var previo = document.getElementById('perfilPreview');
    if (previo) previo.innerHTML = '';
    var mias = document.getElementById('misPublicaciones');
    if (mias) mias.innerHTML = '';
    return;
  }
  if (aviso) aviso.innerHTML = '';
  var priv = u.privacidad || {};
  var opcionesAvatar = AVATARES.map(function (a) {
    return '<option value="' + a + '"' + (a === u.avatar ? ' selected' : '') + '>' + a + '</option>';
  }).join('');
  var intereses = INTERESES.map(function (i) {
    var marcado = (u.intereses || []).indexOf(i) === -1 ? '' : ' checked';
    return '<label class="fila pequeno" style="gap:6px;margin:3px 0"><input type="checkbox" class="chkInteres" value="' + i + '"' + marcado + '> ' + i + '</label>';
  }).join('');
  cont.innerHTML = '<div class="campo"><label for="pUsername">Nombre público (sin apellidos completos)</label>' +
    '<input id="pUsername" value="' + PIA.esc(u.username_publico) + '"></div>' +
    '<div class="rejilla g2">' +
    '<div class="campo"><label for="pAvatar">Avatar</label><select id="pAvatar">' + opcionesAvatar + '</select></div>' +
    '<div class="campo"><label for="pGrado">Grado</label><input id="pGrado" value="' + PIA.esc(u.grado) + '"></div>' +
    '</div>' +
    '<h3>Intereses</h3><div class="rejilla g3">' + intereses + '</div>' +
    '<h3>Privacidad</h3>' +
    '<label class="fila pequeno" style="gap:6px;margin:4px 0"><input type="checkbox" id="pMostrarGrado"' + (priv.mostrar_grado ? ' checked' : '') + '> Mostrar mi grado en el perfil público</label>' +
    '<label class="fila pequeno" style="gap:6px;margin:4px 0"><input type="checkbox" id="pMensajes"' + (priv.permitir_mensajes ? ' checked' : '') + '> Permitir que me escriban por la plataforma</label>' +
    '<label class="fila pequeno" style="gap:6px;margin:4px 0"><input type="checkbox" id="pPublico"' + (priv.perfil_publico ? ' checked' : '') + '> Perfil visible para la comunidad</label>' +
    '<div class="fila" style="margin-top:14px"><button class="btn p" onclick="guardarPerfil()">Guardar mi perfil</button>' +
    '<a class="btn" href="feed.html">Volver al feed</a></div>';
  pintarPreview(u);
  pintarMisPublicaciones(u);
}

/** Vista previa del perfil público, sin datos sensibles. */
function pintarPreview(u) {
  var cont = document.getElementById('perfilPreview');
  if (!cont) return;
  var priv = u.privacidad || {};
  var intereses = (u.intereses || []).map(function (i) {
    return '<span class="badge info">' + PIA.esc(i) + '</span>';
  }).join(' ');
  cont.innerHTML = '<div class="fila" style="gap:12px;margin-bottom:10px">' +
    '<div style="font-size:40px">' + avatarDe(u) + '</div>' +
    '<div><b>' + PIA.esc(u.username_publico) + '</b><br><span class="pequeno gris">' +
    (priv.mostrar_grado ? PIA.esc(u.grado) + ' · ' : '') + PIA.esc(nombreRol(u.rol)) + '</span></div></div>' +
    '<div class="fila" style="margin-bottom:10px">' + (intereses || '<span class="pequeno gris">Sin intereses declarados</span>') + '</div>' +
    '<div class="aviso ok pequeno">Documento: <b>oculto</b> · Teléfono: <b>oculto</b> · Correo: <b>oculto</b><br>' +
    'El perfil público nunca muestra datos de contacto ni el número de documento (Ley 1581 de 2012).</div>' +
    '<p class="pequeno gris">Así te ve el resto de la comunidad: nombre público, avatar, grado (si lo permites) e intereses.</p>';
}

/** Guarda los cambios del perfil. */
function guardarPerfil() {
  var u = usuarioActual();
  if (!u) { PIA.toast('Inicia sesión primero.', 'mal'); return; }
  var username = PIA.valor('pUsername').toLowerCase().replace(/\s+/g, '.');
  if (username.length < 4) { PIA.toast('El nombre público debe tener al menos 4 caracteres.', 'mal'); return; }
  var repetido = usuarios().filter(function (x) {
    return x.username_publico === username && Number(x.id) !== Number(u.id);
  })[0];
  if (repetido) { PIA.toast('Ese nombre público ya está en uso.', 'mal'); return; }
  var intereses = [];
  document.querySelectorAll('.chkInteres').forEach(function (c) { if (c.checked) intereses.push(c.value); });
  var mostrar = document.getElementById('pMostrarGrado');
  var mensajes = document.getElementById('pMensajes');
  var publico = document.getElementById('pPublico');
  PIA.actualizar('usuarios', u.id, {
    username_publico: username,
    avatar: PIA.valor('pAvatar'),
    grado: PIA.valor('pGrado'),
    intereses: intereses,
    privacidad: {
      mostrar_grado: !!(mostrar && mostrar.checked),
      permitir_mensajes: !!(mensajes && mensajes.checked),
      perfil_publico: !!(publico && publico.checked)
    }
  });
  registrarBitacora('Perfil actualizado', 'Cambió su nombre público, avatar, intereses o privacidad.');
  PIA.toast('Perfil actualizado.');
  pintarPerfil();
  pintarFeed();
  pintarAcceso();
  pintarEstadoSesion();
}

/** Tabla con las publicaciones del usuario. */
function pintarMisPublicaciones(u) {
  var cont = document.getElementById('misPublicaciones');
  if (!cont) return;
  var lista = publicaciones().filter(function (p) { return Number(p.autor_id) === Number(u.id); })
    .sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });
  cont.innerHTML = PIA.tabla(
    ['Código', 'Título', 'Categoría', 'Publicado', 'Estado'],
    lista.map(function (p) {
      return [
        '<span class="mono">' + PIA.esc(p.codigo) + '</span>',
        PIA.esc(p.titulo) + (p.es_aviso ? ' <span class="badge ok">Verificado</span>' : ''),
        badgeCategoria(p.categoria),
        PIA.fechaHora(p.fecha),
        badgeEstadoPub(p.estado)
      ];
    }),
    { vacio: 'Todavía no has publicado nada.' }
  );
}

/* ---------------- Portada ---------------- */

/** Portada: indicadores, avisos urgentes y matriz de permisos. */
function pintarInicio() {
  var k = document.getElementById('kAvisos');
  if (!k) return;
  var pubs = publicaciones();
  k.textContent = pubs.filter(function (p) { return p.es_aviso && p.estado === 'Activo'; }).length;
  document.getElementById('kHilos').textContent = pubs.filter(function (p) { return !p.es_aviso && p.estado === 'Activo'; }).length;
  document.getElementById('kGrupos').textContent = PIA.listar('grupos').length;
  document.getElementById('kReportes').textContent = PIA.listar('reportes').filter(function (r) { return r.estado === 'PENDIENTE'; }).length;
  var urgentes = pubs.filter(function (p) {
    return p.es_aviso && p.estado === 'Activo' && (p.prioridad === 'Urgente' || p.prioridad === 'Evento');
  }).sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });
  document.getElementById('avisosUrgentes').innerHTML = PIA.tabla(
    ['Prioridad', 'Aviso', 'Autor', 'Publicado'],
    urgentes.map(function (p) {
      return [
        badgePrioridad(p.prioridad),
        '<b>' + PIA.esc(p.titulo) + '</b><br><span class="pequeno gris">' + PIA.esc(p.contenido.slice(0, 120)) + '…</span>',
        PIA.esc(p.autor_publico),
        PIA.fechaHora(p.fecha)
      ];
    }),
    { vacio: 'No hay avisos urgentes en este momento.' }
  );
  pintarAcceso();
  pintarMatrizRoles();
}

document.addEventListener('DOMContentLoaded', function () {
  pintarInicio();
  pintarFeed();
  pintarGrupos();
  pintarEventos();
  pintarPerfil();
  pintarEstadoSesion();
});