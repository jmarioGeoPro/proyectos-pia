# The School of The Lost Souls

> Nadie debería perderse en el camino

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Un juego narrativo que pone al jugador en los zapatos de un estudiante en riesgo de desertar, y un panel que ayuda al docente a detectarlo a tiempo.

**Problema que resuelve:** La deserción escolar empieza con señales pequeñas que nadie alcanza a ver: faltas seguidas, notas que bajan, un silencio que se vuelve costumbre.

**Estilo visual:** 12-almas · menú top

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (10 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Inicio** (`index.html`) — Portada: el problema de la deserción y cómo se juega.
- **Jugar** (`game.html`) — El juego: cinco escenas con dos decisiones cada una y puntaje de permanencia.
- **Panel de permanencia** (`panel-permanencia.html`) — Panel docente: estudiantes en riesgo, sus señales y el estado del seguimiento.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Portada y sentido del juego.
| `game.html` | El juego de decisiones.
| `panel-permanencia.html` | Panel docente de riesgo.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Archivo del proyecto.
| `js/almas.js` | Motor del juego y cálculo de riesgo.
| `js/juego.js` | Archivo del proyecto.
| `js/panel.js` | Archivo del proyecto.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Estudiante líder de producto | Product Owner · historia y enfoque pedagógico |
| Estudiante de diseño | UI/UX · escenarios, tono y accesibilidad |
| Estudiante de lógica | Desarrollo JS · motor de decisiones y puntaje |
| Estudiante de investigación | Datos de permanencia y guiones |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° se conecta con el sistema de notas y asistencia para detectar el riesgo de forma automática.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
