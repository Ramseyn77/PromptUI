/**
 * @registry
 * name: Collectible Card
 * category: Cards
 * style: Dark
 * tags: featured, recent
 * description: Carte d'objet de collection avec reflet irisé qui suit le curseur, rareté, numéro d'édition et enchère.
 * prompt: Create a digital collectible card: an artwork area with an iridescent holographic sheen (conic + linear gradients with mix-blend overlay) whose angle follows the pointer, a rarity badge (Legendary), edition "#042 / 500", creator avatar, current bid and a Place bid button. Sheen static with reduced motion. Dark card in both themes.
 */
'use client';
import { useState, type PointerEvent } from 'react';

export function CollectibleCard() {
  const [angle, setAngle] = useState(135);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    setAngle(Math.round(((event.clientX - box.left) / box.width) * 180 + 45));
  }

  return (
    <article className="w-full max-w-xs rounded-3xl bg-zinc-900 p-3 text-white ring-1 ring-white/10">
      <div onPointerMove={move} onPointerLeave={() => setAngle(135)} className="relative aspect-square overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_40%,#f59e0b,transparent_35%),radial-gradient(circle_at_50%_60%,#7c3aed,transparent_60%),linear-gradient(#0c0a1f,#0c0a1f)]">
        <span aria-hidden className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-2xl border-4 border-amber-300/80 bg-amber-200/20 shadow-[0_0_60px_rgba(251,191,36,.5)]" />
        <span aria-hidden className="absolute inset-0 opacity-60 mix-blend-overlay transition-[background] duration-150" style={{ background: `linear-gradient(${angle}deg, transparent 20%, #f0abfc 35%, #67e8f9 45%, #fde68a 55%, transparent 70%)` }} />
        <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-950">Legendary</span>
      </div>
      <div className="px-2 pb-2 pt-3">
        <div className="flex items-center justify-between"><h3 className="font-semibold">Solar Relic</h3><span className="font-mono text-xs text-zinc-400">#042 / 500</span></div>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-400"><span aria-hidden className="size-4 rounded-full bg-gradient-to-br from-sky-400 to-violet-500" />by kofi.art</p>
        <div className="mt-4 flex items-end justify-between">
          <div><p className="text-[10px] uppercase tracking-wider text-zinc-500">Current bid</p><p className="font-mono text-lg font-semibold">1.24 ETH</p></div>
          <button type="button" className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200">Place bid</button>
        </div>
      </div>
    </article>
  );
}
