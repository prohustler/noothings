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
        // Primary brand colors
        primary: {
          DEFAULT: "#FF6400",  // Orange accent
          hover: "#E65A00",
        },
        secondary: {
          DEFAULT: "#008CFF",  // Blue accent
        },
        // Neutral palette
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8F9FA",
          hover: "#F1F3F5",
        },
        text: {
          DEFAULT: "#1A1D21",
          muted: "#6B7280",
          light: "#9CA3AF",
        },
        border: {
          DEFAULT: "#E5E7EB",
          light: "#F3F4F6",
        },
        // Dark mode (future)
        dark: {
          bg: "#12123A",
          surface: "#1E1E4A",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],  // 11px
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      maxWidth: {
        "feed": "640px",
        "sidebar": "216px",
        "rightrail": "304px",
        "layout": "1200px",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.1)",
        "header": "0 1px 0 rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        "card": "12px",
      },
    },
  },
  plugins: [],
};

export default config;
