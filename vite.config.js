import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://meettify.store', // 백엔드 URL
        changeOrigin: true,
        secure: false,
        ws: true,
        headers: {
          Connection: 'keep-alive',
        },
        rewrite: (path) => path.replace(/^\/api/, ''), // 프록시 경로 재작성
      },
    },
  },
});
