# Proyectos PIA — Institución Universitaria Pascual Bravo

**Aplicaciones web de los Proyectos Integradores de Aula (PIA)**
Media Técnica · Técnico Auxiliar en Desarrollo de Software

🌐 **Ver el portal:** https://TU-USUARIO.github.io/proyectos-pia/

---

## Qué es esto

Son las **33 aplicaciones web** construidas por los estudiantes de Media Técnica,
una por cada proyecto PIA. Cada aplicación se generó a partir de los **requisitos funcionales**
del proyecto y su código está **comentado línea por línea**.

## Qué tiene cada aplicación

- Registro de usuarios e ingreso con la contraseña cifrada
- Entre 7 y 8 módulos con formularios y tablas
- Búsqueda, edición y eliminación de registros
- Exportación a Excel (CSV)
- Tablero con indicadores
- Diseño adaptable a computador, tableta y celular

## Los proyectos

| # | Proyecto | Institución | Grado | Año | Módulos |
|---|---|---|---|---|---|
| 1 | [Alfabetizadores Lola](Alfabetizadores_Lola_2026/) | I.E. Lola González | 10° | 2026 | 0 |
| 2 | [Cine conCiencia](Cine_conCiencia_2025/) | I.E. Sol de Oriente | 11° | 2025 | 8 |
| 3 | [Cine conCiencia](Cine_conCiencia_2026/) | I.E. Sol de Oriente | 10° | 2026 | 8 |
| 4 | [ConvivIA](ConvivIA_2025/) | I.E. Sol de Oriente | 10° | 2025 | 8 |
| 5 | [ConvivIA](ConvivIA_2026/) | I.E. Sol de Oriente | 11° | 2026 | 8 |
| 6 | [Dual Language Center](Dual_Language_Center_2026/) | I.E. Sol de Oriente | 10° | 2026 | 7 |
| 7 | [EcoChain Verde](EcoChain_Verde_2025/) | I.E. Sol de Oriente | 10° | 2025 | 8 |
| 8 | [EcoChain Verde](EcoChain_Verde_2026/) | I.E. Sol de Oriente | 11° | 2026 | 8 |
| 9 | [EduCompu](EduCompu_2025/) | I.E. Sol de Oriente | 11° | 2025 | 8 |
| 10 | [EduConnect.IA](EduConnectIA_2025/) | I.E. Sol de Oriente | 11° | 2025 | 7 |
| 11 | [EduConnect.IA](EduConnectIA_2026/) | I.E. Sol de Oriente | 10° | 2026 | 7 |
| 12 | [EduViajes](EduViajes_2025/) | I.E. Sol de Oriente | 11° | 2025 | 8 |
| 13 | [EduViajes](EduViajes_2026/) | I.E. Sol de Oriente | 10° | 2026 | 8 |
| 14 | [Great Food App](Great_Food_App_2026/) | I.E. Lola González | 10° | 2026 | 0 |
| 15 | [Hunter Food](Hunter_Food_2025/) | I.E. Sol de Oriente | 11° | 2025 | 8 |
| 16 | [Hyper Emotion](Hyper_Emotion_2025/) | I.E. Sol de Oriente | 11° | 2025 | 7 |
| 17 | [Imagen School](Imagen_School_2025/) | I.E. Sol de Oriente | 10° | 2025 | 7 |
| 18 | [Imagen School](Imagen_School_2026/) | I.E. Sol de Oriente | 11° | 2026 | 7 |
| 19 | [Inventory School](Inventory_School_2026/) | I.E. Lola González | 10° | 2026 | 0 |
| 20 | [LolaConnect](LolaConnect_2026/) | I.E. Lola González | 10° | 2026 | 0 |
| 21 | [Master Acudiente](Master_Acudiente_2025/) | I.E. Sol de Oriente | 10° | 2025 | 8 |
| 22 | [Master Acudiente](Master_Acudiente_2026/) | I.E. Sol de Oriente | 11° | 2026 | 8 |
| 23 | [Mindsport](Mindsport_2025/) | I.E. Sol de Oriente | 10° | 2025 | 8 |
| 24 | [Mindsport](Mindsport_2026/) | I.E. Sol de Oriente | 11° | 2026 | 8 |
| 25 | [R.A.D.E](RADE_2026/) | I.E. Lola González | 10° | 2026 | 0 |
| 26 | [SolBox](SolBox_2025/) | I.E. Sol de Oriente | 10° | 2025 | 8 |
| 27 | [SolBox](SolBox_2026/) | I.E. Sol de Oriente | 11° | 2026 | 8 |
| 28 | [SOMOS Potencialidades](SOMOS_Potencialidades_2026/) | I.E. Lola González | 10° | 2026 | 0 |
| 29 | [TDL Easy](TDL_Easy_2026/) | I.E. Lola González | 10° | 2026 | 0 |
| 30 | [The School of The Lost Souls](The_School_of_The_Lost_Souls_2026/) | I.E. Sol de Oriente | 10° | 2026 | 7 |
| 31 | [The TechFlow](The_TechFlow_2026/) | I.E. Sol de Oriente | 10° | 2026 | 8 |
| 32 | [TimeFocus](TimeFocus_2026/) | I.E. Lola González | 10° | 2026 | 0 |
| 33 | [Tu Opinion Cuenta](Tu_Opinion_Cuenta_2026/) | I.E. Lola González | 10° | 2026 | 0 |

## Cómo se construyeron

Las aplicaciones se generaron con **Project Manager PasculIA**, una herramienta que:

1. Leyó **4.006 archivos** de dos promociones de proyectos (7,8 millones de caracteres).
2. Separó lo propio de cada equipo de las plantillas institucionales.
3. Redactó los requisitos funcionales, no funcionales, la arquitectura, el modelo de datos y los riesgos.
4. Generó la aplicación web de cada proyecto con su código documentado.

## Cómo verlas sin internet

Descarga el repositorio y abre el archivo `index.html` con doble clic: se abre el portal
con los 33 proyectos.

## Estructura

```
index.html              el portal con todos los proyectos
.nojekyll               le dice a GitHub Pages que sirva todos los archivos
<Proyecto>_<año>/
  index.html            la aplicación
  css/estilos.css       el diseño
  js/almacen.js         los datos (localStorage)
  js/modulos.js         los módulos y sus campos
  js/app.js             la lógica
  logo.png              el logo del proyecto
  README.md             cómo usarla y publicarla
```

---

Generado por **Project Manager PasculIA** · Institución Universitaria Pascual Bravo · Medellín, Antioquia
