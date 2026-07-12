# Customization Guide

Most day-to-day edits to this site don't require touching any `.astro` code
at all — just the YAML files in `src/content/categories/`. This guide walks
through the common tasks.

## Adding a new affiliate link to an existing category

Open the category's YAML file, e.g. `src/content/categories/productivity.yaml`.
For a `type: simple` category, find the `groups` list and add a new link
under the right group:

```yaml
groups:
  - icon: fas fa-tasks
    title: Task Management
    description: Tools to organize, prioritize, and track your tasks efficiently.
    links:
      - url: https://www.notion.so
        icon: fas fa-external-link-alt
        name: Notion
        desc: All-in-one workspace
      # ↓ add your new link here, same shape
      - url: https://www.clickup.com
        icon: fas fa-external-link-alt
        name: ClickUp
        desc: Free forever plan
```

Save the file, run `npm run dev`, and check http://localhost:4321/productivity/ —
your new link should appear instantly.

For a `type: platform` category (e.g. `finance-management.yaml`), you're
usually adding a new item to the `platforms` list instead — copy an existing
entry as a template, since it has more fields (features, rating, CTA button).

## Adding a brand-new category (the 13th tool)

1. Pick the simplest template that fits your content: `type: simple` (a
   handful of grouped links) is the easiest starting point. Copy
   `src/content/categories/productivity.yaml` as a template and rename it,
   e.g. `src/content/categories/newsletter-tools.yaml`.
2. Fill in every field. If you're unsure what a field controls, check
   `src/content.config.ts` — the schema comments explain each one, or look
   at `docs/FOLDER_STRUCTURE.md`.
3. The `nav_label`, `card_teaser`, `card_bullets`, `card_cta_text`, `icon`,
   and `card_bg_image` fields control what shows up in the **homepage
   card** for this category. The URL will automatically be
   `/newsletter-tools/` (derived from the filename).
4. Add the new background image to `public/images/` (see below).
5. Open `src/pages/index.astro` and add your new slug to the `ORDER` array,
   wherever you want it to appear in the grid.
6. Run `npm run build` — if you got a field wrong or missed one, the build
   will fail with an exact error telling you what's wrong and where.

## Changing contact info (phone, email, social links)

All of this lives in **one file**: `src/components/Footer.astro`. Editing
it updates every page on the site at once — that's the entire point of it
being a shared component instead of copy-pasted per page.

## Changing the profile photo, name, or "Curated by..." tagline

That's in `src/components/Header.astro`.

## Adding/replacing images

Images live in `public/images/`. Reference them from YAML with a
site-root-relative path, e.g. `/images/my-new-photo.jpg`. Astro copies
everything in `public/` to the site root untouched — no processing, no
optimization. (See `docs/PERFORMANCE.md` if you want to add image
optimization later.)

Required images referenced by the current content (make sure these exist in
`public/images/` before deploying — see the placeholder note in that
folder):

- `profile.jpg.png` — your profile photo
- `sh4.jpg` — footer image
- `tool1.jpg` through `tool12.jpg` — homepage card background photos
- `favicon.png` — browser tab icon

## Changing colors, fonts, or spacing

The design system lives in `src/styles/legacy.css`. Color variables are
defined once at the top:

```css
:root {
  --primary: #1C75BC;
  --primary-dark: #145a8a;
  --accent: #22c55e;
  --dark: #0f172a;
  --light: #f8fafc;
  --gray: #64748b;
  --gray-light: #e2e8f0;
  --white: #ffffff;
}
```

Change a value here and it updates everywhere that variable is used.

## Changing a page TYPE's structure (advanced)

If you want to change how *all* "platform"-type pages are laid out (e.g.
add a new section to every platform page), edit
`src/components/PlatformCategory.astro`. This affects all 7 categories
using that type at once. Don't edit `src/pages/[category].astro` for this —
that file only handles routing, not layout.
