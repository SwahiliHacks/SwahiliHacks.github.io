# Architecture Guide

This document explains *why* the site is built the way it is, so you can
maintain and extend it confidently rather than treating it as a black box.

## The problem with the old site

The previous version of Swahili Hacks was 14 hand-written HTML files. Every
one of them repeated the same `<header>`, the same `<footer>`, the same
`<head>` block with fonts and meta tags. Adding a link meant finding the
right `<div class="affiliate-card">` inside the right file and hand-editing
HTML. Fixing the phone number in the footer meant editing it in 14 places.
That's not a maintenance problem you notice at 3 pages — it's one you very
much notice at 14, and it gets worse with every page you add.

## The fix: separate content from structure

The core architectural idea of this rebuild is: **content lives in data
files (YAML), structure lives in code (Astro components), and one template
turns data into pages.**

```
YAML file (data)  --->  Astro component (structure)  --->  Static HTML page
src/content/categories/trading.yaml
                  --->  src/components/JourneyCategory.astro
                  --->  dist/trading/index.html
```

Concretely: `src/pages/[category].astro` is a **single file** that, at
build time, reads every `.yaml` file in `src/content/categories/`, and
generates one HTML page per file. Adding a 13th category to the site means
adding one YAML file — not copying an HTML file and hand-editing six spots
in it.

## Why Astro (and not Next.js)

Astro and Next.js both let you build pages out of reusable components. The
difference that matters here: **this site has no server-side logic** — no
user accounts, no database, no API routes that need to run on every
request. It's a directory of links. Next.js is built around a server
runtime (or serverless functions) to support exactly the kind of dynamic
behavior this site doesn't need. Bringing in that machinery would mean
maintaining a bundler config, a runtime, and a mental model sized for an
application, to serve what is — correctly — a set of static pages.

Astro's default output is plain HTML and CSS, with zero JavaScript shipped
unless a page explicitly needs it (this site ships exactly one small script,
on the `/trading` page, for the scroll-tracking progress bar — see
`src/components/JourneyCategory.astro`). That's the right default for a
content site: fast to load, fast to build, cheap to host on GitHub Pages.

If the site ever needs real interactivity — a live search box, a
user-submitted-links form — Astro supports "islands": you can drop a single
React or Vue component into one page without converting the rest of the
site to a framework. You're not locked out of that future by choosing Astro
now.

**Alternative considered:** Eleventy (11ty) is a similarly lightweight,
content-first static site generator. It was a reasonable second choice, but
has a less mature TypeScript story and less first-class component reuse
than Astro's `.astro` files, which matters for a site that leans on shared
Header/Footer/Card components.

## Why TypeScript + Content Collections (Zod schemas)

`src/content.config.ts` defines a **schema**: the exact shape every
category's data must have (what fields exist, what type they are, which are
required). This is enforced at build time by [Zod](https://zod.dev).

Concretely, this caught a real bug during the build of this very site: two
internal links in `trading.yaml` were written as bare filenames
(`learning-courses.html`) left over from the old HTML site, which aren't
valid site-relative paths in the new URL structure. The schema rejected the
build with a precise error message (`stages.3.cards.0.links.2.url: Invalid
URL`) instead of silently shipping a broken link. That's the entire value
proposition of typed content: **mistakes get caught before deploy, not
after a visitor complains.**

## Why the design didn't get rewritten in Tailwind

The stack list includes Tailwind CSS, and it's installed and wired up
(`src/styles/global.css` imports it, and it's available to any new
component). But the existing visual design — the header gradient, the card
grid, the stage-progression UI on the trading page — was already fully
built out and looked good, in `style.css` from the old site (now
`src/styles/legacy.css`).

Rewriting ~1,500 lines of already-working, already-tuned CSS into Tailwind
utility classes is pure risk (easy to introduce visual regressions across
14 pages) for no real benefit (the design doesn't change). So the decision
was: **keep the working design system as the source of truth, and have
Tailwind available for anything new you build from here on.** If you want
to migrate a specific component to Tailwind later, do it one component at a
time, with a visual diff each time — never all at once.

## How a page actually gets built

1. `npm run build` runs.
2. Astro's content layer reads every file under `src/content/categories/`,
   validates it against the schema in `content.config.ts`, and fails loudly
   if anything doesn't match.
3. `src/pages/index.astro` reads the full collection and renders the
   homepage grid (`ToolCard.astro` × 12).
4. `src/pages/[category].astro` calls `getStaticPaths()`, which tells Astro
   "generate one page per YAML file, at the URL `/<filename-without-extension>/`."
   For each one, it picks `SimpleCategory.astro`, `PlatformCategory.astro`,
   or `JourneyCategory.astro` based on the `type` field in that YAML file.
5. Every page is wrapped in `CategoryLayout.astro` (adds header, "back to
   home" link, footer) which itself wraps `BaseLayout.astro` (adds `<head>`:
   fonts, meta tags, the stylesheet).
6. The result is plain static HTML/CSS files in `dist/`, with one small
   inline script on the trading page. No server needed to serve it — that's
   what makes GitHub Pages hosting possible.

## Future scalability

This structure scales cleanly to:

- **A 13th+ category** — add one YAML file. Zero code changes.
- **A search/filter page** — a client-side script that filters the same
  YAML-derived data; no backend required.
- **A blog or articles section** — a second content collection
  (`src/content/articles/`) alongside `categories`, with its own schema and
  its own `[...slug].astro` router, following the exact same pattern.
- **An RSS feed** — Astro has a built-in `@astrojs/rss` integration that
  reads a content collection directly.
- **A contact form that actually sends email** — GitHub Pages can't run
  server code, but a small Cloudflare Worker (free tier) could receive form
  submissions without needing to migrate the whole site off static hosting.

None of these require abandoning the current architecture — they extend it.
