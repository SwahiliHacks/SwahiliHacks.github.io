# Future Roadmap

Ideas for where this site could go next, roughly ordered by effort.

## Small / low-effort

- **Add a `CNAME` + custom domain** once you own one (see `docs/DEPLOYMENT.md`).
- **Self-host Font Awesome icons** (subset only what's used) instead of the
  full CDN bundle, for a small performance win (`docs/PERFORMANCE.md`).
- **Add a PR template** (`.github/PULL_REQUEST_TEMPLATE.md`) with the
  checklist from `docs/CONTRIBUTING.md`, for when you're not the only editor.
- **Dark mode** — the color system is already centralized in CSS variables
  (`src/styles/legacy.css`), which makes a `prefers-color-scheme: dark`
  variant a contained change rather than a full redesign.

## Medium effort

- **Automated link checker** — a small script (or a free GitHub Action like
  `lycheeverse/lychee-action`) that runs weekly, visits every URL in
  `src/content/categories/*.yaml`, and opens an issue if any return a 404.
  Directly addresses the "link rot" maintenance burden noted in
  `docs/MAINTENANCE.md`.
- **JSON-LD structured data** on platform pages (star ratings are already
  captured in the data — see `docs/SEO.md`) for richer Google search
  results.
- **Migrate homepage/category images to `astro:assets`** for automatic
  compression, format conversion (WebP/AVIF), and responsive `srcset`
  generation (see `docs/PERFORMANCE.md`).
- **Search/filter across all categories** — a client-side island (a single
  small React or vanilla-JS component) that filters the already-loaded
  category data by keyword, with no backend required.

## Larger

- **A blog/articles content collection** — a second collection
  (`src/content/articles/`) with its own schema, alongside `categories`,
  following the exact same "YAML in, static page out" pattern documented in
  `docs/ARCHITECTURE.md`. Enables an RSS feed via `@astrojs/rss`.
- **A real newsletter signup** — GitHub Pages can't run backend code, but a
  free-tier Cloudflare Worker (or a third-party form service) could handle
  submissions without migrating the whole site off static hosting.
- **Per-category analytics** (e.g. Plausible or Umami, both privacy-focused
  and can self-host) to see which categories/links actually get clicked —
  useful for deciding what to expand vs. retire.

## Explicitly out of scope for this architecture

- **User accounts / login** — would require a real backend and database;
  a fundamentally different (and more expensive/complex) architecture than
  a static affiliate directory needs.
- **A CMS with a web-based editor** — possible (Astro supports headless
  CMSs like Sanity, Contentful, or Git-based ones like Tina/Decap), but
  adds a dependency and, for most of them, a paid tier. The current YAML
  workflow already gives full ownership with zero cost; only reconsider
  this if non-technical collaborators need to edit content without Git.
