# Folder Structure Guide

```
SwahiliHacks.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # builds & publishes to GitHub Pages on every push to main
├── docs/                       # you are here — all project documentation
├── public/                     # files copied to the site root AS-IS (no processing)
│   ├── images/                 # profile photo, category background photos, favicon
│   └── robots.txt              # tells search engine crawlers what they can index
├── src/
│   ├── content/
│   │   └── categories/         # ★ THE DATA — one .yaml file per category page
│   │       ├── trading.yaml
│   │       ├── productivity.yaml
│   │       └── ...             # 12 files total, one per category
│   ├── content.config.ts       # the schema every category .yaml file must match
│   ├── components/
│   │   ├── Header.astro        # profile photo + stats bar (top of every page)
│   │   ├── Footer.astro        # contact info + social links (bottom of every page)
│   │   ├── ToolCard.astro      # one card in the homepage grid
│   │   ├── SimpleCategory.astro    # renders type: simple pages
│   │   ├── PlatformCategory.astro  # renders type: platform pages
│   │   └── JourneyCategory.astro   # renders type: journey pages (currently just /trading)
│   ├── layouts/
│   │   ├── BaseLayout.astro    # <head>: fonts, meta tags, global stylesheet
│   │   └── CategoryLayout.astro # wraps a category page's content in Header+Footer
│   ├── pages/
│   │   ├── index.astro         # the homepage — loops over the categories collection
│   │   └── [category].astro    # ★ generates ALL 12 category pages from YAML data
│   └── styles/
│       ├── global.css          # imports Tailwind + legacy.css
│       └── legacy.css          # the original hand-authored design system (colors, cards, grid)
├── astro.config.mjs            # Astro configuration (site URL, integrations)
├── package.json                # dependency list + npm scripts (dev/build/preview)
├── tsconfig.json                # TypeScript configuration
└── .gitignore                  # tells Git to ignore node_modules/, dist/, etc.
```

## The two files marked ★ are the ones you'll touch most

- **Add or edit a category's content** → `src/content/categories/<slug>.yaml`
- **Change how a category TYPE looks** (not one category, but e.g. all
  "platform" pages) → `src/components/PlatformCategory.astro`
- **Change the routing/URL structure** → `src/pages/[category].astro`

## What happens if you delete things

| If you delete... | This breaks |
|---|---|
| A file in `src/content/categories/` | That one category page disappears from the site (and the homepage card for it) |
| `src/content.config.ts` | The entire build fails — Astro won't know how to validate any category data |
| `src/components/Header.astro` | Every page loses its top header |
| `src/components/Footer.astro` | Every page loses its footer |
| `src/layouts/BaseLayout.astro` | Every page loses `<head>` — no styling, no fonts |
| `src/pages/[category].astro` | All 12 category pages disappear; only the homepage still builds |
| `src/pages/index.astro` | The homepage disappears; category pages still work |
| `public/images/` contents | Broken images across the site (profile photo, category backgrounds) |
| `.github/workflows/deploy.yml` | Pushing to `main` no longer auto-deploys; you'd have to deploy manually |
