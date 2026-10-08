/**
 * @registry
 * name: Hamburger Swap
 * category: Toggle
 * style: Minimal
 * tags: recent
 * description: Bouton menu dont les trois barres se transforment en croix, avec panneau de liens qui se déplie.
 * prompt: Create a hamburger menu toggle (daisyUI swap-rotate spirit): three bars morph into an X (top and bottom rotate ±45deg toward the center, middle fades), aria-expanded and aria-controls on the button, and a small link panel below that expands with a grid-rows transition. Reduced motion: instant. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

export function HamburgerSwap() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const bar = 'absolute left-2.5 h-0.5 w-5 rounded-full bg-current transition duration-300 motion-reduce:transition-none';

  return (
    <div className="w-56">
      <button type="button" aria-expanded={open} aria-controls={id} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)} className="relative size-10 rounded-xl border border-zinc-200 bg-white text-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
        <span className={`${bar} top-[13px] ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
        <span className={`${bar} top-[19px] ${open ? 'opacity-0' : ''}`} />
        <span className={`${bar} top-[25px] ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
      </button>
      <div id={id} className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <nav aria-label="Main" className="overflow-hidden">
          <ul className="mt-2 rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
            {['Overview', 'Projects', 'Team', 'Settings'].map((item) => <li key={item}><a href={`#${item.toLowerCase()}`} tabIndex={open ? 0 : -1} className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">{item}</a></li>)}
          </ul>
        </nav>
      </div>
    </div>
  );
}
