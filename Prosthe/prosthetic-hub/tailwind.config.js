/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,jsx}",
        "./src/components/**/*.{js,jsx}",
        "./src/app/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                muted: "var(--muted)",
                "muted-foreground": "var(--muted-foreground)",
                accent: "var(--accent)",
                "accent-foreground": "var(--accent-foreground)",
                border: "var(--border)",
                ring: "var(--ring)",
                card: "var(--card)",
                "card-foreground": "var(--card-foreground)",
                primary: "var(--primary)",
                "primary-foreground": "var(--primary-foreground)",
            },
            fontFamily: {
                heading: ["'Orbitron'", "monospace"],
                body: ["'Inter'", "system-ui", "sans-serif"],
                mono: ["'JetBrains Mono'", "monospace"],
                serif: ["'Playfair Display'", "serif"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [],
};
