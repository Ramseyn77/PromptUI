/**
 * @registry
 * name: Eisenhower Matrix
 * category: Boards
 * style: Minimal
 * tags: featured, recent
 * description: Matrice urgent / important en quatre quadrants colorés : déplacer une tâche par glisser ou par menu.
 * prompt: Create an Eisenhower matrix board: a 2×2 grid (stacked on mobile) of quadrants — Do (urgent+important, rose), Schedule (important, sky), Delegate (urgent, amber), Delete (neither, zinc) — each with a header, count and task chips; tasks can be dragged between quadrants (HTML5 DnD with drop highlight) or moved with a per-task select for keyboard users; an input adds tasks to "Do". Light and dark mode.
 */
'use client';
import { useState, type DragEvent, type FormEvent } from 'react';

const quadrants = [
  { key: 'do', title: 'Do now', hint: 'Urgent · Important', tone: 'bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/30', chip: 'bg-white dark:bg-zinc-900' },
  { key: 'plan', title: 'Schedule', hint: 'Important', tone: 'bg-sky-50 border-sky-200 dark:bg-sky-500/10 dark:border-sky-500/30', chip: 'bg-white dark:bg-zinc-900' },
  { key: 'delegate', title: 'Delegate', hint: 'Urgent', tone: 'bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/30', chip: 'bg-white dark:bg-zinc-900' },
  { key: 'drop', title: 'Drop', hint: 'Neither', tone: 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800', chip: 'bg-white dark:bg-zinc-950' },
];

export function EisenhowerMatrix() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Fix checkout bug', q: 'do' }, { id: 2, text: 'Plan Q1 roadmap', q: 'plan' }, { id: 3, text: 'Reply to vendor', q: 'delegate' },
    { id: 4, text: 'Reorganize icons', q: 'drop' }, { id: 5, text: 'Write hiring brief', q: 'plan' },
  ]);
  const [over, setOver] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const move = (id: number, q: string) => setTasks((list) => list.map((task) => (task.id === id ? { ...task, q } : task)));
  const drop = (event: DragEvent, q: string) => { event.preventDefault(); move(Number(event.dataTransfer.getData('text/plain')), q); setOver(null); };
  const add = (event: FormEvent) => { event.preventDefault(); if (draft.trim()) { setTasks((list) => [...list, { id: Date.now(), text: draft.trim(), q: 'do' }]); setDraft(''); } };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={add} className="mb-3 flex gap-2"><input aria-label="New task" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Add a task to Do now…" className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" /><button type="submit" className="rounded-lg bg-zinc-950 px-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Add</button></form>
      <div className="grid gap-3 sm:grid-cols-2">
        {quadrants.map((quadrant) => {
          const items = tasks.filter((task) => task.q === quadrant.key);
          return (
            <section key={quadrant.key} aria-label={quadrant.title} onDragOver={(event) => { event.preventDefault(); setOver(quadrant.key); }} onDragLeave={() => setOver(null)} onDrop={(event) => drop(event, quadrant.key)} className={`min-h-36 rounded-2xl border p-3 transition ${quadrant.tone} ${over === quadrant.key ? 'ring-2 ring-zinc-900 dark:ring-white' : ''}`}>
              <header className="flex items-baseline justify-between"><h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{quadrant.title} <span className="font-normal text-zinc-500">{items.length}</span></h3><span className="text-[11px] text-zinc-500">{quadrant.hint}</span></header>
              <ul className="mt-2 space-y-1.5">
                {items.map((task) => (
                  <li key={task.id} draggable onDragStart={(event) => event.dataTransfer.setData('text/plain', String(task.id))} className={`flex cursor-grab items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-zinc-800 shadow-sm dark:text-zinc-200 ${quadrant.chip}`}>
                    <span className="flex-1">{task.text}</span>
                    <select aria-label={`Move ${task.text}`} value={task.q} onChange={(event) => move(task.id, event.target.value)} className="rounded border border-zinc-200 bg-transparent text-[11px] text-zinc-500 dark:border-zinc-700">{quadrants.map((q) => <option key={q.key} value={q.key}>{q.title}</option>)}</select>
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
