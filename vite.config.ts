import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true // Permite conexiones desde la red
  },
  preview: {
    port: 5173,
    strictPort: true,
    host: true
  }
}) satisfies UserConfig;
