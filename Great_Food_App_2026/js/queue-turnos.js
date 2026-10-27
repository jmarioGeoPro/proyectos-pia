/* ==========================================================================
   queue-turnos.js
   --------------------------------------------------------------------------
   La cola de la tienda y la pantalla de turnos (KDS). El tendero cambia el
   estado del pedido: EN_PREPARACION, LISTO_PARA_RECLAMAR y ENTREGADO.
   Es el paso 7 del algoritmo: cuando el tendero marca listo, se avisa en
   pantalla al estudiante con su nombre y su ficho.
   ========================================================================== */

'use strict';

/* Los estados por los que pasa un pedido. */
var ESTADOS_PEDIDO = ['PENDIENTE', 'EN_PREPARACION', 'LISTO_PARA_RECLAMAR', 'ENTREGADO'];

/** El nombre legible de un estado. */
function nombreEstadoPedido(e) {
  if (e === 'EN_PREPARACION') return 'En preparación';
  if (e === 'LISTO_PARA_RECLAMAR') return 'Listo para reclamar';
  if (e === 'ENTREGADO') return 'Entregado';
  return 'Pendiente';
}

/** La etiqueta de color de un estado. */
function badgeEstadoPedido(e) {
  var clase = e === 'ENTREGADO' ? 'neutro' : e === 'LISTO_PARA_RECLAMAR' ? 'ok' : e === 'EN_PREPARACION' ? 'warn' : 'info';
  return '<span class="badge ' + clase + '">' + nombreEstadoPedido(e) + '</span>';
}

/** Los pedidos de una franja, del más viejo al más nuevo. */
function pedidosDeFranja(franja) {
  return PIA.listar('pedidos').filter(function (x) {
    return x.franja === franja && x.estado !== 'ENTREGADO';
  }).sort(function (a, b) {
    return String(a.turno).localeCompare(String(b.turno));
  });
}

/** Cuenta los pedidos que están listos para reclamar. */
function pedidosListos() {
  return PIA.listar('pedidos').filter(function (x) { return x.estado === 'LISTO_PARA_RECLAMAR'; });
}

/** La tarjeta de un pedido dentro de la cola del tendero. */
function tarjetaCola(p) {
  var html = '<div class="pedido-cola">';
  html += '<div class="fila" style="justify-content:space-between">';
  html += '<b class="turno-mini">#' + PIA.esc(p.turno) + '</b>' + badgeEstadoPedido(p.estado);
  html += '</div>';
  html += '<p class="pequeno" style="margin:4px 0"><b>' + PIA.esc(p.nombre) + '</b> · ' + PIA.esc(p.curso) + '</p>';
  html += '<ul class="lista-cola">';
  (p.items || []).forEach(function (it) {
    html += '<li>' + it.cantidad + ' × ' + PIA.esc(it.nombre) + '</li>';
  });
  html += '</ul>';
  html += '<div class="fila" style="justify-content:space-between"><span class="pequeno gris">' + PIA.moneda(p.total) + '</span>';
  html += '<span class="pequeno gris">' + PIA.esc(nombreMetodoPago(p.metodo_pago)) + '</span></div>';
  html += '<div class="fila" style="gap:5px;margin-top:8px">';
  if (p.estado === 'PENDIENTE') html += '<button class="btn pq" onclick="marcarEnPreparacion(' + p.id + ')">Preparar</button>';
  if (p.estado === 'EN_PREPARACION') html += '<button class="btn pq ok" onclick="marcarListo(' + p.id + ')">¡Listo!</button>';
  if (p.estado === 'LISTO_PARA_RECLAMAR') html += '<button class="btn pq p" onclick="marcarEntregado(' + p.id + ')">Entregar</button>';
  html += '</div></div>';
  return html;
}

/** Pinta las dos columnas de la cola, una por franja. */
function pintarCola() {
  var primero = document.getElementById('colaPrimer');
  var segundo = document.getElementById('colaSegundo');
  if (!primero && !segundo) return;
  if (primero) {
    var a = pedidosDeFranja('PRIMER_DESCANSO');
    primero.innerHTML = a.length ? a.map(tarjetaCola).join('') : '<div class="vacio">No hay pedidos pendientes del primer descanso.</div>';
  }
  if (segundo) {
    var b = pedidosDeFranja('SEGUNDO_DESCANSO');
    segundo.innerHTML = b.length ? b.map(tarjetaCola).join('') : '<div class="vacio">No hay pedidos pendientes del segundo descanso.</div>';
  }
  pintarPantallaListos();
  pintarIndicadoresCola();
}

/** La pantalla grande con los turnos listos para reclamar. */
function pintarPantallaListos() {
  var cont = document.getElementById('pantallaListos');
  if (!cont) return;
  var listos = pedidosListos().slice().sort(function (a, b) {
    return String(a.turno).localeCompare(String(b.turno));
  });
  if (!listos.length) {
    cont.innerHTML = '<div class="pantalla-vacia">Sin pedidos listos por ahora</div>';
    return;
  }
  cont.innerHTML = listos.map(function (p) {
    return '<div class="turno-pantalla"><b>#' + PIA.esc(p.turno) + '</b><span>' + PIA.esc(p.nombre.split(' ')[0]) + '</span></div>';
  }).join('');
}

/** Pinta los indicadores de la cola. */
function pintarIndicadoresCola() {
  var total = document.getElementById('tPedidos');
  if (total) total.textContent = PIA.listar('pedidos').length;
  var listos = document.getElementById('tListos');
  if (listos) listos.textContent = pedidosListos().length;
}

/** Cambia el estado de un pedido y refresca la pantalla. */
function cambiarEstadoPedido(id, estado) {
  var p = PIA.listar('pedidos').filter(function (x) { return Number(x.id) === Number(id); })[0];
  if (!p) return null;
  var actualizado = PIA.actualizar('pedidos', id, { estado: estado });
  pintarCola();
  pintarAdmin();
  if (estado === 'LISTO_PARA_RECLAMAR') avisarListo(actualizado || p);
  return actualizado;
}

/** Marca un pedido como listo y lanza el aviso en pantalla. */
function marcarListo(id) { return cambiarEstadoPedido(id, 'LISTO_PARA_RECLAMAR'); }

/** Marca un pedido como entregado en ventanilla. */
function marcarEntregado(id) { return cambiarEstadoPedido(id, 'ENTREGADO'); }

/** Marca un pedido como recibido y en preparación. */
function marcarEnPreparacion(id) { return cambiarEstadoPedido(id, 'EN_PREPARACION'); }

/** El aviso que ve el estudiante cuando su pedido está listo (paso 7). */
function avisarListo(p) {
  var texto = '¡Hola ' + p.nombre + '! Tu pedido con Ficho Virtual #' + p.turno + ' ya está listo en ventanilla rápida.';
  var caja = document.getElementById('pantallaAvisos');
  if (caja) caja.innerHTML = '<div class="aviso ok"><b>Aviso en pantalla:</b> ' + PIA.esc(texto) + '</div>';
  PIA.toast(texto);
}

/* Arranque de la cola. */
document.addEventListener('DOMContentLoaded', function () {
  pintarCola();
});