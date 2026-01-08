/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030303',
        surface: '#0A0A0A',
        primary: '#FFFFFF',
        secondary: '#888888',
        accent: '#00F0FF', // Cyberpunk cyan
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'], // Placeholder, will load fonts later
      },
    },
  },
  plugins: [],
}
