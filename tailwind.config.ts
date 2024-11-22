const colors = require('tailwindcss/colors');

module.exports = {
   content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include app directory
    "./components/**/*.{js,ts,jsx,tsx}", // If components are outside app
    "./pages/**/*.{js,ts,jsx,tsx}", // If using Pages Router (optional)
  ],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4D96FF', // Cool blue for light mode
          dark: '#1E293B', // Deep slate for dark mode
        },
        accent: '#EBA904', // Your school's accent color
        background: {
          light: '#F8FAFC', // Light gray for light mode
          dark: '#0F172A', // Navy slate for dark mode
        },
        text: {
          light: '#1E293B', // Slate for light mode text
          dark: '#F8FAFC', // Light gray for dark mode text
        },
      },
    },
  },
  plugins: [],
};
