/**
 * @registry
 * name: Carousel Card
 * category: Cards
 * style: Minimal
 * tags: recent
 * description: Carrousel à défilement fluide avec boutons précédent/suivant, points et compteur de slides.
 * prompt: Create a scroll-snap carousel: slides are gradient cards with a number and caption; previous/next round buttons (disabled at the ends), clickable dots and a "Slide 2 of 5" counter kept in sync with scroll position via scroll events. role="region" aria-roledescription="carousel", each slide aria-roledescription="slide" with aria-label, ArrowLeft/ArrowRight keyboard support. Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

const slides = [
  { title: 'Plan', tone: 'from-teal-400 to-emerald-500' },
  { title: 'Design', tone: 'from-sky-400 to-indigo-500' },
  { title: 'Build', tone: 'from-violet-400 to-fuchsia-500' },
  { title: 'Test', tone: 'from-amber-300 to-orange-500' },
  { title: 'Ship', tone: 'from-rose-400 to-pink-500' },
];

export function CarouselCard() {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  function go(index: number) {
    const element = track.current;
    if (!element) return;
    const target = Math.max(0, Math.min(slides.length - 1, index));
    element.scrollTo({ left: target * element.clientWidth, behavior: 'smooth' });
  }

  function onKey(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(current - 1); }
  }

  const arrow = 'grid size-9 place-items-center rounded-full border border-zinc-300 bg-white text-zinc-800 transition hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800';

  return (
    <section role="region" aria-roledescription="carousel" aria-label="Product stages" onKeyDown={onKey} className="w-full max-w-sm">
      <div ref={track} tabIndex={0} onScroll={(event) => setCurrent(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))} className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-teal-500" data-lenis-prevent>
        {slides.map((slide, index) => (
          <div key={slide.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`} className="w-full shrink-0 snap-start p-1">
            <div className={`flex aspect-square flex-col justify-between rounded-xl bg-gradient-to-br p-6 text-white ${slide.tone}`}>
              <span className="text-6xl font-black opacity-90">{index + 1}</span>
              <span className="text-2xl font-semibold">{slide.title}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button type="button" aria-label="Previous slide" disabled={current === 0} onClick={() => go(current - 1)} className={arrow}><ChevronLeft aria-hidden className="size-4" /></button>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1.5">
            {slides.map((slide, index) => <button key={slide.title} type="button" aria-label={`Go to slide ${index + 1}`} aria-current={index === current} onClick={() => go(index)} className={`h-2 rounded-full transition-all ${index === current ? 'w-6 bg-zinc-900 dark:bg-zinc-100' : 'w-2 bg-zinc-300 dark:bg-zinc-700'}`} />)}
          </div>
          <p aria-live="polite" className="text-xs text-zinc-500 dark:text-zinc-400">Slide {current + 1} of {slides.length}</p>
        </div>
        <button type="button" aria-label="Next slide" disabled={current === slides.length - 1} onClick={() => go(current + 1)} className={arrow}><ChevronRight aria-hidden className="size-4" /></button>
      </div>
    </section>
  );
}
