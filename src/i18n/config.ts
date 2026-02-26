export type Locale = 'fr' | 'en';

export const SUPPORTED_LOCALES: Locale[] = ['fr', 'en'];
export const DEFAULT_LOCALE: Locale = 'fr';

export function detectLocaleFromPath(pathname: string): Locale {
    if (pathname.startsWith('/fr')) return 'fr';
    if (pathname.startsWith('/en')) return 'en';
    // Default to fr for root path (before redirection)
    return 'fr';
}

export function withLocalePrefix(href: string, locale: Locale): string {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const prefix = `${base}/${locale}`;

    if (href === '/') {
        return prefix;
    }

    // Remove any existing locale prefix first
    const cleanHref = href.replace(/^\/(fr|en)/, '') || '/';

    // Add the new locale prefix
    return cleanHref === '/' ? prefix : `${prefix}${cleanHref}`;
}

export function toggleLocaleHref(currentPath: string, currentLocale: Locale): string {
    const targetLocale = currentLocale === 'fr' ? 'en' : 'fr';
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');

    // Remove current locale prefix and base URL
    let pathWithoutLocale = currentPath;
    if (base) {
        pathWithoutLocale = pathWithoutLocale.replace(new RegExp(`^${base}`), '');
    }
    pathWithoutLocale = pathWithoutLocale.replace(/^\/(fr|en)/, '') || '/';

    // Add target locale prefix
    const newPath = pathWithoutLocale === '/' ? `/${targetLocale}` : `/${targetLocale}${pathWithoutLocale}`;
    return `${base}${newPath}`;
}
