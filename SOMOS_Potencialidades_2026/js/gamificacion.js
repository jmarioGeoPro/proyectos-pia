/* ==========================================================================
   gamificacion.js
   --------------------------------------------------------------------------
   Desafíos semanales, participaciones e insignias. La gamificación premia la
   constancia y la colaboración, no solo la cantidad de "me gusta".
   ========================================================================== */

"use strict";

/** El reto que está vigente. */
function desafioVigente() {
  var lista = PIA.listar("desafios").filter(function (d) { return d.estado === "VIGENTE"; });
  return lista.length ? lista[lista.length - 1] : null;
}

/** ¿El estudiante ya se inscribió en el reto? */
function yaParticipa(desafio, idEstudiante) {
  if (!desafio) return false;
  var ids = (desafio.participantes_ids || []).map(function (x) { return Number(x); });
  return ids.indexOf(Number(idEstudiante)) !== -1;
}

/** Tarjeta del reto vigente en la portada. */
function pintarRetosInicio() {
  var caja = document.getElementById("retoInicio");
  if (!caja) return;
  var d = desafioVigente();
  if (!d) { caja.innerHTML = "<div class='vacio'>No hay retos vigentes esta semana.</div>"; return; }
  caja.innerHTML = "<h3 style='font-size:16px;margin-bottom:6px'>" + PIA.esc(d.titulo) + "</h3>" +
    "<p class='pequeno gris'>" + PIA.esc(d.descripcion) + "</p>" +
    "<div class='fila' style='margin-top:10px;gap:6px'>" + badgeCategoria(d.categoria) +
    "<span class='badge warn'>Hasta " + PIA.fecha(d.fecha_fin) + "</span>" +
    "<span class='badge neutro'>" + Number(d.participantes || 0) + " participantes</span>" +
    "<span class='badge info'>" + PIA.esc(d.insignia) + "</span></div>" +
    "<a class='btn p' style='margin-top:12px' href='desafios.html'>Ver los retos</a>";
}

/** Pinta la lista completa de desafíos con su avance. */
function pintarDesafios() {
  var cont = document.getElementById("desafios");
  var est = estudianteActual();
  if (!cont) return;
  var lista = PIA.listar("desafios");
  if (!lista.length) { cont.innerHTML = "<div class='vacio'>Todavía no hay retos publicados.</div>"; return; }
  cont.innerHTML = lista.map(function (d) {
    var inscrito = est && yaParticipa(d, est.id);
    var meta = Number(d.meta || 20);
    var pct = Math.min(100, Math.round(Number(d.participantes || 0) / meta * 100));
    var boton;
    if (d.estado !== "VIGENTE") boton = "<span class='badge neutro'>Reto cerrado</span>";
    else if (inscrito) boton = "<span class='badge ok'>Ya estás participando</span>";
    else boton = "<button class='btn p' onclick='participarDesafio(" + d.id + ")'>Participar en el reto</button>";
    return "<section class='tarjeta' style='margin-bottom:12px'>" +
      "<div class='fila'><h2 style='margin:0;font-size:16px'>" + PIA.esc(d.titulo) + "</h2>" +
      "<span class='badge " + (d.estado === "VIGENTE" ? "ok" : "neutro") + "' style='margin-left:auto'>" + PIA.esc(d.estado) + "</span></div>" +
      "<p class='ayuda' style='margin:6px 0 10px'>" + PIA.esc(d.descripcion) + "</p>" +
      "<div class='fila' style='gap:6px'>" + badgeCategoria(d.categoria) +
      "<span class='badge neutro'>" + PIA.fecha(d.fecha_inicio) + " a " + PIA.fecha(d.fecha_fin) + "</span>" +
      "<span class='badge info'>" + PIA.esc(d.insignia) + "</span>" +
      "<span class='badge warn'>" + Number(d.puntos || 0) + " puntos</span></div>" +
      "<div class='barra' style='margin:12px 0 6px'><i style='width:" + pct + "%'></i></div>" +
      "<p class='pequeno gris'>" + Number(d.participantes || 0) + " de " + meta + " estudiantes ya participan.</p>" +
      "<div class='fila' style='margin-top:8px'>" + boton + "</div></section>";
  }).join("");
  if (est && document.getElementById("misInsignias")) pintarInsignias(est.id, "misInsignias");
}

/** Inscribe al estudiante activo en un reto vigente. */
function participarDesafio(id) {
  var d = PIA.listar("desafios").filter(function (x) { return Number(x.id) === Number(id); })[0];
  var est = estudianteActual();
  if (!d || !est) return;
  if (d.estado !== "VIGENTE") { PIA.toast("Ese reto ya cerró.", "warn"); return; }
  if (yaParticipa(d, est.id)) { PIA.toast("Ya estás participando en este reto.", "warn"); return; }
  var ids = (d.participantes_ids || []).map(function (x) { return Number(x); });
  ids.push(Number(est.id));
  PIA.actualizar("desafios", d.id, { participantes_ids: ids, participantes: ids.length });
  PIA.toast("¡Inscrito! Sube tu obra del reto desde Publicar.");
  pintarDesafios();
}

/** Calcula las insignias de un estudiante a partir de sus datos. */
function insigniasDe(idEstudiante) {
  var obras = PIA.listar("obras").filter(function (o) { return Number(o.id_autor) === Number(idEstudiante); });
  var aprobadas = obras.filter(function (o) { return o.estado === "APROBADA"; });
  var apoyos = obras.reduce(function (a, o) { return a + Number(o.total_apoyos || 0); }, 0);
  var comentarios = PIA.listar("comentarios").filter(function (c) { return Number(c.id_estudiante) === Number(idEstudiante); }).length;
  var retos = PIA.listar("desafios").filter(function (d) { return yaParticipa(d, idEstudiante); }).length;
  var calculadas = [
    { nombre: "Primera obra", lograda: obras.length >= 1, detalle: "Publicaste tu primera obra." },
    { nombre: "Tres obras", lograda: obras.length >= 3, detalle: "Tu portafolio ya tiene tres obras." },
    { nombre: "Voz positiva", lograda: comentarios >= 1, detalle: "Comentaste el trabajo de otra persona." },
    { nombre: "Reto cumplido", lograda: retos >= 1, detalle: "Participaste en un desafío semanal." },
    { nombre: "Diez apoyos", lograda: apoyos >= UMBRAL_APOYOS_CONFIANZA, detalle: "Tus obras suman diez apoyos." }
  ];
  var guardadas = PIA.listar("insignias").filter(function (i) { return Number(i.id_estudiante) === Number(idEstudiante); });
  return { calculadas: calculadas, guardadas: guardadas, obras: obras, aprobadas: aprobadas, apoyos: apoyos };
}

/** Pinta las insignias calculadas y las que ya estaban en el registro. */
function pintarInsignias(idEstudiante, contenedorId) {
  var cont = document.getElementById(contenedorId || "logros");
  if (!cont) return;
  var info = insigniasDe(idEstudiante);
  var html = "";
  info.calculadas.forEach(function (i) {
    html += "<div style='border:1px solid var(--linea);border-radius:10px;padding:11px 13px;background:" +
      (i.lograda ? "#f0fdf4" : "var(--blanco)") + "'>" +
      "<div class='fila' style='gap:6px'><span class='badge " + (i.lograda ? "ok" : "neutro") + "'>" +
      (i.lograda ? "✔" : "○") + "</span><b style='font-size:13px'>" + PIA.esc(i.nombre) + "</b></div>" +
      "<p class='pequeno gris' style='margin-top:4px'>" + PIA.esc(i.detalle) + "</p></div>";
  });
  info.guardadas.forEach(function (i) {
    html += "<div style='border:1px solid var(--linea);border-radius:10px;padding:11px 13px;background:#fffbeb'>" +
      "<div class='fila' style='gap:6px'><span class='badge warn'>★</span><b style='font-size:13px'>" + PIA.esc(i.nombre) + "</b></div>" +
      "<p class='pequeno gris' style='margin-top:4px'>" + PIA.esc(i.descripcion) + " · " + PIA.fecha(i.fecha) + "</p></div>";
  });
  cont.innerHTML = html || "<div class='vacio'>Aún no tienes insignias. Publica tu primera obra.</div>";
}

/* Arranque de la página de desafíos y de la portada. */
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("desafios")) pintarDesafios();
  if (document.getElementById("retoInicio")) pintarRetosInicio();
});
