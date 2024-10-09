/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kiwi: {
          50: '#f2fde8',
          100: '#e2fbc8',
          200: '#c8f595',
          300: '#a5ea59',
          400: '#82d92c',
          500: '#65bd13',
          600: '#4d960c',
          700: '#3c710d',
          800: '#325a10',
          900: '#2b4b11',
        },
      },
    },
  },
  plugins: [],
}