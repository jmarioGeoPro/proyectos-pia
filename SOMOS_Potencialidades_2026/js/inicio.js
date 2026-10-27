/**
 * inicio.js — portada y favoritos de SOMOS Potencialidades.
 * Pinta la galería con filtros por categoría, el me gusta con pulso amarillo,
 * la página de favoritos y las secciones informativas.
 * Trabaja con los datos reales: no inventa obras.
 *
 * Los nombres llevan el sufijo «Portada» para no chocar con los de galeria.js,
 * que se carga en las mismas páginas.
 */
'use strict';

var CATEGORIAS = ['Dibujo', 'Pintura', 'Fotografía', 'Poesía', 'Danza', 'Canto', 'Video'];

/* Degradados suaves en la paleta de la presentación: azul y amarillo. */
var DEGRADADOS = {
  Dibujo: 'linear-gradient(140deg, #FFF6D8 0%, #F9DD6C 100%)',
  Pintura: 'linear-gradient(140deg, #EAF2FD 0%, #C9DCF7 100%)',
  Fotografía: 'linear-gradient(140deg, #F0F4FA 0%, #D5E2F2 100%)',
  Poesía: 'linear-gradient(140deg, #F1ECF8 0%, #DED2F0 100%)',
  Danza: 'linear-gradient(140deg, #FDF1EE 0%, #F7DAD3 100%)',
  Canto: 'linear-gradient(140deg, #FFF9E6 0%, #FCEBAE 100%)',
  Video: 'linear-gradient(140deg, #EEF2F9 0%, #D8E1F0 100%)'
};

var categoriaActiva = 'Todos';

/* ---------------- me gusta y favoritos ---------------- */

/** Los identificadores de las obras que este estudiante ya apoyó. */
function misApoyos() {
  var est = estudianteActual();
  var ids = [];
  if (!est) return ids;
  PIA.listar('apoyos').forEach(function (a) {
    if (Number(a.id_estudiante) === Number(est.id)) ids.push(Number(a.id_obra));
  });
  return ids;
}

function leGusta(id) { return misApoyos().indexOf(Number(id)) !== -1; }

/** Da o quita el me gusta, y hace latir el botón. */
function alternarGusta(id, boton) {
  var obra = obraPorId(id);
  var est = estudianteActual();
  if (!obra || !est) { PIA.toast('No se pudo registrar el apoyo.', 'mal'); return; }
  if (leGusta(id)) {
    var apoyos = PIA.listar('apoyos');
    for (var i = 0; i < apoyos.length; i++) {
      if (Number(apoyos[i].id_obra) === Number(id) && Number(apoyos[i].id_estudiante) === Number(est.id)) {
        PIA.eliminar('apoyos', apoyos[i].id);
        break;
      }
    }
    PIA.actualizar('obras', id, { total_apoyos: Math.max(0, apoyosDeObra(obra) - 1) });
    PIA.toast('Quitaste tu me gusta.');
  } else {
    PIA.insertar('apoyos', { id_obra: Number(id), id_estudiante: Number(est.id), fecha: PIA.hoy() });
    PIA.actualizar('obras', id, { total_apoyos: apoyosDeObra(obra) + 1 });
    PIA.toast('¡Te gustó! Se guardó en Favoritos.');
    if (boton) {
      boton.classList.remove('pulso');
      void boton.offsetWidth;
      boton.classList.add('pulso');
      setTimeout(function () { boton.classList.remove('pulso'); }, 700);
    }
  }
  pintarPortada();
  if (document.getElementById('favoritosLista')) pintarFavoritos();
}

/* ---------------- la tarjeta ---------------- */

function tarjetaPortada(o) {
  var gusta = leGusta(o.id);
  var fondo = DEGRADADOS[o.categoria] || 'linear-gradient(135deg, #F2F5FA, #E3E9F2)';
  var inicial = String(o.titulo || '?').charAt(0).toUpperCase();
  return '<article class="obra">' +
    '<div class="obra-portada" style="background:' + fondo + '" role="img" aria-label="' + PIA.esc(o.texto_alt) + '">' +
      '<span class="monograma" aria-hidden="true">' + PIA.esc(inicial) + '</span>' +
      '<span class="sello">SOMOS · Lola González</span>' +
    '</div>' +
    '<div class="obra-cuerpo">' +
      '<span class="obra-cat">' + PIA.esc(o.categoria) + '</span>' +
      '<h3 class="obra-titulo">' + PIA.esc(o.titulo) + '</h3>' +
      '<span class="obra-autor">' + PIA.esc(autorDeObra(o)) + ' · ' + PIA.esc(o.grado) + '</span>' +
      '<div class="obra-pie">' +
        '<button class="gusta" type="button" aria-pressed="' + (gusta ? 'true' : 'false') + '"' +
          ' aria-label="' + (gusta ? 'Quitar me gusta de ' : 'Me gusta ') + PIA.esc(o.titulo) + '"' +
          ' onclick="alternarGusta(' + o.id + ', this)">' +
          '<span class="corazon" aria-hidden="true">♥</span>' +
          '<span>' + apoyosDeObra(o) + '</span>' +
        '</button>' +
        '<button class="btn pq" type="button" style="margin-left:auto" onclick="verObra(' + o.id + ')">Ver obra</button>' +
      '</div>' +
    '</div>' +
  '</article>';
}

/* ---------------- filtros ---------------- */

function pintarChips() {
  var cont = document.getElementById('chipsCategorias');
  if (!cont) return;
  var obras = obrasAprobadas();
  var cuenta = {};
  obras.forEach(function (o) { cuenta[o.categoria] = (cuenta[o.categoria] || 0) + 1; });
  cont.innerHTML = ['Todos'].concat(CATEGORIAS).map(function (c) {
    var n = c === 'Todos' ? obras.length : (cuenta[c] || 0);
    return '<button class="chip" type="button" data-categoria="' + PIA.esc(c) + '"' +
      ' aria-pressed="' + (c === categoriaActiva ? 'true' : 'false') + '"' +
      ' onclick="filtrarCategoria(this.getAttribute(&quot;data-categoria&quot;))">' +
      PIA.esc(c) + '<span class="cuenta">' + n + '</span></button>';
  }).join('');
}

function filtrarCategoria(categoria) {
  categoriaActiva = categoria;
  pintarChips();
  pintarPortada();
}

/* ---------------- la galería ---------------- */

function pintarPortada() {
  var cont = document.getElementById('portadaGaleria');
  if (!cont) return;
  var obras = obrasAprobadas();
  if (categoriaActiva !== 'Todos') {
    obras = obras.filter(function (o) { return o.categoria === categoriaActiva; });
  }
  var cuenta = document.getElementById('cuentaGaleria');
  if (cuenta) {
    cuenta.textContent = obras.length === 0
      ? 'Todavía no hay obras en ' + categoriaActiva + '.'
      : obras.length + (obras.length === 1 ? ' obra' : ' obras') +
        (categoriaActiva === 'Todos' ? ' publicadas por los estudiantes.' : ' de ' + categoriaActiva + '.');
  }
  if (!obras.length) {
    cont.innerHTML = '<div class="vacio" style="grid-column:1/-1">Todavía no hay obras en ' + PIA.esc(categoriaActiva) +
      '. Si tienes una, <a href="publicar.html">publícala</a> y sé el primero.</div>';
    return;
  }
  cont.innerHTML = obras.map(tarjetaPortada).join('');
}

/* ---------------- favoritos ---------------- */

function pintarFavoritos() {
  var cont = document.getElementById('favoritosLista');
  if (!cont) return;
  var ids = misApoyos();
  var obras = obrasAprobadas().filter(function (o) { return ids.indexOf(Number(o.id)) !== -1; });
  var cuenta = document.getElementById('cuentaFavoritos');
  if (cuenta) {
    cuenta.textContent = obras.length === 0
      ? 'Todavía no le has dado me gusta a ninguna obra.'
      : obras.length + (obras.length === 1 ? ' obra guardada.' : ' obras guardadas.');
  }
  if (!obras.length) {
    cont.innerHTML = '<div class="vacio" style="grid-column:1/-1">Cuando veas una obra que te guste, toca el corazón y aparecerá aquí. ' +
      '<a href="explorar.html">Explora la galería</a>.</div>';
    return;
  }
  cont.innerHTML = obras.map(tarjetaPortada).join('');
}

/* ---------------- equipo, cifras y gráficos ---------------- */

var EQUIPO_SOMOS = [
  { nombre: 'María Kamila Piedrahíta Ochoa', rol: 'Líder UI/UX', iniciales: 'MK' },
  { nombre: 'Ana Lucía Romero Pardo', rol: 'Product Owner', iniciales: 'AL' },
  { nombre: 'Mark Santiago Betancourt López', rol: 'Lógica JS y datos', iniciales: 'MS' },
  { nombre: 'Juan José Doria Ossa', rol: 'Scrum Master', iniciales: 'JJ' }
];

function pintarEquipo() {
  var cont = document.getElementById('equipo');
  if (!cont) return;
  cont.innerHTML = EQUIPO_SOMOS.map(function (p) {
    return '<div class="persona"><div class="foto" aria-hidden="true">' + p.iniciales + '</div>' +
      '<b>' + PIA.esc(p.nombre) + '</b><span>' + PIA.esc(p.rol) + '</span></div>';
  }).join('');
}

function pintarCifras() {
  var cont = document.getElementById('cifras');
  if (!cont) return;
  var datos = [
    { n: PIA.listar('obras').length, t: 'Obras publicadas', s: 'talento compartido' },
    { n: PIA.listar('estudiantes').length, t: 'Artistas', s: 'estudiantes activos' },
    { n: PIA.listar('desafios').length, t: 'Desafíos', s: 'retos semanales' },
    { n: PIA.listar('apoyos').length, t: 'Apoyos', s: 'reconocimientos' }
  ];
  cont.innerHTML = datos.map(function (d, i) {
    return '<div class="cifra"><strong id="cifra' + i + '">0</strong><b>' + PIA.esc(d.t) + '</b><span>' + PIA.esc(d.s) + '</span></div>';
  }).join('');
  datos.forEach(function (d, i) { PIA.contar('cifra' + i, d.n); });
}

function pintarBarra(id, pares, destacar) {
  var cont = document.getElementById(id);
  if (!cont) return;
  if (!pares.length) { cont.innerHTML = '<p class="vacio">Sin datos todavía.</p>'; return; }
  var mayor = pares.reduce(function (m, p) { return Math.max(m, p[1]); }, 1);
  cont.innerHTML = pares.map(function (p, i) {
    var alto = Math.max(6, Math.round(p[1] / mayor * 100));
    return '<div class="col' + (destacar && i === 0 ? ' oro' : '') + '">' +
      '<div class="pista"><div class="barra-col" style="height:' + alto + '%"></div></div>' +
      '<div class="etiqueta">' + PIA.esc(p[0]) + '<b>' + p[1] + '</b></div>' +
    '</div>';
  }).join('');
}

function agruparObras(lista, campo) {
  var cuenta = {};
  lista.forEach(function (x) {
    var k = x[campo] || 'Sin dato';
    cuenta[k] = (cuenta[k] || 0) + 1;
  });
  return Object.keys(cuenta).map(function (k) { return [k, cuenta[k]]; })
    .sort(function (a, b) { return b[1] - a[1]; }).slice(0, 6);
}

function pintarEstadisticas() {
  var obras = PIA.listar('obras');
  pintarBarra('graficoCategorias', agruparObras(obras, 'categoria'), true);
  pintarBarra('graficoGrados', agruparObras(obras, 'grado'), false);
  var cont = document.getElementById('tablaDesafios');
  if (!cont) return;
  cont.innerHTML = PIA.tabla(
    ['Desafío', 'Tema', 'Participantes', 'Estado'],
    PIA.listar('desafios').slice(0, 6).map(function (d) {
      var partes = (d.participantes || []).length || 1;
      return [PIA.esc(d.titulo || d.nombre || '—'), PIA.esc(d.tema || d.categoria || '—'),
        '<b>' + partes + '</b>', '<span class="badge ok">' + PIA.esc(d.estado || 'Vigente') + '</span>'];
    }),
    { vacio: 'Todavía no hay desafíos.' }
  );
}

/* ---------------- contacto ---------------- */

function enviarContacto() {
  var nombre = PIA.valor('cNombre');
  var correo = PIA.valor('cCorreo');
  var mensaje = PIA.valor('cMensaje');
  var aviso = document.getElementById('contactoAviso');
  if (!nombre) { PIA.toast('Escribe tu nombre.', 'mal'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(correo)) { PIA.toast('El correo no parece válido.', 'mal'); return; }
  if (PIA.palabras(mensaje) < 4) { PIA.toast('Cuéntanos un poco más (mínimo 4 palabras).', 'mal'); return; }
  PIA.insertar('mensajes', { nombre: nombre, correo: correo, mensaje: mensaje, fecha: PIA.hoy() });
  aviso.innerHTML = '<div class="aviso ok">¡Gracias, ' + PIA.esc(nombre.split(' ')[0]) + '! Tu mensaje quedó registrado.</div>';
  PIA.poner('cNombre', ''); PIA.poner('cCorreo', ''); PIA.poner('cMensaje', '');
  PIA.brindis();
  PIA.toast('Mensaje enviado.');
}

/* ---------------- arranque ---------------- */

document.addEventListener('DOMContentLoaded', function () {
  /* la nube se despega del techo cuando se baja */
  var nube = document.querySelector('.menu');
  if (nube) {
    var revisar = function () { nube.classList.toggle('flotando', window.scrollY > 30); };
    window.addEventListener('scroll', revisar, { passive: true });
    revisar();
  }

  if (document.getElementById('portadaGaleria')) { pintarChips(); pintarPortada(); }
  if (document.getElementById('favoritosLista')) pintarFavoritos();
  if (document.getElementById('equipo')) pintarEquipo();
  if (document.getElementById('cifras')) { pintarCifras(); pintarEstadisticas(); }
  document.querySelectorAll('a[href="#galeriaPortada"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var destino = document.getElementById('galeriaPortada');
      if (!destino) return;
      ev.preventDefault();
      destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
