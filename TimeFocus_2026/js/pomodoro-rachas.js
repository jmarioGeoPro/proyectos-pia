/* ==========================================================================
   pomodoro-rachas.js
   --------------------------------------------------------------------------
   El reloj de 25 minutos y las rachas. Cada bloque completado suma minutos y
   alimenta el contador de días seguidos.
   ========================================================================== */

'use strict';

var segundosRestantes = 25 * 60;
var corriendo = false;
var temporizador = null;
var META_RACHA = 5;

/** Pinta el reloj en pantalla. */
function pintarReloj() {
  var caja = document.getElementById('reloj');
  if (!caja) return;
  var m = Math.floor(segundosRestantes / 60), s = segundosRestantes % 60;
  caja.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  var barra = document.getElementById('barraPomo');
  if (barra) barra.style.width = Math.round((1 - segundosRestantes / (25 * 60)) * 100) + '%';
}

/** Arranca o pausa el reloj. */
function alternarPomodoro() {
  var boton = document.getElementById('bIniciar');
  if (corriendo) {
    clearInterval(temporizador);
    corriendo = false;
    if (boton) boton.textContent = 'Continuar';
    return;
  }
  corriendo = true;
  if (boton) boton.textContent = 'Pausar';
  temporizador = setInterval(function () {
    segundosRestantes--;
    if (segundosRestantes <= 0) {
      clearInterval(temporizador);
      corriendo = false;
      if (boton) boton.textContent = 'Iniciar';
      terminarBloque();
    }
    pintarReloj();
  }, 1000);
}

/** Reinicia el reloj a 25 minutos. */
function reiniciarPomodoro() {
  clearInterval(temporizador);
  corriendo = false;
  segundosRestantes = 25 * 60;
  var boton = document.getElementById('bIniciar');
  if (boton) boton.textContent = 'Iniciar';
  pintarReloj();
}

/** Se ejecuta al completar un bloque: guarda el enfoque y suma la racha. */
function terminarBloque() {
  var materia = PIA.valor('pMateria') || 'Sin materia';
  var enfoques = PIA.listar('enfoques');
  var racha = enfoques.length ? Number(enfoques[enfoques.length - 1].racha) + 1 : 1;
  PIA.insertar('enfoques', {
    fecha: PIA.hoy(), materia: materia, minutos: 25,
    racha: racha, logro: racha >= META_RACHA ? 'Racha de ' + racha + ' bloques' : ''
  });
  PIA.toast('¡Bloque completado! 25 minutos de enfoque.');
  segundosRestantes = 25 * 60;
  if (document.getElementById('rDias')) pintarRachas();
}

/** Pinta la racha y los logros. */
function pintarRachas() {
  var enfoques = PIA.listar('enfoques');
  var minutos = enfoques.reduce(function (a, x) { return a + Number(x.minutos || 0); }, 0);
  var racha = enfoques.length ? Number(enfoques[enfoques.length - 1].racha) : 0;
  var d = document.getElementById('rDias'); if (d) d.textContent = racha;
  var m = document.getElementById('rMin'); if (m) m.textContent = minutos;
  var cont = document.getElementById('logros');
  if (!cont) return;
  var metas = [
    { nombre: 'Primer bloque', alcanzado: enfoques.length >= 1 },
    { nombre: 'Cinco bloques', alcanzado: enfoques.length >= 5 },
    { nombre: 'Dos horas de enfoque', alcanzado: minutos >= 120 },
    { nombre: 'Racha de 5', alcanzado: racha >= 5 }
  ];
  cont.innerHTML = metas.map(function (m2) {
    return '<div class="fila" style="gap:8px;margin-bottom:7px"><span class="badge ' +
      (m2.alcanzado ? 'ok' : 'neutro') + '">' + (m2.alcanzado ? '✔' : '○') + '</span>' +
      '<span class="pequeno">' + m2.nombre + '</span></div>';
  }).join('');
}

document.addEventListener('DOMContentLoaded', function () {
  pintarReloj();
  pintarRachas();
});
