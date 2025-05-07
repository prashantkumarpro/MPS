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
        'light-gray': '#F5F7FA'
      }
    }
  },
  plugins: []
}
