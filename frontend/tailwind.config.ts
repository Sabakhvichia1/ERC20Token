import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'space-mono': ['var(--font-space-mono)', 'monospace'],
      },
      colors: {
        'bg-deep': '#0f0612',
        'bg-surface': '#1a0e2e',
        'accent-purple': '#7c3aed',
        'accent-orange': '#ff8c42',
        'accent-cyan': '#06b6d4',
        'brand-orange': '#ff8c42',
        'brand-yellow': '#ffb347',
        'brand-dark': '#1a0e2e',
        primary: '#06b6d4',
        accent: '#7c3aed',
        secondary: '#a1a1aa',
        success: '#10b981',
        error: '#ef4444',
        'surface-dark': 'rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'mesh-rotate': 'meshRotate 30s linear infinite',
        'icon-spin': 'iconSpin 20s linear infinite',
        'reveal-up': 'revealUp 0.8s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3), 0 0 40px rgba(255, 140, 66, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(255, 140, 66, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        meshRotate: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        iconSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
