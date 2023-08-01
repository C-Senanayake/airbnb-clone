/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#F5385D',
        'airbnb-red': '#FF5A5F',
      }
    },
  },
  plugins: [],
}

