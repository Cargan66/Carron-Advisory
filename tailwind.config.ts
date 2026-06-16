import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep emerald / forest green backgrounds
        emerald: {
          base: "#0B2E20",
          section: "#0F3D2A",
          deep: "#08251A",
          muted: "#134A33",
        },
        // Gold accents
        gold: {
          DEFAULT: "#D4AF37",
          primary: "#D4AF37",
          deep: "#C9A227",
          light: "#E8C766",
        },
        // Off-white body text
        bone: {
          DEFAULT: "#EFE9DA",
          muted: "#C8C2B4",
          dim: "#9A9686",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        shimmer: "shimmer 6s linear infinite",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #E8C766 0%, #D4AF37 45%, #C9A227 100%)",
        "emerald-radial":
          "radial-gradient(ellipse at top, #0F3D2A 0%, #0B2E20 55%, #08251A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
