import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../../consts';
import { collection, langs } from "@scripts/i18n"
import type {APIRoute} from "astro";

export async function getStaticPaths() {
	return langs.map(lang => ({params: {lang}}));
}

export const GET: APIRoute = async ({params, site}) => {
	const posts = await collection('vesti', params.lang);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: site ?? "",
		items: posts.map((post) => ({
			...post.data,
			link: `/${post.lang}/vesti/${post.id}/`,
		})),
	});
}
