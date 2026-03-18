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
        // Luxury palette
        ivory: "#FDFBF7",
        ink: "#1A1A2E",
        lilac: {
          50: "#F8F6FC",
          100: "#F0EBFA",
          200: "#E0D5F5",
          300: "#C9B8EC",
          400: "#A98FDB",
          500: "#8B6EC5",
        },
        sand: {
          50: "#FBF9F4",
          100: "#F5F0E6",
          200: "#E8DFD0",
          300: "#D4C5AD",
        },
        amber: {
          600: "#B45309",
          700: "#92400E",
          800: "#78350F",
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
