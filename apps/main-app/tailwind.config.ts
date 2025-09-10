import type { Config } from "tailwindcss";
import preset from "@maham/theme/src/tailwind-preset";

const config: Config = {
  darkMode: ["class"],
  presets: [preset],
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "../../packages/ui/src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
export default config;
