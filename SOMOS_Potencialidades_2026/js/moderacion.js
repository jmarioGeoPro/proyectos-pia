/* ==========================================================================
   moderacion.js
   --------------------------------------------------------------------------
   Cola de revisión del docente: aprobar, pedir cambios y atender reportes.
   Es el paso 5 y 7 del algoritmo: nada sale a la galería sin aprobación y,
   cuando una obra con alias supera el umbral, se avisa al estudiante.
   ========================================================================== */

"use strict";

/** Obras que esperan revisión docente. */
function obrasEnCola() {
  return PIA.listar("obras").filter(function (o) {
    return o.estado === "PENDIENTE_MODERACION_DOCENTE" || o.estado === "CAMBIOS_SOLICITADOS";
  });
}

/** Etiqueta del estado de moderación. */
function badgeModeracion(estado) {
  var clase = estado === "APROBADA" ? "ok" : (estado === "CAMBIOS_SOLICITADOS" ? "warn" : "info");
  return "<span class='badge " + clase + "'>" + PIA.esc(String(estado).replace(/_/g, " ")) + "</span>";
}

/** Pinta los indicadores y la cola de moderación. */
function pintarModeracion() {
  var obras = PIA.listar("obras");
  var cola = obrasEnCola();
  ponerTexto("mPendientes", cola.length);
  ponerTexto("mAprobadas", obras.filter(function (o) { return o.estado === "APROBADA"; }).length);
  ponerTexto("mReportadas", obras.filter(function (o) { return o.reportada; }).length);
  ponerTexto("mApoyos", obras.reduce(function (a, o) { return a + Number(o.total_apoyos || 0); }, 0));

  var cont = document.getElementById("colaModeracion");
  if (cont) {
    cont.innerHTML = PIA.tabla(["Obra", "Autor", "Categoría", "Estado", "Controles", ""],
      cola.map(function (o) {
        return [
          "<b>" + PIA.esc(o.titulo) + "</b><br><span class='pequeno gris'>" + PIA.esc(o.archivo_media) + "</span>",
          PIA.esc(autorDeObra(o)) + "<br><span class='pequeno gris'>" + PIA.esc(o.grado) + "</span>",
          badgeCategoria(o.categoria),
          badgeModeracion(o.estado),
          "<span class='badge " + (o.texto_alt ? "ok" : "mal") + "'>" + (o.texto_alt ? "Texto alt" : "Sin texto alt") + "</span> " +
            "<span class='badge " + (o.marca_agua ? "ok" : "mal") + "'>" + (o.marca_agua ? "Marca de agua" : "Sin marca") + "</span>",
          "<button class='btn pq p' onclick='abrirModeracion(" + o.id + ")'>Revisar</button>"
        ];
      }),
      { vacio: "No hay obras en la cola. Todo está al día." });
  }
  pintarReportes();
}

/** Abre la ventana de revisión de una obra. */
function abrirModeracion(id) {
  var o = obraPorId(id);
  if (!o) return;
  var cuerpo = "<div class='fila' style='margin-bottom:10px'>" + badgeCategoria(o.categoria) +
    "<span class='badge neutro'>" + PIA.esc(o.tecnica) + "</span>" +
    badgeModeracion(o.estado) + "</div>" +
    "<div style='height:120px;border-radius:10px;background:" + colorCategoria(o.categoria) + ";display:grid;place-items:center;margin-bottom:12px'>" +
    "<span style='font-size:40px;color:rgba(31,36,48,.32)'>" + PIA.esc(String(o.titulo).charAt(0)) + "</span></div>" +
    "<p style='font-size:13px;margin-bottom:8px'><b>Historia:</b> " + PIA.esc(o.historia_proceso) + "</p>" +
    "<p class='pequeno gris'><b>Texto alternativo:</b> " + PIA.esc(o.texto_alt) + "</p>" +
    "<p class='pequeno gris'>Autor público: " + PIA.esc(autorDeObra(o)) + " · archivo: " + PIA.esc(o.archivo_media) + "</p>" +
    "<p class='pequeno gris'>Visibilidad: " + PIA.esc(o.visibilidad) + " · apoyos: " + apoyosDeObra(o) + "</p>" +
    (o.observacion_moderacion ? "<div class='aviso warn'>Observación anterior: " + PIA.esc(o.observacion_moderacion) + "</div>" : "");
  var botones = "<button class='btn' onclick='PIA.cerrarModal()'>Cerrar</button>" +
    "<button class='btn pel' onclick='reportarObra(" + o.id + ")'>Reportar</button>" +
    "<button class='btn' onclick='solicitarCambios(" + o.id + ")'>Pedir cambios</button>" +
    "<button class='btn p' onclick='aprobarObra(" + o.id + ")'>Aprobar</button>";
  PIA.modal("Revisar: " + o.titulo, cuerpo, botones);
}

/** Aprueba una obra y la saca a la galería. */
function aprobarObra(id) {
  var o = obraPorId(id);
  if (!o) return;
  PIA.actualizar("obras", id, {
    estado: "APROBADA",
    visibilidad: "publico",
    observacion_moderacion: "",
    fecha_aprobacion: PIA.hoy()
  });
  PIA.toast("Obra aprobada y publicada en la galería.");
  /* paso 7: aviso motivador al estudiante que sigue en alias */
  if (o.modo_identidad === "ALIAS_ANONIMO" && Number(o.total_apoyos || 0) >= UMBRAL_APOYOS_CONFIANZA) {
    PIA.actualizar("obras", id, { notificado_talento: true });
    PIA.toast("Además, la obra supera los " + UMBRAL_APOYOS_CONFIANZA + " apoyos: su autor ya puede revelar su nombre.", "warn");
  }
  PIA.cerrarModal();
  pintarModeracion();
  if (document.getElementById("galeria")) pintarGaleria();
  if (document.getElementById("destacadas")) pintarInicio();
  if (document.getElementById("portafolio")) pintarPortafolio();
}

/** Pide cambios al estudiante con una observación escrita. */
function solicitarCambios(id) {
  var o = obraPorId(id);
  if (!o) return;
  var motivo = window.prompt("¿Qué debe ajustar el estudiante? (título, texto alternativo, historia, pertinencia)");
  if (motivo === null) return;
  PIA.actualizar("obras", id, {
    estado: "CAMBIOS_SOLICITADOS",
    visibilidad: "borrador",
    observacion_moderacion: String(motivo || "Revisa la descripción de la obra.")
  });
  PIA.toast("Se pidieron cambios y la obra volvió al portafolio del estudiante.");
  PIA.cerrarModal();
  pintarModeracion();
}

/** Reporta una obra y la bloquea preventivamente en la galería. */
function reportarObra(id) {
  var o = obraPorId(id);
  if (!o) return;
  var motivo = window.prompt("Motivo del reporte (contenido ofensivo, datos personales, plagio...)");
  if (motivo === null) return;
  PIA.actualizar("obras", id, {
    reportada: true,
    motivo_reporte: String(motivo || "Reporte sin detalle"),
    visibilidad: "grupo",
    fecha_reporte: PIA.hoy()
  });
  PIA.toast("Obra bloqueada preventivamente. Queda en la lista de reportes.", "warn");
  PIA.cerrarModal();
  pintarModeracion();
  if (document.getElementById("galeria")) pintarGaleria();
}

/** Quita el reporte cuando ya se revisó y no había problema. */
function quitarReporte(id) {
  PIA.actualizar("obras", id, { reportada: false, motivo_reporte: "", visibilidad: "publico" });
  PIA.toast("Reporte retirado: la obra vuelve a la galería.");
  pintarModeracion();
  if (document.getElementById("galeria")) pintarGaleria();
}

/** Pinta la lista de obras reportadas. */
function pintarReportes() {
  var cont = document.getElementById("reportes");
  if (!cont) return;
  var reportadas = PIA.listar("obras").filter(function (o) { return o.reportada; });
  cont.innerHTML = PIA.tabla(["Obra", "Motivo", "Fecha", "Estado", ""],
    reportadas.map(function (o) {
      return [
        "<b>" + PIA.esc(o.titulo) + "</b><br><span class='pequeno gris'>" + PIA.esc(autorDeObra(o)) + "</span>",
        PIA.esc(o.motivo_reporte || "Sin detalle"),
        PIA.fecha(o.fecha_reporte),
        badgeModeracion(o.estado),
        "<div class='acciones'><button class='btn pq' onclick='quitarReporte(" + o.id + ")'>Retirar reporte</button>" +
          "<button class='btn pq p' onclick='abrirModeracion(" + o.id + ")'>Revisar</button></div>"
      ];
    }),
    { vacio: "No hay reportes abiertos." });
}

/* Arranque del panel de moderación. */
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("colaModeracion")) return;
  pintarModeracion();
});
