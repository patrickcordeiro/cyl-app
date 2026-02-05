const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    join(__dirname, './src/**/*.{ts,tsx,js,jsx,css}'),
    join(__dirname, './app/**/*.{ts,tsx,js,jsx,css}'),
    join(__dirname, './components/**/*.{ts,tsx,js,jsx,css}'),
    join(__dirname, './pages/**/*.{ts,tsx,js,jsx,css}'),

    // libs no monorepo
    join(__dirname, '../../libs/**/*.{ts,tsx,js,jsx}'),
    join(__dirname, '../../../libs/**/*.{ts,tsx,js,jsx}'),
  ],

  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        border: 'hsl(var(--border))',
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
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
  },

  plugins: [],
};
