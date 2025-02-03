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

## 화면 구성
- 시작 페이지 <br/>
처음 사이트에 들어가면 보여주는 화면으로서 정적인 이미지나 동작하는 이미지로 세련되게 보여줍니다. <br/>
- 메인 페이지 <br/>
시작 페이지와는 다르게 전체 페이지의 요약본 느낌으로 보여줄 예정, 여기서 신경써야하는 부분은 요약 페이지지만 지저분한 느낌이 아니라 깔끔한 형태로 되어 있어야 한다. <br/>
- 모임 <br/>
모임 페이지는 각 카테고리별로 나눠서 들어가게 할 수 있고 사용자가 좋아하는 카테고리로 들어가서 모임에 대한 글을 작성할 수 있다. 그리고 여기서 채팅을 만들어서 대화할 수 있다. <br/>
여기서 각 카테고리 별로 상품을 추천해주고 있습니다. <br/>
- 커뮤니티 <br/>
커뮤니티는 자유롭게 대화할 수 있는 커뮤니티입니다. <br/>
- 상품 <br/>
여기서 상품은 모임의 각 카테고리 별로 상품을 판매해서 모임에서 모인 사람들이 필요한 물품을 구매할 때 다른 사이트가 아니라 우리 사이트에서 구매할 수 있게 했습니다. <br/>


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

### event-source-polyfill

```bash
npm install event-source-polyfill
```

### toss payments

```bash
npm install @tosspayments/payment-widget-sdk
npm install @tanstack/react-query
```

### dotenv

```bash
npm install dotenv
```

### react-intersection-observer 라이브러리

```bash
npm install react-intersection-observer
```

### npm install recharts 라이브러리

```bash
npm install recharts
```

### 채팅 stomp 라이브러리

```bash
npm install @stomp/stompjs --save
```

```js
import * as StompJs from "@stomp/stompjs";
```

### 챗봇라이브러리

```bash
npm install @channel.io/channel-web-sdk-loader
```

### moment

```bash
npm install moment
npm install moment-timezone
```


