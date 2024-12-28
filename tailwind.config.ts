import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fonts: {
        sans: ["Figtree", "sans-serif"],
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
    },
  },
  plugins: [],
} satisfies Config;
