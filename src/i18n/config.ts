export type Locale = 'fr' | 'en';

export const SUPPORTED_LOCALES: Locale[] = ['fr', 'en'];
export const DEFAULT_LOCALE: Locale = 'fr';

export function detectLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith('/en') ? 'en' : 'fr';
}

export function withLocalePrefix(href: string, locale: Locale): string {
  if (locale === 'en') {
    if (href === '/') return '/en';
    return href.startsWith('/en') ? href : `/en${href}`;
  }
  // fr: default root without prefix
  return href.replace(/^\/en/, '') || href;
}

export function toggleLocaleHref(currentPath: string, currentLocale: Locale): string {
  if (currentLocale === 'fr') {
    return currentPath === '/' ? '/en' : `/en${currentPath}`;
  }
  const withoutEn = currentPath.replace(/^\/en/, '');
  return withoutEn.length === 0 ? '/' : withoutEn;
}
