/**
 * @registry
 * name: Sprint Burndown Board
 * category: Boards
 * style: SaaS
 * tags: featured, recent
 * description: Board de sprint avec graphique de burndown : terminer une tâche fait descendre la courbe réelle face à l'idéale.
 * prompt: Create a sprint board with a live burndown: a compact 3-column board (To do / Doing / Done) of task chips with story points; each chip has a "move →" button; moving tasks to Done updates an SVG burndown chart above (ideal dashed line vs actual line ending at today's remaining points) and the "18 of 34 pts left" summary (aria-live). Light and dark mode.
 */
'use client';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const columns = ['To do', 'Doing', 'Done'] as const;
const totalDays = 10;
const today = 6;
const history = [34, 33, 30, 28, 27, 24];

export function SprintBurndownBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Checkout redesign', points: 8, col: 1 }, { id: 2, title: 'Saved cards', points: 5, col: 0 },
    { id: 3, title: 'Order emails', points: 3, col: 2 }, { id: 4, title: 'Apple Pay', points: 5, col: 0 },
    { id: 5, title: 'Refund flow', points: 3, col: 1 },
  ]);
  const total = 34;
  const remaining = history[history.length - 1] - tasks.filter((task) => task.col === 2).reduce((sum, task) => sum + task.points, 0) + 3;
  const x = (day: number) => 10 + (day / totalDays) * 280;
  const y = (points: number) => 10 + ((total - points) / total) * 100;
  const actual = [...history.slice(0, -1), remaining].map((points, day) => `${x(day)},${y(points)}`).join(' ');

  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-baseline justify-between"><h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Sprint 14</h3><p aria-live="polite" className="text-xs text-zinc-500"><strong className="text-zinc-900 dark:text-zinc-100">{remaining}</strong> of {total} pts left · day {today}/{totalDays}</p></div>
      <svg viewBox="0 0 300 120" aria-hidden className="mt-2 w-full">
        <line x1={x(0)} y1={y(total)} x2={x(totalDays)} y2={y(0)} strokeDasharray="4 4" className="stroke-zinc-300 dark:stroke-zinc-700" />
        <polyline points={actual} fill="none" strokeWidth="2.5" strokeLinejoin="round" className="stroke-teal-500 transition-all" />
        <circle cx={x(today - 1)} cy={y(remaining)} r="4" className="fill-teal-500" />
      </svg>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {columns.map((column, index) => (
          <div key={column} className="rounded-xl bg-zinc-50 p-2 dark:bg-zinc-900">
            <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{column}</p>
            <ul className="mt-1.5 space-y-1.5">
              {tasks.filter((task) => task.col === index).map((task) => (
                <li key={task.id} className="rounded-lg bg-white p-2 text-xs shadow-sm dark:bg-zinc-950">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{task.title}</p>
                  <div className="mt-1 flex items-center justify-between"><span className="rounded bg-zinc-100 px-1 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{task.points} pts</span>{index < 2 && <button type="button" aria-label={`Move ${task.title} to ${columns[index + 1]}`} onClick={() => setTasks((list) => list.map((item) => (item.id === task.id ? { ...item, col: item.col + 1 } : item)))} className="grid size-5 place-items-center rounded text-zinc-400 hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-teal-400/10"><ArrowRight aria-hidden className="size-3.5" /></button>}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
