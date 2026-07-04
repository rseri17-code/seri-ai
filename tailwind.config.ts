import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080A0F",
        panel: "#11151E",
        line: "#253043",
        mint: "#5FF2B5",
        signal: "#73A7FF",
        amber: "#F3C969"
      },
      boxShadow: {
        glow: "0 0 48px rgba(95, 242, 181, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
