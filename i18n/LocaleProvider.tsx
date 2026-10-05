'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { defaultLocale, localizePath, type Locale } from './config';
import { dictionaries, intlLocale } from './dictionaries';

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Current locale, its dictionary and a helper that prefixes internal paths. */
export function useLocale() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    t: dictionaries[locale],
    href: (path: string) => localizePath(locale, path),
    intl: intlLocale[locale],
  };
}
