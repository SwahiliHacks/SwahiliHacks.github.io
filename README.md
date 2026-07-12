# Swahili Hacks

A curated directory of professional tools and resources, built as a fast, fully
static site with [Astro](https://astro.build). Owned end-to-end: no paid
services, no vendor lock-in, every file editable, everything runs on your own
machine.

**Live site:** https://swahilihacks.github.io

## What this is

12 categories of hand-picked tools (trading, productivity, online income,
learning, AI tools, and more), each rendered from a single YAML file per
category — no hand-duplicated HTML. See `docs/ARCHITECTURE.md` for why it's
built this way.

## Quick start

```bash
npm install       # install dependencies (one-time)
npm run dev        # start local dev server at http://localhost:4321
```

Edit a category by opening its file in `src/content/categories/*.yaml` — no
need to touch any `.astro` code for routine link/content updates. See
`docs/CUSTOMIZATION.md`.

## Full documentation

| Guide | What it covers |
|---|---|
| [docs/INSTALLATION.md](docs/INSTALLATION.md) | Setting up Node, npm, and this repo on a fresh machine |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Why Astro, why this folder layout, how data flows through the site |
| [docs/FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md) | What every folder and file is for |
| [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md) | Adding/editing categories, links, and images |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Publishing to GitHub Pages |
| [docs/SEO.md](docs/SEO.md) | How search metadata is generated and how to change it |
| [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) | What's implemented and how to keep it that way |
| [docs/PERFORMANCE.md](docs/PERFORMANCE.md) | Why the site is fast, and how not to slow it down |
| [docs/SECURITY.md](docs/SECURITY.md) | Threat model for a static affiliate-link site, and mitigations |
| [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Fixes for the errors you're most likely to hit |
| [docs/MAINTENANCE.md](docs/MAINTENANCE.md) | Routine upkeep: dependency updates, link checking |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Git/branch/commit conventions for this repo |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Where the site could go next |

## Tech stack

Astro · TypeScript · Tailwind CSS (available; the existing design system is
hand-authored CSS — see ARCHITECTURE.md) · Content Collections (YAML) ·
GitHub Actions · GitHub Pages. No paid services, no backend, no database.

## License / ownership

This repository and everything in it belongs to you. There is no proprietary
build step, no external SaaS dependency, and no code you can't read.
