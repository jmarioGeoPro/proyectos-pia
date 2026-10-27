/* ==========================================================================
   planificador-horarios.js
   --------------------------------------------------------------------------
   La malla semanal y el detector de huecos. Es el paso 4 del algoritmo:
   buscar el primer espacio libre donde quepa la tarea.
   ========================================================================== */

'use strict';

var DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

/** Convierte una hora hh:mm en minutos desde la medianoche. */
function aMinutos(hora) {
  var p = String(hora || '0:0').split(':');
  return Number(p[0]) * 60 + Number(p[1] || 0);
}

/** Convierte minutos en hh:mm. */
function aHora(min) {
  var hh = Math.floor(min / 60), mm = min % 60;
  return (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm;
}

/** El día de hoy, en el nombre que usa la malla. */
function diaDeHoy() {
  var d = new Date().getDay();
  return d === 0 ? 'Domingo' : DIAS[d - 1];
}

/**
 * Busca el primer hueco libre de un día con la duración pedida.
 * Revisa de 6:00 a 22:00 y devuelve el rango, o null si no cabe.
 */
function buscarHueco(dia, minutos) {
  var bloques = PIA.listar('horario')
    .filter(function (b) { return b.dia === dia; })
    .sort(function (a, b) { return aMinutos(a.inicio) - aMinutos(b.inicio); });
  var cursor = 6 * 60;
  var limite = 22 * 60;
  for (var i = 0; i < bloques.length; i++) {
    var inicio = aMinutos(bloques[i].inicio);
    if (inicio - cursor >= minutos) return { inicio: aHora(cursor), fin: aHora(cursor + minutos) };
    cursor = Math.max(cursor, aMinutos(bloques[i].fin));
  }
  if (limite - cursor >= minutos) return { inicio: aHora(cursor), fin: aHora(cursor + minutos) };
  return null;
}

/** Devuelve todos los huecos libres de un día. */
function huecosDelDia(dia) {
  var bloques = PIA.listar('horario')
    .filter(function (b) { return b.dia === dia; })
    .sort(function (a, b) { return aMinutos(a.inicio) - aMinutos(b.inicio); });
  var salida = [];
  var cursor = 6 * 60;
  bloques.forEach(function (b) {
    var ini = aMinutos(b.inicio);
    if (ini - cursor >= 30) salida.push({ inicio: aHora(cursor), fin: aHora(ini), minutos: ini - cursor });
    cursor = Math.max(cursor, aMinutos(b.fin));
  });
  if (22 * 60 - cursor >= 30) salida.push({ inicio: aHora(cursor), fin: '22:00', minutos: 22 * 60 - cursor });
  return salida;
}

/** Pinta la malla semanal. */
function pintarMalla() {
  var cont = document.getElementById('malla');
  if (!cont) return;
  var bloques = PIA.listar('horario');
  var hoy = diaDeHoy();
  var html = '<div class="rejilla g3">';
  DIAS.slice(0, 6).forEach(function (dia) {
    var delDia = bloques.filter(function (b) { return b.dia === dia; }).sort(function (a, b) { return aMinutos(a.inicio) - aMinutos(b.inicio); });
    html += '<div style="border:1px solid var(--linea);border-radius:10px;padding:12px;' +
      (dia === hoy ? 'border-color:var(--primario);background:#faf7ff' : '') + '">';
    html += '<b style="font-size:13px">' + dia + (dia === hoy ? ' · hoy' : '') + '</b>';
    if (!delDia.length) html += '<p class="pequeno gris" style="margin-top:6px">Libre todo el día</p>';
    delDia.forEach(function (b) {
      html += '<div style="margin-top:6px;font-size:12.5px"><span class="badge neutro">' + b.inicio + '-' + b.fin + '</span><br>' + PIA.esc(b.actividad) + '</div>';
    });
    html += '</div>';
  });
  html += '</div>';
  cont.innerHTML = html;
}

/** Pinta los huecos libres del día de hoy. */
function pintarHuecos() {
  var cont = document.getElementById('huecos');
  if (!cont) return;
  var lista = huecosDelDia(diaDeHoy());
  cont.innerHTML = PIA.tabla(['Hueco', 'Minutos', 'Bueno para'],
    lista.map(function (x) {
      return ['<b>' + x.inicio + ' a ' + x.fin + '</b>', x.minutos + ' min',
        x.minutos >= 60 ? 'Una tarea completa' : x.minutos >= 25 ? 'Un bloque Pomodoro' : 'Repasar apuntes'];
    }),
    { vacio: 'Hoy no tienes huecos de más de 30 minutos.' }
  );
}

document.addEventListener('DOMContentLoaded', function () {
  pintarMalla();
  pintarHuecos();
});
