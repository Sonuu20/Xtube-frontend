const baseConfig = require("tailwindcss/defaultConfig")
const baseTheme = baseConfig.theme

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Enables dark mode with the "class" strategy
  content: ["./app/**/*.{js,jsx,mdx}", "./components/**/*.{js,jsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
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
        background: {
          DEFAULT: "hsl(var(--background))",
          dark: "rgb(17, 7, 16)", // #110710 - very dark purple/black
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          dark: "rgb(249, 250, 251)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "rgb(186, 51, 127)",
          dark: "rgb(102, 16, 65)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "rgb(150, 186, 20)",
          dark: "rgb(90, 115, 0)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          dark: "rgb(45, 30, 50)",
          darkForeground: "rgb(180, 170, 185)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          purple: "rgb(142, 22, 90)", // #8e165a
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          dark: "rgb(30, 18, 36)", // Slightly lighter than background-dark
          darkForeground: "rgb(249, 250, 251)",
        },
        gradient: {
          purpleStart: "rgb(142, 22, 90)", // #8e165a
          purpleEnd: "rgb(102, 16, 65)",
          greenStart: "rgb(121, 155, 1)", // #799b01
          greenEnd: "rgb(90, 115, 0)",
        },
        link: {
          DEFAULT: "rgb(142, 22, 90)", // #8e165a
          hover: "rgb(186, 51, 127)",
        },
        text: {
          primary: "rgb(17, 7, 16)", // #110710
          secondary: "rgb(107, 86, 102)",
          highlight: "rgb(142, 22, 90)", // #8e165a
          muted: "rgb(130, 130, 140)",
        },
        video: {
          overlay: "rgba(17, 7, 16, 0.6)",
          control: "rgba(142, 22, 90, 0.9)",
        },
        success: {
          DEFAULT: "rgb(0, 170, 91)",
          foreground: "rgb(255, 255, 255)",
        },
        warning: {
          DEFAULT: "rgb(255, 170, 0)",
          foreground: "rgb(17, 7, 16)",
        },
        error: {
          DEFAULT: "rgb(225, 29, 72)",
          foreground: "rgb(255, 255, 255)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 4px 20px rgba(17, 7, 16, 0.1)",
        "card-hover": "0 8px 30px rgba(17, 7, 16, 0.15)",
        dropdown: "0 10px 25px rgba(17, 7, 16, 0.2)",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Animation plugin
}

