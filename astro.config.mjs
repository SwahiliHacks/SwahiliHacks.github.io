// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// See docs/ARCHITECTURE.md for why these settings were chosen.
export default defineConfig({
  // TODO: update to your final custom domain, or keep the github.io URL if you don't use one.
  site: 'https://swahilihacks.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
