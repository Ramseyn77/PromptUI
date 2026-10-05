import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getComponentBySlug, localizedDescription } from '@/data/components';
import { isLocale, localizePath } from '@/i18n/config';
import { dictionaries } from '@/i18n/dictionaries';
import { InteractivePlayground } from '@/components/library/InteractivePlayground';
import { CopyButton } from '@/components/ui/CopyButton';
import { ComponentViewTracker } from '@/components/analytics/ComponentViewTracker';
import { getComponentPrompt } from '@/utils/componentPrompt';

type PlaygroundProps = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: PlaygroundProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const item = getComponentBySlug(slug);
  if (!item || !isLocale(lang)) return {};
  const t = dictionaries[lang].meta;
  return {
    title: t.playgroundTitle(item.name),
    description: t.playgroundDescription(item.name),
    alternates: { canonical: localizePath(lang, `/playground/${item.slug}`) },
    robots: { index: false, follow: true },
  };
}

export default async function PlaygroundPage({ params }: PlaygroundProps) {
  const { lang, slug } = await params;
  const item = getComponentBySlug(slug);
  if (!item || !isLocale(lang)) notFound();
  const t = dictionaries[lang].playground;
  // The French prompt template embeds the description: give it the French one.
  const promptItem = (language: 'fr' | 'en') => ({ ...item, description: localizedDescription(item, language) });

  return (
    <main className="mx-auto w-full min-w-0 max-w-7xl overflow-x-hidden px-4 py-5 sm:px-6">
      <ComponentViewTracker slug={item.slug} name={item.name}/>
      <div className="flex min-w-0 flex-col justify-between gap-3 pb-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <Link href={localizePath(lang, `/components/${item.slug}`)} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"><ArrowLeft size={15}/>{t.backToComponent}</Link>
          <h1 className="mt-1 truncate font-display text-2xl font-semibold tracking-tight">{t.title(item.name)}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton value={item.code} label={t.copyCode} analyticsType="code_copied" componentSlug={item.slug} componentName={item.name}/>
          <CopyButton value={getComponentPrompt(promptItem('fr'), 'fr')} label="Prompt FR" analyticsType="prompt_copied" componentSlug={item.slug} componentName={item.name}/>
          <CopyButton value={getComponentPrompt(promptItem('en'), 'en')} label="Prompt EN" analyticsType="prompt_copied" componentSlug={item.slug} componentName={item.name}/>
        </div>
      </div>
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)]">
        <InteractivePlayground slug={item.slug} name={item.name}/>
      </div>
    </main>
  );
}
