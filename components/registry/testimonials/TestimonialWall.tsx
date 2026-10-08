/**
 * @registry
 * name: Testimonial Wall
 * category: Testimonials
 * style: SaaS
 * tags: featured, recent
 * description: Mur de témoignages en maçonnerie avec cartes de hauteurs variées et fondu en bas.
 * prompt: Create a testimonial wall using CSS columns (1 → 2 on sm → 3 on lg) with cards of varying lengths (avatar, name, handle, quote, 5 stars), break-inside-avoid, and a bottom fade mask with a "Read all 1,200 reviews" button. Light and dark mode.
 */
import { Star } from 'lucide-react';

const reviews = [
  ['Léa', '@leadesign', 'Honestly the cleanest component library I have used.'],
  ['Kofi', '@kofi_dev', 'Dark mode that actually works everywhere. Shipped our dashboard in a weekend, and the code is readable enough to hand to juniors.'],
  ['Sara', '@sara.pm', 'The prompts saved us a sprint.'],
  ['Tom', '@tomw', 'Accessible by default is not a marketing line here: focus states, roles, contrast. It is all there.'],
  ['Inès', '@inesb', 'Beautiful defaults. My clients noticed.'],
  ['Ravi', '@ravi', 'Copy, paste, tweak, done. The way UI kits should work.'],
];

export function TestimonialWall() {
  return (
    <section className="relative w-full max-w-4xl">
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
        {reviews.map(([name, handle, text], index) => (
          <figure key={handle} className="break-inside-avoid rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <figcaption className="flex items-center gap-3">
              <span className="size-9 rounded-full" style={{ background: `hsl(${index * 55 + 160} 60% 55%)` }} />
              <span><span className="block text-sm font-semibold text-zinc-900 dark:text-white">{name}</span><span className="block text-xs text-zinc-500 dark:text-zinc-400">{handle}</span></span>
            </figcaption>
            <p className="mt-2 flex text-amber-400" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, star) => <Star key={star} aria-hidden className="size-3.5 fill-current" />)}</p>
            <blockquote className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{text}</blockquote>
          </figure>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <button type="button" className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg dark:bg-white dark:text-zinc-950">Read all 1,200 reviews</button>
      </div>
    </section>
  );
}
