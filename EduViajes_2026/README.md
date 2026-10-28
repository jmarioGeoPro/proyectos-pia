# EduViajes

> Se aprende más cuando se sale a ver

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Catálogo de salidas pedagógicas con su bitácora de aprendizaje, planeación docente y autorización del acudiente en un solo lugar.

**Problema que resuelve:** Las salidas se organizan por WhatsApp, las autorizaciones se pierden en papel y al final nadie sabe qué aprendieron los estudiantes.

**Estilo visual:** 13-eduviajes · menú top

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (20 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Inicio** (`index.html`) — Portada: próximas salidas y acceso a los cuatro espacios.
- **Destinos** (`catalogo-destinos.html`) — Catálogo de salidas con su área, grado, costo y disponibilidad.
- **Bitácora** (`bitacora-kolb.html`) — La bitácora de aprendizaje con las cuatro etapas del ciclo de Kolb.
- **Planificador** (`planificador-docente.html`) — Programación de salidas: fecha, curso, cupos y transporte.
- **Acudiente** (`acudiente.html`) — Autorización de salidas por parte del acudiente, con su estado.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Portada y próximas salidas.
| `catalogo-destinos.html` | Destinos filtrables.
| `bitacora-kolb.html` | Bitácora del ciclo de Kolb.
| `planificador-docente.html` | Programación de salidas.
| `acudiente.html` | Autorizaciones.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Archivo del proyecto.
| `js/viajes.js` | Bitácora, filtros y tablas.
| `js/destinos.js` | Archivo del proyecto.
| `js/bitacora.js` | Archivo del proyecto.
| `js/planificador.js` | Archivo del proyecto.
| `js/acudiente.js` | Archivo del proyecto.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Estudiante líder de producto | Product Owner · alcance y alianza con docentes |
| Estudiante de diseño | UI/UX · identidad, mapa y accesibilidad |
| Estudiante de lógica | Desarrollo JS · bitácora y autorizaciones |
| Estudiante de contenidos | Guías de campo y ciclo de Kolb |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° suma mapa interactivo, presupuesto por familia y registro fotográfico de cada salida.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
