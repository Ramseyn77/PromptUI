/**
 * @registry
 * name: Horizontal Timeline
 * category: Dashboard
 * style: Editorial
 * tags: recent
 * description: Frise chronologique horizontale façon daisyUI timeline : jalons du projet, éléments passés pleins et futurs en pointillés.
 * prompt: Create a daisyUI-style horizontal timeline of project milestones (Kickoff, Research, Design, Beta, Launch): dates above, boxed labels below, a connecting line solid for past and dashed for future, a "Today" marker; it scrolls horizontally on small screens (data-lenis-prevent) and each milestone is an li with a time element. Light and dark mode.
 */
import { CheckCircle2, Circle } from 'lucide-react';

const milestones = [
  { date: 'Mar 3', label: 'Kickoff', done: true },
  { date: 'Apr 14', label: 'Research', done: true },
  { date: 'Jun 2', label: 'Design', done: true },
  { date: 'Oct 20', label: 'Public beta', done: false },
  { date: 'Jan 12', label: 'Launch', done: false },
];

export function HorizontalTimeline() {
  return (
    <section className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-100">Atlas roadmap</h3>
      <div className="mt-4 overflow-x-auto pb-2 pt-4" data-lenis-prevent>
        <ol className="flex min-w-[36rem]">
          {milestones.map((item, index) => (
            <li key={item.label} className="relative flex flex-1 flex-col items-center">
              <time className="text-xs text-zinc-500">{item.date}</time>
              <div className="relative my-2 flex w-full items-center justify-center">
                {index > 0 && <span aria-hidden className={`absolute right-1/2 w-full border-t-2 ${milestones[index - 1].done && item.done ? 'border-teal-500' : 'border-dashed border-zinc-300 dark:border-zinc-700'}`} />}
                <span className="relative bg-white dark:bg-zinc-950">{item.done ? <CheckCircle2 aria-label="Done" className="size-5 text-teal-600" /> : <Circle aria-label="Upcoming" className="size-5 text-zinc-300 dark:text-zinc-600" />}</span>
                {index === 3 && <span className="absolute -left-2 -top-7 rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">Today</span>}
              </div>
              <span className={`rounded-lg border px-2.5 py-1 text-sm ${item.done ? 'border-zinc-200 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200' : 'border-dashed border-zinc-300 text-zinc-500 dark:border-zinc-700'}`}>{item.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
