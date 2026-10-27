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
var CLAVE_DATOS = "pia_inventory_school";

/* Los datos de ejemplo. Se cargan solo la primera vez, cuando no hay nada.
   Son los mismos que están en la carpeta data/ del proyecto. */
var SEMILLA = {
  "implementos": [
    {
      "id": 1,
      "codigo_qr": "QR-FUT-0001",
      "nombre": "Balón de fútbol N°5",
      "deporte": "Fútbol",
      "ubicacion": "Bodega de Educación Física · estante 1",
      "estado_fisico": "Excelente",
      "disponibilidad": "DISPONIBLE",
      "cantidad": 1,
      "fecha_ingreso": "2025-02-10",
      "veces_prestado": 34
    },
    {
      "id": 2,
      "codigo_qr": "QR-MIC-0002",
      "nombre": "Balón de microfútbol N°4",
      "deporte": "Microfútbol",
      "ubicacion": "Bodega de Educación Física · estante 1",
      "estado_fisico": "Bueno",
      "disponibilidad": "PRESTADO",
      "cantidad": 1,
      "fecha_ingreso": "2025-02-10",
      "veces_prestado": 41
    },
    {
      "id": 3,
      "codigo_qr": "QR-BAL-0003",
      "nombre": "Balón de baloncesto N°7",
      "deporte": "Baloncesto",
      "ubicacion": "Bodega de Educación Física · estante 2",
      "estado_fisico": "Excelente",
      "disponibilidad": "PRESTADO",
      "cantidad": 1,
      "fecha_ingreso": "2025-03-04",
      "veces_prestado": 28
    },
    {
      "id": 4,
      "codigo_qr": "QR-VOL-0004",
      "nombre": "Balón de voleibol",
      "deporte": "Voleibol",
      "ubicacion": "Bodega de Educación Física · estante 2",
      "estado_fisico": "Bueno",
      "disponibilidad": "DISPONIBLE",
      "cantidad": 1,
      "fecha_ingreso": "2025-03-04",
      "veces_prestado": 19
    },
    {
      "id": 5,
      "codigo_qr": "QR-TEN-0005",
      "nombre": "Par de raquetas de tenis de mesa",
      "deporte": "Tenis de Mesa",
      "ubicacion": "Bodega de Educación Física · cajón 3",
      "estado_fisico": "Deteriorado",
      "disponibilidad": "EN_MANTENIMIENTO",
      "cantidad": 2,
      "fecha_ingreso": "2024-09-18",
      "veces_prestado": 52
    },
    {
      "id": 6,
      "codigo_qr": "QR-AJE-0006",
      "nombre": "Juego de ajedrez con tablero",
      "deporte": "Ajedrez",
      "ubicacion": "Biblioteca · armario bajo",
      "estado_fisico": "Excelente",
      "disponibilidad": "DISPONIBLE",
      "cantidad": 1,
      "fecha_ingreso": "2025-04-22",
      "veces_prestado": 12
    },
    {
      "id": 7,
      "codigo_qr": "QR-PET-0007",
      "nombre": "Petos de fútbol (paquete de 10)",
      "deporte": "Recreación",
      "ubicacion": "Bodega de Educación Física · caja 4",
      "estado_fisico": "Bueno",
      "disponibilidad": "DISPONIBLE",
      "cantidad": 10,
      "fecha_ingreso": "2025-05-06",
      "veces_prestado": 23
    },
    {
      "id": 8,
      "codigo_qr": "QR-FUT-0008",
      "nombre": "Balón de fútbol N°4 desinflado",
      "deporte": "Fútbol",
      "ubicacion": "Bodega de Educación Física · estante 3",
      "estado_fisico": "Roto",
      "disponibilidad": "DADO_DE_BAJA",
      "cantidad": 1,
      "fecha_ingreso": "2023-08-14",
      "veces_prestado": 77
    }
  ],
  "estudiantes": [
    {
      "id": 1,
      "documento": "1020118919",
      "nombre": "Juan Miguel Restrepo Suárez",
      "grado": "10-3",
      "telefono": "300 512 4471",
      "sancion_hasta": ""
    },
    {
      "id": 2,
      "documento": "1013463625",
      "nombre": "Manuela Oquendo Álvarez",
      "grado": "10-1",
      "telefono": "311 480 2290",
      "sancion_hasta": ""
    },
    {
      "id": 3,
      "documento": "1025380117",
      "nombre": "Jerónimo Zapata Saldarriaga",
      "grado": "10-3",
      "telefono": "304 226 7781",
      "sancion_hasta": "2026-12-15"
    },
    {
      "id": 4,
      "documento": "1059243429",
      "nombre": "Laura Sofía Betancur Ríos",
      "grado": "11-2",
      "telefono": "320 447 1188",
      "sancion_hasta": ""
    },
    {
      "id": 5,
      "documento": "1025895982",
      "nombre": "Kevin Andrés Montoya Henao",
      "grado": "10-2",
      "telefono": "312 900 4453",
      "sancion_hasta": ""
    },
    {
      "id": 6,
      "documento": "1020226147",
      "nombre": "Valeria Cuervo Palacio",
      "grado": "11-1",
      "telefono": "301 776 6620",
      "sancion_hasta": ""
    }
  ],
  "prestamos": [
    {
      "id": 1,
      "codigo_qr": "QR-MIC-0002",
      "documento": "1020118919",
      "estudiante": "Juan Miguel Restrepo Suárez",
      "grado": "10-3",
      "fecha_salida": "2026-05-18",
      "hora_salida": "09:40",
      "hora_limite": "10:10",
      "fecha_devolucion": "",
      "hora_devolucion": "",
      "estado": "ACTIVO",
      "estado_entrega": "Bueno",
      "estado_recibo": "",
      "observacion": "Préstamo del primer descanso."
    },
    {
      "id": 2,
      "codigo_qr": "QR-BAL-0003",
      "documento": "1013463625",
      "estudiante": "Manuela Oquendo Álvarez",
      "grado": "10-1",
      "fecha_salida": "2026-05-18",
      "hora_salida": "09:42",
      "hora_limite": "10:12",
      "fecha_devolucion": "",
      "hora_devolucion": "",
      "estado": "ACTIVO",
      "estado_entrega": "Excelente",
      "estado_recibo": "",
      "observacion": ""
    },
    {
      "id": 3,
      "codigo_qr": "QR-FUT-0001",
      "documento": "1025895982",
      "estudiante": "Kevin Andrés Montoya Henao",
      "grado": "10-2",
      "fecha_salida": "2026-05-15",
      "hora_salida": "11:05",
      "hora_limite": "11:35",
      "fecha_devolucion": "2026-05-15",
      "hora_devolucion": "11:31",
      "estado": "CERRADO",
      "estado_entrega": "Excelente",
      "estado_recibo": "Bueno",
      "observacion": "Devolución a tiempo."
    },
    {
      "id": 4,
      "codigo_qr": "QR-VOL-0004",
      "documento": "1025380117",
      "estudiante": "Jerónimo Zapata Saldarriaga",
      "grado": "10-3",
      "fecha_salida": "2026-05-14",
      "hora_salida": "09:38",
      "hora_limite": "10:08",
      "fecha_devolucion": "2026-05-14",
      "hora_devolucion": "10:46",
      "estado": "CERRADO",
      "estado_entrega": "Bueno",
      "estado_recibo": "Bueno",
      "observacion": "Devolución tardía: se aplicó bloqueo de 3 días."
    },
    {
      "id": 5,
      "codigo_qr": "QR-TEN-0005",
      "documento": "1059243429",
      "estudiante": "Laura Sofía Betancur Ríos",
      "grado": "11-2",
      "fecha_salida": "2026-05-13",
      "hora_salida": "15:10",
      "hora_limite": "15:40",
      "fecha_devolucion": "2026-05-13",
      "hora_devolucion": "15:28",
      "estado": "CERRADO",
      "estado_entrega": "Bueno",
      "estado_recibo": "Roto",
      "observacion": "La raqueta llegó partida; pasa a mantenimiento."
    },
    {
      "id": 6,
      "codigo_qr": "QR-AJE-0006",
      "documento": "1020226147",
      "estudiante": "Valeria Cuervo Palacio",
      "grado": "11-1",
      "fecha_salida": "2026-05-12",
      "hora_salida": "12:20",
      "hora_limite": "12:50",
      "fecha_devolucion": "2026-05-12",
      "hora_devolucion": "12:41",
      "estado": "CERRADO",
      "estado_entrega": "Excelente",
      "estado_recibo": "Excelente",
      "observacion": ""
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
  "codigo": "PIA-2026-10-LG-Inventory-School",
  "palabrasClave": [
    "inventario deportivo",
    "préstamo QR",
    "devolución",
    "mantenimiento",
    "bodega"
  ],
  "objetivo": "Desarrollar el prototipo funcional de la aplicación web Inventory School para gestionar el inventario, el préstamo mediante código QR y el control de devoluciones de los implementos deportivos de la I.E. Lola González, utilizando HTML5, CSS3 y JavaScript ES6+ con proyección a PHP y MySQL.",
  "especificos": [
    "Definir el catálogo de implementos, sus estados y las reglas de préstamo.",
    "Diseñar el catálogo, el escáner de préstamo, el perfil y el panel de inventario.",
    "Programar el registro de préstamo y devolución con control de tiempo.",
    "Construir el tablero de disponibilidad, mantenimiento y bajas.",
    "Verificar con pruebas de escritorio y documentar el manual."
  ],
  "normativa": "Ley 181 de 1995 (deporte) · Ley 1581 de 2012"
};
PIA.equipo = [
  {
    "nombre": "Juan Camilo Gómez Soto",
    "rol": "Product Owner · visión funcional y enlace con Educación Física"
  },
  {
    "nombre": "Mateo Amariles Osorio",
    "rol": "Scrum Master y QR · etiquetas de los implementos y pruebas de usuario"
  },
  {
    "nombre": "John Edison Cardona López",
    "rol": "Líder lógica JS · motor de préstamo, mora y bloqueo pedagógico"
  },
  {
    "nombre": "José Alejandro Monsalve Quintero",
    "rol": "Líder UI/UX · catálogo visual y semáforo de estado físico"
  },
  {
    "nombre": "Samuel Ospina Betancur",
    "rol": "Base de datos y documentos · modelo MySQL y reporte de daños"
  }
];
PIA.construccion = {
  "algoritmo": [
    "ALGORITMO Gestionar_Prestamo_Y_Devolucion_QR_InventorySchool ENTRADAS: accion ('SOLICITAR_PRESTAMO' | 'REGISTRAR_DEVOLUCION'), doc_estudiante (Cadena), codigo_qr_implemento (Cadena), estado_fisico_reportado (Cadena) CONSTANTES: TIEMPO_MAX_DESCANSO_MIN = 30, DIAS_BLOQUEO_POR_MORA = 3 PROCESO:",
    "  1. estudiante <- BuscarUsuario(doc_estudiante)",
    "  2. implemento <- BuscarImplementoPorQR(codigo_qr_implemento)",
    "  3. SI accion == 'SOLICITAR_PRESTAMO' ENTONCES",
    "       SI estudiante.sancion_activa_hasta > FechaActual() ENTONCES",
    "         RETORNAR Error(\"Préstamo bloqueado hasta \" + estudiante.sancion_activa_hasta + \" por retraso previo.\")",
    "       SI estudiante.tiene_prestamo_abierto == VERDADERO ENTONCES",
    "         RETORNAR Error(\"Debes devolver primero el implemento que tienes en préstamo activo.\")",
    "       SI implemento.estado_disponibilidad != 'DISPONIBLE' ENTONCES",
    "         RETORNAR Error(\"El implemento \" + implemento.nombre + \" no está disponible actualmente.\")",
    "       // Registrar préstamo exitoso:",
    "       implemento.estado_disponibilidad <- 'PRESTADO'",
    "       hora_limite <- SumarMinutos(HoraActual(), TIEMPO_MAX_DESCANSO_MIN)",
    "       CrearRegistroPrestamo(doc_estudiante, codigo_qr_implemento, HoraActual(), hora_limite, estado_fisico_reportado)",
    "       RETORNAR Confirmacion(\"Préstamo exitoso de \" + implemento.nombre + \". Devuélvelo antes de las \" + hora_limite)",
    "  4. SI accion == 'REGISTRAR_DEVOLUCION' ENTONCES",
    "       prestamo <- ObtenerPrestamoActivo(codigo_qr_implemento)",
    "       CerrarPrestamo(prestamo.id, HoraActual(), estado_fisico_reportado)",
    "       SI estado_fisico_reportado == 'ROTO' ENTONCES implemento.estado_disponibilidad <- 'EN_MANTENIMIENTO'",
    "       SINO implemento.estado_disponibilidad <- 'DISPONIBLE'",
    "       SI HoraActual() > prestamo.hora_limite ENTONCES",
    "         estudiante.sancion_activa_hasta <- SumarDias(FechaActual(), DIAS_BLOQUEO_POR_MORA)",
    "         RETORNAR Alerta(\"Devolución tardía registrada. Se aplica bloqueo pedagógico temporal de 3 días.\")",
    "       RETORNAR Confirmacion(\"Devolución exitosa. ¡Gracias por cuidar los implementos de la Lola!\")"
  ],
  "tablas": [
    {
      "nombre": "usuarios",
      "campos": "id_usuario (PK), documento_ti (UNIQUE), nombre_completo, grado_grupo, telefono, rol"
    },
    {
      "nombre": "categorias_deporte",
      "campos": "id_categoria (PK), nombre_deporte (Fútbol, Baloncesto, Voleibol, Tenis de Mesa, Ajedrez), icono_svg."
    },
    {
      "nombre": "implementos_activos",
      "campos": "id_implemento (PK), codigo_qr (UNIQUE), nombre_articulo, id_categoria disponibilidad ('Disponible','Prestado','Mantenimiento'), fecha_ingreso."
    },
    {
      "nombre": "prestamos_movimientos",
      "campos": "id_prestamo (PK), id_implemento (FK), id_estudiante (FK), id_docente_autoriza (FK), fecha_hora_salida, fecha_hora_limite, fecha_hora_devolucion, estado_entrega, estado_recibo, observacion. 6. Cronograma SCRUM y Referencias Bibliográficas (APA 7.ª Edición) Nuestro cronograma de 39 semanas lectivas cubre: Semanas 1–5 (UA01): diagnóstico de pérdida de implementos deportivos y levantamiento de inventario inicial; Semanas 6–15 (UA02): diseño"
    }
  ]
};

/* ==========================================================================
   EXTRAS COMUNES — Inventory School
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
  enlace.download = 'Inventory School-' + tabla + '-' + PIA.hoy() + '.csv';
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
  var cuerpo = '<div class="aviso"><b>Esta es la aplicación de Inventory School.</b> Todo lo que hagas se guarda en tu navegador.</div>' +
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
   inventario-crud.js
   --------------------------------------------------------------------------
   El almacén de los implementos deportivos: crear, editar, reparar, dar de
   baja y generar la etiqueta QR única de cada activo.
   Es el paso 2 del algoritmo Gestionar_Prestamo_Y_Devolucion_QR: sin código
   QR no hay forma de identificar el balón que sale de la bodega.
   ========================================================================== */

'use strict';

/* Los deportes que se practican en los descansos de la Lola. */
var DEPORTES = ['Fútbol', 'Microfútbol', 'Baloncesto', 'Voleibol', 'Tenis de Mesa', 'Ajedrez', 'Recreación'];

/* La escala de estado físico del activo. */
var ESTADOS_FISICOS = ['Excelente', 'Bueno', 'Deteriorado', 'Roto'];

/* Los cuatro estados formales de disponibilidad (EAM / WMS). */
var DISPONIBILIDADES = ['DISPONIBLE', 'PRESTADO', 'EN_MANTENIMIENTO', 'DADO_DE_BAJA'];

/* Guarda el id del implemento que se está editando, o null si es nuevo. */
var implementoEnEdicion = null;

/** Pinta la disponibilidad como etiqueta de color. */
function badgeDisponibilidad(d) {
  var clase = d === 'DISPONIBLE' ? 'ok' : d === 'PRESTADO' ? 'info' : d === 'EN_MANTENIMIENTO' ? 'warn' : 'mal';
  return '<span class="badge ' + clase + '">' + String(d || '').replace(/_/g, ' ') + '</span>';
}

/** Pinta el estado físico como etiqueta de color. */
function badgeFisico(e) {
  var clase = e === 'Excelente' ? 'ok' : e === 'Bueno' ? 'info' : e === 'Deteriorado' ? 'warn' : 'mal';
  return '<span class="badge ' + clase + '">' + PIA.esc(e) + '</span>';
}

/** El color del semáforo de un implemento. */
function colorSemaforo(it) {
  if (it.disponibilidad === 'DISPONIBLE') return 'ok';
  if (it.disponibilidad === 'PRESTADO') return 'info';
  if (it.disponibilidad === 'EN_MANTENIMIENTO') return 'warn';
  return 'mal';
}

/** Las tres primeras letras del deporte, para el código QR. */
function prefijoDeporte(deporte) {
  var limpio = PIA.normalizar(deporte).replace(/[^a-z]/g, '');
  return (limpio.slice(0, 3) || 'gen').toUpperCase();
}

/** Genera el siguiente código QR único de un implemento. */
function codigoQRNuevo(deporte) {
  return PIA.codigo('QR-' + prefijoDeporte(deporte) + '-', 'implementos', 'codigo_qr');
}

/** Devuelve un implemento por su id. */
function buscarImplemento(id) {
  return PIA.listar('implementos').filter(function (x) { return Number(x.id) === Number(id); })[0] || null;
}

/** Guarda un implemento nuevo o actualiza el que se está editando. */
function guardarImplemento() {
  var nombre = PIA.valor('iNombre');
  var deporte = PIA.valor('iDeporte');
  var ubicacion = PIA.valor('iUbicacion');
  var fisico = PIA.valor('iFisico');
  var cantidad = Number(PIA.valor('iCantidad')) || 1;

  if (!nombre) { PIA.toast('Escribe el nombre del implemento.', 'mal'); return; }
  if (nombre.length < 4) { PIA.toast('El nombre es demasiado corto.', 'mal'); return; }
  if (!deporte) { PIA.toast('Elige el deporte.', 'mal'); return; }
  if (!ubicacion) { PIA.toast('Escribe dónde se guarda el implemento.', 'mal'); return; }
  if (!fisico) { PIA.toast('Elige el estado físico.', 'mal'); return; }
  if (cantidad < 1) { PIA.toast('La cantidad mínima es 1 unidad.', 'mal'); return; }

  if (implementoEnEdicion) {
    PIA.actualizar('implementos', implementoEnEdicion, {
      nombre: nombre, deporte: deporte, ubicacion: ubicacion,
      estado_fisico: fisico, cantidad: cantidad
    });
    PIA.toast('Implemento actualizado.');
  } else {
    PIA.insertar('implementos', {
      codigo_qr: codigoQRNuevo(deporte), nombre: nombre, deporte: deporte,
      ubicacion: ubicacion, estado_fisico: fisico, disponibilidad: 'DISPONIBLE',
      cantidad: cantidad, fecha_ingreso: PIA.hoy(), veces_prestado: 0
    });
    PIA.toast('Implemento registrado con su etiqueta QR.');
  }
  limpiarImplemento();
  refrescarTodo();
}

/** Deja el formulario listo para un implemento nuevo. */
function limpiarImplemento() {
  implementoEnEdicion = null;
  PIA.poner('iNombre', '');
  PIA.poner('iDeporte', '');
  PIA.poner('iUbicacion', '');
  PIA.poner('iFisico', 'Excelente');
  PIA.poner('iCantidad', '1');
  var t = document.getElementById('tituloForm');
  if (t) t.textContent = 'Nuevo implemento';
}

/** Carga un implemento en el formulario para editarlo. */
function editarImplemento(id) {
  var it = buscarImplemento(id);
  if (!it) return;
  implementoEnEdicion = it.id;
  PIA.poner('iNombre', it.nombre);
  PIA.poner('iDeporte', it.deporte);
  PIA.poner('iUbicacion', it.ubicacion);
  PIA.poner('iFisico', it.estado_fisico);
  PIA.poner('iCantidad', it.cantidad || 1);
  var t = document.getElementById('tituloForm');
  if (t) t.textContent = 'Editar ' + it.nombre;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Elimina un implemento que no está prestado. */
function eliminarImplemento(id) {
  var it = buscarImplemento(id);
  if (!it) return;
  if (it.disponibilidad === 'PRESTADO') {
    PIA.toast('No puedes eliminar un implemento que está prestado.', 'mal');
    return;
  }
  if (!confirm('¿Eliminar el implemento ' + it.nombre + ' del inventario?')) return;
  PIA.eliminar('implementos', id);
  PIA.toast('Implemento eliminado del inventario.');
  refrescarTodo();
}

/** Saca un implemento de circulación sin borrar su historia. */
function darDeBaja(id) {
  var it = buscarImplemento(id);
  if (!it) return;
  if (it.disponibilidad === 'PRESTADO') {
    PIA.toast('Primero registra la devolución del implemento.', 'mal');
    return;
  }
  if (!confirm('¿Dar de baja ' + it.nombre + '? Ya no se volverá a prestar.')) return;
  PIA.actualizar('implementos', id, { disponibilidad: 'DADO_DE_BAJA' });
  PIA.toast('Implemento dado de baja. Queda en el reporte de daños.');
  refrescarTodo();
}

/** Devuelve al inventario un implemento que estaba en mantenimiento. */
function repararImplemento(id) {
  var it = buscarImplemento(id);
  if (!it) return;
  PIA.actualizar('implementos', id, {
    disponibilidad: 'DISPONIBLE',
    estado_fisico: it.estado_fisico === 'Roto' ? 'Bueno' : it.estado_fisico
  });
  PIA.toast('Implemento reparado y disponible otra vez.');
  refrescarTodo();
}

/* ---------------------------------------------------------------------- */
/*  LA ETIQUETA QR (sin librerías: se dibuja con la rejilla del CSS)        */
/* ---------------------------------------------------------------------- */

/**
 * Construye una matriz de puntos a partir del texto del código.
 * No es un QR real, pero conserva la forma y las tres marcas de posición,
 * que es lo que se necesita para la etiqueta impresa del prototipo.
 */
function matrizQR(texto, lado) {
  var t = String(texto || 'QR');
  var semilla = 7;
  for (var i = 0; i < t.length; i++) {
    semilla = (semilla * 31 + t.charCodeAt(i)) % 2147483647;
  }
  var x = semilla || 12345;
  var m = [];
  var f, c;
  for (f = 0; f < lado; f++) {
    m[f] = [];
    for (c = 0; c < lado; c++) {
      x = (x * 16807) % 2147483647;
      m[f][c] = (x % 10) < 5;
    }
  }
  /* las tres marcas de posición del QR */
  for (f = 0; f < 7; f++) {
    for (c = 0; c < 7; c++) {
      var borde = f === 0 || f === 6 || c === 0 || c === 6;
      var centro = f >= 2 && f <= 4 && c >= 2 && c <= 4;
      var pinta = borde || centro;
      m[f][c] = pinta;
      m[f][lado - 1 - c] = pinta;
      m[lado - 1 - f][c] = pinta;
    }
  }
  return m;
}

/** Devuelve el HTML de la rejilla de puntos de un código. */
function pintarQR(texto, lado) {
  var n = lado || 21;
  var m = matrizQR(texto, n);
  var html = '<div class="qr-cuadricula" style="grid-template-columns:repeat(' + n + ',1fr)">';
  for (var f = 0; f < n; f++) {
    for (var c = 0; c < n; c++) {
      html += '<i class="' + (m[f][c] ? 'on' : '') + '"></i>';
    }
  }
  return html + '</div>';
}

/** Abre la etiqueta QR de un implemento para imprimirla. */
function verEtiquetaQR(id) {
  var it = buscarImplemento(id);
  if (!it) return;
  var cuerpo = '<div class="qr-caja">' + pintarQR(it.codigo_qr, 21) +
    '<p class="mono" style="margin-top:10px">' + PIA.esc(it.codigo_qr) + '</p>' +
    '<p class="pequeno gris">' + PIA.esc(it.nombre) + ' · ' + PIA.esc(it.deporte) + '</p>' +
    '</div>' +
    '<p class="pequeno gris" style="margin-top:10px">Pega esta etiqueta en el implemento. El estudiante la escanea al pedirlo y al devolverlo.</p>';
  PIA.modal('Etiqueta QR · ' + it.nombre, cuerpo,
    '<button class="btn" onclick="PIA.cerrarModal()">Cerrar</button>' +
    '<button class="btn p" onclick="window.print()">Imprimir etiqueta</button>');
}

/** Genera la etiqueta de prueba del panel de administración. */
function probarEtiqueta() {
  var caja = document.getElementById('vistaQR');
  if (!caja) return;
  var texto = PIA.valor('qTexto') || 'QR-FUT-0001';
  caja.innerHTML = '<div class="qr-caja">' + pintarQR(texto, 21) +
    '<p class="mono" style="margin-top:10px">' + PIA.esc(texto) + '</p></div>';
}

/* ---------------------------------------------------------------------- */
/*  LAS VISTAS                                                             */
/* ---------------------------------------------------------------------- */

/** Vuelve a pintar todo lo que dependa de los datos, si está en pantalla. */
function refrescarTodo() {
  pintarCatalogo();
  pintarInventario();
  pintarEstadisticas();
  pintarPrestamos();
  pintarPerfil();
}

/** Pinta una ficha del catálogo. */
function fichaImplemento(it) {
  var clase = colorSemaforo(it);
  var html = '<div class="ficha">';
  html += '<div class="fila" style="gap:6px"><span class="semaforo ' + clase + '"></span><h3>' + PIA.esc(it.nombre) + '</h3></div>';
  html += '<span class="codigo">' + PIA.esc(it.codigo_qr) + '</span>';
  html += '<span class="pequeno gris">' + PIA.esc(it.deporte) + ' · ' + PIA.esc(it.ubicacion) + '</span>';
  html += '<div class="fila" style="gap:5px;margin-top:4px">' + badgeDisponibilidad(it.disponibilidad) + badgeFisico(it.estado_fisico) + '</div>';
  html += '<div class="pie-ficha">';
  html += '<span class="badge neutro">' + Number(it.veces_prestado || 0) + ' préstamos</span>';
  if (it.disponibilidad === 'DISPONIBLE') html += '<a class="btn pq p" href="escaner-prestamo.html">Pedir prestado</a>';
  html += '</div></div>';
  return html;
}

/** Pinta el catálogo de la portada con sus filtros y sus indicadores. */
function pintarCatalogo() {
  var lista = PIA.listar('implementos');

  /* los indicadores de arriba */
  var kd = document.getElementById('kDisponibles');
  if (kd) {
    kd.textContent = lista.filter(function (x) { return x.disponibilidad === 'DISPONIBLE'; }).length;
    document.getElementById('kPrestados').textContent = lista.filter(function (x) { return x.disponibilidad === 'PRESTADO'; }).length;
    document.getElementById('kMantenimiento').textContent = lista.filter(function (x) { return x.disponibilidad === 'EN_MANTENIMIENTO'; }).length;
    document.getElementById('kBaja').textContent = lista.filter(function (x) { return x.disponibilidad === 'DADO_DE_BAJA'; }).length;
  }

  /* el filtro de deportes se llena una sola vez */
  var sel = document.getElementById('cDeporte');
  if (sel && sel.options.length === 1) {
    var deportes = [];
    lista.forEach(function (x) { if (deportes.indexOf(x.deporte) === -1) deportes.push(x.deporte); });
    deportes.sort().forEach(function (d) { sel.innerHTML += '<option>' + PIA.esc(d) + '</option>'; });
  }

  var cont = document.getElementById('catalogo');
  if (!cont) return;
  var deporte = PIA.valor('cDeporte');
  var disp = PIA.valor('cDisponibilidad');
  var texto = PIA.normalizar(PIA.valor('cBuscar'));
  var filtrada = lista.filter(function (x) {
    if (deporte && x.deporte !== deporte) return false;
    if (disp && x.disponibilidad !== disp) return false;
    if (texto && PIA.normalizar(x.nombre + ' ' + x.codigo_qr + ' ' + x.ubicacion + ' ' + x.deporte).indexOf(texto) === -1) return false;
    return true;
  });
  if (!filtrada.length) { cont.innerHTML = '<div class="vacio">Ningún implemento coincide con esos filtros.</div>'; return; }
  cont.innerHTML = filtrada.map(fichaImplemento).join('');
}

/** Pinta la tabla del panel de inventario. */
function pintarInventario() {
  var cont = document.getElementById('tablaInventario');
  if (!cont) return;
  var lista = PIA.listar('implementos').slice().sort(function (a, b) {
    if (a.deporte !== b.deporte) return String(a.deporte).localeCompare(String(b.deporte));
    return String(a.codigo_qr).localeCompare(String(b.codigo_qr));
  });
  cont.innerHTML = PIA.tabla(
    ['Código QR', 'Implemento', 'Deporte', 'Ubicación', 'Estado físico', 'Disponibilidad', ''],
    lista.map(function (it) {
      var acciones = '<div class="acciones">' +
        '<button class="btn pq" onclick="editarImplemento(' + it.id + ')">Editar</button>' +
        '<button class="btn pq" onclick="verEtiquetaQR(' + it.id + ')">QR</button>';
      if (it.disponibilidad === 'EN_MANTENIMIENTO') acciones += '<button class="btn pq ok" onclick="repararImplemento(' + it.id + ')">Reparar</button>';
      if (it.disponibilidad !== 'DADO_DE_BAJA' && it.disponibilidad !== 'PRESTADO') acciones += '<button class="btn pq pel" onclick="darDeBaja(' + it.id + ')">Baja</button>';
      acciones += '<button class="btn pq" onclick="eliminarImplemento(' + it.id + ')">Eliminar</button></div>';
      return [
        '<span class="mono">' + PIA.esc(it.codigo_qr) + '</span>',
        PIA.esc(it.nombre) + (Number(it.cantidad) > 1 ? '<br><span class="pequeno gris">' + it.cantidad + ' unidades</span>' : ''),
        PIA.esc(it.deporte),
        PIA.esc(it.ubicacion),
        badgeFisico(it.estado_fisico),
        badgeDisponibilidad(it.disponibilidad),
        acciones
      ];
    }),
    { vacio: 'Todavía no hay implementos registrados.' }
  );
}

/* Arranque de las páginas que muestran el catálogo o el inventario. */
document.addEventListener('DOMContentLoaded', function () {
  pintarCatalogo();
  pintarInventario();
  probarEtiqueta();
});