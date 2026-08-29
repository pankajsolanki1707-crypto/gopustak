/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A192F',
          darkNavy: '#070F1E',
          accent: '#D97706',
          accentHover: '#B45309',
          gold: '#EAB308',
          card: '#0F2342',
          lightBg: '#FAFAF9',
          lightCard: '#FFFFFF',
          textDark: '#0F172A',
          textMuted: '#64748B',
          borderLight: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
