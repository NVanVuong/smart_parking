/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                'blue-main': '#2ab7df',
                'blue-main-hover': '#2ab8dfe6',
            },
        },
    },
    plugins: [],
};
