/* ==========================================================================
   bolsa-reemplazos.js
   --------------------------------------------------------------------------
   Catálogo de sedes con cupos y la bolsa inteligente de reemplazos.
   Es la rama REPORTAR_INASISTENCIA del algoritmo: el turno del día queda
   VACANTE_POR_EXCUSA y se publica para que otro compañero lo cubra.
   ========================================================================== */

'use strict';

/** Las sedes con cupos disponibles. */
function oportunidades() { return PIA.listar('oportunidades'); }

/** Las novedades de la bolsa (excusas y reemplazos del día). */
function novedades() {
  return PIA.listar('novedades').slice().sort(function (a, b) {
    return String(b.fecha).localeCompare(String(a.fecha));
  });
}

/** Etiqueta de color del estado de una novedad. */
function badgeNovedad(e) {
  var clase = e === 'CUBIERTO' ? 'ok' : e === 'VACANTE_POR_EXCUSA' ? 'warn' : 'mal';
  var texto = e === 'CUBIERTO' ? 'CUBIERTO' : e === 'VACANTE_POR_EXCUSA' ? 'VACANTE HOY' : 'SIN CUBRIR';
  return '<span class="badge ' + clase + '">' + texto + '</span>';
}

/** Pinta las tarjetas de sedes con sus cupos. */
function pintarOportunidades() {
  var cont = document.getElementById('sedes');
  if (!cont) return;
  var lista = oportunidades();
  var selector = document.getElementById('nSede');
  if (selector && selector.options.length === 1) {
    lista.forEach(function (o) { selector.innerHTML += '<option>' + PIA.esc(o.dependencia) + '</option>'; });
  }
  cont.innerHTML = lista.map(function (o) {
    var libres = Number(o.cupos_disponibles || 0);
    return '<div class="tarjeta" style="margin:0">' +
      '<h3 style="margin:0 0 4px">' + PIA.esc(o.dependencia) + '</h3>' +
      '<p class="pequeno gris" style="margin-bottom:8px">' + PIA.esc(o.descripcion) + '</p>' +
      '<p class="pequeno"><b>Responsable:</b> ' + PIA.esc(o.responsable) + '<br>' +
      '<b>Horario:</b> ' + PIA.esc(o.dias) + '</p>' +
      '<div class="fila" style="margin:8px 0">' +
      (libres > 0 ? '<span class="badge ok">' + libres + ' cupos libres</span>' : '<span class="badge mal">Sin cupos</span>') +
      '<span class="badge neutro">' + o.cupos_totales + ' en total</span></div>' +
      '<button class="btn pq p" ' + (libres > 0 ? 'onclick="postularse(' + o.id + ')"' : 'disabled') + '>Postularme</button>' +
      '</div>';
  }).join('');
}

/** Un estudiante toma un cupo de una sede. */
function postularse(id) {
  var documento = PIA.valor('bDocumento');
  if (!documento) { PIA.toast('Escribe tu documento arriba para postularte.', 'mal'); return null; }
  var est = buscarEstudiante(documento);
  if (!est) { PIA.toast('No encontramos tu documento en la lista de alfabetizadores.', 'mal'); return null; }
  var sede = oportunidades().filter(function (x) { return Number(x.id) === Number(id); })[0];
  if (!sede) return null;
  if (Number(sede.cupos_disponibles || 0) <= 0) { PIA.toast('Esa sede ya no tiene cupos.', 'mal'); return null; }
  var yaTiene = PIA.listar('inscripciones').filter(function (x) {
    return String(x.documento) === String(documento) && x.estado === 'ACTIVA';
  })[0];
  if (yaTiene) {
    PIA.toast('Ya tienes una sede asignada: ' + yaTiene.dependencia + '.', 'warn');
    return null;
  }

  PIA.insertar('inscripciones', {
    documento: est.documento, estudiante: est.nombre, dependencia: sede.dependencia,
    dia: String(sede.dias).split(' ')[0], hora: String(sede.dias).split('·')[1] || sede.dias,
    estado: 'ACTIVA', fecha: PIA.hoy()
  });
  PIA.actualizar('oportunidades', sede.id, { cupos_disponibles: Number(sede.cupos_disponibles) - 1 });
  PIA.toast('Quedaste inscrito en ' + sede.dependencia + '.');
  pintarOportunidades();
  pintarAdminCoordinadora();
  return sede;
}

/** Abre el formulario de novedad y lo deja listo. */
function reportarInasistencia() {
  var caja = document.getElementById('resultadoNovedad');
  var documento = PIA.valor('bDocumento');
  var sede = PIA.valor('nSede');
  var motivo = PIA.valor('nMotivo');

  function avisar(tipo, html) {
    if (caja) caja.innerHTML = '<div class="aviso ' + tipo + '">' + html + '</div>';
  }

  if (!documento) { avisar('mal', 'Escribe tu documento para reportar la novedad.'); return null; }
  var est = buscarEstudiante(documento);
  if (!est) { avisar('mal', 'No encontramos ese documento entre los alfabetizadores.'); return null; }
  if (!sede) { avisar('mal', 'Elige la dependencia en la que no pudiste asistir.'); return null; }
  if (PIA.palabras(motivo) < 3) { avisar('mal', 'Cuéntanos el motivo con al menos 3 palabras.'); return null; }

  /* el turno se abre a reemplazo el mismo día */
  var novedad = PIA.insertar('novedades', {
    documento: est.documento, estudiante: est.nombre, dependencia: sede, fecha: PIA.hoy(),
    motivo: motivo, estado: 'VACANTE_POR_EXCUSA', reemplazo: '',
    publicado: 'Publicado en la bolsa de reemplazos'
  });

  var op = oportunidades().filter(function (x) { return x.dependencia === sede; })[0];
  if (op) PIA.actualizar('oportunidades', op.id, { cupos_disponibles: Number(op.cupos_disponibles || 0) + 1 });

  avisar('ok', 'Novedad registrada a tiempo. Se activó la bolsa de reemplazos: el cupo de <b>' +
    PIA.esc(sede) + '</b> quedó publicado para hoy.');
  PIA.toast('Novedad registrada. La bolsa de reemplazos está activa.');
  pintarBolsa();
  pintarOportunidades();
  pintarAdminCoordinadora();
  return novedad;
}

/**
 * Los compañeros que pueden cubrir una novedad: les faltan horas, no son
 * quienes reportaron la excusa y no tienen jornada registrada ese día.
 */
function candidatosPara(novedad) {
  var delDia = PIA.listar('registros').filter(function (r) {
    return String(r.fecha) === String(novedad.fecha);
  }).map(function (r) { return String(r.documento); });
  return PIA.listar('estudiantes').filter(function (e) {
    if (String(e.documento) === String(novedad.documento)) return false;
    if (horasAprobadas(e.documento) >= META_HORAS_LEY) return false;
    if (delDia.indexOf(String(e.documento)) !== -1) return false;
    return true;
  });
}

/** Abre la lista de candidatos para cubrir una vacante. */
function abrirBolsa(idNovedad) {
  var n = PIA.listar('novedades').filter(function (x) { return Number(x.id) === Number(idNovedad); })[0];
  if (!n) return;
  var candidatos = candidatosPara(n);
  var cuerpo = '<p class="pequeno gris">Cupo de <b>' + PIA.esc(n.dependencia) + '</b> del ' + PIA.fecha(n.fecha) +
    '. Reportó: ' + PIA.esc(n.estudiante) + '.</p>';
  if (!candidatos.length) {
    cuerpo += '<div class="aviso warn">No hay compañeros disponibles con horas pendientes y sin jornada registrada ese día.</div>';
  } else {
    candidatos.forEach(function (c) {
      cuerpo += '<div class="fila" style="justify-content:space-between;border-bottom:1px solid var(--linea);padding:7px 0">' +
        '<span><b>' + PIA.esc(c.nombre) + '</b><br><span class="pequeno gris">' + PIA.esc(c.grado) +
        ' · ' + horasAprobadas(c.documento) + ' / 80 horas</span></span>' +
        '<button class="btn pq p" onclick="cubrirReemplazo(' + n.id + ', ' + qdoc(c.documento) + ')">Asignar</button></div>';
    });
  }
  PIA.modal('Bolsa de reemplazos', cuerpo, '<button class="btn" onclick="PIA.cerrarModal()">Cerrar</button>');
}

/** Deja el documento entre comillas para usarlo dentro del HTML. */
function qdoc(doc) { return "'" + String(doc) + "'"; }

/** Asigna un reemplazo a una vacante y cierra la novedad. */
function cubrirReemplazo(idNovedad, documento) {
  var n = PIA.listar('novedades').filter(function (x) { return Number(x.id) === Number(idNovedad); })[0];
  if (!n) return null;
  var est = buscarEstudiante(documento);
  if (!est) { PIA.toast('Ese compañero no está registrado.', 'mal'); return null; }

  PIA.actualizar('novedades', n.id, {
    estado: 'CUBIERTO', reemplazo: est.nombre,
    publicado: 'Cubierto por ' + est.nombre
  });
  var op = oportunidades().filter(function (x) { return x.dependencia === n.dependencia; })[0];
  if (op && Number(op.cupos_disponibles) > 0) {
    PIA.actualizar('oportunidades', op.id, { cupos_disponibles: Number(op.cupos_disponibles) - 1 });
  }
  PIA.cerrarModal();
  PIA.toast('Vacante cubierta por ' + est.nombre + '.');
  pintarBolsa();
  pintarOportunidades();
  pintarAdminCoordinadora();
  return n;
}

/** Pinta la tabla de la bolsa de reemplazos. */
function pintarBolsa() {
  var cont = document.getElementById('bolsa');
  if (!cont) return;
  var lista = novedades();
  cont.innerHTML = PIA.tabla(
    ['Fecha', 'Quién reportó', 'Dependencia', 'Motivo', 'Estado', 'Reemplazo', ''],
    lista.map(function (n) {
      var boton = n.estado === 'VACANTE_POR_EXCUSA'
        ? '<button class="btn pq p" onclick="abrirBolsa(' + n.id + ')">Cubrir</button>'
        : '<span class="pequeno gris">—</span>';
      return [
        PIA.fecha(n.fecha),
        PIA.esc(n.estudiante),
        PIA.esc(n.dependencia),
        PIA.esc(n.motivo),
        badgeNovedad(n.estado),
        PIA.esc(n.reemplazo || '—'),
        boton
      ];
    }),
    { vacio: 'No hay novedades registradas. La bolsa está vacía.' }
  );
}

/* Arranque de la página de sedes. */
document.addEventListener('DOMContentLoaded', function () {
  pintarOportunidades();
  pintarBolsa();
});