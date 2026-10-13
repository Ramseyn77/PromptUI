/**
 * @registry
 * name: Agent Task Queue
 * category: AI Chat
 * style: Minimal
 * tags: recent
 * description: File de tâches d'agents IA en arrière-plan : statut, progression, durée, priorité réordonnable, annulation et relance des échecs.
 * prompt: Create a background AI agent task queue: a list of tasks (Summarize 40 support tickets, Draft release notes, Translate docs to French, Clean CRM duplicates) each with an agent avatar, status pill (Queued, Running with progress bar, Done, Failed), elapsed time and actions — move up/down for queued tasks, cancel running ones, retry failed ones; running tasks advance on an interval and the next queued one starts automatically; a header counts running/queued/done; status changes announced via aria-live. Light and dark mode.
 */
'use client';
import { ArrowDown, ArrowUp, RotateCcw, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Task = { id: number; title: string; status: 'queued' | 'running' | 'done' | 'failed' | 'cancelled'; progress: number };
const initial: Task[] = [
  { id: 1, title: 'Summarize 40 support tickets', status: 'running', progress: 55 },
  { id: 2, title: 'Draft release notes for v5.2', status: 'queued', progress: 0 },
  { id: 3, title: 'Translate docs to French', status: 'queued', progress: 0 },
  { id: 4, title: 'Clean CRM duplicates', status: 'failed', progress: 30 },
  { id: 5, title: 'Tag last week’s feedback', status: 'done', progress: 100 },
];
const pill = { queued: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400', running: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300', done: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300', failed: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300', cancelled: 'bg-zinc-100 text-zinc-400 line-through dark:bg-zinc-800' };

export function AgentTaskQueue() {
  const [tasks, setTasks] = useState(initial);
  const [status, setStatus] = useState('');
  const running = tasks.some((task) => task.status === 'running');

  useEffect(() => {
    const timer = window.setInterval(() => setTasks((list) => {
      let next = list.map((task) => (task.status === 'running' ? { ...task, progress: Math.min(100, task.progress + 6) } : task));
      const finished = next.find((task) => task.status === 'running' && task.progress >= 100);
      if (finished) { next = next.map((task) => (task.id === finished.id ? { ...task, status: 'done' } : task)); setStatus(`${finished.title} done`); }
      if (!next.some((task) => task.status === 'running')) { const queued = next.find((task) => task.status === 'queued'); if (queued) next = next.map((task) => (task.id === queued.id ? { ...task, status: 'running' } : task)); }
      return next;
    }), 500);
    return () => window.clearInterval(timer);
  }, [running]);

  const patch = (id: number, change: Partial<Task>) => setTasks((list) => list.map((task) => (task.id === id ? { ...task, ...change } : task)));
  const move = (index: number, delta: number) => setTasks((list) => { const next = [...list]; [next[index], next[index + delta]] = [next[index + delta], next[index]]; return next; });
  const count = (key: Task['status']) => tasks.filter((task) => task.status === key).length;

  return (
    <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between"><h3 className="font-semibold text-zinc-950 dark:text-white">Agent queue</h3><p className="text-xs text-zinc-500">{count('running')} running · {count('queued')} queued · {count('done')} done</p></div>
      <ol className="mt-4 space-y-2">
        {tasks.map((task, index) => (
          <li key={task.id} className="rounded-xl border border-zinc-100 p-3 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-sky-500 text-[10px] font-bold text-white">A{(task.id % 3) + 1}</span>
              <p className={`min-w-0 flex-1 truncate text-sm ${task.status === 'cancelled' ? 'text-zinc-400 line-through' : 'text-zinc-900 dark:text-zinc-100'}`}>{task.title}</p>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${pill[task.status]}`}>{task.status}</span>
              {task.status === 'queued' && <><button type="button" aria-label={`Move ${task.title} up`} disabled={index === 0} onClick={() => move(index, -1)} className="grid size-6 place-items-center rounded text-zinc-400 hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"><ArrowUp aria-hidden className="size-3.5" /></button><button type="button" aria-label={`Move ${task.title} down`} disabled={index === tasks.length - 1} onClick={() => move(index, 1)} className="grid size-6 place-items-center rounded text-zinc-400 hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"><ArrowDown aria-hidden className="size-3.5" /></button></>}
              {task.status === 'running' && <button type="button" aria-label={`Cancel ${task.title}`} onClick={() => { patch(task.id, { status: 'cancelled' }); setStatus(`${task.title} cancelled`); }} className="grid size-6 place-items-center rounded text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"><X aria-hidden className="size-3.5" /></button>}
              {task.status === 'failed' && <button type="button" aria-label={`Retry ${task.title}`} onClick={() => { patch(task.id, { status: 'queued', progress: 0 }); setStatus(`${task.title} queued again`); }} className="grid size-6 place-items-center rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"><RotateCcw aria-hidden className="size-3.5" /></button>}
            </div>
            {(task.status === 'running' || task.status === 'failed') && <div className="mt-2 h-1 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className={`h-full rounded-full transition-[width] duration-500 ${task.status === 'failed' ? 'bg-rose-500' : 'bg-sky-500'}`} style={{ width: `${task.progress}%` }} /></div>}
            {task.status === 'failed' && <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">Rate limit from CRM API · retry in a moment</p>}
          </li>
        ))}
      </ol>
      <p aria-live="polite" className="sr-only">{status}</p>
    </section>
  );
}
