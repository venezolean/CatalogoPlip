/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          'blue-dark': '#0257a4',
          'blue-light': '#92d4fa',
          'green': '#2a9134',
        },
        accent: {
          'orange': '#ff6600',
          'red-orange': '#fc340a',
          'yellow': '#ffc220',
          'peach': '#ff914d',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};