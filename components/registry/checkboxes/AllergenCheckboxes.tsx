/**
 * @registry
 * name: Allergen Checkboxes
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Grille d'allergènes à cocher avec emoji, utilisée pour filtrer un menu de restaurant.
 * prompt: Create an allergen filter: a 3-column (2 on mobile) grid of compact checkbox tiles with emoji and label (Gluten, Dairy, Nuts, Eggs, Soy, Shellfish); checked tiles turn amber with an "excluded" badge; a summary sentence below reads "Hiding dishes with gluten and nuts" and a reset button. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const allergens = [['🌾', 'Gluten'], ['🥛', 'Dairy'], ['🥜', 'Nuts'], ['🥚', 'Eggs'], ['🫘', 'Soy'], ['🦐', 'Shellfish']] as const;

export function AllergenCheckboxes() {
  const [on, setOn] = useState<string[]>(['Gluten', 'Nuts']);
  const list = on.map((item) => item.toLowerCase());
  const sentence = list.length > 1 ? `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}` : list[0];

  return (
    <fieldset className="w-full max-w-sm">
      <legend className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Exclude allergens</legend>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {allergens.map(([emoji, label]) => {
          const checked = on.includes(label);
          return (
            <label key={label} className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-amber-500 ${checked ? 'border-amber-400 bg-amber-50 text-amber-900 dark:border-amber-500/60 dark:bg-amber-500/10 dark:text-amber-100' : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900'}`}>
              <input type="checkbox" className="sr-only" checked={checked} onChange={() => setOn((value) => (checked ? value.filter((item) => item !== label) : [...value, label]))} />
              <span aria-hidden>{emoji}</span>{label}
              {checked && <span className="ml-auto rounded bg-amber-200/70 px-1 text-[10px] font-semibold uppercase dark:bg-amber-400/20">no</span>}
            </label>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p aria-live="polite" className="text-xs text-zinc-500 dark:text-zinc-400">{on.length ? `Hiding dishes with ${sentence}` : 'Showing all dishes'}</p>
        {on.length > 0 && <button type="button" onClick={() => setOn([])} className="text-xs font-medium text-zinc-700 underline underline-offset-2 dark:text-zinc-300">Reset</button>}
      </div>
    </fieldset>
  );
}
