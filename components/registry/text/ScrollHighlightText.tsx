/**
 * @registry
 * name: Scroll Highlight Text
 * category: Text
 * style: Editorial
 * tags: featured, recent
 * description: Paragraphe manifeste dont les mots s'éclairent un à un au fil du défilement (opacité progressive), dans un panneau défilant autonome.
 * prompt: Create a scroll-linked text reveal: inside a self-contained scrollable panel (data-lenis-prevent) a large serif manifesto paragraph is pinned (sticky) while the panel scrolls; each word's opacity goes from 0.15 to 1 as scroll progress passes its index, so the paragraph "reads itself" as you scroll; a thin progress bar at the top; the full text is readable by screen readers at all times (opacity only); reduced motion shows the text fully lit. Light (paper) and dark mode.
 */
'use client';
import { useState } from 'react';

const text = 'We build tools for people who care about the details. Interfaces that feel calm, honest and fast. Components you can read, own and change. Nothing hidden, nothing borrowed, nothing you have to fight. Just good defaults, sharp edges where they matter, and room for your own ideas.';
const words = text.split(' ');

export function ScrollHighlightText() {
  const [progress, setProgress] = useState(0.35);

  return (
    <div className="relative h-80 w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#f5f0e6] dark:bg-zinc-950" onScroll={(event) => { const node = event.currentTarget; setProgress(node.scrollTop / Math.max(1, node.scrollHeight - node.clientHeight)); }} data-lenis-prevent>
      <div className="h-[260%]">
        <div className="sticky top-0 flex h-80 flex-col justify-center px-8">
          <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-zinc-900/10 dark:bg-white/10"><div className="h-full bg-amber-500" style={{ width: `${(progress * 100).toFixed(1)}%` }} /></div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Manifesto · scroll inside</p>
          <p className="mt-4 font-serif text-2xl leading-snug text-zinc-950 sm:text-3xl dark:text-white">
            {words.map((word, index) => {
              const lit = Math.min(1, Math.max(0.15, (progress * words.length * 1.15 - index) + 0.15));
              return <span key={index} className="transition-opacity duration-150 motion-reduce:!opacity-100" style={{ opacity: lit }}>{word} </span>;
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
