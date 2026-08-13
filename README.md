# Plena — Salud y Belleza

Sitio web estático e informativo de Plena. El proyecto utiliza HTML, CSS y JavaScript vanilla; no requiere base de datos, backend, gestor de paquetes ni proceso de compilación.

## Repositorio y publicación

- GitHub: `https://github.com/ldr-web/plena_estetica_salud_y_belleza_integral`
- Sitio público: `https://plena-estetica-salud-y-belleza-integral.pages.dev`
- Producción: Cloudflare Pages mediante integración automática con la rama `main`.

Cada nuevo commit enviado a `main` genera automáticamente un despliegue de producción en Cloudflare Pages.

## Estructura

```text
/
├── public/
│   ├── favicon/favicon.ico
│   └── images/branding/logotipo-plena.png
├── src/
│   ├── css/
│   │   ├── main.css
│   │   ├── components.css
│   │   └── responsive.css
│   └── js/main.js
├── index.html
├── politica-turnos.html
├── terminos-y-condiciones.html
├── privacidad.html
└── README.md
```

- `index.html`: página principal.
- `src/css/main.css`: estilos originales del sitio.
- `src/css/components.css`: modal de WhatsApp y estilos de las páginas informativas.
- `src/css/responsive.css`: ajustes responsive de los componentes nuevos.
- `src/js/main.js`: navegación, búsqueda local, animaciones y modal de WhatsApp.
- `public/images/`: imágenes propias organizadas por función.
- `public/favicon/`: icono del sitio.

La carpeta heredada `Images/` contiene archivos ajenos al sitio que no están referenciados por el código. Se conservaron para no eliminar archivos sin autorización expresa.

## Cambiar el enlace de WhatsApp

Editar la constante `CONTACT.whatsapp` al inicio de `src/js/main.js`. Los mensajes específicos de cada CTA se mantienen en el atributo `data-whatsapp-query` de cada enlace en `index.html`.

Todos los elementos con `data-whatsapp-cta` abren primero el aviso informativo. No deben enlazar directamente a WhatsApp.

## Actualizar información y políticas

- Condiciones de turnos, cancelaciones y packs: `politica-turnos.html`.
- Información general del sitio: `terminos-y-condiciones.html`.
- Funcionamiento real respecto de datos y servicios externos: `privacidad.html`.

No agregar condiciones comerciales, legales, fiscales o sanitarias que no hayan sido validadas por el titular.

## Ejecución local

Al ser un sitio estático, puede servirse con Apache desde XAMPP y abrirse en:

```text
http://localhost/Plena/
```

También puede utilizarse cualquier servidor HTTP estático. Servir la carpeta por HTTP permite verificar correctamente las rutas y recursos externos.

## Modificaciones futuras

- Mantener los archivos HTML en la raíz mientras no se incorpore un sistema de rutas.
- Agregar imágenes propias dentro de la categoría correspondiente en `public/images/`.
- Usar rutas relativas desde la raíz y actualizar todas las referencias si se mueve un archivo.
- No duplicar el número de WhatsApp en el HTML; usar la configuración central de JavaScript.
- Mantener `rel="noopener noreferrer"` en enlaces externos con `target="_blank"`.
- Antes de publicar, revisar enlaces internos, consola del navegador, vista móvil y ausencia de overflow horizontal.
