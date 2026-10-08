/**
 * @registry
 * name: Checkbox Group Described
 * category: Checkboxes
 * style: SaaS
 * tags: featured, recent
 * description: Groupe de cases façon HeroUI avec titre, description par option, compteur et message d'aide.
 * prompt: Create a HeroUI-style checkbox group inside a fieldset with legend: each option has a title and a muted description, the whole row is clickable (label wraps the input), checked rows get a teal border and tint; a live helper shows "2 of 4 selected" and an error message when none is selected (aria-invalid on the group). Light and dark mode.
 */
'use client';
import { useState } from 'react';

const options = [
  { id: 'analytics', title: 'Analytics', text: 'Page views, funnels and retention reports.' },
  { id: 'billing', title: 'Billing', text: 'Invoices, payment methods and tax receipts.' },
  { id: 'security', title: 'Security alerts', text: 'New logins and API key usage.' },
  { id: 'product', title: 'Product updates', text: 'Monthly release notes and betas.' },
];

export function CheckboxGroupDescribed() {
  const [selected, setSelected] = useState<string[]>(['analytics', 'security']);
  const toggle = (id: string) => setSelected((list) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]));
  const invalid = selected.length === 0;

  return (
    <fieldset aria-invalid={invalid} className="w-full max-w-md">
      <legend className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Email notifications</legend>
      <div className="mt-3 grid gap-2">
        {options.map((option) => {
          const checked = selected.includes(option.id);
          return (
            <label key={option.id} className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition ${checked ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-400/10' : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'}`}>
              <input type="checkbox" checked={checked} onChange={() => toggle(option.id)} className="mt-0.5 size-4 shrink-0 accent-teal-600" />
              <span>
                <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">{option.title}</span>
                <span className="block text-sm text-zinc-500 dark:text-zinc-400">{option.text}</span>
              </span>
            </label>
          );
        })}
      </div>
      <p aria-live="polite" className={`mt-2 text-xs ${invalid ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-500 dark:text-zinc-400'}`}>
        {invalid ? 'Select at least one topic.' : `${selected.length} of ${options.length} selected`}
      </p>
    </fieldset>
  );
}
