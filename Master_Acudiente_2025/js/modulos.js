/* ==========================================================================
   modulos.js — los módulos de Master Acudiente
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
    id: 'undefined',                       // identificador interno (no lleva espacios)
    titulo: 'Registros',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-01 · El sistema debe permitir que el acudiente consulte el estado de asistencia del estudiante en tiempo real.',
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
    requisito: 'RF-02 · El sistema debe enviar una alerta al acudiente cuando el estudiante no haya registrado su llegada a la jornada.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'motivo', e: 'Motivo', t: 'lista', req: true, opciones: ['Inasistencia', 'Bajo rendimiento', 'Convivencia', 'Situación familiar', 'Otro'] },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'accion', e: 'Acción implementada', t: 'parrafo' },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En seguimiento', 'Cerrado'] },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'undefined_2',                       // identificador interno (no lleva espacios)
    titulo: 'Al acudiente una vista general de',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-03 · El sistema debe mostrar al acudiente una vista general de las materias y del desempeño del estudiante.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'mensajes',                       // identificador interno (no lleva espacios)
    titulo: 'Mensajes y solicitudes',      // nombre que se ve en el menú
    icono: '✉️',                 // icono del menú
    requisito: 'RF-04 · El sistema debe registrar las llamadas y los mensajes enviados al acudiente, con su fecha y su motivo.',
    campos: [
      { n: 'tipo', e: 'Tipo', t: 'lista', req: true, opciones: ['Sugerencia', 'Queja', 'Reclamo', 'Petición', 'Felicitación'] },
      { n: 'asunto', e: 'Asunto', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'anonimo', e: '¿Enviar de forma anónima?', t: 'lista', opciones: ['Sí', 'No'] },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Pendiente', 'En proceso', 'Resuelto'] },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'undefined_3',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe manejar perfiles diferenciados',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-05 · El sistema debe manejar perfiles diferenciados para administrador, docente y acudiente.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'undefined_4',                       // identificador interno (no lleva espacios)
    titulo: 'Al docente registrar la asistencia de',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-06 · El sistema debe permitir al docente registrar la asistencia de su grupo de forma rápida.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'undefined_5',                       // identificador interno (no lleva espacios)
    titulo: 'Historial consultable de las novedades de',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-07 · El sistema debe generar un historial consultable de las novedades de cada estudiante.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  }
];
