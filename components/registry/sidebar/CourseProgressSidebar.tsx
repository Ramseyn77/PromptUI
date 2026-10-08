/**
 * @registry
 * name: Course Progress Sidebar
 * category: Sidebar
 * style: SaaS
 * tags: recent
 * description: Plan de cours latéral avec modules, leçons terminées, leçon en cours et progression globale.
 * prompt: Create a course curriculum sidebar: overall progress bar with percentage, modules as headings with "3/4" counts, lessons showing a check (done), a play icon (current, highlighted, aria-current="step") or a lock (locked) plus duration. Light and dark mode.
 */
import { CheckCircle2, Lock, PlayCircle } from 'lucide-react';

type Lesson = [title: string, duration: string, state: 'done' | 'current' | 'locked'];

const modules: Array<{ title: string; lessons: Lesson[] }> = [
  { title: 'Foundations', lessons: [['Welcome', '2:10', 'done'], ['Layout basics', '8:45', 'done'], ['Color systems', '11:02', 'current']] },
  { title: 'Components', lessons: [['Buttons', '9:30', 'locked'], ['Forms', '14:12', 'locked']] },
];

export function CourseProgressSidebar() {
  const all = modules.flatMap((module) => module.lessons);
  const done = all.filter((lesson) => lesson[2] === 'done').length;
  const percent = Math.round((done / all.length) * 100);

  return (
    <aside className="w-72 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-semibold text-zinc-900 dark:text-white">UI Design Fundamentals</p>
      <div className="mt-2 flex items-center gap-2">
        <div role="progressbar" aria-label="Course progress" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} className="h-2 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-teal-500" style={{ width: `${percent}%` }} /></div>
        <span className="text-xs font-semibold tabular-nums text-zinc-600 dark:text-zinc-400">{percent}%</span>
      </div>
      {modules.map((module) => (
        <div key={module.title} className="mt-5">
          <p className="flex justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500"><span>{module.title}</span><span>{module.lessons.filter((lesson) => lesson[2] === 'done').length}/{module.lessons.length}</span></p>
          <ol className="mt-2 space-y-0.5">
            {module.lessons.map(([title, duration, state]) => {
              const Icon = state === 'done' ? CheckCircle2 : state === 'current' ? PlayCircle : Lock;
              return (
                <li key={title} aria-current={state === 'current' ? 'step' : undefined} className={`flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm ${state === 'current' ? 'bg-teal-500/10 font-medium text-teal-800 dark:text-teal-200' : state === 'locked' ? 'text-zinc-400' : 'text-zinc-700 dark:text-zinc-300'}`}>
                  <Icon aria-hidden className={`size-4 ${state === 'done' ? 'text-emerald-500' : ''}`} /><span className="flex-1">{title}</span><span className="text-xs tabular-nums opacity-70">{duration}</span>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </aside>
  );
}
