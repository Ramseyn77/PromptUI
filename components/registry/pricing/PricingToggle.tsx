/**
 * @registry
 * name: Pricing Toggle
 * category: Pricing
 * style: SaaS
 * tags: featured, recent
 * description: Tarifs avec bascule mensuel ou annuel et prix qui s'anime au changement.
 * prompt: Create a pricing section with a Monthly/Yearly segmented radiogroup (yearly shows a -20% badge) and two plan cards; the price re-animates on change. The highlighted plan is inverted and flips in dark mode. Stack on mobile, 2 columns from sm.
 */
'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';

const plans = [
  { name: 'Starter', monthly: 0, yearly: 0, features: ['3 projects', 'Community blocks'], highlight: false },
  { name: 'Pro', monthly: 24, yearly: 19, features: ['Unlimited projects', 'All blocks + prompts', 'Priority support'], highlight: true },
];

export function PricingToggle() {
  const [yearly, setYearly] = useState(true);

  return (
    <>
      <style>{`@keyframes pui-price{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}`}</style>
      <section className="w-full max-w-2xl">
        <div className="mx-auto flex w-fit items-center rounded-full border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900" role="radiogroup" aria-label="Billing period">
          {[['Monthly', false], ['Yearly', true]].map(([label, value]) => (
            <button
              key={String(label)}
              type="button"
              role="radio"
              aria-checked={yearly === value}
              onClick={() => setYearly(value as boolean)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                yearly === value ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {label}
              {value && <span className="ml-1.5 rounded-full bg-teal-500/15 px-1.5 py-0.5 text-[10px] text-teal-700 dark:text-teal-300">-20%</span>}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-3xl p-6 ${
                plan.highlight
                  ? 'bg-zinc-950 text-white ring-1 ring-zinc-950 dark:bg-white dark:text-zinc-950'
                  : 'border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white'
              }`}
            >
              <p className="text-sm font-semibold opacity-80">{plan.name}</p>
              <p className="mt-3 flex items-baseline gap-1">
                <span key={String(yearly)} className="text-4xl font-semibold tracking-tight motion-safe:animate-[pui-price_.35s_ease-out]">
                  ${yearly ? plan.yearly : plan.monthly}
                </span>
                <span className="text-sm opacity-60">/mo</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check aria-hidden className={`size-4 ${plan.highlight ? 'text-teal-300 dark:text-teal-600' : 'text-teal-600 dark:text-teal-400'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
