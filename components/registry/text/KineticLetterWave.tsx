/**
 * @registry
 * name: Kinetic Letter Wave
 * category: Text
 * style: Gradient
 * tags: featured, recent
 * description: Titre cinétique dont les lettres surgissent en vague depuis le centre avec un bouton pour rejouer l'animation.
 * prompt: Create an original kinetic headline reading "Ideas move interfaces". Split the visible heading into individually animated letters that rise, rotate and sharpen in a center-out wave powered by Anime.js. Include an accessible full-text label and a Replay button. Scope and clean up every animation, preserve a fully readable static state with prefers-reduced-motion, and support light, dark, mobile, tablet and desktop layouts.
 */
'use client';

import { animate, createScope, stagger, utils } from 'animejs';
import { useEffect, useRef, useState } from 'react';

const words = ['Ideas', 'move', 'interfaces'];
const label = words.join(' ');

export function KineticLetterWave() {
  const root = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!root.current) return;

    const scope = createScope({
      root,
      mediaQueries: { reduceMotion: '(prefers-reduced-motion: reduce)' },
    }).add((self) => {
      // Element array rather than a selector: anime.js detects NodeLists with instanceof,
      // which fails when the component renders inside another document (iframe preview).
      const letters = Array.from(root.current?.querySelectorAll<HTMLElement>('.pui-kinetic-letter') ?? []);
      if (self?.matches.reduceMotion) {
        utils.set(letters, { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' });
        return;
      }

      animate(letters, {
        opacity: [0, 1],
        y: ['1.1em', 0],
        rotate: [() => `${Math.random() * 18 - 9}deg`, '0deg'],
        filter: ['blur(10px)', 'blur(0px)'],
        delay: stagger(42, { from: 'center' }),
        duration: 760,
        ease: 'out(4)',
      });
    });

    return () => scope.revert();
  }, [run]);

  return (
    <section ref={root} className="w-full max-w-3xl rounded-[2rem] border border-zinc-200 bg-white px-5 py-10 text-center shadow-sm sm:px-10 sm:py-14 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400">Motion study 01</p>
      <h2 aria-label={label} className="flex flex-wrap justify-center gap-x-[0.18em] gap-y-1 text-4xl font-black sm:text-6xl leading-none tracking-tight text-zinc-950 dark:text-white">
        {words.map((word) => (
          <span key={word} aria-hidden className="whitespace-nowrap">
            {[...word].map((letter, index) => (
              <span key={`${letter}-${index}`} className="pui-kinetic-letter inline-block bg-gradient-to-br from-zinc-950 via-teal-600 to-violet-600 bg-clip-text text-transparent will-change-transform dark:from-white dark:via-teal-300 dark:to-violet-400">
                {letter}
              </span>
            ))}
          </span>
        ))}
      </h2>
      <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">A centered wave turns a simple message into a deliberate entrance.</p>
      <button type="button" onClick={() => setRun((value) => value + 1)} className="mt-6 rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-teal-500 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-teal-400 dark:hover:text-teal-300 dark:focus-visible:ring-offset-zinc-950">
        Replay animation
      </button>
    </section>
  );
}
