/* ==========================================================================
   filtro-lexico.js
   --------------------------------------------------------------------------
   Diccionario preventivo de lenguaje ofensivo y contador de palabras.
   Son las reglas 3 y 4 del algoritmo: entre 5 y 150 palabras, sin ofensas.
   ========================================================================== */

'use strict';

/* Las palabras que se bloquean. En un caso real se amplía con el Comité. */
var LISTA_NEGRA = ['groseria', 'insulto', 'idiota', 'estupido', 'estúpido', 'bruto', 'spam'];

/* El máximo de palabras que acepta un mensaje. */
var MAX_PALABRAS = 150;

/** Revisa el texto y devuelve la palabra ofensiva encontrada, o null. */
function palabraOfensiva(texto) {
  var limpio = PIA.normalizar(texto);
  for (var i = 0; i < LISTA_NEGRA.length; i++) {
    var p = PIA.normalizar(LISTA_NEGRA[i]);
    if (limpio.indexOf(p) !== -1) return LISTA_NEGRA[i];
  }
  return null;
}

/** Valida el mensaje completo. Devuelve un error o null. */
function validarMensaje(texto) {
  var total = PIA.palabras(texto);
  if (!String(texto || '').trim()) return 'Escribe el mensaje de tu solicitud.';
  if (total < 5) return 'El mensaje debe tener al menos 5 palabras (llevas ' + total + ').';
  if (total > MAX_PALABRAS) return 'El mensaje no puede pasar de ' + MAX_PALABRAS + ' palabras.';
  var ofensiva = palabraOfensiva(texto);
  if (ofensiva) return 'Mensaje bloqueado: evita el lenguaje ofensivo. Promovemos el respeto.';
  return null;
}

/* El contador de palabras del formulario. */
document.addEventListener('input', function (ev) {
  if (!ev.target || ev.target.id !== 'mensaje') return;
  var caja = document.getElementById('contador');
  if (!caja) return;
  var total = PIA.palabras(ev.target.value);
  caja.textContent = total;
  caja.style.color = total > MAX_PALABRAS ? '#b91c1c' : (total > 0 && total < 5 ? '#b45309' : '#15803d');
});
