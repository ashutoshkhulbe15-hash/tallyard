/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAF6EF",
        "bg-warm": "#F5EFE0",
        surface: "#FFFFFF",
        "surface-alt": "#F9F5EC",
        ink: {
          DEFAULT: "#1A1814",
          muted: "#5A5142",
          faint: "#7A6F56",
        },
        walnut: {
          DEFAULT: "#1A1814",
          soft: "#2A241E",
        },
        "walnut-ink": {
          DEFAULT: "#FFFFFF",
          muted: "#A09580",
          faint: "#7A6F56",
        },
        line: {
          DEFAULT: "#ECE7DB",
          strong: "#D6CFB8",
          dark: "rgba(255,255,255,0.08)",
        },
        accent: {
          DEFAULT: "#D4691C",
          hover: "#B85A17",
          soft: "rgba(212,105,28,0.12)",
          light: "#E89048",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Cambria", "Georgia", "Times New Roman", "serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
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
        lg: "16px",
        xl: "20px",
      },
      maxWidth: {
        content: "760px",
        wide: "1180px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.03)",
        card: "0 2px 8px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};
