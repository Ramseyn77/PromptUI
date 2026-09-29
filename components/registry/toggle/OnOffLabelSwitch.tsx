/**
 * @registry
 * name: On Off Label Switch
 * category: Toggle
 * style: Dark
 * tags: recent
 * description: Grand interrupteur avec textes ON et OFF dans la piste, le bouton glisse sur le mot inactif.
 * prompt: Create a wide switch with "ON" and "OFF" text inside the track on each side; the knob slides over the inactive word, the active word brightens, track color changes (emerald on, zinc off); role="switch", aria-checked, labelled by a visible caption. Light and dark mode.
 */
'use client';
import { useState } from 'react';

export function OnOffLabelSwitch() {
  const [on, setOn] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <span id="maintenance-label" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Maintenance mode</span>
      <button type="button" role="switch" aria-checked={on} aria-labelledby="maintenance-label" onClick={() => setOn((value) => !value)} className={`relative flex h-10 w-24 items-center justify-between rounded-full px-3 font-mono text-[11px] font-bold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${on ? 'bg-emerald-600' : 'bg-zinc-800 dark:bg-zinc-700'}`}>
        <span aria-hidden className={on ? 'text-white' : 'text-transparent'}>ON</span>
        <span aria-hidden className={on ? 'text-transparent' : 'text-zinc-300'}>OFF</span>
        <span className={`absolute top-1 size-8 rounded-full bg-white shadow-md transition-all duration-300 ease-[cubic-bezier(.34,1.3,.64,1)] ${on ? 'left-[3.75rem]' : 'left-1'}`} />
      </button>
    </div>
  );
}
