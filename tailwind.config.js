/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "secondary-default": "#E0E0E0",
        "secondary-background": "#F5F5F5",
        "primary-text": "#333333",
        "secondary-text": "#828282",
        quantity: "#5C5C5C",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
