/* ==========================================================================
   generador-pazysalvo.js
   --------------------------------------------------------------------------
   La constancia preliminar de cumplimiento y el tablero de la coordinadora.
   Es la salida del algoritmo: al llegar a 80 horas se marca
   COMPLETADO_80_HORAS y se habilita el certificado imprimible.
   ========================================================================== */

'use strict';

/** ¿El estudiante ya puede pedir su constancia? */
function puedeConstancia(documento) {
  return horasAprobadas(documento) >= META_HORAS_LEY;
}

/** El código consecutivo de una constancia. */
function codigoConstancia(documento) {
  var doc = String(documento || '0000');
  return 'SS-2026-' + doc.slice(-4);
}

/** Pinta la constancia imprimible de un estudiante. */
function pintarConstancia(documento) {
  var cont = document.getElementById('constancia');
  if (!cont) return;
  var est = buscarEstudiante(documento);
  if (!est) {
    cont.innerHTML = '<div class="aviso mal">No encontramos a ese estudiante.</div>';
    return;
  }
  var horas = horasAprobadas(documento);
  var pct = porcentajeAvance(horas);
  if (horas < META_HORAS_LEY) {
    cont.innerHTML = '<div class="aviso warn">Todavía no puedes generar la constancia: llevas <b>' + horas +
      ' de ' + META_HORAS_LEY + '</b> horas. Te faltan ' + horasFaltantes(horas) + '.</div>';
    return;
  }

  var html = '<section class="tarjeta" id="hojaConstancia" style="max-width:720px;margin:0 auto">';
  html += '<div class="centro" style="border-bottom:2px solid var(--primario);padding-bottom:12px;margin-bottom:16px">';
  html += '<div class="pequeno gris">I.E. LOLA GONZÁLEZ · MEDELLÍN</div>';
  html += '<h2 style="margin:6px 0">CONSTANCIA PRELIMINAR DE SERVICIO SOCIAL</h2>';
  html += '<div class="pequeno gris">Resolución 4210 de 1996 · 80 horas reglamentarias</div>';
  html += '</div>';
  html += '<p style="font-size:14px;line-height:1.9">La Coordinación de Servicio Social Estudiantil hace constar que ' +
    '<b>' + PIA.esc(est.nombre) + '</b>, identificado(a) con documento <b>' + PIA.esc(est.documento) + '</b>, ' +
    'del grado <b>' + PIA.esc(est.grado) + '</b>, cumplió <b>' + horas + ' horas</b> de las 80 reglamentarias ' +
    'en las dependencias asignadas por la institución, con un avance del <b>' + pct + '%</b>.</p>';
  html += '<p class="pequeno gris">Código de la constancia: <b>' + PIA.esc(codigoConstancia(documento)) + '</b> · ' +
    'Expedida el ' + PIA.fecha(PIA.hoy()) + '</p>';
  html += '<div class="fila" style="justify-content:space-between;margin-top:34px">';
  html += '<div class="centro pequeno" style="width:45%"><div style="border-top:1px solid var(--tinta);padding-top:5px">' +
    'Coordinadora de Servicio Social<br>Prof. Leidiana</div></div>';
  html += '<div class="centro pequeno" style="width:45%"><div style="border-top:1px solid var(--tinta);padding-top:5px">' +
    'Rectoría<br>I.E. Lola González</div></div>';
  html += '</div>';
  html += '<p class="pista" style="margin-top:16px">Documento preliminar del prototipo. La constancia oficial se firma en secretaría.</p>';
  html += '</section>';
  html += '<div class="fila centro" style="justify-content:center;margin-top:12px">' +
    '<button class="btn p" onclick="window.print()">Imprimir la constancia</button></div>';

  cont.innerHTML = html;
  cont.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Genera la constancia del estudiante que se está consultando. */
function generarConstancia() {
  var doc = PIA.valor('gDocumento');
  var cont = document.getElementById('constancia');
  if (!cont) {
    PIA.toast('Abre el panel del estudiante para ver la constancia.', 'warn');
    return;
  }
  if (!doc) { PIA.toast('Escribe el documento del estudiante.', 'mal'); return; }
  pintarConstancia(doc);
}

/** El tablero de la coordinadora: riesgo, avance y constancias. */
function pintarAdminCoordinadora() {
  var cont = document.getElementById('tableroAdmin');
  if (!cont) return;
  var estudiantes = PIA.listar('estudiantes');
  var pendientes = registrosPendientes('');
  var completos = estudiantes.filter(function (e) { return Number(e.horas_aprobadas) >= META_HORAS_LEY; });
  var enRiesgo = estudiantes.filter(function (e) {
    return Number(e.horas_aprobadas) < META_HORAS_LEY / 2 && !inscripcionDe(e.documento);
  });
  var vacantes = PIA.listar('novedades').filter(function (n) { return n.estado === 'VACANTE_POR_EXCUSA'; });

  var k1 = document.getElementById('cEstudiantes');
  if (k1) k1.textContent = estudiantes.length;
  var k2 = document.getElementById('cCompletos');
  if (k2) k2.textContent = completos.length;
  var k3 = document.getElementById('cPendientes');
  if (k3) k3.textContent = pendientes.length;
  var k4 = document.getElementById('cVacantes');
  if (k4) k4.textContent = vacantes.length;

  var html = '<section class="tarjeta"><h2>Estudiantes en riesgo</h2>' +
    '<p class="ayuda">Menos de 40 horas y sin sede asignada: hay que llamarlos antes de que se les venga la graduación encima.</p>';
  html += PIA.tabla(
    ['Estudiante', 'Grado', 'Horas', 'Faltan', 'Avance', 'Contacto', ''],
    enRiesgo.map(function (e) {
      var h = horasAprobadas(e.documento);
      return [
        PIA.esc(e.nombre), PIA.esc(e.grado), h, horasFaltantes(h),
        porcentajeAvance(h) + '%',
        PIA.esc(e.correo),
        '<a class="btn pq" href="panel-estudiante.html?documento=' + encodeURIComponent(e.documento) + '">Ver panel</a>'
      ];
    }),
    { vacio: 'Ningún estudiante está en riesgo en este momento.' }
  );
  html += '</section>';

  html += '<section class="tarjeta"><h2>Avance por dependencia</h2>' +
    '<p class="ayuda">Horas aprobadas y cupos que quedan en cada sede.</p>';
  html += PIA.tabla(
    ['Dependencia', 'Responsable', 'Horario', 'Cupos libres', 'Horas aprobadas'],
    oportunidades().map(function (o) {
      var horasSede = PIA.listar('registros').filter(function (r) {
        return r.dependencia === o.dependencia && r.estado === 'APROBADO';
      }).reduce(function (a, r) { return a + Number(r.horas || 0); }, 0);
      return [
        PIA.esc(o.dependencia), PIA.esc(o.responsable), PIA.esc(o.dias),
        '<b>' + o.cupos_disponibles + '</b> / ' + o.cupos_totales,
        Math.round(horasSede * 10) / 10 + ' h'
      ];
    })
  );
  html += '</section>';

  html += '<section class="tarjeta"><h2>Constancias habilitadas</h2>' +
    '<p class="ayuda">Estudiantes que ya completaron las 80 horas.</p>';
  html += PIA.tabla(
    ['Estudiante', 'Grado', 'Horas', 'Código', ''],
    completos.map(function (e) {
      return [
        PIA.esc(e.nombre), PIA.esc(e.grado), e.horas_aprobadas,
        '<span class="mono">' + PIA.esc(codigoConstancia(e.documento)) + '</span>',
        '<a class="btn pq p" href="panel-estudiante.html?documento=' + encodeURIComponent(e.documento) + '">Constancia</a>'
      ];
    }),
    { vacio: 'Todavía nadie completa las 80 horas.' }
  );
  html += '</section>';

  cont.innerHTML = html;
}

/** Pinta los indicadores de la portada. */
function pintarInicio() {
  var caja = document.getElementById('iEstudiantes');
  if (!caja) return;
  var estudiantes = PIA.listar('estudiantes');
  caja.textContent = estudiantes.length;
  document.getElementById('iCompletos').textContent = estudiantes.filter(function (e) { return Number(e.horas_aprobadas) >= META_HORAS_LEY; }).length;
  document.getElementById('iCupos').textContent = oportunidades().reduce(function (a, o) { return a + Number(o.cupos_disponibles || 0); }, 0);
  var horas = estudiantes.reduce(function (a, e) { return a + Number(e.horas_aprobadas || 0); }, 0);
  document.getElementById('iHoras').textContent = Math.round(horas * 10) / 10;
}

/* Arranque del tablero de la coordinadora. */
document.addEventListener('DOMContentLoaded', function () {
  pintarAdminCoordinadora();
  pintarInicio();
});