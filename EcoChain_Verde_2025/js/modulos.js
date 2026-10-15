/* ==========================================================================
   modulos.js — los módulos de EcoChain Verde
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
    id: 'residuos',                       // identificador interno (no lleva espacios)
    titulo: 'Residuos y reciclaje',      // nombre que se ve en el menú
    icono: '♻️',                 // icono del menú
    requisito: 'RF-01 · El sistema debe registrar los residuos que produce la institución, por tipo y por cantidad.',
    campos: [
      { n: 'tipo', e: 'Tipo de residuo', t: 'lista', req: true, opciones: ['Papel', 'Plástico', 'Vidrio', 'Metal', 'Orgánico', 'Electrónico'] },
      { n: 'cantidad', e: 'Cantidad (kg)', t: 'numero', req: true },
      { n: 'punto', e: 'Punto ecológico', t: 'texto', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'residuos_2',                       // identificador interno (no lleva espacios)
    titulo: 'Indicadores de reciclaje y compararlos entre',      // nombre que se ve en el menú
    icono: '♻️',                 // icono del menú
    requisito: 'RF-02 · El sistema debe mostrar indicadores de reciclaje y compararlos entre periodos.',
    campos: [
      { n: 'tipo', e: 'Tipo de residuo', t: 'lista', req: true, opciones: ['Papel', 'Plástico', 'Vidrio', 'Metal', 'Orgánico', 'Electrónico'] },
      { n: 'cantidad', e: 'Cantidad (kg)', t: 'numero', req: true },
      { n: 'punto', e: 'Punto ecológico', t: 'texto', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'publicaciones',                       // identificador interno (no lleva espacios)
    titulo: 'Publicaciones',      // nombre que se ve en el menú
    icono: '📝',                 // icono del menú
    requisito: 'RF-03 · El sistema debe publicar guías y campañas de educación ambiental para la comunidad.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'categoria', e: 'Categoría', t: 'texto', req: true },
      { n: 'contenido', e: 'Contenido', t: 'parrafo', req: true },
      { n: 'autor', e: 'Autor', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'undefined',                       // identificador interno (no lleva espacios)
    titulo: 'Registros',      // nombre que se ve en el menú
    icono: '📋',                 // icono del menú
    requisito: 'RF-04 · El sistema debe reconocer a los estudiantes y grupos que más reciclan.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true },
      { n: 'estado', e: 'Estado', t: 'lista', req: true, opciones: ['Abierto', 'En proceso', 'Cerrado'] }
    ]
  },
  {
    id: 'catalogo',                       // identificador interno (no lleva espacios)
    titulo: 'Catálogo de contenidos',      // nombre que se ve en el menú
    icono: '🎬',                 // icono del menú
    requisito: 'RF-05 · El sistema debe estimar el beneficio económico del material reciclado y las rutas para aprovecharlo.',
    campos: [
      { n: 'titulo', e: 'Título', t: 'texto', req: true },
      { n: 'tema', e: 'Tema o género', t: 'texto', req: true },
      { n: 'descripcion', e: 'Descripción', t: 'parrafo' },
      { n: 'nivel', e: 'Nivel', t: 'lista', opciones: ['Básico', 'Intermedio', 'Avanzado'] },
      { n: 'enlace', e: 'Enlace', t: 'texto' }
    ]
  },
  {
    id: 'residuos_3',                       // identificador interno (no lleva espacios)
    titulo: 'Sistema debe integrar a la comunidad',      // nombre que se ve en el menú
    icono: '♻️',                 // icono del menú
    requisito: 'RF-06 · El sistema debe integrar a la comunidad en la separación de residuos mediante puntos ecológicos identificados.',
    campos: [
      { n: 'tipo', e: 'Tipo de residuo', t: 'lista', req: true, opciones: ['Papel', 'Plástico', 'Vidrio', 'Metal', 'Orgánico', 'Electrónico'] },
      { n: 'cantidad', e: 'Cantidad (kg)', t: 'numero', req: true },
      { n: 'punto', e: 'Punto ecológico', t: 'texto', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  },
  {
    id: 'residuos_4',                       // identificador interno (no lleva espacios)
    titulo: 'Reportes de sostenibilidad para la institución',      // nombre que se ve en el menú
    icono: '♻️',                 // icono del menú
    requisito: 'RF-07 · El sistema debe generar reportes de sostenibilidad para la institución.',
    campos: [
      { n: 'tipo', e: 'Tipo de residuo', t: 'lista', req: true, opciones: ['Papel', 'Plástico', 'Vidrio', 'Metal', 'Orgánico', 'Electrónico'] },
      { n: 'cantidad', e: 'Cantidad (kg)', t: 'numero', req: true },
      { n: 'punto', e: 'Punto ecológico', t: 'texto', req: true },
      { n: 'responsable', e: 'Responsable', t: 'texto' },
      { n: 'fecha', e: 'Fecha', t: 'fecha', req: true }
    ]
  }
];
