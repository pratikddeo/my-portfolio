/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        fontFamily: {
          display: ["ui-sans-serif", "system-ui", "Inter", "Segoe UI", "Roboto"],
        }
      },
    },
    plugins: [],
  };
  