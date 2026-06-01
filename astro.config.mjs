import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// During preview on GH Pages we serve at /website/.
// When the custom domain (besser-pearl.org) takes over, the Action sets BASE_PATH=/.
// Astro reads postcss.config.js automatically, so Tailwind 3 keeps working unchanged.
//
// `site` is the canonical public origin — used for canonical URLs and the sitemap.
// TODO(user): confirm this. If the site will live at besser-pearl.org ROOT (not
// under /website/), also set BASE_PATH=/ in the deploy so the two stay consistent.
export default defineConfig({
  site: 'https://besser-pearl.org',
  base: process.env.BASE_PATH || '/website/',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // News is intentionally masked (noindex) until the LinkedIn feed is live.
      filter: (page) => !page.includes('/news'),
    }),
  ],
  redirects: {
    '/research': '/research/publications',
  },
});
