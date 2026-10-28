# EduConnect.IA

> Un tutor inteligente que nunca cierra

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Plataforma web que acompaña el estudio con un tutor socrático, una biblioteca curricular adaptativa y un laboratorio de ética en el uso de la inteligencia artificial.

**Problema que resuelve:** Los estudiantes usan la IA para que les resuelva las tareas en lugar de aprender, y no siempre saben distinguir cuándo su uso es honesto.

**Estilo visual:** 10-educonnect · menú top

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (20 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Inicio** (`index.html`) — Portada: propósito del tutor, los cinco módulos y el estado del estudiante.
- **Mi panel** (`dashboard-estudiante.html`) — Diagnóstico del estudiante, su avance por unidad e insignias.
- **Prudenc.IA** (`prudencia-chat.html`) — El tutor socrático: filtra el plagio y escala en tres niveles.
- **Biblioteca** (`biblioteca.html`) — Recursos curriculares filtrables por unidad, tipo y nivel.
- **Panel docente** (`panel-docente.html`) — Analítica de consultas, alertas de plagio y revisión de recursos.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Portada con los cinco módulos.
| `dashboard-estudiante.html` | Panel del estudiante.
| `prudencia-chat.html` | El tutor socrático y el laboratorio de ética.
| `biblioteca.html` | Recursos curriculares.
| `panel-docente.html` | Analítica para el docente.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Archivo del proyecto.
| `js/prudencia-client.js` | Chat, filtro antiplagio y escalonamiento.
| `js/retos-etica.js` | Archivo del proyecto.
| `js/dashboard-estudiante.js` | Archivo del proyecto.
| `js/biblioteca.js` | Archivo del proyecto.
| `js/panel-docente.js` | Archivo del proyecto.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Estudiante líder de producto | Product Owner · define el alcance y valida con docentes |
| Estudiante de diseño | UI/UX · identidad, prototipos y accesibilidad |
| Estudiante de lógica | Desarrollo JS · chat, retos y datos |
| Estudiante de contenidos | Biblioteca curricular y guiones del tutor |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° pasa a backend con autenticación por roles, analítica docente y certificación digital de la ética en IA.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
