import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", "sans-serif"],
      },
      spacing: {
        "44.5": "180px",
      },
      transitionProperty: {
        width: "width",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "nnp-primary": "#14161A",
        "nnp-highlight": "#DD8300",
        "nnp-muted": "#828282",
        "nnp-gradient": "#7591A3",
      },
      keyframes: {
        zoomIn: {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        zoomIn: "zoomIn 1s ease-out", // Adjust duration and easing as needed
      },
    },
  },
  plugins: [],
} satisfies Config;
