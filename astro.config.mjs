// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://vincent.foriel.xyz',
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
