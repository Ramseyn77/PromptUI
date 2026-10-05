'use client';

import { usePathname } from 'next/navigation';
import { localizePath, locales, splitLocale, type Locale } from './config';
import { localeNames } from './dictionaries';
import { useLocale } from './LocaleProvider';

/** EN / FR segmented switch: keeps the current page, query and hash, only the language changes. */
export function LanguageSwitcher() {
  const { locale, t } = useLocale();
  const pathname = usePathname();

  const go = (target: Locale) => {
    if (target === locale) return;
    const { path } = splitLocale(pathname);
    // Full load: each language has its own root layout (html lang, theme script), which a client-side
    // transition would re-render without running the theme script. The query is read at click time
    // because useSearchParams would force a Suspense boundary on static pages.
    window.location.assign(`${localizePath(target, path)}${window.location.search}${window.location.hash}`);
  };

  return (
    <div role="group" aria-label={t.nav.language} className="flex items-center rounded-full border border-[var(--line)] bg-[var(--surface)] p-0.5 font-ui shadow-sm">
      {locales.map((value) => (
        <button
          key={value}
          type="button"
          lang={value}
          aria-pressed={locale === value}
          aria-label={t.nav.switchTo(localeNames[value])}
          onClick={() => go(value)}
          className={`rounded-full px-2.5 py-1.5 text-[11px] font-bold uppercase leading-none transition ${locale === value ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'}`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

