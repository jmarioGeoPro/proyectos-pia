/* ==========================================================================
   modulos.js — los módulos de Great Food App
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
    requisito: 'RF-01 · El sistema debe permitir registrar al usuario y acceder con sus datos.',
    campos: [
      { n: 'nombre', e: 'Nombre completo', t: 'texto', req: true },
      { n: 'documento', e: 'Documento', t: 'texto' },
      { n: 'correo', e: 'Correo electrónico', t: 'texto', req: true },
      { n: 'rol', e: 'Rol', t: 'lista', req: true, opciones: ['Estudiante', 'Docente', 'Directivo', 'Acudiente', 'Administrador'] },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Activo', 'Inactivo'] }
    ]
  },
  {
    id: 'alimentos',                       // identificador interno (no lleva espacios)
    titulo: 'Alimentación y pedidos',      // nombre que se ve en el menú
    icono: '🍽️',                 // icono del menú
    requisito: 'RF-02 · El sistema debe ofrecer la búsqueda de los productos de la tienda escolar.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'producto', e: 'Producto o menú', t: 'texto', req: true },
      { n: 'cantidad', e: 'Cantidad', t: 'numero', req: true },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Solicitado', 'En preparación', 'Entregado'] }
    ]
  },
  {
    id: 'catalogo',                       // identificador interno (no lleva espacios)
    titulo: 'Catálogo de contenidos',      // nombre que se ve en el menú
    icono: '🎬',                 // icono del menú
    requisito: 'RF-03 · El sistema debe permitir seleccionar la cantidad de cada producto.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'tema', e: 'Tema o género', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo' },
      { n: 'nivel', e: 'Nivel', t: 'lista', opciones: ['Básico', 'Intermedio', 'Avanzado'] },
      { n: 'enlace', e: 'Enlace', t: 'texto' }
    ]
  },
  {
    id: 'undefined',                       // identificador interno (no lleva espacios)
    titulo: 'Registros',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-04 · El sistema debe ofrecer un método de pago dentro de la aplicación.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'alimentos_2',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe informar al usuario el',      // nombre que se ve en el menú
    icono: '🍽️',                 // icono del menú
    requisito: 'RF-05 · El sistema debe informar al usuario el tiempo de espera de su pedido.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'producto', e: 'Producto o menú', t: 'texto', req: true },
      { n: 'cantidad', e: 'Cantidad', t: 'numero', req: true },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Solicitado', 'En preparación', 'Entregado'] }
    ]
  },
  {
    id: 'alimentos_3',                       // identificador interno (no lleva espacios)
    titulo: 'Estado del pedido hasta su entrega',      // nombre que se ve en el menú
    icono: '🍽️',                 // icono del menú
    requisito: 'RF-06 · El sistema debe mostrar el estado del pedido hasta su entrega.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'producto', e: 'Producto o menú', t: 'texto', req: true },
      { n: 'cantidad', e: 'Cantidad', t: 'numero', req: true },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Solicitado', 'En preparación', 'Entregado'] }
    ]
  },
  {
    id: 'alimentos_4',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe agilizar el trabajo de',      // nombre que se ve en el menú
    icono: '🍽️',                 // icono del menú
    requisito: 'RF-07 · El sistema debe agilizar el trabajo de las personas que atienden la tienda.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'producto', e: 'Producto o menú', t: 'texto', req: true },
      { n: 'cantidad', e: 'Cantidad', t: 'numero', req: true },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Solicitado', 'En preparación', 'Entregado'] }
    ]
  }
];
