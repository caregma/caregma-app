import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Caregma palette — warm, hospital-trustworthy
        bg: {
          DEFAULT: "#F5F1E8",
          alt: "#EDE7D8",
          deep: "#E5DEC9",
        },
        ink: {
          DEFAULT: "#1C2628",
          soft: "#4A5759",
          faint: "#8A9395",
        },
        line: {
          DEFAULT: "#DDD6C5",
          soft: "#E8E2D2",
        },
        teal: {
          DEFAULT: "#0F6E56",
          soft: "#E1EDE5",
          deep: "#084031",
          accent: "#5DCAA5",
        },
        coral: {
          DEFAULT: "#C8553D",
          soft: "#F5E5DE",
        },
        warn: {
          DEFAULT: "#B85B1E",
          soft: "#F7E8D5",
        },
        danger: {
          DEFAULT: "#A02929",
          soft: "#F7DCDC",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Times New Roman", "serif"],
        sans: ["var(--font-geist-sans)", "-apple-system", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      fontSize: {
        // Editorial heading scale
        "display-xl": ["56px", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-md": ["38px", { lineHeight: "1.15", letterSpacing: "-0.005em" }],
        "display-sm": ["28px", { lineHeight: "1.2" }],
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
