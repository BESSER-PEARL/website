import { defineConfig } from 'astro/config';

// During preview on GH Pages we serve at /website/.
// When the custom domain (besser-pearl.org) takes over, the Action sets BASE_PATH=/.
// Astro reads postcss.config.js automatically, so Tailwind 3 keeps working unchanged.
export default defineConfig({
  base: process.env.BASE_PATH || '/website/',
  build: { format: 'directory' },
  redirects: {
    '/research': '/research/publications',
  },
});
