import { join } from "node:path";
import sharp from "sharp";

/**
 * Dimensions d'une image de `public/` (« /images/… »), lues au build.
 * Elles permettent de réserver la place de l'image et d'éviter un décalage de mise en page.
 */
export async function publicImageSize(path: string | undefined): Promise<{ width: number; height: number } | undefined> {
    if (!path?.startsWith("/")) return undefined;
    try {
        const { width, height } = await sharp(join(process.cwd(), "public", path)).metadata();
        return width && height ? { width, height } : undefined;
    } catch {
        return undefined;
    }
}
