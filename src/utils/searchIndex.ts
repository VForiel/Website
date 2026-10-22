import { getCollection } from "astro:content";
import { strings } from "../i18n/strings";
import { withLocalePrefix, type Locale } from "../i18n/config";
import { sortProjects, designation } from "./catalogue";
import { buildDateLabel } from "./dates";

export interface SearchEntry {
    kind: "page" | "project";
    title: string;
    href: string;
    /** Désignation (VF·xx) pour un projet, ou chemin pour une page */
    ref: string;
    /** Texte secondaire affiché sous le titre */
    detail: string;
    /** Texte complémentaire utilisé pour la recherche uniquement */
    keywords: string;
}

/** Index de recherche d'une langue : pages du site puis catalogue des projets. */
export async function buildSearchIndex(lang: Locale): Promise<SearchEntry[]> {
    const nav = strings[lang].nav;
    const pages: Array<[string, string]> = [
        ["/", nav.home],
        ["/about", nav.about],
        ["/expertise", nav.expertise],
        ["/portfolio", nav.portfolio],
        ["/associations", nav.associations],
        ["/cv", nav.cv],
        ["/contact", nav.contact],
    ];

    const projects = sortProjects(
        await getCollection("projects", ({ data }) => data.locale === lang),
    );

    return [
        ...pages.map(([path, title]) => ({
            kind: "page" as const,
            title,
            href: withLocalePrefix(path, lang),
            ref: path === "/" ? "/" : path,
            detail: "",
            keywords: "",
        })),
        ...projects.map((project, index) => ({
            kind: "project" as const,
            title: project.data.title,
            href: withLocalePrefix(`/projects/${project.id.replace(new RegExp(`${lang}$`), "")}`, lang),
            ref: designation(index, projects.length),
            detail: buildDateLabel(project.data["start-date"], project.data["end-date"], lang),
            keywords: [project.data.description, ...project.data.tags].join(" "),
        })),
    ];
}
