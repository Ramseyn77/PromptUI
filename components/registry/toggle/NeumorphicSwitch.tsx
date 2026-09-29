/**
 * @registry
 * name: Neumorphic Switch
 * category: Toggle
 * style: Minimal
 * tags: recent
 * description: Interrupteur en relief doux (neumorphisme) avec voyant lumineux et bouton qui s enfonce.
 * prompt: Create a neumorphic power switch on a soft surface: a pill track with inset shadows, a raised knob with outer highlight/shadow pair that slides, and an LED dot that glows teal when on; role="switch" + visible label. Separate light (#e8ebf0) and dark (#1f2226) neumorphic palettes.
 */
'use client';
import { useState } from 'react';

export function NeumorphicSwitch() {
  const [on, setOn] = useState(true);

  return (
    <div className="flex items-center gap-5 rounded-3xl bg-[#e8ebf0] px-10 py-8 dark:bg-[#1f2226]">
      <span id="neu-label" className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Power</span>
      <button type="button" role="switch" aria-checked={on} aria-labelledby="neu-label" onClick={() => setOn((value) => !value)} className="relative h-12 w-24 rounded-full bg-[#e8ebf0] shadow-[inset_4px_4px_8px_#c5c8cc,inset_-4px_-4px_8px_#ffffff] outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:bg-[#1f2226] dark:shadow-[inset_4px_4px_8px_#141619,inset_-4px_-4px_8px_#2a2e33]">
        <span className={`absolute left-1.5 top-1.5 grid size-9 place-items-center rounded-full bg-[#e8ebf0] shadow-[4px_4px_8px_#c5c8cc,-4px_-4px_8px_#ffffff] transition-transform duration-300 ease-[cubic-bezier(.34,1.3,.64,1)] dark:bg-[#1f2226] dark:shadow-[4px_4px_8px_#141619,-4px_-4px_8px_#2a2e33] ${on ? 'translate-x-12' : ''}`}>
          <span className={`size-2.5 rounded-full transition ${on ? 'bg-teal-400 shadow-[0_0_10px_2px_rgba(45,212,191,.8)]' : 'bg-zinc-400 dark:bg-zinc-600'}`} />
        </span>
      </button>
    </div>
  );
}
