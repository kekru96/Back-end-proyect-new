/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        myLightGreen: '#24bd68',
        myGreen: '#258d58',
        myDarkGreen: '#265d49',
        myDarkColor: '#282e3a'
      }
    },
  },
  plugins: [require("daisyui")],
}

