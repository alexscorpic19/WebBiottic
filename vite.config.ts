import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { UserConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
}) satisfies UserConfig;
