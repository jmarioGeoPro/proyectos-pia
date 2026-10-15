/* ==========================================================================
   modulos.js — los módulos de EduCompu
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
    id: 'mensajes',                       // identificador interno (no lleva espacios)
    titulo: 'Mensajes y solicitudes',      // nombre que se ve en el menú
    icono: '✉️',                 // icono del menú
    requisito: 'RF-01 · El sistema debe registrar las solicitudes de ayuda de los estudiantes con sus equipos de cómputo.',
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
    id: 'mensajes_2',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe llevar el seguimiento del',      // nombre que se ve en el menú
    icono: '✉️',                 // icono del menú
    requisito: 'RF-02 · El sistema debe llevar el seguimiento del estado de cada caso, desde la solicitud hasta la solución.',
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
    id: 'publicaciones',                       // identificador interno (no lleva espacios)
    titulo: 'Publicaciones',      // nombre que se ve en el menú
    icono: '📝',                 // icono del menú
    requisito: 'RF-03 · El sistema debe publicar tutoriales para resolver las fallas más frecuentes.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'texto', req: true },
      { n: 'contenido', e: 'Contenido', t: 'parrafo', req: true },
      { n: 'autor', e: 'Autor', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'inventario',                       // identificador interno (no lleva espacios)
    titulo: 'Inventario y préstamos',      // nombre que se ve en el menú
    icono: '📦',                 // icono del menú
    requisito: 'RF-04 · El sistema debe permitir agendar asesorías con el equipo de soporte.',
    campos: [
      { n: 'codigo', e: 'Código', t: 'texto', req: true },
      { n: 'elemento', e: 'Elemento', t: 'texto', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Disponible', 'Prestado', 'En mantenimiento', 'Dañado'] },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'actividades',                       // identificador interno (no lleva espacios)
    titulo: 'Actividades y salidas',      // nombre que se ve en el menú
    icono: '🗓️',                 // icono del menú
    requisito: 'RF-05 · El sistema debe gestionar los eventos de formación sobre manejo de dispositivos.',
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
    id: 'inventario_2',                       // identificador interno (no lleva espacios)
    titulo: 'Inventario y el estado de los',      // nombre que se ve en el menú
    icono: '📦',                 // icono del menú
    requisito: 'RF-06 · El sistema debe registrar el inventario y el estado de los equipos entregados por el Estado.',
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
    requisito: 'RF-07 · El sistema debe generar reportes de las fallas más comunes para prevenirlas.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  }
];
