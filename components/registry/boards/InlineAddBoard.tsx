/**
 * @registry
 * name: Inline Add Board
 * category: Boards
 * style: Minimal
 * tags: recent
 * description: Colonnes de taches avec ajout de carte en ligne : bouton, champ auto-focus, Entree pour valider.
 * prompt: Create board columns where "+ Add card" turns into an inline textarea with Add/Cancel buttons (autofocus, Enter submits, Escape cancels, Shift+Enter newline); new cards appear at the bottom with a quick fade. Horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { Plus } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

type Column = { name: string; cards: string[] };

export function InlineAddBoard() {
  const [columns, setColumns] = useState<Column[]>([
    { name: 'Ideas', cards: ['Referral program', 'Changelog widget'] },
    { name: 'This week', cards: ['Polish onboarding'] },
  ]);
  const [adding, setAdding] = useState<number | null>(null);
  const [draft, setDraft] = useState('');

  function submit(index: number) {
    if (draft.trim()) setColumns((current) => current.map((column, i) => (i === index ? { ...column, cards: [...column.cards, draft.trim()] } : column)));
    setDraft('');
    setAdding(null);
  }
  function onKey(event: KeyboardEvent<HTMLTextAreaElement>, index: number) {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit(index); }
    if (event.key === 'Escape') { setDraft(''); setAdding(null); }
  }

  return (
    <>
      <style>{`@keyframes pui-card-in{from{opacity:0;transform:translateY(-4px)}}`}</style>
      <div className="flex w-full max-w-2xl gap-3 overflow-x-auto pb-2">
        {columns.map((column, index) => (
          <section key={column.name} aria-label={column.name} className="w-64 shrink-0 rounded-2xl bg-zinc-100 p-3 sm:flex-1 dark:bg-zinc-900">
            <h3 className="px-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">{column.name}</h3>
            <ul className="mt-3 space-y-2">{column.cards.map((card) => <li key={card} className="rounded-xl bg-white p-3 text-sm text-zinc-800 shadow-sm motion-safe:animate-[pui-card-in_.2s_ease-out] dark:bg-zinc-950 dark:text-zinc-200">{card}</li>)}</ul>
            {adding === index ? (
              <div className="mt-2">
                <textarea autoFocus aria-label={`New card in ${column.name}`} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => onKey(event, index)} rows={2} placeholder="Card title…" className="w-full resize-none rounded-xl border border-teal-500 bg-white p-2.5 text-sm text-zinc-900 outline-none ring-4 ring-teal-500/15 dark:bg-zinc-950 dark:text-white" />
                <div className="mt-1.5 flex gap-2">
                  <button type="button" onClick={() => submit(index)} className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white">Add</button>
                  <button type="button" onClick={() => { setDraft(''); setAdding(null); }} className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800">Cancel</button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => { setAdding(index); setDraft(''); }} className="mt-2 flex w-full items-center gap-1.5 rounded-xl px-2 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"><Plus aria-hidden className="size-4" /> Add card</button>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
