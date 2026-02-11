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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "cyber-cyan": "#00f0ff",
        "cyber-yellow": "#fcee0a",
        "cyber-black": "#0a0a0a",
        "cyber-dark": "#050505",
        "cyber-muted": "#64748b",
        "cyber-green": "#00ff9d",
        primary: "#00f3ff",
        secondary: "#7000ff",
        accent: "#00ff9d",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)",
        "gradient-accent": "linear-gradient(135deg, #00ff9d 0%, #00f0ff 100%)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        tech: ["var(--font-tech)"],
      },
    },
  },
  plugins: [],
};
export default config;
