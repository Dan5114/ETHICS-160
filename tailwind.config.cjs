const defaultTheme = require('tailwindcss/defaultTheme');
const forms = require('@tailwindcss/forms');
const flyonui = require('flyonui');
const flyonuiPlugin = require('flyonui/plugin');

module.exports = {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',      // TSX globs
    './node_modules/flyonui/dist/js/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
        custom: ['Merriweather'],
      },
    },
  },
  plugins: [
    forms,
    flyonui,
    flyonuiPlugin,
  ],
  flyonui: {
    themes: ['light','dark','gourmet','corporate','luxury','soft'],
  },
};