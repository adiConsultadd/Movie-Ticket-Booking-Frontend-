export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#e6f7ff',
          500: '#1890ff',
          700: '#096dd9',
        },
        secondary: {
          100: '#f6ffed',
          500: '#52c41a',
          700: '#389e0d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}