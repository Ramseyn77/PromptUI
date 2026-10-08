/**
 * @registry
 * name: Quote Rotator
 * category: Testimonials
 * style: Minimal
 * tags: recent
 * description: Citation unique qui change toute seule avec barre de progression, avatars cliquables et pause au survol.
 * prompt: Create an auto-rotating testimonial: one quote visible at a time with a fade/slide transition every 5s, a progress bar showing time until the next quote, avatar buttons below to jump (aria-current), pause on hover/focus and when reduced motion is set, aria-live="polite" on the quote. Light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

const quotes = [
  { text: 'Our marketing site went from three weeks of back-and-forth to two days.', name: 'Sara Mendes', role: 'Design lead, Orbit', tone: 'from-teal-400 to-sky-500' },
  { text: 'The prompts alone are worth it. Our AI agents finally produce on-brand UI.', name: 'Kwame Asante', role: 'Founder, Loop', tone: 'from-violet-400 to-fuchsia-500' },
  { text: 'Accessible by default saved us an entire audit cycle.', name: 'Elena Rossi', role: 'Eng manager, Civic', tone: 'from-amber-300 to-rose-500' },
];

export function QuoteRotator() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  useEffect(() => {
    if (paused || still) return;
    const timer = window.setTimeout(() => setIndex((value) => (value + 1) % quotes.length), 5000);
    return () => window.clearTimeout(timer);
  }, [index, paused, still]);

  const quote = quotes[index];

  return (
    <figure onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} className="w-full max-w-lg text-center">
      <style>{`@keyframes pui-rotator-bar{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes pui-rotator-in{from{opacity:0;transform:translateY(8px)}}`}</style>
      <blockquote key={index} aria-live="polite" className="min-h-24 text-xl font-medium leading-relaxed text-zinc-900 motion-safe:animate-[pui-rotator-in_.4s_ease-out] dark:text-zinc-100">“{quote.text}”</blockquote>
      <figcaption className="mt-3 text-sm text-zinc-500"><strong className="font-semibold text-zinc-800 dark:text-zinc-200">{quote.name}</strong> · {quote.role}</figcaption>
      <div className="mx-auto mt-5 h-0.5 w-40 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div key={`${index}-${paused}`} className="h-full origin-left bg-zinc-900 dark:bg-zinc-100" style={{ animation: paused || still ? 'none' : 'pui-rotator-bar 5s linear forwards', transform: paused || still ? 'scaleX(0)' : undefined }} />
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {quotes.map((item, i) => <button key={item.name} type="button" aria-label={`Show quote from ${item.name}`} aria-current={i === index} onClick={() => setIndex(i)} className={`size-9 rounded-full bg-gradient-to-br ring-offset-2 transition dark:ring-offset-zinc-950 ${item.tone} ${i === index ? 'ring-2 ring-zinc-900 dark:ring-white' : 'opacity-50 hover:opacity-100'}`} />)}
      </div>
    </figure>
  );
}
