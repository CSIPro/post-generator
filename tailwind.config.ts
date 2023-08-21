import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          50: "#d4c7f3",
          100: "#c6b5ef",
          200: "#b8a2eb",
          300: "#aa8fe6",
          400: "#9c7de2",
          500: "#8d6ade",
          600: "#7f58da",
          700: "#7145d6",
          800: "#663ec1",
          900: "#5a37ab",
        },
        secondary: "#e91e63",
        tertiary: "#0080ff",
        error: "#ff6f00",
        github: "#171515",
      },
    },
  },
  plugins: [],
};
export default config;
