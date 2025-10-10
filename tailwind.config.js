/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0066B2',
        'secondary-blue': '#4DA6FF',
        'background-white': '#FFFFFF',
        'dark-text-gray': '#333333',
        'accent-purple': '#6B5B95',
        'light-gray': '#F5F7FA',
        button: '#c96868'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        anton: ['Anton SC', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        abel: ['Abel', 'sans-serif'],
        akshar: ['Akshar', 'sans-serif'],
        alike: ['Alike', 'serif'],
        alkatra: ['Alkatra', 'cursive'],
        alumni: ['Alumni Sans SC', 'sans-serif']
      }
    }
  },
  plugins: []
}
