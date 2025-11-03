import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
    watch: {
      ignored: [
        '**/node_modules/**',
        '!**/node_modules/wc/dist/**',
      ],
    },
  },
});
