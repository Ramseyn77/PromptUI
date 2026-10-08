/**
 * @registry
 * name: Goal Card Checkboxes
 * category: Checkboxes
 * style: Gradient
 * tags: featured, recent
 * description: Grandes cartes d'objectifs à cocher pour un onboarding, avec emoji, coche ronde et limite de 3.
 * prompt: Create onboarding goal cards: a 2-column grid (1 column under sm) of large selectable cards with an emoji, title and one-line text; selecting adds a gradient ring, a round check badge in the corner and slight lift; max 3 selections, other cards become disabled with a hint "3 / 3 — deselect one to change"; Continue button enabled when at least one is chosen. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';

const goals = [
  { emoji: '🚀', title: 'Launch faster', text: 'Ship a first version this month.' },
  { emoji: '📈', title: 'Grow revenue', text: 'Convert more visitors to customers.' },
  { emoji: '🤝', title: 'Collaborate', text: 'Bring my team into one place.' },
  { emoji: '🧠', title: 'Learn', text: 'Get better at design and code.' },
];

export function GoalCardCheckboxes() {
  const [on, setOn] = useState<string[]>(['Launch faster']);
  const full = on.length >= 3;

  return (
    <fieldset className="w-full max-w-md">
      <legend className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">What brings you here?</legend>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">Pick up to 3.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {goals.map((goal) => {
          const checked = on.includes(goal.title);
          const disabled = full && !checked;
          return (
            <label key={goal.title} className={`relative rounded-2xl p-[2px] transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 ${checked ? '-translate-y-0.5 bg-gradient-to-br from-teal-400 to-violet-500' : 'bg-zinc-200 dark:bg-zinc-800'} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
              <input type="checkbox" className="sr-only" disabled={disabled} checked={checked} onChange={() => setOn((list) => (checked ? list.filter((item) => item !== goal.title) : [...list, goal.title]))} />
              <span className="block h-full rounded-[calc(1rem-2px)] bg-white p-4 dark:bg-zinc-950">
                <span aria-hidden className="text-2xl">{goal.emoji}</span>
                <span className="mt-2 block font-semibold text-zinc-900 dark:text-zinc-100">{goal.title}</span>
                <span className="block text-sm text-zinc-500 dark:text-zinc-400">{goal.text}</span>
              </span>
              {checked && <span aria-hidden className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-white"><Check className="size-3.5" /></span>}
            </label>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p aria-live="polite" className="text-xs text-zinc-500">{full ? '3 / 3 — deselect one to change' : `${on.length} / 3`}</p>
        <button type="button" disabled={!on.length} className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-zinc-950">Continue</button>
      </div>
    </fieldset>
  );
}
