/**
 * @registry
 * name: Select All Cards
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Cartes d'intégrations à cocher avec « Tout sélectionner » à trois états et compteur dans le bouton de validation.
 * prompt: Create selectable integration cards in a 2-column grid: each card (label with hidden checkbox) shows a colored initial tile, name and description, with a corner checkbox that fills when selected; a header "Select all" checkbox supports the indeterminate state; the Continue button reads "Connect 3 apps" and is disabled at zero. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const apps = [['Notion', 'Docs and wikis', 'bg-zinc-900'], ['Slack', 'Team chat', 'bg-violet-600'], ['Stripe', 'Payments', 'bg-indigo-500'], ['Figma', 'Design files', 'bg-rose-500']] as const;

export function SelectAllCards() {
  const [on, setOn] = useState<string[]>(['Slack', 'Stripe']);
  const all = useRef<HTMLInputElement>(null);

  useEffect(() => { if (all.current) all.current.indeterminate = on.length > 0 && on.length < apps.length; }, [on]);

  return (
    <div className="w-full max-w-md">
      <label className="flex items-center gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"><input ref={all} type="checkbox" checked={on.length === apps.length} onChange={() => setOn(on.length === apps.length ? [] : apps.map(([name]) => name))} className="size-4 accent-zinc-900 dark:accent-white" />Select all</label>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {apps.map(([name, text, tone]) => {
          const checked = on.includes(name);
          return (
            <label key={name} className={`relative flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 ${checked ? 'border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-900' : 'border-zinc-200 dark:border-zinc-800'}`}>
              <input type="checkbox" className="sr-only" checked={checked} onChange={() => setOn((list) => (checked ? list.filter((item) => item !== name) : [...list, name]))} />
              <span aria-hidden className={`grid size-9 place-items-center rounded-lg text-sm font-bold text-white ${tone}`}>{name[0]}</span>
              <span><span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">{name}</span><span className="block text-xs text-zinc-500">{text}</span></span>
              <span aria-hidden className={`absolute right-3 top-3 grid size-4 place-items-center rounded ${checked ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'border border-zinc-300 dark:border-zinc-600'}`}>{checked && <Check className="size-3" />}</span>
            </label>
          );
        })}
      </div>
      <button type="button" disabled={!on.length} className="mt-4 w-full rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-zinc-950">{on.length ? `Connect ${on.length} app${on.length > 1 ? 's' : ''}` : 'Select an app'}</button>
    </div>
  );
}
