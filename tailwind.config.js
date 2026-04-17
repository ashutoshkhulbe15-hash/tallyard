/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF7",
        surface: "#FFFFFF",
        "surface-alt": "#F5F3EE",
        ink: {
          DEFAULT: "#0A0A0A",
          muted: "#525252",
          faint: "#737373",
        },
        dark: {
          DEFAULT: "#0A0A0A",
          soft: "#1A1A1A",
        },
        "dark-ink": {
          DEFAULT: "#FFFFFF",
          muted: "#A3A3A3",
          faint: "#737373",
        },
        line: {
          DEFAULT: "rgba(0,0,0,0.08)",
          strong: "rgba(0,0,0,0.15)",
          dark: "rgba(255,255,255,0.08)",
          "dark-strong": "rgba(255,255,255,0.12)",
        },
        accent: {
          DEFAULT: "#F97316",
          hover: "#EA580C",
          soft: "rgba(249,115,22,0.1)",
          border: "rgba(249,115,22,0.3)",
          light: "#FB923C",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        serif: ["Cambria", "Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        "xs": ["12px", { lineHeight: "1.5" }],
        "sm": ["13px", { lineHeight: "1.55" }],
        "base": ["15px", { lineHeight: "1.6" }],
        "lg": ["17px", { lineHeight: "1.55" }],
        "xl": ["20px", { lineHeight: "1.4" }],
        "2xl": ["24px", { lineHeight: "1.3" }],
        "3xl": ["32px", { lineHeight: "1.2" }],
        "4xl": ["40px", { lineHeight: "1.1" }],
        "5xl": ["56px", { lineHeight: "1.05" }],
        "6xl": ["72px", { lineHeight: "1" }],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.025em",
        wide: "0.08em",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      maxWidth: {
        prose: "640px",
        content: "760px",
        wide: "1180px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0,0,0,0.04)",
        card: "0 4px 24px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
