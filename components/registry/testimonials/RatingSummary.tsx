/**
 * @registry
 * name: Rating Summary
 * category: Testimonials
 * style: Minimal
 * tags: recent
 * description: Synthese des avis avec note moyenne, repartition par etoiles et filtre par note.
 * prompt: Create a reviews summary: big average rating with stars and review count, a distribution of 5→1 stars as clickable rows (aria-pressed) with bars and percentages that filter a short review list below, plus "Clear filter". Light and dark mode.
 */
'use client';
import { Star } from 'lucide-react';
import { useState } from 'react';

const distribution = [[5, 72], [4, 18], [3, 6], [2, 2], [1, 2]] as const;
const reviews = [[5, 'Flawless dark mode and great docs.'], [5, 'Saved us weeks of work.'], [4, 'Great, wish there were more charts.'], [3, 'Good but the free plan is limited.']] as const;

export function RatingSummary() {
  const [filter, setFilter] = useState<number | null>(null);
  const visible = reviews.filter(([stars]) => filter === null || stars === filter);

  return (
    <section className="grid w-full max-w-2xl gap-6 rounded-3xl border border-zinc-200 bg-white p-6 sm:grid-cols-[auto_1fr] dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-center sm:pr-6">
        <p className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">4.8</p>
        <p className="mt-1 flex justify-center text-amber-400" aria-label="4.8 out of 5">{Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden className={`size-4 ${index < 5 ? 'fill-current' : ''}`} />)}</p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">1,284 reviews</p>
      </div>
      <div className="space-y-1.5">
        {distribution.map(([stars, percent]) => (
          <button key={stars} type="button" aria-pressed={filter === stars} onClick={() => setFilter(filter === stars ? null : stars)} className={`flex w-full items-center gap-3 rounded-lg px-2 py-1 text-sm transition ${filter === stars ? 'bg-amber-500/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}>
            <span className="w-8 text-zinc-700 dark:text-zinc-300">{stars}★</span>
            <span className="h-2 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800"><span className="block h-full rounded-full bg-amber-400" style={{ width: `${percent}%` }} /></span>
            <span className="w-9 text-right tabular-nums text-zinc-500">{percent}%</span>
          </button>
        ))}
      </div>
      <div className="sm:col-span-2">
        <div className="flex items-center justify-between"><p className="text-sm font-semibold text-zinc-900 dark:text-white">{filter ? `${filter}-star reviews` : 'Recent reviews'}</p>{filter && <button type="button" onClick={() => setFilter(null)} className="text-xs text-teal-700 hover:underline dark:text-teal-400">Clear filter</button>}</div>
        <ul className="mt-2 space-y-2">
          {visible.map(([stars, text]) => <li key={text} className="rounded-xl bg-zinc-50 px-3 py-2 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"><span className="mr-2 text-amber-500">{'★'.repeat(stars)}</span>{text}</li>)}
          {!visible.length && <li className="py-3 text-center text-sm text-zinc-500">No reviews with this rating yet.</li>}
        </ul>
      </div>
    </section>
  );
}
