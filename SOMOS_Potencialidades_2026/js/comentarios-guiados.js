/* ==========================================================================
   comentarios-guiados.js
   --------------------------------------------------------------------------
   Comentarios positivos guiados: plantillas que obligan a hablar de la obra y
   no de la persona. Es la defensa contra el ciberacoso que pide el PDF.
   ========================================================================== */

"use strict";

/* Las plantillas aprobadas por el equipo. Todas empiezan por una observación. */
var PLANTILLAS_COMENTARIO = [
  "Destaco tu manejo del color porque ",
  "Esta obra me transmite ",
  "Me impresionó la composición, sobre todo ",
  "La técnica que usaste en ",
  "Se nota el proceso detrás de ",
  "Quiero ver más de tu trabajo porque "
];

/* Palabras que convierten una crítica en un ataque personal. */
var PALABRAS_ATAQUE = ["feo", "horrible", "basura", "chiste", "copia", "plagio", "tonto", "bruto", "no sirve", "asqueroso"];

/** Devuelve los comentarios de una obra. */
function comentariosDe(idObra) {
  return PIA.listar("comentarios")
    .filter(function (c) { return Number(c.id_obra) === Number(idObra); })
    .sort(function (a, b) { return String(a.fecha).localeCompare(String(b.fecha)); });
}

/** Devuelve la plantilla con la que empieza un comentario, o null. */
function plantillaDe(texto) {
  for (var i = 0; i < PLANTILLAS_COMENTARIO.length; i++) {
    if (String(texto).indexOf(PLANTILLAS_COMENTARIO[i]) === 0) return PLANTILLAS_COMENTARIO[i];
  }
  return null;
}

/**
 * Valida un comentario: mínimo de palabras, sin enlaces, sin ataques y
 * empezando por una plantilla positiva.
 */
function validarComentario(texto) {
  var limpio = PIA.normalizar(texto);
  if (PIA.palabras(texto) < 6) return "Escribe al menos 6 palabras: un comentario corto no ayuda a nadie.";
  if (limpio.indexOf("http") !== -1) return "No se permiten enlaces en los comentarios.";
  for (var i = 0; i < PALABRAS_ATAQUE.length; i++) {
    if (limpio.indexOf(PALABRAS_ATAQUE[i]) !== -1) {
      return "Ese comentario puede herir a la persona. Cambia la crítica por una sugerencia sobre la obra.";
    }
  }
  if (!plantillaDe(texto)) return "Empieza con una de las plantillas positivas para mantener el tono constructivo.";
  return null;
}

/** Pinta los comentarios y el formulario guiado dentro de la ventana de la obra. */
function pintarComentarios(idObra) {
  var caja = document.getElementById("comentariosObra");
  if (!caja) return;
  var lista = comentariosDe(idObra);
  var html = "<h3>Comentarios guiados (" + lista.length + ")</h3>";
  if (!lista.length) {
    html += "<p class='pequeno gris'>Todavía nadie ha comentado. Sé la primera voz que anima.</p>";
  } else {
    lista.forEach(function (c) {
      html += "<div style='background:#f8fafc;border-radius:9px;padding:9px 12px;margin-bottom:8px'>" +
        "<b class='pequeno'>" + PIA.esc(c.autor_publico) + "</b>" +
        "<span class='pequeno gris'> · " + PIA.fecha(c.fecha) + "</span>" +
        "<p class='pequeno' style='margin-top:3px'>" + PIA.esc(c.texto) + "</p></div>";
    });
  }
  html += "<div class='campo' style='margin-top:10px'><label for='nuevoComentario'>Tu comentario positivo</label>" +
    "<textarea id='nuevoComentario' placeholder='Elige una plantilla y completa la idea'></textarea>" +
    "<span class='pista'>Se habla de la obra, nunca de la persona.</span></div>";
  html += "<div class='fila' style='gap:6px;flex-wrap:wrap'>";
  PLANTILLAS_COMENTARIO.forEach(function (p, i) {
    html += "<button class='btn pq' onclick='elegirPlantilla(" + i + ")'>" + PIA.esc(p.trim()) + "</button>";
  });
  html += "</div>";
  html += "<button class='btn p' style='margin-top:10px' onclick='enviarComentario(" + idObra + ")'>Publicar comentario</button>";
  caja.innerHTML = html;
}

/** Copia una plantilla al campo de texto. */
function elegirPlantilla(indice) {
  var plantilla = PLANTILLAS_COMENTARIO[indice];
  if (!plantilla) return;
  PIA.poner("nuevoComentario", plantilla);
  var campo = document.getElementById("nuevoComentario");
  if (campo) campo.focus();
}

/** Guarda un comentario validado. */
function enviarComentario(idObra) {
  var texto = PIA.valor("nuevoComentario");
  var error = validarComentario(texto);
  if (error) { PIA.toast(error, "mal"); return; }
  var est = estudianteActual();
  if (!est) { PIA.toast("No hay un perfil activo.", "mal"); return; }
  PIA.insertar("comentarios", {
    id_obra: idObra,
    id_estudiante: est.id,
    autor_publico: est.alias,
    plantilla: plantillaDe(texto),
    texto: texto,
    fecha: PIA.hoy()
  });
  PIA.toast("Comentario publicado. Así se construye comunidad.");
  pintarComentarios(idObra);
}
