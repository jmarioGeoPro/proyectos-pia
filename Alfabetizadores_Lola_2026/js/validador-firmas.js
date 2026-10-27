/* ==========================================================================
   validador-firmas.js
   --------------------------------------------------------------------------
   El panel del supervisor de la dependencia: firma digital de las jornadas y
   buzón de evaluación del alfabetizador.
   Es la doble validación del algoritmo: el estudiante registra, el supervisor
   aprueba, y solo entonces las horas se suman a la meta de 80.
   ========================================================================== */

'use strict';

/* Las dependencias que un supervisor puede validar. */
function dependencias() {
  var lista = [];
  PIA.listar('oportunidades').forEach(function (o) {
    if (lista.indexOf(o.dependencia) === -1) lista.push(o.dependencia);
  });
  return lista;
}

/** Pinta el selector de dependencias. */
function pintarSelectorDependencias() {
  var sel = document.getElementById('vSede');
  if (!sel || sel.options.length > 1) return;
  dependencias().forEach(function (d) { sel.innerHTML += '<option>' + PIA.esc(d) + '</option>'; });
}

/** Pinta la tabla de registros pendientes y el buzón de evaluación. */
function pintarValidador() {
  var cont = document.getElementById('tablaPendientes');
  if (!cont) return;
  pintarSelectorDependencias();
  var sede = PIA.valor('vSede');
  var pendientes = registrosPendientes(sede);
  cont.innerHTML = PIA.tabla(
    ['Fecha', 'Alfabetizador', 'Dependencia', 'Horario', 'Horas', 'Labor', ''],
    pendientes.map(function (r) {
      return [
        PIA.fecha(r.fecha),
        PIA.esc(r.estudiante),
        PIA.esc(r.dependencia),
        PIA.esc(r.hora_entrada) + ' – ' + PIA.esc(r.hora_salida),
        '<b>' + r.horas + '</b>',
        PIA.esc(r.labor),
        '<div class="acciones"><button class="btn pq p" onclick="abrirFirma(' + r.id + ')">Firmar</button>' +
        '<button class="btn pq pel" onclick="rechazarRegistro(' + r.id + ')">Rechazar</button></div>'
      ];
    }),
    { vacio: 'No hay registros pendientes de firma en esta dependencia.' }
  );
  pintarBuzon();
  pintarIndicadoresValidador();
}

/** Los indicadores del panel del validador. */
function pintarIndicadoresValidador() {
  var caja = document.getElementById('vPendientes');
  if (!caja) return;
  var sede = PIA.valor('vSede');
  var pendientes = registrosPendientes(sede);
  caja.textContent = pendientes.length;
  var horas = pendientes.reduce(function (a, r) { return a + Number(r.horas || 0); }, 0);
  var h = document.getElementById('vHoras');
  if (h) h.textContent = Math.round(horas * 10) / 10;
  var aprobados = PIA.listar('registros').filter(function (r) {
    return r.estado === 'APROBADO' && (!sede || r.dependencia === sede);
  });
  var a = document.getElementById('vAprobados');
  if (a) a.textContent = aprobados.length;
  var notas = aprobados.filter(function (r) { return Number(r.calificacion) > 0; });
  var prom = notas.length ? notas.reduce(function (x, r) { return x + Number(r.calificacion); }, 0) / notas.length : 0;
  var n = document.getElementById('vPromedio');
  if (n) n.textContent = prom ? PIA.num(prom, 1) + ' / 5' : '—';
}

/** Abre la ventana de firma digital de un registro. */
function abrirFirma(id) {
  var r = PIA.listar('registros').filter(function (x) { return Number(x.id) === Number(id); })[0];
  if (!r) return;
  var cuerpo = '<p class="pequeno gris">' + PIA.esc(r.estudiante) + ' · ' + PIA.esc(r.dependencia) + ' · ' +
    PIA.fecha(r.fecha) + ' · ' + PIA.esc(r.hora_entrada) + ' a ' + PIA.esc(r.hora_salida) + ' (' + r.horas + ' h)</p>' +
    '<div class="campo"><label for="fLabor">Labor reportada</label><textarea id="fLabor">' + PIA.esc(r.labor) + '</textarea></div>' +
    '<div class="campo"><label for="fNota">Calificación del desempeño (1 a 5)</label>' +
    '<select id="fNota"><option value="5">5 · Excelente</option><option value="4">4 · Muy bueno</option>' +
    '<option value="3">3 · Aceptable</option><option value="2">2 · Debe mejorar</option><option value="1">1 · Insuficiente</option></select></div>' +
    '<div class="campo"><label for="fObservacion">Observación para el estudiante</label>' +
    '<input id="fObservacion" placeholder="Cumplió con la lectura guiada y fue puntual."></div>' +
    '<div class="campo"><label for="fFirma">Firma digital (tu documento)</label>' +
    '<input id="fFirma" placeholder="Documento del supervisor"><span class="pista">Nadie puede firmar sus propias horas.</span></div>';
  PIA.modal('Firmar la jornada de ' + r.estudiante, cuerpo,
    '<button class="btn" onclick="PIA.cerrarModal()">Cancelar</button>' +
    '<button class="btn p" onclick="firmarRegistro(' + r.id + ')">Aprobar y sumar horas</button>');
}

/**
 * Aprueba una jornada: suma las horas al estudiante, recalcula faltantes y
 * porcentaje, y habilita el paz y salvo si llegó a las 80.
 */
function firmarRegistro(id) {
  var r = PIA.listar('registros').filter(function (x) { return Number(x.id) === Number(id); })[0];
  if (!r) return null;

  var firma = PIA.valor('fFirma');
  var nota = Number(PIA.valor('fNota'));
  var observacion = PIA.valor('fObservacion');
  var labor = PIA.valor('fLabor');

  if (PIA.palabras(firma) < 1) { PIA.toast('Escribe el documento del supervisor para firmar.', 'mal'); return null; }
  if (String(firma) === String(r.documento)) {
    PIA.toast('Un estudiante no puede firmar sus propias horas.', 'mal');
    return null;
  }
  if (!nota || nota < 1 || nota > 5) { PIA.toast('La calificación debe estar entre 1 y 5.', 'mal'); return null; }
  if (!labor) { PIA.toast('La descripción de la labor no puede quedar vacía.', 'mal'); return null; }

  PIA.actualizar('registros', r.id, {
    estado: 'APROBADO', validador: firma, calificacion: nota,
    observacion: observacion, labor: labor
  });

  var est = buscarEstudiante(r.documento);
  if (est) {
    var horas = Number(est.horas_aprobadas || 0) + Number(r.horas || 0);
    var nuevoEstado = estadoPazYSalvo(horas);
    PIA.actualizar('estudiantes', est.id, { horas_aprobadas: horas, estado: nuevoEstado });
    if (nuevoEstado === 'COMPLETADO_80_HORAS') {
      PIA.toast('¡' + est.nombre + ' completó las 80 horas! Se habilitó su paz y salvo.');
    } else {
      PIA.toast('Jornada aprobada: ' + est.nombre + ' lleva ' + horas + ' de 80 horas.');
    }
  }

  PIA.cerrarModal();
  pintarValidador();
  pintarPanelEstudiante();
  pintarAdminCoordinadora();
  return r;
}

/** Rechaza una jornada con su motivo. */
function rechazarRegistro(id) {
  var r = PIA.listar('registros').filter(function (x) { return Number(x.id) === Number(id); })[0];
  if (!r) return;
  var motivo = prompt('Motivo del rechazo (lo verá el estudiante):', 'Horario incompleto');
  if (motivo === null) return;
  PIA.actualizar('registros', r.id, { estado: 'RECHAZADO', observacion: motivo });
  PIA.toast('Jornada rechazada: ' + motivo, 'warn');
  pintarValidador();
  pintarPanelEstudiante();
}

/** Pinta el buzón de evaluación con las jornadas ya aprobadas. */
function pintarBuzon() {
  var cont = document.getElementById('buzonEvaluacion');
  if (!cont) return;
  var sede = PIA.valor('vSede');
  var aprobados = PIA.listar('registros').filter(function (r) {
    return r.estado === 'APROBADO' && (!sede || r.dependencia === sede);
  });
  cont.innerHTML = PIA.tabla(
    ['Alfabetizador', 'Fecha', 'Horas', 'Calificación', 'Observación'],
    aprobados.map(function (r) {
      return [
        PIA.esc(r.estudiante),
        PIA.fecha(r.fecha),
        r.horas,
        Number(r.calificacion) > 0 ? '<b>' + r.calificacion + ' / 5</b>' : '—',
        PIA.esc(r.observacion || 'Sin observación')
      ];
    }),
    { vacio: 'Todavía no hay jornadas aprobadas en esta dependencia.' }
  );
}

/* Arranque del panel del validador. */
document.addEventListener('DOMContentLoaded', function () {
  pintarValidador();
});