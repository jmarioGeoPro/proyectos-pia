/* ==========================================================================
   almacen.js — la "base de datos" de la aplicación
   --------------------------------------------------------------------------
   El navegador no puede conectarse a MySQL, así que guarda la información en
   localStorage: un espacio del navegador que conserva los datos aunque se
   cierre la página. Es ideal para un prototipo funcional porque no necesita
   servidor ni internet.

   Aquí vive todo lo que toca los datos. Ningún otro archivo los modifica
   directamente: así, si algún día se cambia localStorage por un servidor, solo
   hay que tocar este archivo.
   ========================================================================== */

'use strict';   // activa el modo estricto: avisa de errores silenciosos

/** Nombre con el que se guardan los datos de este proyecto en el navegador. */
var CLAVE = 'pia_somos_potencialidades';

/**
 * Lee toda la base de datos.
 * @returns {Object} un objeto donde cada llave es una tabla y su valor una lista.
 */
function leerTodo() {
  try {
    var crudo = localStorage.getItem(CLAVE);
    return crudo ? JSON.parse(crudo) : {};
  } catch (e) {
    // Si el contenido está dañado, se empieza de nuevo en vez de romper la app
    console.error('No se pudo leer la información guardada:', e);
    return {};
  }
}

/** Guarda toda la base de datos. */
function guardarTodo(todo) {
  localStorage.setItem(CLAVE, JSON.stringify(todo));
}

/** Devuelve todas las filas de una tabla (lista vacía si no existe). */
function listar(tabla) {
  var todo = leerTodo();
  return todo[tabla] || [];
}

/**
 * Inserta una fila nueva en una tabla.
 * @param {string} tabla  nombre de la tabla
 * @param {Object} fila   los datos que se van a guardar
 * @returns {Object} la fila guardada, ya con su id y su fecha
 */
function insertar(tabla, fila) {
  var todo = leerTodo();
  if (!todo[tabla]) todo[tabla] = [];
  // El id es el mayor que exista más uno: así nunca se repite
  var id = todo[tabla].reduce(function (mayor, f) { return Math.max(mayor, f.id || 0); }, 0) + 1;
  var nueva = Object.assign({}, fila, {
    id: id,
    creado: new Date().toISOString()   // se guarda el momento exacto de la creación
  });
  todo[tabla].push(nueva);
  guardarTodo(todo);
  return nueva;
}

/**
 * Actualiza una fila que ya existe.
 * @param {string} tabla nombre de la tabla
 * @param {number} id    identificador de la fila
 * @param {Object} cambios datos nuevos
 */
function actualizar(tabla, id, cambios) {
  var todo = leerTodo();
  var lista = todo[tabla] || [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id === Number(id)) {
      lista[i] = Object.assign({}, lista[i], cambios, { id: Number(id), actualizado: new Date().toISOString() });
      guardarTodo(todo);
      return lista[i];
    }
  }
  return null;   // no se encontró
}

/** Elimina una fila. */
function eliminar(tabla, id) {
  var todo = leerTodo();
  todo[tabla] = (todo[tabla] || []).filter(function (f) { return f.id !== Number(id); });
  guardarTodo(todo);
}

/** Cuenta cuántas filas hay en una tabla. */
function contar(tabla) {
  return listar(tabla).length;
}

/** Borra TODA la información (se usa en la pantalla de configuración). */
function vaciar() {
  localStorage.removeItem(CLAVE);
}

/* --------------------------------------------------------------------------
   USUARIOS: el acceso a la aplicación
   La contraseña se guarda transformada (con un resumen), nunca en texto plano.
   -------------------------------------------------------------------------- */

/**
 * Convierte un texto en un resumen que no se puede devolver al original.
 * Se usa para no guardar la contraseña tal cual.
 */
function resumir(texto) {
  var h = 0;
  for (var i = 0; i < texto.length; i++) {
    h = ((h << 5) - h) + texto.charCodeAt(i);
    h = h & h;   // se mantiene como entero de 32 bits
  }
  return 'r' + Math.abs(h).toString(36);
}

/** Crea un usuario nuevo. Devuelve un mensaje de error o null si salió bien. */
function crearUsuario(nombre, correo, clave, rol) {
  var usuarios = listar('usuarios');
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].correo.toLowerCase() === String(correo).toLowerCase()) {
      return 'Ya existe una cuenta con ese correo.';
    }
  }
  insertar('usuarios', { nombre: nombre, correo: correo, clave: resumir(clave), rol: rol, estado: 'Activo' });
  return null;
}

/** Verifica el correo y la contraseña. Devuelve el usuario o null. */
function verificarUsuario(correo, clave) {
  var usuarios = listar('usuarios');
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].correo.toLowerCase() === String(correo).toLowerCase() && usuarios[i].clave === resumir(clave)) {
      return usuarios[i];
    }
  }
  return null;
}

/* --------------------------------------------------------------------------
   SESIÓN: recuerda quién está usando la aplicación mientras navega
   -------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   CUENTA DE PRUEBA
   La primera vez que se abre la aplicación se crea una cuenta para que
   cualquier persona pueda revisarla sin tener que registrarse. Es la misma
   en todas las aplicaciones de los proyectos.
   -------------------------------------------------------------------------- */
var CUENTA_PRUEBA = { correo: 'pruebas@pasculia.edu.co', clave: 'PascualBravo2026', nombre: 'Cuenta de prueba', rol: 'Docente' };

/**
 * Crea la cuenta de prueba si la aplicación todavía no tiene usuarios.
 * Si ya hay cuentas creadas no se toca nada: los datos de verdad manda.
 */
function prepararCuentaDePrueba() {
  if (listar('usuarios').length > 0) return;
  crearUsuario(CUENTA_PRUEBA.nombre, CUENTA_PRUEBA.correo, CUENTA_PRUEBA.clave, CUENTA_PRUEBA.rol);
}

function guardarSesion(usuario) { sessionStorage.setItem(CLAVE + '_sesion', JSON.stringify(usuario)); }
function leerSesion() {
  try { return JSON.parse(sessionStorage.getItem(CLAVE + '_sesion') || 'null'); } catch (e) { return null; }
}
function cerrarSesion() { sessionStorage.removeItem(CLAVE + '_sesion'); }

/* Se prepara la cuenta de prueba al abrir la aplicación. */
prepararCuentaDePrueba();
