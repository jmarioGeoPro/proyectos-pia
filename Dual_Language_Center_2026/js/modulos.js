/* ==========================================================================
   modulos.js — los módulos de Dual Language Center
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
    requisito: 'RF-01 · El sistema debe permitir el registro de usuarios y el seguimiento de su progreso.',
    campos: [
      { n: 'nombre', e: 'Nombre completo', t: 'texto', req: true },
      { n: 'documento', e: 'Documento', t: 'texto' },
      { n: 'correo', e: 'Correo electrónico', t: 'texto', req: true },
      { n: 'rol', e: 'Rol', t: 'lista', req: true, opciones: ['Estudiante', 'Docente', 'Directivo', 'Acudiente', 'Administrador'] },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Activo', 'Inactivo'] }
    ]
  },
  {
    id: 'catalogo',                       // identificador interno (no lleva espacios)
    titulo: 'Catálogo de contenidos',      // nombre que se ve en el menú
    icono: '🎬',                 // icono del menú
    requisito: 'RF-02 · El sistema debe ofrecer lecciones organizadas por niveles de dificultad.',
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
    requisito: 'RF-03 · El sistema debe incluir ejercicios de práctica con retroalimentación inmediata.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'undefined_2',                       // identificador interno (no lleva espacios)
    titulo: 'Práctica de audio para mejorar la',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-04 · El sistema debe ofrecer práctica de audio para mejorar la pronunciación.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'avance',                       // identificador interno (no lleva espacios)
    titulo: 'Progreso y logros',      // nombre que se ve en el menú
    icono: '🏆',                 // icono del menú
    requisito: 'RF-05 · El sistema debe incorporar elementos de gamificación para motivar el aprendizaje.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'reto', e: 'Reto o lección', t: 'texto', req: true },
      { n: 'puntaje', e: 'Puntaje', t: 'numero', req: true },
      { n: 'nivel', e: 'Nivel alcanzado', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'avance_2',                       // identificador interno (no lleva espacios)
    titulo: 'Avance del estudiante en cada idioma',      // nombre que se ve en el menú
    icono: '🏆',                 // icono del menú
    requisito: 'RF-06 · El sistema debe mostrar el avance del estudiante en cada idioma.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'reto', e: 'Reto o lección', t: 'texto', req: true },
      { n: 'puntaje', e: 'Puntaje', t: 'numero', req: true },
      { n: 'nivel', e: 'Nivel alcanzado', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'publicaciones',                       // identificador interno (no lleva espacios)
    titulo: 'Publicaciones',      // nombre que se ve en el menú
    icono: '📝',                 // icono del menú
    requisito: 'RF-07 · El sistema debe ofrecer contenidos de inglés y de otras lenguas.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'texto', req: true },
      { n: 'contenido', e: 'Contenido', t: 'parrafo', req: true },
      { n: 'autor', e: 'Autor', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  }
];
