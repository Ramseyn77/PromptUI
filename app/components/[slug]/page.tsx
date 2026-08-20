import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2, MonitorSmartphone, Sparkles } from 'lucide-react';
import { components, getComponentBySlug } from '@/data/components';
import { ComponentPreview } from '@/components/library/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { CopyButton } from '@/components/ui/CopyButton';

export function generateStaticParams() { return components.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getComponentBySlug(slug);
  if (!item) return {};
  return { title: item.name, description: item.description };
}

export default async function ComponentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getComponentBySlug(slug);
  if (!item) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link href="/library" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"><ArrowLeft size={15}/>Retour a la bibliotheque</Link>
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">{item.category}</span>
            <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--muted)]">{item.style}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{item.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">{item.description}</p>
        </div>
        <Link href={`/playground/${item.slug}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] shadow-sm transition hover:-translate-y-0.5">Tester le composant <ArrowUpRight size={16}/></Link>
      </div>

      <section className="preview-grid mt-8 flex min-h-[430px] items-center overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[#f1eee5] p-5 md:p-10 dark:bg-black/20">
        <ComponentPreview slug={item.slug}/>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4"><p className="text-xs text-[var(--muted)]">Categorie</p><p className="mt-1 font-medium">{item.category}</p></div>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4"><p className="text-xs text-[var(--muted)]">Technologies</p><p className="mt-1 font-medium">{item.technologies.join(' / ')}</p></div>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4"><p className="text-xs text-[var(--muted)]">Responsive</p><p className="mt-1 inline-flex items-center gap-2 font-medium"><CheckCircle2 size={16} className="text-[var(--accent)]"/>Mobile + desktop</p></div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,.75fr)]">
        <section>
          <div className="mb-4">
            <p className="text-sm font-semibold text-[var(--accent)]">Source</p>
            <h2 className="mt-1 text-2xl font-semibold">Copier le code du composant</h2>
          </div>
          <CodeBlock code={item.code}/>
        </section>
        <aside>
          <div className="mb-4">
            <p className="text-sm font-semibold text-[var(--accent)]">Prompt IA</p>
            <h2 className="mt-1 text-2xl font-semibold">Recreer ou modifier</h2>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold"><Sparkles size={16} className="text-[var(--accent)]"/>Prompt pour ton outil IA</div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[var(--muted)]">{item.prompt}</p>
            <div className="mt-5"><CopyButton value={item.prompt} label="Copier le prompt"/></div>
          </div>
          <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold"><MonitorSmartphone size={16}/>Note d implementation</div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">La demo utilise seulement React et du style local. Pas de backend, compte ou dependance payante.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
