/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: "var(--teal)",
        blush: "var(--blush)",
        cream: "var(--cream)",
        charcoal: "var(--charcoal)",
        slate: "var(--slate)",
        offwhite: "var(--offwhite)",
      },
      borderRadius: {
        brand: "var(--radius)",
        "brand-sm": "var(--radius-sm)",
        pill: "var(--pill)",
      },
      boxShadow: {
        brand: "var(--shadow)",
        "brand-soft": "var(--shadow-soft)",
      },
      fontFamily: {
        brand: ["var(--font)"],
      },
      fontWeight: {
        title: "var(--w-title)",
        body: "var(--w-body)",
        cta: "var(--w-cta)",
      },
    },
  },
  plugins: [],
};
