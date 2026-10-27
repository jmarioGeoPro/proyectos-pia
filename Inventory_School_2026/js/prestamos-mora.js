/* ==========================================================================
   prestamos-mora.js
   --------------------------------------------------------------------------
   El motor transaccional del proyecto: traduce paso a paso el algoritmo
   Gestionar_Prestamo_Y_Devolucion_QR_InventorySchool.
   Las dos constantes del PDF viven aquí: 30 minutos de descanso y 3 días de
   bloqueo pedagógico por devolución tardía.
   ========================================================================== */

'use strict';

/* Lo que dura el descanso: el préstamo debe volver en media hora. */
var TIEMPO_MAX_DESCANSO_MIN = 30;

/* Los días que el estudiante queda bloqueado si devuelve tarde. */
var DIAS_BLOQUEO_POR_MORA = 3;

/** La hora actual en formato HH:MM. */
function horaActual() {
  var d = new Date();
  var hh = d.getHours() < 10 ? '0' + d.getHours() : String(d.getHours());
  var mm = d.getMinutes() < 10 ? '0' + d.getMinutes() : String(d.getMinutes());
  return hh + ':' + mm;
}

/** Suma minutos a una hora HH:MM y devuelve HH:MM (sin pasar de un día). */
function sumarMinutos(hora, minutos) {
  var p = String(hora || '00:00').split(':');
  var total = Number(p[0]) * 60 + Number(p[1] || 0) + Number(minutos);
  total = ((total % 1440) + 1440) % 1440;
  var hh = Math.floor(total / 60);
  var mm = total % 60;
  return (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm;
}

/** Convierte una hora HH:MM en minutos desde la medianoche. */
function minutosDe(hora) {
  var p = String(hora || '00:00').split(':');
  return Number(p[0]) * 60 + Number(p[1] || 0);
}

/** Suma días de calendario a una fecha aaaa-mm-dd. */
function sumarDias(fecha, dias) {
  var d = new Date(String(fecha) + 'T00:00:00');
  d.setDate(d.getDate() + Number(dias));
  return d.toISOString().slice(0, 10);
}

/** Busca un estudiante por su documento (paso 1 del algoritmo). */
function buscarEstudiante(documento) {
  var doc = String(documento || '').trim();
  return PIA.listar('estudiantes').filter(function (x) { return String(x.documento) === doc; })[0] || null;
}

/** Busca un implemento por su código QR (paso 2 del algoritmo). */
function buscarPorQR(codigo) {
  var qr = String(codigo || '').trim().toUpperCase();
  return PIA.listar('implementos').filter(function (x) { return String(x.codigo_qr).toUpperCase() === qr; })[0] || null;
}

/** El préstamo abierto de un estudiante, si lo tiene. */
function prestamoActivoDe(documento) {
  var doc = String(documento || '').trim();
  return PIA.listar('prestamos').filter(function (x) {
    return x.estado === 'ACTIVO' && String(x.documento) === doc;
  })[0] || null;
}

/** Todos los préstamos que siguen abiertos. */
function prestamosActivos() {
  return PIA.listar('prestamos').filter(function (x) { return x.estado === 'ACTIVO'; });
}

/** ¿El estudiante tiene una sanción vigente? */
function sancionVigente(est) {
  if (!est || !est.sancion_hasta) return false;
  return String(est.sancion_hasta) > PIA.hoy();
}

/** ¿El préstamo ya se pasó de la hora límite? */
function prestamoVencido(p) {
  if (!p || p.estado !== 'ACTIVO') return false;
  if (String(p.fecha_salida) < PIA.hoy()) return true;
  if (String(p.fecha_salida) > PIA.hoy()) return false;
  return minutosDe(horaActual()) > minutosDe(p.hora_limite);
}

/** Muestra un aviso dentro de una caja de la página. */
function avisar(caja, tipo, html) {
  if (!caja) return;
  caja.innerHTML = '<div class="aviso ' + (tipo || '') + '">' + html + '</div>';
}

/* ---------------------------------------------------------------------- */
/*  PASO 3: SOLICITAR_PRESTAMO                                             */
/* ---------------------------------------------------------------------- */
/**
 * Registra un préstamo. Recorre las validaciones del algoritmo en orden:
 * sanción activa, préstamo abierto, disponibilidad del implemento.
 */
function solicitarPrestamo() {
  var caja = document.getElementById('resultadoEscaneo');
  var documento = PIA.valor('pDocumento');
  var codigo = PIA.valor('pCodigoQR');
  var fisico = PIA.valor('pEstadoFisico');

  if (!documento) { avisar(caja, 'mal', 'Escribe el documento del estudiante.'); return null; }
  if (!codigo) { avisar(caja, 'mal', 'Escanea o escribe el código QR del implemento.'); return null; }

  /* 1. el estudiante */
  var est = buscarEstudiante(documento);
  if (!est) { avisar(caja, 'mal', 'No encontramos a ningún estudiante con el documento <b>' + PIA.esc(documento) + '</b>.'); return null; }

  /* 2. el implemento */
  var imp = buscarPorQR(codigo);
  if (!imp) { avisar(caja, 'mal', 'El código <b>' + PIA.esc(codigo) + '</b> no corresponde a ningún implemento del inventario.'); return null; }

  /* 3. las tres validaciones del algoritmo */
  if (sancionVigente(est)) {
    avisar(caja, 'mal', 'Préstamo bloqueado hasta <b>' + PIA.fecha(est.sancion_hasta) +
      '</b> por retraso previo. Mientras tanto puedes usar los implementos de tu clase de Educación Física.');
    return null;
  }
  var abierto = prestamoActivoDe(documento);
  if (abierto) {
    avisar(caja, 'mal', 'Debes devolver primero el implemento que tienes en préstamo activo (' +
      '<b>' + PIA.esc(abierto.codigo_qr) + '</b>, límite ' + PIA.esc(abierto.hora_limite) + ').');
    return null;
  }
  if (imp.disponibilidad !== 'DISPONIBLE') {
    avisar(caja, 'mal', 'El implemento <b>' + PIA.esc(imp.nombre) + '</b> no está disponible actualmente: ' +
      badgeDisponibilidad(imp.disponibilidad) + '.');
    return null;
  }

  /* el préstamo sale con la hora límite de 30 minutos */
  var salida = horaActual();
  var limite = sumarMinutos(salida, TIEMPO_MAX_DESCANSO_MIN);
  PIA.actualizar('implementos', imp.id, {
    disponibilidad: 'PRESTADO',
    estado_fisico: fisico || imp.estado_fisico,
    veces_prestado: Number(imp.veces_prestado || 0) + 1
  });
  var nuevo = PIA.insertar('prestamos', {
    codigo_qr: imp.codigo_qr, documento: est.documento, estudiante: est.nombre,
    grado: est.grado, fecha_salida: PIA.hoy(), hora_salida: salida,
    hora_limite: limite, fecha_devolucion: '', hora_devolucion: '',
    estado: 'ACTIVO', estado_entrega: fisico || imp.estado_fisico,
    estado_recibo: '', observacion: ''
  });

  avisar(caja, 'ok', 'Préstamo exitoso de <b>' + PIA.esc(imp.nombre) + '</b>.<br>' +
    'Devuélvelo antes de las <b>' + limite + '</b>. Tienes ' + TIEMPO_MAX_DESCANSO_MIN + ' minutos.');
  PIA.toast('Préstamo registrado: ' + imp.codigo_qr);
  mostrarFichaPrestamo(nuevo);
  refrescarTodo();
  return nuevo;
}

/** Pinta la ficha del préstamo recién creado, con su cuenta regresiva. */
function mostrarFichaPrestamo(p) {
  var caja = document.getElementById('resultadoEscaneo');
  if (!caja || !p) return;
  var html = '<div class="tarjeta" style="margin:0;border-left:4px solid var(--ok)">';
  html += '<div class="fila" style="justify-content:space-between">';
  html += '<div><b>' + PIA.esc(p.estudiante) + '</b><br><span class="pequeno gris">' + PIA.esc(p.grado) + ' · ' + PIA.esc(p.codigo_qr) + '</span></div>';
  html += '<div class="derecha centro"><span class="pequeno gris">Entregar antes de</span><div class="turno-limite" id="cuentaLimite">' + PIA.esc(p.hora_limite) + '</div></div>';
  html += '</div></div>';
  caja.innerHTML = html + caja.innerHTML;
  arrancarCuenta(p);
}

/** Cuenta regresiva de los 30 minutos, cuando el préstamo es de hoy. */
function arrancarCuenta(p) {
  var caja = document.getElementById('cuentaLimite');
  if (!caja) return;
  clearInterval(window.__relojPrestamo);
  var limite = minutosDe(p.hora_limite);
  var actualizar = function () {
    var restantes = limite - minutosDe(horaActual());
    if (String(p.fecha_salida) !== PIA.hoy()) restantes = 0;
    if (restantes <= 0) {
      caja.textContent = 'TIEMPO AGOTADO';
      caja.className = 'turno-limite tarde';
      clearInterval(window.__relojPrestamo);
      return;
    }
    var m = Math.floor(restantes / 60);
    var s = restantes % 60;
    caja.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  };
  actualizar();
  window.__relojPrestamo = setInterval(actualizar, 1000);
}

/* ---------------------------------------------------------------------- */
/*  PASO 4: REGISTRAR_DEVOLUCION                                          */
/* ---------------------------------------------------------------------- */
/**
 * Cierra el préstamo abierto de un implemento y decide a qué estado pasa:
 * EN_MANTENIMIENTO si volvió roto, DISPONIBLE en cualquier otro caso.
 * Si llegó tarde, aplica el bloqueo pedagógico de 3 días.
 */
function registrarDevolucion() {
  var caja = document.getElementById('resultadoEscaneo');
  var codigo = PIA.valor('pCodigoQR');
  var fisico = PIA.valor('pEstadoFisico');
  if (!codigo) { avisar(caja, 'mal', 'Escanea o escribe el código QR del implemento que devuelves.'); return null; }

  var imp = buscarPorQR(codigo);
  if (!imp) { avisar(caja, 'mal', 'El código <b>' + PIA.esc(codigo) + '</b> no existe en el inventario.'); return null; }

  var qr = String(codigo).trim().toUpperCase();
  var p = PIA.listar('prestamos').filter(function (x) {
    return x.estado === 'ACTIVO' && String(x.codigo_qr).toUpperCase() === qr;
  })[0];
  if (!p) {
    avisar(caja, 'mal', 'No hay un préstamo activo de <b>' + PIA.esc(imp.nombre) + '</b>. Revisa el código QR.');
    return null;
  }

  /* se cierra el préstamo con la hora real de la devolución */
  var ahora = horaActual();
  var tarde = String(p.fecha_salida) < PIA.hoy() || minutosDe(ahora) > minutosDe(p.hora_limite);
  PIA.actualizar('prestamos', p.id, {
    estado: 'CERRADO', fecha_devolucion: PIA.hoy(), hora_devolucion: ahora,
    estado_recibo: fisico, observacion: tarde
      ? 'Devolución tardía: se aplicó bloqueo de 3 días.'
      : 'Devolución dentro del tiempo del descanso.'
  });

  /* el estado del activo depende del estado físico reportado */
  if (fisico === 'ROTO') {
    PIA.actualizar('implementos', imp.id, { estado_fisico: 'Roto', disponibilidad: 'EN_MANTENIMIENTO' });
  } else {
    PIA.actualizar('implementos', imp.id, { estado_fisico: fisico, disponibilidad: 'DISPONIBLE' });
  }

  /* la sanción por mora */
  var est = buscarEstudiante(p.documento);
  var bloqueadoHasta = '';
  if (tarde && est) {
    bloqueadoHasta = sumarDias(PIA.hoy(), DIAS_BLOQUEO_POR_MORA);
    PIA.actualizar('estudiantes', est.id, { sancion_hasta: bloqueadoHasta });
  }

  var html = '';
  if (fisico === 'ROTO') {
    html += '<b>' + PIA.esc(imp.nombre) + '</b> pasa a <b>EN MANTENIMIENTO</b>.<br>';
  }
  if (tarde) {
    html += 'Devolución tardía registrada. Se aplica bloqueo pedagógico temporal de ' + DIAS_BLOQUEO_POR_MORA + ' días';
    if (bloqueadoHasta) html += ', hasta el <b>' + PIA.fecha(bloqueadoHasta) + '</b>.';
    else html += '.';
    avisar(caja, 'warn', html);
    PIA.toast('Devolución tardía: bloqueo de 3 días.', 'warn');
  } else {
    html += 'Devolución exitosa a las ' + ahora + '. ¡Gracias por cuidar los implementos de la Lola!';
    avisar(caja, 'ok', html);
    PIA.toast('Devolución registrada: ' + imp.codigo_qr);
  }
  refrescarTodo();
  return p;
}

/** Llena el código QR con un implemento prestado, para probar sin cámara. */
function simularEscaneo() {
  var activos = prestamosActivos();
  var caja = document.getElementById('resultadoEscaneo');
  if (activos.length) {
    var p = activos[0];
    var otro = PIA.listar('estudiantes').filter(function (e) {
      return !prestamoActivoDe(e.documento) && !sancionVigente(e);
    })[0];
    PIA.poner('pCodigoQR', p.codigo_qr);
    PIA.poner('pDocumento', otro ? otro.documento : p.documento);
    PIA.toast('Código cargado: ' + p.codigo_qr);
    return;
  }
  var libre = PIA.listar('implementos').filter(function (x) { return x.disponibilidad === 'DISPONIBLE'; })[0];
  if (!libre) { avisar(caja, 'warn', 'No hay implementos disponibles para simular.'); return; }
  PIA.poner('pCodigoQR', libre.codigo_qr);
  PIA.poner('pDocumento', '1020226147');
  PIA.toast('Código cargado: ' + libre.codigo_qr);
}

/* ---------------------------------------------------------------------- */
/*  LAS VISTAS DEL PRÉSTAMO                                               */
/* ---------------------------------------------------------------------- */

/** Pinta la tabla de préstamos activos (portada y escáner). */
function pintarPrestamos() {
  var activos = prestamosActivos();
  var cont = document.getElementById('prestamosActivos') || document.getElementById('activosPortada');
  if (!cont) return;
  cont.innerHTML = PIA.tabla(
    ['Implemento', 'Estudiante', 'Salió', 'Límite', 'Estado'],
    activos.map(function (p) {
      var vencido = prestamoVencido(p);
      return [
        '<span class="mono">' + PIA.esc(p.codigo_qr) + '</span>',
        PIA.esc(p.estudiante) + '<br><span class="pequeno gris">' + PIA.esc(p.grado) + '</span>',
        PIA.esc(p.hora_salida),
        vencido ? '<b style="color:var(--peligro)">' + PIA.esc(p.hora_limite) + '</b>' : PIA.esc(p.hora_limite),
        vencido ? '<span class="badge mal">VENCIDO</span>' : '<span class="badge info">EN TIEMPO</span>'
      ];
    }),
    { vacio: 'No hay préstamos activos: todos los implementos están en la bodega.' }
  );
}

/** Pinta el perfil completo de un estudiante. */
function pintarPerfil() {
  var cont = document.getElementById('perfil');
  if (!cont) return;
  var documento = PIA.valor('fDocumento');
  if (!documento) { cont.innerHTML = ''; return; }
  var est = buscarEstudiante(documento);
  if (!est) {
    cont.innerHTML = '<div class="aviso mal">No encontramos un estudiante con el documento <b>' + PIA.esc(documento) + '</b>.</div>';
    return;
  }
  var activo = prestamoActivoDe(est.documento);
  var historial = PIA.listar('prestamos').filter(function (x) {
    return String(x.documento) === String(est.documento) && x.estado === 'CERRADO';
  });

  var html = '<section class="tarjeta">';
  html += '<div class="fila" style="justify-content:space-between">';
  html += '<div><h2>' + PIA.esc(est.nombre) + '</h2>' +
    '<p class="ayuda" style="margin:0">Documento ' + PIA.esc(est.documento) + ' · ' + PIA.esc(est.grado) + ' · ' + PIA.esc(est.telefono) + '</p></div>';
  html += '<div>' + (sancionVigente(est)
    ? '<span class="badge mal">BLOQUEADO HASTA ' + PIA.fecha(est.sancion_hasta) + '</span>'
    : '<span class="badge ok">SIN SANCIÓN</span>') + '</div>';
  html += '</div></section>';

  html += '<div class="rejilla g2">';
  html += '<section class="tarjeta"><h2>Préstamo activo</h2>';
  if (activo) {
    var vencido = prestamoVencido(activo);
    html += '<div class="fila" style="justify-content:space-between">';
    html += '<div><b class="mono">' + PIA.esc(activo.codigo_qr) + '</b><br>' +
      '<span class="pequeno gris">Salió a las ' + PIA.esc(activo.hora_salida) + ' · entrega antes de ' + PIA.esc(activo.hora_limite) + '</span></div>';
    html += '<div class="centro"><span class="pequeno gris">Tiempo restante</span>' +
      '<div class="turno-limite' + (vencido ? ' tarde' : '') + '" id="cuentaLimite">' + (vencido ? 'TIEMPO AGOTADO' : PIA.esc(activo.hora_limite)) + '</div></div>';
    html += '</div>';
    html += '<a class="btn p" style="margin-top:12px" href="escaner-prestamo.html">Ir a devolverlo</a>';
  } else {
    html += '<p class="pequeno gris">No tienes ningún implemento en préstamo. Pide uno en el escáner QR.</p>';
    html += '<a class="btn p" style="margin-top:10px" href="escaner-prestamo.html">Pedir un implemento</a>';
  }
  html += '</section>';

  html += '<section class="tarjeta"><h2>Resumen</h2>';
  html += '<div class="indicadores" style="grid-template-columns:1fr 1fr">';
  html += '<div class="indicador"><b>Préstamos</b><strong>' + (historial.length + (activo ? 1 : 0)) + '</strong><span>en total</span></div>';
  html += '<div class="indicador"><b>Devoluciones</b><strong>' + historial.length + '</strong><span>cerradas</span></div>';
  html += '</div>';
  html += '<p class="pequeno gris">Recuerda: el préstamo dura ' + TIEMPO_MAX_DESCANSO_MIN + ' minutos y una devolución tardía bloquea ' + DIAS_BLOQUEO_POR_MORA + ' días.</p>';
  html += '</section></div>';

  html += '<section class="tarjeta"><h2>Historial</h2><p class="ayuda">Todo lo que has pedido prestado.</p>';
  html += PIA.tabla(
    ['Implemento', 'Fecha', 'Salió', 'Devolvió', 'Estado físico', 'Resultado'],
    historial.map(function (x) {
      return [
        '<span class="mono">' + PIA.esc(x.codigo_qr) + '</span>',
        PIA.fecha(x.fecha_salida),
        PIA.esc(x.hora_salida),
        PIA.esc(x.hora_devolucion || '—'),
        badgeFisico(x.estado_recibo || x.estado_entrega),
        String(x.observacion || '').indexOf('tardía') !== -1
          ? '<span class="badge warn">TARDÍA</span>'
          : '<span class="badge ok">A TIEMPO</span>'
      ];
    }),
    { vacio: 'Todavía no tienes devoluciones registradas.' }
  );
  html += '</section>';

  cont.innerHTML = html;
  if (activo && String(activo.fecha_salida) === PIA.hoy()) arrancarCuenta(activo);
}

/** Busca el perfil y lo pinta. */
function buscarPerfil() {
  var doc = PIA.valor('fDocumento');
  if (!doc) { PIA.toast('Escribe tu documento para consultar el perfil.', 'mal'); return; }
  pintarPerfil();
}

/** Carga un documento de ejemplo en el buscador. */
function verEjemplo() {
  PIA.poner('fDocumento', '1020118919');
  pintarPerfil();
}

/* Arranque de las páginas de préstamo. */
document.addEventListener('DOMContentLoaded', function () {
  pintarPrestamos();
  if (document.getElementById('perfil') && PIA.parametro('documento')) {
    PIA.poner('fDocumento', PIA.parametro('documento'));
    pintarPerfil();
  }
});