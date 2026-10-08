/**
 * @registry
 * name: SVG Draw Checkbox
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Cases dont le contour et la coche se dessinent au trait SVG, comme tracés à la main, avec texte qui se barre.
 * prompt: Create hand-drawn SVG checkboxes for a todo list: each visually hidden input drives an SVG with a wobbly square path and a check path whose stroke-dashoffset animates from full to zero when checked (pathLength 1), the label gets a strike-through line that grows from left; peer-focus-visible ring. Reduced motion: no drawing animation. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const items = ['Book flights to Accra', 'Renew passport', 'Pack the camera', 'Download offline maps'];

export function SvgDrawCheckbox() {
  const [done, setDone] = useState<string[]>(['Renew passport']);

  return (
    <ul className="w-full max-w-xs space-y-3">
      {items.map((item) => {
        const checked = done.includes(item);
        return (
          <li key={item}>
            <label className="group flex cursor-pointer items-center gap-3">
              <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => setDone((list) => (checked ? list.filter((entry) => entry !== item) : [...list, item]))} />
              <svg viewBox="0 0 24 24" aria-hidden className="size-6 shrink-0 rounded peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500">
                <path d="M4 5 C9 3.5 15 4.5 20 4 C20.5 9 19.5 15 20 20 C15 20.5 9 19.5 4 20 C3.5 15 4.5 9 4 5 Z" fill="none" strokeWidth="1.8" className="stroke-zinc-400 dark:stroke-zinc-500" />
                <path d="M7 12.5 L10.5 16 L18 7" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" className="stroke-teal-600 transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none dark:stroke-teal-400" style={{ strokeDashoffset: checked ? 0 : 1 }} />
              </svg>
              <span className="relative text-sm text-zinc-800 dark:text-zinc-200">
                {item}
                <span aria-hidden className={`absolute left-0 top-1/2 h-0.5 bg-zinc-500 transition-all duration-500 motion-reduce:transition-none ${checked ? 'w-full' : 'w-0'}`} />
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
