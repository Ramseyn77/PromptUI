/**
 * @registry
 * name: Add-ons Builder
 * category: Pricing
 * style: Minimal
 * tags: recent
 * description: Configurateur d'offre : plan de base, modules à activer par interrupteur et récapitulatif collant du total.
 * prompt: Create a plan builder: a base plan radiogroup (Starter $9 / Growth $29), a list of add-on modules with switches (role="switch") and per-module prices, and a summary panel (sticky on desktop, below on mobile) listing selected items and the total per month/year with a billing cycle toggle (yearly −20%). Two columns from md. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const plans = [['Starter', 9], ['Growth', 29]] as const;
const modules = [['Advanced analytics', 12], ['SSO & SCIM', 20], ['Audit log', 8], ['Priority support', 15]] as const;

export function AddOnsBuilder() {
  const [plan, setPlan] = useState(1);
  const [on, setOn] = useState<string[]>(['Advanced analytics']);
  const [yearly, setYearly] = useState(false);
  const monthly = plans[plan][1] + modules.filter(([name]) => on.includes(name)).reduce((sum, [, price]) => sum + price, 0);
  const total = yearly ? Math.round(monthly * 12 * 0.8) : monthly;

  return (
    <section className="grid w-full max-w-2xl gap-4 md:grid-cols-[1.4fr_1fr]">
      <div className="space-y-4">
        <div role="radiogroup" aria-label="Base plan" className="grid grid-cols-2 gap-2">
          {plans.map(([name, price], index) => <button key={name} type="button" role="radio" aria-checked={plan === index} onClick={() => setPlan(index)} className={`rounded-xl border p-3 text-left ${plan === index ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-400/10' : 'border-zinc-200 dark:border-zinc-800'}`}><span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">{name}</span><span className="text-xs text-zinc-500">${price}/mo</span></button>)}
        </div>
        <ul className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
          {modules.map(([name, price]) => {
            const checked = on.includes(name);
            return (
              <li key={name} className="flex items-center gap-3 px-4 py-3">
                <span className="flex-1 text-sm text-zinc-800 dark:text-zinc-200">{name}</span>
                <span className="text-xs tabular-nums text-zinc-500">+${price}</span>
                <button type="button" role="switch" aria-checked={checked} aria-label={name} onClick={() => setOn((list) => (checked ? list.filter((item) => item !== name) : [...list, name]))} className={`relative h-5 w-9 rounded-full transition ${checked ? 'bg-teal-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}><span className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0.5'}`} /></button>
              </li>
            );
          })}
        </ul>
      </div>
      <aside className="h-fit rounded-2xl bg-zinc-950 p-5 text-white md:sticky md:top-4 dark:bg-zinc-900">
        <p className="text-sm font-semibold">Summary</p>
        <ul className="mt-3 space-y-1 text-sm text-zinc-300"><li className="flex justify-between"><span>{plans[plan][0]}</span><span>${plans[plan][1]}</span></li>{modules.filter(([name]) => on.includes(name)).map(([name, price]) => <li key={name} className="flex justify-between"><span>{name}</span><span>${price}</span></li>)}</ul>
        <label className="mt-4 flex items-center gap-2 text-xs text-zinc-400"><input type="checkbox" checked={yearly} onChange={(event) => setYearly(event.target.checked)} className="accent-teal-400" />Bill yearly (−20%)</label>
        <p aria-live="polite" className="mt-3 border-t border-white/10 pt-3 text-3xl font-bold tabular-nums">${total}<span className="text-sm font-normal text-zinc-400">/{yearly ? 'yr' : 'mo'}</span></p>
        <button type="button" className="mt-4 w-full rounded-xl bg-teal-400 py-2.5 text-sm font-semibold text-teal-950">Continue</button>
      </aside>
    </section>
  );
}
