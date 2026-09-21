/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        upi: {
          saffron: '#FF9933',
          green: '#138808',
          blue: '#000080',
          dark: '#1e293b',
          light: '#f8fafc',
        }
      }
    },
  },
  plugins: [],
}
