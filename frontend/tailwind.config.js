/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          700: '#7f7f7f'
        } 
      }
    },
  },
  plugins: [],
}