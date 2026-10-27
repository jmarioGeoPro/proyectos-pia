/* ==========================================================================
   orders-cart.js
   --------------------------------------------------------------------------
   El carrito y el motor de pedidos: calcula subtotales, valida el stock,
   descuenta inventario, asigna el turno de la franja y emite el ficho.
   Traduce el algoritmo Procesar_PrePedido_Y_Generar_Ficho_GreatFoodApp.
   ========================================================================== */

'use strict';

/** Los ítems que hay en el carrito (viven en la bóveda de datos). */
function itemsCarrito() { return PIA.listar('carrito'); }

/** Agrega una unidad de un producto al carrito. */
function agregarAlCarrito(id) {
  var p = buscarProducto(id);
  if (!p) { PIA.toast('Ese producto ya no está en el catálogo.', 'mal'); return; }
  var linea = itemsCarrito().filter(function (x) { return Number(x.id_prod) === Number(id); })[0];
  var enCarrito = linea ? Number(linea.cantidad) : 0;
  if (Number(p.stock) < enCarrito + 1) {
    PIA.toast('Lo sentimos, solo quedan ' + p.stock + ' unidades de ' + p.nombre, 'mal');
    return;
  }
  if (linea) PIA.actualizar('carrito', linea.id, { cantidad: enCarrito + 1 });
  else PIA.insertar('carrito', { id_prod: p.id, nombre: p.nombre, precio: Number(p.precio), cantidad: 1 });
  pintarCarrito();
  pintarCatalogo();
  PIA.toast(p.nombre + ' agregado al pedido.');
}

/** Suma o resta una unidad de una línea del carrito. */
function cambiarCantidad(idLinea, delta) {
  var linea = itemsCarrito().filter(function (x) { return Number(x.id) === Number(idLinea); })[0];
  if (!linea) return;
  var nueva = Number(linea.cantidad) + Number(delta);
  if (nueva <= 0) {
    PIA.eliminar('carrito', linea.id);
    pintarCarrito();
    return;
  }
  var p = buscarProducto(linea.id_prod);
  if (p && nueva > Number(p.stock)) {
    PIA.toast('Solo quedan ' + p.stock + ' unidades de ' + p.nombre + '.', 'mal');
    return;
  }
  PIA.actualizar('carrito', linea.id, { cantidad: nueva });
  pintarCarrito();
}

/** Saca una línea completa del carrito. */
function quitarDelCarrito(idLinea) {
  PIA.eliminar('carrito', idLinea);
  pintarCarrito();
  PIA.toast('Producto retirado del pedido.');
}

/** Deja el carrito en blanco. */
function vaciarCarrito() {
  PIA.guardar('carrito', []);
  pintarCarrito();
  pintarCatalogo();
}

/** El total a pagar del carrito. */
function totalCarrito() {
  return itemsCarrito().reduce(function (a, x) {
    return a + Number(x.precio) * Number(x.cantidad);
  }, 0);
}

/** Pinta el carrito y actualiza los totales de la página. */
function pintarCarrito() {
  var items = itemsCarrito();
  var cont = document.getElementById('carrito');
  if (cont) {
    if (!items.length) {
      cont.innerHTML = '<div class="vacio">Tu pedido está vacío. Agrega algo del <a href="catalogo.html">catálogo</a>.</div>';
    } else {
      var html = '';
      items.forEach(function (it) {
        html += '<div class="linea-carrito">';
        html += '<div class="crece"><b>' + PIA.esc(it.nombre) + '</b>' +
          '<br><span class="pequeno gris">' + PIA.moneda(it.precio) + ' cada uno</span></div>';
        html += '<div class="fila" style="gap:4px">';
        html += '<button class="btn pq" onclick="cambiarCantidad(' + it.id + ', -1)">−</button>';
        html += '<b style="min-width:18px;text-align:center">' + it.cantidad + '</b>';
        html += '<button class="btn pq" onclick="cambiarCantidad(' + it.id + ', 1)">+</button>';
        html += '</div>';
        html += '<b style="min-width:74px;text-align:right">' + PIA.moneda(Number(it.precio) * Number(it.cantidad)) + '</b>';
        html += '<button class="btn pq pel" onclick="quitarDelCarrito(' + it.id + ')" title="Quitar">✕</button>';
        html += '</div>';
      });
      cont.innerHTML = html;
    }
  }
  var t1 = document.getElementById('totalCarrito');
  if (t1) t1.textContent = PIA.moneda(totalCarrito());
  var t2 = document.getElementById('totalCarrito2');
  if (t2) t2.textContent = PIA.moneda(totalCarrito());
  var unidades = items.reduce(function (a, x) { return a + Number(x.cantidad); }, 0);
  var u = document.getElementById('unidadesCarrito');
  if (u) u.textContent = unidades;
  var boton = document.getElementById('btnConfirmar');
  if (boton) boton.disabled = items.length === 0;
}

/** Muestra un aviso dentro de la caja de resultados del pedido. */
function avisarPedido(caja, tipo, html) {
  if (!caja) return;
  caja.innerHTML = '<div class="aviso ' + (tipo || '') + '">' + html + '</div>';
}

/**
 * Genera el siguiente turno de una franja (paso 4 del algoritmo).
 * El primer descanso numera A-0xx y el segundo B-0xx.
 */
function generarTurno(franja) {
  var f = FRANJAS.filter(function (x) { return x.clave === franja; })[0] || FRANJAS[0];
  var mayor = 0;
  PIA.listar('pedidos').forEach(function (p) {
    if (p.franja !== f.clave) return;
    var t = String(p.turno || '');
    var num = '';
    for (var i = t.length - 1; i >= 0; i--) {
      var ch = t.charAt(i);
      if (ch >= '0' && ch <= '9') num = ch + num;
      else break;
    }
    if (num) mayor = Math.max(mayor, Number(num));
  });
  return f.prefijo + '-' + String(mayor + 1).padStart(3, '0');
}

/**
 * Procesa el pre-pedido: valida stock, suma, descuenta inventario, asigna el
 * turno y guarda la orden en estado EN_PREPARACION.
 */
function confirmarPedido() {
  var caja = document.getElementById('resultadoPedido');
  var nombre = PIA.valor('eNombre');
  var curso = PIA.valor('eCurso');
  var franja = PIA.valor('eFranja');
  var pago = PIA.valor('ePago');
  var items = itemsCarrito();

  if (!items.length) { avisarPedido(caja, 'mal', 'El carrito está vacío. Agrega primero algo del catálogo.'); return null; }
  if (!nombre) { avisarPedido(caja, 'mal', 'Escribe el nombre del estudiante o docente que recibe el pedido.'); return null; }
  if (!curso) { avisarPedido(caja, 'mal', 'Escribe el curso o grupo (por ejemplo 10-2).'); return null; }
  if (!franja) { avisarPedido(caja, 'mal', 'Elige la franja de descanso en la que reclamas.'); return null; }
  if (!pago) { avisarPedido(caja, 'mal', 'Elige el método de pago.'); return null; }

  /* paso 2: validar el stock de cada ítem y sumar el total */
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    var p = buscarProducto(items[i].id_prod);
    if (!p) {
      avisarPedido(caja, 'mal', 'El producto <b>' + PIA.esc(items[i].nombre) + '</b> ya no está en el catálogo. Bórralo del pedido.');
      return null;
    }
    if (Number(p.stock) < Number(items[i].cantidad)) {
      avisarPedido(caja, 'mal', 'Lo sentimos, solo quedan <b>' + p.stock + '</b> unidades de <b>' +
        PIA.esc(p.nombre) + '</b>. Ajusta la cantidad en el carrito.');
      return null;
    }
    total = total + Number(p.precio) * Number(items[i].cantidad);
  }

  /* paso 3: descontar el inventario */
  items.forEach(function (it) {
    var p = buscarProducto(it.id_prod);
    if (!p) return;
    PIA.actualizar('productos', p.id, {
      stock: Number(p.stock) - Number(it.cantidad),
      ventas: Number(p.ventas || 0) + Number(it.cantidad)
    });
  });

  /* paso 4 y 5: turno virtual y estado inicial */
  var turno = generarTurno(franja);
  var pedido = PIA.insertar('pedidos', {
    turno: turno, nombre: nombre, curso: curso, franja: franja,
    items: items.map(function (it) {
      return { id_prod: Number(it.id_prod), nombre: it.nombre, cantidad: Number(it.cantidad), precio: Number(it.precio) };
    }),
    total: total, metodo_pago: pago, estado: 'EN_PREPARACION',
    fecha_hora: PIA.hoy() + ' ' + horaDelPedido(), calificacion: 0
  });

  /* paso 6: el carrito queda vacío y se muestra el recibo */
  PIA.guardar('carrito', []);
  pintarCarrito();
  pintarCatalogo();
  pintarFicho(pedido);
  pintarCola();
  pintarAdmin();
  avisarPedido(caja, 'ok', 'Pedido confirmado con el <b>Ficho Virtual #' + PIA.esc(turno) +
    '</b>. Muéstralo en la ventanilla rápida cuando tu pedido esté listo.');
  PIA.toast('Pedido confirmado: turno #' + turno);
  return pedido;
}

/** La hora actual en formato HH:MM. */
function horaDelPedido() {
  var d = new Date();
  return (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
}

/** Pinta el recibo digital con el ficho virtual. */
function pintarFicho(p) {
  var caja = document.getElementById('ficho');
  if (!caja || !p) return;
  var lista = (p.items || []).map(function (it) {
    return '<li><span>' + it.cantidad + ' × ' + PIA.esc(it.nombre) + '</span><b>' +
      PIA.moneda(Number(it.precio) * Number(it.cantidad)) + '</b></li>';
  }).join('');
  var html = '<div class="ficho">';
  html += '<span class="pequeno gris">FICHO VIRTUAL</span>';
  html += '<div class="turno-grande">#' + PIA.esc(p.turno) + '</div>';
  html += '<p class="centro"><b>' + PIA.esc(p.nombre) + '</b> · ' + PIA.esc(p.curso) + '</p>';
  html += '<ul class="lista-ficho">' + lista + '</ul>';
  html += '<div class="fila total-ficho" style="justify-content:space-between"><span>Total a pagar</span><b>' + PIA.moneda(p.total) + '</b></div>';
  html += '<p class="pequeno gris centro">' + PIA.esc(nombreFranja(p.franja)) + ' · ' + PIA.esc(nombreMetodoPago(p.metodo_pago)) + '</p>';
  html += '<p class="centro">' + badgeEstadoPedido(p.estado) + '</p>';
  html += '<p class="pequeno gris centro">Guarda este número: cuando la tienda lo marque listo, solo dices tu turno en la ventanilla.</p>';
  html += '</div>';
  caja.innerHTML = html;
}

/** Consulta un turno y muestra su estado actual. */
function consultarTurno() {
  var caja = document.getElementById('estadoTurno');
  var turno = PIA.valor('qTurno').toUpperCase();
  if (!caja) return;
  if (!turno) { caja.innerHTML = '<div class="aviso mal">Escribe el número de tu ficho, por ejemplo A-014.</div>'; return; }
  var p = PIA.listar('pedidos').filter(function (x) { return String(x.turno).toUpperCase() === turno; })[0];
  if (!p) {
    caja.innerHTML = '<div class="aviso mal">No encontramos ningún pedido con el turno <b>' + PIA.esc(turno) + '</b>.</div>';
    return;
  }
  var texto = p.estado === 'LISTO_PARA_RECLAMAR'
    ? '¡Ya está listo! Pasa por la ventanilla rápida y muestra tu ficho.'
    : p.estado === 'ENTREGADO'
      ? 'Este pedido ya fue entregado. ¡Buen provecho!'
      : 'Tu pedido está en preparación. Te avisamos cuando esté listo.';
  caja.innerHTML = '<div class="aviso ' + (p.estado === 'LISTO_PARA_RECLAMAR' ? 'ok' : '') + '">' +
    'Ficho <b>#' + PIA.esc(p.turno) + '</b> · ' + badgeEstadoPedido(p.estado) + '<br>' + texto +
    '<br><span class="pequeno gris">' + PIA.esc(nombreFranja(p.franja)) + ' · Total ' + PIA.moneda(p.total) + '</span></div>';
  pintarFicho(p);
}

/* Arranque del carrito. */
document.addEventListener('DOMContentLoaded', function () {
  pintarCarrito();
  if (document.getElementById('qTurno') && PIA.parametro('turno')) {
    PIA.poner('qTurno', PIA.parametro('turno'));
    consultarTurno();
  }
});