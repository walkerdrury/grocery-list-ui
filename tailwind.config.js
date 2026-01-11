/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'list-blue': '#3b82f6',
        'list-green': '#10b981',
        'list-purple': '#8b5cf6',
        'list-pink': '#ec4899',
        'list-orange': '#f97316',
        'list-yellow': '#eab308',
      },
    },
  },
  plugins: [],
}

