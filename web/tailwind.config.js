const colors = require('tailwindcss/colors')
const forms = require('@tailwindcss/forms');

// tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
        primary: colors.cyan,
      },
    },
  },
  variants: {},
  plugins: [forms],
}