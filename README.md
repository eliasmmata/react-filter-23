
# Mayoral Frontend Assignment

## Tecnologías/Librerías utilizadas:

-	React
-	Typescript
-	Next.js

## Instalación
Clona el repositorio, instala dependencies y devDependencies e inicia el servidor.

```sh
npm install
npm run dev
```
## Funcionalidades:

- Componentes separados
- Estilado con SASS
(Por cambiar un poco aunque hacía tiempo no lo usaba y fui rápido
Para ver cómo suelo estilar puedo enseñaros mis últimos proyectos de NEXTjs.)
- Cambia la vista con los iconos indicados en la foto (He mirado los de la web para hacerla un poco más real)
  - Escritorio de 4 a 3 elementos (en la imagen había 5 pero lo he hecho como en las indicaciones.)
  - Móvil de 3 a 2 elementos
- La vista debe asemejarse lo más parecido posible a las fotos adjuntas
(He metido algunas cosillas que me han gustado de la web para practicar)
- Consume JSON local desde carpeta api
- Lógica y diseño de un componente que ordena por precio ascendente y descendente.
- Implementar búsqueda de productos por nombre
  - Cuando se escribe en el input salen debajo los resultados, si se pincha se va directamente al producto.
  - Cuando hay resultados y se hace click a la lupa de la izquierda, se ven todos esos resultados pintados.
( No tengo super experiencia con filtros, si veis que se queda corto y me dais algunas indicaciones de lógica que quisiérais implementar trato de llevarlas a cabo).
## Testing

( No he trabajado mucho con testing para ser sincero (por eso quiero trabajar en un equipo entre otras cosas y aprender) pero veo que se puede coger el tranquillo rápido aunque no quería configurarse : )

```sh
npm test
```
  - Test index.test.tsx
  - SearchBar.tsx
  - FilteredProductSearch.test.tsx

## Funcionalidades Extra

- Cambio de imagen a espalda on hover.
- En los dos primeros productos, actúa como en la web actual. En hover cambia imagen a espalda, y en hover de de más colores señala los que hay y clickando cambia a la imagen del color correspondiente.
- Filtro para artículos rebajados.
- Cada producto al clickar llevaría a su página de categoría individual con su slug correspondiente
- Botón de Load More para ver más productos (no me dio tiempo a terminarlo y no funciona bien, sólo funciona sin filtro).
- Animación de entrada sólo en carga de ruta principal, si llega dirigida de otra página reconoce previous path y no hay animación para que no sea tediosa la navegación.

## Reparto de tiempo

(He tenido al final que trabajar en un proyecto entre medias para un cliente que no contaba con ello, pero aproximadamente.)

- Martes: Setup y Estilos principales.
- Miércoles y Jueves: Lógica de Filtros y Producto individual.
- Viernes: Testing y corrección errores.

## Otros proyectos (puedo daros acceso a verlos en Github)

[Empresa Dental Fedesa (ver)](https://fedesa2-szzy.vercel.app/)
-	Api Google Maps enlazada con json para redirección de pin onclick en empresa
-	Traducción al inglés

[Periódico Digital Velezleaks (ver)](https://www.velezleaks.org/)
-	Back con NodeJS que conecta a CMS de Strapi para crear las noticias.
-	Alojamiento de imágenes en Cloudinary

[Empresa Frutas Pitaya Fenicia (ver)](https://pitayafenicia.es/)
-	Google Analytics y Tag manager
-	Uso de getStaticProps y getStaticPaths






