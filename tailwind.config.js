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
    },
  },
  plugins: [],
}

