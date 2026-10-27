/* ==========================================================================
   estadisticas-chart.js
   --------------------------------------------------------------------------
   La analítica visual del inventario: qué deporte mueve más implementos y
   qué proporción del material está en buen estado. Son las gráficas que el
   docente de Educación Física lleva a la reunión de área.
   ========================================================================== */

'use strict';

/** Agrupa los implementos por deporte. */
function implementosPorDeporte() {
  var lista = PIA.listar('implementos');
  var mapa = {};
  lista.forEach(function (x) {
    var d = x.deporte || 'Sin deporte';
    mapa[d] = (mapa[d] || 0) + 1;
  });
  var salida = [];
  Object.keys(mapa).forEach(function (k) { salida.push({ etiqueta: k, valor: mapa[k] }); });
  salida.sort(function (a, b) { return b.valor - a.valor; });
  return salida;
}

/** Cuenta los préstamos históricos de cada deporte. */
function prestamosPorDeporte() {
  var implementos = PIA.listar('implementos');
  var prestamos = PIA.listar('prestamos');
  var mapa = {};
  prestamos.forEach(function (p) {
    var it = implementos.filter(function (x) { return x.codigo_qr === p.codigo_qr; })[0];
    var d = it ? it.deporte : 'Otro';
    mapa[d] = (mapa[d] || 0) + 1;
  });
  var salida = [];
  Object.keys(mapa).forEach(function (k) { salida.push({ etiqueta: k, valor: mapa[k] }); });
  salida.sort(function (a, b) { return b.valor - a.valor; });
  return salida;
}

/** Cuenta los implementos por estado físico. */
function implementosPorEstado() {
  var lista = PIA.listar('implementos');
  var mapa = {};
  ESTADOS_FISICOS.forEach(function (e) { mapa[e] = 0; });
  lista.forEach(function (x) { mapa[x.estado_fisico] = (mapa[x.estado_fisico] || 0) + 1; });
  var salida = [];
  Object.keys(mapa).forEach(function (k) { salida.push({ etiqueta: k, valor: mapa[k] }); });
  return salida;
}

/** Dibuja una gráfica de barras horizontales con HTML y CSS. */
function pintarBarras(contenedor, datos, claseBarra) {
  if (!contenedor) return;
  if (!datos.length) { contenedor.innerHTML = '<div class="vacio">Sin datos para graficar.</div>'; return; }
  var maximo = datos.reduce(function (m, x) { return Math.max(m, x.valor); }, 1);
  var html = '';
  datos.forEach(function (x) {
    var ancho = Math.round(x.valor / maximo * 100);
    html += '<div class="barra-fila">';
    html += '<span>' + PIA.esc(x.etiqueta) + '</span>';
    html += '<div class="pista-barra"><i class="' + (claseBarra || '') + '" style="width:' + ancho + '%"></i></div>';
    html += '<b style="text-align:right">' + x.valor + '</b>';
    html += '</div>';
  });
  contenedor.innerHTML = html;
}

/** Pinta los indicadores del panel de inventario. */
function pintarIndicadoresAdmin() {
  var lista = PIA.listar('implementos');
  var total = document.getElementById('aTotal');
  if (!total) return;
  total.textContent = lista.length;
  var buenos = lista.filter(function (x) { return x.estado_fisico === 'Excelente' || x.estado_fisico === 'Bueno'; }).length;
  document.getElementById('aBuenos').textContent = (lista.length ? Math.round(buenos / lista.length * 100) : 0) + '%';
  document.getElementById('aMantenimiento').textContent = lista.filter(function (x) { return x.disponibilidad === 'EN_MANTENIMIENTO'; }).length;
  document.getElementById('aPrestamos').textContent = PIA.listar('prestamos').length;
}

/** Pinta el tablero completo de gráficas. */
function pintarEstadisticas() {
  var graficaDeportes = document.getElementById('graficaDeportes');
  var graficaEstados = document.getElementById('graficaEstados');
  if (!graficaDeportes && !graficaEstados) return;
  pintarIndicadoresAdmin();
  var deportes = prestamosPorDeporte();
  if (!deportes.length) deportes = implementosPorDeporte();
  pintarBarras(graficaDeportes, deportes, '');
  pintarBarras(graficaEstados, implementosPorEstado(), 'acento');
}

/** Devuelve el implemento más prestado de la bodega. */
function implementoEstrella() {
  var lista = PIA.listar('implementos').slice().sort(function (a, b) {
    return Number(b.veces_prestado || 0) - Number(a.veces_prestado || 0);
  });
  return lista[0] || null;
}

/** El porcentaje de activos que están fuera de la bodega. */
function porcentajePrestado() {
  var lista = PIA.listar('implementos');
  if (!lista.length) return 0;
  var fuera = lista.filter(function (x) { return x.disponibilidad === 'PRESTADO'; }).length;
  return Math.round(fuera / lista.length * 100);
}

document.addEventListener('DOMContentLoaded', function () {
  pintarEstadisticas();
});