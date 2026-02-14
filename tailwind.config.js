/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Scan these folders for classes
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"], 
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#059669", // Emerald 600
        secondary: "#F59E0B", // Amber 500
        dark: "#1F2937",
        light: "#F9FAFB",
      }
    },
  },
  plugins: [],
}