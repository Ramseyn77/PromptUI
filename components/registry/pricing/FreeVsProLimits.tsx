/**
 * @registry
 * name: Free vs Pro Limits
 * category: Pricing
 * style: SaaS
 * tags: recent
 * description: Comparaison d'usage Gratuit / Pro avec jauges de consommation actuelles et limites qui sautent à l'upgrade.
 * prompt: Create a usage-limits pricing card: a Free/Pro segmented toggle; three usage meters (Projects 3/3, Storage 1.6/2 GB, AI credits 180/200) show current consumption against the selected plan's limits — near-full bars turn amber/rose on Free and relax to teal on Pro with the new limits; CTA changes between "Upgrade to Pro — $12/mo" and "You're comparing Pro". Light and dark mode.
 */
'use client';
import { useState } from 'react';

const usage = [
  { label: 'Projects', used: 3, free: 3, pro: 50, unit: '' },
  { label: 'Storage', used: 1.6, free: 2, pro: 100, unit: ' GB' },
  { label: 'AI credits', used: 180, free: 200, pro: 5000, unit: '' },
];

export function FreeVsProLimits() {
  const [pro, setPro] = useState(false);

  return (
    <section className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div role="radiogroup" aria-label="Plan" className="grid grid-cols-2 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
        {['Free', 'Pro'].map((plan) => <button key={plan} type="button" role="radio" aria-checked={pro === (plan === 'Pro')} onClick={() => setPro(plan === 'Pro')} className={`rounded-lg py-1.5 text-sm font-semibold ${pro === (plan === 'Pro') ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{plan}</button>)}
      </div>
      <ul className="mt-5 space-y-4">
        {usage.map((row) => {
          const limit = pro ? row.pro : row.free;
          const pct = Math.min(100, (row.used / limit) * 100);
          const color = pct >= 95 ? 'bg-rose-500' : pct >= 75 ? 'bg-amber-500' : 'bg-teal-500';
          return (
            <li key={row.label}>
              <div className="flex justify-between text-sm"><span className="text-zinc-700 dark:text-zinc-300">{row.label}</span><span className="tabular-nums text-zinc-500">{row.used}{row.unit} / {limit.toLocaleString('en-US')}{row.unit}</span></div>
              <div className="mt-1.5 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${Math.max(pct, 1.5)}%` }} /></div>
            </li>
          );
        })}
      </ul>
      <button type="button" className={`mt-6 w-full rounded-xl py-2.5 text-sm font-semibold ${pro ? 'border border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300' : 'bg-teal-600 text-white hover:bg-teal-500'}`}>{pro ? "You're comparing Pro" : 'Upgrade to Pro — $12/mo'}</button>
    </section>
  );
}
