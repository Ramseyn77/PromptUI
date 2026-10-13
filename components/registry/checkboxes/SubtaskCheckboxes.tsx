/**
 * @registry
 * name: Subtask Checkboxes
 * category: Checkboxes
 * style: Gradient
 * tags: recent
 * description: Tâche parente avec sous-tâches à cocher : parent indéterminé, anneau de progression, ajout rapide d'une sous-tâche et confettis à la fin.
 * prompt: Create a task with subtasks: a parent checkbox (indeterminate via ref when partially done) that checks or unchecks all subtasks, a progress ring with "3/5", the list of subtasks with checkboxes and strikethrough when done, an inline "Add subtask" input (Enter to add), and a tiny CSS confetti burst (deterministic positions) when the last subtask is completed; changes announced via aria-live; confetti hidden with reduced motion. Light and dark mode.
 */
'use client';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';

const confetti = Array.from({ length: 14 }, (_, index) => ({ x: ((index * 47) % 120) - 60, y: -30 - ((index * 29) % 50), color: ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][index % 4], rotate: (index * 53) % 360 }));

export function SubtaskCheckboxes() {
  const [tasks, setTasks] = useState([{ id: 1, text: 'Write release notes', done: true }, { id: 2, text: 'Record demo video', done: true }, { id: 3, text: 'Update pricing page', done: true }, { id: 4, text: 'Email beta users', done: false }, { id: 5, text: 'Post on community', done: false }]);
  const [draft, setDraft] = useState('');
  const [burst, setBurst] = useState(0);
  const parentRef = useRef<HTMLInputElement>(null);
  const done = tasks.filter((task) => task.done).length;
  const all = tasks.length > 0 && done === tasks.length;
  const circumference = 2 * 3.1416 * 14;

  useEffect(() => { if (parentRef.current) parentRef.current.indeterminate = done > 0 && !all; }, [done, all]);

  function toggle(id: number) {
    const next = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
    setTasks(next);
    if (next.every((task) => task.done)) setBurst((value) => value + 1);
  }
  function add(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: draft.trim(), done: false }]);
    setDraft('');
  }

  return (
    <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-amber-400/15 p-px">
      <style>{`@keyframes pui-confetti { from { transform: translate(0, 0) rotate(0); opacity: 1 } to { transform: translate(var(--x), var(--y)) rotate(var(--r)); opacity: 0 } } @media (prefers-reduced-motion: reduce) { .pui-confetti { display: none } }`}</style>
      <section className="rounded-3xl bg-white p-5 dark:bg-zinc-950">
        <div className="flex items-center gap-3">
          <input ref={parentRef} type="checkbox" aria-label="Complete all subtasks" checked={all} onChange={(event) => { setTasks(tasks.map((task) => ({ ...task, done: event.target.checked }))); if (event.target.checked) setBurst((value) => value + 1); }} className="size-5 accent-violet-600" />
          <h3 className={`flex-1 font-semibold ${all ? 'text-zinc-400 line-through' : 'text-zinc-950 dark:text-white'}`}>Launch week checklist</h3>
          <div className="relative size-9">
            <svg viewBox="0 0 36 36" className="size-9 -rotate-90" aria-hidden><circle cx="18" cy="18" r="14" fill="none" strokeWidth="4" className="stroke-zinc-100 dark:stroke-zinc-800" /><circle cx="18" cy="18" r="14" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference.toFixed(1)} strokeDashoffset={(circumference * (1 - done / Math.max(1, tasks.length))).toFixed(1)} className="stroke-violet-600 transition-[stroke-dashoffset] duration-500 dark:stroke-violet-400" /></svg>
            <span aria-live="polite" className="absolute inset-0 grid place-items-center text-[9px] font-bold tabular-nums text-zinc-700 dark:text-zinc-300">{done}/{tasks.length}</span>
            {burst > 0 && all && <span key={burst} aria-hidden className="pui-confetti pointer-events-none absolute left-1/2 top-1/2">{confetti.map((piece, index) => <span key={index} className="absolute size-1.5 rounded-sm" style={{ background: piece.color, animation: 'pui-confetti .9s ease-out forwards', ['--x' as string]: `${piece.x}px`, ['--y' as string]: `${piece.y}px`, ['--r' as string]: `${piece.rotate}deg` }} />)}</span>}
          </div>
        </div>
        <ul className="ml-2 mt-3 space-y-1 border-l-2 border-zinc-100 pl-4 dark:border-zinc-800">
          {tasks.map((task) => <li key={task.id}><label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"><input type="checkbox" checked={task.done} onChange={() => toggle(task.id)} className="size-4 accent-violet-600" /><span className={task.done ? 'text-zinc-400 line-through' : 'text-zinc-800 dark:text-zinc-200'}>{task.text}</span></label></li>)}
        </ul>
        <form onSubmit={add} className="ml-6 mt-2 flex items-center gap-2"><Plus aria-hidden className="size-4 text-zinc-400" /><input aria-label="Add subtask" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Add subtask" className="min-w-0 flex-1 bg-transparent py-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100" /></form>
      </section>
    </div>
  );
}
