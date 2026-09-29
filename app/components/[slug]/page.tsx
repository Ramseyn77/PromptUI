import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Eye, MonitorSmartphone, ShieldCheck } from 'lucide-react';
import { components, getComponentBySlug } from '@/data/components';
import { ComponentViewTracker } from '@/components/analytics/ComponentViewTracker';
import { ShareButton } from '@/components/analytics/ShareButton';
import { ComponentShowcase } from '@/components/library/ComponentShowcase';
import { ComponentCard, ComponentGrid } from '@/components/library/ComponentCard';
import { viewCount } from '@/utils/viewCount';
import type { LibraryComponent } from '@/types/component';

export function generateStaticParams() { return components.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getComponentBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.name} - composant ${item.category}`,
    description: `${item.description} Code React, TypeScript et Tailwind gratuit avec prompt IA et apercu responsive.`,
    alternates: { canonical: `/components/${item.slug}` },
    openGraph: {
      title: `${item.name} - composant ${item.category}`,
      description: item.description,
      type: 'article',
      url: `/components/${item.slug}`,
    },
  };
}

/** Same category first, then same style, never the component itself. */
function similarTo(item: LibraryComponent, count = 4) {
  const others = components.filter((other) => other.slug !== item.slug);
  const sameCategory = others.filter((other) => other.category === item.category);
  const sameStyle = others.filter((other) => other.category !== item.category && other.style === item.style);
  return [...sameCategory, ...sameStyle].slice(0, count);
}

export default async function ComponentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getComponentBySlug(slug);
  if (!item) notFound();
  const similar = similarTo(item);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <ComponentViewTracker slug={item.slug} name={item.name}/>

      {/* Compact header: everything above the fold goes to the component itself. */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/library" aria-label="Retour a la bibliotheque" className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] transition hover:text-[var(--foreground)]">
            <ArrowLeft size={17}/>
          </Link>
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl font-semibold tracking-tight md:text-3xl">{item.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
              <Link href={`/library?category=${encodeURIComponent(item.category)}`} className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 font-pill font-medium text-[var(--accent)] transition hover:opacity-80">{item.category}</Link>
              <span className="rounded-full border border-[var(--line)] px-2.5 py-0.5 font-pill">{item.style}</span>
              <span className="inline-flex items-center gap-1 font-mono"><Eye size={13}/>{viewCount(item.slug)}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <ShareButton slug={item.slug} name={item.name}/>
          <Link href={`/playground/${item.slug}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 font-ui text-sm font-semibold text-[var(--background)] shadow-sm transition hover:-translate-y-0.5">
            Tester le composant <ArrowUpRight size={16}/>
          </Link>
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--muted)]">{item.description}</p>

      <div className="mt-5">
        <ComponentShowcase item={item}/>
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Technologies', item.technologies.join(' / '), null],
          ['Responsive', item.responsiveModes.join(' / '), MonitorSmartphone],
          ['Verifie', item.safetyNotes.slice(0, 2).join(' / '), ShieldCheck],
          ['Dependances', 'Aucune dependance payante', CheckCircle2],
        ].map(([label, value, Icon]) => {
          const IconComponent = Icon as typeof ShieldCheck | null;
          return (
            <div key={label as string} className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface)] px-4 py-3">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">{label as string}</dt>
              <dd className="mt-1 inline-flex items-center gap-2 text-sm font-medium">{IconComponent && <IconComponent size={15} className="text-[var(--accent)]"/>}{value as string}</dd>
            </div>
          );
        })}
      </dl>
      <p className="mt-3 text-xs leading-5 text-[var(--muted)]">Ce n&apos;est pas un audit securite complet : teste toujours le composant dans ton contexte produit.</p>

      {similar.length > 0 && (
        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="font-hand text-lg font-bold text-[var(--accent)]">Dans le meme esprit</p>
              <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Composants similaires</h2>
            </div>
            <Link href={`/library?category=${encodeURIComponent(item.category)}`} className="inline-flex shrink-0 items-center gap-1 font-ui text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)]">
              Tout voir <ArrowRight size={15}/>
            </Link>
          </div>
          <ComponentGrid className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {similar.map((other) => <ComponentCard key={other.slug} item={other}/>)}
          </ComponentGrid>
        </section>
      )}
    </main>
  );
}
