/**
 * @registry
 * name: Usage Tier Table
 * category: Pricing
 * style: SaaS
 * tags: recent
 * description: Tarification par paliers de volume (graduée) avec curseur d'usage qui surligne les paliers atteints et détaille le calcul.
 * prompt: Create graduated volume pricing: a table of tiers (0–10k free, 10k–100k $0.80/1k, 100k–1M $0.50/1k, 1M+ $0.30/1k); a range slider (labelled, aria-valuetext "250,000 emails") highlights every tier reached and shows a per-tier breakdown of units × price with a total; numbers formatted with Intl. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const tiers = [{ upTo: 10000, price: 0 }, { upTo: 100000, price: 0.8 }, { upTo: 1000000, price: 0.5 }, { upTo: Infinity, price: 0.3 }];
const steps = [5000, 25000, 75000, 150000, 250000, 500000, 1000000, 2000000];

export function UsageTierTable() {
  const id = useId();
  const [step, setStep] = useState(4);
  const volume = steps[step];
  let previous = 0;
  const rows = tiers.map((tier) => {
    const units = Math.max(0, Math.min(volume, tier.upTo) - previous);
    const row = { from: previous, to: tier.upTo, price: tier.price, units, cost: (units / 1000) * tier.price };
    previous = tier.upTo;
    return row;
  });
  const total = rows.reduce((sum, row) => sum + row.cost, 0);
  const n = (value: number) => value.toLocaleString('en-US');

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <label htmlFor={id} className="flex justify-between text-sm"><span className="font-semibold text-zinc-900 dark:text-zinc-100">Emails per month</span><span className="tabular-nums text-zinc-600 dark:text-zinc-400">{n(volume)}</span></label>
      <input id={id} type="range" min={0} max={steps.length - 1} value={step} aria-valuetext={`${n(volume)} emails`} onChange={(event) => setStep(Number(event.target.value))} className="mt-2 w-full accent-teal-600" />
      <table className="mt-4 w-full text-sm">
        <thead className="text-left text-xs text-zinc-500"><tr><th className="py-1 font-medium">Tier</th><th className="text-right font-medium">Price / 1k</th><th className="text-right font-medium">Cost</th></tr></thead>
        <tbody>
          {rows.map((row) => <tr key={row.from} className={`border-t border-zinc-100 transition-colors dark:border-zinc-900 ${row.units > 0 ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 dark:text-zinc-600'}`}><td className="py-2">{n(row.from)}–{row.to === Infinity ? '∞' : n(row.to)}{row.units > 0 && <span className="ml-1 text-xs text-teal-600 dark:text-teal-400">· {n(row.units)}</span>}</td><td className="text-right tabular-nums">{row.price ? `$${row.price.toFixed(2)}` : 'Free'}</td><td className="text-right tabular-nums">${row.cost.toFixed(2)}</td></tr>)}
        </tbody>
        <tfoot><tr className="border-t-2 border-zinc-900 dark:border-zinc-100"><td colSpan={2} className="py-2 font-semibold text-zinc-900 dark:text-zinc-100">Monthly total</td><td aria-live="polite" className="text-right text-lg font-bold tabular-nums text-zinc-950 dark:text-zinc-50">${total.toFixed(2)}</td></tr></tfoot>
      </table>
    </section>
  );
}
