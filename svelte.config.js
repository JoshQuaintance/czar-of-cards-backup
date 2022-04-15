import sveltePreprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        sveltePreprocess({
            postcss: true
        })
    ],

    kit: {
        vite: {
            resolve: {
                alias: {
                    $lib: resolve('src/lib'),
                    $data: resolve('src/data'),
                    $utils: resolve('src/utils'),
                    $components: resolve('src/components')
                }
            }
        }
    }
};

export default config;
