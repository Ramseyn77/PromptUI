/**
 * @registry
 * name: Size Checkbox Grid
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Grille de pointures à cocher pour filtrer un catalogue, tailles épuisées barrées et désactivées.
 * prompt: Create a shoe size filter: a grid of square checkbox tiles (EU 36 to 46), checked tiles are solid dark, out-of-stock sizes are disabled with a diagonal strike-through and aria-disabled text; a "Clear" link resets; the summary line lists selected sizes. 5 columns on mobile, 6 from sm. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
const soldOut = new Set([37, 44]);

export function SizeCheckboxGrid() {
  const [on, setOn] = useState<number[]>([40, 41]);

  return (
    <fieldset className="w-full max-w-xs">
      <div className="flex items-center justify-between">
        <legend className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Size (EU)</legend>
        <button type="button" onClick={() => setOn([])} className="text-xs font-medium text-teal-700 hover:underline dark:text-teal-400">Clear</button>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
        {sizes.map((size) => {
          const disabled = soldOut.has(size);
          const checked = on.includes(size);
          return (
            <label key={size} className={`relative grid h-11 place-items-center overflow-hidden rounded-lg border text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 ${disabled ? 'cursor-not-allowed border-zinc-200 text-zinc-300 dark:border-zinc-800 dark:text-zinc-600' : checked ? 'cursor-pointer border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950' : 'cursor-pointer border-zinc-300 text-zinc-800 hover:border-zinc-500 dark:border-zinc-700 dark:text-zinc-200'}`}>
              <input type="checkbox" className="sr-only" disabled={disabled} checked={checked} onChange={() => setOn((list) => (checked ? list.filter((item) => item !== size) : [...list, size]))} />
              {size}
              {disabled && <><span className="sr-only"> sold out</span><span aria-hidden className="absolute h-px w-[140%] rotate-[-35deg] bg-zinc-300 dark:bg-zinc-700" /></>}
            </label>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{on.length ? `Selected: ${[...on].sort((a, b) => a - b).join(', ')}` : 'No size selected'}</p>
    </fieldset>
  );
}
