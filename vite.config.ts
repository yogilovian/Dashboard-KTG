import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          daftar_jalur: path.resolve(__dirname, 'daftar_jalur.html'),
          development: path.resolve(__dirname, 'development.html'),
          emplasemen: path.resolve(__dirname, 'emplasemen.html'),
          panjang_jalur: path.resolve(__dirname, 'panjang_jalur.html'),
          pantauan_stopblok: path.resolve(__dirname, 'pantauan_stopblok.html'),
          struktur: path.resolve(__dirname, 'struktur.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
