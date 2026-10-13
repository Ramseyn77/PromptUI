/**
 * @registry
 * name: Parallax Layers Hero
 * category: Hero
 * style: Gradient
 * tags: recent
 * description: Hero paysage en couches (ciel, soleil, montagnes, collines) qui se décalent en parallaxe selon le pointeur, titre au premier plan.
 * prompt: Create a parallax landscape hero: layered SVG shapes (gradient sky, sun, far mountains, near mountains, hills) inside a rounded panel; moving the pointer over it shifts each layer by a different amount (depth factor) with a smooth transition, and the layers return to center on leave; the headline and CTA sit on top; deterministic shapes; disabled with reduced motion; works in light (dawn palette) and dark (night palette with stars).
 */
'use client';
import { useState, type PointerEvent } from 'react';

const stars = Array.from({ length: 24 }, (_, index) => ({ x: (index * 41) % 100, y: (index * 23) % 45, r: 0.6 + (index % 3) * 0.3 }));

export function ParallaxLayersHero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const layer = (depth: number) => ({ transform: `translate(${(offset.x * depth * 0.12).toFixed(2)}px, ${(offset.y * depth * 0.06).toFixed(2)}px)` });

  function move(event: PointerEvent<HTMLElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({ x: ((event.clientX - rect.left) / rect.width - 0.5) * 2, y: ((event.clientY - rect.top) / rect.height - 0.5) * 2 });
  }

  return (
    <section onPointerMove={move} onPointerLeave={() => setOffset({ x: 0, y: 0 })} className="relative h-[26rem] w-full max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-b from-sky-300 via-rose-200 to-amber-100 dark:from-indigo-950 dark:via-violet-950 dark:to-zinc-900">
      <svg aria-hidden viewBox="0 0 100 60" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full">
        <g className="hidden transition-transform duration-500 ease-out dark:inline" style={layer(-2)}>{stars.map((star) => <circle key={`${star.x}-${star.y}`} cx={star.x} cy={star.y} r={star.r * 0.3} className="fill-white/80" />)}</g>
        <circle cx="70" cy="22" r="7" className="fill-amber-300 transition-transform duration-500 ease-out dark:fill-zinc-100" style={layer(-4)} />
        <path d="M-10 60 L10 30 L22 42 L38 22 L52 40 L66 26 L82 44 L96 30 L112 60 Z" className="fill-violet-300/80 transition-transform duration-500 ease-out dark:fill-violet-900/80" style={layer(6)} />
        <path d="M-10 60 L6 40 L20 50 L34 36 L50 52 L64 38 L80 50 L94 40 L112 60 Z" className="fill-indigo-400/80 transition-transform duration-500 ease-out dark:fill-indigo-950" style={layer(12)} />
        <path d="M-10 60 C10 48, 30 54, 50 50 S 90 46, 112 52 L112 62 L-10 62 Z" className="fill-emerald-500/80 transition-transform duration-500 ease-out dark:fill-zinc-950" style={layer(22)} />
      </svg>
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="rounded-full bg-white/40 px-3 py-1 text-xs font-medium text-zinc-800 backdrop-blur dark:bg-white/10 dark:text-zinc-200">Trail maps · offline</p>
        <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-zinc-950 drop-shadow-sm sm:text-5xl dark:text-white">Go further. Get lost less.</h1>
        <a href="#" className="mt-6 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg dark:bg-white dark:text-zinc-950">Plan a hike</a>
      </div>
    </section>
  );
}
