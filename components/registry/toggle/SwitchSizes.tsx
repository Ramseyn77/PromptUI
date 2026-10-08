/**
 * @registry
 * name: Switch Sizes
 * category: Toggle
 * style: Minimal
 * tags: recent
 * description: Interrupteurs en quatre tailles et couleurs, avec étiquette, état désactivé et icône dans le bouton.
 * prompt: Create a switch scale like Chakra/Mantine: four sizes (xs, sm, md, lg) in different colors (teal, violet, amber, rose), each with a visible label, plus one disabled switch and one with a check icon inside the knob when on. All role="switch" with aria-checked. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';

const sizes = [
  { label: 'Extra small', track: 'h-4 w-7', knob: 'size-3', move: 'translate-x-3', color: 'bg-teal-600' },
  { label: 'Small', track: 'h-5 w-9', knob: 'size-4', move: 'translate-x-4', color: 'bg-violet-600' },
  { label: 'Medium', track: 'h-6 w-11', knob: 'size-5', move: 'translate-x-5', color: 'bg-amber-500' },
  { label: 'Large', track: 'h-8 w-14', knob: 'size-7', move: 'translate-x-6', color: 'bg-rose-500' },
];

export function SwitchSizes() {
  const [on, setOn] = useState<Record<string, boolean>>({ Medium: true, Large: true, icon: true });

  return (
    <div className="grid gap-3">
      {sizes.map((size) => {
        const checked = !!on[size.label];
        return (
          <label key={size.label} className="flex items-center gap-3 text-sm text-zinc-800 dark:text-zinc-200">
            <button type="button" role="switch" aria-checked={checked} onClick={() => setOn((value) => ({ ...value, [size.label]: !checked }))} className={`relative shrink-0 rounded-full p-0.5 outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500 ${size.track} ${checked ? size.color : 'bg-zinc-300 dark:bg-zinc-700'}`}>
              <span className={`block rounded-full bg-white shadow transition-transform ${size.knob} ${checked ? size.move : ''}`} />
            </button>
            {size.label}
          </label>
        );
      })}
      <label className="flex items-center gap-3 text-sm text-zinc-800 dark:text-zinc-200">
        <button type="button" role="switch" aria-checked={!!on.icon} onClick={() => setOn((value) => ({ ...value, icon: !value.icon }))} className={`relative h-6 w-11 shrink-0 rounded-full p-0.5 outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500 ${on.icon ? 'bg-emerald-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
          <span className={`grid size-5 place-items-center rounded-full bg-white shadow transition-transform ${on.icon ? 'translate-x-5' : ''}`}>{on.icon && <Check aria-hidden className="size-3 text-emerald-600" />}</span>
        </button>
        With icon
      </label>
      <label className="flex items-center gap-3 text-sm text-zinc-400 dark:text-zinc-500">
        <button type="button" role="switch" aria-checked="false" disabled className="relative h-6 w-11 shrink-0 cursor-not-allowed rounded-full bg-zinc-200 p-0.5 dark:bg-zinc-800"><span className="block size-5 rounded-full bg-white/80 shadow" /></button>
        Disabled
      </label>
    </div>
  );
}
