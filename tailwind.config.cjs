/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9b6ffa",
      },
    },
    fontFamily: {
      ubuntu: "Ubuntu",
    },
  },
  plugins: [require("flowbite/plugin")],
};
