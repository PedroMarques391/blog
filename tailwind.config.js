/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      maxWidth: {
        'mx-600': '600px',
      },
      width: {
        600: '600px',
      },
      height: {
        300: '300px',
      },
    },
  },
  plugins: [],
};
