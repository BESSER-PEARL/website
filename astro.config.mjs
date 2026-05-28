import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

// During preview on GH Pages we serve at /website/.
// When the custom domain (besser-pearl.org) takes over, the Action sets BASE_PATH=/.
const base = process.env.BASE_PATH || '/website/';

export default defineConfig({
  base,
  trailingSlash: 'ignore',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    icon({ include: { lucide: ['*'] } }),
  ],
  build: { format: 'directory' },
});
