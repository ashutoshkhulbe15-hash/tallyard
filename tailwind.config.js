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
        ink: {
          DEFAULT: "#0F0F0F",
          muted: "#5F5E5A",
          faint: "#888780",
        },
        line: {
          DEFAULT: "rgba(0,0,0,0.08)",
          strong: "rgba(0,0,0,0.15)",
        },
        accent: {
          DEFAULT: "#E8742C",
          soft: "rgba(232,116,44,0.08)",
          border: "rgba(232,116,44,0.3)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "xs": ["12px", { lineHeight: "1.5" }],
        "sm": ["13px", { lineHeight: "1.55" }],
        "base": ["15px", { lineHeight: "1.6" }],
        "lg": ["17px", { lineHeight: "1.55" }],
        "xl": ["20px", { lineHeight: "1.4" }],
        "2xl": ["24px", { lineHeight: "1.3" }],
        "3xl": ["32px", { lineHeight: "1.2" }],
        "4xl": ["40px", { lineHeight: "1.15" }],
      },
      letterSpacing: {
        tight: "-0.02em",
        wide: "0.08em",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
      },
      maxWidth: {
        prose: "640px",
        content: "720px",
        wide: "1100px",
      },
    },
  },
  plugins: [],
};
