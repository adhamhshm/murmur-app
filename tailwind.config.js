/** @type {import('tailwindcss').Config} */

//default pre-installed
//module.exports = {
  //content: [
    //'./pages/**/*.{js,ts,jsx,tsx,mdx}',
    //'./components/**/*.{js,ts,jsx,tsx,mdx}',
    //'./app/**/*.{js,ts,jsx,tsx,mdx}',
  //],
  //theme: {
    //extend: {
      //backgroundImage: {
        //'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        //'gradient-conic':
          //'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      //},
    //},
  //},
  //plugins: [],
//} 

//for the project
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
      }
    },
  },
  plugins: [],
}