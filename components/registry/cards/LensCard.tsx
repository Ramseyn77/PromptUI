/**
 * @registry
 * name: Lens Card
 * category: Cards
 * style: SaaS
 * tags: featured, recent
 * description: Carte produit avec une loupe circulaire qui grossit le visuel sous le curseur.
 * prompt: Create a product card whose artwork shows a circular magnifying lens following the pointer: the artwork is rendered twice, the top copy is scaled 2x around the pointer and clipped with clip-path circle(70px at x y). Lens hides on pointer leave; the artwork stays fully readable without it (keyboard and touch). Below: title, description and price row. Light and dark mode.
 */
'use client';
import { useState, type PointerEvent } from 'react';

function Artwork() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,#fda4af,transparent_40%),radial-gradient(circle_at_75%_65%,#5eead4,transparent_45%),linear-gradient(135deg,#1e1b4b,#0f172a)]">
      <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
        <p className="font-mono text-[10px] uppercase tracking-widest text-teal-200">Aurora · Series 04</p>
        <p className="mt-1 text-lg font-bold text-white">Limited print</p>
        <div className="mt-3 grid grid-cols-6 gap-1">
          {Array.from({ length: 12 }, (_, index) => <span key={index} className="h-2 rounded-full bg-white/40" style={{ opacity: 0.3 + (index % 6) * 0.12 }} />)}
        </div>
      </div>
    </div>
  );
}

export function LensCard() {
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);

  function move(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setLens({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }

  return (
    <article className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div role="img" aria-label="Aurora limited print artwork, hover to magnify" onPointerMove={move} onPointerLeave={() => setLens(null)} className="relative h-56 cursor-zoom-in overflow-hidden">
        <Artwork />
        {lens && (
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ clipPath: `circle(70px at ${lens.x}px ${lens.y}px)` }}>
            <div className="absolute inset-0" style={{ transform: 'scale(2)', transformOrigin: `${lens.x}px ${lens.y}px` }}><Artwork /></div>
            <div className="absolute size-35 rounded-full ring-2 ring-white/70" style={{ left: lens.x - 70, top: lens.y - 70 }} />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Aurora print</h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Giclée on cotton paper, signed and numbered.</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-zinc-950 dark:text-zinc-50">€149</span>
          <button type="button" className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-500">Add to cart</button>
        </div>
      </div>
    </article>
  );
}
