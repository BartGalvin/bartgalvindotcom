import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/site.js';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'site-metadata',
      transformIndexHtml(html) {
        return html.replace(/\{\{\s*site\.(\w+)\s*\}\}/g, (_, key) => {
          if (!Object.hasOwn(site, key)) {
            throw new Error(`Unknown site metadata field: ${key}`);
          }

          return escapeHtml(site[key]);
        });
      },
    },
  ],
});

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
