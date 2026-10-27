/* ==========================================================================
   asistente-pasos.js
   --------------------------------------------------------------------------
   El asistente que descompone una tarea grande en pasos pequeños. Una tarea
   con cinco pasos se empieza; una tarea enorme se aplaza.
   ========================================================================== */

'use strict';

/* Plantillas de pasos según lo que se detecte en el título. */
var PLANTILLAS = [
  { clave: ['informe', 'trabajo escrito', 'ensayo'], pasos: ['Buscar la información', 'Hacer el esquema', 'Redactar el borrador', 'Revisar ortografía', 'Entregar'] },
  { clave: ['exposición', 'exposicion', 'sustentación'], pasos: ['Investigar el tema', 'Armar las diapositivas', 'Escribir el guion', 'Ensayar en voz alta', 'Presentar'] },
  { clave: ['taller', 'ejercicios', 'guía'], pasos: ['Leer la guía', 'Resolver los primeros ejercicios', 'Resolver el resto', 'Comparar con un compañero', 'Entregar'] },
  { clave: ['maqueta', 'modelo', 'prototipo'], pasos: ['Listar los materiales', 'Conseguir los materiales', 'Armar la base', 'Detallar', 'Presentar al equipo'] },
  { clave: [], pasos: ['Entender qué piden', 'Buscar la información', 'Hacer una primera versión', 'Revisar', 'Entregar'] }
];

/** Propone los pasos para un título de tarea. */
function proponerPasos() {
  var titulo = PIA.valor('aTitulo');
  var caja = document.getElementById('aPasos');
  if (!caja) return;
  if (!titulo) { PIA.toast('Escribe primero el título de la tarea.', 'mal'); return; }
  var t = PIA.normalizar(titulo);
  var plantilla = PLANTILLAS[PLANTILLAS.length - 1];
  for (var i = 0; i < PLANTILLAS.length; i++) {
    for (var j = 0; j < PLANTILLAS[i].clave.length; j++) {
      if (t.indexOf(PLANTILLAS[i].clave[j]) !== -1) { plantilla = PLANTILLAS[i]; i = PLANTILLAS.length; break; }
    }
  }
  var html = '<div class="aviso ok">El asistente propone estos pasos para <b>' + PIA.esc(titulo) + '</b>:</div>';
  html += '<ol style="margin-left:18px;line-height:1.9;font-size:13.5px">';
  plantilla.pasos.forEach(function (p) { html += '<li>' + PIA.esc(p) + '</li>'; });
  html += '</ol>';
  html += '<button class="btn p" onclick="usarPasos()">Usar estos pasos en la tarea</button>';
  caja.innerHTML = html;
  window.__pasosPropuestos = plantilla.pasos;
}

/** Lleva los pasos propuestos al formulario de la tarea. */
function usarPasos() {
  var pasos = window.__pasosPropuestos || [];
  PIA.poner('tSubtareas', pasos.join(String.fromCharCode(10)));
  PIA.poner('tTitulo', PIA.valor('aTitulo'));
  PIA.toast('Pasos copiados al formulario.');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
