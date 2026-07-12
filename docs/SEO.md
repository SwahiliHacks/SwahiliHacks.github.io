# SEO Guide

What's already implemented, and how to extend or change it.

## What's already in place

All of the following are generated automatically by `BaseLayout.astro` for
**every** page, from the `title` and `description` props each page passes
in — you don't hand-write meta tags per page:

- `<title>` and `<meta name="description">`
- Canonical URL (`<link rel="canonical">`) — prevents duplicate-content
  penalties if the same page is ever reachable at more than one URL
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`,
  `og:type`) — control how the page looks when shared on Facebook, LinkedIn,
  WhatsApp, etc.
- Twitter Card tags — control how the page looks when shared on X/Twitter
- `robots.txt` (in `public/`) — tells crawlers everything is indexable and
  points them at the sitemap
- **Automatic sitemap** — the `@astrojs/sitemap` integration generates
  `sitemap-index.xml` from every page Astro builds, with zero manual upkeep.
  As soon as you add a 13th category YAML file, it's in the sitemap on the
  next build, automatically.

## How to change a page's SEO metadata

For category pages, the `<title>` comes from the `title` field in that
category's YAML file, and the meta description comes from `intro`. Edit
those fields directly — see `docs/CUSTOMIZATION.md`.

For the homepage, edit the `title`/`description` props passed to
`<BaseLayout>` in `src/pages/index.astro`.

## Structured data (JSON-LD)

Not yet implemented. If you want rich search results (e.g. star ratings
showing up directly in Google), the next step would be adding a
`schema.org` `ItemList` or `Product` JSON-LD block to
`PlatformCategory.astro`, since those pages already have the rating data
needed (`rating_stars`, `rating_text`). This is listed in
`docs/ROADMAP.md`.

## Image optimization for social sharing

`ogImage` currently defaults to `/images/sh4.jpg` for every page. Open
Graph images work best at 1200×630px. Consider adding a dedicated
`og-image.jpg` sized correctly, or a per-category image, once you have
final photography.

## Performance and SEO

Google's ranking algorithm factors in Core Web Vitals (load speed,
interactivity, layout stability). Astro's zero-JS-by-default output already
gives this site a strong baseline — see `docs/PERFORMANCE.md`.
