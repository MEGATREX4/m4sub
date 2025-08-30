/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        subgrid: "subgrid",
      },
      gridTemplateColumns: {
        subgrid: "subgrid",
      },
    },
  },
  plugins: [],
}
