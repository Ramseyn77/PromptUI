/**
 * @registry
 * name: Feature Voting Board
 * category: Boards
 * style: SaaS
 * tags: featured, recent
 * description: Tableau de suggestions avec votes : colonnes Idées / Planifié / En cours / Livré, tri par votes et vote unique.
 * prompt: Create a public feature voting board: four status columns (Ideas, Planned, In progress, Shipped) of request cards each with an upvote button (aria-pressed, one vote per user, count animates), title, tag and comment count; Ideas column sorts by votes live; a "Suggest a feature" input adds to Ideas. Columns scroll horizontally on mobile. Light and dark mode.
 */
'use client';
import { ChevronUp, MessageSquare } from 'lucide-react';
import { useState, type FormEvent } from 'react';

const columns = [['ideas', 'Ideas'], ['planned', 'Planned'], ['progress', 'In progress'], ['shipped', 'Shipped']] as const;

export function FeatureVotingBoard() {
  const [items, setItems] = useState([
    { id: 1, title: 'Dark mode for emails', tag: 'Design', status: 'ideas', votes: 42, comments: 8 },
    { id: 2, title: 'Zapier integration', tag: 'Integrations', status: 'ideas', votes: 57, comments: 14 },
    { id: 3, title: 'Bulk edit products', tag: 'Catalog', status: 'planned', votes: 88, comments: 21 },
    { id: 4, title: 'Two-factor login', tag: 'Security', status: 'progress', votes: 120, comments: 33 },
    { id: 5, title: 'CSV import', tag: 'Data', status: 'shipped', votes: 96, comments: 12 },
  ]);
  const [voted, setVoted] = useState<number[]>([3]);
  const [draft, setDraft] = useState('');

  const vote = (id: number) => {
    const has = voted.includes(id);
    setVoted((list) => (has ? list.filter((item) => item !== id) : [...list, id]));
    setItems((list) => list.map((item) => (item.id === id ? { ...item, votes: item.votes + (has ? -1 : 1) } : item)));
  };
  const add = (event: FormEvent) => { event.preventDefault(); if (draft.trim()) { setItems((list) => [...list, { id: Date.now(), title: draft.trim(), tag: 'New', status: 'ideas', votes: 1, comments: 0 }]); setDraft(''); } };

  return (
    <div className="w-full max-w-4xl">
      <form onSubmit={add} className="mb-3 flex max-w-md gap-2"><input aria-label="Suggest a feature" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Suggest a feature…" className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" /><button type="submit" className="rounded-lg bg-teal-600 px-3 text-sm font-semibold text-white">Submit</button></form>
      <div className="flex snap-x gap-3 overflow-x-auto pb-2" data-lenis-prevent>
        {columns.map(([key, label]) => {
          const list = items.filter((item) => item.status === key).sort((a, b) => b.votes - a.votes);
          return (
            <section key={key} aria-label={label} className="w-60 shrink-0 snap-start rounded-2xl bg-zinc-100 p-2.5 dark:bg-zinc-900">
              <h3 className="px-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">{label} · {list.length}</h3>
              <ul className="mt-2 space-y-2">
                {list.map((item) => (
                  <li key={item.id} className="flex gap-3 rounded-xl bg-white p-3 shadow-sm dark:bg-zinc-950">
                    <button type="button" aria-pressed={voted.includes(item.id)} aria-label={`Upvote ${item.title}, ${item.votes} votes`} onClick={() => vote(item.id)} className={`flex h-12 w-10 shrink-0 flex-col items-center justify-center rounded-lg border text-xs font-bold tabular-nums transition ${voted.includes(item.id) ? 'border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300'}`}><ChevronUp aria-hidden className="size-4" />{item.votes}</button>
                    <div className="min-w-0"><p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.title}</p><p className="mt-1 flex items-center gap-2 text-[11px] text-zinc-500"><span className="rounded bg-zinc-100 px-1.5 dark:bg-zinc-800">{item.tag}</span><span className="flex items-center gap-0.5"><MessageSquare aria-hidden className="size-3" />{item.comments}</span></p></div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
