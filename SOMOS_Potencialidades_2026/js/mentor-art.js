/* ==========================================================================
   mentor-art.js
   --------------------------------------------------------------------------
   Mentor Art simulado con reglas: sugiere técnicas y preguntas según la
   categoría, y ayuda a redactar el texto alternativo. No crea la obra ni
   reemplaza la autoría del estudiante.
   ========================================================================== */

"use strict";

/* Tres sugerencias por categoría, escritas por el equipo. */
var SUGERENCIAS_ARTE = {
  Dibujo: [
    "Prueba tres grosores de lápiz: uno para el contorno, otro para la sombra y uno fino para los detalles.",
    "Antes de sombrear decide de dónde viene la luz y marca esa zona con un trazo muy suave.",
    "Haz tres bocetos de dos minutos y desarrolla el que tenga la pose más clara."
  ],
  Pintura: [
    "Trabaja por capas: primero los colores claros, después los oscuros; así no se ensucia la mezcla.",
    "Deja secar cada capa antes de la siguiente y prueba la mezcla en un papel aparte.",
    "Elige tres colores principales y un cuarto color de acento para que la obra respire."
  ],
  "Fotografía": [
    "Busca una luz lateral: da volumen y textura a lo que fotografías.",
    "Limpia el lente antes de disparar y sostén el celular con las dos manos para evitar el movimiento.",
    "Prueba el mismo encuadre desde arriba, a la altura de los ojos y desde el suelo."
  ],
  "Poesía": [
    "Lee el poema en voz alta: donde te falte el aire, sobra una palabra.",
    "Cambia los adjetivos obvios por imágenes concretas: no digas tristeza, describe el objeto que la guarda.",
    "Escribe primero sin rima y con rima después; la rima no puede mandar sobre lo que quieres decir."
  ],
  "Música": [
    "Graba la idea con el celular antes de olvidarla; después decide el tempo y la tonalidad.",
    "Graba cada instrumento o voz por separado y mezcla con audífonos para escuchar los detalles.",
    "Repite el coro con una variación mínima la última vez: el oyente lo reconoce y se sorprende."
  ],
  Danza: [
    "Cuenta la coreografía en ocho tiempos y marca cada cambio de dirección en el piso.",
    "Grábate desde el frente y desde un lado: el video muestra lo que el espejo esconde.",
    "Elige un gesto pequeño y repítelo como firma de la obra."
  ],
  Audiovisual: [
    "Escribe el guion en tres columnas: qué se ve, qué se escucha y qué se siente.",
    "Graba planos de cinco segundos y cámbialos en la edición: el ritmo aparece en el corte.",
    "Cuida el sonido: un video con buen audio se perdona más que uno con buena imagen y mal sonido."
  ],
  Narrativa: [
    "Empieza por el conflicto, no por la descripción del lugar.",
    "Escribe una primera versión sin corregir y corrige al día siguiente con otra cabeza.",
    "Lee tu cuento en voz alta: si te aburre una frase, al lector también."
  ]
};

/* La categoría por defecto cuando no hay ninguna elegida. */
var CATEGORIA_BASE = "Dibujo";

/** Devuelve las sugerencias de una categoría. */
function sugerenciasDe(categoria) {
  return SUGERENCIAS_ARTE[categoria] || SUGERENCIAS_ARTE[CATEGORIA_BASE];
}

/** Pinta el panel del mentor con sugerencias y una pregunta guía. */
function pintarMentor() {
  var caja = document.getElementById("mentor");
  if (!caja) return;
  var categoria = PIA.valor("categoria") || CATEGORIA_BASE;
  var historia = PIA.valor("historia");
  var lista = sugerenciasDe(categoria);
  var html = "<h3 style='font-size:14px;margin-bottom:6px'>Sugerencias para " + PIA.esc(categoria) + "</h3>";
  html += "<p class='pequeno gris' style='margin-bottom:10px'>El mentor no dibuja por ti: te hace preguntas y te propone técnicas.</p>";
  lista.forEach(function (s, i) {
    html += "<div style='display:flex;gap:8px;margin-bottom:8px'>" +
      "<span class='badge info'>" + (i + 1) + "</span>" +
      "<span class='pequeno'>" + PIA.esc(s) + "</span></div>";
  });
  html += "<div class='aviso'>" + pistaDe(categoria, historia) + "</div>";
  html += "<button class='btn' style='margin-top:10px' onclick='sugerirAlt()'>Sugerirme el texto alternativo</button>";
  caja.innerHTML = html;
}

/** Pregunta guía según lo que el estudiante lleva escrito. */
function pistaDe(categoria, historia) {
  var n = PIA.palabras(historia);
  if (n === 0) return "Cuenta en tu diario qué te motivó y qué técnica usaste: eso alimenta tu portafolio.";
  if (n < 10) return "Tu historia tiene " + n + " palabra(s). Describe el proceso: materiales, tiempo y dificultades.";
  return "Buen diario de proceso: " + n + " palabras. Revisa ahora si el texto alternativo describe lo que se ve.";
}

/** Propone un texto alternativo a partir del título y la historia. */
function sugerirAlt() {
  var titulo = PIA.valor("titulo") || "Mi obra";
  var categoria = PIA.valor("categoria") || CATEGORIA_BASE;
  var historia = PIA.valor("historia");
  var base = categoria + " titulada " + titulo + ". ";
  if (historia) {
    var corte = String(historia).split(".")[0];
    base += corte + ".";
  } else {
    base += "Describe los colores, la técnica y lo que quisiste expresar.";
  }
  PIA.poner("textoAlt", base);
  PIA.toast("Texto alternativo propuesto. Ajústalo con tus palabras.");
}

/* Arranque del panel del mentor en la página de publicación. */
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("mentor")) pintarMentor();
});
