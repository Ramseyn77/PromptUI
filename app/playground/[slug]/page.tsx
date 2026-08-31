import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getComponentBySlug } from '@/data/components';
import { InteractivePlayground } from '@/components/library/InteractivePlayground';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { CopyButton } from '@/components/ui/CopyButton';
import { ComponentViewTracker } from '@/components/analytics/ComponentViewTracker';

export default async function PlaygroundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getComponentBySlug(slug);
  if (!item) notFound();

  return (
    <main className="mx-auto w-full min-w-0 max-w-7xl overflow-x-hidden px-4 py-8 sm:px-6">
      <ComponentViewTracker slug={item.slug} name={item.name}/>
      <div className="flex min-w-0 flex-col justify-between gap-4 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <Link href={`/components/${item.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"><ArrowLeft size={15}/>Fiche composant</Link>
          <h1 className="mt-2 truncate text-2xl font-semibold tracking-tight">Tester {item.name}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton value={item.code} label="Copier le code" analyticsType="code_copied" componentSlug={item.slug} componentName={item.name}/>
          <CopyButton value={item.prompt} label="Copier le prompt" analyticsType="prompt_copied" componentSlug={item.slug} componentName={item.name}/>
        </div>
      </div>
      <div className="mt-6 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5">
        <InteractivePlayground slug={item.slug} name={item.name}/>
        <section className="min-w-0"><CodeBlock code={item.code} componentSlug={item.slug} componentName={item.name}/></section>
      </div>
    </main>
  );
}
