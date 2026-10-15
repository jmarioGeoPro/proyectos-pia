/* ==========================================================================
   modulos.js — los módulos de Hunter Food
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
    requisito: 'RF-01 · El sistema debe registrar el ingreso de cada estudiante al restaurante escolar, con su hora.',
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
    requisito: 'RF-02 · El sistema debe permitir consultar la asistencia y el historial de ingreso por estudiante y por grupo.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'publicaciones',                       // identificador interno (no lleva espacios)
    titulo: 'Publicaciones',      // nombre que se ve en el menú
    icono: '📝',                 // icono del menú
    requisito: 'RF-03 · El sistema debe publicar el menú diario con su registro fotográfico.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'texto', req: true },
      { n: 'contenido', e: 'Contenido', t: 'parrafo', req: true },
      { n: 'autor', e: 'Autor', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'alimentos_2',                       // identificador interno (no lleva espacios)
    titulo: 'Panel en tiempo real con la',      // nombre que se ve en el menú
    icono: '🍽️',                 // icono del menú
    requisito: 'RF-04 · El sistema debe ofrecer un panel en tiempo real con la ocupación y el flujo del restaurante.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'producto', e: 'Producto o menú', t: 'texto', req: true },
      { n: 'cantidad', e: 'Cantidad', t: 'numero', req: true },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Solicitado', 'En preparación', 'Entregado'] }
    ]
  },
  {
    id: 'tareas',                       // identificador interno (no lleva espacios)
    titulo: 'Tareas y recordatorios',      // nombre que se ve en el menú
    icono: '⏰',                 // icono del menú
    requisito: 'RF-05 · El sistema debe gestionar los perfiles y los horarios de cada grupo.',
    campos: [
      { n: 'titulo', e: 'Tarea', t: 'texto', req: true },
      { n: 'materia', e: 'Materia', t: 'texto', req: true },
      { n: 'fecha', e: 'Fecha de entrega', t: 'fecha', req: true },
      { n: 'prioridad', e: 'Prioridad', t: 'lista', req: true, opciones: ['Alta', 'Media', 'Baja'] },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Pendiente', 'En curso', 'Cumplida'] },
      { n: 'nota', e: 'Nota', t: 'parrafo' }
    ]
  },
  {
    id: 'undefined_2',                       // identificador interno (no lleva espacios)
    titulo: 'Registrar y actualizar los datos de',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-06 · El sistema debe permitir registrar y actualizar los datos de los usuarios.',
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
    titulo: 'Espacio de comunicación oficial sobre el',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-07 · El sistema debe habilitar un espacio de comunicación oficial sobre el Programa de Alimentación Escolar.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  }
];
