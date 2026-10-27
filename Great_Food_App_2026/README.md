# Great Food App

> Pide antes del timbre, recoge sin fila

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Aplicación web de pre-pedidos para la tienda escolar: el estudiante arma su pedido desde el celular, el sistema descuenta el stock, calcula el total y le entrega un ficho virtual numerado por franja de descanso; el tendero ve la cola y avisa cuando está listo.

**Problema que resuelve:** Cientos de estudiantes piden comida en dos descansos de veinte a treinta minutos. La fila para preguntar qué hay, pedir, pagar y reclamar tarda entre 15 y 20 minutos, bloquea los pasillos y deja a muchos sin comer cuando suena el timbre.

**Estilo visual:** 08-foodie · menú top

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (17 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Inicio** (`index.html`) — Portada con el menú del día, las promociones y las alertas de agotados.
- **Catálogo** (`catalogo.html`) — Menú filtrable por categoría y buscador, con stock en vivo y carrito.
- **Mi pedido** (`pedido-turno.html`) — Carrito, datos del pedido, método de pago y comprobante del ficho virtual.
- **Modo tienda** (`modo-tienda-admin.html`) — Panel del tendero: cola por franja, pantalla de turnos listos y métricas de venta.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Portada con menú del día, promociones y agotados.
| `catalogo.html` | Menú filtrable con buscador, stock en vivo y carrito.
| `pedido-turno.html` | Carrito, pago y comprobante del ficho virtual.
| `modo-tienda-admin.html` | Cola de pedidos por franja y métricas de venta.
| `construccion.html` | Archivo del proyecto.
| `css/global.css` | Sistema de diseño con la paleta roja y ámbar.
| `css/components.css` | Tarjetas de producto, carrito, ficho y pantalla de turnos.
| `js/catalog.js` | Núcleo común + catálogo, categorías y control de stock.
| `js/orders-cart.js` | Carrito y motor de pedidos: valida, descuenta y genera el turno.
| `js/queue-turnos.js` | Cola de la tienda, pantalla KDS y aviso al estudiante.
| `js/admin-stats.js` | Ventas, Top 5, ingresos por franja y calificación.
| `data/productos.json` | Los 11 productos de la tienda escolar.
| `data/pedidos-semilla.json` | Los 6 pedidos de ejemplo con sus turnos.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Jesús Alberto Pineda Pino | Product Owner · caso de prueba y flujo del estudiante |
| Sofía Tangarife Olaya | Scrum Master y QA · calidad del prototipo y gestión ágil |
| Daniel Felipe Ramírez Gómez | Líder UI/UX · catálogo, combos y diseño responsive |
| Miguel Ángel Moreno Piedrahíta | Líder lógica JS · motor de pedidos, stock y turnos |
| Deiner Fabián Cáceres Zapata | Dashboard y documentos · modo tienda y métricas de venta |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° el prototipo pasa a PHP 8 y MySQL 8 con las cuatro tablas del documento maestro (usuarios, productos, pedidos y detalle_pedido). El turno por franja y el descuento de stock ya están resueltos en JavaScript, así que la migración es conectar las mismas reglas a la base de datos.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
