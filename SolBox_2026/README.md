# SolBox

> Tu voz llega, tu caso se resuelve

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Buzón virtual de PQRS con radicado único, filtro de lenguaje, plazo de respuesta y panel de gestión con trazabilidad.

**Problema que resuelve:** El buzón físico se llena de papeles que nadie lee, y quien reporta nunca sabe si su caso se atendió.

**Estilo visual:** 16-solbox · menú top

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (10 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Inicio** (`index.html`) — Portada: cómo funciona el buzón y el estado general.
- **Radicar** (`radicar.html`) — Formulario de radicación con filtro léxico y radicado único.
- **Seguimiento** (`seguimiento.html`) — Consulta del caso por su radicado.
- **Panel de gestión** (`panel-gestion.html`) — Panel del comité: radicados, plazos y estado por zona.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Portada y estado general.
| `radicar.html` | Formulario con filtro.
| `seguimiento.html` | Consulta por radicado.
| `panel-gestion.html` | Panel del comité.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Archivo del proyecto.
| `js/solbox.js` | Radicado, filtro y consultas.
| `js/radicar.js` | Archivo del proyecto.
| `js/seguimiento.js` | Archivo del proyecto.
| `js/panel.js` | Archivo del proyecto.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Estudiante líder de producto | Product Owner · proceso PQRS y plazos |
| Estudiante de diseño | UI/UX · identidad y accesibilidad |
| Estudiante de lógica | Desarrollo JS · radicado y filtro |
| Estudiante de análisis | Panel de gestión y reportes |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° integra autenticación institucional, notificaciones y tablero público de cumplimiento.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
