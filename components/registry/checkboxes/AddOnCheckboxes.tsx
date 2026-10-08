/**
 * @registry
 * name: Add-on Checkboxes
 * category: Checkboxes
 * style: SaaS
 * tags: recent
 * description: Options payantes à cocher avec prix par ligne et total qui se recalcule en direct.
 * prompt: Create an add-ons checkbox list for a checkout: each row has a checkbox, name, short description and a price on the right; a base plan line is fixed; the total at the bottom updates live (aria-live) and animates its number change. Rows are labels so the whole row toggles. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const addons = [
  { id: 'domain', name: 'Custom domain', text: 'Use your own .com', price: 4 },
  { id: 'backup', name: 'Daily backups', text: '30-day retention', price: 6 },
  { id: 'seats', name: '5 extra seats', text: 'Invite your team', price: 15 },
  { id: 'support', name: 'Priority support', text: 'Answer within 2h', price: 9 },
];

export function AddOnCheckboxes() {
  const [on, setOn] = useState<string[]>(['backup']);
  const total = 12 + addons.filter((addon) => on.includes(addon.id)).reduce((sum, addon) => sum + addon.price, 0);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex justify-between text-sm"><span className="font-semibold text-zinc-900 dark:text-zinc-100">Starter plan</span><span className="tabular-nums text-zinc-600 dark:text-zinc-400">$12</span></div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Add-ons</p>
      <div className="mt-2 divide-y divide-zinc-100 dark:divide-zinc-800">
        {addons.map((addon) => (
          <label key={addon.id} className="flex cursor-pointer items-center gap-3 py-2.5">
            <input type="checkbox" checked={on.includes(addon.id)} onChange={() => setOn((list) => (list.includes(addon.id) ? list.filter((id) => id !== addon.id) : [...list, addon.id]))} className="size-4 accent-teal-600" />
            <span className="flex-1">
              <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">{addon.name}</span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">{addon.text}</span>
            </span>
            <span className="text-sm tabular-nums text-zinc-700 dark:text-zinc-300">+${addon.price}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex items-end justify-between border-t border-zinc-200 pt-3 dark:border-zinc-800">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Total / month</span>
        <span key={total} aria-live="polite" className="text-2xl font-bold tabular-nums text-zinc-950 motion-safe:animate-[pui-total-pop_.3s_ease-out] dark:text-zinc-50">${total}</span>
      </div>
      <style>{`@keyframes pui-total-pop{from{transform:translateY(4px);opacity:.4}to{transform:none;opacity:1}}`}</style>
    </div>
  );
}
