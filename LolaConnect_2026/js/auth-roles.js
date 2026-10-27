/* ==========================================================================
   NÚCLEO COMÚN — viaja igual en los nueve proyectos del Lola
   --------------------------------------------------------------------------
   Aquí está todo lo que se repite: la bóveda de datos, las utilidades y los
   avisos en pantalla. Los demás archivos usan este núcleo y solo se encargan
   de su propia función.

   La bóveda guarda en localStorage (el almacén del navegador), así los datos
   no se pierden al cerrar la página y no hace falta un servidor.
   ========================================================================== */

'use strict';

/* El nombre con el que este proyecto guarda sus datos. */
var CLAVE_DATOS = "pia_lolaconnect";

/* Los datos de ejemplo. Se cargan solo la primera vez, cuando no hay nada.
   Son los mismos que están en la carpeta data/ del proyecto. */
var SEMILLA = {
  "usuarios": [
    {
      "id": 1,
      "codigo_institucional": "EST-1005-01",
      "nombre_completo": "Nicolás Arteaga Mazo",
      "username_publico": "nico.arteaga",
      "grado": "10°05",
      "rol": "estudiante",
      "avatar": "🦊",
      "documento_ti": "1.036.111.001",
      "telefono": "300 111 2233",
      "correo": "nicolas.arteaga@lola.edu.co",
      "clave": "1234",
      "debe_cambiar_clave": true,
      "activo": true,
      "intereses": [
        "Tecnología",
        "Robótica",
        "Deportes"
      ],
      "privacidad": {
        "mostrar_grado": true,
        "permitir_mensajes": true,
        "perfil_publico": true
      }
    },
    {
      "id": 2,
      "codigo_institucional": "EST-1005-02",
      "nombre_completo": "Juan Fernando Gómez Hernández",
      "username_publico": "juan.gomez",
      "grado": "10°05",
      "rol": "estudiante",
      "avatar": "🐼",
      "documento_ti": "1.020.222.002",
      "telefono": "300 222 3344",
      "correo": "juan.gomezhe@lola.edu.co",
      "clave": "1234",
      "debe_cambiar_clave": true,
      "activo": true,
      "intereses": [
        "Tecnología",
        "Lectura",
        "Música"
      ],
      "privacidad": {
        "mostrar_grado": true,
        "permitir_mensajes": true,
        "perfil_publico": true
      }
    },
    {
      "id": 3,
      "codigo_institucional": "EST-1005-03",
      "nombre_completo": "Luis Yair Vallenilla Tovar",
      "username_publico": "yair.vallenilla",
      "grado": "10°05",
      "rol": "estudiante",
      "avatar": "🐙",
      "documento_ti": "1.112.333.003",
      "telefono": "300 333 4455",
      "correo": "luis.vallenilla@lola.edu.co",
      "clave": "1234",
      "debe_cambiar_clave": true,
      "activo": true,
      "intereses": [
        "Arte",
        "Música",
        "Teatro"
      ],
      "privacidad": {
        "mostrar_grado": true,
        "permitir_mensajes": true,
        "perfil_publico": true
      }
    },
    {
      "id": 4,
      "codigo_institucional": "EST-1005-04",
      "nombre_completo": "Susana Zapata Tobón",
      "username_publico": "susana.zapata",
      "grado": "10°05",
      "rol": "moderador",
      "avatar": "🦉",
      "documento_ti": "1.020.444.004",
      "telefono": "300 444 5566",
      "correo": "susana.zapata@lola.edu.co",
      "clave": "1234",
      "debe_cambiar_clave": true,
      "activo": true,
      "intereses": [
        "Lectura",
        "Medio ambiente",
        "Arte"
      ],
      "privacidad": {
        "mostrar_grado": true,
        "permitir_mensajes": true,
        "perfil_publico": true
      }
    },
    {
      "id": 5,
      "codigo_institucional": "DOC-001",
      "nombre_completo": "Jorge Mario Patiño Marín",
      "username_publico": "prof.patino",
      "grado": "Docente",
      "rol": "docente",
      "avatar": "🐝",
      "documento_ti": "71.555.005",
      "telefono": "310 555 6677",
      "correo": "jorge.patino@lola.edu.co",
      "clave": "Lola2026*",
      "debe_cambiar_clave": false,
      "activo": true,
      "intereses": [
        "Tecnología",
        "Lectura"
      ],
      "privacidad": {
        "mostrar_grado": true,
        "permitir_mensajes": true,
        "perfil_publico": true
      }
    },
    {
      "id": 6,
      "codigo_institucional": "DOC-002",
      "nombre_completo": "Alejo Villa A",
      "username_publico": "prof.villa",
      "grado": "Docente",
      "rol": "docente",
      "avatar": "🐢",
      "documento_ti": "71.555.006",
      "telefono": "310 666 7788",
      "correo": "alejo.villa@lola.edu.co",
      "clave": "Lola2026*",
      "debe_cambiar_clave": false,
      "activo": true,
      "intereses": [
        "Deportes",
        "Medio ambiente"
      ],
      "privacidad": {
        "mostrar_grado": true,
        "permitir_mensajes": true,
        "perfil_publico": true
      }
    },
    {
      "id": 7,
      "codigo_institucional": "ADM-001",
      "nombre_completo": "Coordinación Académica Lola González",
      "username_publico": "coordinacion",
      "grado": "Coordinación",
      "rol": "admin",
      "avatar": "🦄",
      "documento_ti": "43.555.007",
      "telefono": "320 777 8899",
      "correo": "coordinacion@lola.edu.co",
      "clave": "Lola2026*",
      "debe_cambiar_clave": false,
      "activo": true,
      "intereses": [
        "Lectura",
        "Arte"
      ],
      "privacidad": {
        "mostrar_grado": true,
        "permitir_mensajes": true,
        "perfil_publico": true
      }
    }
  ],
  "publicaciones": [
    {
      "id": 1,
      "codigo": "LC-2026-0001",
      "autor_id": 5,
      "autor_publico": "prof.patino",
      "avatar": "🐝",
      "rol_autor": "docente",
      "categoria": "Institucional",
      "titulo": "Cambio de horario para el jueves 14 de mayo",
      "contenido": "El jueves 14 de mayo la jornada termina a las 11:30 a.m. por la reunión de docentes del PIA. Las clases de la tarde se cancelan y se recuperan el viernes con el horario del miércoles. Por favor avisen en casa y revisen el cronograma publicado en la cartelera.",
      "es_aviso": true,
      "prioridad": "Urgente",
      "estado": "Activo",
      "fecha": "2026-05-11T06:40:00"
    },
    {
      "id": 2,
      "codigo": "LC-2026-0002",
      "autor_id": 7,
      "autor_publico": "coordinacion",
      "avatar": "🦄",
      "rol_autor": "admin",
      "categoria": "Institucional",
      "titulo": "Entrega de boletines del primer periodo",
      "contenido": "La entrega de boletines del primer periodo será el viernes 22 de mayo de 7:00 a 10:00 a.m. Debe asistir el acudiente con el documento de identidad. Los estudiantes que no puedan asistir deben solicitar la cita por coordinación antes del 20 de mayo.",
      "es_aviso": true,
      "prioridad": "General",
      "estado": "Activo",
      "fecha": "2026-05-11T07:05:00"
    },
    {
      "id": 3,
      "codigo": "LC-2026-0003",
      "autor_id": 1,
      "autor_publico": "nico.arteaga",
      "avatar": "🦊",
      "rol_autor": "estudiante",
      "categoria": "Academico",
      "titulo": "Grupo de estudio para el taller de algoritmos",
      "contenido": "Estamos armando un grupo para resolver el taller de algoritmos del profe Patiño. Nos reunimos el martes y el jueves en la biblioteca durante el descanso. La idea es resolver los ejercicios en parejas y compartir las dudas antes de la entrega. Si quieren unirse, respondan este hilo.",
      "es_aviso": false,
      "prioridad": "General",
      "estado": "Activo",
      "fecha": "2026-05-11T15:20:00"
    },
    {
      "id": 4,
      "codigo": "LC-2026-0004",
      "autor_id": 3,
      "autor_publico": "yair.vallenilla",
      "avatar": "🐙",
      "rol_autor": "estudiante",
      "categoria": "Deporte",
      "titulo": "Torneo relámpago de fútbol en el descanso",
      "contenido": "Propongo un torneo relámpago de fútbol para los descansos de la próxima semana. Serían equipos de cinco, partidos de diez minutos y arbitraje de los mismos estudiantes. Necesitamos que alguien del área de deportes nos preste los petos y los balones.",
      "es_aviso": false,
      "prioridad": "General",
      "estado": "Activo",
      "fecha": "2026-05-12T09:10:00"
    },
    {
      "id": 5,
      "codigo": "LC-2026-0005",
      "autor_id": 6,
      "autor_publico": "prof.villa",
      "avatar": "🐢",
      "rol_autor": "docente",
      "categoria": "Institucional",
      "titulo": "Feria de la Ciencia: inscripciones abiertas",
      "contenido": "La Feria de la Ciencia será el viernes 5 de junio en el coliseo. Cada grupo de décimo puede inscribir hasta dos proyectos. La inscripción se hace con el director de grupo y cierra el 25 de mayo. Los mejores tres proyectos representan al colegio en el encuentro de la Pascual Bravo.",
      "es_aviso": true,
      "prioridad": "Evento",
      "estado": "Activo",
      "fecha": "2026-05-12T10:00:00"
    },
    {
      "id": 6,
      "codigo": "LC-2026-0006",
      "autor_id": 4,
      "autor_publico": "susana.zapata",
      "avatar": "🦉",
      "rol_autor": "moderador",
      "categoria": "Bienestar",
      "titulo": "Campaña de convivencia: palabras que construyen",
      "contenido": "Esta semana lanzamos la campaña de convivencia en el feed. La idea es dejar un mensaje de reconocimiento a alguien del colegio y evitar las burlas en los comentarios. El Comité de Convivencia revisará los reportes y publicará un resumen el viernes.",
      "es_aviso": false,
      "prioridad": "General",
      "estado": "Activo",
      "fecha": "2026-05-12T11:30:00"
    },
    {
      "id": 7,
      "codigo": "LC-2026-0007",
      "autor_id": 2,
      "autor_publico": "juan.gomez",
      "avatar": "🐼",
      "rol_autor": "estudiante",
      "categoria": "Cultura",
      "titulo": "Banda sonora para la izada de bandera",
      "contenido": "El grupo de música está buscando canciones para la izada de bandera del próximo lunes. Queremos incluir algo de rock colombiano y una pieza instrumental. Si tienen recomendaciones, déjenlas en los comentarios con el nombre del artista y el motivo.",
      "es_aviso": false,
      "prioridad": "General",
      "estado": "Activo",
      "fecha": "2026-05-13T08:15:00"
    },
    {
      "id": 8,
      "codigo": "LC-2026-0008",
      "autor_id": 2,
      "autor_publico": "juan.gomez",
      "avatar": "🐼",
      "rol_autor": "estudiante",
      "categoria": "Academico",
      "titulo": "Los del otro grupo son unos lentos",
      "contenido": "Otra vez los del 10°02 quedaron de últimos en la prueba y todos sabemos por qué. Son unos lentos y no deberían estar en el mismo nivel que nosotros. Que se dediquen a otra cosa.",
      "es_aviso": false,
      "prioridad": "General",
      "estado": "OCULTO_MODERACION",
      "fecha": "2026-05-13T09:40:00",
      "motivo_moderacion": "Acoso o burla"
    },
    {
      "id": 9,
      "codigo": "LC-2026-0009",
      "autor_id": 1,
      "autor_publico": "nico.arteaga",
      "avatar": "🦊",
      "rol_autor": "estudiante",
      "categoria": "Academico",
      "titulo": "Recursos de repaso para la evaluación de redes",
      "contenido": "Comparto tres recursos que nos sirvieron para la evaluación de redes: el resumen de protocolos, el video de subredes y la lista de ejercicios resueltos. Los dejo en la carpeta del grupo de estudio. Si alguien tiene otro material, lo sumamos.",
      "es_aviso": false,
      "prioridad": "General",
      "estado": "Activo",
      "fecha": "2026-05-14T16:10:00"
    }
  ],
  "comentarios": [
    {
      "id": 1,
      "id_publicacion": 3,
      "autor_id": 2,
      "autor_publico": "juan.gomez",
      "avatar": "🐼",
      "contenido": "Cuenten conmigo el martes. Llevo los ejercicios del primer bloque resueltos.",
      "fecha": "2026-05-11T16:00:00",
      "estado": "Activo"
    },
    {
      "id": 2,
      "id_publicacion": 3,
      "autor_id": 3,
      "autor_publico": "yair.vallenilla",
      "avatar": "🐙",
      "contenido": "Yo puedo el jueves y llevo el computador para probar el código.",
      "fecha": "2026-05-11T16:25:00",
      "estado": "Activo"
    },
    {
      "id": 3,
      "id_publicacion": 4,
      "autor_id": 1,
      "autor_publico": "nico.arteaga",
      "avatar": "🦊",
      "contenido": "Me apunto con el equipo de décimo, pero necesitamos los petos.",
      "fecha": "2026-05-12T09:35:00",
      "estado": "Activo"
    },
    {
      "id": 4,
      "id_publicacion": 6,
      "autor_id": 1,
      "autor_publico": "nico.arteaga",
      "avatar": "🦊",
      "contenido": "Reconozco al profe Villa por acompañarnos en la feria el año pasado.",
      "fecha": "2026-05-12T12:10:00",
      "estado": "Activo"
    },
    {
      "id": 5,
      "id_publicacion": 7,
      "autor_id": 4,
      "autor_publico": "susana.zapata",
      "avatar": "🦉",
      "contenido": "Sugiero una canción de Bomba Estéreo y una pieza de guitarra clásica.",
      "fecha": "2026-05-13T09:00:00",
      "estado": "Activo"
    },
    {
      "id": 6,
      "id_publicacion": 9,
      "autor_id": 2,
      "autor_publico": "juan.gomez",
      "avatar": "🐼",
      "contenido": "Gracias, el resumen de protocolos me sirvió para el quiz.",
      "fecha": "2026-05-14T17:00:00",
      "estado": "Activo"
    }
  ],
  "grupos": [
    {
      "id": 1,
      "nombre": "Club de Robótica Lola",
      "categoria": "Academico",
      "descripcion": "Construimos prototipos con Arduino y preparamos el proyecto para la Feria de la Ciencia.",
      "horario": "Martes 2:00 p.m.",
      "lugar": "Aula de tecnología 301",
      "lider": "juan.gomez",
      "integrantes": [
        1,
        2,
        3
      ]
    },
    {
      "id": 2,
      "nombre": "Semillero de Fútbol",
      "categoria": "Deporte",
      "descripcion": "Entrenamientos y torneos internos para los grados noveno, décimo y once.",
      "horario": "Miércoles 3:00 p.m.",
      "lugar": "Cancha principal",
      "lider": "yair.vallenilla",
      "integrantes": [
        1,
        3
      ]
    },
    {
      "id": 3,
      "nombre": "Colectivo Ambiental Verde",
      "categoria": "Bienestar",
      "descripcion": "Jornadas de siembra, reciclaje y cuidado de las zonas verdes del colegio.",
      "horario": "Viernes 1:00 p.m.",
      "lugar": "Zonas verdes",
      "lider": "susana.zapata",
      "integrantes": [
        2,
        4
      ]
    },
    {
      "id": 4,
      "nombre": "Grupo de Teatro",
      "categoria": "Cultura",
      "descripcion": "Montaje de obras cortas para las izadas de bandera y el festival cultural.",
      "horario": "Jueves 2:30 p.m.",
      "lugar": "Aula múltiple",
      "lider": "susana.zapata",
      "integrantes": [
        3,
        4
      ]
    },
    {
      "id": 5,
      "nombre": "Club de Lectura",
      "categoria": "Academico",
      "descripcion": "Leemos un libro al mes y conversamos sobre lo que nos dejó cada historia.",
      "horario": "Lunes 1:00 p.m.",
      "lugar": "Biblioteca",
      "lider": "prof.patino",
      "integrantes": [
        2,
        4,
        5
      ]
    },
    {
      "id": 6,
      "nombre": "Consejo Estudiantil Digital",
      "categoria": "Bienestar",
      "descripcion": "Canal de propuestas de los estudiantes y enlace con la coordinación del colegio.",
      "horario": "Viernes 11:00 a.m.",
      "lugar": "Aula 204",
      "lider": "nico.arteaga",
      "integrantes": [
        1,
        2,
        3,
        4
      ]
    }
  ],
  "eventos": [
    {
      "id": 1,
      "titulo": "Feria de la Ciencia 2026",
      "fecha": "2026-06-05",
      "hora": "08:00",
      "lugar": "Coliseo",
      "organiza": "prof.villa",
      "descripcion": "Exposición de los proyectos PIA de grado décimo.",
      "asistentes": [
        1,
        2,
        3,
        5,
        6
      ]
    },
    {
      "id": 2,
      "titulo": "Encuentro deportivo intercursos",
      "fecha": "2026-06-10",
      "hora": "09:00",
      "lugar": "Cancha principal",
      "organiza": "prof.villa",
      "descripcion": "Torneo de fútbol y baloncesto entre los grados 9, 10 y 11.",
      "asistentes": [
        1,
        3
      ]
    },
    {
      "id": 3,
      "titulo": "Festival cultural lolista",
      "fecha": "2026-06-18",
      "hora": "14:00",
      "lugar": "Aula múltiple",
      "organiza": "susana.zapata",
      "descripcion": "Música, teatro y danza preparados por los grupos de interés.",
      "asistentes": [
        2,
        3,
        4
      ]
    },
    {
      "id": 4,
      "titulo": "Jornada de convivencia digital",
      "fecha": "2026-06-24",
      "hora": "10:00",
      "lugar": "Biblioteca",
      "organiza": "prof.patino",
      "descripcion": "Taller sobre datos personales y ciberacoso con el Consejo Estudiantil Digital.",
      "asistentes": [
        1,
        2,
        4
      ]
    },
    {
      "id": 5,
      "titulo": "Feria universitaria Pascual Bravo",
      "fecha": "2026-07-02",
      "hora": "08:30",
      "lugar": "Coliseo",
      "organiza": "coordinacion",
      "descripcion": "Oferta de programas técnicos y profesionales para grado once.",
      "asistentes": [
        3
      ]
    }
  ],
  "reportes": [
    {
      "id": 1,
      "id_publicacion": 8,
      "codigo_pub": "LC-2026-0008",
      "motivo": "Acoso o burla",
      "detalle": "Se burla de todo un grupo y los llama lentos en público.",
      "reportado_por": "susana.zapata",
      "rol_reporta": "moderador",
      "fecha": "2026-05-13T10:05:00",
      "estado": "PENDIENTE",
      "moderador": "",
      "resolucion": ""
    },
    {
      "id": 2,
      "id_publicacion": 4,
      "codigo_pub": "LC-2026-0004",
      "motivo": "Spam o publicidad",
      "detalle": "Repite el mismo mensaje en tres hilos distintos.",
      "reportado_por": "juan.gomez",
      "rol_reporta": "estudiante",
      "fecha": "2026-05-12T10:20:00",
      "estado": "ARCHIVADO",
      "moderador": "prof.patino",
      "resolucion": "Se revisó el hilo y no es spam: es una propuesta deportiva válida."
    },
    {
      "id": 3,
      "id_publicacion": 7,
      "codigo_pub": "LC-2026-0007",
      "motivo": "Datos personales",
      "detalle": "Un comentario incluía un número de celular.",
      "reportado_por": "nico.arteaga",
      "rol_reporta": "estudiante",
      "fecha": "2026-05-13T09:20:00",
      "estado": "RESUELTO_OCULTO",
      "moderador": "susana.zapata",
      "resolucion": "Se ocultó el comentario y se recordó la norma de no publicar celulares."
    },
    {
      "id": 4,
      "id_publicacion": 9,
      "codigo_pub": "LC-2026-0009",
      "motivo": "Lenguaje ofensivo",
      "detalle": "Un comentario respondió con una burla.",
      "reportado_por": "yair.vallenilla",
      "rol_reporta": "estudiante",
      "fecha": "2026-05-14T17:30:00",
      "estado": "EN_REVISION",
      "moderador": "prof.villa",
      "resolucion": "Pendiente de escuchar a las dos partes antes de decidir."
    },
    {
      "id": 5,
      "id_publicacion": 3,
      "codigo_pub": "LC-2026-0003",
      "motivo": "Datos personales",
      "detalle": "Alguien compartió un correo personal en el hilo de estudio.",
      "reportado_por": "susana.zapata",
      "rol_reporta": "moderador",
      "fecha": "2026-05-11T17:10:00",
      "estado": "PENDIENTE",
      "moderador": "",
      "resolucion": ""
    }
  ],
  "bitacora": [
    {
      "id": 1,
      "fecha": "2026-05-11T06:40:00",
      "accion": "Publicación",
      "detalle": "Aviso oficial LC-2026-0001: Cambio de horario para el jueves 14 de mayo",
      "moderador": "prof.patino",
      "rol": "docente"
    },
    {
      "id": 2,
      "fecha": "2026-05-13T09:20:00",
      "accion": "Reporte",
      "detalle": "Se reportó LC-2026-0007 por Datos personales.",
      "moderador": "nico.arteaga",
      "rol": "estudiante"
    },
    {
      "id": 3,
      "fecha": "2026-05-13T09:35:00",
      "accion": "Ocultamiento",
      "detalle": "Se ocultó la publicación LC-2026-0008 (Los del otro grupo son unos lentos).",
      "moderador": "susana.zapata",
      "rol": "moderador"
    },
    {
      "id": 4,
      "fecha": "2026-05-13T09:36:00",
      "accion": "Moderación",
      "detalle": "Caso de Acoso o burla en LC-2026-0008: se ocultó y se citó a las partes.",
      "moderador": "susana.zapata",
      "rol": "moderador"
    },
    {
      "id": 5,
      "fecha": "2026-05-14T10:15:00",
      "accion": "Ingreso",
      "detalle": "Entró con el rol de Docente.",
      "moderador": "prof.villa",
      "rol": "docente"
    },
    {
      "id": 6,
      "fecha": "2026-05-14T16:10:00",
      "accion": "Publicación",
      "detalle": "Hilo LC-2026-0009: Recursos de repaso para la evaluación de redes",
      "moderador": "nico.arteaga",
      "rol": "estudiante"
    }
  ]
};

var PIA = (function () {

  /* ---------------- 1. LA BÓVEDA DE DATOS ---------------- */

  /*
   * Algunos navegadores no dejan usar localStorage (por ejemplo dentro de un
   * marco sin origen propio). En ese caso se guarda en memoria: la aplicación
   * funciona igual, solo que los datos no sobreviven al cerrar la página.
   */
  var MEMORIA = null;

  function almacenDisponible() {
    try { localStorage.setItem('__pia_prueba__', '1'); localStorage.removeItem('__pia_prueba__'); return true; }
    catch (e) { return false; }
  }
  var HAY_ALMACEN = almacenDisponible();

  /** Lee todo lo guardado. Si algo está dañado, empieza de cero. */
  function leerTodo() {
    if (!HAY_ALMACEN) return MEMORIA ? JSON.parse(JSON.stringify(MEMORIA)) : {};
    try {
      var crudo = localStorage.getItem(CLAVE_DATOS);
      return crudo ? JSON.parse(crudo) : {};
    } catch (e) {
      return {};
    }
  }

  /** Guarda todo. */
  function guardarTodo(todo) {
    if (!HAY_ALMACEN) { MEMORIA = JSON.parse(JSON.stringify(todo)); return; }
    try { localStorage.setItem(CLAVE_DATOS, JSON.stringify(todo)); }
    catch (e) { MEMORIA = JSON.parse(JSON.stringify(todo)); HAY_ALMACEN = false; }
  }

  /** Carga la semilla si el proyecto todavía no tiene datos. */
  function sembrar() {
    var todo = leerTodo();
    if (Object.keys(todo).length > 0) return;
    guardarTodo(JSON.parse(JSON.stringify(SEMILLA)));
  }

  /** Devuelve todas las filas de una tabla. */
  function listar(tabla) {
    var todo = leerTodo();
    return (todo[tabla] || []).slice();
  }

  /** Reemplaza todas las filas de una tabla. */
  function guardar(tabla, filas) {
    var todo = leerTodo();
    todo[tabla] = filas;
    guardarTodo(todo);
  }

  /** Inserta una fila y le pone un id que no se repite. */
  function insertar(tabla, fila) {
    var filas = listar(tabla);
    var id = filas.reduce(function (m, f) { return Math.max(m, Number(f.id) || 0); }, 0) + 1;
    var nueva = Object.assign({}, fila, { id: id, creado: new Date().toISOString() });
    filas.push(nueva);
    guardar(tabla, filas);
    return nueva;
  }

  /** Actualiza una fila que ya existe. */
  function actualizar(tabla, id, cambios) {
    var filas = listar(tabla);
    for (var i = 0; i < filas.length; i++) {
      if (Number(filas[i].id) === Number(id)) {
        filas[i] = Object.assign({}, filas[i], cambios, { id: Number(id) });
        guardar(tabla, filas);
        return filas[i];
      }
    }
    return null;
  }

  /** Elimina una fila. */
  function eliminar(tabla, id) {
    guardar(tabla, listar(tabla).filter(function (f) { return Number(f.id) !== Number(id); }));
  }

  /** Cuenta las filas de una tabla. */
  function contar(tabla) { return listar(tabla).length; }

  /** Borra todo y vuelve a la semilla. */
  function reiniciar() {
    MEMORIA = null;
    try { localStorage.removeItem(CLAVE_DATOS); } catch (e) {}
    sembrar();
  }

  /* ---------------- 2. UTILIDADES ---------------- */

  /** Evita que un texto se interprete como código (protege de inyecciones). */
  function esc(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /** Quita tildes y mayúsculas, para comparar textos escritos a mano. */
  function normalizar(t) {
    return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /** Fecha de hoy en formato aaaa-mm-dd (el que entienden los campos de fecha). */
  function hoy() { return new Date().toISOString().slice(0, 10); }

  /** Da formato a una fecha para mostrarla. */
  function fecha(v) {
    if (!v) return '—';
    var d = new Date(String(v).length === 10 ? v + 'T00:00:00' : v);
    if (isNaN(d.getTime())) return String(v);
    return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  /** Fecha y hora para mostrarla. */
  function fechaHora(v) {
    if (!v) return '—';
    var d = new Date(v);
    if (isNaN(d.getTime())) return String(v);
    return d.toLocaleDateString('es-CO') + ' ' + d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  }

  /** Suma días hábiles (salta sábados y domingos). Se usa para los plazos. */
  function sumarDiasHabiles(fechaBase, dias) {
    var d = new Date(String(fechaBase).length === 10 ? fechaBase + 'T00:00:00' : fechaBase);
    var sumados = 0;
    while (sumados < dias) {
      d.setDate(d.getDate() + 1);
      var dia = d.getDay();
      if (dia !== 0 && dia !== 6) sumados++;
    }
    return d.toISOString().slice(0, 10);
  }

  /** Cuenta las palabras de un texto. */
  function palabras(t) { return String(t || '').trim().split(/\s+/).filter(Boolean).length; }

  /** Da formato de pesos colombianos. */
  function moneda(n) { return '$' + Number(n || 0).toLocaleString('es-CO'); }

  /** Deja un número con los decimales indicados. */
  function num(n, dec) { return Number(n || 0).toFixed(dec == null ? 1 : dec); }

  /** Genera un código único con prefijo y consecutivo de 4 dígitos. */
  function codigo(prefijo, tabla, campo) {
    var filas = listar(tabla);
    var mayor = 0;
    filas.forEach(function (f) {
      var m = String(f[campo] || '').match(/(\d+)$/);
      if (m) mayor = Math.max(mayor, Number(m[1]));
    });
    return prefijo + String(mayor + 1).padStart(4, '0');
  }

  /** Devuelve el parámetro de la dirección (?codigo=TOC-2026-0001). */
  function parametro(nombre) { return new URLSearchParams(window.location.search).get(nombre) || ''; }

  /* ---------------- 3. AVISOS EN PANTALLA ---------------- */

  /** Muestra un aviso flotante que desaparece solo. */
  function toast(mensaje, tipo) {
    var viejo = document.getElementById('piaToast');
    if (viejo) viejo.remove();
    var caja = document.createElement('div');
    caja.id = 'piaToast';
    caja.className = 'toast' + (tipo === 'mal' ? ' mal' : tipo === 'warn' ? ' warn' : '');
    caja.textContent = mensaje;
    document.body.appendChild(caja);
    setTimeout(function () { caja.remove(); }, 4200);
  }

  /** Pinta una tabla a partir de los encabezados y las filas. */
  function tabla(encabezados, filas, opciones) {
    var o = opciones || {};
    if (!filas.length) return '<div class="vacio">' + esc(o.vacio || 'Todavía no hay registros.') + '</div>';
    var h = '<div class="tabla-envoltura"><table><thead><tr>';
    h += encabezados.map(function (e) { return '<th>' + e + '</th>'; }).join('');
    h += '</tr></thead><tbody>';
    filas.forEach(function (f) {
      h += '<tr>' + f.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
    });
    return h + '</tbody></table></div>';
  }

  /** Abre una ventana con un contenido y unos botones. */
  function modal(titulo, cuerpoHtml, botones) {
    cerrarModal();
    var fondo = document.createElement('div');
    fondo.className = 'modal-fondo';
    fondo.id = 'piaModal';
    fondo.innerHTML = '<div class="modal"><div class="cabeza"><h3>' + esc(titulo) +
      '</h3><button class="cerrar" onclick="PIA.cerrarModal()" title="Cerrar">✕</button></div>' +
      '<div class="cuerpo">' + cuerpoHtml + '</div>' +
      '<div class="pie2">' + (botones || '<button class="btn" onclick="PIA.cerrarModal()">Cerrar</button>') + '</div></div>';
    document.body.appendChild(fondo);
    fondo.addEventListener('click', function (ev) { if (ev.target === fondo) cerrarModal(); });
    return fondo;
  }

  /** Cierra la ventana abierta. */
  function cerrarModal() { var m = document.getElementById('piaModal'); if (m) m.remove(); }

  /** Devuelve el valor de un campo del formulario. */
  function valor(id) { var el = document.getElementById(id); return el ? String(el.value || '').trim() : ''; }

  /** Pone un valor en un campo del formulario. */
  function poner(id, v) { var el = document.getElementById(id); if (el) el.value = v == null ? '' : v; }

  /** Marca la página actual en el menú. */
  function marcarMenu() {
    var actual = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu a, .menu-tabs a').forEach(function (a) {
      var destino = (a.getAttribute('href') || '').split('?')[0].split('#')[0];
      if (destino === actual) a.classList.add('activo');
    });
  }

  /* ---------------- 4. ARRANQUE ---------------- */

  /* Los datos quedan listos de inmediato, no cuando el navegador avise:
     así cualquier otro archivo puede leerlos desde su primera línea. */
  sembrar();

  document.addEventListener('DOMContentLoaded', function () {
    sembrar();
    marcarMenu();
  });

  return {
    clave: CLAVE_DATOS, semilla: SEMILLA,
    leerTodo: leerTodo, guardarTodo: guardarTodo, sembrar: sembrar, reiniciar: reiniciar,
    listar: listar, guardar: guardar, insertar: insertar, actualizar: actualizar, eliminar: eliminar, contar: contar,
    esc: esc, normalizar: normalizar, hoy: hoy, fecha: fecha, fechaHora: fechaHora,
    sumarDiasHabiles: sumarDiasHabiles, palabras: palabras, moneda: moneda, num: num, codigo: codigo,
    parametro: parametro, toast: toast, tabla: tabla, modal: modal, cerrarModal: cerrarModal,
    valor: valor, poner: poner, marcarMenu: marcarMenu
  };
})();


/* la ficha oficial, tal como está en el documento PIA */
PIA.ficha = {
  "codigo": "PIA-2026-10-LG-LolaConnect",
  "palabrasClave": [
    "avisos verificados",
    "comunidad escolar",
    "moderación",
    "convivencia",
    "grupos y eventos"
  ],
  "objetivo": "Desarrollar la aplicación web institucional LolaConnect para centralizar la difusión de avisos oficiales verificados y facilitar la interacción segura entre los miembros de la comunidad educativa de la I.E. Lola González, mediante HTML5, CSS3 y JavaScript ES6+ con proyección a PHP y MySQL.",
  "especificos": [
    "Especificar las reglas de publicación, verificación de avisos y moderación.",
    "Diseñar el feed, los grupos, los eventos y el perfil del usuario.",
    "Construir el muro con avisos verificados, hilos y reacciones.",
    "Programar el validador preventivo de convivencia y la moderación.",
    "Probar con el Consejo Estudiantil Digital y documentar la sustentación."
  ],
  "normativa": "Ley 1620 de 2013 · Ley 1581 de 2012 · OWASP"
};
PIA.equipo = [
  {
    "nombre": "Nicolás Arteaga Mazo",
    "rol": "Líder de producto y FrontEnd · arquitectura de las vistas y visión de producto"
  },
  {
    "nombre": "Juan Fernando Gómez Hernández",
    "rol": "Arquitecto JavaScript y base de datos · hilos, avisos y moderación"
  },
  {
    "nombre": "Luis Yair Vallenilla Tovar",
    "rol": "Líder UI/UX · diseño mobile-first e identidad visual"
  },
  {
    "nombre": "Susana Zapata Tobón",
    "rol": "Calidad y convivencia · marco teórico, ética digital y pruebas del filtro"
  }
];
PIA.construccion = {
  "algoritmo": [
    "ALGORITMO Publicar_Hilo_Y_Moderar_Convivencia_LolaConnect ENTRADAS: id_usuario, rol_usuario ('estudiante'|'docente'|'moderador'), categoria_hilo, titulo_hilo, contenido_mensaje, es_aviso_oficial (Lógico) CONSTANTES: PATRONES_RIESGO = [\"amenaza\", \"burla\", \"acoso\", \"insulto\", \"pelea\"] REGEX_DATOS_PRIVADOS = /(\u0000\\d{10}\u0000)|(\u0000TI\\s*\\d{8,11}\u0000)/ // Detecta celulares o T.I. en el texto PROCESO:",
    "  1. SI RegexCoincide(contenido_mensaje, REGEX_DATOS_PRIVADOS) ENTONCES",
    "       RETORNAR AdvertenciaSeguridad(\"Por tu protección, no publiques números de celular ni documentos de identidad en hilos públicos.\")",
    "  2. nivel_alerta <- AnalizarLenguajePreventivo(contenido_mensaje, PATRONES_RIESGO)",
    "  3. SI nivel_alerta == \"ALTO\" ENTONCES",
    "       RETORNAR PausaReflexiva(\"Detectamos expresiones que podrían afectar la convivencia lolista. Por favor reformula tu idea con respeto antes de publicar.\")",
    "  4. SI es_aviso_oficial == VERDADERO Y rol_usuario != 'docente' Y rol_usuario != 'admin'",
    "ENTONCES",
    "       RETORNAR Error(\"Solo docentes y directivos autorizados pueden publicar Avisos Oficiales Verificados.\")",
    "  5. id_publicacion <- GenerarIdUnico(\"LC-2026-\")"
  ],
  "tablas": [
    {
      "nombre": "usuarios",
      "campos": "id_usuario (PK), codigo_institucional (UNIQUE), nombre_completo, username_publico, grado_grupo, rol ('estudiante','docente','moderador','admin'), avatar_id, password_hash."
    },
    {
      "nombre": "avisos_oficiales",
      "campos": "id_aviso (PK), id_autor_docente (FK), titulo, contenido, prioridad"
    },
    {
      "nombre": "hilos_comunidad",
      "campos": "id_hilo (PK), id_autor (FK), categoria 4. comentarios_hilo & reportes_convivencia: Trazabilidad con autor, motivo, moderador y resolución 6. Cronograma de Ejecución, Gestión de Riesgos y Referencias APA Indicador de Éxito (KPI) Indicador de Éxito (KPI) expresiones hostiles, botón de reporte en 1 clic pesadas, activos optimizados y El proyecto completa las 4 etapas del año 2026: Fase 1 (Abril–Mayo): Lista de Deseos, Ficha"
    }
  ]
};

/* ==========================================================================
   EXTRAS COMUNES — LolaConnect
   --------------------------------------------------------------------------
   Aquí van las funciones que hacen que la aplicación se sienta viva y que
   no son propias de un solo proyecto: roles, exportar, imprimir, ordenar,
   buscar, confirmaciones elegantes, deshacer, atajos y celebraciones.
   ========================================================================== */

/* ---------------- 1. ROLES ---------------- */

PIA.ROLES = ['Administrador', 'Docente', 'Estudiante'];

/** El rol con el que se está usando la aplicación. */
PIA.rol = (function () {
  try { return localStorage.getItem(CLAVE_DATOS + '_rol') || 'Administrador'; }
  catch (e) { return 'Administrador'; }
})();

/** Cambia el rol y vuelve a pintar la página. */
PIA.cambiarRol = function (rol) {
  PIA.rol = rol;
  try { localStorage.setItem(CLAVE_DATOS + '_rol', rol); } catch (e) {}
  PIA.toast('Ahora estás como ' + rol + '. Las acciones disponibles cambiaron.');
  document.querySelectorAll('[data-solo-admin]').forEach(function (el) {
    el.classList.toggle('oculto', rol !== 'Administrador');
  });
  document.querySelectorAll('[data-roles]').forEach(function (el) {
    el.classList.toggle('oculto', el.getAttribute('data-roles').indexOf(rol) === -1);
  });
  if (typeof pintarTodo === 'function') pintarTodo();
};

/** Devuelve true si el rol actual puede hacer la acción. */
PIA.puede = function (accion) {
  if (PIA.rol === 'Administrador') return true;
  if (PIA.rol === 'Docente') return ['crear', 'editar', 'exportar', 'imprimir'].indexOf(accion) !== -1;
  return ['crear', 'exportar'].indexOf(accion) !== -1;
};

/* ---------------- 2. EXPORTAR E IMPRIMIR ---------------- */

/** Descarga una tabla en CSV (se abre en Excel). */
PIA.csv = function (tabla, columnas) {
  var filas = PIA.listar(tabla);
  if (!filas.length) { PIA.toast('No hay datos para exportar.', 'warn'); return; }
  var cols = columnas || Object.keys(filas[0]).filter(function (k) { return k !== 'creado'; });
  var lineas = [cols.join(';')];
  filas.forEach(function (f) {
    lineas.push(cols.map(function (c) {
      var v = f[c];
      if (Array.isArray(v)) v = v.join(' | ');
      return String(v == null ? '' : v).replace(/;/g, ',').replace(/[\r\n]+/g, ' ');
    }).join(';'));
  });
  var contenido = '\ufeff' + lineas.join('\r\n');
  var enlace = document.createElement('a');
  enlace.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(contenido);
  enlace.download = 'LolaConnect-' + tabla + '-' + PIA.hoy() + '.csv';
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  PIA.toast('Archivo exportado: ' + enlace.download);
};

/** Imprime la página tal como se ve. */
PIA.imprimir = function () { window.print(); };

/** Copia un texto al portapapeles. */
PIA.copiar = function (texto) {
  var t = String(texto || '');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(t).then(function () { PIA.toast('Copiado: ' + t); }, function () { PIA.toast(t); });
  } else { PIA.toast(t); }
};

/* ---------------- 3. CONFIRMACIÓN ELEGANTE ---------------- */

/** Pide confirmación con una ventana bonita en vez del confirm() del navegador. */
PIA.confirmar = function (titulo, texto, alAceptar, opciones) {
  var o = opciones || {};
  var botones = '<button class="btn" onclick="PIA.cerrarModal()">Cancelar</button>' +
    '<button class="btn ' + (o.peligro ? 'pel' : 'p') + '" id="piaConfirmarSi">' + (o.textoBoton || 'Sí, continuar') + '</button>';
  PIA.modal(titulo, '<p style="font-size:14px">' + PIA.esc(texto) + '</p>', botones);
  document.getElementById('piaConfirmarSi').onclick = function () {
    PIA.cerrarModal();
    if (typeof alAceptar === 'function') alAceptar();
  };
};

/* ---------------- 4. DESHACER ---------------- */

var ULTIMO_BORRADO = null;

/** Elimina un registro guardando una copia para poder deshacer. */
PIA.borrarConDeshacer = function (tabla, id, alTerminar) {
  var fila = PIA.listar(tabla).filter(function (f) { return Number(f.id) === Number(id); })[0];
  if (!fila) return;
  PIA.confirmar('¿Eliminar este registro?', 'Se puede deshacer durante unos segundos.', function () {
    ULTIMO_BORRADO = { tabla: tabla, fila: fila };
    PIA.eliminar(tabla, id);
    PIA.toast('Registro eliminado. Pulsa Deshacer para recuperarlo.', 'warn');
    mostrarDeshacer();
    if (typeof alTerminar === 'function') alTerminar();
  }, { peligro: true, textoBoton: 'Sí, eliminar' });
};

var CAJA_DESHACER = null;

/** Muestra el botón flotante de deshacer. */
function mostrarDeshacer() {
  if (CAJA_DESHACER) CAJA_DESHACER.remove();
  CAJA_DESHACER = document.createElement('div');
  CAJA_DESHACER.className = 'toast warn';
  CAJA_DESHACER.style.bottom = '80px';
  CAJA_DESHACER.innerHTML = 'Registro eliminado <button class="btn pq" style="margin-left:10px" id="piaDeshacer">Deshacer</button>';
  document.body.appendChild(CAJA_DESHACER);
  document.getElementById('piaDeshacer').onclick = function () {
    if (!ULTIMO_BORRADO) return;
    PIA.insertar(ULTIMO_BORRADO.tabla, ULTIMO_BORRADO.fila);
    CAJA_DESHACER.remove(); CAJA_DESHACER = null; ULTIMO_BORRADO = null;
    PIA.toast('Registro recuperado.');
    if (typeof pintarTodo === 'function') pintarTodo();
  };
  setTimeout(function () { if (CAJA_DESHACER) { CAJA_DESHACER.remove(); CAJA_DESHACER = null; ULTIMO_BORRADO = null; } }, 9000);
}

/* ---------------- 5. BÚSQUEDA Y ORDEN EN TABLAS ---------------- */

var ORDEN_ACTUAL = {};

/** Filtra las filas de una tabla por un texto, en cualquier columna. */
PIA.filtrar = function (filas, texto) {
  var t = PIA.normalizar(texto);
  if (!t) return filas;
  return filas.filter(function (f) { return PIA.normalizar(JSON.stringify(f)).indexOf(t) !== -1; });
};

/** Ordena las filas por una columna (alterna ascendente y descendente). */
PIA.ordenar = function (filas, columna) {
  var clave = ORDEN_ACTUAL.clave === columna && ORDEN_ACTUAL.dir === 'asc' ? 'desc' : 'asc';
  ORDEN_ACTUAL = { clave: columna, dir: clave };
  return filas.slice().sort(function (a, b) {
    var x = a[columna], y = b[columna];
    var num = !isNaN(Number(x)) && !isNaN(Number(y)) && x !== '' && y !== '';
    var r = num ? Number(x) - Number(y) : PIA.normalizar(x).localeCompare(PIA.normalizar(y));
    return clave === 'asc' ? r : -r;
  });
};

/* ---------------- 6. CONTADORES ANIMADOS ---------------- */

/** Anima un número desde 0 hasta su valor final. */
PIA.contar = function (idElemento, hasta, sufijo) {
  var el = document.getElementById(idElemento);
  if (!el) return;
  var meta = Number(hasta) || 0;
  var inicio = 0;
  var paso = Math.max(1, Math.ceil(meta / 26));
  var timer = setInterval(function () {
    inicio += paso;
    if (inicio >= meta) { inicio = meta; clearInterval(timer); }
    el.textContent = inicio + (sufijo || '');
  }, 22);
};

/* ---------------- 7. CELEBRACIÓN ---------------- */

/** Lanza una lluvia de colores al completar algo importante. */
PIA.brindis = function () {
  var colores = ['#f97316', '#22c55e', '#0284c7', '#a78bfa', '#f59e0b', '#ef4444'];
  for (var i = 0; i < 34; i++) {
    var p = document.createElement('div');
    p.style.cssText = 'position:fixed;z-index:2000;pointer-events:none;width:9px;height:9px;border-radius:2px;' +
      'left:' + (Math.random() * 100) + 'vw;top:-14px;background:' + colores[i % colores.length] + ';' +
      'transition:transform 1.5s cubic-bezier(.2,.7,.4,1), opacity 1.5s;';
    document.body.appendChild(p);
    (function (el) {
      requestAnimationFrame(function () {
        el.style.transform = 'translateY(' + (window.innerHeight + 40) + 'px) rotate(' + (Math.random() * 720) + 'deg)';
        el.style.opacity = '0';
      });
      setTimeout(function () { el.remove(); }, 1700);
    })(p);
  }
};

/* ---------------- 8. ATAJOS DE TECLADO ---------------- */

document.addEventListener('keydown', function (ev) {
  /* Escape cierra la ventana abierta */
  if (ev.key === 'Escape') PIA.cerrarModal();
  /* Ctrl+F enfoca la búsqueda de la página */
  if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'f') {
    var caja = document.querySelector('input[type=search], #buscador, #buscar');
    if (caja) { ev.preventDefault(); caja.focus(); caja.select(); }
  }
  /* Ctrl+P imprime */
  if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'p') { /* deja el navegador */ }
});

/* ---------------- 9. BARRA DE ACCIONES PARA TABLAS ---------------- */

/**
 * Pinta la barra de herramientas de una tabla: buscar, exportar e imprimir.
 * Se usa igual en los nueve proyectos.
 * @param {string} tabla      nombre de la tabla de datos
 * @param {string} idBuscador id del campo de búsqueda
 * @param {string} texto      texto de ayuda
 */
PIA.barraTabla = function (tabla, idBuscador, texto) {
  return '<div class="fila" style="margin-bottom:12px">' +
    '<input type="search" id="' + idBuscador + '" placeholder="' + (texto || 'Buscar en los registros…') + '" style="flex:1;min-width:180px;padding:9px 13px;border-radius:var(--radio-campo);border:var(--borde-campo);background:var(--campo-fondo);color:var(--tinta)">' +
    '<button class="btn pq" onclick="PIA.csv(\'' + tabla + '\')">⬇ Exportar</button>' +
    '<button class="btn pq" onclick="PIA.imprimir()">🖨 Imprimir</button>' +
  '</div>';
};

/* ---------------- 10. EJEMPLOS DE DEMOSTRACIÓN ---------------- */

/**
 * Carga cinco registros de ejemplo escritos para este proyecto.
 * Sirve para mostrar el CRUD sin tener que escribir todo a mano.
 */
PIA.cargarEjemplos = function (tabla, ejemplos, alTerminar) {
  var actuales = PIA.listar(tabla);
  var nuevos = 0;
  ejemplos.forEach(function (e) {
    /* se evita duplicar si ya existe uno con el mismo título o nombre */
    var clave = e.titulo || e.nombre || e.codigo || '';
    var repetido = actuales.some(function (a) { return (a.titulo || a.nombre || a.codigo || '') === clave; });
    if (!repetido) { PIA.insertar(tabla, e); nuevos++; }
  });
  PIA.toast(nuevos ? 'Se agregaron ' + nuevos + ' ejemplos.' : 'Los ejemplos ya estaban cargados.', nuevos ? 'ok' : 'warn');
  if (nuevos) PIA.brindis();
  if (typeof alTerminar === 'function') alTerminar();
};

/* ---------------- 11. AYUDA ---------------- */

/** Explica en dos palabras cómo se usa la aplicación. */
PIA.ayuda = function () {
  var cuerpo = '<div class="aviso"><b>Esta es la aplicación de LolaConnect.</b> Todo lo que hagas se guarda en tu navegador.</div>' +
    '<h3 style="margin:14px 0 6px">Roles</h3>' +
    '<p style="font-size:13.5px">Arriba a la derecha puedes cambiar entre <b>Administrador</b>, <b>Docente</b> y <b>Estudiante</b>. ' +
    'Cada uno ve acciones distintas: el administrador puede todo, el docente crea y edita, el estudiante solo crea y consulta.</p>' +
    '<h3 style="margin:14px 0 6px">Atajos</h3>' +
    '<p style="font-size:13.5px"><b>Ctrl + F</b> busca en la página · <b>Escape</b> cierra esta ventana · <b>Ctrl + P</b> imprime.</p>' +
    '<h3 style="margin:14px 0 6px">Si algo se borra</h3>' +
    '<p style="font-size:13.5px">Al eliminar aparece un botón <b>Deshacer</b> durante unos segundos.</p>';
  PIA.modal('Cómo se usa', cuerpo);
};

/* ---------------- 12. CINCO EJEMPLOS DESDE LA PÁGINA ---------------- */

/* Palabras que se cambian para que los ejemplos no queden idénticos. */
var VARIANTES = ['Nuevo', 'Actualizado', 'Urgente', 'Revisado', 'Pendiente'];

/**
 * Crea cinco registros de ejemplo a partir de los que ya existen.
 * Toma la tabla con más datos, copia un registro y le cambia algunos valores
 * para que se vea como si alguien los hubiera escrito desde la página.
 */
PIA.crearEjemplos = function () {
  var todo = PIA.leerTodo();
  var tablas = Object.keys(todo).filter(function (t) { return Array.isArray(todo[t]) && todo[t].length; });
  if (!tablas.length) { PIA.toast('No hay datos base para crear ejemplos.', 'mal'); return; }
  /* la tabla con más registros suele ser la principal */
  tablas.sort(function (a, b) { return todo[b].length - todo[a].length; });
  var tabla = tablas[0];
  var base = todo[tabla];
  var creados = 0;

  for (var i = 0; i < 5; i++) {
    var modelo = base[i % base.length];
    var copia = JSON.parse(JSON.stringify(modelo));
    delete copia.id;
    delete copia.creado;
    var marca = VARIANTES[i % VARIANTES.length] + ' ' + (i + 1);
    Object.keys(copia).forEach(function (k) {
      var v = copia[k];
      if (typeof v !== 'string' || !v) return;
      var kl = k.toLowerCase();
      /* se cambian los textos visibles; los códigos y correos se dejan válidos */
      if (kl.indexOf('codigo') !== -1 || kl.indexOf('radicado') !== -1 || kl.indexOf('carnet') !== -1) {
        copia[k] = v.replace(/\d+$/, function (m) { return String(Number(m) + 100 + i); });
      } else if (kl.indexOf('correo') !== -1 || kl.indexOf('email') !== -1) {
        copia[k] = v.replace('@', '.' + (i + 1) + '@');
      } else if (kl.indexOf('fecha') !== -1) {
        var d = new Date(); d.setDate(d.getDate() + i + 1);
        copia[k] = d.toISOString().slice(0, 10);
      } else if (kl.indexOf('titulo') !== -1 || kl.indexOf('nombre') !== -1 || kl.indexOf('asunto') !== -1 || kl.indexOf('descripcion') !== -1 || kl.indexOf('mensaje') !== -1) {
        copia[k] = v + ' · ' + marca;
      }
    });
    PIA.insertar(tabla, copia);
    creados++;
  }

  PIA.brindis();
  PIA.toast('Se crearon ' + creados + ' ejemplos en la tabla "' + tabla + '".');
  setTimeout(function () { window.location.reload(); }, 900);
};

/** El botón flotante para crear los cinco ejemplos. */
function pintarBotonEjemplos() {
  if (document.getElementById('piaEjemplos')) return;
  var b = document.createElement('button');
  b.id = 'piaEjemplos';
  b.className = 'btn a';
  b.style.cssText = 'position:fixed;left:18px;bottom:18px;z-index:800;box-shadow:0 6px 20px rgba(0,0,0,.25)';
  b.innerHTML = '＋ Crear 5 ejemplos';
  b.title = 'Agrega cinco registros de muestra para probar el CRUD';
  b.onclick = function () {
    PIA.confirmar('¿Crear cinco ejemplos?',
      'Se agregarán cinco registros nuevos a la tabla principal, como si los hubieras escrito tú. Después puedes editarlos o eliminarlos.',
      function () { PIA.crearEjemplos(); });
  };
  document.body.appendChild(b);
}

/* ---------------- 12b. LA FICHA OFICIAL DEL PROYECTO ---------------- */

/** Muestra la ficha que está en el documento PIA: código, objetivos y palabras clave. */
PIA.mostrarFicha = function () {
  var f = PIA.ficha || {};
  var equipo = PIA.equipo || [];
  var partes = [];

  if (f.codigo) {
    partes.push('<div class="aviso" style="font-size:12.5px;letter-spacing:.04em"><b>Código del hilo:</b> ' + PIA.esc(f.codigo) + '</div>');
  }
  if (f.objetivo) {
    partes.push('<h3 style="margin:16px 0 6px">Objetivo general</h3>');
    partes.push('<p style="font-size:14px;line-height:1.7">' + PIA.esc(f.objetivo) + '</p>');
  }
  if (f.especificos && f.especificos.length) {
    partes.push('<h3 style="margin:16px 0 6px">Objetivos específicos</h3>');
    partes.push('<ol style="margin-left:18px;font-size:13.5px;line-height:1.8">' +
      f.especificos.map(function (o) { return '<li>' + PIA.esc(o) + '</li>'; }).join('') + '</ol>');
  }
  if (f.palabrasClave && f.palabrasClave.length) {
    partes.push('<h3 style="margin:16px 0 8px">Palabras clave</h3>');
    partes.push('<div class="fila" style="gap:6px;flex-wrap:wrap">' +
      f.palabrasClave.map(function (p) { return '<span class="badge neutro">' + PIA.esc(p) + '</span>'; }).join('') + '</div>');
  }
  if (equipo.length) {
    partes.push('<h3 style="margin:16px 0 8px">Equipo</h3>');
    partes.push('<ul style="margin-left:18px;font-size:13px;line-height:1.8">' +
      equipo.map(function (i) { return '<li><b>' + PIA.esc(i.nombre) + '</b> — ' + PIA.esc(i.rol) + '</li>'; }).join('') + '</ul>');
  }
  if (f.normativa) {
    partes.push('<h3 style="margin:16px 0 6px">Marco normativo</h3>');
    partes.push('<p style="font-size:13px">' + PIA.esc(f.normativa) + '</p>');
  }
  partes.push('<p class="pequeno gris" style="margin-top:16px">Proyecto Integrador de Aula (PIA) 2026 · I.E. Lola González · Grado 10° · Grupo 10°05<br>' +
    'Técnico Auxiliar en Desarrollo de Software — I.U. Pascual Bravo<br>' +
    'Docente articulador: <b>Jorge Mario Patiño Marín</b> · Docente par: <b>Alejo Villa A</b></p>');

  PIA.modal('Ficha del proyecto', partes.join(''));
};

/** Pone el botón de la ficha en el pie de página. */
function pintarBotonFicha() {
  var pie = document.querySelector('.pie');
  if (!pie || !PIA.ficha || document.getElementById('piaFichaBtn')) return;
  var b = document.createElement('button');
  b.id = 'piaFichaBtn';
  b.className = 'btn pq';
  b.type = 'button';
  b.textContent = 'Ficha del proyecto';
  b.style.marginTop = '10px';
  b.onclick = PIA.mostrarFicha;
  pie.appendChild(b);
}

/* ---------------- 12c. CÓMO SE CONSTRUYÓ ---------------- */

/** Pinta el pseudocódigo y el modelo de tablas que vienen del documento PIA. */
function pintarConstruccion() {
  var cont = document.getElementById('construccion');
  if (!cont) return;
  var c = PIA.construccion || {};
  var alg = c.algoritmo || [];
  var tab = c.tablas || [];
  var partes = [];

  partes.push('<div class="aviso"><b>De dónde sale esto:</b> el pseudocódigo y el modelo de tablas están en el documento del proyecto (PIA 2026). Aquí se muestran tal cual para que se entienda cómo está construida la aplicación.</div>');

  if (alg.length) {
    partes.push('<h2 style="margin:22px 0 10px">El algoritmo</h2>');
    partes.push('<p class="ayuda">El paso a paso que resuelve el problema central del proyecto.</p>');
    partes.push('<pre class="codigo">' + PIA.esc(alg.join(String.fromCharCode(10))) + '</pre>');
  }

  if (tab.length) {
    partes.push('<h2 style="margin:26px 0 10px">El modelo de datos</h2>');
    partes.push('<p class="ayuda">Las tablas con sus campos, tal como se proyectan para grado 11°.</p>');
    partes.push('<div style="overflow-x:auto"><table class="tabla"><thead><tr><th>Tabla</th><th>Campos</th></tr></thead><tbody>' +
      tab.map(function (t) {
        return '<tr><td><b>' + PIA.esc(t.nombre) + '</b></td><td>' + PIA.esc(t.campos) + '</td></tr>';
      }).join('') + '</tbody></table></div>');
  }

  if (!alg.length && !tab.length) {
    partes.push('<p class="vacio">El documento de este proyecto no incluye pseudocódigo ni modelo de tablas.</p>');
  }

  partes.push('<p style="margin-top:22px"><button class="btn p" type="button" onclick="PIA.mostrarFicha()">Ver la ficha del proyecto</button></p>');
  cont.innerHTML = partes.join('');
}

/** Pone el enlace a «Cómo se construyó» en el pie. */
function pintarEnlaceConstruccion() {
  var pie = document.querySelector('.pie');
  if (!pie || document.getElementById('piaConstruccion')) return;
  var a = document.createElement('a');
  a.id = 'piaConstruccion';
  a.href = 'construccion.html';
  a.className = 'btn pq';
  a.textContent = 'Cómo se construyó';
  a.style.marginTop = '10px';
  a.style.marginLeft = '8px';
  pie.appendChild(a);
}

/* ---------------- 13. ARRANQUE ---------------- */

document.addEventListener('DOMContentLoaded', function () {
  /* el selector de rol, si está en la página */
  var selector = document.getElementById('piaRol');
  if (selector) {
    selector.value = PIA.rol;
    selector.onchange = function () { PIA.cambiarRol(selector.value); };
  }
  document.querySelectorAll('[data-solo-admin]').forEach(function (el) {
    el.classList.toggle('oculto', PIA.rol !== 'Administrador');
  });
  /* los contadores de los indicadores se animan solos */
  document.querySelectorAll('.indicador strong[data-contar]').forEach(function (el) {
    var valor = el.getAttribute('data-contar');
    var sufijo = el.getAttribute('data-sufijo') || '';
    PIA.contar(el.id, valor, sufijo);
  });
  /* las tarjetas entran con una animación suave */
  /* las tarjetas entran con una animación suave */
  document.querySelectorAll('.tarjeta, .indicador, .producto, .obra').forEach(function (el, i) {
    el.style.animation = 'aparece .34s ease-out both';
    el.style.animationDelay = Math.min(i * 0.04, 0.5) + 's';
  });
  /* el botón para crear los cinco ejemplos */
  pintarBotonEjemplos();
  /* el botón de la ficha oficial */
  pintarBotonFicha();
  /* el enlace y la página de la construcción */
  pintarEnlaceConstruccion();
  pintarConstruccion();
});


/* ==========================================================================
   auth-roles.js
   --------------------------------------------------------------------------
   Aquí viven los usuarios, la sesión, los roles y la matriz de permisos.
   El acceso es con el código institucional; el perfil público nunca muestra
   documento ni teléfono (Ley 1581 de 2012 y minimización de datos).
   ========================================================================== */

'use strict';

/* La sesión se guarda aparte de las tablas para no ensuciar los datos. */
var CLAVE_SESION_LC = 'lolaconnect_sesion';

/* Los cuatro roles de la plataforma. */
var ROLES = { estudiante: 'Estudiante', docente: 'Docente', moderador: 'Moderador', admin: 'Administrador' };

/* Matriz de permisos: la misma que muestra la portada. */
var PERMISOS = {
  estudiante: { publicar_hilo: true, comentar: true, reportar: true, publicar_aviso: false, moderar: false, ver_bitacora: false, crear_grupo: true, crear_evento: false },
  docente: { publicar_hilo: true, comentar: true, reportar: true, publicar_aviso: true, moderar: true, ver_bitacora: true, crear_grupo: true, crear_evento: true },
  moderador: { publicar_hilo: true, comentar: true, reportar: true, publicar_aviso: false, moderar: true, ver_bitacora: true, crear_grupo: true, crear_evento: true },
  admin: { publicar_hilo: true, comentar: true, reportar: true, publicar_aviso: true, moderar: true, ver_bitacora: true, crear_grupo: true, crear_evento: true }
};

/* Las acciones que se explican en la matriz de la portada. */
var ACCIONES = [
  { clave: 'publicar_hilo', nombre: 'Publicar hilos' },
  { clave: 'comentar', nombre: 'Comentar' },
  { clave: 'reportar', nombre: 'Reportar contenido' },
  { clave: 'publicar_aviso', nombre: 'Publicar avisos oficiales' },
  { clave: 'moderar', nombre: 'Moderar y ocultar' },
  { clave: 'ver_bitacora', nombre: 'Ver la bitácora' },
  { clave: 'crear_grupo', nombre: 'Crear grupos' },
  { clave: 'crear_evento', nombre: 'Programar eventos' }
];

/* Los avatares disponibles. Son emojis para no depender de imágenes externas. */
var AVATARES = ['🦊', '🐼', '🦉', '🐸', '🐙', '🦄', '🐢', '🐝'];

/** Todos los usuarios registrados. */
function usuarios() { return PIA.listar('usuarios'); }

/** Busca un usuario por su id. */
function usuarioPorId(id) {
  var lista = usuarios();
  for (var i = 0; i < lista.length; i++) {
    if (Number(lista[i].id) === Number(id)) return lista[i];
  }
  return null;
}

/** Busca un usuario por su código institucional. */
function usuarioPorCodigo(codigo) {
  var buscado = String(codigo || '').trim().toUpperCase();
  var lista = usuarios();
  for (var i = 0; i < lista.length; i++) {
    if (String(lista[i].codigo_institucional || '').toUpperCase() === buscado) return lista[i];
  }
  return null;
}

/** El avatar del usuario, con uno por defecto. */
function avatarDe(u) { return u && u.avatar ? u.avatar : '🦉'; }

/** El nombre del rol en palabras. */
function nombreRol(rol) { return ROLES[rol] || 'Invitado'; }

/** Etiqueta de color según el rol. */
function badgeRol(rol) {
  var clase = rol === 'docente' ? 'info' : rol === 'moderador' ? 'warn' : rol === 'admin' ? 'mal' : 'neutro';
  return '<span class="badge ' + clase + '">' + PIA.esc(nombreRol(rol)) + '</span>';
}

/** Devuelve true si un rol puede hacer una acción. */
function puede(accion, rol) {
  var r = rol;
  if (!r) { var yo = usuarioActual(); r = yo ? yo.rol : ''; }
  var permisos = PERMISOS[r];
  return !!(permisos && permisos[accion]);
}

/** La sesión guardada, o null. */
function sesion() {
  try {
    var crudo = localStorage.getItem(CLAVE_SESION_LC);
    return crudo ? JSON.parse(crudo) : null;
  } catch (e) { return null; }
}

/** El usuario que tiene la sesión abierta. */
function usuarioActual() {
  var s = sesion();
  return s ? usuarioPorId(s.id_usuario) : null;
}

/** Guarda la sesión del usuario. */
function guardarSesion(id) {
  localStorage.setItem(CLAVE_SESION_LC, JSON.stringify({ id_usuario: Number(id), desde: new Date().toISOString() }));
}

/** Deja constancia de una acción en la bitácora auditable. */
function registrarBitacora(accion, detalle) {
  var u = usuarioActual();
  PIA.insertar('bitacora', {
    fecha: new Date().toISOString(),
    accion: accion,
    detalle: detalle,
    moderador: u ? u.username_publico : 'Sistema',
    rol: u ? u.rol : 'sistema'
  });
}

/**
 * Valida el ingreso con código institucional y contraseña.
 * La clave 1234 es solo la semilla del primer ingreso.
 */
function iniciarSesion(codigo, clave) {
  var cod = String(codigo || '').trim().toUpperCase();
  if (!cod) return { ok: false, mensaje: 'Escribe tu código institucional.' };
  if (!clave) return { ok: false, mensaje: 'Escribe tu contraseña.' };
  var u = usuarioPorCodigo(cod);
  if (!u) return { ok: false, mensaje: 'Ese código institucional no está registrado en LolaConnect.' };
  if (u.activo === false) return { ok: false, mensaje: 'La cuenta está inactiva. Habla con Coordinación.' };
  if (String(clave) !== String(u.clave)) return { ok: false, mensaje: 'La contraseña no coincide. Intenta de nuevo.' };
  guardarSesion(u.id);
  registrarBitacora('Ingreso', 'Entró con el rol de ' + nombreRol(u.rol) + '.');
  return { ok: true, usuario: u, debeCambiar: u.debe_cambiar_clave === true };
}

/** Una contraseña es segura si tiene 8 caracteres, letras y números. */
function claveSegura(clave) {
  var texto = String(clave || '');
  if (texto === '1234') return false;
  return texto.length >= 8 && /[a-zA-Z]/.test(texto) && /[0-9]/.test(texto);
}

/** Cambia la contraseña comprobando la anterior. */
function actualizarClave(idUsuario, actual, nueva) {
  var u = usuarioPorId(idUsuario);
  if (!u) return { ok: false, mensaje: 'No encontramos esa cuenta.' };
  if (String(actual) !== String(u.clave)) return { ok: false, mensaje: 'La contraseña actual no coincide.' };
  if (!claveSegura(nueva)) return { ok: false, mensaje: 'La nueva clave debe tener 8 caracteres o más, con letras y números, y no puede ser 1234.' };
  PIA.actualizar('usuarios', u.id, { clave: nueva, debe_cambiar_clave: false });
  registrarBitacora('Cambio de contraseña', 'La cuenta ' + u.username_publico + ' actualizó su contraseña.');
  return { ok: true, mensaje: 'Contraseña actualizada.' };
}

/** Pinta el formulario de acceso o el panel de la sesión abierta. */
function pintarAcceso() {
  var caja = document.getElementById('acceso');
  if (!caja) return;
  var u = usuarioActual();
  if (u) {
    caja.innerHTML = '<div class="aviso ok"><div class="fila" style="gap:12px">' +
      '<div style="font-size:36px">' + avatarDe(u) + '</div>' +
      '<div><b>' + PIA.esc(u.username_publico) + '</b> ' + badgeRol(u.rol) + '<br>' +
      '<span class="pequeno">' + PIA.esc(u.nombre_completo) + ' · ' + PIA.esc(u.grado) + '</span></div>' +
      '</div></div>' +
      '<div class="fila" style="margin-top:10px">' +
      '<a class="btn p" href="feed.html">Ir al feed</a>' +
      '<a class="btn" href="perfil.html">Mi perfil</a>' +
      (puede('moderar', u.rol) ? '<a class="btn" href="moderacion.html">Moderación</a>' : '') +
      '<button class="btn" onclick="cerrarSesion()">Cerrar sesión</button>' +
      '</div>' +
      (u.debe_cambiar_clave ? '<div class="aviso warn" style="margin-top:12px">Sigues usando la clave 1234 de primer ingreso. <a href="#" onclick="abrirCambioObligatorio();return false;">Cámbiala ahora</a>.</div>' : '');
    return;
  }
  var demos = ['EST-1005-01', 'DOC-001', 'EST-1005-04', 'ADM-001'];
  var chips = demos.map(function (codigo) {
    var dueno = usuarioPorCodigo(codigo);
    return '<button class="btn pq" onclick="entrarDemo(\'' + codigo + '\')">' + (dueno ? PIA.esc(dueno.username_publico) : codigo) + '</button>';
  }).join('');
  caja.innerHTML = '<div class="campo"><label for="lcCodigo">Código institucional</label><input id="lcCodigo" placeholder="EST-1005-01" autocomplete="off"></div>' +
    '<div class="campo"><label for="lcClave">Contraseña</label><input type="password" id="lcClave" placeholder="Tu contraseña" autocomplete="off"></div>' +
    '<button class="btn p" onclick="entrar()">Entrar a LolaConnect</button>' +
    '<p class="pequeno gris" style="margin-top:10px">Demostración: entra con un clic en cualquiera de estas cuentas.</p>' +
    '<div class="fila">' + chips + '</div>';
}

/** Ingresa con el formulario visible. */
function entrar() {
  var r = iniciarSesion(PIA.valor('lcCodigo'), PIA.valor('lcClave'));
  if (!r.ok) { PIA.toast(r.mensaje, 'mal'); return; }
  if (r.debeCambiar) {
    PIA.toast('Bienvenido. Cambia la clave 1234 antes de continuar.', 'warn');
    pintarAcceso();
    pintarEstadoSesion();
    abrirCambioObligatorio();
    return;
  }
  PIA.toast('Bienvenido, ' + r.usuario.username_publico + '.');
  pintarAcceso();
  pintarEstadoSesion();
  pintarFeed();
  pintarPerfil();
}

/** Entra con una cuenta de demostración. */
function entrarDemo(codigo) {
  var u = usuarioPorCodigo(codigo);
  if (!u) { PIA.toast('Esa cuenta de demostración no existe.', 'mal'); return; }
  PIA.poner('lcCodigo', codigo);
  PIA.poner('lcClave', u.clave);
  entrar();
}

/** Cierra la sesión. */
function cerrarSesion() {
  registrarBitacora('Cierre de sesión', 'El usuario salió de la plataforma.');
  localStorage.removeItem(CLAVE_SESION_LC);
  PIA.toast('Sesión cerrada.');
  if (document.getElementById('acceso')) {
    pintarAcceso();
    pintarEstadoSesion();
    pintarFeed();
    pintarPerfil();
  } else {
    window.location.href = 'index.html';
  }
}

/** Abre el cambio de contraseña obligatorio del primer ingreso. */
function abrirCambioObligatorio() {
  var u = usuarioActual();
  if (!u) { PIA.toast('Inicia sesión primero.', 'mal'); return; }
  var cuerpo = '<div class="aviso warn">Por seguridad, cambia la contraseña 1234 de primer ingreso.</div>' +
    '<div class="campo"><label for="ncClave">Contraseña nueva</label><input type="password" id="ncClave" autocomplete="off"></div>' +
    '<div class="campo"><label for="ncClave2">Repite la contraseña</label><input type="password" id="ncClave2" autocomplete="off"></div>' +
    '<p class="pequeno gris">Mínimo 8 caracteres, con letras y números. No puede ser 1234.</p>';
  PIA.modal('Cambio de contraseña obligatorio', cuerpo,
    '<button class="btn p" onclick="guardarClaveObligatoria()">Guardar contraseña</button>');
}

/** Guarda la contraseña del cambio obligatorio. */
function guardarClaveObligatoria() {
  var u = usuarioActual();
  if (!u) return;
  var nueva = PIA.valor('ncClave');
  var repetida = PIA.valor('ncClave2');
  if (nueva !== repetida) { PIA.toast('Las dos contraseñas no coinciden.', 'mal'); return; }
  if (!claveSegura(nueva)) { PIA.toast('La clave debe tener 8 caracteres o más, con letras y números.', 'mal'); return; }
  PIA.actualizar('usuarios', u.id, { clave: nueva, debe_cambiar_clave: false });
  registrarBitacora('Cambio de contraseña', 'Cumplió el cambio obligatorio del primer ingreso.');
  PIA.toast('Contraseña actualizada. Ya puedes publicar.');
  PIA.cerrarModal();
  pintarAcceso();
  pintarEstadoSesion();
}

/** Cambio de contraseña desde la página de perfil. */
function cambiarClavePerfil() {
  var u = usuarioActual();
  if (!u) { PIA.toast('Inicia sesión primero.', 'mal'); return; }
  var r = actualizarClave(u.id, PIA.valor('clActual'), PIA.valor('clNueva'));
  if (!r.ok) { PIA.toast(r.mensaje, 'mal'); return; }
  PIA.toast(r.mensaje);
  PIA.poner('clActual', '');
  PIA.poner('clNueva', '');
  pintarPerfil();
}

/** Aviso de sesión para las páginas internas. */
function pintarEstadoSesion() {
  var caja = document.getElementById('avisoSesion');
  if (!caja) return;
  var u = usuarioActual();
  if (u) {
    caja.innerHTML = '<div class="aviso ok pequeno">Sesión activa: <b>' + avatarDe(u) + ' ' + PIA.esc(u.username_publico) + '</b> ' +
      badgeRol(u.rol) + ' · <a href="perfil.html">Mi perfil</a> · <a href="#" onclick="cerrarSesion();return false;">Cerrar sesión</a></div>';
  } else {
    caja.innerHTML = '<div class="aviso warn pequeno">No has iniciado sesión. Puedes leer el feed, pero para publicar o comentar <a href="index.html">entra con tu código institucional</a>.</div>';
  }
}

/** Tabla con la matriz de permisos por rol. */
function pintarMatrizRoles() {
  var cont = document.getElementById('matrizRoles');
  if (!cont) return;
  var filas = ACCIONES.map(function (accion) {
    var celdas = ['estudiante', 'docente', 'moderador', 'admin'].map(function (rol) {
      return PERMISOS[rol][accion.clave]
        ? '<span class="badge ok">Sí</span>'
        : '<span class="badge neutro">No</span>';
    });
    return [accion.nombre, celdas[0], celdas[1], celdas[2], celdas[3]];
  });
  cont.innerHTML = PIA.tabla(['Acción', 'Estudiante', 'Docente', 'Moderador', 'Administrador'], filas);
}

document.addEventListener('DOMContentLoaded', function () {
  pintarAcceso();
  pintarMatrizRoles();
});