/* ==========================================================================
   dashboard-comite.js
   --------------------------------------------------------------------------
   Panel del Comité Estudiantil: indicadores, filtros por lugar y estado,
   cambio de estado y respuesta con plazo de 3 días hábiles.
   ========================================================================== */

'use strict';

/** Arma los filtros y pinta el tablero. */
function pintarPanel() {
  var lista = PIA.listar('solicitudes');
  /* los filtros se llenan una sola vez */
  var selLugar = document.getElementById('fLugar');
  if (selLugar && selLugar.options.length === 1) {
    var lugares = [];
    lista.forEach(function (x) { if (lugares.indexOf(x.lugar) === -1) lugares.push(x.lugar); });
    lugares.sort().forEach(function (l) { selLugar.innerHTML += '<option>' + PIA.esc(l) + '</option>'; });
  }
  var selEstado = document.getElementById('fEstado');
  if (selEstado && selEstado.options.length === 1) {
    ESTADOS.forEach(function (e) { selEstado.innerHTML += '<option value="' + e + '">' + e.replace(/_/g, ' ') + '</option>'; });
  }

  /* se aplican los filtros */
  var lugar = PIA.valor('fLugar'), estado = PIA.valor('fEstado'), texto = PIA.normalizar(PIA.valor('fTexto'));
  var filtrada = lista.filter(function (x) {
    if (lugar && x.lugar !== lugar) return false;
    if (estado && x.estado !== estado) return false;
    if (texto && PIA.normalizar(x.mensaje + ' ' + x.radicado + ' ' + (x.autor || '')).indexOf(texto) === -1) return false;
    return true;
  });

  /* los indicadores */
  var hoy = PIA.hoy();
  document.getElementById('dTotal').textContent = lista.length;
  document.getElementById('dPendientes').textContent = lista.filter(function (x) { return x.estado === 'PENDIENTE' || x.estado === 'EN_REVISION'; }).length;
  document.getElementById('dVencidos').textContent = lista.filter(function (x) { return !x.respuesta && x.fecha_limite && x.fecha_limite < hoy; }).length;
  var respondidos = lista.filter(function (x) { return x.respuesta; });
  var aTiempo = respondidos.filter(function (x) { return !x.fecha_limite || hoy <= x.fecha_limite || x.estado === 'RESPONDIDO'; }).length;
  document.getElementById('dCumplimiento').textContent = (lista.length ? Math.round(aTiempo / lista.length * 100) : 100) + '%';

  /* la tabla */
  var cont = document.getElementById('dTabla');
  cont.innerHTML = PIA.tabla(
    ['Radicado', 'Tipo', 'Lugar', 'Autor', 'Enviado', 'Vence', 'Estado', ''],
    filtrada.map(function (x) {
      var vencido = !x.respuesta && x.fecha_limite && x.fecha_limite < hoy;
      return [
        '<span class="mono">' + PIA.esc(x.radicado) + '</span>',
        PIA.esc(x.tipo),
        PIA.esc(x.lugar),
        PIA.esc(x.anonimo ? 'Reservada' : x.autor),
        PIA.fecha(x.fecha_envio),
        (vencido ? '<b style="color:var(--peligro)">' + PIA.fecha(x.fecha_limite) + '</b>' : PIA.fecha(x.fecha_limite)),
        etiquetaEstado(x.estado),
        '<div class="acciones"><button class="btn pq" onclick="abrirRadicado(' + x.id + ')">Abrir</button></div>'
      ];
    }),
    { vacio: 'No hay radicados con esos filtros.' }
  );
}

/** Abre un radicado para responderlo o cambiarle el estado. */
function abrirRadicado(id) {
  var s = PIA.listar('solicitudes').filter(function (x) { return Number(x.id) === Number(id); })[0];
  if (!s) return;
  var botones = '<button class="btn" onclick="PIA.cerrarModal()">Cerrar</button>' +
    '<button class="btn p" onclick="guardarRespuesta(' + s.id + ')">Guardar</button>';
  var cuerpo = '<div class="fila" style="margin-bottom:12px">' + etiquetaEstado(s.estado) +
    '<span class="badge neutro">' + PIA.esc(s.tipo) + '</span>' +
    '<span class="badge neutro">' + PIA.esc(s.lugar) + '</span></div>' +
    '<p style="background:#f8fafc;border-radius:9px;padding:12px;font-size:13.5px;margin-bottom:12px">' + PIA.esc(s.mensaje) + '</p>' +
    '<p class="pequeno gris">Correo: ' + PIA.esc(s.correo) + ' · Enviado: ' + PIA.fecha(s.fecha_envio) +
    ' · Vence: ' + PIA.fecha(s.fecha_limite) + '</p>' +
    '<div class="campo"><label for="mEstado">Estado</label><select id="mEstado">' +
      ESTADOS.map(function (e) { return '<option value="' + e + '"' + (e === s.estado ? ' selected' : '') + '>' + e.replace(/_/g, ' ') + '</option>'; }).join('') +
      '</select></div>' +
    '<div class="campo"><label for="mRespuesta">Respuesta para el estudiante</label>' +
      '<textarea id="mRespuesta" placeholder="Explica qué se hizo o qué se va a hacer">' + PIA.esc(s.respuesta || '') + '</textarea></div>' +
    '<div class="campo"><label for="mAccion">Acción tomada</label>' +
      '<input id="mAccion" value="' + PIA.esc(s.accion || '') + '" placeholder="Mantenimiento, escalado, reconocimiento…"></div>' +
    '<div class="campo"><label for="mPor">Responsable</label>' +
      '<input id="mPor" value="' + PIA.esc(s.respondido_por || '') + '" placeholder="Comité Estudiantil / Coordinación"></div>';
  PIA.modal('Radicado ' + s.radicado, cuerpo, botones);
}

/** Guarda la respuesta y el estado de un radicado. */
function guardarRespuesta(id) {
  var estado = PIA.valor('mEstado');
  var respuesta = PIA.valor('mRespuesta');
  if (estado === 'RESPONDIDO' && !respuesta) {
    PIA.toast('Para marcar como respondido escribe la respuesta.', 'mal');
    return;
  }
  PIA.actualizar('solicitudes', id, {
    estado: estado, respuesta: respuesta,
    accion: PIA.valor('mAccion'), respondido_por: PIA.valor('mPor')
  });
  PIA.toast('Radicado actualizado.');
  PIA.cerrarModal();
  pintarPanel();
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('dTabla')) pintarPanel();
});
