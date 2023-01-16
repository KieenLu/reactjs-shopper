/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    container: {
      screens: {
        "2xl": {
          max: 1440,
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
