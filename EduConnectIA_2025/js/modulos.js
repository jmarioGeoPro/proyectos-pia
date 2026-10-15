/* ==========================================================================
   modulos.js — los módulos de EduConnect.IA
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
    requisito: 'RF-01 · El sistema debe permitir crear una cuenta y acceder a un espacio personal de estudio.',
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
    requisito: 'RF-02 · El sistema debe ofrecer un chat con inteligencia artificial que acompañe académicamente al estudiante.',
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
    requisito: 'RF-03 · El sistema debe permitir organizar los contenidos en carpetas y subir archivos de estudio.',
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
    titulo: 'Sistema debe adaptar las recomendaciones al',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-04 · El sistema debe adaptar las recomendaciones al ritmo y a las necesidades de cada estudiante.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'alimentos',                       // identificador interno (no lleva espacios)
    titulo: 'Alimentación y pedidos',      // nombre que se ve en el menú
    icono: '🍽️',                 // icono del menú
    requisito: 'RF-05 · El sistema debe ofrecer un menú de configuración para ajustar la experiencia de uso.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'producto', e: 'Producto o menú', t: 'texto', req: true },
      { n: 'cantidad', e: 'Cantidad', t: 'numero', req: true },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Solicitado', 'En preparación', 'Entregado'] }
    ]
  },
  {
    id: 'emociones',                       // identificador interno (no lleva espacios)
    titulo: 'Bienestar emocional',      // nombre que se ve en el menú
    icono: '💚',                 // icono del menú
    requisito: 'RF-06 · El sistema debe acompañar también el estado emocional del estudiante, no solo lo académico.',
    campos: [
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'emocion', e: '¿Cómo te sentiste?', t: 'lista', req: true, opciones: ['Muy bien', 'Bien', 'Neutral', 'Mal', 'Muy mal'] },
      { n: 'intensidad', e: 'Intensidad (1 a 5)', t: 'numero' },
      { n: 'nota', e: '¿Qué pasó?', t: 'parrafo' }
    ]
  },
  {
    id: 'casos',                       // identificador interno (no lleva espacios)
    titulo: 'Casos y seguimiento',      // nombre que se ve en el menú
    icono: '🔔',                 // icono del menú
    requisito: 'RF-07 · El sistema debe permitir al docente hacer seguimiento del avance de sus estudiantes.',
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
