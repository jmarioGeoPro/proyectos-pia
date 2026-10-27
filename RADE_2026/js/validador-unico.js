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
var CLAVE_DATOS = "pia_rade_pae_lola";

/* Los datos de ejemplo. Se cargan solo la primera vez, cuando no hay nada.
   Son los mismos que están en la carpeta data/ del proyecto. */
var SEMILLA = {
  "beneficiarios": [
    {
      "id": 1,
      "codigo_carnet": "LG-2026-0101",
      "documento_ti": "1.025.887.441",
      "nombre": "Alejandro Sepúlveda Álvarez",
      "grado": "10°01",
      "modalidad": "VASO_LECHE",
      "activo": true,
      "fecha_inscripcion": "2026-02-02"
    },
    {
      "id": 2,
      "codigo_carnet": "LG-2026-0102",
      "documento_ti": "1.036.221.558",
      "nombre": "Isabella Torres Madrid",
      "grado": "11°01",
      "modalidad": "PLATO_VERDE",
      "activo": true,
      "fecha_inscripcion": "2026-02-02"
    },
    {
      "id": 3,
      "codigo_carnet": "LG-2026-0103",
      "documento_ti": "1.020.774.309",
      "nombre": "Samuel Cárdenas Osorio",
      "grado": "10°01",
      "modalidad": "VASO_LECHE",
      "activo": true,
      "fecha_inscripcion": "2026-02-03"
    },
    {
      "id": 4,
      "codigo_carnet": "LG-2026-0104",
      "documento_ti": "1.038.512.667",
      "nombre": "Valentina Ríos Zapata",
      "grado": "10°02",
      "modalidad": "PLATO_VERDE",
      "activo": true,
      "fecha_inscripcion": "2026-02-03"
    },
    {
      "id": 5,
      "codigo_carnet": "LG-2026-0105",
      "documento_ti": "1.123.908.214",
      "nombre": "Mateo Restrepo Agudelo",
      "grado": "10°03",
      "modalidad": "VASO_LECHE",
      "activo": true,
      "fecha_inscripcion": "2026-02-04"
    },
    {
      "id": 6,
      "codigo_carnet": "LG-2026-0106",
      "documento_ti": "1.017.336.902",
      "nombre": "Salomé Vélez Quintero",
      "grado": "9°02",
      "modalidad": "PLATO_VERDE",
      "activo": true,
      "fecha_inscripcion": "2026-02-04"
    },
    {
      "id": 7,
      "codigo_carnet": "LG-2026-0107",
      "documento_ti": "1.039.447.815",
      "nombre": "Jerónimo Salazar Peña",
      "grado": "11°02",
      "modalidad": "VASO_LECHE",
      "activo": true,
      "fecha_inscripcion": "2026-02-05"
    },
    {
      "id": 8,
      "codigo_carnet": "LG-2026-0108",
      "documento_ti": "1.040.118.336",
      "nombre": "Manuela Arango Betancur",
      "grado": "10°02",
      "modalidad": "PLATO_VERDE",
      "activo": true,
      "fecha_inscripcion": "2026-02-05"
    },
    {
      "id": 9,
      "codigo_carnet": "LG-2026-0109",
      "documento_ti": "1.041.775.220",
      "nombre": "Laura Castaño Molina",
      "grado": "11°03",
      "modalidad": "VASO_LECHE",
      "activo": false,
      "fecha_inscripcion": "2026-02-06"
    }
  ],
  "lotes": [
    {
      "id": 1,
      "codigo_lote": "LOTE-2026-0001",
      "fecha": "2026-05-11",
      "hora_llegada": "06:20",
      "responsable": "Alejo Villa A",
      "menu": "Arroz con pollo, ensalada y jugo natural",
      "vencimiento": "2026-05-11",
      "recibida_leche": 120,
      "recibida_plato": 60,
      "total_inscritos": 168,
      "estado": "CERRADO",
      "observacion": "Lote completo, sin novedades."
    },
    {
      "id": 2,
      "codigo_lote": "LOTE-2026-0002",
      "fecha": "2026-05-12",
      "hora_llegada": "06:15",
      "responsable": "Jorge Mario Patiño Marín",
      "menu": "Frijolada con arepa, banano y vaso de leche",
      "vencimiento": "2026-05-12",
      "recibida_leche": 120,
      "recibida_plato": 60,
      "total_inscritos": 168,
      "estado": "CERRADO",
      "observacion": "Se devolvieron 2 platos en mal estado."
    },
    {
      "id": 3,
      "codigo_lote": "LOTE-2026-0003",
      "fecha": "2026-05-13",
      "hora_llegada": "06:25",
      "responsable": "Alejo Villa A",
      "menu": "Sudado de pollo con arroz y mandarina",
      "vencimiento": "2026-05-13",
      "recibida_leche": 115,
      "recibida_plato": 60,
      "total_inscritos": 168,
      "estado": "CERRADO",
      "observacion": "Llegaron 5 vasos menos de lo pactado."
    },
    {
      "id": 4,
      "codigo_lote": "LOTE-2026-0004",
      "fecha": "2026-05-14",
      "hora_llegada": "06:30",
      "responsable": "Coordinación PAE",
      "menu": "Pasta con carne, ensalada y jugo de mora",
      "vencimiento": "2026-05-14",
      "recibida_leche": 118,
      "recibida_plato": 60,
      "total_inscritos": 168,
      "estado": "CERRADO",
      "observacion": ""
    },
    {
      "id": 5,
      "codigo_lote": "LOTE-2026-0005",
      "fecha": "2026-05-15",
      "hora_llegada": "06:10",
      "responsable": "Jorge Mario Patiño Marín",
      "menu": "Sopa de verduras, pan y vaso de leche",
      "vencimiento": "2026-05-15",
      "recibida_leche": 120,
      "recibida_plato": 55,
      "total_inscritos": 168,
      "estado": "CERRADO",
      "observacion": "Menú de cierre de semana."
    },
    {
      "id": 6,
      "codigo_lote": "LOTE-2026-0006",
      "fecha": "2026-05-18",
      "hora_llegada": "06:35",
      "responsable": "Alejo Villa A",
      "menu": "Arroz paisa, ensalada y gelatina",
      "vencimiento": "2026-05-18",
      "recibida_leche": 120,
      "recibida_plato": 60,
      "total_inscritos": 168,
      "estado": "ABIERTO",
      "observacion": "Jornada en curso."
    }
  ],
  "entregas": [
    {
      "id": 1,
      "id_beneficiario": 1,
      "codigo_carnet": "LG-2026-0101",
      "id_lote": 1,
      "fecha": "2026-05-11",
      "hora": "06:45",
      "modalidad": "VASO_LECHE",
      "plato_devuelto": false
    },
    {
      "id": 2,
      "id_beneficiario": 2,
      "codigo_carnet": "LG-2026-0102",
      "id_lote": 1,
      "fecha": "2026-05-11",
      "hora": "06:47",
      "modalidad": "PLATO_VERDE",
      "plato_devuelto": true
    },
    {
      "id": 3,
      "id_beneficiario": 3,
      "codigo_carnet": "LG-2026-0103",
      "id_lote": 1,
      "fecha": "2026-05-11",
      "hora": "06:50",
      "modalidad": "VASO_LECHE",
      "plato_devuelto": false
    },
    {
      "id": 4,
      "id_beneficiario": 4,
      "codigo_carnet": "LG-2026-0104",
      "id_lote": 1,
      "fecha": "2026-05-11",
      "hora": "06:52",
      "modalidad": "PLATO_VERDE",
      "plato_devuelto": true
    },
    {
      "id": 5,
      "id_beneficiario": 1,
      "codigo_carnet": "LG-2026-0101",
      "id_lote": 2,
      "fecha": "2026-05-12",
      "hora": "06:41",
      "modalidad": "VASO_LECHE",
      "plato_devuelto": false
    },
    {
      "id": 6,
      "id_beneficiario": 5,
      "codigo_carnet": "LG-2026-0105",
      "id_lote": 2,
      "fecha": "2026-05-12",
      "hora": "06:44",
      "modalidad": "VASO_LECHE",
      "plato_devuelto": false
    },
    {
      "id": 7,
      "id_beneficiario": 6,
      "codigo_carnet": "LG-2026-0106",
      "id_lote": 2,
      "fecha": "2026-05-12",
      "hora": "06:46",
      "modalidad": "PLATO_VERDE",
      "plato_devuelto": true
    },
    {
      "id": 8,
      "id_beneficiario": 7,
      "codigo_carnet": "LG-2026-0107",
      "id_lote": 2,
      "fecha": "2026-05-12",
      "hora": "06:49",
      "modalidad": "VASO_LECHE",
      "plato_devuelto": false
    },
    {
      "id": 9,
      "id_beneficiario": 8,
      "codigo_carnet": "LG-2026-0108",
      "id_lote": 3,
      "fecha": "2026-05-13",
      "hora": "06:55",
      "modalidad": "PLATO_VERDE",
      "plato_devuelto": false
    },
    {
      "id": 10,
      "id_beneficiario": 7,
      "codigo_carnet": "LG-2026-0107",
      "id_lote": 3,
      "fecha": "2026-05-13",
      "hora": "06:57",
      "modalidad": "VASO_LECHE",
      "plato_devuelto": false
    },
    {
      "id": 11,
      "id_beneficiario": 2,
      "codigo_carnet": "LG-2026-0102",
      "id_lote": 3,
      "fecha": "2026-05-13",
      "hora": "07:02",
      "modalidad": "PLATO_VERDE",
      "plato_devuelto": true
    },
    {
      "id": 12,
      "id_beneficiario": 2,
      "codigo_carnet": "LG-2026-0102",
      "id_lote": 4,
      "fecha": "2026-05-14",
      "hora": "06:43",
      "modalidad": "PLATO_VERDE",
      "plato_devuelto": true
    },
    {
      "id": 13,
      "id_beneficiario": 3,
      "codigo_carnet": "LG-2026-0103",
      "id_lote": 4,
      "fecha": "2026-05-14",
      "hora": "06:45",
      "modalidad": "VASO_LECHE",
      "plato_devuelto": false
    },
    {
      "id": 14,
      "id_beneficiario": 4,
      "codigo_carnet": "LG-2026-0104",
      "id_lote": 4,
      "fecha": "2026-05-14",
      "hora": "06:48",
      "modalidad": "PLATO_VERDE",
      "plato_devuelto": true
    },
    {
      "id": 15,
      "id_beneficiario": 1,
      "codigo_carnet": "LG-2026-0101",
      "id_lote": 5,
      "fecha": "2026-05-15",
      "hora": "06:38",
      "modalidad": "VASO_LECHE",
      "plato_devuelto": false
    },
    {
      "id": 16,
      "id_beneficiario": 6,
      "codigo_carnet": "LG-2026-0106",
      "id_lote": 6,
      "fecha": "2026-05-18",
      "hora": "06:42",
      "modalidad": "PLATO_VERDE",
      "plato_devuelto": true
    },
    {
      "id": 17,
      "id_beneficiario": 1,
      "codigo_carnet": "LG-2026-0101",
      "id_lote": 6,
      "fecha": "2026-05-18",
      "hora": "06:44",
      "modalidad": "VASO_LECHE",
      "plato_devuelto": false
    },
    {
      "id": 18,
      "id_beneficiario": 5,
      "codigo_carnet": "LG-2026-0105",
      "id_lote": 6,
      "fecha": "2026-05-18",
      "hora": "06:47",
      "modalidad": "VASO_LECHE",
      "plato_devuelto": false
    }
  ],
  "sugerencias": [
    {
      "id": 1,
      "id_beneficiario": 2,
      "codigo_carnet": "LG-2026-0102",
      "calificacion": 5,
      "comentario": "El arroz con pollo estuvo muy bueno y la porción fue suficiente. Gracias al restaurante.",
      "fecha": "2026-05-11"
    },
    {
      "id": 2,
      "id_beneficiario": 4,
      "codigo_carnet": "LG-2026-0104",
      "calificacion": 4,
      "comentario": "La ensalada llegó fresca, pero el jugo estaba muy dulce para mi gusto.",
      "fecha": "2026-05-11"
    },
    {
      "id": 3,
      "id_beneficiario": 1,
      "codigo_carnet": "LG-2026-0101",
      "calificacion": 3,
      "comentario": "La fila avanza rápido con el carnet, aunque el plato verde a veces se demora.",
      "fecha": "2026-05-12"
    },
    {
      "id": 4,
      "id_beneficiario": 6,
      "codigo_carnet": "LG-2026-0106",
      "calificacion": 5,
      "comentario": "Me gusta que el plato verde sea preparado en el colegio y no industrializado.",
      "fecha": "2026-05-13"
    },
    {
      "id": 5,
      "id_beneficiario": 5,
      "codigo_carnet": "LG-2026-0105",
      "calificacion": 4,
      "comentario": "Sugiero incluir más fruta en el complemento de la tarde y menos fritos.",
      "fecha": "2026-05-14"
    },
    {
      "id": 6,
      "id_beneficiario": 3,
      "codigo_carnet": "LG-2026-0103",
      "calificacion": 2,
      "comentario": "El vaso de leche llegó tibio el miércoles. Se puede mejorar la conservación.",
      "fecha": "2026-05-15"
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
  "codigo": "PIA-2026-10-LG-RADE",
  "palabrasClave": [
    "PAE",
    "carnet estudiantil",
    "entrega única",
    "lotes y sobrantes",
    "nutrición escolar"
  ],
  "objetivo": "Desarrollar el prototipo funcional de la aplicación web R.A.D.E para automatizar el registro de beneficiarios, la validación de entrega única diaria mediante carnet estudiantil y el control de lotes y sobrantes del Programa de Alimentación Escolar (PAE) en la I.E. Lola González, utilizando HTML5, CSS3 y JavaScript ES6+ con proyección a PHP y MySQL.",
  "especificos": [
    "Corregir el flujo de recepción de lotes y el registro por modalidad (vaso de leche o plato verde).",
    "Diseñar el panel del operador, la terminal de carnet y el portal del estudiante.",
    "Programar el algoritmo de reclamo único diario por código de carnet.",
    "Implementar el tablero estadístico de entregas, inasistentes y sobrantes.",
    "Verificar el prototipo con pruebas de escritorio documentadas."
  ],
  "normativa": "Resolución 4210 de 1996 · Ley 1176 de 2007 (PAE)"
};
PIA.equipo = [
  {
    "nombre": "Thomas Alexis López Robles",
    "rol": "Product Owner · visión funcional del PAE y articulación con docentes y alfabetizadores"
  },
  {
    "nombre": "Emmanuel Ortiz López",
    "rol": "Scrum Master · sprints, control de calidad y pruebas del carnet único diario"
  },
  {
    "nombre": "Sebastián Alexis Pulido Cabrera",
    "rol": "Líder de lógica JavaScript · conciliación de lotes y bloqueo del doble reclamo"
  },
  {
    "nombre": "David Mejía Meneses",
    "rol": "Líder UI/UX · terminal de validación y panel del operador"
  },
  {
    "nombre": "Jerónimo Caicedo Patiño",
    "rol": "Datos y documentación · semilla JSON, modelo MySQL y buzón nutricional"
  }
];
PIA.construccion = {
  "algoritmo": [
    "ALGORITMO Gestion_Integral_Restaurante_RADE ENTRADAS DEL DÍA (Apertura de Restaurante): fecha_jornada, lote_recibido_vaso_leche (Entero), lote_recibido_plato_verde (Entero), total_inscritos_pae (Entero) ENTRADAS POR CADA ESTUDIANTE EN LA FILA: codigo_carnet (Cadena) PROCESO:",
    "  1. Inicializar contadores: reclamaron_hoy <- 0, entregados_leche <- 0, entregados_plato <- 0",
    "  2. MIENTRAS RestauranteAbierto() HACER",
    "       Leer codigo_carnet desde lector óptico o formulario",
    "       estudiante <- BuscarBeneficiarioPAE(codigo_carnet)",
    "       SI estudiante == NULO O estudiante.activo_pae == FALSO ENTONCES",
    "         MostrarAlertaRoja(\"ACCESO DENEGADO: El carnet no figura como beneficiario activo del PAE.\")",
    "       SINO SI estudiante.ya_reclamo_en_fecha(fecha_jornada) == VERDADERO ENTONCES",
    "         MostrarAlertaRoja(\"RECLAMO BLOQUEADO: \" + estudiante.nombre + \" ya reclamó su complemento hoy a las \" + estudiante.hora_reclamo)",
    "       SINO",
    "         // Validación exitosa (1 sola vez al día)",
    "         estudiante.marcar_reclamado(fecha_jornada, HoraActual())",
    "         reclamaron_hoy <- reclamaron_hoy + 1",
    "         SI estudiante.modalidad == \"PLATO_VERDE_PREPARADO\" ENTONCES",
    "           entregados_plato <- entregados_plato + 1",
    "           MostrarConfirmacionVerde(\"ENTREGAR PLATO VERDE a \" + estudiante.nombre + \" (Recuerda devolver el plato).\")",
    "         SINO",
    "           entregados_leche <- entregados_leche + 1",
    "           MostrarConfirmacionVerde(\"ENTREGAR VASO DE LECHE / INDUSTRIALIZADO a \" + estudiante.nombre)",
    "  3. // Cierre de jornada y conciliación exacta (fórmulas corregidas):",
    "     titulares_inasistentes <- total_inscritos_pae - reclamaron_hoy",
    "     sobrantes_plato_verde <- lote_recibido_plato_verde - entregados_plato",
    "     sobrantes_vaso_leche <- lote_recibido_vaso_leche - entregados_leche",
    "     sobrantes_totales <- sobrantes_plato_verde + sobrantes_vaso_leche SALIDAS: Reporte de Cierre: Reclamaron = reclamaron_hoy | Inasistentes al PAE = titulares_inasistentes | Sobrantes = sobrantes_totales"
  ],
  "tablas": [
    {
      "nombre": "beneficiarios_pae",
      "campos": "id_beneficiario (PK), codigo_carnet (UNIQUE), documento_ti, nombre_completo, grado_grupo, modalidad ('VASO_LECHE','PLATO_VERDE'), estado_activo (BOOL)."
    },
    {
      "nombre": "lotes_diarios",
      "campos": "id_lote (PK), fecha (UNIQUE), hora_llegada, responsable_recepcion, descripcion_menu, fecha_vencimiento, cant_recibida_leche, cant_recibida_plato."
    },
    {
      "nombre": "entregas_racion",
      "campos": "id_entrega (PK), id_lote (FK), id_beneficiario (FK), hora_entrega, plato_devuelto (BOOL). Restricción: UNIQUE(id_lote, id_beneficiario)."
    },
    {
      "nombre": "sugerencias_pae",
      "campos": "id_sugerencia (PK), id_beneficiario (FK), calificacion (1-5), comentario, Referencias Bibliográficas (APA 7.ª Edición): (1) Congreso de la República de Colombia. (2019). Ley 1990 de 2019: Política contra la pérdida y el desperdicio de alimentos; (2) Laudon, K. C., & Laudon, J. P. Unidad Alimentos para Aprender [UApA]. (2021). Resolución 00335 de 2021: Lineamientos Técnicos- Administrativos, Estándares y Condiciones Mínimas del PAE"
    }
  ]
};

/* ==========================================================================
   EXTRAS COMUNES — R.A.D.E
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
  enlace.download = 'R.A.D.E-' + tabla + '-' + PIA.hoy() + '.csv';
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
  var cuerpo = '<div class="aviso"><b>Esta es la aplicación de R.A.D.E.</b> Todo lo que hagas se guarda en tu navegador.</div>' +
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
   validador-unico.js
   --------------------------------------------------------------------------
   Aquí viven el registro de beneficiarios del PAE y el corazón del algoritmo
   Gestion_Integral_Restaurante_RADE: validar el carnet, bloquear el doble
   reclamo del mismo día y descontar la ración de la modalidad que le toca.
   ========================================================================== */

'use strict';

/* Las dos modalidades del restaurante escolar. */
var MODALIDADES = {
  VASO_LECHE: 'Vaso de Leche (industrializado)',
  PLATO_VERDE: 'Plato Verde (preparado en sitio)'
};

/* El carnet siempre tiene la forma LG-2026-0000. */
var PATRON_CARNET = /^LG-\d{4}-\d{4}$/;

/* El beneficiario que se está editando en el panel del operador. */
var beneficiarioEnEdicion = null;

/** Nombre largo de una modalidad. */
function modalidadNombre(m) {
  return MODALIDADES[m] || String(m || 'Sin modalidad').replace(/_/g, ' ');
}

/** Etiqueta de color según la modalidad. */
function badgeModalidad(m) {
  var clase = m === 'PLATO_VERDE' ? 'warn' : 'info';
  return '<span class="badge ' + clase + '">' + PIA.esc(modalidadNombre(m)) + '</span>';
}

/** Etiqueta verde para activo y roja para retirado. */
function badgeActivo(activo) {
  return activo ? '<span class="badge ok">Activo</span>' : '<span class="badge mal">Retirado</span>';
}

/** La hora actual en formato hh:mm. */
function horaActual() { return new Date().toTimeString().slice(0, 5); }

/** Deja el carnet en mayúsculas y sin espacios sobrantes. */
function normalizarCarnet(codigo) { return String(codigo || '').trim().toUpperCase(); }

/** Todos los beneficiarios inscritos. */
function beneficiarios() { return PIA.listar('beneficiarios'); }

/** Busca un beneficiario por el código del carnet. */
function beneficiarioPorCarnet(codigo) {
  var buscado = normalizarCarnet(codigo);
  var lista = beneficiarios();
  for (var i = 0; i < lista.length; i++) {
    if (normalizarCarnet(lista[i].codigo_carnet) === buscado) return lista[i];
  }
  return null;
}

/** Busca un beneficiario por su id interno. */
function beneficiarioPorId(id) {
  var lista = beneficiarios();
  for (var i = 0; i < lista.length; i++) {
    if (Number(lista[i].id) === Number(id)) return lista[i];
  }
  return null;
}

/** Las entregas registradas en una fecha. */
function entregasDe(fecha) {
  return PIA.listar('entregas').filter(function (e) { return e.fecha === fecha; });
}

/** La entrega previa del mismo carnet en la misma fecha: la que bloquea. */
function entregaPrevia(idBeneficiario, fecha) {
  var lista = entregasDe(fecha);
  for (var i = 0; i < lista.length; i++) {
    if (Number(lista[i].id_beneficiario) === Number(idBeneficiario)) return lista[i];
  }
  return null;
}

/**
 * El algoritmo completo, estudiante por estudiante.
 * Devuelve el tipo de respuesta para pintar el semáforo de la terminal.
 */
function procesarCarnet(codigo, devolverPlato) {
  var limpio = normalizarCarnet(codigo);
  if (!limpio) {
    return { tipo: 'INVALIDO', titulo: 'Carnet vacío', mensaje: 'Escribe o escanea el código del carnet.' };
  }
  if (!PATRON_CARNET.test(limpio)) {
    return { tipo: 'INVALIDO', titulo: 'Carnet ilegible', mensaje: 'El código ' + limpio + ' no tiene el formato LG-2026-0000.' };
  }
  /* Mientras el restaurante esté abierto: debe existir lote del día. */
  var lote = loteDeHoy();
  if (!lote) {
    return { tipo: 'SIN_JORNADA', titulo: 'Jornada sin abrir', mensaje: 'Todavía no se ha recibido el lote de hoy. El operador debe registrarlo antes de validar carnets.' };
  }
  if (lote.estado === 'CERRADO') {
    return { tipo: 'CERRADA', titulo: 'Jornada cerrada', mensaje: 'La jornada de hoy ya fue cerrada y conciliada. Los sobrantes pasan a coordinación.' };
  }
  /* Paso 2: buscar el beneficiario. */
  var ben = beneficiarioPorCarnet(limpio);
  if (!ben || !ben.activo) {
    return { tipo: 'DENEGADO', titulo: 'Acceso denegado', mensaje: 'ACCESO DENEGADO: el carnet ' + limpio + ' no figura como beneficiario activo del PAE.' };
  }
  /* La regla de idempotencia diaria: una sola entrega por carnet y fecha. */
  var previa = entregaPrevia(ben.id, lote.fecha);
  if (previa) {
    return {
      tipo: 'BLOQUEADO', titulo: 'Reclamo bloqueado', ben: ben, entrega: previa,
      mensaje: 'RECLAMO BLOQUEADO: ' + ben.nombre + ' ya reclamó su complemento hoy a las ' + previa.hora + '.'
    };
  }
  /* Validación exitosa: se registra la entrega y se descuenta la ración. */
  var entrega = PIA.insertar('entregas', {
    id_beneficiario: ben.id,
    codigo_carnet: ben.codigo_carnet,
    id_lote: lote.id,
    fecha: lote.fecha,
    hora: horaActual(),
    modalidad: ben.modalidad,
    plato_devuelto: ben.modalidad === 'PLATO_VERDE' ? !!devolverPlato : false
  });
  var mensaje = ben.modalidad === 'PLATO_VERDE'
    ? 'ENTREGAR PLATO VERDE a ' + ben.nombre + '. Recuerda devolver el plato al final del descanso.'
    : 'ENTREGAR VASO DE LECHE a ' + ben.nombre + '.';
  return { tipo: 'OK', titulo: 'Entrega autorizada', ben: ben, entrega: entrega, mensaje: mensaje };
}

/** Pinta el semáforo con la respuesta del algoritmo. */
function pintarSemaforo(r) {
  var caja = document.getElementById('semaforo');
  if (!caja) return;
  if (!r || !r.tipo) { caja.innerHTML = ''; return; }
  var clase = r.tipo === 'OK' ? 'ok' : (r.tipo === 'SIN_JORNADA' || r.tipo === 'CERRADA' || r.tipo === 'INVALIDO') ? 'warn' : 'mal';
  var icono = r.tipo === 'OK' ? '✔' : r.tipo === 'BLOQUEADO' ? '⛔' : r.tipo === 'DENEGADO' ? '✕' : '!';
  var html = '<div class="aviso ' + clase + '">';
  html += '<div class="fila" style="gap:12px;align-items:flex-start">';
  html += '<div style="font-size:34px;line-height:1">' + icono + '</div>';
  html += '<div><b style="font-size:15px">' + PIA.esc(r.titulo) + '</b><br>' + PIA.esc(r.mensaje) + '</div>';
  html += '</div>';
  if (r.ben) {
    html += '<div class="fila" style="margin-top:10px">' + badgeModalidad(r.ben.modalidad) +
      '<span class="badge neutro">' + PIA.esc(r.ben.grado) + '</span>' +
      '<span class="badge neutro mono">' + PIA.esc(r.ben.codigo_carnet) + '</span></div>';
  }
  if (r.tipo === 'SIN_JORNADA') {
    html += '<div style="margin-top:10px"><a class="btn p" href="lotes-dashboard.html">Registrar el lote del día</a></div>';
  }
  html += '</div>';
  caja.innerHTML = html;
}

/** Valida el carnet que está escrito en la terminal. */
function validarCarnet() {
  var caja = document.getElementById('devolverPlato');
  var r = procesarCarnet(PIA.valor('carnet'), caja ? caja.checked : false);
  pintarSemaforo(r);
  if (r.tipo === 'OK') PIA.toast('Ración entregada a ' + r.ben.nombre + '.');
  else if (r.tipo === 'BLOQUEADO') PIA.toast('Doble reclamo bloqueado.', 'mal');
  else if (r.tipo === 'DENEGADO') PIA.toast('Ese carnet no es beneficiario activo del PAE.', 'mal');
  else if (r.tipo === 'SIN_JORNADA') PIA.toast('Falta registrar el lote de hoy.', 'warn');
  else if (r.tipo === 'CERRADA') PIA.toast('La jornada de hoy ya está cerrada.', 'warn');
  PIA.poner('carnet', '');
  if (caja) caja.checked = false;
  pintarHistorial();
  pintarContadores();
  var campo = document.getElementById('carnet');
  if (campo) campo.focus();
}

/** Borra el semáforo. */
function limpiarTerminal() {
  var caja = document.getElementById('semaforo');
  if (caja) caja.innerHTML = '';
  PIA.poner('carnet', '');
  var campo = document.getElementById('carnet');
  if (campo) campo.focus();
}

/** Historial de las entregas del día. */
function pintarHistorial() {
  var cont = document.getElementById('historialHoy');
  if (!cont) return;
  var fecha = PIA.hoy();
  var lista = entregasDe(fecha).slice().sort(function (a, b) { return String(b.hora).localeCompare(String(a.hora)); });
  cont.innerHTML = PIA.tabla(
    ['Hora', 'Carnet', 'Estudiante', 'Modalidad', 'Plato devuelto', ''],
    lista.map(function (e) {
      var ben = beneficiarioPorId(e.id_beneficiario);
      var devuelto = e.modalidad === 'PLATO_VERDE'
        ? (e.plato_devuelto ? '<span class="badge ok">Sí</span>' : '<span class="badge warn">Pendiente</span>')
        : '<span class="badge neutro">No aplica</span>';
      var boton = (e.modalidad === 'PLATO_VERDE' && !e.plato_devuelto)
        ? '<button class="btn pq" onclick="devolverPlato(' + e.id + ')">Devolvió el plato</button>' : '';
      return [
        '<b>' + PIA.esc(e.hora) + '</b>',
        '<span class="mono">' + PIA.esc(e.codigo_carnet) + '</span>',
        PIA.esc(ben ? ben.nombre : 'Beneficiario retirado'),
        badgeModalidad(e.modalidad),
        devuelto,
        '<div class="acciones">' + boton + '</div>'
      ];
    }),
    { vacio: 'Todavía no hay entregas registradas hoy en esta terminal.' }
  );
}

/** Contadores y estado de la jornada. */
function pintarContadores() {
  var caja = document.getElementById('vReclamaron');
  if (!caja) return;
  var lote = loteDeHoy();
  var c = conciliarLote(lote);
  caja.textContent = c.reclamaron;
  document.getElementById('vLeche').textContent = c.entregadosLeche;
  document.getElementById('vPlato').textContent = c.entregadosPlato;
  document.getElementById('vPlatos').textContent = c.platosPendientes;
  pintarEstadoJornada(lote);
}

/** Explica si la jornada está abierta y ofrece abrirla. */
function pintarEstadoJornada(lote) {
  var caja = document.getElementById('estadoJornada');
  if (!caja) return;
  if (!lote) {
    caja.innerHTML = '<div class="aviso warn">No hay lote registrado para hoy. Puedes abrirlo con las cantidades del último lote recibido.</div>' +
      '<button class="btn a" onclick="abrirJornadaHoy()">Abrir la jornada de hoy</button>';
    return;
  }
  caja.innerHTML = '<div class="fila"><span class="badge ' + (lote.estado === 'CERRADO' ? 'neutro' : 'ok') + '">' +
    (lote.estado === 'CERRADO' ? 'Jornada cerrada' : 'Jornada abierta') + '</span>' +
    '<span class="pequeno gris">' + PIA.fecha(lote.fecha) + ' · ' + PIA.esc(lote.menu) + '</span></div>';
}

/** Botones con carnets reales para probar la terminal. */
function pintarBotonesPrueba() {
  var cont = document.getElementById('botonesPrueba');
  if (!cont) return;
  var activos = beneficiarios().filter(function (b) { return b.activo; }).slice(0, 4);
  cont.innerHTML = activos.map(function (b) {
    return '<button class="btn pq" onclick="probarCarnet(\'' + b.codigo_carnet + '\')">' + PIA.esc(b.codigo_carnet) + '</button>';
  }).join('');
}

/** Escribe un carnet de ejemplo y lo valida. */
function probarCarnet(codigo) {
  PIA.poner('carnet', codigo);
  validarCarnet();
}

/** Marca un plato como devuelto desde el monitor. */
function devolverPlato(idEntrega) {
  PIA.actualizar('entregas', idEntrega, { plato_devuelto: true });
  PIA.toast('Devolución del plato registrada.');
  pintarHistorial();
  pintarContadores();
  if (typeof pintarMonitor === 'function') pintarMonitor();
  if (typeof pintarConciliacion === 'function') pintarConciliacion();
}

/** Inscribe o actualiza un beneficiario del PAE. */
function guardarBeneficiario() {
  var carnet = normalizarCarnet(PIA.valor('bCarnet'));
  var nombre = PIA.valor('bNombre');
  var documento = PIA.valor('bDocumento');
  var grado = PIA.valor('bGrado');
  var modalidad = PIA.valor('bModalidad');
  var activo = PIA.valor('bActivo') === 'si';
  if (!PATRON_CARNET.test(carnet)) {
    PIA.toast('El carnet debe tener el formato LG-2026-0000.', 'mal');
    return;
  }
  if (nombre.indexOf(' ') === -1) {
    PIA.toast('Escribe el nombre y al menos un apellido.', 'mal');
    return;
  }
  var repetido = beneficiarioPorCarnet(carnet);
  if (repetido && Number(repetido.id) !== Number(beneficiarioEnEdicion)) {
    PIA.toast('Ese carnet ya está inscrito en el PAE.', 'mal');
    return;
  }
  var datos = {
    codigo_carnet: carnet, nombre: nombre, documento_ti: documento,
    grado: grado, modalidad: modalidad, activo: activo
  };
  if (beneficiarioEnEdicion) {
    PIA.actualizar('beneficiarios', beneficiarioEnEdicion, datos);
    PIA.toast('Beneficiario actualizado.');
  } else {
    datos.fecha_inscripcion = PIA.hoy();
    PIA.insertar('beneficiarios', datos);
    PIA.toast('Beneficiario inscrito en el PAE.');
  }
  cancelarBeneficiario();
  pintarBeneficiarios();
  pintarBotonesPrueba();
  pintarContadores();
}

/** Carga un beneficiario en el formulario para editarlo. */
function editarBeneficiario(id) {
  var b = beneficiarioPorId(id);
  if (!b) return;
  beneficiarioEnEdicion = b.id;
  PIA.poner('bCarnet', b.codigo_carnet);
  PIA.poner('bNombre', b.nombre);
  PIA.poner('bDocumento', b.documento_ti || '');
  PIA.poner('bGrado', b.grado);
  PIA.poner('bModalidad', b.modalidad);
  PIA.poner('bActivo', b.activo ? 'si' : 'no');
  var titulo = document.getElementById('bGuardar');
  if (titulo) titulo.textContent = 'Guardar cambios';
}

/** Deja el formulario listo para una inscripción nueva. */
function cancelarBeneficiario() {
  beneficiarioEnEdicion = null;
  ['bCarnet', 'bNombre', 'bDocumento'].forEach(function (id) { PIA.poner(id, ''); });
  PIA.poner('bGrado', '10°01');
  PIA.poner('bModalidad', 'VASO_LECHE');
  PIA.poner('bActivo', 'si');
  var boton = document.getElementById('bGuardar');
  if (boton) boton.textContent = 'Inscribir beneficiario';
}

/** Retira o reactiva un carnet sin borrar su historial. */
function alternarBeneficiario(id) {
  var b = beneficiarioPorId(id);
  if (!b) return;
  PIA.actualizar('beneficiarios', id, { activo: !b.activo });
  PIA.toast(b.activo ? 'Carnet retirado del PAE.' : 'Carnet reactivado en el PAE.');
  pintarBeneficiarios();
  pintarBotonesPrueba();
  pintarContadores();
}

/** Elimina definitivamente un beneficiario sin entregas. */
function eliminarBeneficiario(id) {
  var entregas = PIA.listar('entregas').filter(function (e) { return Number(e.id_beneficiario) === Number(id); });
  if (entregas.length) {
    PIA.toast('Ese beneficiario tiene ' + entregas.length + ' entregas: retíralo en vez de borrarlo.', 'warn');
    return;
  }
  if (!confirm('¿Eliminar este beneficiario de la base del PAE?')) return;
  PIA.eliminar('beneficiarios', id);
  PIA.toast('Beneficiario eliminado.');
  pintarBeneficiarios();
}

/** Tabla de beneficiarios del panel del operador. */
function pintarBeneficiarios() {
  var cont = document.getElementById('tablaBeneficiarios');
  if (!cont) return;
  var lista = beneficiarios().slice().sort(function (a, b) {
    return String(a.codigo_carnet).localeCompare(String(b.codigo_carnet));
  });
  cont.innerHTML = PIA.tabla(
    ['Carnet', 'Estudiante', 'Grado', 'Modalidad', 'Estado', ''],
    lista.map(function (b) {
      var cuenta = PIA.listar('entregas').filter(function (e) { return Number(e.id_beneficiario) === Number(b.id); }).length;
      return [
        '<span class="mono">' + PIA.esc(b.codigo_carnet) + '</span><br><span class="pequeno gris">' + cuenta + ' entregas</span>',
        PIA.esc(b.nombre),
        PIA.esc(b.grado),
        badgeModalidad(b.modalidad),
        badgeActivo(b.activo),
        '<div class="acciones">' +
          '<button class="btn pq" onclick="editarBeneficiario(' + b.id + ')">Editar</button>' +
          '<button class="btn pq" onclick="alternarBeneficiario(' + b.id + ')">' + (b.activo ? 'Retirar' : 'Activar') + '</button>' +
          '<button class="btn pq pel" onclick="eliminarBeneficiario(' + b.id + ')">Eliminar</button>' +
        '</div>'
      ];
    }),
    { vacio: 'Todavía no hay beneficiarios inscritos en el PAE.' }
  );
}

/* Arranque de la terminal y del panel del operador. */
document.addEventListener('DOMContentLoaded', function () {
  pintarContadores();
  pintarHistorial();
  pintarBeneficiarios();
  pintarBotonesPrueba();
  var campo = document.getElementById('carnet');
  if (campo) campo.focus();
});