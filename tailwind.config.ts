import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";
import tailwindcssAnimate from "tailwindcss-animate";

const config = withMT({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sassoon: ["Sassoon Infant Std", "sans-serif"], // Register the custom font
      },
    },
  },
  plugins: [tailwindcssAnimate],
}) as Config;

export default config;
