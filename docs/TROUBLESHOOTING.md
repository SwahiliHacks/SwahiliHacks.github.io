# Troubleshooting Guide

## "categories → X data does not match collection schema"

This is Astro telling you a YAML file in `src/content/categories/` doesn't
match the schema in `src/content.config.ts`. The error message tells you
exactly which field and why, e.g.:

```
stages.3.cards.0.links.2.url: Invalid URL
```

This means: in that YAML file, under `stages`, item index 3, `cards` item
index 0, `links` item index 2, the `url` field isn't valid. Usually this
means:
- A URL is missing `https://` at the front
- An internal link should be a site-relative path (`/some-page/`) instead
  of an old-style filename (`some-page.html`)
- A required field was left out entirely (e.g. forgot `name:` on a link)

Open the file, fix the field, save, and re-run `npm run build` or `npm run
dev` — the error will disappear once the data matches.

## `npm install` fails or hangs

- Check your Node version: `node --version`. This project needs 22.12+.
  If you're on an older version, install a newer one from
  https://nodejs.org (or use [nvm](https://github.com/nvm-sh/nvm) if you
  need multiple Node versions on one machine).
- Delete `node_modules/` and `package-lock.json`, then run `npm install`
  again — this fixes most "stuck" or corrupted installs.

## `npm run dev` starts but the page is blank / styles look broken

- Hard-refresh the browser (Ctrl+Shift+R / Cmd+Shift+R) — sometimes the
  browser caches an old version.
- Check the terminal running `npm run dev` for red error text — Astro
  prints the exact file and line number of any error.

## Images are broken (missing profile photo, category backgrounds, etc.)

The old site's `images/` folder wasn't part of this rebuild's source files.
Copy your existing images into `public/images/` with these exact filenames
(referenced throughout the YAML content):

- `profile.jpg.png`, `sh4.jpg`, `favicon.png`
- `tool1.jpg` through `tool12.jpg`

See `docs/CUSTOMIZATION.md` → "Adding/replacing images."

## GitHub Actions deploy fails

Click into the failed run under the **Actions** tab — the log will show
which step failed:
- **"Install dependencies" fails** → usually a `package-lock.json` that's
  out of sync with `package.json`. Run `npm install` locally, commit the
  updated lockfile.
- **"Build site" fails** → same content-schema errors as above; fix
  locally with `npm run build` first, don't rely on CI to catch it first.
- **"Deploy to GitHub Pages" fails with a permissions error** → check
  **Settings → Pages → Source** is set to "GitHub Actions" (not "Deploy
  from a branch").

## The site builds locally but looks different on GitHub Pages

Almost always a path issue. Check `astro.config.mjs` → `site` matches your
actual deployed URL, and that any hardcoded asset paths start with `/`
(site-root-relative), not a relative path that only works from certain
pages.

## "Module not found" or import errors after pulling new changes

Someone added a new dependency to `package.json`. Run `npm install` to
sync your local `node_modules/` with the current dependency list.
