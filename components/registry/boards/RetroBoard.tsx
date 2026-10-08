/**
 * @registry
 * name: Retro Board
 * category: Boards
 * style: Gradient
 * tags: featured, recent
 * description: Tableau de rétrospective avec notes colorées par colonne, votes et ajout de note.
 * prompt: Create a sprint retrospective board: three colored columns (Went well green, To improve amber, Actions violet) of sticky-note cards with a vote button (+count) each, notes sorted by votes, and an inline "Add a note" form per column. Stacks on mobile. Light and dark mode.
 */
'use client';
import { ThumbsUp } from 'lucide-react';
import { useState, type FormEvent } from 'react';

type Note = { id: number; column: number; text: string; votes: number };
const columns = [
  { name: 'Went well', tone: 'bg-emerald-100 dark:bg-emerald-950/60', dot: 'bg-emerald-500' },
  { name: 'To improve', tone: 'bg-amber-100 dark:bg-amber-950/60', dot: 'bg-amber-500' },
  { name: 'Actions', tone: 'bg-violet-100 dark:bg-violet-950/60', dot: 'bg-violet-500' },
];

export function RetroBoard() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, column: 0, text: 'Shipped dark mode on time', votes: 4 },
    { id: 2, column: 1, text: 'Too many meetings on Monday', votes: 6 },
    { id: 3, column: 2, text: 'Async standup on Slack', votes: 3 },
  ]);

  function add(event: FormEvent<HTMLFormElement>, column: number) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem('note') as HTMLInputElement;
    if (!input.value.trim()) return;
    setNotes((current) => [...current, { id: Date.now(), column, text: input.value.trim(), votes: 0 }]);
    input.value = '';
  }

  return (
    <div className="grid w-full max-w-4xl gap-3 md:grid-cols-3">
      {columns.map((column, index) => (
        <section key={column.name} className="rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="flex items-center gap-2 px-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200"><span className={`size-2 rounded-full ${column.dot}`} />{column.name}</h3>
          <ul className="mt-3 space-y-2">
            {notes.filter((note) => note.column === index).sort((a, b) => b.votes - a.votes).map((note) => (
              <li key={note.id} className={`flex items-start gap-2 rounded-xl p-3 text-sm text-zinc-800 dark:text-zinc-100 ${column.tone}`}>
                <span className="flex-1">{note.text}</span>
                <button type="button" aria-label={`Vote for "${note.text}"`} onClick={() => setNotes((current) => current.map((item) => (item.id === note.id ? { ...item, votes: item.votes + 1 } : item)))} className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-white/70 px-1.5 py-0.5 text-xs font-semibold text-zinc-700 hover:bg-white dark:bg-black/30 dark:text-zinc-200"><ThumbsUp aria-hidden className="size-3" />{note.votes}</button>
              </li>
            ))}
          </ul>
          <form onSubmit={(event) => add(event, index)} className="mt-2">
            <label className="sr-only" htmlFor={`retro-${index}`}>Add a note to {column.name}</label>
            <input id={`retro-${index}`} name="note" placeholder="+ Add a note" className="h-9 w-full rounded-lg border border-dashed border-zinc-300 bg-transparent px-3 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:text-white" />
          </form>
        </section>
      ))}
    </div>
  );
}
