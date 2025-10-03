/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'float 8s ease-in-out infinite',
        'slide-down': 'slideDown 10s linear infinite',
        'drift-right': 'driftRight 20s ease-in-out infinite',
        'drift-left': 'driftLeft 25s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.7' },
          '25%': { transform: 'translateY(-20px) translateX(10px)', opacity: '1' },
          '50%': { transform: 'translateY(-10px) translateX(-5px)', opacity: '0.8' },
          '75%': { transform: 'translateY(-30px) translateX(15px)', opacity: '0.9' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        driftRight: {
          '0%, 100%': { transform: 'translateX(-50px) translateY(0px)' },
          '50%': { transform: 'translateX(50px) translateY(-30px)' },
        },
        driftLeft: {
          '0%, 100%': { transform: 'translateX(50px) translateY(0px)' },
          '50%': { transform: 'translateX(-50px) translateY(30px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(20px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(20px) rotate(-360deg)' },
        },
        magicalPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.2)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'orbit-animation': 'orbit 8s linear infinite',
        'magical-pulse': 'magicalPulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
