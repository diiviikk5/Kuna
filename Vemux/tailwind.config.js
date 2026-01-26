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
                // Vemux dark theme palette - refined
                vemux: {
                    bg: "#050505",
                    surface: "#0d0d0d",
                    "surface-elevated": "#141414",
                    border: "#1a1a1a",
                    "border-light": "#2a2a2a",
                    muted: "#666666",
                    text: "#fafafa",
                    "text-secondary": "#a0a0a0",
                    // Rich gradient accents
                    cyan: "#00e5ff",
                    blue: "#4c6ef5",
                    purple: "#9f7aea",
                    pink: "#f472b6",
                    green: "#34d399",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                heading: ["Space Grotesk", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            animation: {
                "glitch": "glitch 0.3s ease-in-out",
                "glitch-text": "glitch-text 0.2s ease-in-out",
                "fade-in": "fade-in 0.6s ease-out",
                "fade-in-up": "fade-in-up 0.6s ease-out",
                "scale-in": "scale-in 0.6s ease-out",
                "slide-up": "slide-up 0.3s ease-out",
                "float": "float 6s ease-in-out infinite",
                "pulse-glow": "pulse-glow 3s ease-in-out infinite",
                "gradient-shift": "gradient-shift 5s ease-in-out infinite",
            },
            keyframes: {
                glitch: {
                    "0%, 100%": { transform: "translate(0)" },
                    "20%": { transform: "translate(-2px, 2px)" },
                    "40%": { transform: "translate(2px, -2px)" },
                    "60%": { transform: "translate(-1px, -1px)" },
                    "80%": { transform: "translate(1px, 1px)" },
                },
                "glitch-text": {
                    "0%, 100%": {
                        textShadow: "0 0 0 transparent",
                        transform: "translate(0)"
                    },
                    "25%": {
                        textShadow: "-2px 0 #00e5ff, 2px 0 #f472b6",
                        transform: "translate(-1px, 0)"
                    },
                    "50%": {
                        textShadow: "2px 0 #00e5ff, -2px 0 #f472b6",
                        transform: "translate(1px, 0)"
                    },
                    "75%": {
                        textShadow: "-1px 0 #00e5ff, 1px 0 #f472b6",
                        transform: "translate(0, 1px)"
                    },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "slide-up": {
                    "0%": { transform: "translateY(10px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "pulse-glow": {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(0, 229, 255, 0.2)" },
                    "50%": { boxShadow: "0 0 40px rgba(0, 229, 255, 0.4), 0 0 60px rgba(76, 110, 245, 0.2)" },
                },
                "gradient-shift": {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-primary': 'linear-gradient(135deg, #00e5ff 0%, #4c6ef5 50%, #9f7aea 100%)',
            },
            boxShadow: {
                'glow-cyan': '0 0 40px rgba(0, 229, 255, 0.3), 0 0 80px rgba(0, 229, 255, 0.1)',
                'glow-purple': '0 0 40px rgba(159, 122, 234, 0.3), 0 0 80px rgba(159, 122, 234, 0.1)',
                'glow-gradient': '0 0 40px rgba(0, 229, 255, 0.2), 0 0 80px rgba(76, 110, 245, 0.15), 0 0 120px rgba(159, 122, 234, 0.1)',
            },
        },
    },
    plugins: [],
};
