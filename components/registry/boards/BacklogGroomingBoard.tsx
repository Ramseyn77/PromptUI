/**
 * @registry
 * name: Backlog Grooming Board
 * category: Boards
 * style: SaaS
 * tags: recent
 * description: Board d'affinage du backlog : stories à estimer (points Fibonacci), à prioriser (MoSCoW), puis prêtes pour le sprint avec capacité restante.
 * prompt: Create a backlog grooming board with three columns: To estimate, To prioritise, Ready for sprint; each story card has a title, type tag (Feature, Bug, Chore) and actions depending on the column — Fibonacci point buttons (1, 2, 3, 5, 8, 13) to estimate (moves it forward), MoSCoW priority chips (Must, Should, Could, Won't) to prioritise (moves it forward except Won't which archives it); the Ready column shows a sprint capacity bar "21 / 30 pts" that turns amber near the limit and rose when over. Light and dark mode.
 */
'use client';
import { useState } from 'react';

type Story = { id: number; title: string; type: 'Feature' | 'Bug' | 'Chore'; points?: number; priority?: string; col: number };
const initial: Story[] = [
  { id: 1, title: 'Export reports to PDF', type: 'Feature', col: 0 },
  { id: 2, title: 'Fix timezone in invites', type: 'Bug', col: 0 },
  { id: 3, title: 'Bulk archive projects', type: 'Feature', points: 5, col: 1 },
  { id: 4, title: 'Upgrade charts library', type: 'Chore', points: 3, col: 1 },
  { id: 5, title: 'SSO for Google Workspace', type: 'Feature', points: 8, priority: 'Must', col: 2 },
  { id: 6, title: 'Empty state for search', type: 'Feature', points: 2, priority: 'Should', col: 2 },
];
const tone = { Feature: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300', Bug: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300', Chore: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' };
const capacity = 30;

export function BacklogGroomingBoard() {
  const [stories, setStories] = useState(initial);
  const [archived, setArchived] = useState(0);
  const ready = stories.filter((story) => story.col === 2).reduce((sum, story) => sum + (story.points ?? 0), 0);
  const patch = (id: number, change: Partial<Story>) => setStories(stories.map((story) => (story.id === id ? { ...story, ...change } : story)));
  const columns = ['To estimate', 'To prioritise', 'Ready for sprint'];

  return (
    <div className="flex w-full max-w-4xl gap-3 overflow-x-auto rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-900" data-lenis-prevent>
      {columns.map((column, index) => (
        <section key={column} aria-label={column} className="w-64 shrink-0">
          <h3 className="px-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">{column} <span className="font-normal text-zinc-500">{stories.filter((story) => story.col === index).length}</span></h3>
          {index === 2 && <div className="mt-2 px-1"><div className="flex justify-between text-[11px] text-zinc-500"><span>Sprint capacity</span><span aria-live="polite" className="tabular-nums">{ready} / {capacity} pts</span></div><div className="mt-1 h-1.5 rounded-full bg-white dark:bg-zinc-800"><div className={`h-full rounded-full transition-all ${ready > capacity ? 'bg-rose-500' : ready > capacity * 0.85 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, (ready / capacity) * 100)}%` }} /></div></div>}
          {index === 1 && archived > 0 && <p className="mt-1 px-1 text-[11px] text-zinc-500">{archived} archived as Won’t</p>}
          <ul className="mt-2 space-y-2">
            {stories.filter((story) => story.col === index).map((story) => (
              <li key={story.id} className="rounded-xl bg-white p-3 shadow-sm dark:bg-zinc-950">
                <div className="flex items-center gap-2"><span className={`rounded px-1.5 text-[10px] font-semibold ${tone[story.type]}`}>{story.type}</span>{story.points && <span className="ml-auto rounded-full bg-zinc-100 px-1.5 text-[10px] font-bold tabular-nums text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{story.points} pts</span>}{story.priority && <span className="rounded-full bg-amber-100 px-1.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">{story.priority}</span>}</div>
                <p className="mt-1.5 text-sm font-medium text-zinc-950 dark:text-white">{story.title}</p>
                {index === 0 && <div role="group" aria-label={`Estimate ${story.title}`} className="mt-2 flex flex-wrap gap-1">{[1, 2, 3, 5, 8, 13].map((value) => <button key={value} type="button" onClick={() => patch(story.id, { points: value, col: 1 })} className="size-7 rounded-md border border-zinc-200 text-xs font-semibold text-zinc-700 hover:border-indigo-500 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-300">{value}</button>)}</div>}
                {index === 1 && <div role="group" aria-label={`Prioritise ${story.title}`} className="mt-2 flex flex-wrap gap-1">{['Must', 'Should', 'Could', 'Won’t'].map((value) => <button key={value} type="button" onClick={() => { if (value === 'Won’t') { setStories(stories.filter((item) => item.id !== story.id)); setArchived(archived + 1); } else patch(story.id, { priority: value, col: 2 }); }} className="rounded-md border border-zinc-200 px-2 py-0.5 text-[11px] text-zinc-700 hover:border-amber-500 dark:border-zinc-700 dark:text-zinc-300">{value}</button>)}</div>}
                {index === 2 && <button type="button" onClick={() => patch(story.id, { col: 1, priority: undefined })} className="mt-2 text-[11px] text-zinc-500 underline">Send back</button>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
