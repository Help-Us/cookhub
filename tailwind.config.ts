import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
<<<<<<< HEAD
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
=======
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
>>>>>>> 9c53e337ca184854fe2629cf6a84de7d1e6ac7c3
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    }
  },
<<<<<<< HEAD
  plugins: [require("daisyui")],
=======
  plugins: []
>>>>>>> 9c53e337ca184854fe2629cf6a84de7d1e6ac7c3
};
export default config;
