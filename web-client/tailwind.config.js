/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#00B894', // Main brand color
          600: '#00A085',
          700: '#00D4A3',
          800: '#166534',
          900: '#14532d',
        },
        background: '#FFFFFF',
        card: '#FFFFFF',
        text: {
          primary: '#1A1A1A',
          secondary: '#666666',
          light: '#999999',
          white: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E5E5E5',
          light: '#F0F0F0',
        },
        success: '#00B894',
        error: '#FF6B6B',
        warning: '#FFA726',
        info: '#4FC3F7',
        like: '#FF6B6B',
        comment: '#4FC3F7',
        share: '#00B894',
        shadow: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} 