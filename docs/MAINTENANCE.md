# Maintenance Guide

Routine upkeep tasks and how often to do them.

## Weekly / whenever you think of it

- **Check affiliate links still work.** Links rot — companies rebrand,
  change URLs, or shut down. There's no automated link checker set up yet
  (see `docs/ROADMAP.md`), so this is currently a manual spot-check: click
  through a few categories periodically.

## Monthly

- **Review Dependabot pull requests.** If you enabled Dependabot (see
  `docs/SECURITY.md`), GitHub will periodically open PRs bumping dependency
  versions to patch known vulnerabilities. Read the PR description, and if
  it's a patch/minor version bump with no breaking changes noted, merge it.
  Major version bumps (e.g. Astro 7 → Astro 8) deserve a closer look —
  check the project's changelog for breaking changes first.

- **Run `npm audit`** locally to check for known vulnerabilities in your
  current dependency tree:
  ```bash
  npm audit
  ```
  Fix automatically where possible:
  ```bash
  npm audit fix
  ```
  Avoid `npm audit fix --force` without reading what it's changing — it can
  bump major versions and break things.

## Quarterly

- **Update dependencies deliberately.** Even without security issues,
  staying within a version or two of current keeps upgrades small and low
  risk. Check what's outdated:
  ```bash
  npm outdated
  ```
  Update one dependency at a time, run `npm run build` after each, and
  commit separately — this makes it easy to `git revert` a single bad
  update instead of untangling a batch.

- **Re-check Core Web Vitals** with Lighthouse or
  https://pagespeed.web.dev against the live site (see
  `docs/PERFORMANCE.md`).

## When adding a lot of new content at once

- **Validate the whole site builds clean:** `npm run build` — the content
  schema will catch malformed entries before they ever reach production.
- **Spot-check a few new pages in the browser** (`npm run preview`) before
  pushing to `main`, especially if you added a new category TYPE variant or
  edited a shared component.

## Backups

Your Git history on GitHub *is* your backup and your audit trail — every
commit is a restorable snapshot. There's no database to separately back up.
The only things not in Git are whatever's in `node_modules/` and `dist/`
(both regenerable from source at any time — see `.gitignore`).
