// English is served on the unprefixed URLs (/library), French under /fr (/fr/library).
export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Path of `path` (a default-locale path such as "/library?q=x") in `locale`. */
export function localizePath(locale: Locale, path: string) {
  if (locale === defaultLocale) return path;
  if (path === '/' || path === '') return `/${locale}`;
  return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Inverse of localizePath: the locale a pathname belongs to and the path without its prefix. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split('/');
  if (first && isLocale(first) && first !== defaultLocale) return { locale: first, path: `/${rest.join('/')}` };
  return { locale: defaultLocale, path: pathname || '/' };
}

/** hreflang alternates for a default-locale path, for page metadata. */
export function languageAlternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(locales.map((locale) => [locale, localizePath(locale, path)])),
      'x-default': path,
    },
  };
}
