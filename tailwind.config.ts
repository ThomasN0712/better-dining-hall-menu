const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include app directory
    "./components/**/*.{js,ts,jsx,tsx}", // If components are outside app
    "./pages/**/*.{js,ts,jsx,tsx}", // If using Pages Router (optional)
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4D96FF', // Cool blue for light mode
          dark: '#1E293B', // Deep slate for dark mode
          borderLight: '#93C5FD', // Soft blue for borders in light mode
          borderDark: '#334155', // Slate blue for borders in dark mode
          hoverLight: '#2563EB', // Hover effect blue for light mode
          hoverDark: '#0F172A', // Darker blue for hover effects in dark mode
        },
        accent: '#EBA904', // School's accent color
        background: {
          light: '#F8FAFC', // Light gray for light mode
          dark: '#0F172A', // Navy slate for dark mode
          cardLight: '#FFFFFF', // White for cards in light mode
          cardDark: '#1E293B', // Deep slate for cards in dark mode
          boxLight: '#E5E7EB', // Subtle gray for boxes in light mode
          boxDark: '#1F2937', // Subtle gray for boxes in dark mode
          borderLight: '#D1D5DB', // Light gray for borders in light mode
          borderDark: '#4B5563', // Gray for borders in dark mode
          highlightLight: '#F3F4F6', // Highlighted background in light mode
          highlightDark: '#374151', // Highlighted background in dark mode
        },
        text: {
          light: '#1E293B', // Slate for light mode text
          dark: '#F8FAFC', // Light gray for dark mode text
          headingLight: '#111827', // Darker slate for headings in light mode
          headingDark: '#F8FAFC', // Light gray for headings in dark mode
          subtitleLight: '#374151', // Medium gray for subtitles in light mode
          subtitleDark: '#E5E7EB', // Soft gray for subtitles in dark mode
          mutedLight: '#6B7280', // Muted gray for secondary text in light mode
          mutedDark: '#9CA3AF', // Muted gray for secondary text in dark mode
          linkLight: '#2563EB', // Blue for links in light mode
          linkDark: '#93C5FD', // Light blue for links in dark mode
        },
      },
    },
  },
  plugins: [],
};
