/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#032126',
        'ink-2': '#24474D',
        'ink-3': '#375257',
        paper: '#E8ECE9',
        'paper-2': '#D9E1DC',
        'paper-3': '#D0DDD5',
        cream: '#F6F4F3',
        sage: '#5B9383',
        'sage-deep': '#365E55',
        mint: '#A7D5B8',
        'mint-soft': '#9DBDAB',
        'mint-pale': '#B8CDC1',
        muted: '#768787',
        blue: '#9CB6E0',
        'blue-deep': '#264881',
        'blue-pale': '#CED9EB',
        rose: '#CE9599',
        'rose-pale': '#D3BBBB',
        clay: '#E28468',
        'clay-deep': '#5E3120',
      },
      // Families whose names contain spaces/digits must be quoted here —
      // Tailwind emits the array verbatim, and an unquoted "Source Serif 4"
      // is invalid CSS that the browser silently drops.
      fontFamily: {
        sans: ["'Source Serif 4'", 'Georgia', 'serif'],
        display: ["'General Sans'", 'Inter', 'system-ui', 'sans-serif'],
        body: ["'Source Serif 4'", 'Georgia', 'serif'],
        mono: ["'IBM Plex Mono'", 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['76px', { lineHeight: '79.8px', letterSpacing: '-1.52px' }],
        'display-lg': ['56px', { lineHeight: '60px', letterSpacing: '-1.12px' }],
        'display-md': ['48px', { lineHeight: '52px', letterSpacing: '-0.96px' }],
        'body-lg': ['20px', { lineHeight: '28px', letterSpacing: '-0.4px' }],
        'body-md': ['18px', { lineHeight: '26px', letterSpacing: '-0.18px' }],
        'body-sm': ['16px', { lineHeight: '24px', letterSpacing: '-0.16px' }],
        'body-xs': ['14px', { lineHeight: '22px', letterSpacing: '-0.14px' }],
        label: ['15px', { lineHeight: '23px' }],
        eyebrow: ['13px', { lineHeight: '22px', letterSpacing: '0.65px' }],
      },
      maxWidth: {
        shell: '1216px',
        inner: '1120px',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
