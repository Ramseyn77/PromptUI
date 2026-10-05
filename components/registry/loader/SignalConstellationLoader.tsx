/**
 * @registry
 * name: Signal Constellation Loader
 * category: Loader
 * style: Dark
 * tags: recent
 * description: Loader en forme de constellation dont les noeuds propagent un signal lumineux Anime.js.
 * prompt: Create an original constellation loader with seven connected nodes. Use Anime.js to pulse each node in a traveling sequence while the center halo breathes. Keep the animation scoped and reverted on unmount, show a static constellation with prefers-reduced-motion, expose role="status" with a readable loading message, and keep the composition responsive in light and dark mode.
 */
'use client';

import { animate, createScope, stagger, utils } from 'animejs';
import { useEffect, useRef } from 'react';

const nodes = [
  ['18%', '54%'],
  ['31%', '27%'],
  ['49%', '42%'],
  ['66%', '20%'],
  ['82%', '45%'],
  ['63%', '70%'],
  ['35%', '76%'],
] as const;

export function SignalConstellationLoader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const scope = createScope({
      root,
      mediaQueries: { reduceMotion: '(prefers-reduced-motion: reduce)' },
    }).add((self) => {
      // Element arrays rather than selectors: anime.js detects NodeLists with instanceof,
      // which fails when the component renders inside another document (iframe preview).
      const nodes = Array.from(root.current?.querySelectorAll<HTMLElement>('.pui-signal-node') ?? []);
      const halo = Array.from(root.current?.querySelectorAll<HTMLElement>('.pui-signal-halo') ?? []);
      if (self?.matches.reduceMotion) {
        utils.set(nodes, { opacity: 1, scale: 1 });
        utils.set(halo, { opacity: 0.35, scale: 1 });
        return;
      }

      animate(nodes, {
        opacity: [0.3, 1],
        scale: [0.7, 1.45],
        delay: stagger(125),
        duration: 650,
        loop: true,
        alternate: true,
        ease: 'inOut(3)',
      });

      animate(halo, {
        opacity: [0.12, 0.5],
        scale: [0.72, 1.25],
        duration: 1300,
        loop: true,
        alternate: true,
        ease: 'inOutSine',
      });
    });

    return () => scope.revert();
  }, []);

  return (
    <div ref={root} role="status" aria-live="polite" className="flex w-full max-w-sm flex-col items-center rounded-[2rem] border border-zinc-800 bg-zinc-950 px-5 py-8 text-white shadow-2xl shadow-violet-950/20 sm:px-8">
      <div aria-hidden className="relative aspect-[5/3] w-full max-w-xs overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_center,rgba(20,184,166,.13),transparent_62%)]">
        <svg viewBox="0 0 100 60" className="absolute inset-0 size-full text-zinc-700" fill="none">
          <path d="M18 32 31 16 49 25 66 12 82 27 63 42 35 46 18 32M49 25 63 42M31 16 35 46" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 2" />
        </svg>
        <span className="pui-signal-halo absolute left-[49%] top-[42%] size-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-400/40 bg-teal-400/10 blur-[1px]" />
        {nodes.map(([left, top], index) => (
          <span key={`${left}-${top}`} className="pui-signal-node absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-950 bg-gradient-to-br from-teal-300 to-violet-500 shadow-[0_0_18px_rgba(45,212,191,.65)] will-change-transform" style={{ left, top }}>
            <span className="sr-only">Signal node {index + 1}</span>
          </span>
        ))}
      </div>
      <p className="mt-5 text-sm font-semibold tracking-wide">Mapping the next connection…</p>
      <p className="mt-1 text-xs text-zinc-400">Synchronizing seven signal points</p>
    </div>
  );
}
