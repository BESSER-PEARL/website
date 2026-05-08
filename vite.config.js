import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During preview on GH Pages we serve at /website/.
// When the custom domain (besser-pearl.org) takes over, the Action sets BASE_PATH=/.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/website/',
  build: { outDir: 'dist' },
});
