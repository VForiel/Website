// Test file to check what slugs Astro generates
import { getCollection } from 'astro:content';

const allProjects = await getCollection('projects');

console.log('\n=== ALL PROJECT SLUGS ===\n');
allProjects.forEach(project => {
    console.log(`File: ${project.id}`);
    console.log(`Slug: ${project.slug}`);
    console.log(`Locale: ${project.data.locale}`);
    console.log('---');
});
