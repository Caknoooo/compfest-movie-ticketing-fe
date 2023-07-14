/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          yellow: '#fedd95',
          dark: '#242428',
          gray: '#4d5059',
          green: '#afe3ae',
          red: '#fc887b',
          pink: '#e3b5cd',
          blue: '#aaccd7',
          pre: '#828285',
          subtle: '#2f2f33',
          navy: '#182a4e',
        },
        hover: {
          yellow: '#fdc04c',
          green: '#67c365',
          pink: '#d591b4',
          red: '#f4513f',
          blue: '#74acbc',
          gray: '#414349',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'login-illustration': "url('public/login.jpeg')",
      },
    },
  },
  plugins: [],
};
