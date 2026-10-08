/**
 * @registry
 * name: Interest Chips
 * category: Checkboxes
 * style: Gradient
 * tags: featured, recent
 * description: Pastilles de centres d'intérêt à cocher avec emoji, limite de 5 et bouton continuer.
 * prompt: Create an onboarding interests picker: wrapping chips that are sr-only checkboxes with emoji + label; checked chips get a gradient fill and a check; max 5 selections (others disabled once reached, with a counter), Continue enabled after 3. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';

const interests = [['🎨', 'Design'], ['💻', 'Coding'], ['📈', 'Marketing'], ['🎧', 'Music'], ['📸', 'Photo'], ['✍️', 'Writing'], ['🧠', 'AI'], ['🌍', 'Travel'], ['🍳', 'Cooking']];
const max = 5;

export function InterestChips() {
  const [picked, setPicked] = useState(['Design', 'AI']);

  return (
    <fieldset className="w-full max-w-md">
      <legend className="text-lg font-semibold text-zinc-900 dark:text-white">What are you into?</legend>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">Pick 3 to 5 topics · <span className="tabular-nums">{picked.length}/{max}</span></p>
      <div className="mt-4 flex flex-wrap gap-2">
        {interests.map(([emoji, label]) => {
          const on = picked.includes(label);
          const disabled = !on && picked.length >= max;
          return (
            <label key={label} className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-violet-500 ${on ? 'border-transparent bg-gradient-to-r from-teal-500 to-violet-500 text-white shadow-md' : 'border-zinc-300 text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300'} ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}>
              <input type="checkbox" className="sr-only" checked={on} disabled={disabled} onChange={() => setPicked((current) => (on ? current.filter((item) => item !== label) : [...current, label]))} />
              <span aria-hidden>{emoji}</span>{label}{on && <Check aria-hidden className="size-3.5" />}
            </label>
          );
        })}
      </div>
      <button type="button" disabled={picked.length < 3} className="mt-6 w-full rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white disabled:opacity-30 dark:bg-white dark:text-zinc-950">Continue</button>
    </fieldset>
  );
}
