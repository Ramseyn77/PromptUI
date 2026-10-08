/**
 * @registry
 * name: Gradient Border Quote
 * category: Testimonials
 * style: Gradient
 * tags: recent
 * description: Citation encadrée d'une bordure dégradée avec étoiles et badge « Achat vérifié ».
 * prompt: Create a single testimonial card with a 1.5px gradient border (padding + inner surface), five stars, the quote, and a footer with avatar, name, and a "Verified purchase" badge with check icon. Light and dark mode.
 */
import { BadgeCheck, Star } from 'lucide-react';

export function GradientBorderQuote() {
  return (
    <figure className="w-full max-w-md rounded-3xl bg-gradient-to-br from-teal-400 via-violet-500 to-amber-400 p-[1.5px] shadow-lg">
      <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 dark:bg-zinc-950">
        <p className="flex text-amber-400" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden className="size-4 fill-current" />)}</p>
        <blockquote className="mt-4 text-base leading-7 text-zinc-800 dark:text-zinc-100">“I bought it for one project and ended up using it for every client since. Support answered in under an hour.”</blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-violet-500/15 font-semibold text-violet-700 dark:text-violet-300">T</span>
          <span className="flex-1"><span className="block text-sm font-semibold text-zinc-900 dark:text-white">Théo Laurent</span><span className="block text-xs text-zinc-500">Freelance developer</span></span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400"><BadgeCheck aria-hidden className="size-3.5" />Verified purchase</span>
        </figcaption>
      </div>
    </figure>
  );
}
