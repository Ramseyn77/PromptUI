/**
 * @registry
 * name: Testimonial Carousel
 * category: Testimonials
 * style: Minimal
 * tags: featured, recent
 * description: Carrousel de temoignages avec fleches, points, defilement automatique mis en pause au survol.
 * prompt: Create a testimonial carousel: one quote at a time with fade transition, avatar, name and role, prev/next buttons, dot indicators (aria-current), autoplay every 5s that pauses on hover/focus and is disabled with prefers-reduced-motion; region with aria-roledescription="carousel". Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const quotes = [
  { text: 'We replaced three tools with this one. Our designers and engineers finally speak the same language.', name: 'Awa Diallo', role: 'Head of Design, Lumen' },
  { text: 'Onboarding new developers went from a week to an afternoon. The components just make sense.', name: 'Lucas Martin', role: 'CTO, Orbit' },
  { text: 'The prompts are the secret weapon. We prototype in minutes and ship in days.', name: 'Mei Chen', role: 'Founder, Kite' },
];

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (next: number) => setIndex((next + quotes.length) % quotes.length);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % quotes.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const quote = quotes[index];
  return (
    <>
      <style>{`@keyframes pui-quote-in{from{opacity:0;transform:translateY(6px)}}`}</style>
      <section aria-roledescription="carousel" aria-label="Testimonials" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
        <figure key={index} aria-roledescription="slide" aria-label={`${index + 1} of ${quotes.length}`} className="motion-safe:animate-[pui-quote-in_.4s_ease-out]">
          <blockquote className="text-xl leading-8 text-zinc-800 sm:text-2xl dark:text-zinc-100">“{quote.text}”</blockquote>
          <figcaption className="mt-6 flex items-center justify-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-sm font-bold text-white">{quote.name[0]}</span>
            <span className="text-left"><span className="block text-sm font-semibold text-zinc-900 dark:text-white">{quote.name}</span><span className="block text-xs text-zinc-500 dark:text-zinc-400">{quote.role}</span></span>
          </figcaption>
        </figure>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" aria-label="Previous testimonial" onClick={() => go(index - 1)} className="grid size-9 place-items-center rounded-full border border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"><ChevronLeft className="size-4" /></button>
          <div className="flex gap-1.5">{quotes.map((_, dot) => <button key={dot} type="button" aria-label={`Go to testimonial ${dot + 1}`} aria-current={dot === index} onClick={() => go(dot)} className={`h-2 rounded-full transition-all ${dot === index ? 'w-6 bg-teal-600' : 'w-2 bg-zinc-300 dark:bg-zinc-700'}`} />)}</div>
          <button type="button" aria-label="Next testimonial" onClick={() => go(index + 1)} className="grid size-9 place-items-center rounded-full border border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"><ChevronRight className="size-4" /></button>
        </div>
      </section>
    </>
  );
}
