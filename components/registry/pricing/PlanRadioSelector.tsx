/**
 * @registry
 * name: Plan Radio Selector
 * category: Pricing
 * style: Minimal
 * tags: recent
 * description: Choix d'offre sous forme de liste de radios riches avec prix à droite et résumé du choix.
 * prompt: Create a plan picker as a radiogroup of full-width rich options (native radio visually replaced by a custom ring): name, description, price on the right, selected option gets a teal border and tint; a summary line and Continue button reflect the choice. Keyboard arrows work natively. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const plans = [
  { id: 'monthly', name: 'Monthly', text: 'Cancel anytime', price: '$12/mo' },
  { id: 'yearly', name: 'Yearly', text: 'Two months free', price: '$120/yr', badge: 'Save 17%' },
  { id: 'lifetime', name: 'Lifetime', text: 'One payment', price: '$290' },
];

export function PlanRadioSelector() {
  const [plan, setPlan] = useState('yearly');
  const current = plans.find((item) => item.id === plan)!;

  return (
    <fieldset className="w-full max-w-md">
      <legend className="font-semibold text-zinc-900 dark:text-white">Select a billing plan</legend>
      <div className="mt-3 space-y-2">
        {plans.map((item) => (
          <label key={item.id} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 ${plan === item.id ? 'border-teal-500 bg-teal-500/5' : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'}`}>
            <input type="radio" name="billing-plan" value={item.id} checked={plan === item.id} onChange={() => setPlan(item.id)} className="peer sr-only" />
            <span className="grid size-5 shrink-0 place-items-center rounded-full border-2 border-zinc-300 peer-checked:border-teal-600 dark:border-zinc-600"><span className={`size-2.5 rounded-full bg-teal-600 transition ${plan === item.id ? 'scale-100' : 'scale-0'}`} /></span>
            <span className="flex-1">
              <span className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">{item.name}{item.badge && <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">{item.badge}</span>}</span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">{item.text}</span>
            </span>
            <span className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-white">{item.price}</span>
          </label>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{current.name} · {current.price}</p>
        <button type="button" className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">Continue</button>
      </div>
    </fieldset>
  );
}
