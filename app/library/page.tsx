import type { Metadata } from 'next';
import { LibraryExplorer } from '@/components/library/LibraryExplorer';

export const metadata: Metadata = { title: 'Bibliotheque de composants', description: 'Parcourir des composants React gratuits avec code source et prompts IA.' };

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const params = await searchParams;
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 border-b border-[var(--line)] pb-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[var(--accent)]">Bibliotheque de composants</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Parcourir, tester et copier.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">Cherche des patterns UI par categorie, style ou technologie. Ouvre une fiche pour tester le responsive, verifier les checks MVP, copier le code ou copier le prompt IA.</p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-[var(--muted)]">Inventaire MVP</p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div><p className="text-2xl font-semibold">24</p><p className="text-xs text-[var(--muted)]">items</p></div>
            <div><p className="text-2xl font-semibold">14</p><p className="text-xs text-[var(--muted)]">types</p></div>
            <div><p className="text-2xl font-semibold">7</p><p className="text-xs text-[var(--muted)]">styles</p></div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="mb-5 grid gap-3 md:grid-cols-3">
          {['Apercu rapide sur chaque carte', 'Test responsive dans chaque fiche', 'Code et prompt copiables en un clic'].map((text) => (
            <div key={text} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--muted)]">{text}</div>
          ))}
        </div>
        <LibraryExplorer initialQuery={params.q ?? ''} initialCategory={params.category ?? 'All'}/>
      </div>
    </main>
  );
}
