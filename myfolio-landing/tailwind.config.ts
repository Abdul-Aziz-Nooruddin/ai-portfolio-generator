import type { Config } from 'tailwindcss';

export default {
  content: { relative: true, files: ['./index.html', './src/**/*.{ts,tsx}'] },
  theme: {
    extend: {
      colors: {
        paper: '#f4f1e8',
        mist: '#e4e4e4',
        ink: '#171817',
        sky: '#75c5de',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config;
