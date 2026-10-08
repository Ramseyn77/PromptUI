/**
 * @registry
 * name: Dual Range Slider
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Curseur de fourchette de prix à deux poignées avec zone active colorée et champs numériques liés.
 * prompt: Create a dual-thumb price range slider from two overlaid native range inputs (pointer-events only on thumbs), a colored active track between them, min gap enforcement, and two linked number inputs that stay in sync; labels "Minimum price"/"Maximum price" for screen readers. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const MIN = 0;
const MAX = 1000;
const GAP = 50;

export function DualRangeSlider() {
  const [low, setLow] = useState(150);
  const [high, setHigh] = useState(700);
  const thumb = 'pointer-events-none absolute inset-x-0 top-1/2 h-0 w-full -translate-y-1/2 appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-teal-600 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-teal-600 [&::-webkit-slider-thumb]:shadow';
  const box = 'w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white';

  return (
    <fieldset className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <legend className="sr-only">Price range</legend>
      <p className="text-sm font-semibold text-zinc-900 dark:text-white">Price range</p>
      <div className="relative mt-5 h-5">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-teal-500" style={{ left: `${(low / MAX) * 100}%`, right: `${100 - (high / MAX) * 100}%` }} />
        <input type="range" aria-label="Minimum price" min={MIN} max={MAX} step={10} value={low} onChange={(event) => setLow(Math.min(Number(event.target.value), high - GAP))} className={thumb} />
        <input type="range" aria-label="Maximum price" min={MIN} max={MAX} step={10} value={high} onChange={(event) => setHigh(Math.max(Number(event.target.value), low + GAP))} className={thumb} />
      </div>
      <div className="mt-5 flex items-center gap-3">
        <label className="flex-1 text-xs text-zinc-500">Min<input type="number" value={low} onChange={(event) => setLow(Math.max(MIN, Math.min(Number(event.target.value), high - GAP)))} className={box} /></label>
        <span className="pt-4 text-zinc-400">–</span>
        <label className="flex-1 text-xs text-zinc-500">Max<input type="number" value={high} onChange={(event) => setHigh(Math.min(MAX, Math.max(Number(event.target.value), low + GAP)))} className={box} /></label>
      </div>
    </fieldset>
  );
}
