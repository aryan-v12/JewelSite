/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Temple Gold / Antique Gold
        gold: {
          50: '#FDF8E8',
          100: '#F9EDCC',
          200: '#F2DDA3',
          300: '#E8D48A',
          400: '#D9C15C',
          500: '#C9A227', // Primary Temple Gold
          600: '#B8922B',
          700: '#8B6914',
          800: '#6B5210',
          900: '#4A380B',
        },
        // Secondary - Deep Maroon / Kumkum Red
        maroon: {
          50: '#FCE8EC',
          100: '#F5C5CE',
          200: '#E8909F',
          300: '#D45C73',
          400: '#B83350',
          500: '#800020', // Primary Maroon
          600: '#6B001B',
          700: '#4A0012',
          800: '#35000D',
          900: '#200008',
        },
        // Accent - Royal Peacock Blue
        peacock: {
          50: '#E6F4F5',
          100: '#B3DEE3',
          200: '#80C9D0',
          300: '#4DB3BD',
          400: '#269DA8',
          500: '#005F6B', // Peacock Blue
          600: '#00535E',
          700: '#004249',
          800: '#003138',
          900: '#002028',
        },
        // Accent 2 - Saffron Orange
        saffron: {
          50: '#FFF5E6',
          100: '#FFE4BF',
          200: '#FFD699',
          300: '#FFBF69',
          400: '#FFAD40',
          500: '#FF9933', // Saffron
          600: '#E68A2E',
          700: '#CC7A29',
          800: '#995C1F',
          900: '#664014',
        },
        // Accent 3 - Emerald Green (Prosperity)
        emerald: {
          50: '#E6F5ED',
          100: '#B3E0C9',
          200: '#80CCA5',
          300: '#50C878',
          400: '#2DB85C',
          500: '#046A38', // Emerald Green
          600: '#035C31',
          700: '#024A28',
          800: '#02381E',
          900: '#012614',
        },
        // Neutrals - Warm Indian Tones
        ivory: {
          50: '#FFFFFE',
          100: '#FFFEF9',
          DEFAULT: '#FFFEF9',
          200: '#FFFDF5',
          300: '#FFFBEF',
          400: '#FFF8E7',
          500: '#FDF8F3', // Ivory
        },
        cream: {
          50: '#FFFDFB',
          100: '#FDF8F3', // Cream
          DEFAULT: '#FDF8F3',
          200: '#FAF3EA',
          300: '#F5E6D3', // Sandstone
          400: '#EDD9C0',
          500: '#E5CCAD',
        },
        sandstone: {
          50: '#FDF9F5',
          100: '#F9F0E6',
          200: '#F5E6D3',
          DEFAULT: '#F5E6D3',
          300: '#EDD9C0',
          400: '#E0C9A8',
          500: '#D4B896',
        },
        charcoal: {
          50: '#E8E8E8',
          100: '#CCCCCC',
          200: '#999999',
          300: '#666666',
          400: '#3D3D3D',
          500: '#1A1A1A', // Deep Charcoal
          600: '#141414',
          700: '#0F0F0F',
          800: '#0A0A0A',
          900: '#050505',
        },
        // Text Colors - Warm Browns
        brown: {
          50: '#F5F0ED',
          100: '#E6DCD5',
          200: '#D4C4B8',
          300: '#B8A090',
          400: '#8B7355',
          500: '#5D4E37',
          600: '#4A3E2C',
          700: '#3A3023',
          800: '#2D1810', // Primary Text
          900: '#1F0F08',
        },
        // Soft White
        'soft-white': '#FEFEFE',
      },
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
        heading: ['Yeseva One', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // Gold gradients
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #E8D48A 50%, #C9A227 100%)',
        'gold-radial': 'radial-gradient(ellipse at center, #E8D48A 0%, #C9A227 50%, #8B6914 100%)',
        'metallic-gold': 'linear-gradient(180deg, #E8D48A 0%, #C9A227 25%, #8B6914 50%, #C9A227 75%, #E8D48A 100%)',
        // Maroon gradients
        'maroon-gradient': 'linear-gradient(135deg, #800020 0%, #A52A2A 50%, #800020 100%)',
        'maroon-radial': 'radial-gradient(ellipse at center, #A52A2A 0%, #800020 100%)',
        // Heritage gradients
        'heritage-warm': 'linear-gradient(135deg, #FDF8F3 0%, #F5E6D3 100%)',
        'heritage-rich': 'linear-gradient(135deg, #800020 0%, #4A0012 100%)',
        // Peacock gradient
        'peacock-gradient': 'linear-gradient(135deg, #005F6B 0%, #008B8B 50%, #005F6B 100%)',
        // Shimmer effect
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
        // Ornate border pattern
        'ornate-border': 'repeating-linear-gradient(90deg, #C9A227 0px, #C9A227 10px, transparent 10px, transparent 20px)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'spin-reverse': 'spinReverse 15s linear infinite',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 162, 39, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 162, 39, 0.7)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201, 162, 39, 0.25)',
        'gold-lg': '0 10px 40px rgba(201, 162, 39, 0.35)',
        'gold-glow': '0 0 30px rgba(201, 162, 39, 0.4)',
        'maroon': '0 4px 20px rgba(128, 0, 32, 0.25)',
        'maroon-lg': '0 10px 40px rgba(128, 0, 32, 0.35)',
        'peacock': '0 4px 20px rgba(0, 95, 107, 0.25)',
        'elegant': '0 10px 60px rgba(0, 0, 0, 0.08)',
        'elegant-lg': '0 25px 80px rgba(0, 0, 0, 0.12)',
        'inner-gold': 'inset 0 2px 10px rgba(201, 162, 39, 0.1)',
      },
      borderRadius: {
        'ornate': '2rem 0.5rem 2rem 0.5rem',
      },
    },
  },
  plugins: [],
}

