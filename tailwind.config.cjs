const config = {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            fontFamily: {
                inter: '"Inter var experimental", sans-serif'
            }
        }
    },

    plugins: [require('flowbite/plugin')],
    darkMode: 'class'
};

module.exports = config;
