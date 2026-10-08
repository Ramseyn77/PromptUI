/**
 * @registry
 * name: Course Card
 * category: Cards
 * style: SaaS
 * tags: recent
 * description: Carte de cours en ligne avec progression, prochaine leçon, formateur, note et bouton Reprendre.
 * prompt: Create an online course card: gradient thumbnail with level badge and duration, title, instructor avatar and name, star rating with count, a progress bar with "12 of 32 lessons" (role="progressbar"), the next lesson title and a Resume button; a bookmark toggle in the corner. Light and dark mode.
 */
'use client';
import { Bookmark, PlayCircle, Star } from 'lucide-react';
import { useState } from 'react';

export function CourseCard() {
  const [saved, setSaved] = useState(true);
  const done = 12;
  const total = 32;

  return (
    <article className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative h-36 bg-gradient-to-br from-indigo-500 via-sky-500 to-teal-400 p-3">
        <span className="rounded-md bg-white/90 px-2 py-0.5 text-xs font-semibold text-indigo-700">Intermediate</span>
        <span className="absolute bottom-3 left-3 rounded-md bg-black/40 px-2 py-0.5 text-xs text-white backdrop-blur">6h 40m</span>
        <button type="button" aria-pressed={saved} aria-label="Bookmark course" onClick={() => setSaved((value) => !value)} className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-indigo-700"><Bookmark aria-hidden className={`size-4 ${saved ? 'fill-current' : ''}`} /></button>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Design Systems with Tailwind</h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500"><span aria-hidden className="size-6 rounded-full bg-gradient-to-br from-amber-300 to-rose-400" />Chioma Eze<span className="ml-auto flex items-center gap-1 text-zinc-700 dark:text-zinc-300"><Star aria-hidden className="size-4 fill-amber-400 text-amber-400" />4.8 <span className="text-zinc-400">(2.1k)</span></span></div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-zinc-500"><span>{done} of {total} lessons</span><span>{Math.round((done / total) * 100)}%</span></div>
          <div role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={total} aria-label="Course progress" className="mt-1.5 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-indigo-500" style={{ width: `${(done / total) * 100}%` }} /></div>
        </div>
        <p className="mt-4 text-xs text-zinc-500">Next: <span className="font-medium text-zinc-800 dark:text-zinc-200">13 · Theming with CSS variables</span></p>
        <button type="button" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"><PlayCircle aria-hidden className="size-4" />Resume</button>
      </div>
    </article>
  );
}
