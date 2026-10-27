# LolaConnect

> Conectamos, aprendemos, crecemos

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Red escolar privada que une dos necesidades en un solo entorno: un canal oficial de avisos verificados para directivos y docentes, y una red de hilos temáticos y grupos de interés para estudiantes. Antes de publicar revisa datos privados, analiza el lenguaje, abre una pausa reflexiva y deja todo en una bitácora de moderación auditable.

**Problema que resuelve:** Los avisos del Lola viajan de voz en voz o por grupos informales de WhatsApp, así que muchos se enteran tarde y con la información distorsionada. Los estudiantes terminan en redes abiertas donde exponen su celular y su documento, y los casos de burla no tienen un canal formal ni una trazabilidad.

**Estilo visual:** 06-social · menú top

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (44 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Inicio** (`index.html`) — Bienvenida, normas de convivencia, acceso seguro y matriz de permisos por rol.
- **Feed** (`feed.html`) — Feed cronológico dual: avisos oficiales verificados e hilos de la comunidad, con comentarios y reportes.
- **Grupos y eventos** (`grupos-eventos.html`) — Clubes escolares, calendario de eventos y confirmación de asistencia.
- **Mi perfil** (`perfil.html`) — Perfil público con avatar, intereses y reglas de privacidad; documento y teléfono siempre ocultos.
- **Moderación** (`moderacion.html`) — Cola de reportes, bitácora auditable y validador preventivo de convivencia.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Bienvenida, normas de convivencia, acceso seguro y matriz de permisos.
| `feed.html` | Avisos verificados, hilos por categoría, comentarios y reportes.
| `grupos-eventos.html` | Clubes escolares, calendario de eventos y confirmación de asistencia.
| `perfil.html` | Avatar, intereses, privacidad y vista previa del perfil público.
| `moderacion.html` | Cola de reportes, bitácora auditable y validador preventivo.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Sistema de diseño con la paleta azul y amarilla institucional.
| `css/responsive.css` | Ajustes mobile-first y navegación cómoda en el celular.
| `js/auth-roles.js` | Núcleo común + usuarios, sesión, roles y matriz de permisos.
| `js/feed-hilos.js` | Motor de publicación del algoritmo, feed, comentarios, grupos y perfil.
| `js/moderador-preventivo.js` | Filtro anti-acoso y de datos privados, pausa reflexiva y bitácora.
| `data/semilla-lolaconnect.json` | 7 usuarios, 9 publicaciones, 6 comentarios, 6 grupos, 5 eventos, 5 reportes y 6 movimientos.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Nicolás Arteaga Mazo | Líder de producto y FrontEnd · arquitectura de las vistas y visión de producto |
| Juan Fernando Gómez Hernández | Arquitecto JavaScript y base de datos · hilos, avisos y moderación |
| Luis Yair Vallenilla Tovar | Líder UI/UX · diseño mobile-first e identidad visual |
| Susana Zapata Tobón | Calidad y convivencia · marco teórico, ética digital y pruebas del filtro |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° el prototipo pasa a PHP 8 y MySQL 8 con las tablas usuarios, avisos_oficiales, hilos_comunidad, comentarios_hilo y reportes_convivencia. El hash de contraseñas se hace con password_hash() y la verificación de identidad con el correo institucional.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
