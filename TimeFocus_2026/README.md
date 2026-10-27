# TimeFocus

> Tu tiempo, tu foco, tu logro

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Aplicación web que organiza las tareas del colegio en un tablero Hoy/Próximo, detecta los huecos libres del horario semanal y acompaña el estudio con un reloj Pomodoro que acumula rachas y logros.

**Problema que resuelve:** Los estudiantes de décimo pierden trabajos por no tener un solo lugar donde ver qué deben entregar y cuándo, y cuando se sientan a estudiar se dispersan porque no dividen el trabajo en bloques cortos.

**Estilo visual:** 02-nocturno · menú sidebar

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (20 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Hoy** (`index.html`) — Tablero principal: lo que vence hoy, lo próximo y las alertas.
- **Tareas** (`tareas.html`) — Gestor de tareas: crear, editar, eliminar y descomponer en subtareas.
- **Horario** (`horario.html`) — Malla semanal de bloques ocupados y detección del primer hueco libre.
- **Enfoque** (`enfoque.html`) — Reloj Pomodoro de 25 minutos con rachas y logros.
- **Estadísticas** (`estadisticas.html`) — Tiempo invertido por materia y avance de las tareas.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Tablero Hoy/Próximo con las alertas de entregas.
| `tareas.html` | Gestor de tareas con sus subtareas.
| `horario.html` | Malla semanal y detector de huecos libres.
| `enfoque.html` | Reloj Pomodoro, rachas y logros.
| `estadisticas.html` | Tiempo invertido por materia.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Sistema de diseño con la paleta violeta.
| `js/tareas-crud.js` | Núcleo común + creación, edición y eliminación de tareas.
| `js/planificador-horarios.js` | Malla semanal y cálculo del primer hueco libre.
| `js/pomodoro-rachas.js` | Reloj Pomodoro y rachas.
| `js/asistente-pasos.js` | Descomposición de una tarea en pasos.
| `data/semilla-timefocus.json` | 6 tareas, 9 bloques de horario y 3 registros de enfoque.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Sara Isabel Restrepo Mejía | Product Owner · definición de las vistas y validación con el grupo |
| Andrés Felipe Cárdenas Ríos | Desarrollo JavaScript · lógica de tareas y detector de huecos |
| Valentina Ospina Arango | UI/UX y pruebas · diseño del tablero y del reloj Pomodoro |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° el horario y las tareas pasan a MySQL para poder sincronizarse entre dispositivos y notificar por correo. La separación actual (tareas, horario, pomodoro y estadísticas) ya permite conectar cada módulo sin reescribir los demás.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
