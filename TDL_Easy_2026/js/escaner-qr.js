/* ==========================================================================
   escaner-qr.js
   --------------------------------------------------------------------------
   Lectura del código QR del docente y registro de la asistencia.
   Traduce el algoritmo Registrar_Asistencia_QR_TDLEasy: credenciales, un solo
   escaneo por bloque, token vigente, ventana de 10 minutos y semáforo.
   ========================================================================== */

"use strict";

/* La corriente de la cámara, para poder apagarla. */
var corrienteCamara = null;

/** La clase con QR abierto del curso, o null. */
function sesionVigente(curso) {
  var abiertas = PIA.listar("sesiones").filter(function (s) {
    return s.curso === curso && s.estado === "ABIERTA";
  });
  return abiertas.length ? abiertas[abiertas.length - 1] : null;
}

/** ¿La hora actual está dentro de la ventana del QR? */
function enVentana(sesion) {
  if (!sesion) return false;
  if (String(sesion.fecha) !== PIA.hoy()) return false;
  var ahora = minutosDe(horaAhora());
  return ahora >= minutosDe(sesion.hora_apertura) && ahora <= minutosDe(sesion.hora_cierre);
}

/** Minutos que le quedan a la ventana del QR. */
function minutosRestantes(sesion) {
  if (!sesion || String(sesion.fecha) !== PIA.hoy()) return 0;
  return Math.max(0, minutosDe(sesion.hora_cierre) - minutosDe(horaAhora()));
}

/** Bandera ya_escaneo_bloque: ¿ya registró este estudiante esta clase? */
function yaEscaneo(idSesion, idEstudiante) {
  var lista = PIA.listar("asistencias");
  for (var i = 0; i < lista.length; i++) {
    if (Number(lista[i].id_sesion) === Number(idSesion) && Number(lista[i].id_estudiante) === Number(idEstudiante)) return true;
  }
  return false;
}

/** El registro de asistencia de un estudiante en una sesión, o null. */
function registroDe(idSesion, idEstudiante) {
  var lista = PIA.listar("asistencias");
  for (var i = 0; i < lista.length; i++) {
    if (Number(lista[i].id_sesion) === Number(idSesion) && Number(lista[i].id_estudiante) === Number(idEstudiante)) return lista[i];
  }
  return null;
}

/** Pinta el semáforo grande del escáner. */
function pintarSemaforo(estado, titulo, detalle) {
  var caja = document.getElementById("semaforo");
  if (!caja) return;
  var verde = estado === "SI";
  caja.innerHTML = "<div style='border-radius:12px;padding:22px;text-align:center;color:#fff;background:" +
    (verde ? "var(--ok)" : "var(--peligro)") + "'>" +
    "<div style='font-size:38px;line-height:1'>" + (verde ? "✔" : "✕") + "</div>" +
    "<div style='font-weight:700;font-size:17px;margin-top:6px'>" + PIA.esc(titulo) + "</div>" +
    "<div style='font-size:12.5px;opacity:.92;margin-top:4px'>" + PIA.esc(detalle || "") + "</div></div>";
}

/** Pinta la tarjeta de comprobante después de un escaneo válido. */
function pintarComprobante(registro, clase, estudiante) {
  var caja = document.getElementById("resultadoEscaner");
  if (!caja) return;
  var pct = porcentajeAsistencia(estudiante.asistidas_mes, estudiante.programadas_mes);
  caja.innerHTML = "<section class='tarjeta' style='border-left:4px solid var(--ok)'>" +
    "<h2 style='color:var(--ok)'>Asistencia confirmada</h2>" +
    "<p class='ayuda'>El docente ya te ve en verde en la planilla. No necesitas escanear otra vez.</p>" +
    "<div class='fila'><span class='badge ok'>SI · VERDE</span>" +
    "<span class='badge neutro'>" + PIA.esc(clase.asignatura) + "</span>" +
    "<span class='badge neutro'>Bloque " + clase.bloque + "</span></div>" +
    "<p class='pequeno gris' style='margin-top:10px'>Registrado el " + PIA.fecha(registro.fecha) + " a las " + PIA.esc(registro.hora) + ".</p>" +
    "<div class='barra' style='margin:12px 0'><i style='width:" + Math.min(100, pct) + "%'></i></div>" +
    "<p class='pequeno'>Asistencia del mes: <b style='color:" + colorPorcentaje(pct) + "'>" + pct + "%</b> (" +
    Number(estudiante.asistidas_mes) + " de " + Number(estudiante.programadas_mes) + " clases).</p></section>";
}

/**
 * Algoritmo Registrar_Asistencia_QR_TDLEasy.
 * tokenLeido llega de la cámara o del campo de simulación.
 */
function registrarAsistenciaQR(tokenLeido) {
  var sesion = sesionActual();
  if (!sesion) {
    PIA.toast("Tu sesión se cerró. Vuelve a entrar.", "mal");
    return null;
  }

  /* 1. credenciales: se confirma que el usuario de la sesión existe */
  var estudiante = usuarioPorId(sesion.id);
  if (!estudiante) {
    pintarSemaforo("NO", "NO · ROJO", "Incorrecto: Este usuario no existe o clave errónea.");
    return { estado: "NO", motivo: "credenciales" };
  }

  /* la única clase con QR abierto del curso del estudiante */
  var clase = sesionVigente(estudiante.curso);
  if (!clase) {
    pintarSemaforo("NO", "NO · ROJO", "No hay una clase con QR abierto. Pídele al docente que genere el código.");
    return { estado: "NO", motivo: "sin-clase" };
  }

  /* 2. ya_escaneo_bloque: un solo escaneo por clase */
  if (yaEscaneo(clase.id, estudiante.id)) {
    pintarSemaforo("NO", "NO · ROJO", "Acción bloqueada: el código QR solo se puede escanear 1 vez por clase.");
    return { estado: "NO", motivo: "doble-escaneo" };
  }

  /* 3. token correcto y ventana de tiempo activa */
  var token = String(tokenLeido || "").trim().toUpperCase();
  if (!token) {
    PIA.toast("Escribe o lee un código QR.", "mal");
    return null;
  }
  if (token !== String(clase.token || "").toUpperCase()) {
    pintarSemaforo("NO", "NO · ROJO", "Código inválido: no corresponde al QR de " + clase.asignatura + ".");
    return { estado: "NO", motivo: "token" };
  }
  if (!enVentana(clase)) {
    pintarSemaforo("NO", "NO · ROJO", "Código expirado: la ventana de " + MINUTOS_VENTANA + " minutos ya cerró.");
    return { estado: "NO", motivo: "ventana" };
  }

  /* 3b. se guarda la asistencia y se suma al contador del mes */
  var registro = PIA.insertar("asistencias", {
    id_sesion: clase.id,
    id_estudiante: estudiante.id,
    estudiante: estudiante.nombre,
    asignatura: clase.asignatura,
    fecha: PIA.hoy(),
    hora: horaAhora(),
    estado: "ASISTIO",
    token: token,
    observacion: "Escaneo válido dentro de la ventana"
  });
  sumarAsistencia(estudiante.id);

  /* 4 y salida: semáforo verde, porcentaje actualizado y comprobante */
  var actualizado = usuarioPorId(estudiante.id);
  pintarSemaforo("SI", "SI · VERDE (Asistencia Confirmada)", clase.asignatura + " · bloque " + clase.bloque + " · " + horaAhora());
  pintarComprobante(registro, clase, actualizado);
  PIA.toast("Asistencia registrada. ¡Bien!");
  pintarEscaner();
  return { estado: "SI", registro: registro };
}

/** Botón de simulación: usa el campo de texto como si fuera la cámara. */
function simularEscaneo() {
  registrarAsistenciaQR(PIA.valor("tokenSimulado"));
}

/** Copia el token de la clase abierta al campo de simulación. */
function usarTokenVigente() {
  var s = sesionActual();
  if (!s) return;
  var est = usuarioPorId(s.id);
  if (!est) return;
  var clase = sesionVigente(est.curso);
  if (!clase) {
    PIA.toast("El docente todavía no ha abierto ninguna clase.", "warn");
    return;
  }
  PIA.poner("tokenSimulado", clase.token);
  PIA.toast("Token de " + clase.asignatura + " copiado. Ahora escanéalo.");
}

/** Enciende la cámara trasera del celular (HTML5 MediaDevices). */
function activarCamara() {
  var caja = document.getElementById("camaraCaja");
  var video = document.getElementById("camara");
  if (!caja || !video) return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    PIA.toast("Este navegador no abre la cámara. Usa la simulación de abajo.", "warn");
    return;
  }
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false })
    .then(function (corriente) {
      corrienteCamara = corriente;
      video.srcObject = corriente;
      caja.className = "";
      PIA.toast("Cámara activada: apunta al QR del tablero.");
    })
    .catch(function () {
      PIA.toast("No se pudo abrir la cámara. Usa la simulación de abajo.", "mal");
    });
}

/** Apaga la cámara y oculta la vista previa. */
function detenerCamara() {
  if (corrienteCamara) {
    corrienteCamara.getTracks().forEach(function (t) { t.stop(); });
    corrienteCamara = null;
  }
  var caja = document.getElementById("camaraCaja");
  if (caja) caja.className = "oculto";
}

/** Pinta la ficha del estudiante, la clase abierta y sus marcas. */
function pintarEscaner() {
  var s = sesionActual();
  if (!s) return;
  var est = usuarioPorId(s.id);
  if (!est) return;
  pintarSesion();
  var clase = sesionVigente(est.curso);
  var caja = document.getElementById("claseActual");
  if (caja) {
    if (!clase) {
      caja.innerHTML = "<div class='aviso warn'>No hay una clase con QR abierto en este momento. Cuando el docente abra la sesión aparecerá aquí.</div>";
    } else {
      var restantes = minutosRestantes(clase);
      caja.innerHTML = "<div class='aviso ok'><b>" + PIA.esc(clase.asignatura) + "</b> · bloque " + clase.bloque + "<br>" +
        "<span class='pequeno'>" + PIA.esc(clase.docente) + " · curso " + PIA.esc(clase.curso) + " · cierra a las " + PIA.esc(clase.hora_cierre) + "</span></div>" +
        (restantes > 0
          ? "<p class='pequeno gris'>Quedan <b>" + restantes + "</b> minutos de ventana.</p>"
          : "<p class='pequeno' style='color:var(--peligro)'>La ventana ya cerró: pídele al docente que abra la clase otra vez.</p>");
    }
  }
  var pct = porcentajeAsistencia(est.asistidas_mes, est.programadas_mes);
  ponerTexto("kPorcentaje", pct + "%");
  ponerTexto("kAsistidas", Number(est.asistidas_mes || 0));
  ponerTexto("kProgramadas", Number(est.programadas_mes || 0));
  var cont = document.getElementById("tablaHoy");
  if (!cont) return;
  var mias = PIA.listar("asistencias").filter(function (a) { return Number(a.id_estudiante) === Number(est.id); });
  mias.sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });
  cont.innerHTML = PIA.tabla(["Clase", "Fecha", "Hora", "Semáforo"],
    mias.slice(0, 8).map(function (a) {
      return [PIA.esc(a.asignatura), PIA.fecha(a.fecha), PIA.esc(a.hora), badgeSemaforo(a.estado)];
    }),
    { vacio: "Todavía no tienes marcas de asistencia." });
}

/* Arranque de la página del escáner. */
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("semaforo")) return;
  var s = exigirSesion("estudiante");
  if (!s) return;
  pintarEscaner();
});
