/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAFBF8",
        "bg-warm": "#F1F4EF",
        surface: "#FFFFFF",
        "surface-alt": "#F6F8F4",
        ink: {
          DEFAULT: "#111814",
          muted: "#4A544E",
          faint: "#6B756E",
        },
        walnut: {
          DEFAULT: "#111814",
          soft: "#1C2620",
        },
        "walnut-ink": {
          DEFAULT: "#FFFFFF",
          muted: "#9BA8A0",
          faint: "#6B756E",
        },
        line: {
          DEFAULT: "#DCE2DB",
          strong: "#C3CCC2",
          dark: "rgba(255,255,255,0.08)",
        },
        accent: {
          DEFAULT: "#147A46",
          hover: "#0F6238",
          soft: "#E7F3EC",
          light: "#2E9B62",
        },
        amber: {
          DEFAULT: "#B9791A",
          soft: "rgba(185,121,26,0.12)",
        },
      },
      fontFamily: {
        sans: ["Instrument Sans", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        display: ["Archivo", "Instrument Sans", "sans-serif"],
        serif: ["Cambria", "Georgia", "Times New Roman", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["13px", { lineHeight: "1.55" }],
        base: ["15px", { lineHeight: "1.6" }],
        lg: ["17px", { lineHeight: "1.55" }],
        xl: ["20px", { lineHeight: "1.4" }],
        "2xl": ["24px", { lineHeight: "1.3" }],
        "3xl": ["32px", { lineHeight: "1.2" }],
        "4xl": ["40px", { lineHeight: "1.1" }],
        "5xl": ["56px", { lineHeight: "1.05" }],
        "6xl": ["68px", { lineHeight: "1" }],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.025em",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "10px",
        lg: "14px",
        xl: "18px",
      },
      maxWidth: {
        content: "760px",
        wide: "1180px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(17,24,20,0.04)",
        card: "0 2px 6px rgba(17,24,20,0.05)",
        receipt: "0 24px 60px -24px rgba(17,24,20,.22), 0 2px 4px rgba(17,24,20,.05)",
      },
    },
  },
  plugins: [],
};
