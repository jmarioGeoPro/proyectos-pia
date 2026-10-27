/* ==========================================================================
   panel-docente.js
   --------------------------------------------------------------------------
   Generador del QR de la clase, planilla en vivo y cierre de la ventana.
   El cierre aplica el paso 5 del algoritmo: a quien no escaneó se le registra
   la inasistencia y se le avisa al acudiente.
   ========================================================================== */

"use strict";

/* La sesión que el docente quiere mirar en la planilla. */
var sesionElegida = null;

/** Siglas de una asignatura para el token: Pensamiento Computacional -> PC. */
function siglasAsignatura(nombre) {
  var limpio = PIA.normalizar(nombre).replace(/[^a-z ]/g, "");
  var palabras = limpio.split(" ").filter(Boolean);
  var siglas = "";
  for (var i = 0; i < palabras.length && siglas.length < 4; i++) siglas += palabras[i].charAt(0);
  return siglas.toUpperCase() || "CLA";
}

/** Token del QR de una clase: QR-MAT10-20261027-B1. */
function armarToken(asignatura, bloque) {
  var fecha = PIA.hoy().replace(/-/g, "");
  return "QR-" + siglasAsignatura(asignatura) + "10-" + fecha + "-B" + bloque;
}

/** Dibuja el patrón del QR a partir del token, con sus tres esquinas fijas. */
function pintarQR(token) {
  var caja = document.getElementById("qrCaja");
  if (!caja) return;
  var lado = 21;
  var semilla = 7;
  var texto = String(token || "TDL-EASY");
  for (var i = 0; i < texto.length; i++) semilla = (semilla * 31 + texto.charCodeAt(i)) % 99991;

  function fijo(fila, col) {
    var esquinas = [[0, 0], [0, lado - 7], [lado - 7, 0]];
    for (var k = 0; k < esquinas.length; k++) {
      var f = esquinas[k][0], c = esquinas[k][1];
      if (fila >= f && fila < f + 7 && col >= c && col < c + 7) {
        var borde = fila === f || fila === f + 6 || col === c || col === c + 6;
        var centro = fila >= f + 2 && fila <= f + 4 && col >= c + 2 && col <= c + 4;
        return borde || centro;
      }
    }
    return null;
  }

  var celdas = "";
  for (var f2 = 0; f2 < lado; f2++) {
    for (var c2 = 0; c2 < lado; c2++) {
      var marca = fijo(f2, c2);
      var negro = marca === null ? ((f2 * 7 + c2 * 13 + semilla + f2 * c2) % 5) < 2 : marca;
      celdas += "<i style='display:block;background:" + (negro ? "#0f172a" : "#ffffff") + "'></i>";
    }
  }
  caja.innerHTML = "<div style='display:inline-block;background:#fff;padding:10px;border:1px solid var(--linea);border-radius:12px'>" +
    "<div style='display:grid;grid-template-columns:repeat(21,1fr);width:252px;height:252px;gap:1px'>" + celdas + "</div></div>" +
    "<p class='mono' style='font-size:14px;margin:10px 0 2px;word-break:break-all'>" + PIA.esc(texto) + "</p>" +
    "<p class='pequeno gris'>Vale " + MINUTOS_VENTANA + " minutos y un solo escaneo por estudiante.</p>";
}

/** La sesión que se muestra en la planilla. */
function sesionParaMostrar() {
  var lista = PIA.listar("sesiones");
  if (!lista.length) return null;
  if (sesionElegida) {
    for (var i = 0; i < lista.length; i++) {
      if (Number(lista[i].id) === Number(sesionElegida)) return lista[i];
    }
  }
  return lista[lista.length - 1];
}

/** Llena el selector de sesiones de clase. */
function pintarSelectorSesiones(lista, sesion) {
  var sel = document.getElementById("sSesion");
  if (!sel) return;
  var opciones = "<option value=''>Última sesión</option>";
  for (var i = lista.length - 1; i >= 0; i--) {
    var s = lista[i];
    opciones += "<option value='" + s.id + "'" + (sesion && Number(s.id) === Number(sesion.id) ? " selected" : "") + ">" +
      PIA.esc(s.asignatura) + " · " + PIA.fecha(s.fecha) + " · B" + s.bloque + " · " + PIA.esc(s.estado) + "</option>";
  }
  sel.innerHTML = opciones;
}

/** Cuántos escanearon y cuántos quedaron en rojo en una sesión. */
function resumenSesion(sesion) {
  var regs = PIA.listar("asistencias").filter(function (a) { return Number(a.id_sesion) === Number(sesion.id); });
  return {
    asistio: regs.filter(function (a) { return a.estado === "ASISTIO"; }).length,
    falto: regs.filter(function (a) { return a.estado === "FALTO"; }).length,
    total: estudiantesDelCurso(sesion.curso).length
  };
}

/** Pinta la planilla del salón para la sesión elegida. */
function pintarPlanilla(sesion) {
  var cont = document.getElementById("planilla");
  if (!cont) return;
  if (!sesion) {
    cont.innerHTML = "<div class='vacio'>Todavía no hay sesiones de clase.</div>";
    return;
  }
  var estudiantes = estudiantesDelCurso(sesion.curso);
  cont.innerHTML = PIA.tabla(["Estudiante", "Semáforo", "Hora", "Mes", ""],
    estudiantes.map(function (e) {
      var reg = registroDe(sesion.id, e.id);
      var pct = porcentajeAsistencia(e.asistidas_mes, e.programadas_mes);
      return [
        PIA.esc(e.nombre) + "<br><span class='pequeno gris mono'>" + PIA.esc(e.documento) + "</span>",
        badgeSemaforo(reg ? reg.estado : ""),
        reg ? PIA.esc(reg.hora) : "—",
        "<b style='color:" + colorPorcentaje(pct) + "'>" + pct + "%</b>",
        reg ? "" : "<button class='btn pq' onclick='marcarFalta(" + sesion.id + "," + e.id + ")'>Marcar falta</button>"
      ];
    }),
    { vacio: "Este curso no tiene estudiantes registrados." });
}

/** Pinta la tabla de sesiones de la semana. */
function pintarTablaSesiones(lista) {
  var cont = document.getElementById("tablaSesiones");
  if (!cont) return;
  var filas = lista.slice().reverse().slice(0, 8).map(function (s) {
    var r = resumenSesion(s);
    return [
      "<span class='mono'>" + PIA.esc(s.codigo) + "</span>",
      PIA.esc(s.asignatura),
      PIA.fecha(s.fecha) + "<br><span class='pequeno gris'>B" + s.bloque + " · " + PIA.esc(s.hora_apertura) + " a " + PIA.esc(s.hora_cierre) + "</span>",
      "<span class='badge ok'>" + r.asistio + " ✔</span> <span class='badge mal'>" + r.falto + " ✕</span>",
      badgeSesion(s.estado),
      "<button class='btn pq' onclick='verSesion(" + s.id + ")'>Ver planilla</button>"
    ];
  });
  cont.innerHTML = PIA.tabla(["Código", "Asignatura", "Fecha", "Marcas", "Estado", ""], filas,
    { vacio: "Aún no hay sesiones de clase." });
}

/** Pinta todo el panel: indicadores, QR, planilla y sesiones. */
function pintarPanelDocente() {
  var lista = PIA.listar("sesiones");
  var sesion = sesionParaMostrar();
  pintarSelectorSesiones(lista, sesion);

  var estudiantes = estudiantesDelCurso("10°05");
  var regsHoy = PIA.listar("asistencias").filter(function (a) { return a.fecha === PIA.hoy(); });
  ponerTexto("kSesiones", lista.filter(function (x) { return x.fecha === PIA.hoy(); }).length);
  ponerTexto("kAsistenciasHoy", regsHoy.filter(function (a) { return a.estado === "ASISTIO"; }).length);
  ponerTexto("kFaltasHoy", regsHoy.filter(function (a) { return a.estado === "FALTO"; }).length);
  var suma = 0;
  estudiantes.forEach(function (e) { suma += porcentajeAsistencia(e.asistidas_mes, e.programadas_mes); });
  ponerTexto("kPromedio", (estudiantes.length ? Math.round(suma / estudiantes.length) : 0) + "%");

  var qr = document.getElementById("qrCaja");
  if (qr) {
    if (sesion && sesion.estado === "ABIERTA") pintarQR(sesion.token);
    else qr.innerHTML = "<div class='aviso'>Genera el QR de la clase con el botón de arriba. Mientras la ventana esté abierta, la planilla se llena sola.</div>";
  }
  var nota = document.getElementById("notaSesion");
  if (nota && sesion) {
    nota.textContent = sesion.codigo + " · " + sesion.estado + " · apertura " + sesion.hora_apertura + " · cierre " + sesion.hora_cierre;
  }
  pintarPlanilla(sesion);
  pintarTablaSesiones(lista);
}

/** Cambia la sesión que se está mirando. */
function elegirSesion(valor) {
  sesionElegida = valor ? Number(valor) : null;
  pintarPanelDocente();
}

/** Lleva la planilla a una sesión concreta. */
function verSesion(id) {
  sesionElegida = Number(id);
  pintarPanelDocente();
  var caja = document.getElementById("planilla");
  if (caja) caja.scrollIntoView({ behavior: "smooth", block: "center" });
}

/** Abre la sesión de clase y genera el token del QR. */
function abrirSesion() {
  var s = sesionActual();
  if (!s || s.rol !== "docente") { PIA.toast("Solo el docente puede abrir una sesión.", "mal"); return; }
  var asignatura = PIA.valor("sAsignatura");
  var bloque = Number(PIA.valor("sBloque")) || 1;
  if (!asignatura) { PIA.toast("Elige la asignatura.", "mal"); return; }
  var curso = PIA.valor("sCurso") || "10°05";
  var token = armarToken(asignatura, bloque);

  /* una sola clase abierta a la vez por curso */
  PIA.listar("sesiones").forEach(function (x) {
    if (x.curso === curso && x.estado === "ABIERTA") PIA.actualizar("sesiones", x.id, { estado: "CERRADA" });
  });

  var ahora = horaAhora();
  var sesion = PIA.insertar("sesiones", {
    codigo: token,
    token: token,
    asignatura: asignatura,
    docente: s.nombre,
    curso: curso,
    bloque: bloque,
    fecha: PIA.hoy(),
    hora_apertura: ahora,
    hora_cierre: sumarMinutos(ahora, MINUTOS_VENTANA),
    estado: "ABIERTA"
  });
  sesionElegida = sesion.id;
  PIA.toast("Sesión abierta: " + token);
  pintarPanelDocente();
}

/** Paso 5: cierra la ventana y registra la inasistencia de quien no escaneó. */
function cerrarVentanaDocente() {
  var sesion = sesionParaMostrar();
  if (!sesion) { PIA.toast("No hay una sesión para cerrar.", "mal"); return; }
  if (sesion.estado === "CERRADA") { PIA.toast("Esa sesión ya está cerrada.", "warn"); return; }
  if (!confirm("¿Cerrar la ventana y registrar la falta de quienes no escanearon?")) return;

  var estudiantes = estudiantesDelCurso(sesion.curso);
  var faltas = 0;
  estudiantes.forEach(function (e) {
    if (yaEscaneo(sesion.id, e.id)) return;
    PIA.insertar("asistencias", {
      id_sesion: sesion.id,
      id_estudiante: e.id,
      estudiante: e.nombre,
      asignatura: sesion.asignatura,
      fecha: sesion.fecha,
      hora: horaAhora(),
      estado: "FALTO",
      token: sesion.token,
      observacion: "No escaneó dentro de la ventana"
    });
    enviarNotificacionAcudiente(e, "Su hijo(a) no registró ingreso a la clase de " + sesion.asignatura + " del " + PIA.fecha(sesion.fecha) + ".");
    faltas++;
  });
  PIA.actualizar("sesiones", sesion.id, { estado: "CERRADA" });
  PIA.toast(faltas ? "Ventana cerrada: " + faltas + " inasistencia(s) y alertas enviadas." : "Ventana cerrada: todos escanearon.");
  pintarPanelDocente();
}

/** Marca una falta a mano, por ejemplo si el estudiante no tenía celular. */
function marcarFalta(idSesion, idEstudiante) {
  var sesion = PIA.listar("sesiones").filter(function (s) { return Number(s.id) === Number(idSesion); })[0];
  var estudiante = usuarioPorId(idEstudiante);
  if (!sesion || !estudiante) return;
  if (registroDe(sesion.id, estudiante.id)) { PIA.toast("Ese estudiante ya tiene una marca en esta clase.", "warn"); return; }
  if (!confirm("¿Registrar la falta de " + estudiante.nombre + " y avisar al acudiente?")) return;
  PIA.insertar("asistencias", {
    id_sesion: sesion.id,
    id_estudiante: estudiante.id,
    estudiante: estudiante.nombre,
    asignatura: sesion.asignatura,
    fecha: sesion.fecha,
    hora: horaAhora(),
    estado: "FALTO",
    token: sesion.token,
    observacion: "Registro manual del docente"
  });
  enviarNotificacionAcudiente(estudiante, "Su hijo(a) no registró ingreso a la clase de " + sesion.asignatura + " del " + PIA.fecha(sesion.fecha) + ".");
  PIA.toast("Falta registrada y alerta enviada.");
  pintarPanelDocente();
}

/* Arranque del panel docente. */
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("planilla")) return;
  var s = exigirSesion("docente");
  if (!s) return;
  pintarSesion();
  pintarPanelDocente();
});
