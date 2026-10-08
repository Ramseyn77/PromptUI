/**
 * @registry
 * name: Jelly Checkbox
 * category: Checkboxes
 * style: Gradient
 * tags: recent
 * description: Case à cocher gélatineuse qui se déforme et rebondit à la sélection, coche dessinée.
 * prompt: Create a jelly checkbox: native sr-only input with a custom box that plays a squash-and-stretch keyframe (scaleX/scaleY wobble) when checked, fills with a violet-to-pink gradient and draws an SVG check via stroke-dashoffset. Three example options, focus ring, reduced-motion safe. Light and dark mode.
 */
'use client';
import { useState } from 'react';

export function JellyCheckbox() {
  const [checked, setChecked] = useState<string[]>(['Newsletter']);

  return (
    <>
      <style>{`@keyframes pui-jelly{0%{transform:scale(1)}30%{transform:scale(1.25,.75)}40%{transform:scale(.75,1.25)}50%{transform:scale(1.15,.85)}65%{transform:scale(.95,1.05)}75%{transform:scale(1.05,.95)}100%{transform:scale(1)}}`}</style>
      <fieldset className="space-y-3">
        <legend className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">Notifications</legend>
        {['Newsletter', 'Product updates', 'Weekly digest'].map((label) => {
          const on = checked.includes(label);
          return (
            <label key={label} className="flex cursor-pointer items-center gap-3 text-sm text-zinc-800 dark:text-zinc-200">
              <input type="checkbox" className="peer sr-only" checked={on} onChange={() => setChecked((current) => (on ? current.filter((item) => item !== label) : [...current, label]))} />
              <span className={`grid size-6 place-items-center rounded-lg border-2 transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-violet-500/30 ${on ? 'border-transparent bg-gradient-to-br from-violet-500 to-pink-500 motion-safe:animate-[pui-jelly_.5s]' : 'border-zinc-300 dark:border-zinc-600'}`}>
                <svg viewBox="0 0 16 16" aria-hidden className="size-3.5"><path d="M3 8.5l3.2 3L13 5" pathLength={1} strokeDasharray={1} fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="transition-[stroke-dashoffset] delay-100 duration-300" style={{ strokeDashoffset: on ? 0 : 1 }} /></svg>
              </span>
              {label}
            </label>
          );
        })}
      </fieldset>
    </>
  );
}
