'use client';
import { useState } from 'react';

const initialTasks = [
  { id: 'brief', label: 'Write the product brief', done: true },
  { id: 'wireframes', label: 'Review wireframes', done: false },
  { id: 'launch', label: 'Schedule the launch', done: false },
];

export function AnimatedChecklist() {
  const [tasks, setTasks] = useState(initialTasks);
  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <div className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-zinc-900 dark:text-white">Launch week</p>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{doneCount}/{tasks.length} done</span>
      </div>
      <ul className="mt-4 space-y-1">
        {tasks.map((task) => (
          <li key={task.id}>
            <label className="group flex cursor-pointer items-center gap-3 rounded-2xl px-2 py-2.5 transition hover:bg-zinc-100 dark:hover:bg-zinc-900">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => setTasks((current) => current.map((item) => (item.id === task.id ? { ...item, done: !item.done } : item)))}
                className="peer sr-only"
              />
              <span className="grid size-6 shrink-0 place-items-center rounded-lg border-2 border-zinc-300 transition peer-checked:border-teal-500 peer-checked:bg-teal-500 peer-focus-visible:ring-4 peer-focus-visible:ring-teal-500/25 dark:border-zinc-600 [&>svg>path]:[stroke-dasharray:16] [&>svg>path]:[stroke-dashoffset:16] peer-checked:[&>svg>path]:[stroke-dashoffset:0]">
                {/* The check is drawn by animating the stroke offset. */}
                <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                  <path d="M3 8.5l3.2 3L13 5" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-[stroke-dashoffset] duration-300 ease-out" />
                </svg>
              </span>
              <span className="relative text-sm text-zinc-800 transition-colors peer-checked:text-zinc-400 dark:text-zinc-200 dark:peer-checked:text-zinc-500">
                {task.label}
                <span aria-hidden className={`absolute left-0 top-1/2 h-px bg-current transition-all duration-300 ${task.done ? 'w-full' : 'w-0'}`} />
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
