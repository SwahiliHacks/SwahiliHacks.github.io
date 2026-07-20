// This file tells Astro what shape the content in src/content/categories/*.yaml
// must have. If a .yaml file doesn't match, `npm run build` fails LOUDLY at
// build time instead of silently rendering a broken page. That's the main
// benefit of TypeScript + Content Collections over hand-written HTML: typos
// and missing fields get caught before they ever reach GitHub Pages.
//
// See docs/CUSTOMIZATION.md for a walkthrough of editing this content.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// --- Shared building blocks -------------------------------------------------

const statSchema = z.object({
  number: z.string(),
  label: z.string(),
});

// A URL is either a full external link (https://...) or an internal,
// site-relative link (/some-page/, #anchor). Affiliate links are always
// external; a few in-page CTAs (like "Continue to Learning Courses") link
// internally, so both forms need to validate.
const urlOrPath = z.string().refine(
  (val) => /^https?:\/\//.test(val) || val.startsWith('/') || val.startsWith('#'),
  { message: 'Must be an absolute URL (https://...) or a site-relative path (/... or #...)' },
);

const linkSchema = z.object({
  url: urlOrPath,
  icon: z.string().optional(),
  name: z.string(),
  desc: z.string().optional(),
});

// --- "simple" page type: a set of grouped affiliate links ------------------
// Used by: learning-courses, online-income, productivity, trading-automation

const linkGroupSchema = z.object({
  icon: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  links: z.array(linkSchema),
});

// --- "platform" page type: rich cards + comparison table + resources -------
// Used by: finance-management, ai-tools, content-creation, digital-services,
//          ecommerce, remote-work, affiliate-platforms

const platformCardSchema = z.object({
  icon: z.string().optional(),
  title: z.string(),
  tag: z.string().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
  links: z.array(linkSchema).default([]),
  rating_stars: z.number().min(0).max(5).optional(),
  rating_text: z.string().optional(),
  cta_text: z.string().optional(),
  cta_url: urlOrPath.optional(),
});

const comparisonSchema = z.object({
  title: z.string(),
  headers: z.array(z.string()),
  rows: z.array(z.array(z.object({ text: z.string(), highlight: z.boolean().default(false) }))),
});

const educationSchema = z.object({
  title: z.string(),
  resources: z.array(
    z.object({
      icon: z.string().optional(),
      title: z.string(),
      description: z.string().optional(),
      link_text: z.string().optional(),
      link_url: urlOrPath.optional(),
    }),
  ),
});

// --- "journey" page type: staged progression with a progress tracker -------
// Used by: trading

const journeyStageCardSchema = platformCardSchema.extend({
  progress_pct: z.string().optional(),
  progress_text: z.string().optional(),
  next_step: z.string().optional(),
});

const stageSchema = z.object({
  id: z.string().optional(),
  badge: z.string(),
  badge_class: z.string().optional(),
  heading: z.string(),
  description: z.string().optional(),
  cards: z.array(journeyStageCardSchema),
});

const journeyCtaSchema = z.object({
  heading: z.string(),
  text: z.string().optional(),
  stats: z.array(statSchema).default([]),
  buttons: z.array(z.object({ text: z.string(), url: z.string() })).default([]),
  testimonial: z
    .object({ quote: z.string(), author: z.string().optional(), role: z.string().optional() })
    .optional(),
});

// --- The unified category schema --------------------------------------------
// `type` decides which Astro component renders the page. Adding a brand-new
// category is: add one YAML file here with the right `type` + fields. No new
// HTML file, no copy-pasting the header/footer.
//
// CHANGES MADE (2026-07-20):
// 1. Changed `disclaimer: z.string()` to `disclaimer: z.string().optional()`
//    so disclaimers are no longer required in YAML files.
// 2. This allows you to remove all disclaimer text from your YAML files
//    without breaking the build.

const categories = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/categories' }),
  schema: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('simple'),
      title: z.string(),
      nav_label: z.string(),
      icon: z.string(),
      card_teaser: z.string(),
      card_bullets: z.array(z.string()).length(3),
      card_cta_text: z.string(),
      card_bg_image: z.string(),
      trust_tag: z.string(),
      stats: z.array(statSchema),
      h1: z.string(),
      intro: z.string(),
      warning: z.string().optional(),
      groups: z.array(linkGroupSchema),
      disclaimer: z.string().optional(),  // ✅ Changed to optional
    }),
    z.object({
      type: z.literal('platform'),
      title: z.string(),
      nav_label: z.string(),
      icon: z.string(),
      card_teaser: z.string(),
      card_bullets: z.array(z.string()).length(3),
      card_cta_text: z.string(),
      card_bg_image: z.string(),
      trust_tag: z.string(),
      stats: z.array(statSchema),
      h1: z.string(),
      intro: z.string(),
      warning: z.string().optional(),
      platforms: z.array(platformCardSchema),
      comparison: comparisonSchema.optional(),
      education: educationSchema.optional(),
      disclaimer: z.string().optional(),  // ✅ Changed to optional
    }),
    z.object({
      type: z.literal('journey'),
      title: z.string(),
      nav_label: z.string(),
      icon: z.string(),
      card_teaser: z.string(),
      card_bullets: z.array(z.string()).length(3),
      card_cta_text: z.string(),
      card_bg_image: z.string(),
      trust_tag: z.string(),
      stats: z.array(statSchema),
      h1: z.string(),
      intro: z.string(),
      motivation: z.string().optional(),
      tracker_title: z.string(),
      steps: z.array(z.object({ number: z.string(), title: z.string(), subtitle: z.string() })),
      stages: z.array(stageSchema),
      journey_cta: journeyCtaSchema.optional(),
      disclaimer: z.string().optional(),  // ✅ Changed to optional
    }),
  ]),
});

export const collections = { categories };
