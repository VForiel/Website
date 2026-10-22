// Secrets découverts par le visiteur, mémorisés dans son navigateur uniquement.
// Chaque easter egg émet `secret-found` avec son identifiant ; le footer affiche le compte.

const KEY = "secrets-found";
export const TOTAL_SECRETS = 5;

export function foundSecrets(): string[] {
    try {
        const value = JSON.parse(localStorage.getItem(KEY) ?? "[]");
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function record(id: string) {
    const found = foundSecrets();
    if (found.includes(id)) return;
    found.push(id);
    try {
        localStorage.setItem(KEY, JSON.stringify(found));
    } catch {
        // Stockage indisponible (navigation privée) : le compte ne sera simplement pas conservé
    }
    document.dispatchEvent(new CustomEvent("secrets-updated", { detail: found.length }));
}

document.addEventListener("secret-found", (event) => {
    const id = (event as CustomEvent<string>).detail;
    if (id) record(id);
});

// Le cinquième secret est une page : y arriver suffit
if (document.documentElement.lang === "fa") record("persian");
