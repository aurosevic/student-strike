import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const vesti = defineCollection({
	loader: glob({ base: './src/content/vesti', pattern: '**/*.md' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		live: z.boolean(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image(),
		timeline: z.object({
			naslov: z.string(),
			datum: z.coerce.date(),
			slike: image().array(),
			tekst: z.string().optional()
		}).array().optional()
	}),
});

const akcije = defineCollection({
	loader: glob({ base: './src/content/akcije', pattern: '**/*.md' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		heroImage: image()
	}),
});

const linkovi = defineCollection({
	loader: glob({ base: './src/content/linkovi', pattern: '*.md' }),
	schema: () => z.object({
		link: z.string(),
		linkovi: z.object({
			ikonica: z.enum([
				"bez", "web", "instagram", "twitter", 
				"facebook", "youtube", "viber", "newspaper", "hand-coin"
			]),
			naslov: z.string(),
			link: z.string()
		}).array()
	}),
});

const pocetna = defineCollection({
	loader: glob({ base: './src/content/stranice', pattern: '**/početna.md' }),
	schema: () => z.object({}),
});

const zahtevi = defineCollection({
	loader: glob({ base: './src/content/stranice', pattern: '**/zahtevi.md' }),
	schema: () => z.object({
		naslov: z.string(),
		zahtevi: z.object({
			original: z.string(),
			konkretizacija: z.string()
		}).array()
	}),
});

const oblokadama = defineCollection({
	loader: glob({ base: './src/content/stranice', pattern: '**/o-blokadama.md' }),
	schema: () => z.object({}),
});

const zaglavlje = defineCollection({
	loader: glob({ base: './src/content/stranice', pattern: '**/zaglavlje.md' }),
	schema: () => z.object({
		naslov: z.string(),
		linkovi: z.object({
			naziv: z.string(),
			link: z.string()
		}).array()
	}),
});

const ostalo = defineCollection({
	loader: glob({ base: './src/content/stranice', pattern: '**/ostalo.md' }),
	schema: () => z.object({
		naslov: z.string(),
		akcije: z.string(),
		vesti: z.string(),
		kontakt: z.string(),
		live: z.string(),
		studenti_u_blokadi: z.string(),
		pojedinacni_fakulteti: z.string(),
	}),
});

export const collections = { vesti, akcije, linkovi, pocetna, zahtevi, oblokadama, zaglavlje, ostalo };
