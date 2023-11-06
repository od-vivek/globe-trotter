/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color1': '#FCF5ED',
        'color2': '#F4BF96',
        'color3': '#CE5A67',
        'color4': '#1F1717',
        // Add more colors as needed
      }
    },
  },
  plugins: [],
}