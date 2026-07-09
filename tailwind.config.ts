import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F0EC",
        bronze: "#A68463",
        "bronze-dark": "#8C6E50",
        ink: "#111111",
        charcoal: "#191D23",
        footer: "#14181E",
      },
      fontFamily: {
        sans: ["var(--font-open-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-open-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-open-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-open-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
