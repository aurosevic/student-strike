// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: 'https://blokade.org',
    integrations: [sitemap(), icon()],
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
    },
    env: {
        schema: {
            VAPID_PUBLIC_KEY: envField.string({ context: "client", access: "public" }),
        }
    },
    vite: {
        server: {
            proxy: {
                "/register": "http://localhost:8888/.netlify/functions/register",
            }
        }
    }
});
