/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        craft: {
          50: '#FDF8F5',
          100: '#FBEFE8',
          200: '#F6DECة',
          300: '#EFC1AF',
          400: '#E4987E',
          500: '#D97350', // Warm terracotta
          600: '#C85A32', // Deep terracotta primary
          700: '#A74523',
          800: '#86381E',
          900: '#6C301B',
        },
        ochre: {
          50: '#FFFDF5',
          100: '#FFF9E5',
          200: '#FEF0BF',
          300: '#FDE48F',
          400: '#FCD255',
          500: '#F5B81B', // Warm Indian Ochre
          600: '#D99B0F',
          700: '#B0780B',
          800: '#8E5E0F',
          900: '#754D11',
        },
        govnavy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53', // Deep Gov Trust Navy
          900: '#102A43',
        },
        emeraldcraft: {
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        }
      },
      fontFamily: {
        serif: ['Rozha One', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'craft': '0 4px 20px -2px rgba(200, 90, 50, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'craft-lg': '0 10px 25px -3px rgba(200, 90, 50, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
        'gov': '0 4px 20px -2px rgba(36, 59, 83, 0.1), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
