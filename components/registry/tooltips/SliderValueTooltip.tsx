/**
 * @registry
 * name: Slider Value Tooltip
 * category: Tooltips
 * style: SaaS
 * tags: recent
 * description: Curseur dont la valeur s affiche dans une bulle qui suit la poignee pendant le glissement.
 * prompt: Create a range slider with a value bubble that follows the thumb (left computed from the value with thumb-width compensation), grows while dragging/focused and shows the formatted value (e.g. "68%"); aria-valuetext mirrors it. Custom track fill, light and dark mode.
 */
'use client';
import { useState } from 'react';

export function SliderValueTooltip() {
  const [value, setValue] = useState(68);
  const [active, setActive] = useState(false);
  const percent = value;

  return (
    <div className="w-full max-w-sm pt-10">
      <label htmlFor="volume-slider" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Volume</label>
      <div className="relative mt-3">
        <span aria-hidden className={`pointer-events-none absolute -top-9 -translate-x-1/2 rounded-lg bg-zinc-900 px-2 py-1 text-xs font-semibold tabular-nums text-white transition-transform dark:bg-white dark:text-zinc-900 ${active ? 'scale-110' : 'scale-100'}`} style={{ left: `calc(${percent}% + ${(50 - percent) * 0.2}px)` }}>
          {value}%
          <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-inherit" />
        </span>
        <input
          id="volume-slider"
          type="range"
          min={0}
          max={100}
          value={value}
          aria-valuetext={`${value}%`}
          onChange={(event) => setValue(Number(event.target.value))}
          onPointerDown={() => setActive(true)}
          onPointerUp={() => setActive(false)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          className="h-2 w-full cursor-pointer appearance-none rounded-full accent-teal-600"
          style={{ background: `linear-gradient(to right, #14b8a6 ${percent}%, rgb(161 161 170 / .3) ${percent}%)` }}
        />
      </div>
    </div>
  );
}
