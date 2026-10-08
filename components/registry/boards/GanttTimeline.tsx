/**
 * @registry
 * name: Gantt Timeline
 * category: Boards
 * style: SaaS
 * tags: featured, recent
 * description: Diagramme de Gantt sur 8 semaines avec barres de tâches colorées, avancement et ligne du jour.
 * prompt: Create a compact Gantt chart: left column of task names, an 8-week header, task bars positioned by start/length with a lighter progress fill, and a vertical "Today" marker line; horizontal scroll on small screens. Bars have title tooltips. Light and dark mode.
 */
const weeks = 8;
const tasks = [
  { name: 'Research', start: 0, length: 2, progress: 100, color: 'bg-teal-500' },
  { name: 'Wireframes', start: 1, length: 2, progress: 80, color: 'bg-sky-500' },
  { name: 'Visual design', start: 2, length: 3, progress: 40, color: 'bg-violet-500' },
  { name: 'Build', start: 4, length: 3, progress: 10, color: 'bg-amber-500' },
  { name: 'Launch', start: 7, length: 1, progress: 0, color: 'bg-rose-500' },
];
const today = 3.4;

export function GanttTimeline() {
  return (
    <div className="w-full max-w-3xl overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="min-w-[560px]">
        <div className="grid grid-cols-[8rem_1fr] border-b border-zinc-200 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <span className="px-4 py-2 font-medium">Task</span>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>{Array.from({ length: weeks }, (_, week) => <span key={week} className="border-l border-zinc-100 py-2 text-center dark:border-zinc-900">W{week + 1}</span>)}</div>
        </div>
        <div className="relative">
          {tasks.map((task) => (
            <div key={task.name} className="grid grid-cols-[8rem_1fr] items-center border-b border-zinc-100 last:border-0 dark:border-zinc-900">
              <span className="truncate px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200">{task.name}</span>
              <div className="relative h-full py-2.5">
                <div title={`${task.name}: ${task.progress}% done`} className={`absolute top-1/2 h-6 -translate-y-1/2 overflow-hidden rounded-lg ${task.color} opacity-30`} style={{ left: `${(task.start / weeks) * 100}%`, width: `${(task.length / weeks) * 100}%` }} />
                <div aria-hidden className={`absolute top-1/2 h-6 -translate-y-1/2 rounded-lg ${task.color}`} style={{ left: `${(task.start / weeks) * 100}%`, width: `${((task.length * task.progress) / 100 / weeks) * 100}%` }} />
              </div>
            </div>
          ))}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-rose-500" style={{ left: `calc(8rem + (100% - 8rem) * ${today / weeks})` }}>
            <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 rounded bg-rose-500 px-1 text-[9px] font-bold text-white">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
