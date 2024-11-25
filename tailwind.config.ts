const colors = require("tailwindcss/colors");

const defaultTheme = require("tailwindcss/defaultTheme");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const svgToDataUri = require("mini-svg-data-uri");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include app directory
    "./components/**/*.{js,ts,jsx,tsx}", // If components are outside app
    "./pages/**/*.{js,ts,jsx,tsx}", // If using Pages Router (optional)
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4D96FF",
          dark: "#1E293B",
          borderLight: "#93C5FD",
          borderDark: "#4B5563",
          hoverLight: "#2563EB",
          hoverDark: "#1E293B",
        },
        accent: "#EBA904",
        background: {
          light: "#F5F6F7",
          dark: "#000000",
          cardLight: "#F5F6F7",
          cardDark: "#1A1A1A",
          boxLight: "#E5E7EB",
          boxDark: "#262626",
          borderLight: "#D1D5DB",
          borderDark: "#333333",
          highlightLight: "#F3F4F6",
          highlightDark: "#1F1F1F",
        },
        text: {
          light: "#1E293B",
          dark: "#F5F5F5",
          headingLight: "#111827",
          headingDark: "#FFFFFF",
          subtitleLight: "#374151",
          subtitleDark: "#D1D5DB",
          mutedLight: "#6B7280",
          mutedDark: "#A3A3A3",
          linkLight: "#2563EB",
          linkDark: "#93C5FD",
        },
      },

      fontFamily: {
        edu: ['"Edu AU VIC WA NT Hand"', "cursive"],
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
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
