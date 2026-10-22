import { buildSearchIndex } from "../../utils/searchIndex";

// Index de recherche statique, chargé à la première ouverture de la recherche
export async function GET() {
    return new Response(JSON.stringify(await buildSearchIndex("en")), {
        headers: { "Content-Type": "application/json" },
    });
}
