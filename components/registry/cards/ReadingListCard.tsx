/**
 * @registry
 * name: Reading List Card
 * category: Cards
 * style: Editorial
 * tags: recent
 * description: Liste de lecture éditoriale : articles enregistrés avec temps de lecture, filtre Non lus, marquer comme lu et retrait avec annulation.
 * prompt: Create an editorial reading list card: serif title "Reading list" with a count, tabs All / Unread as a segmented control, rows with a tiny colored cover, source, serif headline, reading time and a progress bar for partially read items; each row has a "mark as read" toggle (aria-pressed) and a remove button; removing shows an inline "Removed — Undo" bar for 4s; empty state for the Unread tab. Light (paper) and dark mode.
 */
'use client';
import { BookmarkX, CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

const initial = [
  { id: 1, title: 'The quiet power of default settings', source: 'Margin', minutes: 8, progress: 40, read: false, tone: 'bg-amber-300' },
  { id: 2, title: 'Why your design system needs a changelog', source: 'Craft', minutes: 6, progress: 0, read: false, tone: 'bg-sky-300' },
  { id: 3, title: 'Notes on calm technology', source: 'Field', minutes: 12, progress: 100, read: true, tone: 'bg-emerald-300' },
  { id: 4, title: 'A short history of the progress bar', source: 'Margin', minutes: 5, progress: 0, read: false, tone: 'bg-rose-300' },
];

export function ReadingListCard() {
  const [items, setItems] = useState(initial);
  const [tab, setTab] = useState<'All' | 'Unread'>('All');
  const [removed, setRemoved] = useState<{ item: (typeof initial)[number]; index: number } | null>(null);
  const visible = items.filter((item) => tab === 'All' || !item.read);

  useEffect(() => {
    if (!removed) return;
    const timer = window.setTimeout(() => setRemoved(null), 4000);
    return () => window.clearTimeout(timer);
  }, [removed]);

  return (
    <section className="w-full max-w-md rounded-3xl bg-[#fbf9f4] p-6 ring-1 ring-zinc-900/10 dark:bg-zinc-950 dark:ring-white/10">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl text-zinc-950 dark:text-white">Reading list <span className="font-sans text-sm text-zinc-400">{items.length}</span></h3>
        <div role="group" aria-label="Filter" className="flex rounded-full bg-zinc-900/5 p-0.5 text-xs dark:bg-white/10">{(['All', 'Unread'] as const).map((name) => <button key={name} type="button" aria-pressed={tab === name} onClick={() => setTab(name)} className={`rounded-full px-3 py-1 font-medium ${tab === name ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white' : 'text-zinc-500'}`}>{name}</button>)}</div>
      </div>
      <ul className="mt-4 divide-y divide-zinc-900/10 dark:divide-white/10">
        {visible.map((item) => (
          <li key={item.id} className="flex gap-3 py-3">
            <span aria-hidden className={`mt-1 h-12 w-9 shrink-0 rounded ${item.tone}`} />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-wider text-zinc-500">{item.source} · {item.minutes} min</p>
              <a href="#" className={`font-serif text-base leading-snug hover:underline ${item.read ? 'text-zinc-400' : 'text-zinc-950 dark:text-zinc-100'}`}>{item.title}</a>
              {item.progress > 0 && item.progress < 100 && <div className="mt-1.5 h-1 w-24 rounded-full bg-zinc-900/10 dark:bg-white/10"><div className="h-full rounded-full bg-amber-500" style={{ width: `${item.progress}%` }} /></div>}
            </div>
            <div className="flex shrink-0 items-start gap-0.5">
              <button type="button" aria-pressed={item.read} aria-label={`Mark “${item.title}” as read`} onClick={() => setItems((list) => list.map((entry) => (entry.id === item.id ? { ...entry, read: !entry.read } : entry)))} className={`grid size-8 place-items-center rounded-full hover:bg-zinc-900/5 dark:hover:bg-white/10 ${item.read ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'}`}><CircleCheck aria-hidden className="size-4" /></button>
              <button type="button" aria-label={`Remove “${item.title}”`} onClick={() => { setRemoved({ item, index: items.indexOf(item) }); setItems((list) => list.filter((entry) => entry.id !== item.id)); }} className="grid size-8 place-items-center rounded-full text-zinc-400 hover:bg-zinc-900/5 hover:text-rose-600 dark:hover:bg-white/10"><BookmarkX aria-hidden className="size-4" /></button>
            </div>
          </li>
        ))}
        {!visible.length && <li className="py-10 text-center font-serif text-zinc-500">All caught up. Nothing unread.</li>}
      </ul>
      <div aria-live="polite">{removed && <div className="mt-3 flex items-center justify-between rounded-xl bg-zinc-950 px-4 py-2.5 text-sm text-white dark:bg-white dark:text-zinc-950"><span>Removed from list</span><button type="button" onClick={() => { setItems((list) => { const next = [...list]; next.splice(removed.index, 0, removed.item); return next; }); setRemoved(null); }} className="font-semibold underline">Undo</button></div>}</div>
    </section>
  );
}
