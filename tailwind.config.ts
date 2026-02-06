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
        // Cyber Robotics Palette
        "cyber-cyan": "#00f0ff",
        "cyber-pink": "#ff003c",
        "cyber-yellow": "#fcee0a",
        "cyber-black": "#0a0a0a",
        "cyber-dark": "#050505",
        "cyber-muted": "#64748b",
        cyber: {
          black: "#02040a",
          dark: "#0b1021",
          card: "#0f1629",
          text: "#cbd5e1",
          muted: "#64748b",
          primary: "#00f3ff",  // Neon Cyan
          secondary: "#7000ff", // Neon Purple
          accent: "#ff0055",    // Neon Red/Pink
        },
        primary: "#00f3ff",
        secondary: "#7000ff",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #00f3ff 0%, #7000ff 100%)",
        "cyber-grid": "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
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
