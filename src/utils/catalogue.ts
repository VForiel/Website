import { dateToTimestamp } from "./dates";

interface Dated {
    id: string;
    data: { "end-date"?: string | Date };
}

/** Tri du catalogue : projets en cours d'abord, puis du plus récent au plus ancien. */
export function sortProjects<T extends Dated>(projects: T[]): T[] {
    return [...projects].sort(
        (a, b) => dateToTimestamp(b.data["end-date"]) - dateToTimestamp(a.data["end-date"]),
    );
}

/** Désignation de catalogue (« VF·07 ») : le plus ancien projet porte le numéro 01. */
export function designation(index: number, total: number): string {
    return `VF·${String(total - index).padStart(2, "0")}`;
}
