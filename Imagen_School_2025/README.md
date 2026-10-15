# Imagen School — aplicación web

> La mejor versión de ti empieza por tu imagen

**Proyecto Integrador de Aula (PIA) · I.E. Sol de Oriente · Grado 10° · 2025**
Técnico Auxiliar en Desarrollo de Software — Institución Universitaria Pascual Bravo

---

## Qué es

Gestión y proyección de la imagen institucional

## Cómo se usa

1. Abre el archivo **index.html** con doble clic (o sírvelo con un servidor local).
2. Pulsa **Crear una cuenta** y regístrate.
3. Entra con tu correo y tu contraseña.
4. Elige un módulo en el menú de la izquierda.
5. Llena el formulario y pulsa **Guardar**. El registro aparece en la tabla.
6. Puedes **buscar**, **editar**, **eliminar** y **exportar** a Excel.

Los datos se guardan en el navegador (localStorage), así que **no se pierden** al cerrar la página.

## Módulos

- **👤 Usuarios** — 5 campos
- **📋 Registros** — 5 campos
- **✉️ Mensajes y solicitudes** — 7 campos
- **📋 Sección de «Tendencias» alimentada por un** — 5 campos
- **📝 Publicaciones** — 5 campos
- **📋 De forma anónima el género y** — 5 campos
- **📝 A los administradores moderar el contenido** — 5 campos

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La estructura: las pantallas y sus contenedores. |
| `css/estilos.css` | El diseño. Arriba están las variables de color: cambiar una cambia todo. |
| `js/almacen.js` | Los datos: guardar, listar, editar y eliminar. |
| `js/modulos.js` | Los módulos y sus campos. Aquí se agrega un campo nuevo. |
| `js/app.js` | La lógica: menú, formularios, tablas y búsqueda. |
| `logo.png` | El logo del proyecto. |

## Cómo publicarlo en internet

**Opción 1 — GitHub Pages (gratis):**
1. Crea un repositorio en GitHub.
2. Sube todos los archivos.
3. Ve a *Settings → Pages* y elige la rama principal.
4. GitHub te da una dirección pública.

**Opción 2 — Netlify (gratis):**
1. Entra a netlify.com y elige *Add new site → Deploy manually*.
2. Arrastra la carpeta del proyecto.

## Cómo continuarlo

- Los **campos** de cada módulo están en `js/modulos.js`: es lo primero que se cambia.
- Los **colores** están en las variables de `css/estilos.css`.
- Para pasar de localStorage a una base de datos real, solo hay que cambiar `js/almacen.js`.

---

Generado por **Project Manager PasculIA** a partir de los requisitos funcionales del proyecto.
