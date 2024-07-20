/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
    fontSize: {
      xs: "0.65rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "1.75rem",
      "3xl": "2rem",
      "4xl": "2.25rem",
    },
    screens: {
      xxs: "360px",
      xs: "480px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: "0.2rem",
              marginBottom: "0.2rem",
            },
            ul: {
              li: {
                p: {
                  marginTop: "0.2rem",
                  marginBottom: "0.2rem",
                },
              },
            },
          },
        },
        sm: {
          css: {
            p: {
              marginTop: "0",
              marginBottom: "0",
            },
          },
        },
      },
      colors: {
        test: "red",
        border: "var(--border)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        tprimary: "var(--text-primary)",
        tsecondary: "var(--text-secondary)",
        ttertiary: "var(--text-tertiary)",
        welcome: "var(--welcome)",
        emphasis: "var(--bg-emphasis)",
        fail: {
          DEFAULT: "var(--fail)",
          foreground: "var(--fail-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        bgBlur: "var(--bg-blur)",
        temphasis: "var(--text-emphasis)",
        link: "var(--link)",
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
        "in-center": {
          from: {
            transform: "scale(0)",
            opacity: 0,
          },
          "50%": {
            transform: "scale(1)",
            opacity: 1,
          },
          to: {
            transform: "scale(0)",
            opacity: 0,
          },
        },
        "top-down": {
          from: {
            // transform: "scaleY(0)",
            transformOrigin: "0 0",
            height: 0,
          },
          to: {
            // transform: "scaleY(1)",
            transformOrigin: "0 0",
            height: "100px",
          },
        },
        "top-up": {
          from: {
            // transform: "scaleY(1)",
            transformOrigin: "0 0",
            height: "100px",
          },
          to: {
            // transform: "scaleY(0)",
            transformOrigin: "0 0",
            height: 0,
          },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "in-center":
          "in-center 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "top-down":
          "top-down 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "top-up": "top-up 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      backgroundImage: {
        rainbow:
          "linear-gradient( 226.4deg,  rgba(255,26,1,0.5) 28.9%, rgba(254,155,1,0.5) 33%, rgba(255,241,0,0.5) 48.6%, rgba(34,218,1,0.5) 65.3%, rgba(0,141,254,0.5) 80.6%, rgba(113,63,254,0.5) 100.1% )",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
