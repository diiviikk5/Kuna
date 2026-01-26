/** @type {import('tailwindcss').Config} */
module.exports = {
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
                kuna: {
                    lime: "#c8ff00",
                    dark: "#0a1a0a",
                    surface: "rgba(255, 255, 255, 0.02)",
                    border: "rgba(255, 255, 255, 0.05)",
                }
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)"],
                mono: ["var(--font-geist-mono)"],
            },
            backgroundImage: {
                'grid-pattern': "radial-gradient(circle, #c8ff00 1px, transparent 1px)",
            }
        },
    },
    plugins: [],
};
