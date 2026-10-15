/* ==========================================================================
   modulos.js — los módulos de Cine conCiencia
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
    id: 'catalogo',                       // identificador interno (no lleva espacios)
    titulo: 'Catálogo de contenidos',      // nombre que se ve en el menú
    icono: '🎬',                 // icono del menú
    requisito: 'RF-01 · El sistema debe ofrecer un catálogo de películas educativas organizado por género y por temática.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'tema', e: 'Tema o género', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo' },
      { n: 'nivel', e: 'Nivel', t: 'lista', opciones: ['Básico', 'Intermedio', 'Avanzado'] },
      { n: 'enlace', e: 'Enlace', t: 'texto' }
    ]
  },
  {
    id: 'catalogo_2',                       // identificador interno (no lleva espacios)
    titulo: 'Buscar una película por título, género',      // nombre que se ve en el menú
    icono: '🎬',                 // icono del menú
    requisito: 'RF-02 · El sistema debe permitir buscar una película por título, género o tema.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'tema', e: 'Tema o género', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo' },
      { n: 'nivel', e: 'Nivel', t: 'lista', opciones: ['Básico', 'Intermedio', 'Avanzado'] },
      { n: 'enlace', e: 'Enlace', t: 'texto' }
    ]
  },
  {
    id: 'catalogo_3',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe recomendar películas a partir',      // nombre que se ve en el menú
    icono: '🎬',                 // icono del menú
    requisito: 'RF-03 · El sistema debe recomendar películas a partir de lo que cada usuario ha visto.',
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
    requisito: 'RF-04 · El sistema debe guardar el historial de reproducción y la lista de favoritos de cada usuario.',
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
    requisito: 'RF-05 · El sistema debe ofrecer un registro especial para acceder a contenido exclusivo de suscriptores.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'texto', req: true },
      { n: 'contenido', e: 'Contenido', t: 'parrafo', req: true },
      { n: 'autor', e: 'Autor', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'catalogo_4',                       // identificador interno (no lleva espacios)
    titulo: 'Sinopsis de cada película y permitir',      // nombre que se ve en el menú
    icono: '🎬',                 // icono del menú
    requisito: 'RF-06 · El sistema debe mostrar la sinopsis de cada película y permitir calificarla y reseñarla.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'tema', e: 'Tema o género', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo' },
      { n: 'nivel', e: 'Nivel', t: 'lista', opciones: ['Básico', 'Intermedio', 'Avanzado'] },
      { n: 'enlace', e: 'Enlace', t: 'texto' }
    ]
  },
  {
    id: 'catalogo_5',                       // identificador interno (no lleva espacios)
    titulo: 'Canal de contacto para sugerir películas',      // nombre que se ve en el menú
    icono: '🎬',                 // icono del menú
    requisito: 'RF-07 · El sistema debe incluir un canal de contacto para sugerir películas o reportar problemas.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'tema', e: 'Tema o género', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo' },
      { n: 'nivel', e: 'Nivel', t: 'lista', opciones: ['Básico', 'Intermedio', 'Avanzado'] },
      { n: 'enlace', e: 'Enlace', t: 'texto' }
    ]
  }
];
