/**
 * @registry
 * name: Review Filter List
 * category: Testimonials
 * style: Minimal
 * tags: recent
 * description: Liste d'avis clients avec filtres par note, tri, mots-clés cliquables et vote « utile » sur chaque avis.
 * prompt: Create a customer reviews list: filter chips by stars (All, 5★, 4★, 3★ and below) with counts, a sort select (Most recent / Most helpful), keyword chips extracted from reviews that filter on click, and review items with stars, title, text, author, date and a "Helpful (12)" toggle (aria-pressed); empty state when nothing matches. Light and dark mode.
 */
'use client';
import { Star, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

const reviews = [
  { id: 1, stars: 5, title: 'Setup took 5 minutes', text: 'Great onboarding and the support team replied in minutes.', author: 'Awa', date: 'Oct 2', helpful: 12, tags: ['onboarding', 'support'] },
  { id: 2, stars: 4, title: 'Solid, a few rough edges', text: 'Fast and clean. Exports could be better.', author: 'Leo', date: 'Sep 28', helpful: 5, tags: ['export'] },
  { id: 3, stars: 5, title: 'Support is incredible', text: 'They fixed my billing issue on a Sunday.', author: 'Mia', date: 'Sep 20', helpful: 20, tags: ['support', 'billing'] },
  { id: 4, stars: 3, title: 'Good but pricey', text: 'Love the features, wish billing was more flexible.', author: 'Kofi', date: 'Sep 12', helpful: 3, tags: ['billing'] },
];

export function ReviewFilterList() {
  const [stars, setStars] = useState<number | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState('recent');
  const [helped, setHelped] = useState<number[]>([]);
  const shown = reviews.filter((review) => (stars === null || (stars === 3 ? review.stars <= 3 : review.stars === stars)) && (!tag || review.tags.includes(tag))).sort((a, b) => (sort === 'helpful' ? b.helpful - a.helpful : a.id - b.id));
  const chip = (on: boolean) => `rounded-full border px-2.5 py-1 text-xs font-medium ${on ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900' : 'border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300'}`;

  return (
    <section className="w-full max-w-lg">
      <div className="flex flex-wrap items-center gap-1.5">
        {[null, 5, 4, 3].map((value) => <button key={String(value)} type="button" aria-pressed={stars === value} onClick={() => setStars(value)} className={chip(stars === value)}>{value === null ? 'All' : value === 3 ? '3★ & below' : `${value}★`} <span className="opacity-60">{value === null ? reviews.length : reviews.filter((review) => (value === 3 ? review.stars <= 3 : review.stars === value)).length}</span></button>)}
        <select aria-label="Sort reviews" value={sort} onChange={(event) => setSort(event.target.value)} className="ml-auto rounded-lg border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"><option value="recent">Most recent</option><option value="helpful">Most helpful</option></select>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">{['onboarding', 'support', 'billing', 'export'].map((value) => <button key={value} type="button" aria-pressed={tag === value} onClick={() => setTag(tag === value ? null : value)} className={`rounded-md px-2 py-0.5 text-xs ${tag === value ? 'bg-teal-600 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}>#{value}</button>)}</div>
      <ul aria-live="polite" className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
        {shown.map((review) => {
          const on = helped.includes(review.id);
          return (
            <li key={review.id} className="py-4">
              <span className="flex" role="img" aria-label={`${review.stars} out of 5 stars`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} aria-hidden className={`size-3.5 ${i < review.stars ? 'fill-amber-400 text-amber-400' : 'text-zinc-300 dark:text-zinc-700'}`} />)}</span>
              <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">{review.title}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{review.text}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-zinc-500"><span>{review.author} · {review.date}</span><button type="button" aria-pressed={on} onClick={() => setHelped((list) => (on ? list.filter((id) => id !== review.id) : [...list, review.id]))} className={`inline-flex items-center gap-1 rounded-md px-2 py-1 ${on ? 'bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}><ThumbsUp aria-hidden className="size-3.5" />Helpful ({review.helpful + (on ? 1 : 0)})</button></div>
            </li>
          );
        })}
        {!shown.length && <li className="py-8 text-center text-sm text-zinc-500">No reviews match these filters.</li>}
      </ul>
    </section>
  );
}
