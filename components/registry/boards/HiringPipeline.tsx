/**
 * @registry
 * name: Hiring Pipeline
 * category: Boards
 * style: SaaS
 * tags: recent
 * description: Pipeline de recrutement par etape avec candidats, note en etoiles et jours dans l etape.
 * prompt: Create a hiring pipeline board: columns Applied, Interview, Offer with candidate cards (avatar initials, name, role, 1–5 star rating with sr-only text, "3d in stage" chip that turns amber after 5 days) and column counts. Mobile-first: columns stack vertically on phones with no horizontal scrolling, and sit side by side from sm. Light and dark mode.
 */
import { Star } from 'lucide-react';

const stages = [
  { name: 'Applied', candidates: [['Amara Diop', 'Frontend', 4, 2], ['Jonas Berg', 'Frontend', 3, 6]] },
  { name: 'Interview', candidates: [['Lina Park', 'Designer', 5, 3]] },
  { name: 'Offer', candidates: [['Rafael Costa', 'Backend', 4, 1]] },
] as const;

export function HiringPipeline() {
  return (
    <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
      {stages.map((stage) => (
        <section key={stage.name} aria-label={stage.name} className="min-w-0 rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-900">
          <h3 className="flex justify-between px-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">{stage.name}<span className="text-zinc-400">{stage.candidates.length}</span></h3>
          <ul className="mt-3 space-y-2">
            {stage.candidates.map(([name, role, rating, days]) => (
              <li key={name} className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-sky-500 text-[11px] font-bold text-white">{name.split(' ').map((part) => part[0]).join('')}</span>
                  <div className="min-w-0"><p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">{name}</p><p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{role}</p></div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex" aria-label={`Rated ${rating} out of 5`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden className={`size-3.5 ${index < rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300 dark:text-zinc-700'}`} />)}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${days > 5 ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>{days}d in stage</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
