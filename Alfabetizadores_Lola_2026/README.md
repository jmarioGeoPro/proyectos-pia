# Alfabetizadores Lola

> Ochenta horas que dejan huella

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Plataforma web que reemplaza la planilla de firmas por un registro digital: publica cupos por dependencia, cuenta las horas de cada jornada, exige la firma del supervisor de la sede y habilita la constancia cuando el estudiante completa las 80 horas.

**Problema que resuelve:** Las 80 horas del servicio social viven en hojas de papel con firmas manuscritas: si se pierde la planilla, se pierden meses de trabajo y la graduación queda en riesgo. Además nadie sabe qué cupos hay libres y la coordinadora atiende a más de 400 estudiantes sin un tablero.

**Estilo visual:** 09-academico · menú top

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (29 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Inicio** (`index.html`) — Bienvenida, marco legal de las 80 horas y sedes con cupos.
- **Mi panel** (`panel-estudiante.html`) — Barra de avance 24/80, registro de jornadas, historial y constancia.
- **Sedes y bolsa** (`oportunidades-sedes.html`) — Catálogo de cupos por dependencia y bolsa inteligente de reemplazos.
- **Validador** (`validador-sede.html`) — Panel del supervisor: firma digital de jornadas y buzón de evaluación.
- **Coordinación** (`admin-coordinadora.html`) — Tablero de la coordinadora: estudiantes en riesgo, avance por sede y constancias.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Bienvenida, marco legal y sedes con cupos.
| `panel-estudiante.html` | Barra 24/80, registro de jornadas y constancia.
| `oportunidades-sedes.html` | Cupos por dependencia y bolsa de reemplazos.
| `validador-sede.html` | Firma digital de horas y buzón de evaluación.
| `admin-coordinadora.html` | Tablero de riesgo, avance por sede y constancias.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Sistema de diseño con la paleta azul, blanca y amarilla.
| `js/conteo-horas.js` | Núcleo común + meta de 80 horas y cálculo de jornadas.
| `js/bolsa-reemplazos.js` | Cupos, postulaciones y bolsa de reemplazos.
| `js/validador-firmas.js` | Doble validación: firma del supervisor y evaluación.
| `js/generador-pazysalvo.js` | Constancia imprimible y tablero de la coordinadora.
| `data/semilla-alfabetizacion.json` | 6 estudiantes, 6 sedes, 7 registros, 5 novedades y 5 inscripciones.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Isabel Dahyana Mesa Echavarría | Product Owner · enlace con la docente encargada del servicio social |
| Ana Sofía Alarcón Botero | Scrum Master · cronograma, requisitos y validación con dependencias |
| Ismael Zapata Luján | Líder lógica JS · motor de horas, validación doble y bolsa de reemplazos |
| Ismael Rivera Ciro | Líder UI/UX · vistas azul, blanco y amarillo |
| Juan José Restrepo Bedoya | Datos y reportes · constancias imprimibles y base de datos |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° el prototipo pasa a PHP 8 y MySQL 8 con las cuatro tablas del documento maestro (usuarios, sedes_oportunidades, registros_horas y novedades_reemplazos). La doble validación y el conteo ya están resueltos, así que migrar es conectar las mismas reglas a la base de datos.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
