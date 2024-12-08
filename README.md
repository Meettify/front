# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Project Name

Meettify

## Description

Meettify는 모임을 생성하고, 검색하며, 쇼핑 기능을 이용할 수 있다

## Technologies Used

- **Backend**: Spring Boot 3.2.x, MySQL, Redis, Docker
- **Frontend**: React, Vite, Zustand, Tailwind CSS
- **Deployment**: AWS EC2, Docker Compose, GitHub Actions, S3, RDS
- **API**: REST API, Swagger
- **Monitoring**: Prometheus, Grafana

## Project Structure

```bash
└─src
    ├─api
    │  └─request         # API 요청
    ├─assets
    │  ├─fonts           # 폰트 파일
    │  ├─images          # 이미지 파일
    │  └─logo            # 로고 이미지
    ├─components
    │  ├─button          # 버튼 컴포넌트
    │  ├─comm            # 커뮤니티 컴포넌트
    │  ├─home            # 홈 페이지 컴포넌트
    │  ├─icons           # 아이콘 컴포넌트
    │  ├─main            # 메인 페이지 컴포넌트
    │  ├─meet            # 모임 컴포넌트
    │  ├─member          # 회원 컴포넌트
    │  ├─menus           # 메뉴 컴포넌트
    │  ├─shop            # 쇼핑 컴포넌트
    │  └─support         # 고객센터 컴포넌트
    ├─hooks              # 커스텀 React 훅
    ├─layouts            # 공통 레이아웃 컴포넌트
    ├─pages
    │  ├─comm            # 커뮤니티 페이지
    │  ├─main            # 메인 페이지
    │  ├─meet            # 모임 페이지
    │  ├─member          # 회원 페이지
    │  ├─shop            # 쇼핑 페이지
    │  └─support         # 고객센터 페이지
    ├─routers            # 라우팅 코드
    ├─stores             # 전역 상태 관리 (Zustand/Redux 등)
    └─utils              # 유틸리티 함수
```

## Installation

### Tailwind CSS 설치

```bash
npm install -D tailwindcss postcss autoprefixer
```

### React Router 설치

```bash
npm install react-router-dom
```

### react-daum-postcode 설치

```bash
npm install react-daum-postcode
```

### axios 설치

```bash
npm install axios
```

### zustand 설치

```bash
npm install zustand
```

### ESLint 규칙 비활성화 설정

```bash
    eslint.config.js 의 rules 에 추가
      "no-unused-vars":"off",
      "react/prop-types":"off",
```

### proxy middleware

```bash
npm install --save-dev http-proxy-middleware
```

### media query

```bash
npm install react-responsive
```

### tailwind-scrollbar

```bash
npm install tailwind-scrollbar
```

### slider 라이브러리

```bash
npm install rc-slider
```

### react icon

```bash
npm install react-icons
```

### react editor

```bash
npm install react-quill
npm install react-quill@latest
```

### websocket 라이브러리

```bash
npm install @stomp/stompjs
npm install ws

```

### scroll 라이브러리

```bash
npm install react-infinite-scroll-component
```

### react-slick 라이브러리

```bash
npm install react-slick
```

### react-intersection-observer 라이브러리

```bash
npm install react-intersection-observer
```
