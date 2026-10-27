/* ==========================================================================
   admin-stats.js
   --------------------------------------------------------------------------
   Las métricas del Modo Personal de Tienda: ventas de la jornada, Top 5 de
   productos más vendidos, ingresos por franja y promedio de calificación.
   ========================================================================== */

'use strict';

/** Todos los pedidos registrados en la jornada. */
function pedidosJornada() { return PIA.listar('pedidos'); }

/** La suma de dinero que entró con los pedidos. */
function ingresoTotal() {
  return pedidosJornada().reduce(function (a, p) { return a + Number(p.total || 0); }, 0);
}

/** Los ingresos de una franja concreta. */
function ingresoPorFranja(franja) {
  return pedidosJornada().filter(function (p) { return p.franja === franja; })
    .reduce(function (a, p) { return a + Number(p.total || 0); }, 0);
}

/** El Top 5 de productos más vendidos (por unidades pedidas). */
function topProductos() {
  var mapa = {};
  pedidosJornada().forEach(function (p) {
    (p.items || []).forEach(function (it) {
      var clave = it.nombre;
      mapa[clave] = (mapa[clave] || 0) + Number(it.cantidad || 0);
    });
  });
  var salida = Object.keys(mapa).map(function (k) { return { etiqueta: k, valor: mapa[k] }; });
  if (!salida.length) {
    PIA.listar('productos').forEach(function (p) {
      salida.push({ etiqueta: p.nombre, valor: Number(p.ventas || 0) });
    });
  }
  salida.sort(function (a, b) { return b.valor - a.valor; });
  return salida.slice(0, 5);
}

/** El promedio de las calificaciones de 1 a 5 estrellas. */
function promedioCalificacion() {
  var notas = pedidosJornada().filter(function (p) { return Number(p.calificacion) > 0; })
    .map(function (p) { return Number(p.calificacion); });
  if (!notas.length) return 0;
  return notas.reduce(function (a, n) { return a + n; }, 0) / notas.length;
}

/** Dibuja una gráfica de barras horizontales con HTML y CSS. */
function barras(contenedor, datos, clase) {
  if (!contenedor) return;
  if (!datos.length) { contenedor.innerHTML = '<div class="vacio">Todavía no hay ventas para graficar.</div>'; return; }
  var maximo = datos.reduce(function (m, x) { return Math.max(m, x.valor); }, 1);
  var html = '';
  datos.forEach(function (x) {
    var ancho = Math.round(x.valor / maximo * 100);
    html += '<div class="barra-fila">';
    html += '<span>' + PIA.esc(x.etiqueta) + '</span>';
    html += '<div class="pista-barra"><i class="' + (clase || '') + '" style="width:' + ancho + '%"></i></div>';
    html += '<b style="text-align:right">' + x.valor + '</b>';
    html += '</div>';
  });
  contenedor.innerHTML = html;
}

/** Pinta los indicadores de la portada. */
function pintarIndicadoresInicio() {
  var t = document.getElementById('tPedidos');
  if (!t) return;
  pintarIndicadoresCatalogo();
  pintarIndicadoresCola();
}

/** Pinta el tablero del tendero. */
function pintarAdmin() {
  var caja = document.getElementById('aPedidos');
  if (!caja) return;
  var pedidos = pedidosJornada();
  caja.textContent = pedidos.length;
  var ingreso = document.getElementById('aIngresos');
  if (ingreso) ingreso.textContent = PIA.moneda(ingresoTotal());
  var listos = document.getElementById('aListos');
  if (listos) listos.textContent = pedidosListos().length;
  var agotados = document.getElementById('aAgotados');
  if (agotados) agotados.textContent = PIA.listar('productos').filter(function (p) { return Number(p.stock) <= 0; }).length;
  var nota = document.getElementById('aCalificacion');
  if (nota) {
    var promedio = promedioCalificacion();
    nota.textContent = promedio ? PIA.num(promedio, 1) + ' / 5' : 'Sin notas';
  }

  barras(document.getElementById('topProductos'), topProductos(), '');
  barras(document.getElementById('graficaFranjas'), [
    { etiqueta: 'Primer descanso', valor: ingresoPorFranja('PRIMER_DESCANSO') },
    { etiqueta: 'Segundo descanso', valor: ingresoPorFranja('SEGUNDO_DESCANSO') }
  ], 'acento');
  pintarAgotados();
}

/* Arranque del tablero. */
document.addEventListener('DOMContentLoaded', function () {
  pintarAdmin();
  pintarIndicadoresInicio();
});