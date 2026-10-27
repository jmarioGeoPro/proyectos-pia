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
var CLAVE_DATOS = "pia_alfabetizadores_lola";

/* Los datos de ejemplo. Se cargan solo la primera vez, cuando no hay nada.
   Son los mismos que están en la carpeta data/ del proyecto. */
var SEMILLA = {
  "estudiantes": [
    {
      "id": 1,
      "documento": "1035979039",
      "nombre": "Juan Sebastián Cardona Ríos",
      "grado": "11-1",
      "correo": "juan.cardona@lola.edu.co",
      "horas_aprobadas": 24,
      "estado": "EN_PROCESO"
    },
    {
      "id": 2,
      "documento": "1020118919",
      "nombre": "Salomé Restrepo Agudelo",
      "grado": "11-2",
      "correo": "salome.restrepo@lola.edu.co",
      "horas_aprobadas": 46,
      "estado": "EN_PROCESO"
    },
    {
      "id": 3,
      "documento": "1020261470",
      "nombre": "Andrés Mauricio Peña Lopera",
      "grado": "10-3",
      "correo": "andres.pena@lola.edu.co",
      "horas_aprobadas": 12,
      "estado": "EN_PROCESO"
    },
    {
      "id": 4,
      "documento": "1025380117",
      "nombre": "Valentina Ospina Herrera",
      "grado": "11-1",
      "correo": "valentina.ospina@lola.edu.co",
      "horas_aprobadas": 80,
      "estado": "COMPLETADO_80_HORAS"
    },
    {
      "id": 5,
      "documento": "1013463625",
      "nombre": "Samuel Restrepo Úsuga",
      "grado": "10-2",
      "correo": "samuel.restrepo@lola.edu.co",
      "horas_aprobadas": 8,
      "estado": "EN_PROCESO"
    },
    {
      "id": 6,
      "documento": "1059243429",
      "nombre": "Manuela Zapata Salgado",
      "grado": "11-2",
      "correo": "manuela.zapata@lola.edu.co",
      "horas_aprobadas": 62,
      "estado": "EN_PROCESO"
    }
  ],
  "oportunidades": [
    {
      "id": 1,
      "dependencia": "Biblioteca Escolar",
      "responsable": "Prof. Leidiana Gómez",
      "dias": "Lunes y miércoles · 12:30 a 14:30",
      "cupos_totales": 4,
      "cupos_disponibles": 2,
      "descripcion": "Acompañamiento en lectura guiada y organización de la colección infantil."
    },
    {
      "id": 2,
      "dependencia": "Secretaría Académica",
      "responsable": "Sra. Marta Lucía Benítez",
      "dias": "Martes y jueves · 07:00 a 09:00",
      "cupos_totales": 3,
      "cupos_disponibles": 1,
      "descripcion": "Archivo de matrículas, certificados y atención en ventanilla."
    },
    {
      "id": 3,
      "dependencia": "Restaurante Escolar (PAE)",
      "responsable": "Don Álvaro Mosquera",
      "dias": "Lunes a viernes · 10:00 a 12:00",
      "cupos_totales": 6,
      "cupos_disponibles": 4,
      "descripcion": "Apoyo en el servicio del restaurante y conteo de raciones."
    },
    {
      "id": 4,
      "dependencia": "Proyectos Ambientales",
      "responsable": "Prof. Diana Ospina",
      "dias": "Miércoles · 14:00 a 16:00",
      "cupos_totales": 5,
      "cupos_disponibles": 3,
      "descripcion": "Huerta escolar, siembra y campañas de la Ley Empatía."
    },
    {
      "id": 5,
      "dependencia": "Coordinación de Convivencia",
      "responsable": "Coord. Hernán Giraldo",
      "dias": "Viernes · 09:00 a 11:00",
      "cupos_totales": 2,
      "cupos_disponibles": 2,
      "descripcion": "Apoyo en la bitácora de convivencia y en las jornadas de mediación."
    },
    {
      "id": 6,
      "dependencia": "Deportes y Recreación",
      "responsable": "Prof. Camilo Restrepo",
      "dias": "Martes y jueves · 15:00 a 17:00",
      "cupos_totales": 4,
      "cupos_disponibles": 0,
      "descripcion": "Organización de torneos internos y préstamo de implementos."
    }
  ],
  "registros": [
    {
      "id": 1,
      "documento": "1035979039",
      "estudiante": "Juan Sebastián Cardona Ríos",
      "dependencia": "Biblioteca Escolar",
      "fecha": "2026-05-11",
      "hora_entrada": "12:30",
      "hora_salida": "14:30",
      "horas": 2,
      "labor": "Apoyo en lectura guiada a estudiantes de sexto",
      "estado": "APROBADO",
      "validador": "1030101010",
      "calificacion": 5,
      "observacion": "Muy puntual y paciente con los niños."
    },
    {
      "id": 2,
      "documento": "1035979039",
      "estudiante": "Juan Sebastián Cardona Ríos",
      "dependencia": "Biblioteca Escolar",
      "fecha": "2026-05-13",
      "hora_entrada": "12:30",
      "hora_salida": "14:00",
      "horas": 1.5,
      "labor": "Organización de la colección infantil",
      "estado": "APROBADO",
      "validador": "1030101010",
      "calificacion": 4,
      "observacion": "Buen trabajo de clasificación."
    },
    {
      "id": 3,
      "documento": "1020118919",
      "estudiante": "Salomé Restrepo Agudelo",
      "dependencia": "Restaurante Escolar (PAE)",
      "fecha": "2026-05-12",
      "hora_entrada": "10:00",
      "hora_salida": "12:00",
      "horas": 2,
      "labor": "Apoyo en el servicio del restaurante",
      "estado": "APROBADO",
      "validador": "1020202020",
      "calificacion": 5,
      "observacion": "Excelente actitud con los compañeros."
    },
    {
      "id": 4,
      "documento": "1020118919",
      "estudiante": "Salomé Restrepo Agudelo",
      "dependencia": "Restaurante Escolar (PAE)",
      "fecha": "2026-05-14",
      "hora_entrada": "10:00",
      "hora_salida": "12:00",
      "horas": 2,
      "labor": "Conteo de raciones del día",
      "estado": "PENDIENTE",
      "validador": "",
      "calificacion": 0,
      "observacion": ""
    },
    {
      "id": 5,
      "documento": "1020261470",
      "estudiante": "Andrés Mauricio Peña Lopera",
      "dependencia": "Secretaría Académica",
      "fecha": "2026-05-13",
      "hora_entrada": "07:00",
      "hora_salida": "09:00",
      "horas": 2,
      "labor": "Archivo de carpetas de matrícula",
      "estado": "PENDIENTE",
      "validador": "",
      "calificacion": 0,
      "observacion": ""
    },
    {
      "id": 6,
      "documento": "1013463625",
      "estudiante": "Samuel Restrepo Úsuga",
      "dependencia": "Proyectos Ambientales",
      "fecha": "2026-05-14",
      "hora_entrada": "14:00",
      "hora_salida": "16:00",
      "horas": 2,
      "labor": "Jornada de siembra en la huerta escolar",
      "estado": "PENDIENTE",
      "validador": "",
      "calificacion": 0,
      "observacion": ""
    },
    {
      "id": 7,
      "documento": "1025380117",
      "estudiante": "Valentina Ospina Herrera",
      "dependencia": "Biblioteca Escolar",
      "fecha": "2026-05-12",
      "hora_entrada": "12:30",
      "hora_salida": "14:30",
      "horas": 2,
      "labor": "Acompañamiento en la sala de lectura",
      "estado": "APROBADO",
      "validador": "1030101010",
      "calificacion": 5,
      "observacion": "Cumplió las 80 horas con excelente desempeño."
    }
  ],
  "novedades": [
    {
      "id": 1,
      "documento": "1020261470",
      "estudiante": "Andrés Mauricio Peña Lopera",
      "dependencia": "Secretaría Académica",
      "fecha": "2026-05-14",
      "motivo": "Incapacidad médica de un día",
      "estado": "VACANTE_POR_EXCUSA",
      "reemplazo": "",
      "publicado": "Publicado en la bolsa de reemplazos"
    },
    {
      "id": 2,
      "documento": "1013463625",
      "estudiante": "Samuel Restrepo Úsuga",
      "dependencia": "Proyectos Ambientales",
      "fecha": "2026-05-13",
      "motivo": "Cita médica en la mañana",
      "estado": "CUBIERTO",
      "reemplazo": "Salomé Restrepo Agudelo",
      "publicado": "Cubierto por Salomé Restrepo Agudelo"
    },
    {
      "id": 3,
      "documento": "1059243429",
      "estudiante": "Manuela Zapata Salgado",
      "dependencia": "Deportes y Recreación",
      "fecha": "2026-05-12",
      "motivo": "Viaje familiar autorizado",
      "estado": "CUBIERTO",
      "reemplazo": "Valentina Ospina Herrera",
      "publicado": "Cubierto por Valentina Ospina Herrera"
    },
    {
      "id": 4,
      "documento": "1020118919",
      "estudiante": "Salomé Restrepo Agudelo",
      "dependencia": "Restaurante Escolar (PAE)",
      "fecha": "2026-05-14",
      "motivo": "Cita odontológica",
      "estado": "VACANTE_POR_EXCUSA",
      "reemplazo": "",
      "publicado": "Publicado en la bolsa de reemplazos"
    },
    {
      "id": 5,
      "documento": "1020261470",
      "estudiante": "Andrés Mauricio Peña Lopera",
      "dependencia": "Biblioteca Escolar",
      "fecha": "2026-05-08",
      "motivo": "No pudo asistir por calamidad doméstica",
      "estado": "SIN_CUBRIR",
      "reemplazo": "",
      "publicado": "Nadie cubrió la vacante"
    }
  ],
  "inscripciones": [
    {
      "id": 1,
      "documento": "1035979039",
      "estudiante": "Juan Sebastián Cardona Ríos",
      "dependencia": "Biblioteca Escolar",
      "dia": "Lunes",
      "hora": "12:30 a 14:30",
      "estado": "ACTIVA",
      "fecha": "2026-02-16"
    },
    {
      "id": 2,
      "documento": "1020118919",
      "estudiante": "Salomé Restrepo Agudelo",
      "dependencia": "Restaurante Escolar (PAE)",
      "dia": "Martes",
      "hora": "10:00 a 12:00",
      "estado": "ACTIVA",
      "fecha": "2026-02-17"
    },
    {
      "id": 3,
      "documento": "1025380117",
      "estudiante": "Valentina Ospina Herrera",
      "dependencia": "Biblioteca Escolar",
      "dia": "Miércoles",
      "hora": "12:30 a 14:30",
      "estado": "ACTIVA",
      "fecha": "2026-02-18"
    },
    {
      "id": 4,
      "documento": "1059243429",
      "estudiante": "Manuela Zapata Salgado",
      "dependencia": "Deportes y Recreación",
      "dia": "Jueves",
      "hora": "15:00 a 17:00",
      "estado": "ACTIVA",
      "fecha": "2026-02-19"
    },
    {
      "id": 5,
      "documento": "1020261470",
      "estudiante": "Andrés Mauricio Peña Lopera",
      "dependencia": "Secretaría Académica",
      "dia": "Miércoles",
      "hora": "07:00 a 09:00",
      "estado": "ACTIVA",
      "fecha": "2026-02-20"
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
  "codigo": "PIA-2026-10-LG-Alfabetizadores-Lola",
  "palabrasClave": [
    "servicio social",
    "80 horas",
    "alfabetización",
    "cupos y sedes",
    "paz y salvo"
  ],
  "objetivo": "Desarrollar el prototipo funcional de la aplicación web Alfabetizadores Lola para centralizar la publicación de cupos, el conteo automatizado de las 80 horas de servicio social y la validación de jornadas en las sedes de alfabetización de la I.E. Lola González, utilizando HTML5, CSS3 y JavaScript ES6+.",
  "especificos": [
    "Especificar el flujo de inscripción, validación de jornadas y paz y salvo.",
    "Diseñar el panel del estudiante, la bolsa de cupos y el validador de sede.",
    "Construir el registro de horas con doble validación y constancia imprimible.",
    "Programar la coordinación de sedes, cupos y solicitudes docentes.",
    "Verificar con pruebas y documentar el informe técnico final."
  ],
  "normativa": "Constitución Política art. 41 · Ley 115 de 1994 · Resolución 4210 de 1996 · Ley 2383 de 2024"
};
PIA.equipo = [
  {
    "nombre": "Isabel Dahyana Mesa Echavarría",
    "rol": "Product Owner · enlace con la docente encargada del servicio social"
  },
  {
    "nombre": "Ana Sofía Alarcón Botero",
    "rol": "Scrum Master · cronograma, requisitos y validación con dependencias"
  },
  {
    "nombre": "Ismael Zapata Luján",
    "rol": "Líder lógica JS · motor de horas, validación doble y bolsa de reemplazos"
  },
  {
    "nombre": "Ismael Rivera Ciro",
    "rol": "Líder UI/UX · vistas azul, blanco y amarillo"
  },
  {
    "nombre": "Juan José Restrepo Bedoya",
    "rol": "Datos y reportes · constancias imprimibles y base de datos"
  }
];
PIA.construccion = {
  "algoritmo": [
    "ALGORITMO Gestionar_Jornada_Y_Conteo_80Horas_AlfabetizadoresLola CONSTANTES: META_HORAS_LEY = 80 ENTRADAS: id_estudiante, id_cupo_sede, tipo_accion ('REGISTRAR_ASISTENCIA' | 'REPORTAR_INASISTENCIA'), hora_entrada, hora_salida, descripcion_labor, id_supervisor_validador, calificacion_desempeno (1..5) PROCESO:",
    "  1. estudiante <- ObtenerPerfilAlfabetizador(id_estudiante)",
    "  2. SI tipo_accion == 'REPORTAR_INASISTENCIA' ENTONCES",
    "       CambiarEstadoTurno(id_cupo_sede, FechaActual(), \"VACANTE_POR_EXCUSA\")",
    "       PublicarEnBolsaDeReemplazos(id_cupo_sede, FechaActual(), \"¡Cupo urgente hoy por reemplazo!\")",
    "       NotificarCoordinadora(\"El estudiante \" + estudiante.nombre + \" reportó excusa. Turno abierto a reemplazo.\")",
    "       RETORNAR Confirmacion(\"Novedad registrada a tiempo. Se activó la bolsa de reemplazos.\")",
    "  3. SI tipo_accion == 'REGISTRAR_ASISTENCIA' ENTONCES",
    "       horas_jornada <- CalcularDiferenciaHoras(hora_salida, hora_entrada)",
    "       SI horas_jornada <= 0 O horas_jornada > 6 ENTONCES",
    "         RETORNAR Error(\"Rango horario inválido: verifica la hora de entrada y salida.\")",
    "       CrearRegistroPendiente(id_estudiante, id_cupo_sede, horas_jornada, descripcion_labor, \"PENDIENTE_FIRMA_DIGITAL\")",
    "       // Cuando el docente/bibliotecario supervisor revisa y aprueba en su panel:",
    "       SI SupervisorAprueba(id_supervisor_validador) == VERDADERO ENTONCES",
    "         estudiante.horas_aprobadas <- estudiante.horas_aprobadas + horas_jornada",
    "         horas_faltantes <- Maximo(0, META_HORAS_LEY - estudiante.horas_aprobadas)",
    "         porcentaje_avance <- Minimo(100, (estudiante.horas_aprobadas / META_HORAS_LEY) * 100)",
    "         GuardarEvaluacionSupervisor(id_estudiante, id_supervisor_validador, calificacion_desempeno)",
    "         SI estudiante.horas_aprobadas >= META_HORAS_LEY ENTONCES",
    "           estudiante.estado_paz_y_salvo <- \"COMPLETADO_80_HORAS\"",
    "           HabilitarCertificadoPDF(id_estudiante) SALIDAS: Horas aprobadas acumuladas, horas faltantes, barra de porcentaje y estado de Paz y Salvo."
  ],
  "tablas": [
    {
      "nombre": "usuarios",
      "campos": "id_usuario (PK), documento_ti (UNIQUE), nombre_completo, correo, grado_grupo, rol"
    },
    {
      "nombre": "sedes_oportunidades",
      "campos": "id_oportunidad (PK), nombre_dependencia (Biblioteca, Secretaría, PAE, Ambiental/Empatía), id_responsable (FK), dias_horario, cupos_totales, cupos_disponibles."
    },
    {
      "nombre": "registros_horas",
      "campos": "id_registro (PK), id_estudiante (FK), id_oportunidad (FK), fecha, hora_entrada, hora_salida, horas_calculadas, reflexion_estudiante, estado 6. Hoja de Ruta por Fases y Bibliografía Verificada (APA 7.ª Edición) Siguiendo las recomendaciones de nuestra Lista de Deseos v2.0, estructuramos la ejecución en tres fases realistas: Fase 1 — MVP Grado 10° (2026): prototipo FrontEnd completo con vistas por rol,"
    }
  ]
};

/* ==========================================================================
   EXTRAS COMUNES — Alfabetizadores Lola
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
  enlace.download = 'Alfabetizadores Lola-' + tabla + '-' + PIA.hoy() + '.csv';
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
  var cuerpo = '<div class="aviso"><b>Esta es la aplicación de Alfabetizadores Lola.</b> Todo lo que hagas se guarda en tu navegador.</div>' +
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
   conteo-horas.js
   --------------------------------------------------------------------------
   El corazón del proyecto: la meta legal de 80 horas, el cálculo de cada
   jornada y la barra de avance del estudiante.
   Traduce el algoritmo Gestionar_Jornada_Y_Conteo_80Horas_AlfabetizadoresLola
   en su rama REGISTRAR_ASISTENCIA.
   ========================================================================== */

'use strict';

/* La meta del servicio social estudiantil (Resolución 4210 de 1996). */
var META_HORAS_LEY = 80;

/* Ninguna jornada puede pasar de seis horas. */
var MAX_HORAS_JORNADA = 6;

/* Los estados por los que pasa un registro de horas. */
var ESTADOS_REGISTRO = ['PENDIENTE', 'APROBADO', 'RECHAZADO'];

/** Busca un alfabetizador por su documento. */
function buscarEstudiante(documento) {
  var doc = String(documento || '').trim();
  return PIA.listar('estudiantes').filter(function (x) { return String(x.documento) === doc; })[0] || null;
}

/** Las horas aprobadas que lleva un estudiante. */
function horasAprobadas(documento) {
  var est = buscarEstudiante(documento);
  return est ? Number(est.horas_aprobadas || 0) : 0;
}

/** Cuántas horas le faltan para las 80. */
function horasFaltantes(horas) {
  return Math.max(0, META_HORAS_LEY - Number(horas || 0));
}

/** El porcentaje de avance, sin pasarse de 100. */
function porcentajeAvance(horas) {
  return Math.min(100, Math.round(Number(horas || 0) / META_HORAS_LEY * 100));
}

/** El estado de paz y salvo según las horas acumuladas. */
function estadoPazYSalvo(horas) {
  return Number(horas || 0) >= META_HORAS_LEY ? 'COMPLETADO_80_HORAS' : 'EN_PROCESO';
}

/** Etiqueta de color de un registro de horas. */
function badgeRegistro(e) {
  var clase = e === 'APROBADO' ? 'ok' : e === 'RECHAZADO' ? 'mal' : 'warn';
  var texto = e === 'APROBADO' ? 'APROBADO' : e === 'RECHAZADO' ? 'RECHAZADO' : 'PENDIENTE DE FIRMA';
  return '<span class="badge ' + clase + '">' + texto + '</span>';
}

/** Convierte una hora HH:MM en minutos desde la medianoche. */
function minutosDeHora(hora) {
  var p = String(hora || '0:0').split(':');
  return Number(p[0]) * 60 + Number(p[1] || 0);
}

/** Calcula las horas de una jornada entre la entrada y la salida. */
function calcularHoras(entrada, salida) {
  var minutos = minutosDeHora(salida) - minutosDeHora(entrada);
  return Math.round(minutos / 60 * 100) / 100;
}

/** Los registros de un estudiante, del más reciente al más viejo. */
function registrosDe(documento) {
  var doc = String(documento || '').trim();
  return PIA.listar('registros').filter(function (x) { return String(x.documento) === doc; })
    .sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });
}

/** Los registros pendientes de firma de una dependencia. */
function registrosPendientes(dependencia) {
  return PIA.listar('registros').filter(function (x) {
    if (x.estado !== 'PENDIENTE') return false;
    if (dependencia && x.dependencia !== dependencia) return false;
    return true;
  });
}

/** La inscripción activa de un estudiante (su sede y su horario). */
function inscripcionDe(documento) {
  var doc = String(documento || '').trim();
  return PIA.listar('inscripciones').filter(function (x) {
    return String(x.documento) === doc && x.estado === 'ACTIVA';
  })[0] || null;
}

/** Registra una jornada nueva: queda pendiente de la firma del supervisor. */
function registrarAsistencia() {
  var caja = document.getElementById('resultadoRegistro');
  var documento = PIA.valor('gDocumento');
  var sede = PIA.valor('rSede');
  var fecha = PIA.valor('rFecha');
  var entrada = PIA.valor('rEntrada');
  var salida = PIA.valor('rSalida');
  var labor = PIA.valor('rLabor');

  function avisar(tipo, html) {
    if (caja) caja.innerHTML = '<div class="aviso ' + tipo + '">' + html + '</div>';
  }

  if (!documento) { avisar('mal', 'Primero busca tu perfil con el documento.'); return null; }
  var est = buscarEstudiante(documento);
  if (!est) { avisar('mal', 'No encontramos a ningún alfabetizador con ese documento.'); return null; }
  if (!sede) { avisar('mal', 'Elige la dependencia donde hiciste la jornada.'); return null; }
  if (!fecha) { avisar('mal', 'Escribe la fecha de la jornada.'); return null; }
  if (fecha > PIA.hoy()) { avisar('mal', 'La fecha no puede ser futura.'); return null; }
  if (!entrada || !salida) { avisar('mal', 'Escribe la hora de entrada y la de salida.'); return null; }

  /* paso 3 del algoritmo: la jornada debe durar entre 0 y 6 horas */
  var horas = calcularHoras(entrada, salida);
  if (horas <= 0 || horas > MAX_HORAS_JORNADA) {
    avisar('mal', 'Rango horario inválido: verifica la hora de entrada y salida. La jornada debe durar entre 1 minuto y ' + MAX_HORAS_JORNADA + ' horas.');
    return null;
  }
  if (PIA.palabras(labor) < 4) { avisar('mal', 'Describe la labor realizada con al menos 4 palabras.'); return null; }

  var registro = PIA.insertar('registros', {
    documento: est.documento, estudiante: est.nombre, dependencia: sede, fecha: fecha,
    hora_entrada: entrada, hora_salida: salida, horas: horas, labor: labor,
    estado: 'PENDIENTE', validador: '', calificacion: 0, observacion: ''
  });

  avisar('ok', 'Jornada registrada: <b>' + horas + ' horas</b> en ' + PIA.esc(sede) +
    '. Queda <b>pendiente de la firma digital</b> del supervisor de la dependencia.');
  PIA.toast('Jornada registrada: ' + horas + ' horas pendientes de firma.');
  pintarPanelEstudiante();
  pintarValidador();
  pintarAdminCoordinadora();
  return registro;
}

/** Pinta el panel del estudiante con su barra de avance. */
function pintarPanelEstudiante() {
  var cont = document.getElementById('panel');
  if (!cont) return;
  var doc = PIA.valor('gDocumento');
  if (!doc) { cont.innerHTML = ''; return; }
  var est = buscarEstudiante(doc);
  if (!est) {
    cont.innerHTML = '<div class="aviso mal">No encontramos un alfabetizador con el documento <b>' + PIA.esc(doc) + '</b>.</div>';
    return;
  }

  var horas = horasAprobadas(doc);
  var pct = porcentajeAvance(horas);
  var faltan = horasFaltantes(horas);
  var registros = registrosDe(doc);
  var pendientes = registros.filter(function (x) { return x.estado === 'PENDIENTE'; }).length;
  var mio = inscripcionDe(doc);

  var html = '<section class="tarjeta">';
  html += '<div class="fila" style="justify-content:space-between">';
  html += '<div><h2>' + PIA.esc(est.nombre) + '</h2>' +
    '<p class="ayuda" style="margin:0">' + PIA.esc(est.grado) + ' · ' + PIA.esc(est.correo) + '</p></div>';
  html += '<div>' + (estadoPazYSalvo(horas) === 'COMPLETADO_80_HORAS'
    ? '<span class="badge ok">PAZ Y SALVO · 80 HORAS</span>'
    : '<span class="badge warn">EN PROCESO</span>') + '</div>';
  html += '</div>';

  html += '<div class="fila" style="justify-content:space-between;margin:16px 0 5px">';
  html += '<b>' + horas + ' / ' + META_HORAS_LEY + ' horas aprobadas</b><b>' + pct + '%</b></div>';
  html += '<div class="barra" style="height:16px"><i style="width:' + pct + '%"></i></div>';

  html += '<div class="indicadores" style="margin-top:16px;grid-template-columns:repeat(4,1fr)">';
  html += '<div class="indicador"><b>Aprobadas</b><strong>' + horas + '</strong><span>horas</span></div>';
  html += '<div class="indicador"><b>Faltan</b><strong>' + faltan + '</strong><span>para las 80</span></div>';
  html += '<div class="indicador"><b>Por firmar</b><strong>' + pendientes + '</strong><span>registros</span></div>';
  html += '<div class="indicador"><b>Avance</b><strong>' + pct + '%</strong><span>de la meta</span></div>';
  html += '</div>';

  html += '<p class="pequeno gris">' + (mio
    ? 'Tu sede asignada es <b>' + PIA.esc(mio.dependencia) + '</b> (' + PIA.esc(mio.dia) + ' · ' + PIA.esc(mio.hora) + ').'
    : 'Todavía no tienes una sede asignada. Busca un cupo en <a href="oportunidades-sedes.html">Oportunidades y sedes</a>.') + '</p>';
  html += '</section>';

  html += '<section class="tarjeta"><h2>Mis registros de horas</h2>' +
    '<p class="ayuda">Cada jornada queda pendiente hasta que el supervisor de la dependencia la firma.</p>';
  html += PIA.tabla(
    ['Fecha', 'Dependencia', 'Entrada', 'Salida', 'Horas', 'Labor', 'Estado', 'Calificación'],
    registros.map(function (r) {
      return [
        PIA.fecha(r.fecha),
        PIA.esc(r.dependencia),
        PIA.esc(r.hora_entrada),
        PIA.esc(r.hora_salida),
        '<b>' + r.horas + '</b>',
        PIA.esc(r.labor),
        badgeRegistro(r.estado),
        Number(r.calificacion) > 0 ? Number(r.calificacion) + ' / 5' : '—'
      ];
    }),
    { vacio: 'Todavía no has registrado ninguna jornada.' }
  );
  html += '</section>';

  html += '<div class="rejilla g2">';
  html += '<section class="tarjeta"><h2>Registrar una jornada</h2>' +
    '<p class="ayuda">Registra el día trabajado; la coordinadora y el supervisor lo verifican.</p>';
  html += '<div class="campo"><label for="rSede">Dependencia</label><select id="rSede"><option value="">— Seleccione —</option>' +
    PIA.listar('oportunidades').map(function (o) {
      return '<option>' + PIA.esc(o.dependencia) + '</option>';
    }).join('') + '</select></div>';
  html += '<div class="rejilla g2">';
  html += '<div class="campo"><label for="rFecha">Fecha</label><input type="date" id="rFecha" value="' + PIA.hoy() + '"></div>';
  html += '<div class="campo"><label for="rEntrada">Hora de entrada</label><input type="time" id="rEntrada" value="12:30"></div>';
  html += '</div>';
  html += '<div class="rejilla g2">';
  html += '<div class="campo"><label for="rSalida">Hora de salida</label><input type="time" id="rSalida" value="14:30"></div>';
  html += '<div class="campo"><label for="rLabor">Labor realizada</label><input id="rLabor" placeholder="Apoyo en lectura guiada a 6°"></div>';
  html += '</div>';
  html += '<button class="btn p" onclick="registrarAsistencia()">Registrar la jornada</button>';
  html += '<div id="resultadoRegistro" style="margin-top:12px"></div>';
  html += '</section>';

  html += '<section class="tarjeta"><h2>Mi constancia</h2>' +
    '<p class="ayuda">Al completar las 80 horas se habilita la constancia imprimible.</p>';
  html += '<p class="pequeno">Horas aprobadas: <b>' + horas + ' / ' + META_HORAS_LEY + '</b></p>';
  html += '<div class="barra" style="margin:8px 0 12px"><i style="width:' + pct + '%"></i></div>';
  html += '<button class="btn ' + (horas >= META_HORAS_LEY ? 'p' : '') + '" onclick="generarConstancia()"' +
    (horas >= META_HORAS_LEY ? '' : ' disabled') + '>Ver la constancia</button>';
  html += '<p class="pista" style="margin-top:8px">' + (horas >= META_HORAS_LEY
    ? 'Cumpliste la meta: puedes imprimir tu constancia preliminar.'
    : 'Te faltan ' + faltan + ' horas para habilitarla.') + '</p>';
  html += '</section></div>';

  cont.innerHTML = html;
}

/** Carga un documento de ejemplo en el panel. */
function verEjemploPanel() {
  PIA.poner('gDocumento', '1035979039');
  pintarPanelEstudiante();
}

/** Busca el panel de un estudiante y lo pinta. */
function consultarPanel() {
  var doc = PIA.valor('gDocumento');
  if (!doc) { PIA.toast('Escribe tu documento para consultar el panel.', 'mal'); return; }
  pintarPanelEstudiante();
}

/* Arranque del panel del estudiante. */
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('panel') && PIA.parametro('documento')) {
    PIA.poner('gDocumento', PIA.parametro('documento'));
    pintarPanelEstudiante();
  }
});