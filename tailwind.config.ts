const colors = require("tailwindcss/colors");

const defaultTheme = require("tailwindcss/defaultTheme");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

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
          light: "#4D96FF", // Cool blue for light mode
          dark: "#1E293B", // Deep slate for dark mode
          borderLight: "#93C5FD", // Soft blue for borders in light mode
          borderDark: "#4B5563", // Muted dark gray for borders in dark mode
          hoverLight: "#2563EB", // Hover effect blue for light mode
          hoverDark: "#1E293B", // Slate blue for hover effects in dark mode
        },
        accent: "#EBA904", // School's accent color
        background: {
          light: "#F8FAFC", // Light gray for light mode
          dark: "#000000", // Deep black for dark mode
          cardLight: "#FFFFFF", // White for cards in light mode
          cardDark: "#1A1A1A", // Near black for cards in dark mode
          boxLight: "#E5E7EB", // Subtle gray for boxes in light mode
          boxDark: "#262626", // Dark gray for boxes in dark mode
          borderLight: "#D1D5DB", // Light gray for borders in light mode
          borderDark: "#333333", // Soft black for borders in dark mode
          highlightLight: "#F3F4F6", // Highlighted background in light mode
          highlightDark: "#1F1F1F", // Subtle highlight in dark mode
        },
        text: {
          light: "#1E293B", // Slate for light mode text
          dark: "#F5F5F5", // Soft white for dark mode text
          headingLight: "#111827", // Darker slate for headings in light mode
          headingDark: "#FFFFFF", // Pure white for headings in dark mode
          subtitleLight: "#374151", // Medium gray for subtitles in light mode
          subtitleDark: "#D1D5DB", // Soft gray for subtitles in dark mode
          mutedLight: "#6B7280", // Muted gray for secondary text in light mode
          mutedDark: "#A3A3A3", // Muted gray for secondary text in dark mode
          linkLight: "#2563EB", // Blue for links in light mode
          linkDark: "#93C5FD", // Light blue for links in dark mode
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
  plugins: ["prettier-plugin-tailwindcss"],
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
