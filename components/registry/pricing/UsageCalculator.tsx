/**
 * @registry
 * name: Usage Calculator
 * category: Pricing
 * style: SaaS
 * tags: recent
 * description: Estimateur de facture a l usage avec deux curseurs et detail ligne par ligne du cout.
 * prompt: Create a usage-based pricing estimator: sliders for API requests (0–10M) and storage (0–500 GB) with formatted values, a free allowance, a line-by-line cost breakdown and an estimated monthly total that animates its color when it changes tier. Light and dark mode.
 */
'use client';
import { useState } from 'react';

export function UsageCalculator() {
  const [requests, setRequests] = useState(2.5);
  const [storage, setStorage] = useState(120);
  const requestCost = Math.max(0, requests - 1) * 4;
  const storageCost = Math.max(0, storage - 50) * 0.08;
  const total = 19 + requestCost + storageCost;

  const slider = (label: string, value: number, max: number, step: number, set: (value: number) => void, format: string) => (
    <label className="block">
      <span className="flex justify-between text-sm"><span className="text-zinc-700 dark:text-zinc-300">{label}</span><span className="font-semibold tabular-nums text-zinc-900 dark:text-white">{format}</span></span>
      <input type="range" min={0} max={max} step={step} value={value} onChange={(event) => set(Number(event.target.value))} className="mt-2 w-full accent-violet-600" />
    </label>
  );

  return (
    <section className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-white">Estimate your bill</h3>
      <div className="mt-5 space-y-5">
        {slider('API requests', requests, 10, 0.1, setRequests, `${requests.toFixed(1)}M / mo`)}
        {slider('Storage', storage, 500, 10, setStorage, `${storage} GB`)}
      </div>
      <dl className="mt-6 space-y-1.5 border-t border-zinc-200 pt-4 text-sm dark:border-zinc-800">
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400"><dt>Base plan</dt><dd className="tabular-nums">$19.00</dd></div>
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400"><dt>Requests (1M free)</dt><dd className="tabular-nums">${requestCost.toFixed(2)}</dd></div>
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400"><dt>Storage (50 GB free)</dt><dd className="tabular-nums">${storageCost.toFixed(2)}</dd></div>
        <div className="flex justify-between pt-2 text-base font-semibold"><dt className="text-zinc-900 dark:text-white">Estimated total</dt><dd className={`tabular-nums transition-colors ${total > 60 ? 'text-violet-600 dark:text-violet-400' : 'text-zinc-900 dark:text-white'}`}>${total.toFixed(2)}/mo</dd></div>
      </dl>
    </section>
  );
}
