/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'climate': ['Climate Crisis', 'sans-serif'],
        'sans': ['Funnel Display', 'sans-serif'],
        'modak': ['Modak', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
