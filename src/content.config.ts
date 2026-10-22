// Import utilities from `astro:content`
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Define a schema for each collection
// Partial date: accepts "YYYY", "YYYY-MM", "YYYY-MM-DD", or a YAML-auto-parsed Date/Number
const partialDate = z.preprocess((val) => {
    if (val instanceof Date) return val.toISOString().slice(0, 10);
    if (typeof val === "number") return val.toString();
    return val;
}, z.string());

const projectsCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
        locale: z.enum(['fr', 'en']).default('fr'),
        title: z.string(),
        description: z.string(),
        "start-date": partialDate.optional(),
        "end-date": partialDate.optional(),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        url: z.string().url().optional(),
        featured: z.boolean().default(false),
    }),
});

const servicesCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
    schema: z.object({
        locale: z.enum(['fr', 'en']).default('fr'),
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        order: z.number().default(999),
        available: z.boolean().default(true),
        reason: z.string().optional(),
    }),
});

const associationsCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/associations' }),
    schema: z.object({
        locale: z.enum(['fr', 'en']).default('fr'),
        title: z.string(),
        role: z.string(),
        description: z.string(),
        missions: z.array(z.string()).default([]),
        quote: z.string().optional(),
        logo: z.string(),
        url: z.string().url(),
        socialLinks: z.array(z.object({
            name: z.string(),
            url: z.string().url(),
            type: z.enum(['discord', 'instagram', 'facebook', 'twitter', 'website']).optional(),
        })).default([]),
        order: z.number().default(999),
    }),
});

// Publications : une entrée par fichier YAML, commune aux deux langues.
// Les présentations n'ont pas forcément de titre ; le BibTeX, s'il est fourni, peut être copié depuis la page.
const publicationsCollection = defineCollection({
    loader: glob({ pattern: '**/*.yaml', base: './src/content/publications' }),
    schema: z.object({
        type: z.enum(['article', 'proceedings', 'talk', 'poster', 'thesis']),
        title: z.string().optional(),
        authors: z.array(z.string()).default([]),
        venue: z.string(),
        location: z.string().optional(),
        date: partialDate,
        status: z.enum(['published', 'accepted', 'submitted', 'in-prep', 'upcoming']).optional(),
        doi: z.string().optional(),
        arxiv: z.string().optional(),
        ads: z.string().url().optional(),
        url: z.string().url().optional(),
        bibtex: z.string().optional(),
    }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
    'projects': projectsCollection,
    'services': servicesCollection,
    'associations': associationsCollection,
    'publications': publicationsCollection,
};
