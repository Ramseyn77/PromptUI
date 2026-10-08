/**
 * @registry
 * name: Highlighted Quote Testimonial
 * category: Testimonials
 * style: Gradient
 * tags: recent
 * description: Grande citation dont les mots-clés se surlignent en dégradé l'un après l'autre à l'apparition.
 * prompt: Create a large testimonial quote where key phrases get a gradient marker highlight that sweeps in one after another (background-size transition triggered by IntersectionObserver), with a 5-star rating, avatar, name and role underneath. Highlights are static with reduced motion. Light and dark mode.
 */
'use client';
import { Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function HighlightedQuoteTestimonial() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const mark = (text: string, delay: number) => (
    <mark className="bg-gradient-to-r from-amber-200 to-pink-200 bg-no-repeat px-1 text-inherit transition-[background-size] duration-700 ease-out motion-reduce:transition-none dark:from-amber-500/40 dark:to-pink-500/40" style={{ backgroundSize: visible ? '100% 100%' : '0% 100%', transitionDelay: `${delay}ms` }}>{text}</mark>
  );

  return (
    <figure ref={ref} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex gap-0.5" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} aria-hidden className="size-4 fill-amber-400 text-amber-400" />)}</div>
      <blockquote className="mt-4 text-2xl font-medium leading-snug tracking-tight text-zinc-900 dark:text-zinc-100">
        “We {mark('cut our design-to-dev time in half', 0)} and our components finally look consistent. It's {mark('the best decision we made this year', 700)}.”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span aria-hidden className="size-11 rounded-full bg-gradient-to-br from-amber-300 to-pink-400" />
        <span className="text-sm"><span className="block font-semibold text-zinc-900 dark:text-zinc-100">Hugo Lefèvre</span><span className="text-zinc-500">CTO, Atelier Nord</span></span>
      </figcaption>
    </figure>
  );
}
