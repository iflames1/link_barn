const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        instrument: ["Instrument Sans", "sans-serif"],
      },
      colors: {
        "base-dark": "#633CFF",
        "base-normal": "#BEADFF",
        "base-light": "#EFEBFF",
        black: "#333",
        "gray-dark": "#737373",
        gray: "#D9D9D9",
        "gray-light": "#FAFAFA",
        "gray-preview": "#EEE",
        red: "#FF3939",
      },
      boxShadow: {
        active: "0px 0px 32px 0px rgba(99, 60, 255, 0.25)",
        dropdown: "0px 0px 32px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
