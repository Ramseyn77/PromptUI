/**
 * @registry
 * name: Marked Range Slider
 * category: Forms
 * style: SaaS
 * tags: recent
 * description: Curseur à paliers façon Mantine avec repères étiquetés, bulle de valeur et piste colorée jusqu'au pouce.
 * prompt: Create a Mantine-style marked slider for choosing storage (10 GB to 2 TB): a native range input styled with a filled track (linear-gradient by percent), labelled marks under specific steps that are clickable, a value bubble above the thumb, and the monthly price derived from the step shown beside the label; aria-valuetext gives the readable value. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const steps = [['10 GB', 0], ['50 GB', 4], ['100 GB', 8], ['500 GB', 18], ['1 TB', 30], ['2 TB', 48]] as const;

export function MarkedRangeSlider() {
  const id = useId();
  const [index, setIndex] = useState(2);
  const pct = (index / (steps.length - 1)) * 100;
  const [label, price] = steps[index];

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Storage</label>
        <span className="text-sm text-zinc-500">{price ? `$${price}/mo` : 'Free'}</span>
      </div>
      <div className="relative mt-9">
        <span aria-hidden className="absolute -top-8 -translate-x-1/2 rounded-md bg-zinc-900 px-2 py-0.5 text-xs font-semibold text-white transition-[left] dark:bg-white dark:text-zinc-900" style={{ left: `calc(${pct}% + ${(50 - pct) * 0.16}px)` }}>{label}</span>
        <input id={id} type="range" min={0} max={steps.length - 1} step={1} value={index} aria-valuetext={`${label}, ${price ? `$${price} per month` : 'free'}`} onChange={(event) => setIndex(Number(event.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full accent-teal-600 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-teal-600 [&::-webkit-slider-thumb]:bg-white" style={{ background: `linear-gradient(to right, #0d9488 ${pct}%, rgb(161 161 170 / .35) ${pct}%)` }} />
        <div className="relative mt-2 h-5">
          {steps.map(([mark], i) => <button key={mark} type="button" onClick={() => setIndex(i)} className={`absolute -translate-x-1/2 text-[11px] ${i === index ? 'font-semibold text-teal-700 dark:text-teal-400' : 'text-zinc-500'}`} style={{ left: `${(i / (steps.length - 1)) * 100}%` }}>{mark}</button>)}
        </div>
      </div>
    </div>
  );
}
