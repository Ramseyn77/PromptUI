'use client';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { categories, components, styles } from '@/data/components';
import { ComponentCard } from './ComponentCard';

export function LibraryExplorer({ initialQuery = '', initialCategory = 'All' }: { initialQuery?: string; initialCategory?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<(typeof categories)[number]>((categories.includes(initialCategory as any) ? initialCategory : 'All') as (typeof categories)[number]);
  const [style, setStyle] = useState<(typeof styles)[number]>('All');
  const filtered = useMemo(() => components.filter((item) => {
    const text = `${item.name} ${item.description} ${item.category} ${item.style} ${item.technologies.join(' ')}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (category === 'All' || item.category === category) && (style === 'All' || item.style === style);
  }), [query, category, style]);
  const active = query || category !== 'All' || style !== 'All';

  return (
    <div>
      <div className="grid gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-sm lg:grid-cols-[1fr_auto_auto]">
        <label className="flex items-center gap-2 rounded-xl bg-[var(--background)] px-3">
          <Search size={17} className="text-[var(--muted)]"/>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Chercher composants, styles, technologies..." className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"/>
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] px-3">
          <SlidersHorizontal size={15} className="text-[var(--muted)]"/>
          <span className="sr-only">Categorie</span>
          <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="h-11 bg-transparent text-sm outline-none">
            {categories.map((x) => <option key={x} value={x} className="bg-[var(--surface)]">{x === 'All' ? 'Toutes categories' : x}</option>)}
          </select>
        </label>
        <select aria-label="Style" value={style} onChange={(e) => setStyle(e.target.value as any)} className="h-11 rounded-xl border border-[var(--line)] bg-transparent px-3 text-sm outline-none">
          {styles.map((x) => <option key={x} value={x} className="bg-[var(--surface)]">{x === 'All' ? 'Tous styles' : x}</option>)}
        </select>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-[var(--muted)]">{filtered.length} composant{filtered.length !== 1 ? 's' : ''}</p>
        {active && <button onClick={() => {setQuery('');setCategory('All');setStyle('All')}} className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"><X size={13}/>Effacer les filtres</button>}
      </div>
      {filtered.length ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => <ComponentCard key={item.slug} item={item}/>)}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-16 text-center">
          <p className="font-medium">Aucun composant trouve</p>
          <p className="mt-2 text-sm text-[var(--muted)]">Essaie une recherche plus large ou retire un filtre.</p>
        </div>
      )}
    </div>
  );
}
