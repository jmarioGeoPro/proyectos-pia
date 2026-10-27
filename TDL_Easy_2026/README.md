# TDL Easy

> Toma de lista eficaz y fácil

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Aplicación web que reemplaza el llamado de lista por un código QR de 10 minutos por clase: el docente lo proyecta, cada estudiante lo escanea una sola vez desde su celular y la planilla se consolida en segundos, con semáforo verde o rojo, porcentaje semanal y mensual y alerta inmediata al acudiente cuando hay inasistencia.

**Problema que resuelve:** En grupos de 35 a 45 estudiantes el llamado verbal consume entre 5 y 8 minutos por hora de clase, y muchos alumnos cruzan la portería pero se quedan en pasillos y baños durante los cambios de bloque. Los acudientes creen que sus hijos están en clase porque salieron temprano de casa.

**Estilo visual:** 03-terminal · menú top

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (41 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Ingresar** (`index.html`) — Login con documento y clave, política de cierre automático de sesión y botón de ayuda.
- **Escáner** (`escaner-estudiante.html`) — Vista del estudiante: cámara trasera, simulador de lectura y semáforo verde o rojo.
- **Panel docente** (`panel-docente.html`) — Vista del docente: generador de QR dinámico por asignatura y hora, planilla en vivo y cierre de ventana.
- **Portal acudiente** (`portal-acudiente.html`) — Vista del acudiente: semáforo del día, inasistencias y porcentaje semanal y mensual.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Login por documento y clave, política de cierre de sesión y ayuda.
| `escaner-estudiante.html` | Cámara trasera, simulador de lectura y semáforo del estudiante.
| `panel-docente.html` | Generador de QR por asignatura y hora, planilla en vivo y cierre de ventana.
| `portal-acudiente.html` | Semáforo del día, inasistencias y porcentajes para la familia.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Sistema de diseño con la paleta negro, azul institucional y amarillo.
| `js/auth-sesion.js` | Núcleo común + credenciales, sesión y alertas al acudiente.
| `js/escaner-qr.js` | Algoritmo Registrar_Asistencia_QR_TDLEasy y semáforo.
| `js/panel-docente.js` | QR de la clase, planilla en vivo y cierre de la ventana.
| `js/portal-acudiente.js` | Consulta del acudiente y porcentaje semanal y mensual.
| `data/semilla-tdl.json` | 9 usuarios, 8 sesiones QR, 18 marcas de asistencia y 6 alertas.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Miguel Ángel Ruiz Giraldo | Product Owner · reglas de negocio anti-fraude y articulación con los docentes de aula |
| Justin Andrés Castillo Seguro | Scrum Master y JavaScript · cámara, token de sesión y lógica de escaneo |
| Felipe Vallejo Arias | UI/UX y reportes · paleta tecnológica, semáforos y cálculo de porcentajes |
| José Miguel Ledezma Benítez | Apoyo QA · pruebas de escritorio y de campo, manual de usuario |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° el prototipo pasa a PHP 8 y MySQL 8 con cinco tablas normalizadas: usuarios, asignaturas_grupos, sesiones_qr_clase (token_hash, hora_apertura y hora_cierre), registros_asistencia (con restricción UNIQUE entre sesión y estudiante) y alertas_acudientes. El JavaScript de 10° ya separa sesión, escáner, panel y portal, así que cada módulo se conecta sin reescribir los demás.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
