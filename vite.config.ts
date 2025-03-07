import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import * as url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'handle-html-assets',
      enforce: 'post',
      transformIndexHtml(html: string) {
        return html.replace(
          /<link rel="icon".*?>/,
          '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />'
        );
      },
      handleHotUpdate({ file, server }: { file: string; server: any }) {
        if (file.endsWith('.html')) {
          server.ws.send({ type: 'full-reload' });
          return [];
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store')
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
