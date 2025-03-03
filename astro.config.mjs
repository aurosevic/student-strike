// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	site: 'https://blokade.org',
	integrations: [sitemap(), icon()],
	redirects: {
		'/sub': '/sr-lat/linkovi/studenti_u_blokadi',
		'/': '/sr-lat'
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
