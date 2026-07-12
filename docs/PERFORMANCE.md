# Performance Guide

## Why this site is fast by default

Astro's core design principle is **zero JavaScript shipped unless a page
explicitly needs it.** Every page on this site is pre-rendered to plain
HTML and CSS at build time (`npm run build`) — there's no client-side
framework hydrating the page, no bundle to download and parse before the
page becomes interactive. The one exception is `/trading`, which ships a
small vanilla-JS scroll listener (~30 lines, no dependencies) for the
progress tracker — see `docs/ARCHITECTURE.md`.

This means, out of the box:
- **Fast Largest Contentful Paint (LCP)** — the browser has real HTML to
  paint immediately, not a blank page waiting for JS.
- **Zero Cumulative Layout Shift (CLS) risk from hydration** — nothing
  swaps in after load.
- **Minimal Total Blocking Time** — almost no JS execution on page load.

## What could slow it down (avoid these)

- **Adding a client-side framework component to every page** — Astro
  "islands" (React/Vue/Svelte components) are great for isolated
  interactive widgets, but each one you add ships its own JS. Keep them
  scoped to pages that actually need them.
- **Large, unoptimized images** — `public/images/` files are served
  as-is, with no compression or resizing. Before adding a new photo,
  compress it (e.g. with [Squoosh](https://squoosh.app)) and keep hero/card
  images under ~200KB where possible.
- **Loading Font Awesome's full icon set from a CDN** (current setup, in
  `BaseLayout.astro`) is convenient but loads more icon glyphs than the
  site uses. If page weight becomes a concern, consider self-hosting only
  the specific icons used (Font Awesome supports subsetting).

## Caching

GitHub Pages serves all static assets with far-future cache headers
automatically — you don't need to configure this yourself.

## Image optimization (future improvement)

Astro has a built-in `<Image />` component (`astro:assets`) that can
automatically resize, compress, and convert images to modern formats
(WebP/AVIF) at build time, and generates the `srcset` for responsive
loading. The current site uses plain `<img>` tags pointing at
`public/images/` for simplicity (since these are static site-level assets,
not per-content-item images). If image weight becomes a measurable problem,
migrating the homepage/category background images to `astro:assets` is the
natural next step — see `docs/ROADMAP.md`.

## Measuring performance

- **Lighthouse** (built into Chrome DevTools, or https://pagespeed.web.dev)
  — run this against the deployed site periodically. A static Astro site
  like this should score 95+ on Performance by default; if a score drops
  noticeably after a change, that change likely added JS or unoptimized
  images.
- **`npm run build`** output itself reports build time and page count —
  watch for build times climbing sharply as a sign that something
  (usually an image, or a large dependency) got added that shouldn't have.
