const { createThemes } = require('tw-colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // colors: {
      //   border: "hsl(var(--border))",
      //   input: "hsl(var(--input))",
      //   ring: "hsl(var(--ring))",
      //   background: "hsl(var(--background))",
      //   foreground: "hsl(var(--foreground))",
      //   primary: {
      //     DEFAULT: "hsl(var(--primary))",
      //     foreground: "hsl(var(--primary-foreground))",
      //   },
      //   secondary: {
      //     DEFAULT: "hsl(var(--secondary))",
      //     foreground: "hsl(var(--secondary-foreground))",
      //   },
      //   destructive: {
      //     DEFAULT: "hsl(var(--destructive))",
      //     foreground: "hsl(var(--destructive-foreground))",
      //   },
      //   muted: {
      //     DEFAULT: "hsl(var(--muted))",
      //     foreground: "hsl(var(--muted-foreground))",
      //   },
      //   accent: {
      //     DEFAULT: "hsl(var(--accent))",
      //     foreground: "hsl(var(--accent-foreground))",
      //   },
      //   popover: {
      //     DEFAULT: "hsl(var(--popover))",
      //     foreground: "hsl(var(--popover-foreground))",
      //   },
      //   card: {
      //     DEFAULT: "hsl(var(--card))",
      //     foreground: "hsl(var(--card-foreground))",
      //   },
      // },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    createThemes({
      light: {
        border: 'hsl(220 13% 91%)',
        input: 'hsl(220 13% 91%)',
        ring: 'hsl(224 71.4% 4.1%)',
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(224 71.4% 4.1%)',
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(224 71% 4.1%)',
        },
        popover: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(224 71.4% 4.1%)',
        },
        primary: {
          DEFAULT: 'hsl(220.9 39.3% 11%)',
          foreground: 'hsl(210 20% 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(220 14.3% 95.9%)',
          foreground: 'hsl(220.9 39.3% 11%)',
        },
        muted: {
          DEFAULT: 'hsl(220 14.3% 95.9%)',
          foreground: 'hsl(220 8.9% 46.1%)',
        },
        accent: {
          DEFAULT: 'hsl(220 14.3% 95.9%)',
          foreground: 'hsl(220.9 39.3% 11%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',
          foreground: 'hsl(210 20% 98%)',
        },
      },
      dark: {
        border: 'hsl(215 27.9% 16.9%)',
        input: 'hsl(215 27.9% 16.9%)',
        ring: 'hsl(216 12.2% 83.9%)',
        background: 'hsl(224 71.4% 4.1%)',
        foreground: 'hsl(210 20% 98%)',
        card: {
          DEFAULT: 'hsl(224 71.4% 4.1%)',
          foreground: 'hsl(210 20% 98%)',
        },
        popover: {
          DEFAULT: 'hsl(224 71.4% 4.1%)',
          foreground: 'hsl(210 20% 98%)',
        },
        primary: {
          DEFAULT: 'hsl(210 20% 98%)',
          foreground: 'hsl(220.9 39.3% 11%)',
        },
        secondary: {
          DEFAULT: 'hsl(215 27.9% 16.9%)',
          foreground: 'hsl(210 20% 98%)',
        },
        muted: {
          DEFAULT: 'hsl(215 27.9% 16.9%)',
          foreground: 'hsl(217.9 10.6% 64.9%)',
        },
        accent: {
          DEFAULT: 'hsl(215 27.9% 16.9%)',
          foreground: 'hsl(210 20% 98%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 62.8% 30.6%)',
          foreground: 'hsl(210 20% 98%)',
        },
      },
    }),
  ],
}
