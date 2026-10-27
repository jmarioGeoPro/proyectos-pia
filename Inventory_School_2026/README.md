# Inventory School

> Juega hoy, devuelve a tiempo

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Sistema web que le pone un código QR a cada implemento deportivo del colegio: el estudiante escanea el balón, recibe una hora límite de 30 minutos para el descanso y el sistema devuelve el activo al inventario o lo manda a mantenimiento si llegó roto.

**Problema que resuelve:** El miedo a perder los balones hizo que Educación Física cerrara el préstamo en los descansos. Sin un responsable identificable ni un registro del estado en que sale y entra cada implemento, un balón dañado se queda en la bodega y nadie sabe quién lo tenía.

**Estilo visual:** 07-deportivo · menú sidebar

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (20 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Catálogo** (`index.html`) — Catálogo público con la disponibilidad en vivo de cada implemento deportivo.
- **Escáner QR** (`escaner-prestamo.html`) — Préstamo y devolución de implementos escaneando su código QR, con validación de sanción y mora.
- **Mi perfil** (`perfil-deportista.html`) — Perfil del estudiante: préstamo activo con hora límite, historial y sanción vigente.
- **Inventario** (`admin-inventario.html`) — Panel del docente de Educación Física: CRUD de activos, etiquetas QR y gráficas.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Catálogo en vivo: qué implementos hay y en qué estado están.
| `escaner-prestamo.html` | Escáner QR de préstamo y devolución con las reglas de mora.
| `perfil-deportista.html` | Préstamo activo, historial y sanción del estudiante.
| `admin-inventario.html` | CRUD de activos, etiquetas QR y gráficas del inventario.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Sistema de diseño con la paleta verde y ámbar.
| `css/dashboard.css` | Etiqueta QR, fichas del catálogo y barras de las gráficas.
| `js/inventario-crud.js` | Núcleo común + CRUD de implementos y generador de QR.
| `js/prestamos-mora.js` | Motor de préstamo, devolución, mora y bloqueo de 3 días.
| `js/estadisticas-chart.js` | Top de deportes y proporción del estado físico.
| `data/implementos-semilla.json` | 8 implementos, 6 estudiantes y 6 préstamos.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Juan Camilo Gómez Soto | Product Owner · visión funcional y enlace con Educación Física |
| Mateo Amariles Osorio | Scrum Master y QR · etiquetas de los implementos y pruebas de usuario |
| John Edison Cardona López | Líder lógica JS · motor de préstamo, mora y bloqueo pedagógico |
| José Alejandro Monsalve Quintero | Líder UI/UX · catálogo visual y semáforo de estado físico |
| Samuel Ospina Betancur | Base de datos y documentos · modelo MySQL y reporte de daños |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° el prototipo pasa a PHP 8 y MySQL 8 con las cuatro tablas del documento maestro (usuarios, categorias_deporte, implementos_activos y prestamos_movimientos). El estado EN_MANTENIMIENTO y el bloqueo por mora ya están modelados, así que migrar es conectar las mismas reglas a la base de datos.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
