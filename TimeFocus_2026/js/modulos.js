/* ==========================================================================
   modulos.js — los módulos de TimeFocus
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
    requisito: 'RF-01 · El sistema debe permitir crear un perfil con el horario de clases del estudiante.',
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
    id: 'actividades',                       // identificador interno (no lleva espacios)
    titulo: 'Actividades y salidas',      // nombre que se ve en el menú
    icono: '🗓️',                 // icono del menú
    requisito: 'RF-02 · El sistema debe enviar recordatorios de las tareas y de las actividades pendientes.',
    campos: [
      { n: 'nombre', e: 'Nombre de la actividad', t: 'texto', req: true },
      { n: 'lugar', e: 'Lugar', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'cupos', e: 'Cupos', t: 'numero' },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Programada', 'En curso', 'Finalizada'] }
    ]
  },
  {
    id: 'tareas_2',                       // identificador interno (no lleva espacios)
    titulo: 'Organizar las tareas por materia y',      // nombre que se ve en el menú
    icono: '⏰',                 // icono del menú
    requisito: 'RF-03 · El sistema debe permitir organizar las tareas por materia y por fecha de entrega.',
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
    id: 'tareas_3',                       // identificador interno (no lleva espacios)
    titulo: 'Búsqueda rápida entre las tareas registradas',      // nombre que se ve en el menú
    icono: '⏰',                 // icono del menú
    requisito: 'RF-04 · El sistema debe ofrecer una búsqueda rápida entre las tareas registradas.',
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
    id: 'tareas_4',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe ayudar al estudiante a',      // nombre que se ve en el menú
    icono: '⏰',                 // icono del menú
    requisito: 'RF-05 · El sistema debe ayudar al estudiante a encontrar los espacios libres de su horario para estudiar.',
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
    id: 'tareas_5',                       // identificador interno (no lleva espacios)
    titulo: 'Resumen de lo que está pendiente',      // nombre que se ve en el menú
    icono: '⏰',                 // icono del menú
    requisito: 'RF-06 · El sistema debe mostrar un resumen de lo que está pendiente y de lo ya cumplido.',
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
    id: 'tareas_6',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe medir el avance del',      // nombre que se ve en el menú
    icono: '⏰',                 // icono del menú
    requisito: 'RF-07 · El sistema debe medir el avance del estudiante en sus hábitos de estudio.',
    campos: [
      { n: 'titulo', e: 'Tarea', t: 'texto', req: true },
      { n: 'materia', e: 'Materia', t: 'texto', req: true },
      { n: 'fecha', e: 'Fecha de entrega', t: 'fecha', req: true },
      { n: 'prioridad', e: 'Prioridad', t: 'lista', req: true, opciones: ['Alta', 'Media', 'Baja'] },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Pendiente', 'En curso', 'Cumplida'] },
      { n: 'nota', e: 'Nota', t: 'parrafo' }
    ]
  }
];
