/**
 * @registry
 * name: Stepper Tooltips
 * category: Tooltips
 * style: Minimal
 * tags: recent
 * description: Points d'étapes compacts dont chacun révèle au survol son nom, son état et sa date.
 * prompt: Create a compact progress stepper of 6 dots connected by a line: completed dots are teal, the current one pulses, upcoming are gray; each dot is a focusable button whose tooltip shows step name, status and date. Clicking a completed step moves "current" back to it. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const steps = [
  ['Order placed', 'Oct 1'], ['Payment confirmed', 'Oct 1'], ['Packed', 'Oct 2'], ['Shipped', 'Oct 3'], ['Out for delivery', 'Oct 5'], ['Delivered', 'Oct 5'],
];

export function StepperTooltips() {
  const [current, setCurrent] = useState(3);

  return (
    <div className="w-full max-w-md pt-16">
      <style>{`@keyframes pui-step-pulse{0%{box-shadow:0 0 0 0 rgba(20,184,166,.5)}100%{box-shadow:0 0 0 10px rgba(20,184,166,0)}}`}</style>
      <ol className="relative flex items-center justify-between">
        <span aria-hidden className="absolute inset-x-2 top-1/2 h-0.5 -translate-y-1/2 bg-zinc-200 dark:bg-zinc-800" />
        <span aria-hidden className="absolute left-2 top-1/2 h-0.5 -translate-y-1/2 bg-teal-500 transition-all" style={{ width: `calc(${(current / (steps.length - 1)) * 100}% - 1rem)` }} />
        {steps.map(([name, date], index) => {
          const status = index < current ? 'Done' : index === current ? 'In progress' : 'Upcoming';
          return (
            <li key={name} className="group relative">
              <button type="button" aria-label={`${name}: ${status}`} onClick={() => index <= current && setCurrent(index)} className={`relative block size-4 rounded-full border-2 outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${index < current ? 'border-teal-500 bg-teal-500' : index === current ? 'border-teal-500 bg-white motion-safe:animate-[pui-step-pulse_1.6s_infinite] dark:bg-zinc-950' : 'border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950'}`} />
              <span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 -translate-x-1/2 whitespace-nowrap rounded-lg bg-zinc-900 px-2.5 py-1.5 text-center text-xs text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-white dark:text-zinc-900">
                <span className="block font-semibold">{name}</span>
                <span className="block opacity-70">{status} · {date}</span>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">{steps[current][0]}</p>
    </div>
  );
}
