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
        canvas: "#0A0A0A",
        surface: "#151515",
        "text-primary": "#F5F1E8",
        "text-secondary": "#A89F91",
        accent: "#C49A6C",
        "border-subtle": "#1E1E1E",
      },
      fontFamily: {
        heading: ["Urbanist", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 10vw, 9rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.25rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "label": ["0.75rem", { lineHeight: "1", letterSpacing: "0.15em" }],
      },
      spacing: {
        "section": "10rem",
        "section-sm": "6rem",
      },
      transitionTimingFunction: {
        "cinema": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      animation: {
        "fade-in": "fadeIn 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "grain": "grain 0.8s steps(1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(2%, 1%)" },
          "30%": { transform: "translate(-1%, 3%)" },
          "40%": { transform: "translate(3%, -2%)" },
          "50%": { transform: "translate(-2%, 2%)" },
          "60%": { transform: "translate(1%, -1%)" },
          "70%": { transform: "translate(-3%, 2%)" },
          "80%": { transform: "translate(2%, -3%)" },
          "90%": { transform: "translate(-1%, 1%)" },
        },
      },
      maxWidth: {
        "reading": "65ch",
        "site": "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
