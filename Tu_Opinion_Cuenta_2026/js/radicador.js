/* ==========================================================================
   radicador.js
   --------------------------------------------------------------------------
   El motor de radicación: recolecta el formulario, aplica las reglas, genera
   el código TOC y calcula la fecha límite de respuesta.
   Traduce el algoritmo Radicar_Solicitud_TuOpinionCuenta.
   ========================================================================== */

'use strict';

/* El plazo que se promete al ciudadano, en días hábiles. */
var SLA_DIAS = 3;

/** Los estados por los que pasa un radicado. */
var ESTADOS = ['PENDIENTE', 'EN_REVISION', 'RESPONDIDO', 'ESCALADO'];

/** Pinta un estado como etiqueta de color. */
function etiquetaEstado(estado) {
  var clase = estado === 'RESPONDIDO' ? 'ok' : estado === 'EN_REVISION' ? 'info' : estado === 'ESCALADO' ? 'mal' : 'warn';
  return '<span class="badge ' + clase + '">' + estado.replace(/_/g, ' ') + '</span>';
}

/**
 * Radica una solicitud nueva.
 * Recorre las diez reglas del algoritmo y devuelve el radicado creado.
 */
function radicar() {
  var correo = PIA.valor('correo');
  var nombre = PIA.valor('nombre');
  var anonimo = PIA.valor('anonimo') === 'si';
  var tipo = PIA.valor('tipo');
  var lugar = PIA.valor('lugar');
  var mensaje = PIA.valor('mensaje');

  /* 1. el dominio institucional */
  var error = validarCorreo(correo);
  if (error) { PIA.toast(error, 'mal'); return null; }
  /* 2 y 3. la longitud y el lenguaje */
  error = validarMensaje(mensaje);
  if (error) { PIA.toast(error, 'mal'); return null; }
  /* los datos de clasificación */
  if (!nombre) { PIA.toast('Escribe tu nombre completo.', 'mal'); return null; }
  if (!tipo) { PIA.toast('Elige el tipo de solicitud.', 'mal'); return null; }
  if (!lugar) { PIA.toast('Elige el lugar del colegio.', 'mal'); return null; }

  /* 5. quién se muestra al público */
  var autor = anonimo ? 'Estudiante Verificado (Identidad Reservada)' : nombre;
  /* 6. el código de radicado */
  var codigo = PIA.codigo('TOC-2026-', 'solicitudes', 'radicado');
  /* 7 y 8. las fechas */
  var hoy = PIA.hoy();
  var limite = PIA.sumarDiasHabiles(hoy, SLA_DIAS);
  /* 9 y 10. se guarda */
  var nueva = PIA.insertar('solicitudes', {
    radicado: codigo, correo: correo, autor: autor, anonimo: anonimo,
    tipo: tipo, lugar: lugar, mensaje: mensaje,
    estado: 'PENDIENTE', fecha_envio: hoy, fecha_limite: limite,
    respuesta: '', respondido_por: '', accion: ''
  });

  mostrarConfirmacion(nueva);
  limpiarFormulario();
  return nueva;
}

/** Muestra la tarjeta de confirmación con el radicado. */
function mostrarConfirmacion(s) {
  var caja = document.getElementById('resultado');
  if (!caja) return;
  caja.className = '';
  caja.innerHTML = '<div class="tarjeta" style="border-left:4px solid var(--ok)">' +
    '<h2 style="color:var(--ok)">✔ ¡Tu opinión cuenta!</h2>' +
    '<p class="ayuda">Guarda este código: es la única forma de consultar tu respuesta.</p>' +
    '<div class="indicadores" style="margin:14px 0">' +
    '<div class="indicador"><b>Radicado</b><strong style="font-size:19px" class="mono">' + PIA.esc(s.radicado) + '</strong></div>' +
    '<div class="indicador"><b>Respuesta máxima</b><strong style="font-size:19px">' + PIA.fecha(s.fecha_limite) + '</strong></div>' +
    '</div>' +
    '<p class="pequeno gris">Estado inicial: ' + etiquetaEstado(s.estado) + '</p>' +
    '<a class="btn p" style="margin-top:10px" href="seguimiento.html?codigo=' + encodeURIComponent(s.radicado) + '">Ver el seguimiento</a>' +
    '</div>';
  caja.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/** Deja el formulario en blanco. */
function limpiarFormulario() {
  ['correo', 'nombre', 'tipo', 'lugar', 'mensaje'].forEach(function (id) { PIA.poner(id, ''); });
  PIA.poner('anonimo', 'no');
  var c = document.getElementById('contador'); if (c) c.textContent = '0';
  var p = document.getElementById('pistaCorreo');
  if (p) { p.textContent = 'Debe terminar en ' + DOMINIO_VALIDO; p.style.color = ''; }
}

/** Busca un radicado por su código. */
function buscarRadicado() {
  var codigo = PIA.valor('sCodigo').toUpperCase();
  var caja = document.getElementById('sResultado');
  if (!codigo) { PIA.toast('Escribe el código del radicado.', 'mal'); return; }
  var s = PIA.listar('solicitudes').filter(function (x) { return x.radicado === codigo; })[0];
  if (!s) {
    caja.innerHTML = '<div class="aviso mal">No encontramos ningún radicado con el código <b>' + PIA.esc(codigo) + '</b>. Revisa que esté bien escrito.</div>';
    return;
  }
  renderSeguimiento(caja, s);
}

/** Pinta la trazabilidad completa de un radicado. */
function renderSeguimiento(caja, s) {
  var pasos = [
    { nombre: 'Recibido', hecho: true, fecha: s.fecha_envio },
    { nombre: 'En revisión', hecho: ESTADOS.indexOf(s.estado) >= 1, fecha: '' },
    { nombre: 'Respondido', hecho: s.estado === 'RESPONDIDO', fecha: s.respuesta ? s.fecha_limite : '' },
    { nombre: 'Escalado', hecho: s.estado === 'ESCALADO', fecha: '' }
  ];
  var h = '<section class="tarjeta">';
  h += '<h2>Radicado <span class="mono">' + PIA.esc(s.radicado) + '</span></h2>';
  h += '<p class="ayuda">Enviado el ' + PIA.fecha(s.fecha_envio) + ' · respuesta máxima el ' + PIA.fecha(s.fecha_limite) + '</p>';
  h += '<div class="fila" style="margin-bottom:14px">' + etiquetaEstado(s.estado) +
       '<span class="badge neutro">' + PIA.esc(s.tipo) + '</span>' +
       '<span class="badge neutro">' + PIA.esc(s.lugar) + '</span>' +
       '<span class="badge neutro">' + PIA.esc(s.anonimo ? 'Identidad reservada' : s.autor) + '</span></div>';
  h += '<p style="background:#f8fafc;border-radius:9px;padding:12px;font-size:13.5px">' + PIA.esc(s.mensaje) + '</p>';
  h += '<h3>Trazabilidad</h3><div class="fila" style="gap:6px;flex-wrap:wrap">';
  pasos.forEach(function (p) {
    h += '<span class="badge ' + (p.hecho ? 'ok' : 'neutro') + '">' + (p.hecho ? '✔ ' : '○ ') + p.nombre + '</span>';
  });
  h += '</div>';
  if (s.respuesta) {
    h += '<h3>Respuesta del Comité</h3><div class="aviso ok">' + PIA.esc(s.respuesta) + '</div>';
    if (s.accion) h += '<p class="pequeno gris">Acción tomada: ' + PIA.esc(s.accion) + ' · respondió: ' + PIA.esc(s.respondido_por) + '</p>';
  } else {
    h += '<div class="aviso">Todavía no hay respuesta. El plazo vence el ' + PIA.fecha(s.fecha_limite) + '.</div>';
  }
  h += '</section>';
  caja.innerHTML = h;
}

/* Arranque de la página de inicio y de seguimiento. */
document.addEventListener('DOMContentLoaded', function () {
  /* la portada muestra los indicadores y los últimos radicados */
  var total = document.getElementById('kpiTotal');
  if (total) {
    var lista = PIA.listar('solicitudes');
    total.textContent = lista.length;
    document.getElementById('kpiPendientes').textContent = lista.filter(function (x) { return x.estado === 'PENDIENTE' || x.estado === 'EN_REVISION'; }).length;
    document.getElementById('kpiRespondidos').textContent = lista.filter(function (x) { return x.estado === 'RESPONDIDO'; }).length;
    var ultimos = document.getElementById('ultimos');
    var recientes = lista.slice().sort(function (a, b) { return String(b.fecha_envio).localeCompare(String(a.fecha_envio)); }).slice(0, 5);
    ultimos.innerHTML = PIA.tabla(
      ['Radicado', 'Tipo', 'Lugar', 'Fecha', 'Estado'],
      recientes.map(function (x) {
        return ['<span class="mono">' + PIA.esc(x.radicado) + '</span>', PIA.esc(x.tipo), PIA.esc(x.lugar), PIA.fecha(x.fecha_envio), etiquetaEstado(x.estado)];
      })
    );
  }
  /* la página de seguimiento puede llegar con ?codigo=TOC-2026-0001 */
  var campo = document.getElementById('sCodigo');
  if (campo) {
    var cod = PIA.parametro('codigo');
    if (cod) { campo.value = cod; buscarRadicado(); }
  }
});

/** Consulta rápida desde la portada. */
function consultarRapido() {
  var codigo = PIA.valor('qCodigo').toUpperCase();
  var caja = document.getElementById('qResultado');
  if (!codigo) { PIA.toast('Escribe el código.', 'mal'); return; }
  var s = PIA.listar('solicitudes').filter(function (x) { return x.radicado === codigo; })[0];
  if (!s) { caja.innerHTML = '<div class="aviso mal">No existe ese radicado.</div>'; return; }
  caja.innerHTML = '<div class="aviso ok"><b>' + PIA.esc(s.radicado) + '</b> · ' + PIA.esc(s.tipo) +
    ' · ' + etiquetaEstado(s.estado) + '<br><a href="seguimiento.html?codigo=' + encodeURIComponent(s.radicado) + '">Ver el detalle completo</a></div>';
}

/** Revisa el formulario mientras se escribe y lo muestra en la columna derecha. */
document.addEventListener('input', function () {
  var caja = document.getElementById('revision');
  if (!caja) return;
  var correo = PIA.valor('correo'), mensaje = PIA.valor('mensaje');
  var e1 = validarCorreo(correo);
  var e2 = validarMensaje(mensaje);
  var linea = function (ok, texto) {
    return '<div class="fila" style="gap:6px;margin-bottom:6px"><span class="badge ' + (ok ? 'ok' : 'neutro') + '">' + (ok ? '✔' : '○') + '</span><span>' + texto + '</span></div>';
  };
  caja.innerHTML = linea(!e1, 'Correo institucional ' + DOMINIO_VALIDO) +
    linea(!e2, 'Mensaje entre 5 y 150 palabras') +
    linea(true, 'Código de radicado automático') +
    linea(true, 'Plazo de 3 días hábiles');
});
