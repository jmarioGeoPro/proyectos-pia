/* ==========================================================================
   modulos.js — los módulos de Alfabetizadores Lola
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
    requisito: 'RF-01 · El sistema debe registrar la información del proceso de alfabetización de cada estudiante.',
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
    requisito: 'RF-02 · El sistema debe permitir a los docentes reportar el avance de cada estudiante mediante formularios.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'reto', e: 'Reto o lección', t: 'texto', req: true },
      { n: 'puntaje', e: 'Puntaje', t: 'numero', req: true },
      { n: 'nivel', e: 'Nivel alcanzado', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'undefined_2',                       // identificador interno (no lleva espacios)
    titulo: 'Búsqueda rápida de la información registrada',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-03 · El sistema debe ofrecer una búsqueda rápida de la información registrada.',
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
    titulo: 'Chat para la comunicación entre docentes',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-04 · El sistema debe habilitar un chat para la comunicación entre docentes y el organizador.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'avance_2',                       // identificador interno (no lleva espacios)
    titulo: 'Consolidado del avance del proceso por',      // nombre que se ve en el menú
    icono: '🏆',                 // icono del menú
    requisito: 'RF-05 · El sistema debe mostrar el consolidado del avance del proceso por grupo.',
    campos: [
      { n: 'estudiante', e: 'Estudiante', t: 'texto', req: true },
      { n: 'reto', e: 'Reto o lección', t: 'texto', req: true },
      { n: 'puntaje', e: 'Puntaje', t: 'numero', req: true },
      { n: 'nivel', e: 'Nivel alcanzado', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'undefined_4',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe ser fácil de usar',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-06 · El sistema debe ser fácil de usar y liviano, para poder consultarse desde cualquier dispositivo.',
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
    requisito: 'RF-07 · El sistema debe generar reportes de seguimiento para la institución.',
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
