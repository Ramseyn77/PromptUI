import type { Metadata } from 'next';
import { LibraryExplorer } from '@/components/library/LibraryExplorer';
import { isLocale, languageAlternates, localizePath } from '@/i18n/config';
import { dictionaries } from '@/i18n/dictionaries';

type LibraryProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string; category?: string }>;
};

export async function generateMetadata({ params }: Pick<LibraryProps, 'params'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = dictionaries[lang].meta;
  return {
    title: t.libraryTitle,
    description: t.libraryDescription,
    alternates: { canonical: localizePath(lang, '/library'), ...languageAlternates('/library') },
  };
}

export default async function LibraryPage({ searchParams }: LibraryProps) {
  const query = await searchParams;

  return (
    <main>
      <LibraryExplorer initialQuery={query.q ?? ''} initialCategory={query.category ?? 'All'}/>
    </main>
  );
}
