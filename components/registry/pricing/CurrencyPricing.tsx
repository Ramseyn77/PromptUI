/**
 * @registry
 * name: Currency Pricing
 * category: Pricing
 * style: Minimal
 * tags: recent
 * description: Offres avec selecteur de devise EUR, USD ou XOF et prix formates selon la locale.
 * prompt: Create pricing cards with a currency selector (EUR, USD, XOF) that reformats every price with Intl.NumberFormat for the right locale and currency (no decimals for XOF). Two plans side by side from sm. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const currencies = {
  EUR: { locale: 'fr-FR', rate: 1 },
  USD: { locale: 'en-US', rate: 1.08 },
  XOF: { locale: 'fr-CI', rate: 655.96 },
} as const;
const plans = [{ name: 'Solo', base: 9 }, { name: 'Studio', base: 39 }];

export function CurrencyPricing() {
  const [currency, setCurrency] = useState<keyof typeof currencies>('EUR');
  const { locale, rate } = currencies[currency];
  const format = (value: number) => new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: currency === 'XOF' ? 0 : 2 }).format(value * rate);

  return (
    <section className="w-full max-w-xl">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-white">Choose your plan</h3>
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          Currency
          <select value={currency} onChange={(event) => setCurrency(event.target.value as keyof typeof currencies)} className="rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm font-medium text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
            {Object.keys(currencies).map((code) => <option key={code}>{code}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {plans.map((plan) => (
          <article key={plan.name} className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{plan.name}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">{format(plan.base)}<span className="text-sm font-normal text-zinc-500"> /mo</span></p>
            <button type="button" className="mt-4 w-full rounded-xl border border-zinc-300 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900">Choose {plan.name}</button>
          </article>
        ))}
      </div>
    </section>
  );
}
