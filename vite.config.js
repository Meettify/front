import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // 브라우저 환경에서 global을 빈 객체로 정의
    global: {},
    process: {
      env: {
        NODE_ENV: '"development"',  // 또는 필요한 다른 환경 변수를 추가
      },
    },
  },
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
