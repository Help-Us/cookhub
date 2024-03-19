import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: '#F5EEE6',
        beige: '#FFF8E3',
        peach: '#F3D7CA',
        pink: '#E6A4B4',
        brown: '#784b31',
        hotpink: '#D14D72',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderWidth: {
        '1.3': '1.3px',
      },
      width: {
        '700': '700px',
        '980': '980px',
      }
    },
  },
  plugins: [],
};

export default config;
