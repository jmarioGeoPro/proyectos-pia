/* ==========================================================================
   conciliacion-lotes.js
   --------------------------------------------------------------------------
   Recepción del lote diario, conciliación de inasistentes y sobrantes, cierre
   de la jornada, panel del operador y buzón de sugerencias nutricionales.
   Traduce el cierre del algoritmo Gestion_Integral_Restaurante_RADE.
   ========================================================================== */

'use strict';

/* La sesión del panel se guarda aparte de las tablas del PAE. */
var CLAVE_SESION_RADE = 'rade_sesion';

/* Estados posibles de un lote. */
var ESTADOS_LOTE = ['ABIERTO', 'CERRADO'];

/** El lote de una fecha, o null si no se ha recibido. */
function loteDeFecha(fecha) {
  var lista = PIA.listar('lotes');
  for (var i = 0; i < lista.length; i++) {
    if (String(lista[i].fecha) === String(fecha)) return lista[i];
  }
  return null;
}

/** El lote del día de hoy: el único que puede validar carnets. */
function loteDeHoy() { return loteDeFecha(PIA.hoy()); }

/** Los lotes de la fecha más reciente a la más antigua. */
function lotesOrdenados() {
  return PIA.listar('lotes').slice().sort(function (a, b) {
    return String(b.fecha).localeCompare(String(a.fecha));
  });
}

/** El último lote registrado sirve de plantilla para abrir la jornada. */
function ultimoLote() {
  var lista = lotesOrdenados();
  return lista.length ? lista[0] : null;
}

/**
 * El cierre del algoritmo, con las fórmulas corregidas:
 *   inasistentes = inscritos - reclamaron
 *   sobrantes    = recibidas - entregadas (por modalidad y en total)
 * Nunca se resta al revés, que era el error de la primera versión.
 */
function conciliarLote(lote) {
  var vacio = {
    fecha: '', inscritos: 0, reclamaron: 0, inasistentes: 0,
    entregadosLeche: 0, entregadosPlato: 0, sobrantesLeche: 0, sobrantesPlato: 0,
    sobrantesTotales: 0, devueltos: 0, platosPendientes: 0, alerta: false
  };
  if (!lote) return vacio;
  var entregas = PIA.listar('entregas').filter(function (e) { return e.fecha === lote.fecha; });
  var entregadosLeche = 0, entregadosPlato = 0, devueltos = 0;
  entregas.forEach(function (e) {
    if (e.modalidad === 'PLATO_VERDE') {
      entregadosPlato++;
      if (e.plato_devuelto) devueltos++;
    } else {
      entregadosLeche++;
    }
  });
  var reclamaron = entregas.length;
  var inscritos = Number(lote.total_inscritos || 0);
  var sobrantesLeche = Number(lote.recibida_leche || 0) - entregadosLeche;
  var sobrantesPlato = Number(lote.recibida_plato || 0) - entregadosPlato;
  return {
    fecha: lote.fecha, inscritos: inscritos, reclamaron: reclamaron,
    inasistentes: inscritos - reclamaron,
    entregadosLeche: entregadosLeche, entregadosPlato: entregadosPlato,
    sobrantesLeche: sobrantesLeche, sobrantesPlato: sobrantesPlato,
    sobrantesTotales: sobrantesLeche + sobrantesPlato,
    devueltos: devueltos, platosPendientes: entregadosPlato - devueltos,
    alerta: sobrantesLeche < 0 || sobrantesPlato < 0 || (inscritos - reclamaron) < 0
  };
}

/** Abre la jornada de hoy con las cantidades del último lote. */
function abrirJornadaHoy() {
  var hoy = PIA.hoy();
  if (loteDeFecha(hoy)) { PIA.toast('La jornada de hoy ya está abierta.', 'warn'); return null; }
  var base = ultimoLote();
  var inscritos = PIA.listar('beneficiarios').filter(function (b) { return b.activo; }).length;
  var nuevo = PIA.insertar('lotes', {
    codigo_lote: PIA.codigo('LOTE-2026-', 'lotes', 'codigo_lote'),
    fecha: hoy,
    hora_llegada: '06:30',
    responsable: 'Operador PAE',
    menu: base ? base.menu : 'Arroz con pollo, ensalada y jugo natural',
    vencimiento: hoy,
    recibida_leche: base ? Number(base.recibida_leche) : 120,
    recibida_plato: base ? Number(base.recibida_plato) : 60,
    total_inscritos: inscritos,
    estado: 'ABIERTO',
    observacion: 'Jornada abierta desde el panel del operador.'
  });
  PIA.toast('Jornada abierta: ' + nuevo.recibida_leche + ' vasos y ' + nuevo.recibida_plato + ' platos.');
  refrescarPanel();
  return nuevo;
}

/** Guarda la recepción de un lote (crea o actualiza la fecha). */
function guardarLote() {
  var fecha = PIA.valor('lFecha');
  var responsable = PIA.valor('lResponsable');
  var menu = PIA.valor('lMenu');
  var leche = Number(PIA.valor('lLeche'));
  var plato = Number(PIA.valor('lPlato'));
  var inscritos = Number(PIA.valor('lInscritos'));
  if (!fecha) { PIA.toast('Elige la fecha del lote.', 'mal'); return; }
  if (!responsable) { PIA.toast('Escribe quién recibe el lote.', 'mal'); return; }
  if (!menu) { PIA.toast('Escribe el menú del día.', 'mal'); return; }
  if (!(leche >= 0) || !(plato >= 0)) { PIA.toast('Las cantidades recibidas deben ser cero o más.', 'mal'); return; }
  if (!(inscritos >= 1)) { PIA.toast('Escribe cuántos estudiantes están inscritos en el PAE.', 'mal'); return; }
  if (leche + plato < inscritos) {
    PIA.toast('Atención: el lote trae menos raciones que estudiantes inscritos.', 'warn');
  }
  var existente = loteDeFecha(fecha);
  var datos = {
    fecha: fecha, hora_llegada: PIA.valor('lHora') || '06:30', responsable: responsable,
    menu: menu, vencimiento: PIA.valor('lVence') || fecha,
    recibida_leche: leche, recibida_plato: plato, total_inscritos: inscritos
  };
  if (existente) {
    PIA.actualizar('lotes', existente.id, datos);
    PIA.toast('El lote de esa fecha se actualizó.');
  } else {
    datos.codigo_lote = PIA.codigo('LOTE-2026-', 'lotes', 'codigo_lote');
    datos.estado = 'ABIERTO';
    datos.observacion = '';
    PIA.insertar('lotes', datos);
    PIA.toast('Lote recibido y registrado.');
  }
  limpiarLote();
  refrescarPanel();
}

/** Deja el formulario del lote listo para hoy. */
function limpiarLote() {
  PIA.poner('lFecha', PIA.hoy());
  PIA.poner('lHora', '06:30');
  PIA.poner('lResponsable', '');
  PIA.poner('lMenu', '');
  PIA.poner('lVence', PIA.hoy());
  PIA.poner('lLeche', '120');
  PIA.poner('lPlato', '60');
  PIA.poner('lInscritos', String(PIA.listar('beneficiarios').filter(function (b) { return b.activo; }).length));
}

/** Pinta el estado de la jornada en el panel del operador. */
function pintarJornadaHoy() {
  var caja = document.getElementById('jornadaHoy');
  if (!caja) return;
  var lote = loteDeHoy();
  if (!lote) {
    caja.innerHTML = '<div class="aviso warn">Hoy todavía no se ha recibido el lote. Sin lote la terminal de carnet no puede validar.</div>' +
      '<div class="fila"><button class="btn p" onclick="abrirJornadaHoy()">Abrir la jornada de hoy</button>' +
      '<a class="btn" href="#formLote" onclick="PIA.poner(\'lFecha\', PIA.hoy())">Registrar el lote a mano</a></div>';
    return;
  }
  var c = conciliarLote(lote);
  var html = '<div class="fila" style="margin-bottom:12px">' +
    '<span class="badge ' + (lote.estado === 'CERRADO' ? 'neutro' : 'ok') + '">' + lote.estado + '</span>' +
    '<span class="badge neutro mono">' + PIA.esc(lote.codigo_lote) + '</span>' +
    '<span class="pequeno gris">' + PIA.fecha(lote.fecha) + ' · llegó ' + PIA.esc(lote.hora_llegada) + ' · recibe ' + PIA.esc(lote.responsable) + '</span></div>';
  html += '<p style="font-size:14px"><b>' + PIA.esc(lote.menu) + '</b></p>';
  html += '<div class="indicadores" style="grid-template-columns:repeat(4,1fr);margin-top:12px">' +
    '<div class="indicador"><b>Vasos</b><strong>' + lote.recibida_leche + '</strong><span>recibidos</span></div>' +
    '<div class="indicador"><b>Platos</b><strong>' + lote.recibida_plato + '</strong><span>recibidos</span></div>' +
    '<div class="indicador"><b>Reclamaron</b><strong>' + c.reclamaron + '</strong><span>estudiantes</span></div>' +
    '<div class="indicador"><b>Sobrantes</b><strong>' + c.sobrantesTotales + '</strong><span>raciones</span></div>' +
    '</div>';
  if (lote.estado === 'ABIERTO') {
    html += '<div class="fila"><button class="btn p" onclick="cerrarJornada()">Cerrar la jornada y conciliar</button>' +
      '<a class="btn" href="validador-carnet.html">Ir a la terminal</a></div>';
  } else {
    html += '<div class="aviso ok">Jornada cerrada el ' + PIA.fechaHora(lote.cerrado_en) + ' con ' + Number(lote.inasistentes_cierre || c.inasistentes) + ' inasistentes y ' + Number(lote.sobrantes_cierre || c.sobrantesTotales) + ' raciones sobrantes.</div>';
  }
  caja.innerHTML = html;
}

/** Llena el selector de fechas a conciliar. */
function pintarSelectFechas() {
  var sel = document.getElementById('cFecha');
  if (!sel) return;
  var valor = sel.value;
  var lotes = lotesOrdenados();
  sel.innerHTML = lotes.map(function (l) {
    return '<option value="' + l.fecha + '">' + PIA.fecha(l.fecha) + ' · ' + PIA.esc(l.menu) + '</option>';
  }).join('');
  if (valor) sel.value = valor;
  if (!sel.value && lotes.length) sel.value = lotes[0].fecha;
}

/** Tabla de conciliación con las fórmulas a la vista. */
function pintarConciliacion() {
  var cont = document.getElementById('conciliacion');
  if (!cont) return;
  pintarSelectFechas();
  var sel = document.getElementById('cFecha');
  var lote = sel && sel.value ? loteDeFecha(sel.value) : loteDeHoy();
  if (!lote) {
    cont.innerHTML = '<div class="vacio">No hay lotes registrados para conciliar.</div>';
    return;
  }
  var c = conciliarLote(lote);
  var html = '<div class="indicadores" style="grid-template-columns:1fr 1fr;margin-top:6px">' +
    '<div class="indicador"><b>Inscritos</b><strong>' + c.inscritos + '</strong><span>titulares del PAE</span></div>' +
    '<div class="indicador"><b>Reclamaron</b><strong>' + c.reclamaron + '</strong><span>entregas reales</span></div>' +
    '<div class="indicador"><b>Inasistentes</b><strong>' + c.inasistentes + '</strong><span>no reclamaron</span></div>' +
    '<div class="indicador"><b>Sobrantes</b><strong>' + c.sobrantesTotales + '</strong><span>raciones</span></div>' +
    '</div>';
  html += PIA.tabla(['Concepto', 'Cálculo', 'Resultado'], [
    ['Titulares inasistentes', c.inscritos + ' − ' + c.reclamaron, '<b>' + c.inasistentes + '</b>'],
    ['Entregados vaso de leche', '—', c.entregadosLeche],
    ['Sobrantes vaso de leche', lote.recibida_leche + ' − ' + c.entregadosLeche, '<b>' + c.sobrantesLeche + '</b>'],
    ['Entregados plato verde', '—', c.entregadosPlato],
    ['Sobrantes plato verde', lote.recibida_plato + ' − ' + c.entregadosPlato, '<b>' + c.sobrantesPlato + '</b>'],
    ['Sobrantes totales', c.sobrantesLeche + ' + ' + c.sobrantesPlato, '<b>' + c.sobrantesTotales + '</b>'],
    ['Platos sin devolver', c.entregadosPlato + ' − ' + c.devueltos, '<b>' + c.platosPendientes + '</b>']
  ]);
  if (c.alerta) {
    html += '<div class="aviso mal">Hay más entregas que raciones recibidas o más reclamos que inscritos. Revisa el lote antes de cerrar: un número negativo no es un resultado válido.</div>';
  }
  if (c.platosPendientes > 0) {
    html += '<div class="aviso warn">Quedan ' + c.platosPendientes + ' platos verdes sin devolver. El compromiso del Plato Verde incluye devolver el plato.</div>';
  }
  cont.innerHTML = html;
}

/** Monitor de entregas de la fecha conciliada. */
function pintarMonitor() {
  var cont = document.getElementById('monitor');
  if (!cont) return;
  var sel = document.getElementById('cFecha');
  var fecha = sel && sel.value ? sel.value : (loteDeHoy() ? loteDeHoy().fecha : '');
  var lista = PIA.listar('entregas').filter(function (e) { return e.fecha === fecha; })
    .sort(function (a, b) { return String(a.hora).localeCompare(String(b.hora)); });
  cont.innerHTML = PIA.tabla(
    ['Hora', 'Carnet', 'Estudiante', 'Grado', 'Modalidad', 'Plato'],
    lista.map(function (e) {
      var ben = beneficiarioPorId(e.id_beneficiario);
      return [
        '<b>' + PIA.esc(e.hora) + '</b>',
        '<span class="mono">' + PIA.esc(e.codigo_carnet) + '</span>',
        PIA.esc(ben ? ben.nombre : 'Beneficiario retirado'),
        PIA.esc(ben ? ben.grado : '—'),
        badgeModalidad(e.modalidad),
        e.modalidad === 'PLATO_VERDE'
          ? (e.plato_devuelto ? '<span class="badge ok">Devuelto</span>' : '<button class="btn pq" onclick="devolverPlato(' + e.id + ')">Registrar devolución</button>')
          : '<span class="badge neutro">No aplica</span>'
      ];
    }),
    { vacio: 'No hay entregas registradas en esa fecha.' }
  );
}

/** Titulares activos que no reclamaron en la fecha conciliada. */
function pintarInasistentes() {
  var cont = document.getElementById('inasistentes');
  if (!cont) return;
  var sel = document.getElementById('cFecha');
  var fecha = sel && sel.value ? sel.value : (loteDeHoy() ? loteDeHoy().fecha : '');
  if (!fecha) { cont.innerHTML = '<div class="vacio">Elige una fecha con lote para ver los inasistentes.</div>'; return; }
  var reclamaron = {};
  PIA.listar('entregas').filter(function (e) { return e.fecha === fecha; }).forEach(function (e) {
    reclamaron[Number(e.id_beneficiario)] = true;
  });
  var ausentes = PIA.listar('beneficiarios').filter(function (b) {
    return b.activo && !reclamaron[Number(b.id)];
  });
  cont.innerHTML = PIA.tabla(
    ['Estudiante', 'Grado', 'Modalidad', 'Ración disponible', ''],
    ausentes.map(function (b) {
      return [
        PIA.esc(b.nombre),
        PIA.esc(b.grado),
        badgeModalidad(b.modalidad),
        '<span class="badge warn">Sin reclamar</span>',
        '<button class="btn pq" onclick="verFichaBeneficiario(' + b.id + ')">Ver ficha</button>'
      ];
    }),
    { vacio: 'Todos los beneficiarios activos reclamaron su ración en esa fecha.' }
  );
}

/** Ficha rápida de un beneficiario con su historial de entregas. */
function verFichaBeneficiario(id) {
  var b = beneficiarioPorId(id);
  if (!b) return;
  var historial = PIA.listar('entregas').filter(function (e) { return Number(e.id_beneficiario) === Number(id); })
    .sort(function (a, b2) { return String(b2.fecha).localeCompare(String(a.fecha)); });
  var cuerpo = '<p><b>' + PIA.esc(b.nombre) + '</b> · ' + PIA.esc(b.grado) + '</p>' +
    '<div class="fila" style="margin-bottom:12px">' + badgeModalidad(b.modalidad) + badgeActivo(b.activo) + '</div>' +
    '<p class="pequeno gris">Carnet ' + PIA.esc(b.codigo_carnet) + ' · inscrito el ' + PIA.fecha(b.fecha_inscripcion) + '</p>' +
    '<p class="pequeno">La ración de este titular queda disponible para reasignación según la Ley 1990 de 2019 y los lineamientos del PAE.</p>' +
    '<h3>Historial</h3>' +
    PIA.tabla(['Fecha', 'Hora', 'Modalidad'], historial.map(function (e) {
      return [PIA.fecha(e.fecha), PIA.esc(e.hora), modalidadNombre(e.modalidad)];
    }), { vacio: 'Sin entregas registradas.' });
  PIA.modal('Ficha del beneficiario', cuerpo, '<button class="btn" onclick="PIA.cerrarModal()">Cerrar</button>');
}

/** Cierra la jornada de hoy y guarda el reporte de cierre. */
function cerrarJornada() {
  var lote = loteDeHoy();
  if (!lote) { PIA.toast('No hay jornada abierta hoy.', 'mal'); return; }
  if (lote.estado === 'CERRADO') { PIA.toast('Esa jornada ya está cerrada.', 'warn'); return; }
  var c = conciliarLote(lote);
  var texto = 'Cerrar la jornada del ' + PIA.fecha(lote.fecha) + '?\n' +
    'Reclamaron: ' + c.reclamaron + ' · Inasistentes: ' + c.inasistentes + ' · Sobrantes: ' + c.sobrantesTotales;
  if (!confirm(texto)) return;
  PIA.actualizar('lotes', lote.id, {
    estado: 'CERRADO',
    cerrado_en: new Date().toISOString(),
    inasistentes_cierre: c.inasistentes,
    sobrantes_cierre: c.sobrantesTotales
  });
  PIA.toast('Jornada cerrada: ' + c.inasistentes + ' inasistentes y ' + c.sobrantesTotales + ' raciones sobrantes.');
  refrescarPanel();
}

/** Repinta todo lo que esté en pantalla. */
function refrescarPanel() {
  pintarContadores();
  pintarHistorial();
  pintarJornadaHoy();
  pintarSelectFechas();
  pintarConciliacion();
  pintarMonitor();
  pintarInasistentes();
  pintarBeneficiarios();
  pintarBotonesPrueba();
  pintarInicio();
}

/* ---------------- Portal del estudiante ---------------- */

/** Estrellas de una calificación de 1 a 5. */
function estrellas(n) {
  var mapa = ['', '★', '★★', '★★★', '★★★★', '★★★★★'];
  return mapa[Number(n)] || '—';
}

/** Consulta la ficha PAE del estudiante dueño del carnet. */
function consultarMiPae() {
  var caja = document.getElementById('miResultado');
  if (!caja) return;
  var codigo = normalizarCarnet(PIA.valor('miCarnet'));
  if (!codigo) { PIA.toast('Escribe el código de tu carnet.', 'mal'); return; }
  var ben = beneficiarioPorCarnet(codigo);
  if (!ben) {
    caja.innerHTML = '<div class="aviso mal">No encontramos el carnet <b>' + PIA.esc(codigo) + '</b> entre los beneficiarios del PAE. Acércate a coordinación.</div>';
    return;
  }
  window.__miBen = ben;
  var hoy = PIA.hoy();
  var lote = loteDeHoy();
  var entregaHoy = PIA.listar('entregas').filter(function (e) {
    return e.fecha === hoy && Number(e.id_beneficiario) === Number(ben.id);
  })[0];
  var historial = PIA.listar('entregas').filter(function (e) {
    return Number(e.id_beneficiario) === Number(ben.id);
  }).sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });
  var estado;
  if (entregaHoy) {
    estado = '<div class="aviso ok">Ya reclamaste tu complemento hoy a las <b>' + PIA.esc(entregaHoy.hora) + '</b>. No necesitas volver a la fila.</div>';
  } else if (lote && lote.estado === 'ABIERTO') {
    estado = '<div class="aviso warn">Todavía no has reclamado el complemento de hoy. El restaurante está abierto.</div>';
  } else if (lote && lote.estado === 'CERRADO') {
    estado = '<div class="aviso">La jornada de hoy ya cerró y no registra tu reclamo.</div>';
  } else {
    estado = '<div class="aviso">Hoy no hay jornada registrada todavía.</div>';
  }
  var html = '<section class="tarjeta">' +
    '<h2>' + PIA.esc(ben.nombre) + ' ' + badgeActivo(ben.activo) + '</h2>' +
    '<p class="ayuda">Carnet <b class="mono">' + PIA.esc(ben.codigo_carnet) + '</b> · ' + PIA.esc(ben.grado) + ' · ' + badgeModalidad(ben.modalidad) + '</p>' +
    estado +
    '<div class="fila" style="margin:14px 0">' +
    '<button class="btn" onclick="cambiarModalidad()">Cambiar mi modalidad</button>' +
    '<span class="pequeno gris">Los cambios se reflejan de inmediato en la terminal del restaurante.</span>' +
    '</div>' +
    '<h3>Mi historial de raciones (' + historial.length + ')</h3>' +
    PIA.tabla(['Fecha', 'Hora', 'Modalidad', 'Plato devuelto'], historial.map(function (e) {
      return [
        PIA.fecha(e.fecha), PIA.esc(e.hora), modalidadNombre(e.modalidad),
        e.modalidad === 'PLATO_VERDE' ? (e.plato_devuelto ? 'Sí' : 'Pendiente') : 'No aplica'
      ];
    }), { vacio: 'Todavía no tienes raciones registradas.' }) +
    '</section>';
  caja.innerHTML = html;
  pintarSugerencias(ben);
}

/** Cambia la modalidad del estudiante consultado. */
function cambiarModalidad() {
  var ben = window.__miBen;
  if (!ben) { PIA.toast('Consulta tu carnet primero.', 'mal'); return; }
  var nueva = ben.modalidad === 'PLATO_VERDE' ? 'VASO_LECHE' : 'PLATO_VERDE';
  if (!confirm('¿Cambiar tu modalidad a ' + modalidadNombre(nueva) + '?')) return;
  PIA.actualizar('beneficiarios', ben.id, { modalidad: nueva });
  PIA.toast('Modalidad actualizada a ' + modalidadNombre(nueva) + '.');
  consultarMiPae();
  pintarBeneficiarios();
}

/** Buzón de sugerencias nutricionales del estudiante. */
function pintarSugerencias(ben) {
  var caja = document.getElementById('miSugerencias');
  if (!caja) return;
  var b = ben || window.__miBen;
  if (!b) { caja.innerHTML = ''; return; }
  var lista = PIA.listar('sugerencias').filter(function (s) { return Number(s.id_beneficiario) === Number(b.id); });
  var opciones = [5, 4, 3, 2, 1].map(function (n) {
    var texto = n === 5 ? 'Excelente' : n === 4 ? 'Muy bueno' : n === 3 ? 'Aceptable' : n === 2 ? 'Regular' : 'Malo';
    return '<option value="' + n + '">' + n + ' · ' + texto + '</option>';
  }).join('');
  var html = '<section class="tarjeta">' +
    '<h2>Buzón de sugerencias nutricionales</h2>' +
    '<p class="ayuda">Tu opinión sobre el menú llega al operador del PAE y a coordinación. Sin datos personales.</p>' +
    '<div class="rejilla g3">' +
    '<div class="campo"><label for="sCalificacion">Calificación del menú</label><select id="sCalificacion">' + opciones + '</select></div>' +
    '<div class="campo" style="grid-column:span 2"><label for="sComentario">Comentario</label><textarea id="sComentario" placeholder="¿Qué te gustó y qué mejorarías del complemento?"></textarea></div>' +
    '</div>' +
    '<button class="btn p" onclick="guardarSugerencia()">Enviar sugerencia</button>' +
    '<h3>Mis sugerencias</h3>' +
    PIA.tabla(['Fecha', 'Calificación', 'Comentario'], lista.map(function (s) {
      return [PIA.fecha(s.fecha), estrellas(s.calificacion), PIA.esc(s.comentario)];
    }), { vacio: 'Todavía no has dejado sugerencias sobre el menú.' }) +
    '</section>';
  caja.innerHTML = html;
}

/** Guarda una sugerencia nutricional del estudiante consultado. */
function guardarSugerencia() {
  var ben = window.__miBen;
  if (!ben) { PIA.toast('Consulta tu carnet antes de enviar una sugerencia.', 'mal'); return; }
  var calificacion = Number(PIA.valor('sCalificacion'));
  var comentario = PIA.valor('sComentario');
  if (!(calificacion >= 1 && calificacion <= 5)) { PIA.toast('Elige una calificación entre 1 y 5.', 'mal'); return; }
  if (PIA.palabras(comentario) < 5) { PIA.toast('Cuéntanos un poco más: mínimo 5 palabras.', 'mal'); return; }
  PIA.insertar('sugerencias', {
    id_beneficiario: ben.id, codigo_carnet: ben.codigo_carnet,
    calificacion: calificacion, comentario: comentario, fecha: PIA.hoy()
  });
  PIA.toast('Gracias: tu sugerencia quedó registrada.');
  PIA.poner('sComentario', '');
  pintarSugerencias(ben);
}

/* ---------------- Portada: ingreso por rol y cierre de lotes ---------------- */

/** La sesión del panel (no es una tabla del PAE). */
function sesionRade() {
  try {
    var crudo = localStorage.getItem(CLAVE_SESION_RADE);
    return crudo ? JSON.parse(crudo) : null;
  } catch (e) { return null; }
}

/** Pinta el formulario de ingreso o el saludo de la sesión. */
function pintarAcceso() {
  var caja = document.getElementById('accesoRade');
  if (!caja) return;
  var s = sesionRade();
  if (s) {
    caja.innerHTML = '<div class="aviso ok"><b>Bienvenido, ' + PIA.esc(s.nombre) + '.</b><br>Entraste como ' + PIA.esc(s.rol) + '.</div>' +
      '<div class="fila">' +
      '<a class="btn p" href="' + (s.rol === 'Estudiante' ? 'mi-pae.html' : 'validador-carnet.html') + '">Ir a mi panel</a>' +
      '<button class="btn" onclick="salirRade()">Cerrar sesión</button></div>';
    return;
  }
  var roles = ['Operador PAE', 'Docente PAE', 'Estudiante'].map(function (r) {
    return '<option>' + r + '</option>';
  }).join('');
  caja.innerHTML = '<div class="campo"><label for="rRol">Entro como</label><select id="rRol">' + roles + '</select></div>' +
    '<div class="campo"><label for="rCodigo">Carnet o usuario</label><input id="rCodigo" placeholder="LG-2026-0101 o DOC-PAE" autocomplete="off"></div>' +
    '<button class="btn p" onclick="entrarRade()">Entrar</button>' +
    '<p class="pequeno gris" style="margin-top:10px">Prueba con el carnet LG-2026-0101 para entrar como estudiante.</p>';
}

/** Registra el ingreso simulado por rol. */
function entrarRade() {
  var rol = PIA.valor('rRol');
  var codigo = normalizarCarnet(PIA.valor('rCodigo'));
  if (!codigo) { PIA.toast('Escribe tu carnet o usuario.', 'mal'); return; }
  var nombre = codigo;
  if (rol === 'Estudiante') {
    var ben = beneficiarioPorCarnet(codigo);
    if (!ben) { PIA.toast('Ese carnet no está inscrito en el PAE.', 'mal'); return; }
    if (!ben.activo) { PIA.toast('Ese carnet está retirado del PAE.', 'mal'); return; }
    nombre = ben.nombre;
  }
  localStorage.setItem(CLAVE_SESION_RADE, JSON.stringify({
    rol: rol, codigo: codigo, nombre: nombre, desde: new Date().toISOString()
  }));
  PIA.toast('Bienvenido, ' + nombre + '.');
  pintarAcceso();
  if (rol === 'Estudiante') {
    window.location.href = 'mi-pae.html?carnet=' + encodeURIComponent(codigo);
  }
}

/** Cierra la sesión simulada. */
function salirRade() {
  localStorage.removeItem(CLAVE_SESION_RADE);
  PIA.toast('Sesión cerrada.');
  pintarAcceso();
}

/** Menú del día en la portada. */
function pintarMenuHoy(lote) {
  var caja = document.getElementById('menuHoy');
  if (!caja) return;
  if (!lote) {
    caja.innerHTML = '<div class="aviso warn">Hoy no hay lote registrado. <a href="lotes-dashboard.html">Registrar el lote del día</a>.</div>';
    return;
  }
  caja.innerHTML = '<p style="font-size:15px;margin-bottom:10px"><b>' + PIA.esc(lote.menu) + '</b></p>' +
    '<div class="fila"><span class="badge neutro">Llegó ' + PIA.esc(lote.hora_llegada) + '</span>' +
    '<span class="badge neutro">' + PIA.esc(lote.responsable) + '</span>' +
    '<span class="badge ' + (lote.estado === 'ABIERTO' ? 'ok' : 'neutro') + '">' + lote.estado + '</span></div>' +
    '<div class="rejilla g2" style="margin-top:12px">' +
    '<div class="indicador"><b>Vaso de leche</b><strong>' + lote.recibida_leche + '</strong><span>raciones recibidas</span></div>' +
    '<div class="indicador"><b>Plato verde</b><strong>' + lote.recibida_plato + '</strong><span>raciones recibidas</span></div>' +
    '</div>';
}

/** Tabla con el cierre de los últimos lotes. */
function pintarUltimosCierres() {
  var cont = document.getElementById('ultimosCierres');
  if (!cont) return;
  var lista = lotesOrdenados().slice(0, 5);
  cont.innerHTML = PIA.tabla(
    ['Fecha', 'Menú', 'Reclamaron', 'Inasistentes', 'Sobrantes', 'Estado'],
    lista.map(function (l) {
      var c = conciliarLote(l);
      return [
        PIA.fecha(l.fecha), PIA.esc(l.menu), c.reclamaron, c.inasistentes,
        '<b>' + c.sobrantesTotales + '</b>',
        '<span class="badge ' + (l.estado === 'ABIERTO' ? 'ok' : 'neutro') + '">' + l.estado + '</span>'
      ];
    }),
    { vacio: 'Todavía no hay lotes registrados.' }
  );
}

/** Portada: indicadores, menú, accesos y últimos cierres. */
function pintarInicio() {
  var k = document.getElementById('kInscritos');
  if (!k) return;
  var lote = loteDeHoy();
  var c = conciliarLote(lote);
  var activos = PIA.listar('beneficiarios').filter(function (b) { return b.activo; }).length;
  k.textContent = activos;
  document.getElementById('kReclamaron').textContent = c.reclamaron;
  document.getElementById('kInasistentes').textContent = lote ? c.inasistentes : 0;
  document.getElementById('kSobrantes').textContent = lote ? c.sobrantesTotales : 0;
  pintarMenuHoy(lote);
  pintarUltimosCierres();
  pintarAcceso();
}

/* Arranque del panel del operador y del portal del estudiante. */
document.addEventListener('DOMContentLoaded', function () {
  pintarInicio();
  pintarJornadaHoy();
  pintarSelectFechas();
  pintarConciliacion();
  pintarMonitor();
  pintarInasistentes();
  if (document.getElementById('lFecha')) limpiarLote();
  if (document.getElementById('miCarnet')) {
    var cod = PIA.parametro('carnet');
    if (cod) { PIA.poner('miCarnet', cod); consultarMiPae(); }
  }
});