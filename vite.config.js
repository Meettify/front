import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
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
        target: process.env.VITE_APP_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api' 경로를 제거하고 프록시
      },
    },
  },
});