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
var CLAVE_DATOS = "pia_somos_potencialidades";

/* Los datos de ejemplo. Se cargan solo la primera vez, cuando no hay nada.
   Son los mismos que están en la carpeta data/ del proyecto. */
var SEMILLA = {
  "estudiantes": [
    {
      "id": 1,
      "nombre": "Ana Lucía Romero Pardo",
      "alias": "Anon_123",
      "grado": "10°05",
      "consentimiento": true,
      "correo": "ana.romerop@lola.edu.co",
      "bio": "Dibujo y poesía"
    },
    {
      "id": 2,
      "nombre": "Juan José Doria Ossa",
      "alias": "Anon_045",
      "grado": "10°05",
      "consentimiento": true,
      "correo": "juan.doriao@lola.edu.co",
      "bio": "Fotografía de calle"
    },
    {
      "id": 3,
      "nombre": "María Kamila Piedrahíta Ochoa",
      "alias": "Anon_078",
      "grado": "10°05",
      "consentimiento": false,
      "correo": "kamila.piedrahitao@lola.edu.co",
      "bio": "Ilustración y color"
    },
    {
      "id": 4,
      "nombre": "Mark Santiago Betancourt López",
      "alias": "Anon_102",
      "grado": "10°05",
      "consentimiento": true,
      "correo": "mark.betancourtlo@lola.edu.co",
      "bio": "Danza y audiovisual"
    },
    {
      "id": 5,
      "nombre": "Sara Ospina Cárdenas",
      "alias": "Anon_211",
      "grado": "10°04",
      "consentimiento": true,
      "correo": "sara.ospinac@lola.edu.co",
      "bio": "Pintura y muralismo"
    },
    {
      "id": 6,
      "nombre": "Emmanuel Zapata Ríos",
      "alias": "Anon_230",
      "grado": "10°03",
      "consentimiento": false,
      "correo": "emmanuel.zapatar@lola.edu.co",
      "bio": "Fotografía análoga"
    },
    {
      "id": 7,
      "nombre": "Laura Restrepo Gil",
      "alias": "Anon_256",
      "grado": "10°05",
      "consentimiento": true,
      "correo": "laura.restrepog@lola.edu.co",
      "bio": "Retrato y escritura"
    }
  ],
  "obras": [
    {
      "id": 1,
      "id_autor": 3,
      "titulo": "Mi gato espacial",
      "categoria": "Dibujo",
      "tecnica": "Lápiz de color",
      "grado": "10°05",
      "autor_publico": "Anon_078",
      "alias": "Anon_078",
      "nombre_real": "María Kamila Piedrahíta Ochoa",
      "modo_identidad": "ALIAS_ANONIMO",
      "mostrar_nombre": false,
      "consentimiento": false,
      "historia_proceso": "Lo dibujé en tres tardes mirando a mi gato dormir sobre la lavadora. Primero hice el contorno con lápiz suave y después mezclé azules y naranjas para que pareciera que flota entre estrellas.",
      "archivo_media": "mi-gato-espacial.jpg",
      "texto_alt": "Ilustración de un gato naranja dormido sobre una nube, rodeado de estrellas azules y amarillas.",
      "visibilidad": "publico",
      "estado": "APROBADA",
      "total_apoyos": 14,
      "marca_agua": true,
      "reportada": false,
      "fecha": "2026-10-05"
    },
    {
      "id": 2,
      "id_autor": 2,
      "titulo": "Mi barrio al amanecer",
      "categoria": "Fotografía",
      "tecnica": "Cámara del celular",
      "grado": "10°05",
      "autor_publico": "Juan José Doria Ossa",
      "alias": "Anon_045",
      "nombre_real": "Juan José Doria Ossa",
      "modo_identidad": "NOMBRE_VISIBLE",
      "mostrar_nombre": true,
      "consentimiento": true,
      "historia_proceso": "Salí a las cinco y media a la tienda de la esquina y el cielo estaba rosado. Hice seis tomas desde el mismo punto hasta que la luz cayó justo sobre los tejados.",
      "archivo_media": "mi-barrio-al-amanecer.jpg",
      "texto_alt": "Fotografía de tejados de un barrio de Medellín al amanecer, con el cielo rosado y una montaña al fondo.",
      "visibilidad": "publico",
      "estado": "APROBADA",
      "total_apoyos": 9,
      "marca_agua": true,
      "reportada": false,
      "fecha": "2026-10-07"
    },
    {
      "id": 3,
      "id_autor": 1,
      "titulo": "Carta a los quince",
      "categoria": "Poesía",
      "tecnica": "Texto libre",
      "grado": "10°05",
      "autor_publico": "Anon_123",
      "alias": "Anon_123",
      "nombre_real": "Ana Lucía Romero Pardo",
      "modo_identidad": "ALIAS_ANONIMO",
      "mostrar_nombre": false,
      "consentimiento": true,
      "historia_proceso": "Escribí doce versos para mi cumpleaños y los corregí leyéndolos en voz alta en el patio. Quité tres adjetivos y el poema respiró mejor.",
      "archivo_media": "carta-a-los-quince.pdf",
      "texto_alt": "Poema de doce versos sobre cumplir quince años, escrito en primera persona.",
      "visibilidad": "publico",
      "estado": "APROBADA",
      "total_apoyos": 11,
      "marca_agua": true,
      "reportada": false,
      "fecha": "2026-10-09"
    },
    {
      "id": 4,
      "id_autor": 5,
      "titulo": "Raíces de la Lola",
      "categoria": "Pintura",
      "tecnica": "Acrílico sobre cartón",
      "grado": "10°04",
      "autor_publico": "Sara Ospina Cárdenas",
      "alias": "Anon_211",
      "nombre_real": "Sara Ospina Cárdenas",
      "modo_identidad": "NOMBRE_VISIBLE",
      "mostrar_nombre": true,
      "consentimiento": true,
      "historia_proceso": "Pinté las raíces del árbol del patio porque los de décimo siempre nos sentamos ahí. Usé tres verdes y un ocre que conseguí mezclando en el taller.",
      "archivo_media": "raices-de-la-lola.jpg",
      "texto_alt": "Pintura de raíces gruesas de un árbol que salen de la tierra, en verdes y ocres.",
      "visibilidad": "publico",
      "estado": "APROBADA",
      "total_apoyos": 7,
      "marca_agua": true,
      "reportada": false,
      "fecha": "2026-10-12"
    },
    {
      "id": 5,
      "id_autor": 4,
      "titulo": "Cumbia en el patio",
      "categoria": "Danza",
      "tecnica": "Video de 40 segundos",
      "grado": "10°05",
      "autor_publico": "Anon_102",
      "alias": "Anon_102",
      "nombre_real": "Mark Santiago Betancourt López",
      "modo_identidad": "ALIAS_ANONIMO",
      "mostrar_nombre": false,
      "consentimiento": true,
      "historia_proceso": "Grabamos la coreografía en dos recreos. La música la hizo un compañero con una base libre y la edición la terminé en el celular.",
      "archivo_media": "cumbia-en-el-patio.mp4",
      "texto_alt": "Video de dos estudiantes bailando cumbia en el patio del colegio, con música de fondo.",
      "visibilidad": "grupo",
      "estado": "APROBADA",
      "total_apoyos": 6,
      "marca_agua": true,
      "reportada": true,
      "motivo_reporte": "Un compañero reportó que aparece su rostro sin autorización.",
      "fecha_reporte": "2026-10-15",
      "fecha": "2026-10-14"
    },
    {
      "id": 6,
      "id_autor": 6,
      "titulo": "Silencio de aula",
      "categoria": "Fotografía",
      "tecnica": "Blanco y negro",
      "grado": "10°03",
      "autor_publico": "Anon_230",
      "alias": "Anon_230",
      "nombre_real": "Emmanuel Zapata Ríos",
      "modo_identidad": "ALIAS_ANONIMO",
      "mostrar_nombre": false,
      "consentimiento": false,
      "historia_proceso": "Tomé la foto en el cambio de bloque, cuando el salón queda solo y la luz entra por la ventana. La pasé a blanco y negro para resaltar las sillas.",
      "archivo_media": "silencio-de-aula.jpg",
      "texto_alt": "Fotografía en blanco y negro de un salón vacío con la luz entrando por la ventana.",
      "visibilidad": "borrador",
      "estado": "PENDIENTE_MODERACION_DOCENTE",
      "total_apoyos": 0,
      "marca_agua": true,
      "reportada": false,
      "fecha": "2026-10-20"
    },
    {
      "id": 7,
      "id_autor": 7,
      "titulo": "Retrato de mi abuela",
      "categoria": "Dibujo",
      "tecnica": "Carboncillo",
      "grado": "10°05",
      "autor_publico": "Laura Restrepo Gil",
      "alias": "Anon_256",
      "nombre_real": "Laura Restrepo Gil",
      "modo_identidad": "NOMBRE_VISIBLE",
      "mostrar_nombre": true,
      "consentimiento": true,
      "historia_proceso": "Me demoré dos semanas en las manos. Le pedí a mi abuela que se sentara con la lámpara del comedor y le tomé fotos para trabajar en casa.",
      "archivo_media": "retrato-de-mi-abuela.jpg",
      "texto_alt": "Retrato en carboncillo de una señora mayor sentada junto a una lámpara.",
      "visibilidad": "borrador",
      "estado": "PENDIENTE_MODERACION_DOCENTE",
      "total_apoyos": 0,
      "marca_agua": true,
      "reportada": false,
      "fecha": "2026-10-21"
    },
    {
      "id": 8,
      "id_autor": 1,
      "titulo": "Fractura",
      "categoria": "Pintura",
      "tecnica": "Óleo",
      "grado": "10°05",
      "autor_publico": "Anon_123",
      "alias": "Anon_123",
      "nombre_real": "Ana Lucía Romero Pardo",
      "modo_identidad": "ALIAS_ANONIMO",
      "mostrar_nombre": false,
      "consentimiento": true,
      "historia_proceso": "Empecé pintando una pared y terminé con una grieta que atraviesa la tela. Quiero que se sienta el ruido de algo que se rompe.",
      "archivo_media": "fractura.jpg",
      "texto_alt": "Pintura al óleo de una pared blanca con una grieta roja que la atraviesa.",
      "visibilidad": "borrador",
      "estado": "CAMBIOS_SOLICITADOS",
      "total_apoyos": 3,
      "marca_agua": true,
      "reportada": false,
      "observacion_moderacion": "Amplía el texto alternativo y cuenta con qué materiales hiciste la grieta.",
      "fecha": "2026-10-16"
    }
  ],
  "comentarios": [
    {
      "id": 1,
      "id_obra": 1,
      "id_estudiante": 1,
      "autor_publico": "Anon_123",
      "plantilla": "Destaco tu manejo del color porque ",
      "texto": "Destaco tu manejo del color porque el gato se ve cálido sin perder el azul del fondo.",
      "fecha": "2026-10-06"
    },
    {
      "id": 2,
      "id_obra": 1,
      "id_estudiante": 2,
      "autor_publico": "Anon_045",
      "plantilla": "Esta obra me transmite ",
      "texto": "Esta obra me transmite calma porque el gato duerme entre estrellas y todo queda quieto.",
      "fecha": "2026-10-06"
    },
    {
      "id": 3,
      "id_obra": 2,
      "id_estudiante": 1,
      "autor_publico": "Anon_123",
      "plantilla": "Me impresionó la composición, sobre todo ",
      "texto": "Me impresionó la composición, sobre todo la línea de tejados que guía la mirada al fondo.",
      "fecha": "2026-10-08"
    },
    {
      "id": 4,
      "id_obra": 3,
      "id_estudiante": 7,
      "autor_publico": "Anon_256",
      "plantilla": "Se nota el proceso detrás de ",
      "texto": "Se nota el proceso detrás de cada verso, sobre todo en la última estrofa que se queda corta a propósito.",
      "fecha": "2026-10-10"
    },
    {
      "id": 5,
      "id_obra": 4,
      "id_estudiante": 2,
      "autor_publico": "Anon_045",
      "plantilla": "La técnica que usaste en ",
      "texto": "La técnica que usaste en las raíces hace que se sientan húmedas y recién arrancadas.",
      "fecha": "2026-10-13"
    },
    {
      "id": 6,
      "id_obra": 2,
      "id_estudiante": 5,
      "autor_publico": "Anon_211",
      "plantilla": "Quiero ver más de tu trabajo porque ",
      "texto": "Quiero ver más de tu trabajo porque tu mirada del barrio es muy propia y no se parece a nada.",
      "fecha": "2026-10-15"
    }
  ],
  "desafios": [
    {
      "id": 1,
      "titulo": "Retrato con la mano no dominante",
      "descripcion": "Dibuja un retrato usando la mano con la que no escribes. El trazo torpe es parte del reto.",
      "categoria": "Dibujo",
      "fecha_inicio": "2026-10-26",
      "fecha_fin": "2026-11-01",
      "insignia": "Pulso valiente",
      "participantes": 4,
      "participantes_ids": [
        1,
        3,
        6,
        7
      ],
      "meta": 20,
      "estado": "VIGENTE",
      "puntos": 50
    },
    {
      "id": 2,
      "titulo": "Mi barrio en seis fotos",
      "descripcion": "Cuenta tu barrio en seis fotografías tomadas a la misma hora durante seis días.",
      "categoria": "Fotografía",
      "fecha_inicio": "2026-10-12",
      "fecha_fin": "2026-10-18",
      "insignia": "Ojo del barrio",
      "participantes": 9,
      "participantes_ids": [
        1,
        2,
        4,
        5,
        6,
        7
      ],
      "meta": 15,
      "estado": "CERRADO",
      "puntos": 40
    },
    {
      "id": 3,
      "titulo": "Doce versos para la Lola",
      "descripcion": "Escribe doce versos sobre un lugar del colegio que nadie más haya elegido.",
      "categoria": "Poesía",
      "fecha_inicio": "2026-10-26",
      "fecha_fin": "2026-11-01",
      "insignia": "Pluma constante",
      "participantes": 3,
      "participantes_ids": [
        1,
        7
      ],
      "meta": 15,
      "estado": "VIGENTE",
      "puntos": 40
    },
    {
      "id": 4,
      "titulo": "Dúo artístico: dos manos, una obra",
      "descripcion": "Busca un compañero de otro grado y hagan una sola obra entre los dos.",
      "categoria": "Pintura",
      "fecha_inicio": "2026-10-26",
      "fecha_fin": "2026-11-02",
      "insignia": "Dúo artístico",
      "participantes": 2,
      "participantes_ids": [
        2,
        4
      ],
      "meta": 10,
      "estado": "VIGENTE",
      "puntos": 60
    },
    {
      "id": 5,
      "titulo": "El sonido del recreo",
      "descripcion": "Graba un audio de un minuto del recreo y cuéntalo solo con sonidos.",
      "categoria": "Música",
      "fecha_inicio": "2026-10-05",
      "fecha_fin": "2026-10-11",
      "insignia": "Oído atento",
      "participantes": 6,
      "participantes_ids": [
        2,
        4
      ],
      "meta": 12,
      "estado": "CERRADO",
      "puntos": 35
    }
  ],
  "insignias": [
    {
      "id": 1,
      "id_estudiante": 1,
      "nombre": "Pluma constante",
      "descripcion": "Publicó tres textos en el mes",
      "fecha": "2026-10-10",
      "tipo": "CONSTANCIA"
    },
    {
      "id": 2,
      "id_estudiante": 2,
      "nombre": "Ojo del barrio",
      "descripcion": "Ganó el reto de fotografía",
      "fecha": "2026-10-18",
      "tipo": "CREATIVIDAD"
    },
    {
      "id": 3,
      "id_estudiante": 3,
      "nombre": "Trazo valiente",
      "descripcion": "Primera obra en la galería",
      "fecha": "2026-10-05",
      "tipo": "CREATIVIDAD"
    },
    {
      "id": 4,
      "id_estudiante": 4,
      "nombre": "Dúo artístico",
      "descripcion": "Colaboró en una obra en pareja",
      "fecha": "2026-10-16",
      "tipo": "COLABORACION"
    },
    {
      "id": 5,
      "id_estudiante": 5,
      "nombre": "Raíz viva",
      "descripcion": "Representó a 10°04 en el reto",
      "fecha": "2026-10-13",
      "tipo": "PARTICIPACION"
    },
    {
      "id": 6,
      "id_estudiante": 7,
      "nombre": "Voz nueva",
      "descripcion": "Primer comentario positivo del grupo",
      "fecha": "2026-10-11",
      "tipo": "PARTICIPACION"
    }
  ],
  "apoyos": [
    {
      "id": 1,
      "id_obra": 1,
      "id_estudiante": 1,
      "fecha": "2026-10-06"
    },
    {
      "id": 2,
      "id_obra": 1,
      "id_estudiante": 2,
      "fecha": "2026-10-06"
    },
    {
      "id": 3,
      "id_obra": 2,
      "id_estudiante": 3,
      "fecha": "2026-10-08"
    },
    {
      "id": 4,
      "id_obra": 3,
      "id_estudiante": 5,
      "fecha": "2026-10-10"
    },
    {
      "id": 5,
      "id_obra": 4,
      "id_estudiante": 1,
      "fecha": "2026-10-13"
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
  "codigo": "PIA-2026-10-LG-SOMOS-Potencialidades",
  "palabrasClave": [
    "talento artístico",
    "calidad humana",
    "privacidad por niveles",
    "moderación docente",
    "portafolio"
  ],
  "objetivo": "Desarrollar la plataforma web educativa SOMOS Potencialidades para identificar, visibilizar y potenciar los talentos artísticos de los estudiantes de la I.E. Lola González en un entorno digital seguro, mediante un prototipo funcional FrontEnd (HTML5, CSS3 y JavaScript ES6+) en grado 10° y su escalamiento a arquitectura Full-Stack (PHP 8 y MySQL 8) en grado 11°.",
  "especificos": [
    "Especificar la privacidad por niveles, la moderación previa y el anonimato gradual.",
    "Diseñar la identidad gráfica oficial y los wireframes de Galería, Portafolio y Desafíos.",
    "Construir la galería filtrable por categoría, técnica y grado con datos semilla.",
    "Programar los apoyos, los comentarios guiados, los desafíos y el Mentor Art.",
    "Modelar la base de datos y el panel de moderación para el paso a grado 11°."
  ],
  "normativa": "Ley 1581 de 2012 · Ley 1098 de 2006 (infancia) · WCAG 2.2"
};
PIA.equipo = [
  {
    "nombre": "Ana Lucía Romero Pardo",
    "rol": "Product Owner · privacidad por niveles, anonimato gradual y enfoque pedagógico"
  },
  {
    "nombre": "Juan José Doria Ossa",
    "rol": "Scrum Master · repositorio, entregables y coordinación de los sprints"
  },
  {
    "nombre": "María Kamila Piedrahíta Ochoa",
    "rol": "Líder UI/UX · identidad amarillo/azul/blanco, wireframes y accesibilidad WCAG 2.2"
  },
  {
    "nombre": "Mark Santiago Betancourt López",
    "rol": "Líder de lógica JS y datos · galería, moderación, gamificación y Mentor Art"
  }
];
PIA.construccion = {
  "algoritmo": [
    "ALGORITMO Publicar_Moderar_Y_Evolucionar_Identidad_SOMOS ENTRADAS: id_estudiante, titulo_obra, categoria, tecnica, historia_proceso, archivo_media, texto_alt, modo_identidad ('ALIAS_ANONIMO' | 'NOMBRE_VISIBLE'), tiene_consentimiento_tutor (Lógico) CONSTANTES: UMBRAL_APOYOS_CONFIANZA = 10 PROCESO:",
    "  1. ValidarArchivoMultimedia(archivo_media, tipos=['JPG','PNG','MP3','MP4'], peso_max_mb=5)",
    "  2. SI texto_alt == VACIO ENTONCES RETORNAR Error(\"Por accesibilidad WCAG, describe brevemente tu obra.\")",
    "  3. AplicarMarcaDeAguaInstitucional(archivo_media, \"SOMOS Lola González - Autoría Protegida\")",
    "  4. SI modo_identidad == 'NOMBRE_VISIBLE' Y tiene_consentimiento_tutor == FALSO ENTONCES",
    "       autor_publico <- ObtenerAlias(id_estudiante) // Ej. \"Anon_123\" hasta validar consentimiento",
    "     SINO SI modo_identidad == 'NOMBRE_VISIBLE' ENTONCES",
    "       autor_publico <- ObtenerNombreReal(id_estudiante)",
    "     SINO",
    "       autor_publico <- ObtenerAlias(id_estudiante)",
    "  5. estado_moderacion <- \"PENDIENTE_MODERACION_DOCENTE\""
  ],
  "tablas": [
    {
      "nombre": "usuarios",
      "campos": "id_usuario (PK), codigo_institucional, nombre_real, alias_artistico (UNIQUE), grado_grupo, rol ('estudiante','moderador','admin','coordinacion'), consentimiento_tutor"
    },
    {
      "nombre": "obras",
      "campos": "id_obra (PK), id_autor (FK), titulo, id_categoria (FK), tecnica, historia_proceso, ruta_archivo, texto_alt, visibilidad ('borrador','grupo','publico'), mostrar_nombre_real (BOOL), estado ('pendiente','aprobada','cambios_solicitados'), total_apoyos."
    },
    {
      "nombre": "comentarios_guiados",
      "campos": "id_comentario (PK), id_obra (FK), id_usuario (FK), plantilla_positiva, 4. desafios_semanales & insignias_usuario: Trazabilidad de retos, dúos artísticos y auditoría de 6. Hoja de Ruta SCRUM y Bibliografía Verificada (APA 7.ª Edición) en julio–agosto; UA05 Programación I en agosto–noviembre), manteniendo una separación transparente entre el MVP de 10° (prototipo FrontEnd con datos semilla, filtros dinámicos, comentarios guiados y"
    }
  ]
};

/* ==========================================================================
   EXTRAS COMUNES — SOMOS Potencialidades
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
  enlace.download = 'SOMOS Potencialidades-' + tabla + '-' + PIA.hoy() + '.csv';
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
  var cuerpo = '<div class="aviso"><b>Esta es la aplicación de SOMOS Potencialidades.</b> Todo lo que hagas se guarda en tu navegador.</div>' +
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
   galeria.js
   --------------------------------------------------------------------------
   Núcleo de la galería: obras, apoyos con voto único y publicación con
   anonimato gradual. Traduce los pasos 1 a 6 del algoritmo
   Publicar_Moderar_Y_Evolucionar_Identidad_SOMOS.
   ========================================================================== */

"use strict";

/* Apoyos que hacen falta para invitar al estudiante a revelar su nombre. */
var UMBRAL_APOYOS_CONFIANZA = 10;

/* Tipos de archivo y peso máximo que acepta la publicación. */
var TIPOS_PERMITIDOS = ["JPG", "PNG", "MP3", "MP4"];
var PESO_MAX_MB = 5;

/* Colores suaves por categoría, para distinguir la galería de un vistazo. */
var COLORES_CATEGORIA = {
  Dibujo: "#dbeafe",
  Pintura: "#fef3c7",
  "Fotografía": "#dcfce7",
  "Poesía": "#fae8ff",
  "Música": "#e0e7ff",
  Danza: "#ffe4e6",
  Audiovisual: "#cffafe",
  Narrativa: "#f1f5f9"
};

/** Devuelve un estudiante por su id. */
function estudiantePorId(id) {
  var lista = PIA.listar("estudiantes");
  for (var i = 0; i < lista.length; i++) {
    if (Number(lista[i].id) === Number(id)) return lista[i];
  }
  return null;
}

/** Escribe un texto dentro de un elemento, si existe. */
function ponerTexto(id, valor) {
  var el = document.getElementById(id);
  if (el) el.textContent = valor;
}

/** El estudiante que está usando el prototipo en esta pestaña. */
function estudianteActual() {
  var guardado = sessionStorage.getItem("somos_estudiante");
  var e = guardado ? estudiantePorId(Number(guardado)) : null;
  if (e) return e;
  var lista = PIA.listar("estudiantes");
  if (!lista.length) return null;
  sessionStorage.setItem("somos_estudiante", String(lista[0].id));
  return lista[0];
}

/** Cambia el perfil activo y repinta la página. */
function cambiarEstudiante(id) {
  sessionStorage.setItem("somos_estudiante", String(id));
  window.location.reload();
}

/** Pinta el selector de perfil que aparece en varias páginas. */
function pintarSelectorEstudiante() {
  var caja = document.getElementById("selectorEstudiante");
  if (!caja) return;
  var actual = estudianteActual();
  var lista = PIA.listar("estudiantes");
  var opciones = "";
  lista.forEach(function (e) {
    opciones += "<option value='" + e.id + "'" +
      (actual && Number(e.id) === Number(actual.id) ? " selected" : "") + ">" +
      PIA.esc(e.nombre) + " · " + PIA.esc(e.grado) + "</option>";
  });
  caja.innerHTML = "<span class='pequeno gris'>Estás como</span>" +
    "<select onchange='cambiarEstudiante(this.value)' style='max-width:330px'>" + opciones + "</select>" +
    "<span class='badge neutro'>Alias " + PIA.esc(actual ? actual.alias : "") + "</span>";
}

/** Color suave de una categoría artística. */
function colorCategoria(cat) {
  return COLORES_CATEGORIA[cat] || "#eef2f7";
}

/** Etiqueta con el color de la categoría. */
function badgeCategoria(cat) {
  return "<span class='badge' style='background:" + colorCategoria(cat) + ";color:#1f2430'>" + PIA.esc(cat) + "</span>";
}

/** Obras aprobadas, que son las que se ven en la galería. */
function obrasAprobadas() {
  return PIA.listar("obras").filter(function (o) { return o.estado === "APROBADA" && o.visibilidad === "publico"; });
}

/** Una obra por id. */
function obraPorId(id) {
  var lista = PIA.listar("obras");
  for (var i = 0; i < lista.length; i++) {
    if (Number(lista[i].id) === Number(id)) return lista[i];
  }
  return null;
}

/** El nombre público de la obra: alias o nombre real, según lo elegido. */
function autorDeObra(obra) {
  if (!obra) return "";
  return obra.autor_publico || obra.alias || "Anon";
}

/** Apoyos acumulados por una obra. */
function apoyosDeObra(obra) {
  return Number(obra && obra.total_apoyos ? obra.total_apoyos : 0);
}

/** ¿Este estudiante ya apoyó esta obra? Control de voto único. */
function yaApoyo(idObra, idEstudiante) {
  var lista = PIA.listar("apoyos");
  for (var i = 0; i < lista.length; i++) {
    if (Number(lista[i].id_obra) === Number(idObra) && Number(lista[i].id_estudiante) === Number(idEstudiante)) return true;
  }
  return false;
}

/** Tarjeta de una obra dentro de la galería. */
function tarjetaObra(o) {
  return "<article style='background:var(--blanco);border-radius:12px;box-shadow:var(--sombra);overflow:hidden;display:flex;flex-direction:column'>" +
    "<div style='height:118px;background:" + colorCategoria(o.categoria) + ";display:grid;place-items:center;position:relative'>" +
    "<span style='font-size:36px;font-weight:700;color:rgba(31,36,48,.32)'>" + PIA.esc(String(o.titulo).charAt(0)) + "</span>" +
    "<span style='position:absolute;bottom:6px;right:8px;font-size:9.5px;color:rgba(31,36,48,.5)'>SOMOS · Lola González</span>" +
    "</div>" +
    "<div style='padding:12px 14px;display:flex;flex-direction:column;gap:6px;flex:1'>" +
    "<b style='font-size:14px'>" + PIA.esc(o.titulo) + "</b>" +
    "<span class='pequeno gris'>" + PIA.esc(autorDeObra(o)) + " · " + PIA.esc(o.grado) + "</span>" +
    "<div class='fila' style='gap:5px'>" + badgeCategoria(o.categoria) +
    "<span class='badge neutro'>" + PIA.esc(o.tecnica) + "</span></div>" +
    "<div class='fila' style='margin-top:auto;gap:8px;padding-top:6px'>" +
    "<span class='pequeno'>♥ " + apoyosDeObra(o) + " apoyos</span>" +
    "<button class='btn pq p' style='margin-left:auto' onclick='verObra(" + o.id + ")'>Ver obra</button>" +
    "</div></div></article>";
}

/** Llena un select con valores únicos, una sola vez. */
function llenarSelect(id, valores) {
  var sel = document.getElementById(id);
  if (!sel || sel.options.length > 1) return;
  var unicos = [];
  valores.forEach(function (v) { if (v && unicos.indexOf(v) === -1) unicos.push(v); });
  unicos.sort();
  unicos.forEach(function (v) { sel.innerHTML += "<option>" + PIA.esc(v) + "</option>"; });
}

/** Llena los filtros de la galería con los datos reales. */
function llenarFiltros() {
  var obras = PIA.listar("obras");
  llenarSelect("fCategoria", obras.map(function (o) { return o.categoria; }));
  llenarSelect("fTecnica", obras.map(function (o) { return o.tecnica; }));
  llenarSelect("fGrado", obras.map(function (o) { return o.grado; }));
}

/** Pinta la galería aplicando los filtros de categoría, técnica, grado y texto. */
function pintarGaleria() {
  var cont = document.getElementById("galeria");
  if (!cont) return;
  llenarFiltros();
  var cat = PIA.valor("fCategoria");
  var tec = PIA.valor("fTecnica");
  var grado = PIA.valor("fGrado");
  var texto = PIA.normalizar(PIA.valor("fTexto"));
  var obras = obrasAprobadas().filter(function (o) {
    if (cat && o.categoria !== cat) return false;
    if (tec && o.tecnica !== tec) return false;
    if (grado && o.grado !== grado) return false;
    if (texto && PIA.normalizar(o.titulo + " " + o.tecnica + " " + o.historia_proceso + " " + autorDeObra(o)).indexOf(texto) === -1) return false;
    return true;
  });
  var contador = document.getElementById("cuentaObras");
  if (contador) contador.textContent = obras.length;
  if (!obras.length) {
    cont.innerHTML = "<div class='vacio'>No hay obras con esos filtros. Prueba con otra categoría.</div>";
    return;
  }
  cont.innerHTML = obras.map(tarjetaObra).join("");
}

/** Abre el detalle de una obra con sus comentarios guiados. */
function verObra(id) {
  var o = obraPorId(id);
  if (!o) return;
  var cuerpo = "<div class='fila' style='margin-bottom:10px'>" + badgeCategoria(o.categoria) +
    "<span class='badge neutro'>" + PIA.esc(o.tecnica) + "</span>" +
    "<span class='badge neutro'>" + PIA.esc(o.grado) + "</span>" +
    "<span class='badge ok'>Aprobada por el docente</span></div>" +
    "<div style='height:170px;border-radius:10px;background:" + colorCategoria(o.categoria) + ";display:grid;place-items:center;margin-bottom:12px;position:relative'>" +
    "<span style='font-size:54px;color:rgba(31,36,48,.32)'>" + PIA.esc(String(o.titulo).charAt(0)) + "</span>" +
    "<span style='position:absolute;bottom:8px;right:10px;font-size:10px;color:rgba(31,36,48,.55)'>SOMOS Lola González · Autoría Protegida</span>" +
    "</div>" +
    "<p style='font-size:13px;margin-bottom:10px'>" + PIA.esc(o.historia_proceso) + "</p>" +
    "<p class='pequeno gris'><b>Texto alternativo:</b> " + PIA.esc(o.texto_alt) + "</p>" +
    "<p class='pequeno gris'>Autor: " + PIA.esc(autorDeObra(o)) + " · " + PIA.fecha(o.fecha) + " · " + apoyosDeObra(o) + " apoyos</p>" +
    "<div id='comentariosObra' style='margin-top:12px'></div>";
  var botones = "<button class='btn' onclick='PIA.cerrarModal()'>Cerrar</button>" +
    "<button class='btn p' onclick='apoyarObra(" + o.id + ")'>♥ Apoyar esta obra</button>";
  PIA.modal(o.titulo, cuerpo, botones);
  pintarComentarios(o.id);
}

/** Suma un apoyo, con control de voto único y aviso de umbral. */
function apoyarObra(id) {
  var o = obraPorId(id);
  var est = estudianteActual();
  if (!o || !est) return;
  if (Number(o.id_autor) === Number(est.id)) { PIA.toast("No puedes apoyar tu propia obra.", "warn"); return; }
  if (yaApoyo(o.id, est.id)) { PIA.toast("Ya apoyaste esta obra: es un voto por estudiante.", "warn"); return; }
  PIA.insertar("apoyos", { id_obra: o.id, id_estudiante: est.id, fecha: PIA.hoy() });
  var total = apoyosDeObra(o) + 1;
  PIA.actualizar("obras", o.id, { total_apoyos: total });
  PIA.toast("Apoyo registrado: la obra llegó a " + total + " apoyos.");
  if (document.getElementById("galeria")) pintarGaleria();
  if (document.getElementById("portafolio")) pintarPortafolio();
  verObra(o.id);
}

/** ¿El checkbox del consentimiento está marcado? */
function estaMarcado(id) {
  var el = document.getElementById(id);
  return !!(el && el.checked);
}

/** Devuelve la extensión de un archivo en mayúsculas. */
function extensionDe(nombre) {
  var partes = String(nombre || "").split(".");
  return partes.length > 1 ? partes[partes.length - 1].toUpperCase() : "";
}

/**
 * Algoritmo Publicar_Moderar_Y_Evolucionar_Identidad_SOMOS.
 * Valida el archivo, exige texto alternativo, aplica la marca de agua,
 * decide el nombre público y deja la obra en la cola de moderación.
 */
function publicarObra() {
  var est = estudianteActual();
  if (!est) { PIA.toast("No hay un perfil activo.", "mal"); return null; }

  var titulo = PIA.valor("titulo");
  var categoria = PIA.valor("categoria");
  var tecnica = PIA.valor("tecnica");
  var historia = PIA.valor("historia");
  var textoAlt = PIA.valor("textoAlt");
  var modo = PIA.valor("modoIdentidad") || "ALIAS_ANONIMO";
  var consentimiento = estaMarcado("consentimiento");

  /* 1. validar el archivo multimedia */
  var campo = document.getElementById("archivoMedia");
  var archivo = campo && campo.files && campo.files.length ? campo.files[0] : null;
  if (!archivo) { PIA.toast("Adjunta la obra: JPG, PNG, MP3 o MP4 de máximo " + PESO_MAX_MB + " MB.", "mal"); return null; }
  var extension = extensionDe(archivo.name);
  if (TIPOS_PERMITIDOS.indexOf(extension) === -1) { PIA.toast("Formato no permitido. Usa JPG, PNG, MP3 o MP4.", "mal"); return null; }
  if (Number(archivo.size) > PESO_MAX_MB * 1024 * 1024) { PIA.toast("El archivo pesa más de " + PESO_MAX_MB + " MB.", "mal"); return null; }

  /* 2. texto alternativo obligatorio por accesibilidad */
  if (!textoAlt) { PIA.toast("Por accesibilidad WCAG, describe brevemente tu obra.", "mal"); return null; }
  if (!titulo || !categoria || !tecnica) { PIA.toast("Completa el título, la categoría y la técnica.", "mal"); return null; }
  if (PIA.palabras(historia) < 10) { PIA.toast("Cuéntanos el proceso en al menos 10 palabras.", "mal"); return null; }

  /* 3 y 4. marca de agua y decisión del nombre público */
  var autorPublico = est.alias;
  if (modo === "NOMBRE_VISIBLE" && consentimiento) autorPublico = est.nombre;

  /* 5 y 6. la obra entra a la cola de moderación */
  var obra = PIA.insertar("obras", {
    id_autor: est.id,
    titulo: titulo,
    categoria: categoria,
    tecnica: tecnica,
    grado: est.grado,
    autor_publico: autorPublico,
    alias: est.alias,
    nombre_real: est.nombre,
    modo_identidad: modo,
    mostrar_nombre: autorPublico === est.nombre,
    consentimiento: !!consentimiento,
    historia_proceso: historia,
    archivo_media: String(archivo.name),
    texto_alt: textoAlt,
    visibilidad: "borrador",
    estado: "PENDIENTE_MODERACION_DOCENTE",
    total_apoyos: 0,
    marca_agua: true,
    reportada: false,
    fecha: PIA.hoy()
  });

  mostrarPublicacion(obra, extension);
  limpiarPublicar();
  if (document.getElementById("portafolio")) pintarPortafolio();
  return obra;
}

/** Muestra la trazabilidad de la publicación. */
function mostrarPublicacion(obra, extension) {
  var caja = document.getElementById("resultadoPublicacion");
  if (!caja) return;
  var modo = obra.mostrar_nombre ? "Nombre visible (con consentimiento)" : "Alias " + obra.alias;
  caja.innerHTML = "<section class='tarjeta' style='border-left:4px solid var(--ok)'>" +
    "<h2 style='color:var(--ok)'>Obra enviada a revisión</h2>" +
    "<p class='ayuda'>El docente la revisa antes de que salga a la galería. Te avisará en el portafolio.</p>" +
    "<div class='fila' style='gap:6px;flex-wrap:wrap'>" +
    "<span class='badge ok'>Archivo " + PIA.esc(extension) + " válido</span>" +
    "<span class='badge ok'>Texto alternativo</span>" +
    "<span class='badge ok'>Marca de agua aplicada</span>" +
    "<span class='badge warn'>" + PIA.esc(obra.estado.replace(/_/g, " ")) + "</span></div>" +
    "<p class='pequeno gris' style='margin-top:10px'>" + PIA.esc(modo) + " · registrada el " + PIA.fecha(obra.fecha) + ".</p>" +
    "<p class='pequeno gris'>Es tu obra, no la del docente ni la del mentor: la autoría queda en tu nombre.</p></section>";
  caja.scrollIntoView({ behavior: "smooth", block: "center" });
}

/** Deja el formulario de publicación en blanco. */
function limpiarPublicar() {
  ["titulo", "tecnica", "historia", "textoAlt"].forEach(function (id) { PIA.poner(id, ""); });
  PIA.poner("categoria", "");
  PIA.poner("modoIdentidad", "ALIAS_ANONIMO");
  var campo = document.getElementById("archivoMedia");
  if (campo) campo.value = "";
  var check = document.getElementById("consentimiento");
  if (check) check.checked = false;
}

/** Pinta los indicadores y las obras destacadas del inicio. */
function pintarInicio() {
  var obras = PIA.listar("obras");
  ponerTexto("iObras", obrasAprobadas().length);
  ponerTexto("iEstudiantes", PIA.listar("estudiantes").length);
  ponerTexto("iApoyos", obras.reduce(function (a, o) { return a + apoyosDeObra(o); }, 0));
  ponerTexto("iRetos", PIA.listar("desafios").filter(function (d) { return d.estado === "VIGENTE"; }).length);
  var cont = document.getElementById("destacadas");
  if (!cont) return;
  var top = obrasAprobadas().slice().sort(function (a, b) { return apoyosDeObra(b) - apoyosDeObra(a); }).slice(0, 3);
  cont.innerHTML = top.map(tarjetaObra).join("");
}

/** Pinta el portafolio del estudiante activo con su diario de proceso. */
function pintarPortafolio() {
  var est = estudianteActual();
  var cont = document.getElementById("portafolio");
  if (!cont || !est) return;
  var mias = PIA.listar("obras").filter(function (o) { return Number(o.id_autor) === Number(est.id); });
  var aprobadas = mias.filter(function (o) { return o.estado === "APROBADA"; });
  var apoyos = mias.reduce(function (a, o) { return a + apoyosDeObra(o); }, 0);
  ponerTexto("pObras", mias.length);
  ponerTexto("pAprobadas", aprobadas.length);
  ponerTexto("pApoyos", apoyos);

  /* aviso del paso 7: obra aprobada con 10 o más apoyos todavía en alias */
  var aviso = document.getElementById("avisoTalento");
  if (aviso) {
    var conUmbral = mias.filter(function (o) {
      return o.estado === "APROBADA" && apoyosDeObra(o) >= UMBRAL_APOYOS_CONFIANZA && !o.mostrar_nombre;
    })[0];
    aviso.innerHTML = conUmbral
      ? "<div class='aviso ok'><b>¡Tu talento inspira a la comunidad!</b> «" + PIA.esc(conUmbral.titulo) +
        "» ya tiene " + apoyosDeObra(conUmbral) + " apoyos. Si lo deseas y cuentas con permiso, puedes revelar tu nombre.</div>"
      : "";
  }

  if (!mias.length) {
    cont.innerHTML = "<div class='vacio'>Todavía no has publicado obras. Empieza con una.</div>";
  } else {
    cont.innerHTML = mias.map(function (o) {
      var puedeRevelar = o.estado === "APROBADA" && apoyosDeObra(o) >= UMBRAL_APOYOS_CONFIANZA && !o.mostrar_nombre;
      return "<div style='display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--linea)'>" +
        "<div style='width:64px;height:64px;border-radius:10px;background:" + colorCategoria(o.categoria) + ";display:grid;place-items:center;flex:0 0 auto'>" +
        "<b style='color:rgba(31,36,48,.4);font-size:22px'>" + PIA.esc(String(o.titulo).charAt(0)) + "</b></div>" +
        "<div style='flex:1'>" +
        "<b style='font-size:13.5px'>" + PIA.esc(o.titulo) + "</b>" +
        "<div class='fila' style='gap:5px;margin:4px 0'>" + badgeCategoria(o.categoria) +
        "<span class='badge " + (o.estado === "APROBADA" ? "ok" : o.estado === "CAMBIOS_SOLICITADOS" ? "warn" : "info") + "'>" +
        PIA.esc(o.estado.replace(/_/g, " ")) + "</span>" +
        "<span class='pequeno gris'>♥ " + apoyosDeObra(o) + "</span></div>" +
        "<span class='pequeno gris'>" + PIA.esc(autorDeObra(o)) + " · " + PIA.fecha(o.fecha) + "</span>" +
        (puedeRevelar ? "<div style='margin-top:6px'><button class='btn pq p' onclick='revelarNombre(" + o.id + ")'>Revelar mi nombre</button></div>" : "") +
        "</div></div>";
    }).join("");
  }

  var diario = document.getElementById("diario");
  if (diario) {
    var ordenadas = mias.slice().sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });
    diario.innerHTML = ordenadas.length ? ordenadas.map(function (o) {
      return "<div style='border-left:3px solid var(--acento);padding:2px 0 2px 12px;margin-bottom:14px'>" +
        "<b style='font-size:13px'>" + PIA.esc(o.titulo) + "</b>" +
        "<p class='pequeno gris' style='margin:2px 0'>" + PIA.fecha(o.fecha) + " · " + PIA.esc(o.tecnica) + "</p>" +
        "<p class='pequeno'>" + PIA.esc(o.historia_proceso) + "</p></div>";
    }).join("") : "<div class='vacio'>El diario se llena cuando publicas.</div>";
  }

  if (document.getElementById("logros")) pintarInsignias(est.id, "logros");
  var cuenta = document.getElementById("pInsignias");
  if (cuenta) {
    var info = insigniasDe(est.id);
    var logradas = info.calculadas.filter(function (x) { return x.lograda; }).length + info.guardadas.length;
    cuenta.textContent = logradas;
  }
}

/** Deja que el estudiante revele su nombre cuando ya tiene confianza. */
function revelarNombre(id) {
  var o = obraPorId(id);
  var est = estudianteActual();
  if (!o || !est) return;
  if (!est.consentimiento || !o.consentimiento) {
    PIA.toast("Necesitas el consentimiento del acudiente para mostrar tu nombre.", "warn");
    return;
  }
  if (apoyosDeObra(o) < UMBRAL_APOYOS_CONFIANZA) {
    PIA.toast("Necesitas al menos " + UMBRAL_APOYOS_CONFIANZA + " apoyos para dar este paso.", "warn");
    return;
  }
  PIA.actualizar("obras", id, { mostrar_nombre: true, modo_identidad: "NOMBRE_VISIBLE", autor_publico: est.nombre });
  PIA.toast("Tu nombre ya aparece en la obra. Gracias por compartir tu talento.");
  pintarPortafolio();
}

/* Arranque de las páginas de la galería. */
document.addEventListener("DOMContentLoaded", function () {
  pintarSelectorEstudiante();
  if (document.getElementById("galeria")) pintarGaleria();
  if (document.getElementById("destacadas")) pintarInicio();
  if (document.getElementById("portafolio")) pintarPortafolio();
});
