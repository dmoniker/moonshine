/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: [
          "ui-rounded",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        body: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        void: "#07090f",
        night: "#0d1117",
        panel: "#121820",
        mist: "#1a2332",
        accent: "#22c55e",
        accentDim: "#16a34a",
        gold: "#fbbf24",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(34, 197, 94, 0.35)",
      },
    },
  },
  plugins: [],
};
