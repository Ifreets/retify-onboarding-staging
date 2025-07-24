/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': ['0.625rem', '0.75rem'],
      },
      spacing: {
        4.5: '1.125rem',
        18: '4.5rem',
        21: '5.25rem',
      },
    },
  },
  plugins: [],
}
