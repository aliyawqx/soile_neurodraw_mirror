import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#522859", // Pastel purple
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "#f3f0f4", // Very light purple-gray
          foreground: "#522859",
        },
        destructive: {
          DEFAULT: "hsl(0, 84.2%, 60.2%)",
          foreground: "hsl(210, 40%, 98%)",
        },
        muted: {
          DEFAULT: "#f8f6f9", // Light purple-gray
          foreground: "#6b4c75",
        },
        accent: {
          DEFAULT: "#f0ecf2", // Light purple accent
          foreground: "#522859",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "#522859",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "#522859",
        },
        // Custom purple palette
        "purple-50": "#faf9fb",
        "purple-100": "#f3f0f4",
        "purple-200": "#e8e1ec",
        "purple-300": "#d4c4db",
        "purple-400": "#b899c4",
        "purple-500": "#9b6eab",
        "purple-600": "#7d4a8a",
        "purple-700": "#6b4c75",
        "purple-800": "#522859",
        "purple-900": "#3d1e42",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
