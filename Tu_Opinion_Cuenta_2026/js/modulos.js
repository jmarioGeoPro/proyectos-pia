/* ==========================================================================
   modulos.js — los módulos de Tu Opinion Cuenta
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
    requisito: 'RF-01 · El sistema debe permitir publicar sugerencias, quejas y reclamos de forma segura y organizada.',
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
    id: 'normas',                       // identificador interno (no lleva espacios)
    titulo: 'Normas y convivencia',      // nombre que se ve en el menú
    icono: '⚖️',                 // icono del menú
    requisito: 'RF-02 · El sistema debe clasificar cada caso por categoría: infraestructura, convivencia, academia o servicios.',
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
    requisito: 'RF-03 · El sistema debe permitir comentar y dar seguimiento a cada caso publicado.',
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
    id: 'casos_2',                       // identificador interno (no lleva espacios)
    titulo: 'Estado de cada caso: recibido, en',      // nombre que se ve en el menú
    icono: '🔔',                 // icono del menú
    requisito: 'RF-04 · El sistema debe mostrar el estado de cada caso: recibido, en revisión o resuelto.',
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
    id: 'casos_3',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe canalizar los casos a',      // nombre que se ve en el menú
    icono: '🔔',                 // icono del menú
    requisito: 'RF-05 · El sistema debe canalizar los casos a los comités correspondientes de la institución.',
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
    id: 'casos_4',                       // identificador interno (no lleva espacios)
    titulo: 'Panel administrativo para la gestión de',      // nombre que se ve en el menú
    icono: '🔔',                 // icono del menú
    requisito: 'RF-06 · El sistema debe ofrecer un panel administrativo para la gestión de los casos.',
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
    id: 'undefined',                       // identificador interno (no lleva espacios)
    titulo: 'Registros',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-07 · El sistema debe cuidar la identidad de quien reporta cuando así lo solicite.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  }
];
