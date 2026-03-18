import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Luxury neutral palette
        pearl: "#F7F5F0",
        stone: {
          50: "#F3F1EC",
          100: "#EBE8E1",
          200: "#DDD8CE",
          300: "#C8C1B4",
          400: "#A69E8F",
          500: "#8A8272",
        },
        champagne: {
          50: "#FAF8F3",
          100: "#F5F0E6",
          200: "#EDE5D5",
          300: "#DDD2BC",
        },
        greige: {
          50: "#F5F3EF",
          100: "#EDEBE5",
          200: "#E0DCD3",
          300: "#CCC6B9",
        },
        silver: {
          50: "#F8F8F7",
          100: "#F0F0EE",
          200: "#E4E3E0",
          300: "#CDCCC8",
        },
        ink: "#1A1A2E",
        charcoal: {
          700: "#2C2C3A",
          800: "#232333",
          900: "#1A1A2E",
        },
        // Antique brass — aged metallic warmth, NOT orange
        brass: {
          300: "#C2B59E",
          400: "#A89D84",
          500: "#8B7D66",
          600: "#73684F",
          700: "#5C5342",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
