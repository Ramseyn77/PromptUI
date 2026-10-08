/**
 * @registry
 * name: Score Cards Testimonial
 * category: Testimonials
 * style: SaaS
 * tags: recent
 * description: Bandeau de notes sur plateformes d'avis (génériques) avec étoiles partielles, nombre d'avis et badges de distinction.
 * prompt: Create review platform score cards: three cards for generic review sites (Software reviews, App store, Business reviews — text wordmarks, no real logos) each with score out of 5, partially filled stars (width-clipped overlay for decimals), review count, and a badge row ("Leader Fall 2026", "Easiest to use"); one-line quote under the row. Light and dark mode.
 */
import { Award, Star } from 'lucide-react';

const scores = [['Software reviews', 4.8, '2,140'], ['App store', 4.7, '12.8k'], ['Business reviews', 4.9, '860']] as const;

function Stars({ value }: { value: number }) {
  return (
    <span className="relative inline-flex" role="img" aria-label={`${value} out of 5 stars`}>
      <span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} aria-hidden className="size-4 text-amber-400" />)}</span>
      <span className="absolute inset-0 flex overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>{Array.from({ length: 5 }, (_, i) => <Star key={i} aria-hidden className="size-4 shrink-0 fill-amber-400 text-amber-400" />)}</span>
    </span>
  );
}

export function ScoreCardsTestimonial() {
  return (
    <section className="w-full max-w-3xl">
      <div className="grid gap-3 sm:grid-cols-3">
        {scores.map(([site, score, count]) => (
          <article key={site} className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{site}</p>
            <p className="mt-2 text-3xl font-bold text-zinc-950 dark:text-zinc-50">{score}<span className="text-base font-normal text-zinc-400">/5</span></p>
            <Stars value={score} />
            <p className="mt-1 text-xs text-zinc-500">{count} reviews</p>
          </article>
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap justify-center gap-2">{['Leader · Fall 2026', 'Easiest to use', 'Best support'].map((badge) => <li key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300"><Award aria-hidden className="size-3.5" />{badge}</li>)}</ul>
      <p className="mt-4 text-center text-sm italic text-zinc-600 dark:text-zinc-400">“The only tool our whole company agreed on.” — Operations lead, 300-person retailer</p>
    </section>
  );
}
