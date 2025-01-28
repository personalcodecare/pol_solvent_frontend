import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      textShadow: {
        green: '0px 0px 25px 0px #0AF593',
      },
      fontSize: {
        heading1: ['64px', '64px'],
        heading2: ['48px', '48px'],
        heading3: ['24px', '24px'],
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        white: '#FFFFFF',
        brightGreen: '#0AF593',
        softGold: '#FFCE70',
        darkMain: '#3B3E43',
        darkSecondary: '#474C52',
        steelBlue: '#B8CAE0',
        lavaOrange: '#F5450A',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        typing: {
          '0%, 20%': { opacity: '1' },
          '20%, 100%': { opacity: '0.5' },
        },
        'typing-dot': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.5rem)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'typing-dot': 'typing-dot 1s infinite',
      },
      boxShadow: {
        'hover-white': '0px 0px 25px 0px #FFFFFF80',
        'hover-gold': '0px 0px 25px 0px #FFCE7080',
        'hover-green': '0px 0px 25px 0px #0AF59380',
        'hover-orange': '0px 0px 25px 0px #F5450A80',
        green: '0px 0px 25px 0px #0AF593',
        white: '0px 0px 25px 0px #FFFFFF',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover', 'disabled'],
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // @ts-expect-error no type
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-green': {
          textShadow: '0px 0px 25px #0AF593',
        },
        '.text-shadow-white': {
          textShadow: '0px 0px 25px #FFFFFF',
        },
      })
    },
  ],
} satisfies Config

export default config
