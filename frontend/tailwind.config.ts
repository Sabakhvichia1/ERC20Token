import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D4FF',
        accent: '#A855FF',
        success: '#10B981',
        error: '#EF4444',
        secondary: '#B4C7E7',
        'surface-dark': 'rgba(255, 255, 255, 0.1)',
        'brand-dark': '#2A1121',
        'brand-orange': '#E95221',
        'brand-yellow': '#F39C12',
      },
    },
  },
  plugins: [],
}

export default config
