# Master Acudiente

> Saber dónde está, cómo va y qué necesita

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Panel de monitoreo para el acudiente: asistencia, notas, novedades y alertas en tiempo real de su estudiante.

**Problema que resuelve:** El acudiente solo se entera de los problemas cuando llega el boletín, y para entonces ya pasó el trimestre.

**Estilo visual:** 18-master · menú top

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (10 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Inicio** (`index.html`) — Portada del monitoreo.
- **Estudiantes** (`estudiantes.html`) — Ficha de cada estudiante con su semáforo.
- **Alertas** (`alertas.html`) — Alertas de inasistencia, notas y convivencia.
- **Panel** (`panel.html`) — Panel completo del grupo.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Portada del monitoreo.
| `estudiantes.html` | Semáforo por estudiante.
| `alertas.html` | Alertas abiertas.
| `panel.html` | Grupo completo.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Archivo del proyecto.
| `js/master.js` | Semáforos y tablas.
| `js/estudiantes.js` | Archivo del proyecto.
| `js/alertas.js` | Archivo del proyecto.
| `js/panel.js` | Archivo del proyecto.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Estudiante líder de producto | Product Owner · qué necesita el acudiente |
| Estudiante de diseño | UI/UX · paneles y alertas |
| Estudiante de lógica | Desarrollo JS · semáforos y alertas |
| Estudiante de datos | Asistencia, notas y novedades |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° integra notificaciones push y canal directo con el director de grupo.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
