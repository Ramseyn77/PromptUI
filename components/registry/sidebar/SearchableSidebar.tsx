/**
 * @registry
 * name: Searchable Sidebar
 * category: Sidebar
 * style: Minimal
 * tags: recent
 * description: Navigation laterale avec filtre instantane qui surligne les correspondances et masque le reste.
 * prompt: Create a long sidebar navigation with a search input at the top (⌘/ hint) that filters items across groups instantly, highlights the matched substring with <mark>, hides empty groups and shows "No results" otherwise. Light and dark mode.
 */
'use client';
import { Search } from 'lucide-react';
import { useState } from 'react';

const groups = [
  { title: 'Components', items: ['Accordion', 'Alert', 'Avatar', 'Badge', 'Button', 'Calendar'] },
  { title: 'Hooks', items: ['useDebounce', 'useMediaQuery', 'useToggle'] },
  { title: 'Guides', items: ['Accessibility', 'Dark mode', 'Animations'] },
];

function Highlight({ text, query }: { text: string; query: string }) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (!query || index < 0) return <>{text}</>;
  return <>{text.slice(0, index)}<mark className="rounded bg-amber-200 px-0.5 text-zinc-900 dark:bg-amber-400/40 dark:text-white">{text.slice(index, index + query.length)}</mark>{text.slice(index + query.length)}</>;
}

export function SearchableSidebar() {
  const [query, setQuery] = useState('');
  const filtered = groups.map((group) => ({ ...group, items: group.items.filter((item) => item.toLowerCase().includes(query.toLowerCase())) })).filter((group) => group.items.length);

  return (
    <aside className="w-60 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
      <label className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-2.5 focus-within:border-teal-500 dark:border-zinc-800">
        <Search aria-hidden className="size-4 text-zinc-400" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter…" aria-label="Filter navigation" className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none dark:text-white" />
        <kbd className="rounded border border-zinc-200 px-1 font-mono text-[10px] text-zinc-400 dark:border-zinc-700">/</kbd>
      </label>
      <nav aria-label="Documentation" className="mt-3 max-h-72 space-y-4 overflow-y-auto">
        {filtered.map((group) => (
          <div key={group.title}>
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{group.title}</p>
            <ul className="mt-1">{group.items.map((item) => <li key={item}><a href="#" className="block rounded-md px-2 py-1 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"><Highlight text={item} query={query} /></a></li>)}</ul>
          </div>
        ))}
        {!filtered.length && <p className="px-2 py-6 text-center text-sm text-zinc-500">No results for “{query}”</p>}
      </nav>
    </aside>
  );
}
