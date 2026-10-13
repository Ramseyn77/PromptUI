/**
 * @registry
 * name: Vertical Ticker Text
 * category: Text
 * style: SaaS
 * tags: recent
 * description: Phrase avec mot central qui défile verticalement façon tableau d'affichage (« Built for designers / developers / founders »), largeur qui s'adapte.
 * prompt: Create a vertical word ticker inside a sentence: "Built for [designers | developers | founders | marketers]" where the bracketed word sits in a fixed-height mask and the list translates upward every 2.2s with an easing, looping seamlessly by duplicating the first word; the mask's width animates to fit the current word (measured with refs); each word has its own accent color; pausing on hover; screen readers get a static sentence; reduced motion shows the first word only. Light and dark mode.
 */
'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const words = [['designers', 'text-violet-600 dark:text-violet-400'], ['developers', 'text-sky-600 dark:text-sky-400'], ['founders', 'text-amber-600 dark:text-amber-400'], ['marketers', 'text-pink-600 dark:text-pink-400']];
const loop = [...words, words[0]];

export function VerticalTickerText() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => { setAnimate(true); setIndex((value) => value + 1); }, 2200);
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  useEffect(() => {
    if (index !== words.length) return;
    const timer = window.setTimeout(() => { setAnimate(false); setIndex(0); }, 600);
    return () => window.clearTimeout(timer);
  }, [index]);

  useLayoutEffect(() => { setWidth(refs.current[index]?.offsetWidth); }, [index]);

  return (
    <div className="flex w-full max-w-2xl justify-center rounded-3xl border border-zinc-200 bg-white px-6 py-12 dark:border-zinc-800 dark:bg-zinc-950" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <h2 className="text-center text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
        <span className="sr-only">Built for designers, developers, founders and marketers.</span>
        <span aria-hidden className="inline-flex flex-wrap items-baseline justify-center gap-x-3">
          Built for
          <span className="relative inline-block h-[1.2em] overflow-hidden align-bottom transition-[width] duration-500" style={{ width }}>
            <span className={`flex flex-col ${animate ? 'transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)]' : ''}`} style={{ transform: `translateY(-${index * 1.2}em)` }}>
              {loop.map(([word, tone], position) => <span key={position} ref={(node) => { refs.current[position] = node; }} className={`block h-[1.2em] w-max whitespace-nowrap leading-[1.2em] ${tone}`}>{word}</span>)}
            </span>
          </span>
        </span>
      </h2>
    </div>
  );
}
