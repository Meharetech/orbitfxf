/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#00C6FF',
        'neon-blue': '#1E90FF',
        'deep-purple': '#7B3FE4',
        'crypto-violet': '#B14EFF',
        'dark-bg': '#0a0a0b',
        'card-bg': '#141416',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'orbit-gradient': 'linear-gradient(135deg, #00C6FF 0%, #B14EFF 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
