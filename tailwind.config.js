/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'Proxima-Nova-Reg': ['Proxima-Nova-Reg', 'sans-serif'],
        'Proxima-Nova-Reg-It': ['Proxima-Nova-Reg-It', 'sans-serif'],
        'Proxima-Nova-Alt-Cond-Black': ['Proxima-Nova-Alt-Cond-Black', 'sans-serif']
      },
    },
  },
  plugins: [],
}