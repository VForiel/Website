// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://vincent.foriel.pro',
    base: '/',
    build: {
        assets: '_assets'
    },
    markdown: {
        shikiConfig: {
            theme: 'nord',
        },
    },
});
