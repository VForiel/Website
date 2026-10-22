// Images de partage (Open Graph, 1200 × 630, JPEG) générées à la fin du build, pour chaque page.
// Chaque page déclare son image dans <meta property="og:image"> (voir BaseLayout) ; on relit ensuite
// le HTML produit pour en tirer le titre, la description et, pour un projet, sa désignation et son image.
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

const COLORS = {
    background: "#0b0d14",
    text: "#ece7dc",
    secondary: "#ada9a1",
    muted: "#7b8090",
    border: "#2c3040",
    gold: "#e2c482",
};

// Raies de Fraunhofer (nm), comme dans le footer du site
const FRAUNHOFER = [393.4, 396.8, 410.2, 430.8, 434.0, 486.1, 517.7, 527.0, 589.3, 656.3, 686.7];

const font = (pkg, file) => readFileSync(new URL(`../node_modules/${pkg}/files/${file}`, import.meta.url));

function fonts() {
    return [
        { name: "Newsreader", data: font("@fontsource/newsreader", "newsreader-latin-400-normal.woff"), weight: 400, style: "normal" },
        { name: "Newsreader", data: font("@fontsource/newsreader", "newsreader-latin-400-italic.woff"), weight: 400, style: "italic" },
        { name: "Plex Sans", data: font("@fontsource/ibm-plex-sans", "ibm-plex-sans-latin-400-normal.woff"), weight: 400, style: "normal" },
        { name: "Plex Mono", data: font("@fontsource/ibm-plex-mono", "ibm-plex-mono-latin-400-normal.woff"), weight: 400, style: "normal" },
    ];
}

// Petit constructeur d'arbre pour satori (pas de JSX ici)
const h = (type, style, ...children) => ({
    type,
    props: { style: { display: "flex", ...style }, children: children.flat().filter((c) => c !== null && c !== false) },
});

const decode = (text) =>
    text
        .replace(/&amp;/g, "&")
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)));

const attr = (html, pattern) => {
    const match = html.match(pattern);
    return match ? decode(match[1].trim()) : null;
};

// Générateur pseudo-aléatoire déterministe : le ciel d'une page reste le même d'un build à l'autre
function random(seed) {
    let state = [...seed].reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 2166136261);
    return () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let t = state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function stars(seed) {
    const rand = random(seed);
    return Array.from({ length: 70 }, () => {
        const size = rand() < 0.85 ? 2 : 3;
        return h("div", {
            position: "absolute",
            left: Math.round(rand() * WIDTH),
            top: Math.round(rand() * (HEIGHT - 40)),
            width: size,
            height: size,
            borderRadius: size,
            backgroundColor: rand() < 0.2 ? COLORS.gold : "#c8d2ec",
            opacity: 0.25 + rand() * 0.55,
        });
    });
}

// Repères de cadrage aux quatre coins d'un cadre carré de côté `size`, à 12 px à l'extérieur
function cropMarks(size, color) {
    const gap = 12;
    const length = 18;
    const near = -gap;
    const far = size + gap - 1;
    const farStart = size + gap - length;
    const line = (top, left, horizontal) =>
        h("div", { position: "absolute", top, left, width: horizontal ? length : 1, height: horizontal ? 1 : length, backgroundColor: color });
    return [
        line(near, near, true), line(near, near, false),
        line(near, farStart, true), line(near, far, false),
        line(far, near, true), line(farStart, near, false),
        line(far, farStart, true), line(farStart, far, false),
    ];
}

// Libellé de section affiché au-dessus du titre, d'après l'adresse de l'image (« fr/about » → « À propos »)
const SECTIONS = {
    "": { fr: "Instrumentation · Haut contraste · Simulation optique", en: "Instrumentation · High contrast · Optical simulation" },
    about: { fr: "À propos", en: "About" },
    expertise: { fr: "Expertise", en: "Expertise" },
    portfolio: { fr: "Catalogue des projets", en: "Project catalogue" },
    associations: { fr: "Associations", en: "Associations" },
    cv: { fr: "Curriculum vitae", en: "Curriculum vitae" },
    contact: { fr: "Contact", en: "Contact" },
    publications: { fr: "Publications", en: "Publications" },
    nulling: { fr: "Laboratoire interactif", en: "Interactive lab" },
    "404": { fr: "Erreur 404 · Objet introuvable", en: "Error 404 · Object not found" },
};

function sectionOf(target) {
    const parts = target.replace(/\.jpg$/, "").split("/").slice(1); // og/fr/about.jpg → [fr, about]
    const lang = parts[0] === "en" ? "en" : "fr";
    const key = parts[0] === "404" ? "404" : parts[1] ?? "";
    return SECTIONS[key]?.[lang] ?? null;
}

function spectrum() {
    const stops = [
        "rgb(70,0,80) 0%", "rgb(106,0,255) 10.8%", "rgb(0,70,255) 18.9%", "rgb(0,213,255) 27%",
        "rgb(0,255,146) 32.4%", "rgb(94,255,0) 40.5%", "rgb(225,255,0) 51.4%", "rgb(255,223,0) 56.8%",
        "rgb(255,119,0) 64.9%", "rgb(255,0,0) 73%", "rgb(190,0,0) 83.8%", "rgb(60,0,0) 100%",
    ];
    return h(
        "div",
        { position: "absolute", left: 0, bottom: 0, width: WIDTH, height: 10, opacity: 0.75, backgroundImage: `linear-gradient(90deg, ${stops.join(", ")})` },
        FRAUNHOFER.map((nm) =>
            h("div", { position: "absolute", top: 0, left: Math.round(((nm - 380) / 370) * WIDTH), width: 2, height: 10, backgroundColor: COLORS.background }),
        ),
    );
}

function ruler() {
    const ticks = [];
    for (let x = 0; x <= 1040; x += 10) {
        const major = x % 80 === 0;
        ticks.push(h("div", { position: "absolute", left: x, bottom: 0, width: 1, height: major ? 10 : 5, backgroundColor: major ? COLORS.muted : COLORS.border }));
    }
    return h(
        "div",
        { position: "absolute", left: 80, bottom: 46, width: 1040, height: 10 },
        h("div", { position: "absolute", left: 0, bottom: 0, width: 1040, height: 1, backgroundColor: COLORS.border }),
        h("div", { position: "absolute", left: 0, bottom: 0, width: 56, height: 1, backgroundColor: COLORS.gold }),
        ticks,
    );
}

function card({ eyebrow, title, description, image, seed }) {
    const titleSize = title.length > 60 ? 50 : title.length > 36 ? 60 : 76;
    const plate = 300;
    return h(
        "div",
        { position: "relative", width: WIDTH, height: HEIGHT, backgroundColor: COLORS.background, fontFamily: "Plex Sans", color: COLORS.text },
        stars(seed),
        // Bandeau du haut
        h(
            "div",
            { position: "absolute", top: 36, left: 80, width: 1040, justifyContent: "space-between", fontFamily: "Plex Mono", fontSize: 18, letterSpacing: 2, color: COLORS.muted },
            h("div", {}, "VINCENT FORIEL"),
            h("div", {}, "NICE · 43°43′ N · 7°18′ E"),
        ),
        // Texte
        h(
            "div",
            { position: "absolute", top: 120, left: 80, width: image ? 620 : 1040, flexDirection: "column" },
            h("div", { fontFamily: "Plex Mono", fontSize: 20, letterSpacing: 2, color: COLORS.gold, marginBottom: 22 }, eyebrow.toUpperCase()),
            h("div", { fontFamily: "Newsreader", fontSize: titleSize, lineHeight: 1.08, marginBottom: 24 }, title),
            description ? h("div", { fontSize: 26, lineHeight: 1.45, color: COLORS.secondary }, description) : null,
        ),
        // Planche : image du projet ou portrait
        image
            ? h(
                  "div",
                  { position: "absolute", top: 150, left: 820, width: plate, height: plate },
                  {
                      type: "img",
                      props: { src: image, width: plate, height: plate, style: { objectFit: "cover", border: `1px solid ${COLORS.border}` } },
                  },
                  cropMarks(plate, COLORS.muted),
              )
            : null,
        ruler(),
        h("div", { position: "absolute", left: 80, bottom: 70, fontFamily: "Plex Mono", fontSize: 18, letterSpacing: 1, color: COLORS.muted }, "vincent.foriel.pro"),
        spectrum(),
    );
}

async function imageDataUrl(file) {
    const png = await sharp(file).resize(600, 600, { fit: "cover" }).png().toBuffer();
    return `data:image/png;base64,${png.toString("base64")}`;
}

function htmlFiles(dir) {
    return readdirSync(dir, { recursive: true })
        .map(String)
        .filter((file) => file.endsWith(".html"))
        .map((file) => join(dir, file));
}

export default function ogImages() {
    return {
        name: "og-images",
        hooks: {
            "astro:build:done": async ({ dir, logger }) => {
                const out = fileURLToPath(dir);
                const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
                const fontData = fonts();
                let count = 0;
                const done = new Set();

                for (const file of htmlFiles(out)) {
                    const html = readFileSync(file, "utf-8");
                    // La page en persan partage l'image de l'accueil (pas de police persane ici)
                    if (/<html lang="fa"/.test(html)) continue;
                    const ogUrl = attr(html, /<meta property="og:image" content="([^"]+)"/);
                    if (!ogUrl || !ogUrl.includes("/og/")) continue;
                    const target = new URL(ogUrl).pathname.replace(/^\//, "");
                    if (done.has(target)) continue;
                    done.add(target);

                    const rawTitle = attr(html, /<title>([^<]*)<\/title>/) ?? "Vincent Foriel";
                    // « Vincent Foriel - Doctorant… » (accueil) ou « Portfolio - Vincent Foriel »
                    const title = rawTitle.replace(/^Vincent Foriel\s*[-–]\s*/, "").replace(/\s*[-–]\s*Vincent Foriel$/, "");
                    const description = attr(html, /<meta name="description" content="([^"]*)"/);
                    const designation = attr(html, /class="eyebrow project-eyebrow"[^>]*>([^<]*)</);
                    const section = sectionOf(target);
                    const thumbnailTag = html.match(/<img[^>]*class="thumbnail-image"[^>]*>/);
                    const thumbnail = thumbnailTag ? attr(thumbnailTag[0], /src="([^"]+)"/) : null;

                    let image = null;
                    try {
                        image = await imageDataUrl(thumbnail ? join(out, thumbnail) : join(publicDir, "profile-picture.jpg"));
                    } catch {
                        image = null;
                    }

                    const svg = await satori(
                        card({
                            eyebrow: designation ?? section ?? "vincent.foriel.pro",
                            title,
                            description: description && description.length > 150 ? `${description.slice(0, 147).trimEnd()}…` : description,
                            image,
                            seed: target,
                        }),
                        { width: WIDTH, height: HEIGHT, fonts: fontData },
                    );
                    const jpeg = await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
                    const destination = join(out, target);
                    mkdirSync(dirname(destination), { recursive: true });
                    writeFileSync(destination, jpeg);
                    count++;
                }
                logger.info(`${count} images de partage générées`);
            },
        },
    };
}
