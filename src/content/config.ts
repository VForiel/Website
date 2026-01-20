// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a schema for each collection
const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        locale: z.enum(['fr', 'en']).default('fr'),
        title: z.string(),
        description: z.string(),
        start_date: z.date().optional(),
        end_date: z.date().optional(),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        url: z.string().url().optional(),
        featured: z.boolean().default(false),
    }),
});

const servicesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        locale: z.enum(['fr', 'en']).default('fr'),
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        order: z.number().default(999),
    }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
    'projects': projectsCollection,
    'services': servicesCollection,
};
