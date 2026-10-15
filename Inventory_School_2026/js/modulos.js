/* ==========================================================================
   modulos.js — los módulos de Inventory School
   --------------------------------------------------------------------------
   Cada módulo sale de un REQUISITO FUNCIONAL del proyecto. Aquí se declara:
     - cómo se llama y con qué icono aparece en el menú,
     - qué campos tiene el formulario,
     - qué columnas se muestran en la tabla.

   Con esta información, app.js dibuja el formulario y la tabla automáticamente.
   Para agregar un campo solo hay que escribirlo aquí.

   Tipos de campo disponibles:
     texto   → caja de una línea          numero  → solo números
     parrafo → caja de varias líneas      fecha   → selector de fecha
     lista   → lista desplegable (lleva "opciones")
   ========================================================================== */

'use strict';

var MODULOS = [
  {
    id: 'usuarios',                       // identificador interno (no lleva espacios)
    titulo: 'Usuarios',      // nombre que se ve en el menú
    icono: '👤',                 // icono del menú
    requisito: 'Administración de los usuarios de la aplicación',
    campos: [
      { n: 'nombre', e: 'Nombre completo', t: 'texto', req: true },
      { n: 'documento', e: 'Documento', t: 'texto' },
      { n: 'correo', e: 'Correo electrónico', t: 'texto', req: true },
      { n: 'rol', e: 'Rol', t: 'lista', req: true, opciones: ['Estudiante', 'Docente', 'Directivo', 'Acudiente', 'Administrador'] },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Activo', 'Inactivo'] }
    ]
  },
  {
    id: 'inventario',                       // identificador interno (no lleva espacios)
    titulo: 'Inventario y préstamos',      // nombre que se ve en el menú
    icono: '📦',                 // icono del menú
    requisito: 'RF-01 · El sistema debe registrar los implementos deportivos con su código QR.',
    campos: [
      { n: 'codigo', e: 'Código', t: 'texto', req: true },
      { n: 'elemento', e: 'Elemento', t: 'texto', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Disponible', 'Prestado', 'En mantenimiento', 'Dañado'] },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'inventario_2',                       // identificador interno (no lleva espacios)
    titulo: 'Escanear el código QR para registrar',      // nombre que se ve en el menú
    icono: '📦',                 // icono del menú
    requisito: 'RF-02 · El sistema debe permitir escanear el código QR para registrar el préstamo y la devolución.',
    campos: [
      { n: 'codigo', e: 'Código', t: 'texto', req: true },
      { n: 'elemento', e: 'Elemento', t: 'texto', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Disponible', 'Prestado', 'En mantenimiento', 'Dañado'] },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'inventario_3',                       // identificador interno (no lleva espacios)
    titulo: 'En tiempo real quién tiene cada',      // nombre que se ve en el menú
    icono: '📦',                 // icono del menú
    requisito: 'RF-03 · El sistema debe mostrar en tiempo real quién tiene cada implemento.',
    campos: [
      { n: 'codigo', e: 'Código', t: 'texto', req: true },
      { n: 'elemento', e: 'Elemento', t: 'texto', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Disponible', 'Prestado', 'En mantenimiento', 'Dañado'] },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'inventario_4',                       // identificador interno (no lleva espacios)
    titulo: 'Catálogo consultable de los implementos',      // nombre que se ve en el menú
    icono: '📦',                 // icono del menú
    requisito: 'RF-04 · El sistema debe ofrecer un catálogo consultable de los implementos disponibles.',
    campos: [
      { n: 'codigo', e: 'Código', t: 'texto', req: true },
      { n: 'elemento', e: 'Elemento', t: 'texto', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Disponible', 'Prestado', 'En mantenimiento', 'Dañado'] },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'undefined',                       // identificador interno (no lleva espacios)
    titulo: 'Registros',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-05 · El sistema debe manejar perfiles de usuario para docentes y estudiantes.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'inventario_5',                       // identificador interno (no lleva espacios)
    titulo: 'Panel de administración con el estado',      // nombre que se ve en el menú
    icono: '📦',                 // icono del menú
    requisito: 'RF-06 · El sistema debe ofrecer un panel de administración con el estado de los balones e implementos.',
    campos: [
      { n: 'codigo', e: 'Código', t: 'texto', req: true },
      { n: 'elemento', e: 'Elemento', t: 'texto', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Disponible', 'Prestado', 'En mantenimiento', 'Dañado'] },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'inventario_6',                       // identificador interno (no lleva espacios)
    titulo: 'Cuando un implemento no haya sido',      // nombre que se ve en el menú
    icono: '📦',                 // icono del menú
    requisito: 'RF-07 · El sistema debe alertar cuando un implemento no haya sido devuelto a tiempo.',
    campos: [
      { n: 'codigo', e: 'Código', t: 'texto', req: true },
      { n: 'elemento', e: 'Elemento', t: 'texto', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Disponible', 'Prestado', 'En mantenimiento', 'Dañado'] },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  }
];
