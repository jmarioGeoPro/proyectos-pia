/* ==========================================================================
   modulos.js — los módulos de TDL Easy
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
    id: 'tareas',                       // identificador interno (no lleva espacios)
    titulo: 'Tareas y recordatorios',      // nombre que se ve en el menú
    icono: '⏰',                 // icono del menú
    requisito: 'RF-01 · El sistema debe generar y entregar códigos QR a cada docente.',
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
    id: 'inventario',                       // identificador interno (no lleva espacios)
    titulo: 'Inventario y préstamos',      // nombre que se ve en el menú
    icono: '📦',                 // icono del menú
    requisito: 'RF-02 · El sistema debe permitir al estudiante escanear el código QR para registrar su asistencia.',
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
    requisito: 'RF-03 · El sistema debe manejar perfiles diferenciados para estudiantes y docentes.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'tareas_2',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe limitar el número de',      // nombre que se ve en el menú
    icono: '⏰',                 // icono del menú
    requisito: 'RF-04 · El sistema debe limitar el número de interacciones según el día y el horario de la clase.',
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
    titulo: 'Sistema debe validar que el registro',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-05 · El sistema debe validar que el registro se haga en el lugar y el momento correctos.',
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
    titulo: 'Al docente el consolidado de asistencia',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-06 · El sistema debe mostrar al docente el consolidado de asistencia de su clase.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'casos',                       // identificador interno (no lleva espacios)
    titulo: 'Casos y seguimiento',      // nombre que se ve en el menú
    icono: '🔔',                 // icono del menú
    requisito: 'RF-07 · El sistema debe generar reportes de inasistencia por estudiante y por asignatura.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'motivo', e: 'Motivo', t: 'lista', req: true, opciones: ['Inasistencia', 'Bajo rendimiento', 'Convivencia', 'Situación familiar', 'Otro'] },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'accion', e: 'Acción implementada', t: 'parrafo' },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En seguimiento', 'Cerrado'] },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  }
];
