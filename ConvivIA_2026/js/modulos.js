/* ==========================================================================
   modulos.js — los módulos de ConvivIA
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
    id: 'normas',                       // identificador interno (no lleva espacios)
    titulo: 'Normas y convivencia',      // nombre que se ve en el menú
    icono: '⚖️',                 // icono del menú
    requisito: 'RF-01 · El sistema debe permitir buscar una norma del manual de convivencia por palabra clave o por situación concreta.',
    campos: [
      { n: 'titulo', e: 'Título de la norma', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'lista', req: true, opciones: ['Convivencia', 'Disciplina', 'Académica', 'Institucional'] },
      { n: 'gravedad', e: 'Gravedad', t: 'lista', opciones: ['Leve', 'Grave', 'Gravísima'] },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'medida', e: 'Medida o procedimiento', t: 'parrafo' }
    ]
  },
  {
    id: 'normas_2',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe clasificar los conflictos por',      // nombre que se ve en el menú
    icono: '⚖️',                 // icono del menú
    requisito: 'RF-02 · El sistema debe clasificar los conflictos por categorías y por nivel de gravedad.',
    campos: [
      { n: 'titulo', e: 'Título de la norma', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'lista', req: true, opciones: ['Convivencia', 'Disciplina', 'Académica', 'Institucional'] },
      { n: 'gravedad', e: 'Gravedad', t: 'lista', opciones: ['Leve', 'Grave', 'Gravísima'] },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'medida', e: 'Medida o procedimiento', t: 'parrafo' }
    ]
  },
  {
    id: 'casos',                       // identificador interno (no lleva espacios)
    titulo: 'Casos y seguimiento',      // nombre que se ve en el menú
    icono: '🔔',                 // icono del menú
    requisito: 'RF-03 · El sistema debe mostrar ejemplos de casos ya resueltos, con la medida que se aplicó en cada uno.',
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
    id: 'normas_3',                       // identificador interno (no lleva espacios)
    titulo: 'Chat de orientación que responda con',      // nombre que se ve en el menú
    icono: '⚖️',                 // icono del menú
    requisito: 'RF-04 · El sistema debe ofrecer un chat de orientación que responda con base en el manual de convivencia de la institución.',
    campos: [
      { n: 'titulo', e: 'Título de la norma', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'lista', req: true, opciones: ['Convivencia', 'Disciplina', 'Académica', 'Institucional'] },
      { n: 'gravedad', e: 'Gravedad', t: 'lista', opciones: ['Leve', 'Grave', 'Gravísima'] },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'medida', e: 'Medida o procedimiento', t: 'parrafo' }
    ]
  },
  {
    id: 'normas_4',                       // identificador interno (no lleva espacios)
    titulo: 'Sección de preguntas frecuentes sobre',      // nombre que se ve en el menú
    icono: '⚖️',                 // icono del menú
    requisito: 'RF-05 · El sistema debe incluir una sección de preguntas frecuentes sobre convivencia escolar.',
    campos: [
      { n: 'titulo', e: 'Título de la norma', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'lista', req: true, opciones: ['Convivencia', 'Disciplina', 'Académica', 'Institucional'] },
      { n: 'gravedad', e: 'Gravedad', t: 'lista', opciones: ['Leve', 'Grave', 'Gravísima'] },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'medida', e: 'Medida o procedimiento', t: 'parrafo' }
    ]
  },
  {
    id: 'undefined',                       // identificador interno (no lleva espacios)
    titulo: 'Registros',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-06 · El sistema debe permitir a los directivos actualizar el manual y conservar el historial de versiones.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'normas_5',                       // identificador interno (no lleva espacios)
    titulo: 'Consultas para identificar las normas que',      // nombre que se ve en el menú
    icono: '⚖️',                 // icono del menú
    requisito: 'RF-07 · El sistema debe registrar las consultas para identificar las normas que generan más dudas.',
    campos: [
      { n: 'titulo', e: 'Título de la norma', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'lista', req: true, opciones: ['Convivencia', 'Disciplina', 'Académica', 'Institucional'] },
      { n: 'gravedad', e: 'Gravedad', t: 'lista', opciones: ['Leve', 'Grave', 'Gravísima'] },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'medida', e: 'Medida o procedimiento', t: 'parrafo' }
    ]
  }
];
