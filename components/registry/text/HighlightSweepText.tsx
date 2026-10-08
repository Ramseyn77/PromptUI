/**
 * @registry
 * name: Highlight Sweep Text
 * category: Text
 * style: Minimal
 * tags: recent
 * description: Paragraphe dont le mot-clé courant est surligné tour à tour par une pastille qui glisse d'un mot à l'autre.
 * prompt: Create a sweeping highlight paragraph: a sentence where specific keywords are wrapped in spans; a single absolutely positioned pill (measured with offsetLeft/offsetTop/offsetWidth) slides from one keyword to the next every 1.6s with a spring transition and the active word turns white; pauses on hover; keywords are also focusable buttons that move the pill on focus. Static first keyword with reduced motion. Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const parts = ['We help teams ', '#design', ', ', '#build', ' and ', '#launch', ' products people ', '#love', '.'];

export function HighlightSweepText() {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [box, setBox] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const [paused, setPaused] = useState(false);
  const keywords = parts.filter((part) => part.startsWith('#'));

  useEffect(() => {
    const node = refs.current[active];
    if (node) setBox({ left: node.offsetLeft, top: node.offsetTop, width: node.offsetWidth, height: node.offsetHeight });
  }, [active]);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % keywords.length), 1600);
    return () => window.clearInterval(timer);
  }, [paused, keywords.length]);

  let k = -1;
  return (
    <p onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative max-w-lg text-3xl font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100">
      {box && <span aria-hidden className="absolute rounded-lg bg-teal-600 transition-all duration-500 ease-[cubic-bezier(.34,1.3,.64,1)]" style={{ left: box.left - 4, top: box.top, width: box.width + 8, height: box.height }} />}
      {parts.map((part, index) => {
        if (!part.startsWith('#')) return <span key={index} className="relative">{part}</span>;
        k += 1;
        const mine = k;
        return <button key={index} ref={(node) => { refs.current[mine] = node; }} type="button" onFocus={() => { setPaused(true); setActive(mine); }} onBlur={() => setPaused(false)} className={`relative rounded outline-none transition-colors duration-300 focus-visible:underline ${active === mine ? 'text-white' : ''}`}>{part.slice(1)}</button>;
      })}
    </p>
  );
}
