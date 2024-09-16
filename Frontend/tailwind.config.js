/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-outer-spin-button': {
          '@apply appearance-none': {},
        },
        'input[type="number"]::-webkit-inner-spin-button': {
          '@apply appearance-none': {},
        },
        'input[type="number"]': {
          '@apply appearance-none': {},
        },
      });
    },
  ],
}