# The TechFlow

> La tecnología del colegio, ordenada y a la mano

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Mesa de ayuda y reservas de la sala TIC: turnos claros, cabina automática para trámites y votación de la emisora escolar.

**Problema que resuelve:** Los equipos y la sala de sistemas se piden de palabra, se cruzan los turnos y nadie sabe quién los tiene ni cuándo se liberan.

**Estilo visual:** 11-techflow · menú top

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (20 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Inicio** (`index.html`) — Portada: estado de la sala TIC y accesos a los cuatro servicios.
- **Reservas TIC** (`reservas-tic.html`) — Inventario de equipos y reservas por bloque, con CRUD.
- **Cabina** (`cabina-automatica.html`) — Cabina automática: genera un turno para el trámite elegido.
- **Radio y votación** (`easy-radio-votacion.html`) — La emisora escolar: canciones y votación en vivo.
- **Mesa de ayuda** (`mesa-ayuda.html`) — Reporte de fallas con radicado y seguimiento de estado.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Portada y estado de la sala TIC.
| `reservas-tic.html` | Equipos y reservas.
| `cabina-automatica.html` | Turnos.
| `easy-radio-votacion.html` | Emisora y votación.
| `mesa-ayuda.html` | Reporte de fallas.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Archivo del proyecto.
| `js/techflow.js` | Turnos, votos y radicados.
| `js/reservas.js` | Archivo del proyecto.
| `js/cabina.js` | Archivo del proyecto.
| `js/radio.js` | Archivo del proyecto.
| `js/mesa-ayuda.js` | Archivo del proyecto.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Estudiante líder de producto | Product Owner · alcance y validación con la sala TIC |
| Estudiante de diseño | UI/UX · identidad, prototipos y accesibilidad |
| Estudiante de lógica | Desarrollo JS · turnos, reservas y mesa de ayuda |
| Estudiante de soporte | Guiones de atención y base de conocimiento |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° pasa a backend con inventario real, notificaciones y reportes de uso por dependencia.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
