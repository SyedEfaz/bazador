import type { Config } from "tailwindcss";
import daisyui from "daisyui";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { fontFamily: { sans: ["var(--font-bn)", "sans-serif"] } } },
  plugins: [daisyui],
  daisyui: {
    themes: [{
      bazar: {
        primary: "#138447", "primary-content": "#ffffff",
        secondary: "#496655", accent: "#e8731a",
        neutral: "#26352c", "base-100": "#fbfdfb", "base-200": "#eff5f0", "base-300": "#dce7de",
        info: "#2f7fb8", success: "#16834a", warning: "#f5a30a", error: "#d9342b",
      },
    }],
  },
};
export default config;
