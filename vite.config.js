import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',  // 백엔드 서버 주소
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),  // '/api' 경로를 제거하고 백엔드로 전달
        },
      },
    },
  };
});
