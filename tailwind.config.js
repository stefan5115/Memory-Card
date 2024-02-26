/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'minecraft': ['Minecraft','sans-serif']
      },
      colors:{
        'modal': 'rgb(0,0,0,.7)'
      }
    },
  },
  plugins: [],
}

