/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '12px',
        md: '16px',
        lg: '18px',
      },
      height: {
        '47': '11rem',
      },
      borderRadius: {
        'full': '9999px', // 타원형을 위한 border-radius 설정
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }), // tailwind-scrollbar 플러그인 추가
  ],
  variants: {
    scrollbar: ['rounded'], // rounded 속성에 대한 변형 추가
  },
}
