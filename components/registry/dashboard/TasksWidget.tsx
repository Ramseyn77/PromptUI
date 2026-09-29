/**
 * @registry
 * name: Tasks Widget
 * category: Dashboard
 * style: SaaS
 * tags: recent
 * description: Widget de taches du jour avec priorite, echeance, cases a cocher et ajout rapide.
 * prompt: Create a "Today" tasks widget: checkbox tasks with priority tags (High rose, Medium amber, Low zinc) and due times, completed tasks struck through and sorted last, a progress summary, and a quick-add input that appends a task on Enter. Light and dark mode.
 */
'use client';
import { useState, type FormEvent } from 'react';

type Task = { id: number; title: string; priority: 'High' | 'Medium' | 'Low'; time: string; done: boolean };
const tones = { High: 'bg-rose-500/10 text-rose-700 dark:text-rose-400', Medium: 'bg-amber-500/10 text-amber-700 dark:text-amber-400', Low: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' };

export function TasksWidget() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Review pricing copy', priority: 'High', time: '10:00', done: false },
    { id: 2, title: 'Sync with design', priority: 'Medium', time: '14:30', done: false },
    { id: 3, title: 'Reply to investors', priority: 'Low', time: '17:00', done: true },
  ]);
  const [draft, setDraft] = useState('');
  const sorted = [...tasks].sort((a, b) => Number(a.done) - Number(b.done));

  function add(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    setTasks((current) => [...current, { id: Date.now(), title: draft.trim(), priority: 'Medium', time: 'Today', done: false }]);
    setDraft('');
  }

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-baseline justify-between"><h3 className="font-semibold text-zinc-900 dark:text-white">Today</h3><span className="text-xs text-zinc-500 dark:text-zinc-400">{tasks.filter((task) => task.done).length}/{tasks.length} done</span></div>
      <ul className="mt-3 divide-y divide-zinc-100 dark:divide-zinc-900">
        {sorted.map((task) => (
          <li key={task.id}>
            <label className="flex cursor-pointer items-center gap-3 py-2.5">
              <input type="checkbox" checked={task.done} onChange={() => setTasks((current) => current.map((item) => (item.id === task.id ? { ...item, done: !item.done } : item)))} className="size-4 accent-teal-600" />
              <span className={`flex-1 text-sm ${task.done ? 'text-zinc-400 line-through' : 'text-zinc-800 dark:text-zinc-200'}`}>{task.title}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tones[task.priority]}`}>{task.priority}</span>
              <span className="w-12 text-right text-xs tabular-nums text-zinc-400">{task.time}</span>
            </label>
          </li>
        ))}
      </ul>
      <form onSubmit={add} className="mt-2">
        <label htmlFor="quick-task" className="sr-only">New task</label>
        <input id="quick-task" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="+ Add a task and press Enter" className="h-10 w-full rounded-xl border border-dashed border-zinc-300 bg-transparent px-3 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:text-white" />
      </form>
    </section>
  );
}
