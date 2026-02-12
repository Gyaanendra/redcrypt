/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./templates/**/*.html",
        "./static/**/*.js",
        "./**/*.html",
    ],
    theme: {
        extend: {
            colors: {
                // Background colors
                'bg-light': '#ddcfb5',

                // Heading colors
                'heading': '#08b74f',      // H1 headings - green
                'subheading': '#fec84b',   // H2/H3 subheadings - amber

                // Alt color
                'alt': '#fec84b',

                // Semantic aliases for easier use
                'primary': '#08b74f',
                'secondary': '#fec84b',
                'dark': '#65350f',
                'light': '#ddcfb5',

                // Retro CRT colors
                'crt-green': '#33ff00',
                'crt-amber': '#ffb000',
            },
            fontFamily: {
                'pixel': ['"Press Start 2P"', 'cursive'],
                'retro': ['"VT323"', 'monospace'],
                'Inter': ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'inset-white': 'inset 0 2px 0px -0.5px rgba(255, 255, 255, 0.1)',
                'pixel': '4px 4px 0px 0px currentColor',
                'pixel-sm': '2px 2px 0px 0px currentColor',
            },
        },
    },
    plugins: [],
}