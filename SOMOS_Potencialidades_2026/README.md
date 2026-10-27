# SOMOS Potencialidades

> Potenciamos talentos, compartimos arte, transformamos realidades

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Plataforma web que identifica, impulsa y da reconocimiento a los talentos artísticos y expresivos de los estudiantes de la I.E. Lola González, con privacidad por niveles, moderación docente y el sello de la Calidad Humana.

**Problema que resuelve:** El talento artístico de los estudiantes se queda en el salón o en el cuaderno: no hay un lugar donde se vea, se comparta y se reconozca, y muchos prefieren no mostrar lo que hacen por miedo a la burla.

**Estilo visual:** 04-somos · menú top

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (37 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Inicio** (`index.html`) — Portada: bienvenida compacta y la galería de trabajos con filtros por categoría y me gusta.
- **Favoritos** (`favoritos.html`) — Las obras que el estudiante apoyó con me gusta.
- **Explorar** (`explorar.html`) — Galería filtrable por categoría artística, técnica y grado, con apoyos y comentarios.
- **Portafolio** (`portafolio.html`) — Perfil del estudiante con sus obras, el diario de proceso y las insignias.
- **Publicar** (`publicar.html`) — Subida de obra con privacidad, texto alternativo obligatorio y Mentor Art.
- **Desafíos** (`desafios.html`) — Retos semanales, colaboraciones en dúo e insignias por constancia.
- **Moderación** (`moderacion-docente.html`) — Panel docente: cola de aprobación, reportes y bloqueo preventivo.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Portada: bienvenida compacta, categorías y galería con me gusta.
| `favoritos.html` | Las obras que el estudiante apoyó.
| `explorar.html` | Galería filtrable por categoría, técnica y grado.
| `portafolio.html` | Perfil del estudiante, diario de proceso e insignias.
| `publicar.html` | Subida con privacidad, texto alternativo y Mentor Art.
| `desafios.html` | Retos semanales y colaboraciones en dúo.
| `moderacion-docente.html` | Cola de aprobación y reportes con bloqueo preventivo.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Sistema de diseño con la paleta amarilla, azul y blanca.
| `js/galeria.js` | Núcleo común + obras, apoyos con voto único y publicación.
| `js/moderacion.js` | Aprobar, pedir cambios, reportar y avisar el umbral de apoyos.
| `js/comentarios-guiados.js` | Plantillas positivas y validación contra el ciberacoso.
| `js/gamificacion.js` | Desafíos, participaciones e insignias por constancia.
| `js/mentor-art.js` | Asistente formativo por reglas y texto alternativo sugerido.
| `js/inicio.js` | Galería de la portada, filtros, me gusta con pulso y favoritos.
| `data/obras-semilla.json` | 7 estudiantes, 8 obras, 6 comentarios y 5 apoyos.
| `data/desafios.json` | 5 desafíos semanales y 6 insignias otorgadas.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Ana Lucía Romero Pardo | Product Owner · privacidad por niveles, anonimato gradual y enfoque pedagógico |
| Juan José Doria Ossa | Scrum Master · repositorio, entregables y coordinación de los sprints |
| María Kamila Piedrahíta Ochoa | Líder UI/UX · identidad amarillo/azul/blanco, wireframes y accesibilidad WCAG 2.2 |
| Mark Santiago Betancourt López | Líder de lógica JS y datos · galería, moderación, gamificación y Mentor Art |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° la galería pasa a PHP 8 y MySQL 8 con almacenamiento real de archivos, notificación al acudiente y un panel de moderación con historial. El modelo de datos y la moderación ya están resueltos en el prototipo.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
