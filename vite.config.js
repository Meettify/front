// vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import lineClamp from '@tailwindcss/line-clamp'; // ✅ import 사용

export default defineConfig({
  plugins: [
    react(),
    lineClamp,
  ],
  define: {
    global: {},
    process: {
      env: {
        NODE_ENV: '"development"',
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        ws: true,
        headers: {
          Connection: 'keep-alive',
        },
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/ws': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true,
        secure: false,
      },
    },
  },
});
