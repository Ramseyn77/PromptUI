import type { MetadataRoute } from 'next';
import { components } from '@/data/components';
import { locales, localizePath } from '@/i18n/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prompt-ui-steel.vercel.app';

/** One entry per language, each listing every translation of the page. */
function localized(path: string, entry: Omit<MetadataRoute.Sitemap[number], 'url'>): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}${localizePath(locale, path)}`]));
  return locales.map((locale) => ({ ...entry, url: languages[locale], alternates: { languages } }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localized('/', { changeFrequency: 'weekly', priority: 1 }),
    ...localized('/library', { changeFrequency: 'weekly', priority: 0.9 }),
    ...components.flatMap((item) => localized(`/components/${item.slug}`, {
      changeFrequency: 'monthly',
      priority: item.featured ? 0.8 : 0.6,
    })),
  ];
}
