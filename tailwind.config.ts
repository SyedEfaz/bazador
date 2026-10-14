import type { Config } from "tailwindcss";
import daisyui from "daisyui";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { fontFamily: { sans: ["var(--font-bn)", "sans-serif"] } } },
  plugins: [daisyui],
  daisyui: {
    themes: [{
      bazar: {
        primary: "#1f8a4c", "primary-content": "#ffffff",
        secondary: "#e8731a", accent: "#f5a30a",
        neutral: "#2b2118", "base-100": "#fffdf8", "base-200": "#f6f1e7", "base-300": "#e9e0cf",
        info: "#2f7fb8", success: "#1f8a4c", warning: "#f5a30a", error: "#d6362f",
      },
    }],
  },
};
export default config;
