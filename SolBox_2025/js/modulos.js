/* ==========================================================================
   modulos.js — los módulos de SolBox
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
    requisito: 'RF-01 · El sistema debe permitir enviar un mensaje a la institución de forma fácil y segura, sin necesidad de registrarse.',
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
    titulo: 'Sistema debe clasificar cada mensaje según',      // nombre que se ve en el menú
    icono: '✉️',                 // icono del menú
    requisito: 'RF-02 · El sistema debe clasificar cada mensaje según su estado: pendiente, en proceso o resuelto.',
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
    id: 'mensajes_3',                       // identificador interno (no lleva espacios)
    titulo: 'Enviar el mensaje de forma anónima',      // nombre que se ve en el menú
    icono: '✉️',                 // icono del menú
    requisito: 'RF-03 · El sistema debe permitir enviar el mensaje de forma anónima o identificada, a elección de quien escribe.',
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
    id: 'mensajes_4',                       // identificador interno (no lleva espacios)
    titulo: 'En la página principal cuántos mensajes',      // nombre que se ve en el menú
    icono: '✉️',                 // icono del menú
    requisito: 'RF-04 · El sistema debe mostrar en la página principal cuántos mensajes hay en cada estado y los últimos cinco recibidos.',
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
    id: 'mensajes_5',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe marcar visualmente los mensajes',      // nombre que se ve en el menú
    icono: '✉️',                 // icono del menú
    requisito: 'RF-05 · El sistema debe marcar visualmente los mensajes urgentes.',
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
    id: 'mensajes_6',                       // identificador interno (no lleva espacios)
    titulo: 'Asignar cada mensaje a un responsable',      // nombre que se ve en el menú
    icono: '✉️',                 // icono del menú
    requisito: 'RF-06 · El sistema debe permitir asignar cada mensaje a un responsable y hacerle seguimiento.',
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
    id: 'mensajes_7',                       // identificador interno (no lleva espacios)
    titulo: 'Reportes por tipo de solicitud y',      // nombre que se ve en el menú
    icono: '✉️',                 // icono del menú
    requisito: 'RF-07 · El sistema debe generar reportes por tipo de solicitud y por tiempo de respuesta.',
    campos: [
      { n: 'tipo', e: 'Tipo', t: 'lista', req: true, opciones: ['Sugerencia', 'Queja', 'Reclamo', 'Petición', 'Felicitación'] },
      { n: 'asunto', e: 'Asunto', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'anonimo', e: '¿Enviar de forma anónima?', t: 'lista', opciones: ['Sí', 'No'] },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Pendiente', 'En proceso', 'Resuelto'] },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  }
];
