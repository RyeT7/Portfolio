import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { open: true },
  // Use relative asset paths so the built site works from any sub-path
  // (GitHub Pages project sites, Netlify previews, etc.).
  base: './',
});
