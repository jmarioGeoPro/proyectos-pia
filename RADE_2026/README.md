# R.A.D.E

> Un carnet, una ración, cero fichos

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Aplicación web que reemplaza los fichos de papel del restaurante escolar: valida el carnet del estudiante en segundos, bloquea el doble reclamo del mismo día, descuenta la ración de la modalidad que le corresponde y concilia al cierre cuántos titulares faltaron y cuántas raciones sobraron para reasignación.

**Problema que resuelve:** El restaurante del Lola reparte fichos de cartón que se pierden, se dañan o se prestan para reclamar dos veces. Al cierre nadie sabe con exactitud cuántas raciones llegaron, cuántos titulares faltaron y cuánto sobró, así que los alfabetizadores gastan el descanso contando a mano y los alimentos se pierden.

**Estilo visual:** 05-calido · menú tabs

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (39 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Inicio** (`index.html`) — Portada con el estado del menú del día, el ingreso por rol y el resumen de la jornada.
- **Terminal de carnet** (`validador-carnet.html`) — Terminal de escaneo: valida el carnet, entrega la ración y bloquea el segundo reclamo del día.
- **Lotes y sobrantes** (`lotes-dashboard.html`) — Panel del operador PAE: recepción del lote, conciliación, monitor de entregas y beneficiarios.
- **Mi PAE** (`mi-pae.html`) — Portal del estudiante: modalidad, historial de raciones y buzón de sugerencias nutricionales.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Portada con el menú del día, el ingreso por rol y el resumen de la jornada.
| `validador-carnet.html` | Terminal de escaneo del carnet con semáforo y bloqueo del doble reclamo.
| `lotes-dashboard.html` | Recepción de lotes, conciliación de sobrantes e inasistentes y beneficiarios.
| `mi-pae.html` | Portal del estudiante: modalidad, historial y sugerencias nutricionales.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Sistema de diseño con la paleta verde y ámbar del PAE.
| `js/validador-unico.js` | Núcleo común + beneficiarios y validación única diaria del carnet.
| `js/conciliacion-lotes.js` | Lotes, conciliación de inasistentes y sobrantes, cierre y sugerencias.
| `data/beneficiarios-pae.json` | Los 9 beneficiarios inscritos en el PAE.
| `data/lotes-dia.json` | Los 6 lotes diarios con sus cantidades recibidas.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Thomas Alexis López Robles | Product Owner · visión funcional del PAE y articulación con docentes y alfabetizadores |
| Emmanuel Ortiz López | Scrum Master · sprints, control de calidad y pruebas del carnet único diario |
| Sebastián Alexis Pulido Cabrera | Líder de lógica JavaScript · conciliación de lotes y bloqueo del doble reclamo |
| David Mejía Meneses | Líder UI/UX · terminal de validación y panel del operador |
| Jerónimo Caicedo Patiño | Datos y documentación · semilla JSON, modelo MySQL y buzón nutricional |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° el prototipo pasa a PHP 8 y MySQL 8 con las cuatro tablas ya definidas en el documento maestro: beneficiarios_pae, lotes_diarios, entregas_racion y sugerencias_pae. La restricción UNIQUE(id_lote, id_beneficiario) garantiza en la base de datos el mismo bloqueo que hoy se resuelve en JavaScript.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
