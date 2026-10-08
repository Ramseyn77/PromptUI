/**
 * @registry
 * name: Circle Checkbox
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Cases rondes dont le contour se trace en cercle puis la coche apparaît, façon liste de courses.
 * prompt: Create circular checkboxes for a shopping list: SVG ring that draws around (stroke-dashoffset) when checked, then a check path draws inside with a delay; the item text fades and strikes through. Native sr-only inputs, focus-visible ring, reduced-motion safe. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const items = ['Avocados', 'Sourdough bread', 'Oat milk', 'Coffee beans'];

export function CircleCheckbox() {
  const [done, setDone] = useState(['Oat milk']);

  return (
    <fieldset className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <legend className="sr-only">Shopping list</legend>
      <p className="text-sm font-semibold text-zinc-900 dark:text-white">Groceries</p>
      <div className="mt-3 space-y-3">
        {items.map((item) => {
          const on = done.includes(item);
          return (
            <label key={item} className="flex cursor-pointer items-center gap-3">
              <input type="checkbox" className="peer sr-only" checked={on} onChange={() => setDone((current) => (on ? current.filter((value) => value !== item) : [...current, item]))} />
              <svg viewBox="0 0 24 24" aria-hidden className="size-6 shrink-0 rounded-full peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500">
                <circle cx="12" cy="12" r="10" fill="none" strokeWidth="2" className="stroke-zinc-300 dark:stroke-zinc-600" />
                <circle cx="12" cy="12" r="10" fill="none" strokeWidth="2" pathLength={1} strokeDasharray={1} transform="rotate(-90 12 12)" className="stroke-teal-500 transition-[stroke-dashoffset] duration-500 ease-out" style={{ strokeDashoffset: on ? 0 : 1 }} />
                <path d="M7.5 12.5l3 3 6-6.5" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} className="stroke-teal-500 transition-[stroke-dashoffset] duration-300" style={{ strokeDashoffset: on ? 0 : 1, transitionDelay: on ? '350ms' : '0ms' }} />
              </svg>
              <span className={`text-sm transition ${on ? 'text-zinc-400 line-through' : 'text-zinc-800 dark:text-zinc-200'}`}>{item}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
