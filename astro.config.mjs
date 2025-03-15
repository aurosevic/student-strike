// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    site: 'https://blokade.org',
    integrations: [sitemap(), icon(), mdx()],
    redirects: {
        '/sub': '/sr-lat/linkovi/studenti_u_blokadi',
    },
    i18n: {
        locales: ["sr", "sr-lat", "en"],
        defaultLocale: "sr",
        fallback: {
            en: "sr-lat"
        },
        routing: {
            prefixDefaultLocale: false,
            fallbackType: "rewrite"
        }
    }
});