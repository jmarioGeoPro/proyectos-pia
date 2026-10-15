/* ==========================================================================
   modulos.js — los módulos de Imagen School
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
    requisito: 'RF-01 · El sistema debe permitir que cada estudiante cree su cuenta y su perfil personal, con acceso mediante usuario y contraseña.',
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
    requisito: 'RF-02 · El sistema debe garantizar que cada usuario vea únicamente su propia información: los datos personales no pueden ser públicos.',
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
    requisito: 'RF-03 · El sistema debe mostrar mensajes emergentes con consejos de imagen personal y enlazarlos a la publicación que los explica.',
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
    id: 'undefined_2',                       // identificador interno (no lleva espacios)
    titulo: 'Sección de «Tendencias» alimentada por un',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-04 · El sistema debe ofrecer una sección de «Tendencias» alimentada por un formulario anónimo.',
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
    requisito: 'RF-05 · El sistema debe permitir publicar y consultar contenido sobre aseo, uniforme, maquillaje, peinado y cuidado personal.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'texto', req: true },
      { n: 'contenido', e: 'Contenido', t: 'parrafo', req: true },
      { n: 'autor', e: 'Autor', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'undefined_3',                       // identificador interno (no lleva espacios)
    titulo: 'De forma anónima el género y',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-06 · El sistema debe recoger de forma anónima el género y la edad para generar estadísticas de interés por tema.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'publicaciones_2',                       // identificador interno (no lleva espacios)
    titulo: 'A los administradores moderar el contenido',      // nombre que se ve en el menú
    icono: '📝',                 // icono del menú
    requisito: 'RF-07 · El sistema debe permitir a los administradores moderar el contenido publicado por los estudiantes.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'texto', req: true },
      { n: 'contenido', e: 'Contenido', t: 'parrafo', req: true },
      { n: 'autor', e: 'Autor', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  }
];
