/* ==========================================================================
   modulos.js — los módulos de R.A.D.E
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
    id: 'alimentos',                       // identificador interno (no lleva espacios)
    titulo: 'Alimentación y pedidos',      // nombre que se ve en el menú
    icono: '🍽️',                 // icono del menú
    requisito: 'RF-01 · El sistema debe registrar los alimentos consumidos por cada estudiante.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'producto', e: 'Producto o menú', t: 'texto', req: true },
      { n: 'cantidad', e: 'Cantidad', t: 'numero', req: true },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Solicitado', 'En preparación', 'Entregado'] }
    ]
  },
  {
    id: 'alimentos_2',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe identificar las faltas de',      // nombre que se ve en el menú
    icono: '🍽️',                 // icono del menú
    requisito: 'RF-02 · El sistema debe identificar las faltas de los estudiantes inscritos en el PAE.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'producto', e: 'Producto o menú', t: 'texto', req: true },
      { n: 'cantidad', e: 'Cantidad', t: 'numero', req: true },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Solicitado', 'En preparación', 'Entregado'] }
    ]
  },
  {
    id: 'undefined',                       // identificador interno (no lleva espacios)
    titulo: 'Registros',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-03 · El sistema debe reemplazar los fichos físicos por un registro digital.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'alimentos_3',                       // identificador interno (no lleva espacios)
    titulo: 'Consultar y analizar los datos de',      // nombre que se ve en el menú
    icono: '🍽️',                 // icono del menú
    requisito: 'RF-04 · El sistema debe permitir consultar y analizar los datos de consumo por periodo.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'producto', e: 'Producto o menú', t: 'texto', req: true },
      { n: 'cantidad', e: 'Cantidad', t: 'numero', req: true },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Solicitado', 'En preparación', 'Entregado'] }
    ]
  },
  {
    id: 'undefined_2',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe manejar el registro de',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-05 · El sistema debe manejar el registro de los usuarios del programa.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'undefined_3',                       // identificador interno (no lleva espacios)
    titulo: 'Reportes para la coordinación del programa',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-06 · El sistema debe generar reportes para la coordinación del programa.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'alimentos_4',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe reducir el personal necesario',      // nombre que se ve en el menú
    icono: '🍽️',                 // icono del menú
    requisito: 'RF-07 · El sistema debe reducir el personal necesario para el control del restaurante.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'producto', e: 'Producto o menú', t: 'texto', req: true },
      { n: 'cantidad', e: 'Cantidad', t: 'numero', req: true },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Solicitado', 'En preparación', 'Entregado'] }
    ]
  }
];
