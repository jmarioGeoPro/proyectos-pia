# Tu Opinión Cuenta

> Tu voz construye la Lola

**Proyecto Integrador de Aula (PIA) 2026** · I.E. Lola González · Grado 10° · Grupo 10°05
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Plataforma web de participación democrática que reemplaza el buzón de madera por un canal digital trazable: valida el correo institucional, modera el lenguaje, asigna un código de radicado único y garantiza respuesta en 3 días hábiles.

**Problema que resuelve:** El buzón físico fracasó por la pereza de escribir en papel y porque nadie devolvía respuesta; las quejas de infraestructura y convivencia se dispersaban en pasillos y redes externas sin llegar a los comités.

**Estilo visual:** 01-civico · menú top

## Cómo abrirlo

1. Abre **`index.html`** con doble clic (no necesita servidor ni internet).
2. La primera vez se cargan solos los **datos de ejemplo** (6 registros).
3. Navega con el menú de arriba.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar.
Para volver a los datos de ejemplo: abre la consola del navegador y escribe `PIA.reiniciar()`.

## Las páginas

- **Inicio** (`index.html`) — Portada del sistema y consulta rápida del estado de un radicado.
- **Radicar** (`radicar.html`) — Formulario de radicación con validación del dominio institucional y del lenguaje.
- **Seguimiento** (`seguimiento.html`) — Consulta el estado de un radicado por su código y muestra la trazabilidad.
- **Panel del Comité** (`comite-admin.html`) — Panel de gestión del Comité Estudiantil y la Coordinación: filtros, estados y respuestas.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Portada y consulta rápida de un radicado.
| `radicar.html` | Formulario de radicación con validación del dominio institucional.
| `seguimiento.html` | Consulta el estado de un radicado por su código.
| `comite-admin.html` | Panel del Comité: filtros, cambio de estado y respuesta.
| `construccion.html` | Archivo del proyecto.
| `css/estilos.css` | Sistema de diseño completo con la paleta azul y amarilla.
| `js/validador-dominio.js` | Núcleo común + validación del correo @lola.edu.co.
| `js/filtro-lexico.js` | Diccionario preventivo y contador de palabras.
| `js/radicador.js` | Motor de radicación: genera el código y calcula el plazo.
| `js/dashboard-comite.js` | Tablero del Comité con filtros y respuestas.
| `data/semilla-pqrs.json` | Los 6 radicados de ejemplo.

## El equipo

| Integrante | Rol en el proyecto |
|---|---|
| Jeidy Giraldo Montoya | Product Owner · visión de producto y validación institucional |
| María Alejandra Gutiérrez Orozco | UI/UX y estrategia digital · interfaz y campaña en redes |
| Juan José Holguín García | Lógica JS y datos · filtro léxico y motor de radicados |

**Docente articulador:** Jorge Mario Patiño Marín  
**Docente par:** Alejo Villa A

## Cómo continuar en grado 11°

En grado 11° el prototipo pasa a PHP 8 y MySQL 8 con cuatro tablas (usuarios, categorias_lugar, solicitudes_pqrs y respuestas_comite). El modelo ya está definido en la sección 5.1 del documento maestro, así que no hay que rediseñar: solo conectar.

---

Generado con **Project Manager PasculIA** · datos de ejemplo incluidos.
