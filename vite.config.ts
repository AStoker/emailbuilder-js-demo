import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/email-builder-js/',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});
