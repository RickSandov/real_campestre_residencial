/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                rblue: '#8dbbd0',
                text: '#40474f',
                primary: '#b0c774'
            },
            fontFamily: {
                'body': ['Montserrat', 'sans-serif'],

            },
            boxShadow: {
                'card': '0 0 1rem 0.3rem rgba(176, 199, 116, 0.25)',
            }
        },
    },
    plugins: [],
}