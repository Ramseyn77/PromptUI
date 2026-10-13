/**
 * @registry
 * name: Scroll Progress Button
 * category: Buttons
 * style: Glass
 * tags: recent
 * description: Bouton « retour en haut » en verre dont l'anneau se remplit selon la progression de lecture, avec pourcentage et apparition après défilement.
 * prompt: Create a back-to-top button inside a scrollable article panel (data-lenis-prevent): a round glass button fixed to the panel's bottom-right that appears after 15% scroll, shows an SVG ring filling with the reading progress and the percentage in the center, turning into an arrow on hover/focus; clicking smooth-scrolls the panel to the top (instant with reduced motion) and moves focus to the article heading. Light and dark mode.
 */
'use client';
import { ArrowUp } from 'lucide-react';
import { useRef, useState } from 'react';

const circumference = 2 * 3.1416 * 20;

export function ScrollProgressButton() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);
  const visible = progress > 0.15;

  function toTop() {
    scrollRef.current?.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    headingRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className="relative h-[24rem] w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-sky-100 via-white to-violet-100 dark:from-sky-950 dark:via-zinc-950 dark:to-violet-950">
      <div ref={scrollRef} onScroll={(event) => { const node = event.currentTarget; setProgress(node.scrollTop / Math.max(1, node.scrollHeight - node.clientHeight)); }} className="h-full overflow-y-auto px-6 py-6" data-lenis-prevent>
        <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold text-zinc-950 outline-none dark:text-white">The case for calm software</h3>
        {Array.from({ length: 7 }, (_, index) => <p key={index} className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Calm software respects attention. It speaks when it has something useful to say, keeps its promises about where things live, and never makes you hunt for the thing you did yesterday. Paragraph {index + 1} of 7.</p>)}
      </div>
      <button type="button" aria-label={`Back to top, ${Math.round(progress * 100)}% read`} tabIndex={visible ? 0 : -1} onClick={toTop} className={`group absolute bottom-4 right-4 grid size-14 place-items-center rounded-full border border-white/60 bg-white/60 text-zinc-900 shadow-lg backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-zinc-900/60 dark:text-white ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
        <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 -rotate-90"><circle cx="24" cy="24" r="20" fill="none" strokeWidth="3" className="stroke-zinc-900/10 dark:stroke-white/10" /><circle cx="24" cy="24" r="20" fill="none" strokeWidth="3" strokeLinecap="round" strokeDasharray={circumference.toFixed(1)} strokeDashoffset={(circumference * (1 - progress)).toFixed(1)} className="stroke-violet-600 dark:stroke-violet-400" /></svg>
        <span aria-hidden className="text-[11px] font-bold tabular-nums group-hover:hidden group-focus-visible:hidden">{Math.round(progress * 100)}%</span>
        <ArrowUp aria-hidden className="hidden size-5 group-hover:block group-focus-visible:block" />
      </button>
    </div>
  );
}
