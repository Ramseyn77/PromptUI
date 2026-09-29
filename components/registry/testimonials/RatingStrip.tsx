/**
 * @registry
 * name: Rating Strip
 * category: Testimonials
 * style: Minimal
 * tags: recent
 * description: Bandeau de confiance horizontal : mention « Excellent », cases etoilees et nombre d avis.
 * prompt: Create a horizontal trust strip: "Excellent" label, five square star tiles (filled green, the last partially filled via a gradient for 4.7), "4.7 out of 5 based on 2,341 reviews" text, and a platform wordmark; wraps nicely on mobile with an sr-only summary. Light and dark mode.
 */
import { Star } from 'lucide-react';

export function RatingStrip() {
  const rating = 4.7;
  return (
    <div className="flex w-full max-w-2xl flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
      <p className="sr-only">Rated {rating} out of 5 based on 2,341 reviews.</p>
      <span aria-hidden className="text-base font-semibold text-zinc-900 dark:text-white">Excellent</span>
      <span aria-hidden className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, index) => {
          const fill = Math.max(0, Math.min(1, rating - index)) * 100;
          return <span key={index} className="grid size-7 place-items-center rounded-sm" style={{ background: `linear-gradient(90deg, #10b981 ${fill}%, #d4d4d8 ${fill}%)` }}><Star className="size-4 fill-white text-white" /></span>;
        })}
      </span>
      <span aria-hidden className="text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-white">{rating}</strong> out of 5 based on <a href="#" className="underline underline-offset-2">2,341 reviews</a></span>
      <span aria-hidden className="font-bold text-zinc-900 dark:text-white">★ Reviewly</span>
    </div>
  );
}
