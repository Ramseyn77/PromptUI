/**
 * @registry
 * name: Time Block Planner
 * category: Boards
 * style: Gradient
 * tags: recent
 * description: Planning de journée par blocs : tâches à placer dans les créneaux horaires, durée visible et heure actuelle.
 * prompt: Create a time-blocking day planner: left, an unscheduled task list (draggable chips with duration); right, an hourly grid 08:00–16:00 where tasks are dropped into hour slots (HTML5 DnD) and render as colored blocks spanning their duration, plus a "Schedule" select per task for keyboard users; a current-time line across the grid; blocks can be removed back to the list. Stacks on mobile. Light and dark mode.
 */
'use client';
import { X } from 'lucide-react';
import { useState, type DragEvent } from 'react';

const hours = [8, 9, 10, 11, 12, 13, 14, 15];
const tones = ['from-teal-400 to-emerald-500', 'from-sky-400 to-indigo-500', 'from-fuchsia-400 to-violet-500', 'from-amber-300 to-orange-500'];

export function TimeBlockPlanner() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Deep work: spec', hours: 2, at: 9 as number | null },
    { id: 2, name: 'Team standup', hours: 1, at: 11 as number | null },
    { id: 3, name: 'Design review', hours: 1, at: null as number | null },
    { id: 4, name: 'Email & admin', hours: 1, at: null as number | null },
  ]);
  const place = (id: number, at: number | null) => setTasks((list) => list.map((task) => (task.id === id ? { ...task, at } : task)));
  const drop = (event: DragEvent, hour: number) => { event.preventDefault(); place(Number(event.dataTransfer.getData('text/plain')), hour); };

  return (
    <div className="grid w-full max-w-2xl gap-4 md:grid-cols-[12rem_1fr]">
      <section aria-label="Unscheduled" className="rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">To schedule</h3>
        <ul className="mt-2 space-y-2">
          {tasks.filter((task) => task.at === null).map((task) => (
            <li key={task.id} draggable onDragStart={(event) => event.dataTransfer.setData('text/plain', String(task.id))} className="cursor-grab rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-zinc-900 dark:text-zinc-100">{task.name}</p>
              <select aria-label={`Schedule ${task.name}`} value="" onChange={(event) => place(task.id, Number(event.target.value))} className="mt-1 w-full rounded border border-zinc-200 bg-transparent text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"><option value="" disabled>{task.hours}h · pick a time</option>{hours.map((hour) => <option key={hour} value={hour}>{hour}:00</option>)}</select>
            </li>
          ))}
          {tasks.every((task) => task.at !== null) && <li className="text-xs text-zinc-400">Everything is scheduled ✨</li>}
        </ul>
      </section>
      <section aria-label="Today" className="relative min-w-[17rem] rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
        {hours.map((hour) => (
          <div key={hour} onDragOver={(event) => event.preventDefault()} onDrop={(event) => drop(event, hour)} className="relative flex h-11 border-t border-zinc-100 first:border-0 dark:border-zinc-900">
            <span className="w-12 shrink-0 pt-1 text-[11px] tabular-nums text-zinc-400">{hour}:00</span>
          </div>
        ))}
        <div aria-hidden className="absolute left-14 right-3 h-px bg-rose-500" style={{ top: `calc(0.75rem + ${(10.5 - 8) * 2.75}rem)` }}><span className="absolute -left-1 -top-1 size-2 rounded-full bg-rose-500" /></div>
        {tasks.filter((task) => task.at !== null).map((task, index) => (
          <div key={task.id} className={`absolute left-16 right-4 flex items-start justify-between rounded-lg bg-gradient-to-r p-2 text-xs font-semibold text-white shadow ${tones[index % tones.length]}`} style={{ top: `calc(0.75rem + ${((task.at as number) - 8) * 2.75}rem + 2px)`, height: `calc(${task.hours * 2.75}rem - 4px)` }}>
            <span>{task.name}<span className="block font-normal opacity-85">{task.at}:00 – {(task.at as number) + task.hours}:00</span></span>
            <button type="button" aria-label={`Unschedule ${task.name}`} onClick={() => place(task.id, null)} className="grid size-5 place-items-center rounded bg-black/15 hover:bg-black/25"><X aria-hidden className="size-3" /></button>
          </div>
        ))}
      </section>
    </div>
  );
}
