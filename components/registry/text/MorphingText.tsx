/**
 * @registry
 * name: Morphing Text
 * category: Text
 * style: Gradient
 * tags: featured, recent
 * description: Mots qui fusionnent les uns dans les autres grâce à un flou et un filtre de seuil, effet liquide.
 * prompt: Create morphing text: words cycle every 2.4s; the outgoing and incoming words are stacked and crossfaded with opposite blur amounts while an SVG feColorMatrix threshold filter on the container turns the blur into a gooey liquid morph. Screen readers get a static label listing the words; reduced motion shows plain crossfade-free switching. Light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

const words = ['Design', 'Prototype', 'Launch', 'Iterate'];

export function MorphingText() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let start = performance.now();
    let current = 0;
    const loop = (time: number) => {
      const elapsed = time - start;
      if (still) {
        if (elapsed > 2400) { start = time; current = (current + 1) % words.length; setIndex(current); }
      } else if (elapsed < 900) {
        setProgress(Math.max(0, elapsed / 900));
      } else if (elapsed > 2400) {
        start = time; current = (current + 1) % words.length; setIndex(current); setProgress(0);
      } else setProgress(1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const previous = words[(index + words.length - 1) % words.length];
  const blur = (value: number) => `blur(${Math.min(8 / Math.max(value, 0.01) - 8, 100)}px)`;

  return (
    <div className="w-full max-w-lg text-center">
      <svg aria-hidden className="absolute size-0">
        <filter id="pui-morph-threshold"><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" /></filter>
      </svg>
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">We help you</p>
      <h3 aria-label={`We help you ${words.join(', ')}`} className="relative mt-2 h-20 text-6xl font-black tracking-tight text-zinc-950 [filter:url(#pui-morph-threshold)] sm:text-7xl dark:text-zinc-50">
        <span aria-hidden className="absolute inset-x-0 top-0" style={{ filter: blur(1 - progress), opacity: Math.pow(1 - progress, 0.4) }}>{progress < 1 ? previous : ''}</span>
        <span aria-hidden className="absolute inset-x-0 top-0" style={{ filter: blur(progress), opacity: Math.pow(progress, 0.4) }}>{words[index]}</span>
      </h3>
    </div>
  );
}
