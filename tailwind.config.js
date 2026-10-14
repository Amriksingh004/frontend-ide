/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FAF7EE',
          100: '#F4ECCF',
          200: '#E9D89E',
          300: '#DEC46D',
          400: '#D4AF37',
          500: '#B89324',
          600: '#977519',
          700: '#735613',
          800: '#523D0F',
          900: '#352709',
        },
        maroon: {
          50: '#FDF4F5',
          100: '#F9E2E4',
          200: '#F2C5C9',
          300: '#E599A1',
          400: '#CE5F6C',
          500: '#AB3343',
          600: '#7B1826',
          700: '#5C0F1B',
          800: '#420A12',
          900: '#2A060C',
        },
        rosegold: {
          50: '#FAF2F2',
          100: '#F5E4E4',
          200: '#EBCBCB',
          300: '#DEA7A8',
          400: '#CA7779',
          500: '#B76E79',
          600: '#9E535F',
          700: '#7F3D47',
          800: '#643038',
          900: '#4E262C',
        },
        ivory: {
          50: '#FFFDF9',
          100: '#FBF8F1',
          200: '#F5EFE3',
          300: '#EDE2CF',
          400: '#E0CEB2',
          500: '#CEB692',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(212, 175, 55, 0.15)',
        'gold-md': '0 4px 20px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 8px 30px rgba(212, 175, 55, 0.35)',
        'maroon-sm': '0 4px 15px rgba(66, 10, 18, 0.15)',
        'maroon-md': '0 8px 25px rgba(66, 10, 18, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(135deg, #D4AF37 0%, #F4ECCF 50%, #B89324 100%)',
      }
    },
  },
  plugins: [],
}
