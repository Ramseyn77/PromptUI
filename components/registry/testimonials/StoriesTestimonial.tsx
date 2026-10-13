/**
 * @registry
 * name: Stories Testimonial
 * category: Testimonials
 * style: Gradient
 * tags: featured, recent
 * description: Témoignages au format « stories » verticales : barres de progression segmentées, avance automatique, tap gauche/droite, pause au maintien.
 * prompt: Create a stories-style testimonial viewer: a vertical 9:16 card with segmented progress bars at the top (one per customer), avatar + name + company, a big quote over a gradient background unique to each story; it auto-advances every 5s, tapping the left/right halves goes back/forward, pressing and holding pauses (also paused on focus), arrow keys navigate; a row of story avatar rings below lets you jump; reduced motion disables auto-advance. Light and dark mode.
 */
'use client';
import { useEffect, useState, type KeyboardEvent } from 'react';

const stories = [
  { name: 'Awa Diop', company: 'Kora Bank', quote: 'We shipped our new onboarding in nine days. Nine.', gradient: 'from-violet-600 via-fuchsia-500 to-orange-400' },
  { name: 'Leo Martin', company: 'Atelier', quote: 'Our designers stopped redrawing the same components every sprint.', gradient: 'from-sky-500 via-cyan-400 to-emerald-400' },
  { name: 'Mei Tanaka', company: 'Northwind', quote: 'The first tool our whole ops team actually likes opening.', gradient: 'from-rose-500 via-pink-500 to-amber-300' },
  { name: 'Kofi Mensah', company: 'Shamba', quote: 'Works on 3G in the field. That alone sold us.', gradient: 'from-emerald-600 via-teal-500 to-lime-300' },
];

export function StoriesTestimonial() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [run, setRun] = useState(0);
  const story = stories[index];

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => go(index + 1), 5000);
    return () => window.clearTimeout(timer);
  });

  function go(next: number) { setIndex((next + stories.length) % stories.length); setRun((value) => value + 1); }
  function onKeyDown(event: KeyboardEvent) { if (event.key === 'ArrowRight') go(index + 1); if (event.key === 'ArrowLeft') go(index - 1); }

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4">
      <style>{`@keyframes pui-story-fill { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
      <section aria-roledescription="carousel" aria-label="Customer stories" tabIndex={0} onKeyDown={onKeyDown} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onPointerDown={() => setPaused(true)} onPointerUp={() => setPaused(false)} onPointerLeave={() => setPaused(false)} className={`relative aspect-[9/16] w-full overflow-hidden rounded-3xl bg-gradient-to-br p-4 text-white shadow-2xl outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-400/50 ${story.gradient}`}>
        <div aria-hidden className="flex gap-1">{stories.map((item, dot) => <span key={item.name} className="h-1 flex-1 overflow-hidden rounded-full bg-white/35"><span key={dot === index ? run : undefined} className={`block h-full origin-left bg-white ${dot < index ? '' : dot === index ? 'motion-safe:animate-[pui-story-fill_5s_linear_forwards] motion-reduce:scale-x-100' : 'scale-x-0'}`} style={dot === index ? { animationPlayState: paused ? 'paused' : 'running' } : undefined} /></span>)}</div>
        <div className="mt-3 flex items-center gap-2"><span className="grid size-8 place-items-center rounded-full bg-white/25 text-xs font-bold ring-2 ring-white/60">{story.name.split(' ').map((part) => part[0]).join('')}</span><div className="text-xs"><p className="font-semibold">{story.name}</p><p className="text-white/75">{story.company}</p></div></div>
        <blockquote aria-live="polite" className="absolute inset-x-5 bottom-10 text-2xl font-bold leading-snug drop-shadow">“{story.quote}”</blockquote>
        <button type="button" aria-label="Previous story" onClick={() => go(index - 1)} className="absolute inset-y-16 left-0 w-1/3 outline-none" />
        <button type="button" aria-label="Next story" onClick={() => go(index + 1)} className="absolute inset-y-16 right-0 w-1/3 outline-none" />
      </section>
      <ul className="flex gap-3">{stories.map((item, dot) => <li key={item.name}><button type="button" aria-label={`${item.name}'s story`} aria-current={dot === index ? 'true' : undefined} onClick={() => go(dot)} className={`grid size-11 place-items-center rounded-full bg-gradient-to-br p-0.5 ${item.gradient} ${dot === index ? 'scale-110' : 'opacity-60'}`}><span className="grid size-full place-items-center rounded-full bg-white text-[11px] font-bold text-zinc-900 dark:bg-zinc-950 dark:text-white">{item.name.split(' ').map((part) => part[0]).join('')}</span></button></li>)}</ul>
    </div>
  );
}
