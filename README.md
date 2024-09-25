# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## Tailwind CSS 설치

Tailwind CSS와 함께 사용할 PostCSS 및 Autoprefixer를 설치합니다.

```bash
npm install -D tailwindcss postcss autoprefixer
```

## React Router 설치

npm install react-router-dom

## react-daum-postcode 설치
npm install react-daum-postcode

## axios 설치
npm install axios

## zustand 설치
npm install zustand

## ESLint 규칙 비활성화 설정
    eslint.config.js 의 rules 에 추가
      "no-unused-vars":"off",
      "react/prop-types":"off",
