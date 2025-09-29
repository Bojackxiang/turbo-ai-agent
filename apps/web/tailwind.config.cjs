const sharedConfig = require("../../tailwind.config.shared.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./modules/**/*.{ts,tsx}",
    // Include the UI package components
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};
