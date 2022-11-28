/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'black': {
          100: '#313131',
          200: '#080808',
          300: '#000000'
        },
        'purple': '#6474E5',
        'pink': '#BD55E1',
        'lightblue': '#46FFDE',
        'gray': '#696969',
        'lightgray': '#B8B8B8',
        'white': '#FFFFFF',
        "sky": "#80D1FF"
      },
    },
  },
  plugins: [],
}
