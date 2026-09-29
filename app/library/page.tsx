import type { Metadata } from 'next';
import { LibraryExplorer } from '@/components/library/LibraryExplorer';

export const metadata: Metadata = { title: 'Bibliotheque de composants', description: 'Parcourir des composants React gratuits avec code source et prompts IA.' };

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const params = await searchParams;

  return (
    <main>
      <LibraryExplorer initialQuery={params.q ?? ''} initialCategory={params.category ?? 'All'}/>
    </main>
  );
}
