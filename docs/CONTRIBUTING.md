# Contribution Guide

Even as a solo maintainer, using consistent Git conventions makes your own
history readable six months from now, and makes it trivial to hand this
project to a collaborator later.

## Branch strategy

- **`main`** — always deployable. Every push to `main` triggers an
  automatic production deploy (see `docs/DEPLOYMENT.md`). Never push
  broken/half-finished work directly here.
- **Feature branches** for anything nontrivial: `git checkout -b
  add-crypto-category`, work there, then merge into `main` via a Pull
  Request (even solo — it gives you a review checkpoint and a clean diff
  to look over before it goes live).
- For small, low-risk edits (fixing a typo, updating one link), committing
  directly to `main` is fine — use judgment.

## Commit message style

Follow [Conventional Commits](https://www.conventionalcommits.org) — short,
consistent prefixes that make `git log` scannable:

```
feat: add crypto exchanges category
fix: correct broken Fiverr affiliate link
docs: update deployment guide for custom domain
chore: bump astro to 7.1.0
style: adjust card spacing on mobile
refactor: extract rating stars into shared logic
```

Keep the first line under ~72 characters. Add a longer description below
it if the change needs more explanation:

```
fix: correct broken TD Ameritrade link on trading page

The old URL redirected to a 404 after their site restructure in
early 2026. Replaced with the current thinkorswim desktop URL.
```

## Versioning / releases

This site doesn't need formal semantic versioning (it's not a published
package other projects depend on), but tagging meaningful milestones is
useful:

```bash
git tag -a v1.0.0 -m "Astro rebuild launch"
git push origin v1.0.0
```

Consider tagging major redesigns or content overhauls so you can always
`git checkout` back to a known-good state.

## Pull request checklist (even for yourself)

Before merging a feature branch into `main`:

- [ ] `npm run build` succeeds with no schema errors
- [ ] `npm run preview` and spot-check the changed page(s) in a browser
- [ ] New/changed external links actually work (not typo'd, not dead)
- [ ] New images have real `alt` text (see `docs/ACCESSIBILITY.md`)
- [ ] Commit messages follow the convention above

## If you accept outside contributions later

- Require PRs against `main`, never direct pushes, from anyone but you.
- Review any new/changed affiliate link manually before merging — YAML
  content isn't a security boundary (see `docs/SECURITY.md`, point 6).
- Consider adding a `CONTRIBUTING` checklist as a GitHub PR template
  (`.github/PULL_REQUEST_TEMPLATE.md`) once you have external contributors.
