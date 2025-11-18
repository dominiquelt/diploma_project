/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coralStart: "#E23C64",
        coralEnd: "#FFD464",
        bgLight: "#EAE4E2",
        bgDark: "#1A0F11",
        textMain: "#2C2325",
      },
    },
  },
  plugins: [],
};
