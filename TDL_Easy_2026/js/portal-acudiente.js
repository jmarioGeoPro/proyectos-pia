/* ==========================================================================
   portal-acudiente.js
   --------------------------------------------------------------------------
   Lo que ve la familia: el semáforo del día, las clases a las que faltó y el
   porcentaje semanal y mensual de asistencia. Cierra el ciclo del algoritmo:
   el acudiente se entera el mismo día.
   ========================================================================== */

"use strict";

/** Fecha local en formato aaaa-mm-dd (sin pasar por UTC). */
function aTextoFecha(d) {
  var m = d.getMonth() + 1, dia = d.getDate();
  return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (dia < 10 ? "0" : "") + dia;
}

/** Lunes y domingo de la semana de una fecha. */
function rangoSemana(fecha) {
  var d = new Date(String(fecha).slice(0, 10) + "T00:00:00");
  var dia = d.getDay();
  var atras = dia === 0 ? 6 : dia - 1;
  return {
    desde: aTextoFecha(new Date(d.getFullYear(), d.getMonth(), d.getDate() - atras)),
    hasta: aTextoFecha(new Date(d.getFullYear(), d.getMonth(), d.getDate() - atras + 6))
  };
}

/** Día de referencia: hoy si hay clases, o el último día que tuvo clases. */
function fechaReferencia() {
  var sesiones = PIA.listar("sesiones");
  var hoy = PIA.hoy();
  for (var i = 0; i < sesiones.length; i++) if (sesiones[i].fecha === hoy) return hoy;
  var mayor = "";
  for (var j = 0; j < sesiones.length; j++) if (String(sesiones[j].fecha) > mayor) mayor = String(sesiones[j].fecha);
  return mayor || hoy;
}

/** Los estudiantes asociados al acudiente que tiene la sesión abierta. */
function hijosDelAcudiente(sesion) {
  var ids = (sesion.estudiantes || []).map(function (x) { return Number(x); });
  return PIA.listar("usuarios").filter(function (u) {
    if (u.rol !== "estudiante") return false;
    if (ids.length) return ids.indexOf(Number(u.id)) !== -1;
    return u.acudiente_correo && u.acudiente_correo === sesion.correo;
  });
}

/** Asistencias y clases programadas de la semana de referencia. */
function asistenciaSemana(estudiante) {
  var rango = rangoSemana(fechaReferencia());
  var sesiones = PIA.listar("sesiones").filter(function (s) {
    return s.curso === estudiante.curso && String(s.fecha) >= rango.desde && String(s.fecha) <= rango.hasta;
  });
  var ids = sesiones.map(function (s) { return Number(s.id); });
  var asistio = PIA.listar("asistencias").filter(function (a) {
    return Number(a.id_estudiante) === Number(estudiante.id) &&
      ids.indexOf(Number(a.id_sesion)) !== -1 && a.estado === "ASISTIO";
  }).length;
  return {
    desde: rango.desde, hasta: rango.hasta,
    programadas: sesiones.length, asistidas: asistio,
    pct: sesiones.length ? porcentajeAsistencia(asistio, sesiones.length) : null
  };
}

/** Pinta el portal completo del acudiente. */
function pintarPortal() {
  var s = sesionActual();
  if (!s) return;
  pintarSesion();

  var hijos = hijosDelAcudiente(s);
  var sel = document.getElementById("hijo");
  var actual = sel && sel.value ? Number(sel.value) : (hijos.length ? Number(hijos[0].id) : 0);
  if (sel) {
    var opciones = "";
    hijos.forEach(function (h) {
      opciones += "<option value='" + h.id + "'" + (Number(h.id) === actual ? " selected" : "") + ">" +
        PIA.esc(h.nombre) + " · " + PIA.esc(h.curso || "") + "</option>";
    });
    sel.innerHTML = opciones || "<option value=''>Sin estudiantes asociados</option>";
    actual = Number(sel.value) || actual;
  }

  var hijo = null;
  hijos.forEach(function (h) { if (Number(h.id) === actual) hijo = h; });
  if (!hijo) hijo = hijos[0] || null;

  var ficha = document.getElementById("fichaEstudiante");
  if (!hijo) {
    if (ficha) ficha.innerHTML = "<div class='aviso mal'>Tu usuario no tiene estudiantes asociados. Pídele al docente que actualice el registro.</div>";
    return;
  }

  var pctMes = porcentajeAsistencia(hijo.asistidas_mes, hijo.programadas_mes);
  var semana = asistenciaSemana(hijo);
  if (ficha) {
    ficha.innerHTML = "<p class='ayuda'>Curso " + PIA.esc(hijo.curso) + " · acudiente " + PIA.esc(hijo.acudiente || "") +
      " · " + PIA.esc(hijo.acudiente_correo || "") + "</p>" +
      "<div class='fila'><span class='badge neutro'>Documento " + PIA.esc(hijo.documento) + "</span>" +
      "<span class='badge neutro'>Año lectivo 2026</span>" +
      "<span class='badge info'>Semana del " + PIA.fecha(semana.desde) + " al " + PIA.fecha(semana.hasta) + "</span></div>";
  }

  ponerTexto("kMes", pctMes + "%");
  ponerTexto("kSemana", semana.pct === null ? "—" : semana.pct + "%");

  var delDia = PIA.listar("sesiones").filter(function (x) {
    return x.curso === hijo.curso && x.fecha === fechaReferencia();
  });
  ponerTexto("kClases", delDia.length);
  var alertas = PIA.listar("alertas").filter(function (a) { return Number(a.id_estudiante) === Number(hijo.id); });
  ponerTexto("kAlertas", alertas.length);

  var semaforo = document.getElementById("semaforoHoy");
  if (semaforo) {
    semaforo.innerHTML = PIA.tabla(["Clase", "Hora", "Semáforo", "Observación"],
      delDia.map(function (x) {
        var reg = registroDe(x.id, hijo.id);
        return [
          PIA.esc(x.asignatura) + "<br><span class='pequeno gris'>Bloque " + x.bloque + " · " + PIA.fecha(x.fecha) + "</span>",
          PIA.esc(x.hora_apertura) + " a " + PIA.esc(x.hora_cierre),
          badgeSemaforo(reg ? reg.estado : ""),
          reg ? PIA.esc(reg.observacion || "") : "El docente aún no cierra la ventana"
        ];
      }),
      { vacio: "Ese día no hubo clases registradas." });
  }

  var cajaAlertas = document.getElementById("alertasAcudiente");
  if (cajaAlertas) {
    var ordenadas = alertas.slice().sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });
    cajaAlertas.innerHTML = PIA.tabla(["Fecha", "Mensaje", "Estado"],
      ordenadas.slice(0, 6).map(function (a) {
        return [PIA.fecha(a.fecha) + "<br><span class='pequeno gris'>" + PIA.esc(a.hora) + "</span>",
          PIA.esc(a.mensaje), "<span class='badge warn'>" + PIA.esc(a.estado) + "</span>"];
      }),
      { vacio: "No hay alertas para este estudiante. Buena señal." });
  }

  var detalle = document.getElementById("detalleSemana");
  if (detalle) {
    var deLaSemana = PIA.listar("sesiones").filter(function (x) {
      return x.curso === hijo.curso && String(x.fecha) >= semana.desde && String(x.fecha) <= semana.hasta;
    });
    detalle.innerHTML = PIA.tabla(["Fecha", "Asignatura", "Bloque", "Estado del estudiante"],
      deLaSemana.map(function (x) {
        var reg = registroDe(x.id, hijo.id);
        return [PIA.fecha(x.fecha), PIA.esc(x.asignatura), "B" + x.bloque, badgeSemaforo(reg ? reg.estado : "")];
      }),
      { vacio: "Esta semana no tiene clases registradas." });
  }
}

/* Arranque del portal del acudiente. */
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("semaforoHoy")) return;
  var s = exigirSesion("acudiente");
  if (!s) return;
  pintarPortal();
});
