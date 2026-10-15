/* ==========================================================================
   app.js — la lógica de Dual Language Center
   --------------------------------------------------------------------------
   Este archivo hace cuatro cosas:
     1. Maneja el ingreso y el registro de usuarios.
     2. Dibuja el menú con los módulos.
     3. Dibuja el formulario y la tabla de cada módulo.
     4. Responde a los clics: guardar, editar, eliminar y buscar.

   Flujo de la aplicación:
     ingreso  →  se elige un módulo  →  se guardan datos  →  se ven en la tabla
   ========================================================================== */

'use strict';

/** Guarda el módulo que se está viendo en este momento. */
var moduloActual = null;
/** Guarda el id del registro que se está editando (null si es nuevo). */
var editandoId = null;
/** Texto del buscador de la tabla. */
var filtro = '';

/* --------------------------------------------------------------------------
   ATAJOS: se escriben una vez y se usan en todo el archivo
   -------------------------------------------------------------------------- */
/** Busca un elemento por su id. */
function $(id) { return document.getElementById(id); }

/** Pone el texto dentro de un elemento, escapando el HTML por seguridad. */
function ponerTexto(el, texto) {
  if (el) el.textContent = texto == null ? '' : String(texto);
}

/** Convierte caracteres peligrosos para que no se pueda inyectar código. */
function seguro(t) {
  return String(t == null ? '' : t)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Muestra un aviso flotante durante unos segundos. */
function avisar(mensaje, esError) {
  var caja = $('aviso');
  caja.textContent = mensaje;
  caja.className = 'aviso' + (esError ? ' malo' : '');
  setTimeout(function () { caja.className = 'aviso oculto'; }, 3200);
}

/** Da formato a una fecha para mostrarla. */
function fechaCorta(v) {
  if (!v) return '—';
  var d = new Date(v);
  if (isNaN(d.getTime())) return v;
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
}

/* --------------------------------------------------------------------------
   1. INGRESO Y REGISTRO
   -------------------------------------------------------------------------- */

/** Muestra la aplicación y esconde la pantalla de ingreso. */
function entrar(usuario) {
  $('pantallaIngreso').classList.add('oculto');
  $('aplicacion').classList.remove('oculto');
  ponerTexto($('usuarioActual'), usuario.nombre + ' · ' + usuario.rol);
  dibujarMenu();
  abrirModulo(MODULOS[0].id);
}

/** Cierra la sesión y vuelve a la pantalla de ingreso. */
function salir() {
  cerrarSesion();
  $('aplicacion').classList.add('oculto');
  $('pantallaIngreso').classList.remove('oculto');
  $('formIngreso').reset();
}

document.addEventListener('DOMContentLoaded', function () {

  // --- formulario de ingreso ---
  $('formIngreso').addEventListener('submit', function (ev) {
    ev.preventDefault();   // evita que la página se recargue
    var u = verificarUsuario($('ingCorreo').value, $('ingClave').value);
    if (!u) { avisar('Correo o contraseña incorrectos.', true); return; }
    guardarSesion(u);
    entrar(u);
  });

  // --- enlace para crear la cuenta ---
  $('enlaceRegistro').addEventListener('click', function (ev) {
    ev.preventDefault();
    $('formIngreso').classList.add('oculto');
    $('formRegistro').classList.remove('oculto');
  });
  $('cancelarRegistro').addEventListener('click', function () {
    $('formRegistro').classList.add('oculto');
    $('formIngreso').classList.remove('oculto');
  });

  // --- formulario de registro ---
  $('formRegistro').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var error = crearUsuario($('regNombre').value, $('regCorreo').value, $('regClave').value, $('regRol').value);
    if (error) { avisar(error, true); return; }
    avisar('Cuenta creada. Ya puedes ingresar.');
    var u = verificarUsuario($('regCorreo').value, $('regClave').value);
    guardarSesion(u);
    $('formRegistro').reset();
    entrar(u);
  });

  $('botonSalir').addEventListener('click', salir);
  $('botonMenu').addEventListener('click', function () {
    document.querySelector('.lateral').classList.toggle('abierto');
  });

  // --- si ya había una sesión abierta, se entra directo ---
  var sesion = leerSesion();
  if (sesion) entrar(sesion);
});

/* --------------------------------------------------------------------------
   2. EL MENÚ
   -------------------------------------------------------------------------- */
function dibujarMenu() {
  var menu = $('menu');
  menu.innerHTML = '';
  MODULOS.forEach(function (m) {
    var b = document.createElement('button');
    b.innerHTML = '<span>' + m.icono + '</span> ' + seguro(m.titulo);
    b.dataset.modulo = m.id;
    b.addEventListener('click', function () { abrirModulo(m.id); });
    menu.appendChild(b);
  });
}

/* --------------------------------------------------------------------------
   3. ABRIR UN MÓDULO
   -------------------------------------------------------------------------- */
function abrirModulo(id) {
  moduloActual = MODULOS.find(function (m) { return m.id === id; });
  editandoId = null;
  filtro = '';
  // se marca la opción activa del menú
  document.querySelectorAll('#menu button').forEach(function (b) {
    b.classList.toggle('activo', b.dataset.modulo === id);
  });
  document.querySelector('.lateral').classList.remove('abierto');
  ponerTexto($('tituloModulo'), moduloActual.titulo);
  dibujarModulo();
}

/** Dibuja el formulario y la tabla del módulo activo. */
function dibujarModulo() {
  var m = moduloActual;
  var filas = listar(m.id).filter(function (f) {
    if (!filtro) return true;
    return JSON.stringify(f).toLowerCase().indexOf(filtro.toLowerCase()) !== -1;
  });

  var vista = $('vista');
  vista.innerHTML = '';

  /* ---- tablero con el total y lo de hoy ---- */
  var hoy = new Date().toISOString().slice(0, 10);
  var deHoy = listar(m.id).filter(function (f) { return String(f.creado || '').slice(0, 10) === hoy; }).length;
  var tablero = document.createElement('div');
  tablero.className = 'indicadores';
  tablero.innerHTML =
    '<div class="indicador"><b>Total de registros</b><strong>' + listar(m.id).length + '</strong></div>' +
    '<div class="indicador"><b>Registrados hoy</b><strong>' + deHoy + '</strong></div>' +
    '<div class="indicador"><b>Mostrando</b><strong>' + filas.length + '</strong></div>';
  vista.appendChild(tablero);

  /* ---- formulario ---- */
  var tarjetaForm = document.createElement('div');
  tarjetaForm.className = 'tarjeta';
  var tituloForm = editandoId ? 'Editar registro' : 'Nuevo registro';
  tarjetaForm.innerHTML = '<h2>' + tituloForm + '</h2>' +
    '<p class="ayuda">' + seguro(m.requisito) + '</p>' +
    '<form id="formModulo"><div class="rejilla" id="campos"></div>' +
    '<div style="margin-top:16px;display:flex;gap:10px">' +
    '<button type="submit" class="boton">' + (editandoId ? 'Guardar cambios' : 'Guardar') + '</button>' +
    '<button type="button" class="boton claro" id="botonLimpiar">Limpiar</button>' +
    '</div></form>';
  vista.appendChild(tarjetaForm);

  // se dibuja un campo por cada campo declarado en modulos.js
  var contenedorCampos = tarjetaForm.querySelector('#campos');
  m.campos.forEach(function (c) {
    var div = document.createElement('div');
    var etiqueta = '<label for="c_' + c.n + '">' + seguro(c.e) + (c.req ? ' *' : '') + '</label>';
    var control;
    if (c.t === 'lista') {
      control = '<select id="c_' + c.n + '"' + (c.req ? ' required' : '') + '>' +
        '<option value="">— Selecciona —</option>' +
        (c.opciones || []).map(function (o) { return '<option>' + seguro(o) + '</option>'; }).join('') + '</select>';
    } else if (c.t === 'parrafo') {
      control = '<textarea id="c_' + c.n + '"' + (c.req ? ' required' : '') + ' placeholder="Escribe aquí…"></textarea>';
    } else if (c.t === 'fecha') {
      control = '<input type="date" id="c_' + c.n + '"' + (c.req ? ' required' : '') + '>';
    } else if (c.t === 'numero') {
      control = '<input type="number" id="c_' + c.n + '" min="0" step="any"' + (c.req ? ' required' : '') + '>';
    } else {
      control = '<input type="text" id="c_' + c.n + '"' + (c.req ? ' required' : '') + ' placeholder="Escribe aquí…">';
    }
    div.innerHTML = etiqueta + control;
    contenedorCampos.appendChild(div);
  });

  // si se está editando, se llenan los campos con los datos actuales
  if (editandoId) {
    var actual = listar(m.id).find(function (f) { return f.id === Number(editandoId); });
    if (actual) m.campos.forEach(function (c) { var el = $('c_' + c.n); if (el) el.value = actual[c.n] || ''; });
  }

  tarjetaForm.querySelector('#formModulo').addEventListener('submit', function (ev) {
    ev.preventDefault();
    guardarRegistro();
  });
  tarjetaForm.querySelector('#botonLimpiar').addEventListener('click', function () {
    editandoId = null;
    dibujarModulo();
  });

  /* ---- tabla ---- */
  var tarjetaTabla = document.createElement('div');
  tarjetaTabla.className = 'tarjeta';
  var soloLectura = m.campos.slice(0, 5);   // se muestran los primeros cinco campos
  var cuerpo = filas.map(function (f) {
    return '<tr>' +
      soloLectura.map(function (c) {
        var v = f[c.n];
        if (c.t === 'fecha') v = fechaCorta(v);
        var texto = v == null || v === '' ? '—' : String(v);
        if (texto.length > 60) texto = texto.slice(0, 58) + '…';
        return '<td>' + seguro(texto) + '</td>';
      }).join('') +
      '<td style="white-space:nowrap">' +
      '<button class="boton claro chico" data-editar="' + f.id + '">Editar</button> ' +
      '<button class="boton peligro chico" data-borrar="' + f.id + '">Eliminar</button>' +
      '</td></tr>';
  }).join('');

  tarjetaTabla.innerHTML = '<h2>' + seguro(m.titulo) + '</h2>' +
    '<div style="display:flex;gap:10px;margin-bottom:12px">' +
    '<input type="search" id="buscador" placeholder="Buscar en los registros…" value="' + seguro(filtro) + '">' +
    '<button class="boton claro" id="botonExportar">Exportar</button></div>' +
    '<div class="tabla-envoltura"><table><thead><tr>' +
    soloLectura.map(function (c) { return '<th>' + seguro(c.e) + '</th>'; }).join('') +
    '<th>Acciones</th></tr></thead><tbody>' +
    (cuerpo || '<tr><td colspan="' + (soloLectura.length + 1) + '" style="text-align:center;color:#888">Todavía no hay registros. Crea el primero con el formulario de arriba.</td></tr>') +
    '</tbody></table></div>';
  vista.appendChild(tarjetaTabla);

  // --- eventos de la tabla ---
  var buscador = tarjetaTabla.querySelector('#buscador');
  buscador.addEventListener('input', function () {
    filtro = buscador.value;
    // se vuelve a dibujar solo la tabla, sin perder el foco del buscador
    var posicion = buscador.selectionStart;
    dibujarModulo();
    var nuevo = $('buscador');
    if (nuevo) { nuevo.focus(); try { nuevo.setSelectionRange(posicion, posicion); } catch (e) {} }
  });

  tarjetaTabla.querySelectorAll('[data-editar]').forEach(function (b) {
    b.addEventListener('click', function () { editandoId = Number(b.dataset.editar); dibujarModulo(); });
  });
  tarjetaTabla.querySelectorAll('[data-borrar]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!confirm('¿Seguro que quieres eliminar este registro? Esta acción no se puede deshacer.')) return;
      eliminar(m.id, b.dataset.borrar);
      avisar('Registro eliminado.');
      dibujarModulo();
    });
  });
  tarjetaTabla.querySelector('#botonExportar').addEventListener('click', exportar);
}

/* --------------------------------------------------------------------------
   4. GUARDAR, EXPORTAR
   -------------------------------------------------------------------------- */
function guardarRegistro() {
  var m = moduloActual;
  var datos = {};
  // se leen los campos del formulario
  m.campos.forEach(function (c) {
    var el = $('c_' + c.n);
    datos[c.n] = el ? el.value.trim() : '';
  });
  // validación: los campos obligatorios no pueden quedar vacíos
  var faltantes = m.campos.filter(function (c) { return c.req && !datos[c.n]; });
  if (faltantes.length) {
    avisar('Faltan campos obligatorios: ' + faltantes.map(function (c) { return c.e; }).join(', '), true);
    return;
  }
  if (editandoId) {
    actualizar(m.id, editandoId, datos);
    avisar('Cambios guardados.');
  } else {
    insertar(m.id, datos);
    avisar('Registro guardado.');
  }
  editandoId = null;
  dibujarModulo();
}

/** Descarga los registros del módulo en un archivo CSV (se abre en Excel). */
function exportar() {
  var m = moduloActual;
  var filas = listar(m.id);
  if (!filas.length) { avisar('No hay registros para exportar.', true); return; }
  var encabezados = m.campos.map(function (c) { return c.e; }).join(';');
  var cuerpo = filas.map(function (f) {
    return m.campos.map(function (c) { return String(f[c.n] == null ? '' : f[c.n]).replace(/;/g, ','); }).join(';');
  }).join('\n');
  // el punto y coma permite que Excel abra el archivo en columnas
  var contenido = '\ufeff' + encabezados + '\n' + cuerpo;
  var enlace = document.createElement('a');
  enlace.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(contenido);
  enlace.download = 'Dual_Language_Center-' + m.id + '.csv';
  enlace.click();
  avisar('Archivo exportado.');
}
