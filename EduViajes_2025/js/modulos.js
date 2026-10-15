/* ==========================================================================
   modulos.js — los módulos de EduViajes
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
    requisito: 'RF-01 · El sistema debe registrar a los usuarios y diferenciar el rol de estudiante y de directivo.',
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
    requisito: 'RF-02 · El sistema debe publicar un portafolio con fotografías y descripciones de los lugares visitados.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'texto', req: true },
      { n: 'contenido', e: 'Contenido', t: 'parrafo', req: true },
      { n: 'autor', e: 'Autor', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'actividades',                       // identificador interno (no lleva espacios)
    titulo: 'Actividades y salidas',      // nombre que se ve en el menú
    icono: '🗓️',                 // icono del menú
    requisito: 'RF-03 · El sistema debe recomendar salidas pedagógicas según el área y el grado.',
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
    id: 'publicaciones_2',                       // identificador interno (no lleva espacios)
    titulo: 'Publicar reseñas y calificaciones de los',      // nombre que se ve en el menú
    icono: '📝',                 // icono del menú
    requisito: 'RF-04 · El sistema debe permitir publicar reseñas y calificaciones de los sitios visitados.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'texto', req: true },
      { n: 'contenido', e: 'Contenido', t: 'parrafo', req: true },
      { n: 'autor', e: 'Autor', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'undefined_2',                       // identificador interno (no lleva espacios)
    titulo: 'Información de interés sobre cada destino',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-05 · El sistema debe ofrecer información de interés sobre cada destino.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'actividades_2',                       // identificador interno (no lleva espacios)
    titulo: 'A los directivos programar y distribuir',      // nombre que se ve en el menú
    icono: '🗓️',                 // icono del menú
    requisito: 'RF-06 · El sistema debe permitir a los directivos programar y distribuir las salidas pedagógicas.',
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
    id: 'actividades_3',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe llevar el registro de',      // nombre que se ve en el menú
    icono: '🗓️',                 // icono del menú
    requisito: 'RF-07 · El sistema debe llevar el registro de los estudiantes inscritos en cada salida.',
    campos: [
      { n: 'nombre', e: 'Nombre de la actividad', t: 'texto', req: true },
      { n: 'lugar', e: 'Lugar', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'cupos', e: 'Cupos', t: 'numero' },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Programada', 'En curso', 'Finalizada'] }
    ]
  }
];
