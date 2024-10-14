import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  css: {
    postcss: './postcss.config.js', // PostCSS 설정을 명시적으로 지정
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://meettify.store:8080/api/v1', // 올바른 API 경로 설정
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api' 경로 제거
      },
    },
  },
});
