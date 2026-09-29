/**
 * @registry
 * name: Morph Check Switch
 * category: Toggle
 * style: Minimal
 * tags: recent
 * description: Interrupteur dont l icone du bouton se transforme d une croix en coche en glissant.
 * prompt: Create a switch whose knob icon morphs between an X and a check: two SVG paths animated with stroke-dashoffset (one draws while the other erases) as the knob slides; track turns emerald when on and rose-tinted when off. role="switch", aria-checked, visible label. Light and dark mode.
 */
'use client';
import { useState } from 'react';

export function MorphCheckSwitch() {
  const [on, setOn] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <span id="morph-label" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Public profile</span>
      <button type="button" role="switch" aria-checked={on} aria-labelledby="morph-label" onClick={() => setOn((value) => !value)} className={`relative h-9 w-16 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${on ? 'bg-emerald-500' : 'bg-rose-200 dark:bg-rose-500/30'}`}>
        <span className={`absolute left-1 top-1 grid size-7 place-items-center rounded-full bg-white shadow transition-transform duration-300 ease-[cubic-bezier(.34,1.3,.64,1)] ${on ? 'translate-x-7' : ''}`}>
          <svg viewBox="0 0 16 16" aria-hidden className="size-3.5">
            <path d="M4 4l8 8M12 4l-8 8" pathLength={1} strokeDasharray={1} fill="none" stroke="#f43f5e" strokeWidth="2.2" strokeLinecap="round" className="transition-[stroke-dashoffset] duration-300" style={{ strokeDashoffset: on ? 1 : 0 }} />
            <path d="M3 8.5l3.2 3L13 5" pathLength={1} strokeDasharray={1} fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-[stroke-dashoffset] delay-150 duration-300" style={{ strokeDashoffset: on ? 0 : 1 }} />
          </svg>
        </span>
      </button>
    </div>
  );
}
