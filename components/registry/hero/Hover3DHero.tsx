/**
 * @registry
 * name: Hover 3D Hero
 * category: Hero
 * style: Glass
 * tags: featured, recent
 * description: Hero avec carte produit en verre qui s'incline en 3D selon la position du curseur, reflet compris, façon daisyUI hover-3d.
 * prompt: Create a hero with a glass product card that tilts in 3D following the pointer (rotateX/rotateY up to 12deg computed from pointer position, with a moving radial highlight), resetting smoothly on leave; copy column with headline, subtitle and CTAs; tilt disabled with reduced motion and on touch. Two columns from lg. Gradient background, light and dark mode.
 */
'use client';
import { useState, type PointerEvent } from 'react';

export function Hover3DHero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width;
    const py = (event.clientY - box.top) / box.height;
    setTilt({ x: (0.5 - py) * 24, y: (px - 0.5) * 24, gx: px * 100, gy: py * 100 });
  }

  return (
    <section className="grid w-full max-w-5xl items-center gap-10 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-100 via-violet-100 to-pink-100 px-6 py-12 lg:grid-cols-2 lg:px-12 dark:from-indigo-950 dark:via-violet-950 dark:to-pink-950">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">A card for people who travel light.</h1>
        <p className="mt-4 max-w-md text-zinc-700 dark:text-zinc-300">No FX fees in 160 countries, instant virtual cards and cashback on trains.</p>
        <div className="mt-7 flex gap-3"><a href="#apply" className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Apply in 3 minutes</a><a href="#compare" className="rounded-xl px-5 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">Compare plans →</a></div>
      </div>
      <div onPointerMove={move} onPointerLeave={() => setTilt({ x: 0, y: 0, gx: 50, gy: 50 })} className="grid place-items-center py-6 [perspective:900px]">
        <div className="relative aspect-[1.586] w-full max-w-sm rounded-3xl border border-white/50 bg-white/30 p-6 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl transition-transform duration-200 ease-out dark:border-white/15 dark:bg-white/10" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl" style={{ background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,.55), transparent 45%)` }} />
          <div className="relative flex h-full flex-col justify-between text-zinc-900 dark:text-white">
            <div className="flex justify-between"><span className="font-bold tracking-wide">nomad</span><span aria-hidden className="h-7 w-10 rounded-md bg-gradient-to-br from-amber-200 to-amber-500" /></div>
            <p className="font-mono text-lg tracking-[0.2em]">•••• 2048</p>
            <div className="flex justify-between text-xs"><span>LEA MARTIN</span><span>09/30</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
