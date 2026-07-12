# Deployment Guide

How to publish this site to `https://swahilihacks.github.io` using GitHub
Pages, for free, with zero paid services.

## One-time setup

1. **Push this repo to GitHub** under the exact name `SwahiliHacks.github.io`
   in the `SwahiliHacks` organization/account (this exact name is what makes
   GitHub Pages serve it at the root domain instead of a `/repo-name/`
   subpath).

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Astro rebuild of Swahili Hacks"
   git branch -M main
   git remote add origin https://github.com/SwahiliHacks/SwahiliHacks.github.io.git
   git push -u origin main
   ```

2. **Enable GitHub Pages with GitHub Actions as the source:**
   - Go to your repo on GitHub → **Settings** → **Pages**
   - Under "Build and deployment" → "Source", select **GitHub Actions**
     (not "Deploy from a branch" — that's the old method; this repo uses
     the Actions-based workflow already set up in
     `.github/workflows/deploy.yml`)

That's it. From this point on, deployment is automatic.

## Every deploy after that

Just push to `main`:

```bash
git add .
git commit -m "Describe what changed"
git push
```

GitHub Actions will automatically:
1. Check out your code
2. Install dependencies (`npm ci`)
3. Build the site (`npm run build`)
4. Publish the `dist/` folder to GitHub Pages

You can watch the deploy happen under the **Actions** tab of your repo.
It typically takes 1–2 minutes. Once it finishes, your changes are live at
https://swahilihacks.github.io.

## Checking a deploy worked

- Green checkmark on the **Actions** tab = deploy succeeded.
- Red X = something failed. Click into the failed run to see the exact
  error — it's almost always either a content schema validation error (see
  `docs/TROUBLESHOOTING.md`) or a typo in a `.astro` file.

## Using a custom domain (optional)

If you buy a domain (e.g. `swahilihacks.com`) later:

1. Add a `CNAME` file to `public/` containing just the domain name.
2. In your domain registrar's DNS settings, add the records GitHub
   specifies at **Settings → Pages → Custom domain**.
3. Update `site:` in `astro.config.mjs` to match the new domain — this is
   used to generate correct canonical URLs and sitemap entries.

## Rolling back a bad deploy

Since GitHub Pages deploys straight from `main`, the fastest rollback is:

```bash
git revert <bad-commit-hash>
git push
```

This creates a new commit undoing the change and triggers a fresh deploy.
