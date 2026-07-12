# Accessibility Guide

Target: [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/).

## What's already in place

- **Semantic HTML** — `<header>`, `<footer>`, `<nav>`-equivalent structure,
  `<section>`, proper heading hierarchy (`h1` on category pages, `h2`/`h3`
  for subsections) rather than generic `<div>` soup.
- **`aria-label` on icon-only links** — the social media icons in the
  footer (`Footer.astro`) have no visible text, so each has an
  `aria-label` (e.g. `aria-label="YouTube"`) so screen readers announce
  what they are.
- **`alt` text on all images** — profile photo, footer image, and
  homepage/category background images all carry descriptive `alt`
  attributes.
- **`rel="noopener noreferrer"`** on all external links (`target="_blank"`)
  — prevents the opened page from accessing `window.opener`, which is both
  a security and a best-practice requirement.
- **Color contrast** — the design's primary text (`#1e293b`) on white, and
  white text on the dark header gradient, both meet AA contrast ratios.

## What to check before every content update

- **Every new `<img>` needs real `alt` text**, not a filename or "image".
  Describe what's in the photo, or its function.
- **Every icon-only link/button needs `aria-label`.** If you add a new
  icon-only interactive element (e.g. another social icon), copy this
  pattern from `Footer.astro`.
- **Keep the heading hierarchy intact.** Don't skip from `h1` to `h4` for
  visual-size reasons — use CSS to change size instead, and pick the
  heading level that reflects the actual document structure.

## Keyboard navigation

All interactive elements on this site (links, buttons) are native
`<a>`/`<button>` elements, which are keyboard-focusable and activatable
(Enter/Space) by default in every browser — this is one of the advantages
of not reaching for `<div onClick>` patterns. The one piece of custom
interactivity, the progress tracker on `/trading`
(`JourneyCategory.astro`), uses real `<div>` "step" elements that are
currently mouse-only (click to scroll to a stage). If you want this
keyboard-accessible too, add `tabindex="0"` and a `keydown` handler for
Enter/Space alongside the existing `click` handler.

## Reduced motion

The trading page's scroll-tracking behavior and any future CSS animations
should respect `prefers-reduced-motion`. None of the current CSS animations
are motion-intensive enough to require this yet, but if you add scroll
reveals or transitions, wrap them:

```css
@media (prefers-reduced-motion: no-preference) {
  .your-animated-element { transition: transform 0.3s ease; }
}
```

## Testing

Before deploying a significant change, spot-check with:

- **Keyboard only** — unplug your mouse, Tab through the page, confirm you
  can reach and activate every link.
- **Browser accessibility inspector** — Chrome/Firefox DevTools have an
  "Accessibility" panel showing the computed accessibility tree.
- **axe DevTools** (free browser extension) — flags common WCAG violations
  automatically.
