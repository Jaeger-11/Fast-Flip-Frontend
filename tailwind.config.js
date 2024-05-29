/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      smd: '600px',
      md: '825px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      fontFamily: {
        // 'styrene': ["StyreneA", "san serif"]
       },
       colors:{
        'lightBg': '#fffcf6',
        'blueLagoon': '#006a6a'
      }
    },
  },
  plugins: [],
}
