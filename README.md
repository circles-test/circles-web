# Circles House — web

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, construido **mobile first** a partir del Figma
[Circles - website](https://www.figma.com/design/Qj5kHpnB9PH9YHuKCuI5ol/Circles---website) (páginas *Mobile - v1.13* y *Desktop - v1.14*).

```bash
npm install
npm run dev        # http://localhost:3000  ·  /design-system muestra todos los componentes
```

## Estructura

```
src/
  app/
    layout.tsx            Banner + Header + Footer comunes
    page.tsx              Home (compuesta solo con secciones)
    design-system/        Catálogo de componentes (noindex)
    globals.css           Tokens (colores, tipografías, estilos de texto) y @font-face
  components/
    ui/                   Primitivos: Button, IconButton, Field, Tag, Eyebrow, Media,
                          SegmentedControl, DateBadge, SlideDots, Logo, VideoTeaser
    cards/                SpaceCard, EventCard, NewsCard, TestimonialCard,
                          FeaturedLocationCard, QuickAction
    sections/             Hero, SearchBar, HeroSlider, SectionHeading, Carousel,
                          HappeningNow, Memberships, IntroductionText, Newsletter
    layout/               PromotionBanner, Header, MobileMenu, Footer
  content/                Contenido local (navigation.ts, home.ts) — fuente "local" y datos del seed
  lib/
    content/              Capa de contenido: lo único que usan las páginas
      types.ts            Modelo del sitio (SiteSettings, HomePage…)
      index.ts            getSiteSettings(), getHomePage() → elige la fuente
      adapters/local.ts   Lee src/content
      adapters/sanity/    Consultas GROQ + conversión a los tipos del sitio
    cn.ts                 clsx + tailwind-merge (conoce los estilos de texto propios)
scripts/
  seed-sanity.ts          Carga el contenido local en Sanity (npm run seed)
  test-sanity-adapter.ts  Prueba el adaptador de Sanity sin conexión
```

## Contenido (CMS)

El sitio no depende de un CMS: las páginas llaman a `getHomePage()` / `getSiteSettings()` y reciben
tipos propios. Cada fuente es un adaptador en `src/lib/content/adapters/`; cambiar de CMS es escribir
uno nuevo. Se elige con `CONTENT_SOURCE` (`local` o `sanity`).

El Studio de Sanity vive en la carpeta hermana `../studio-circles-house`.

1. `cp .env.example .env.local`
2. Para cargar el contenido inicial: en sanity.io/manage → **API → Tokens** creá un token *Editor*,
   pegalo en `SANITY_WRITE_TOKEN` y corré `npm run seed` (una sola vez; después borrá el token).
3. El sitio consulta Sanity desde el servidor, así que no necesita CORS. (El Studio sí: la primera vez
   que corras `npm run dev` en el Studio te ofrece agregar `http://localhost:3333`; aceptá.)
4. Para que los cambios publicados se vean al instante: **API → Webhooks** → URL
   `https://<dominio>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`, método POST,
   al crear/actualizar/borrar. Sin webhook, el contenido se refresca solo cada hora.

## Tokens (Figma → Tailwind)

| Figma                 | Clase Tailwind                         |
| --------------------- | -------------------------------------- |
| black / white         | `bg-black`, `text-white`               |
| background `#fffef7`  | `bg-background`                        |
| red `#db4f3c`         | `bg-red`, `text-red`                   |
| cream `#c37254`       | `bg-cream`                             |
| dark 8% / 12%         | `bg-black/8`, `bg-black/12`            |
| black 50%             | `text-black/50`                        |
| H1 · H2 · H3          | `font-display text-h1` · `text-h2` · `text-h3` |
| Body · CTA · Detail   | `text-body` · `text-cta` · `text-detail` |

Breakpoint de escritorio: `lg` (1024px). Todo lo que no lleva prefijo es la versión móvil (440px en Figma).

## Pendiente

- **Fuentes**: copiar a `public/fonts/` `ClashDisplay-Regular.woff2`, `PPFragment-SansRegular.woff2`
  y `PPFragment-SansLight.woff2`. Mientras no estén, se usan Space Grotesk y Hanken Grotesk.
- **Imágenes**: los componentes aceptan `image` / `src`; sin ella muestran un placeholder gris.
- **Logo**: `components/ui/Logo.tsx` usa texto; reemplazar por el SVG.
- **Footer**: las etiquetas de "Extras" y legales no se leían en Figma; revisar `content/navigation.ts`.
- Selectores del buscador (ubicación, calendario, huéspedes), modales y dropdowns del header.
