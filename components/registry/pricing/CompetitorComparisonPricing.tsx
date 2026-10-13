/**
 * @registry
 * name: Competitor Comparison Pricing
 * category: Pricing
 * style: SaaS
 * tags: featured, recent
 * description: Comparatif de prix face aux concurrents selon la taille d'équipe : curseur de sièges, coût annuel par outil, économies mises en avant.
 * prompt: Create a "compare the cost" pricing block: a seats slider (5–200) with the value shown; three columns — our product (highlighted, flat $49 + $4/seat), Competitor A ($12/seat) and Competitor B ($9/seat + $99 platform fee) — each showing the yearly cost computed from seats; the cheapest is badged and the savings line "You save $3,420/year vs Competitor A" updates live (aria-live); a features row compares 4 checkmarks; neutral names (no real brands); stacks on mobile. Light and dark mode.
 */
'use client';
import { Check, Minus } from 'lucide-react';
import { useId, useState } from 'react';

const tools = [
  { name: 'Ledger', ours: true, monthly: (seats: number) => 49 + seats * 4, features: [true, true, true, true] },
  { name: 'Competitor A', ours: false, monthly: (seats: number) => seats * 12, features: [true, true, false, true] },
  { name: 'Competitor B', ours: false, monthly: (seats: number) => 99 + seats * 9, features: [true, false, false, true] },
];
const featureNames = ['Unlimited projects', 'SSO included', 'Audit log', 'API access'];

export function CompetitorComparisonPricing() {
  const uid = useId();
  const [seats, setSeats] = useState(40);
  const yearly = tools.map((tool) => tool.monthly(seats) * 12);
  const cheapest = yearly.indexOf(Math.min(...yearly));
  const saving = yearly[1] - yearly[0];

  return (
    <section className="w-full max-w-3xl rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Compare the real cost</h3>
      <label htmlFor={`${uid}-seats`} className="mt-4 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">Team size<span className="text-lg font-bold tabular-nums text-zinc-950 dark:text-white">{seats} seats</span></label>
      <input id={`${uid}-seats`} type="range" min={5} max={200} step={5} value={seats} onChange={(event) => setSeats(Number(event.target.value))} className="mt-2 w-full accent-indigo-600" />
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {tools.map((tool, index) => (
          <article key={tool.name} className={`relative rounded-2xl p-4 ${tool.ours ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'border border-zinc-200 dark:border-zinc-800'}`}>
            {cheapest === index && <span className={`absolute -top-2.5 left-4 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${tool.ours ? 'bg-amber-300 text-zinc-950' : 'bg-emerald-500 text-white'}`}>Lowest cost</span>}
            <p className={`text-sm font-semibold ${tool.ours ? '' : 'text-zinc-950 dark:text-white'}`}>{tool.name}</p>
            <p className={`mt-2 text-3xl font-bold tabular-nums ${tool.ours ? '' : 'text-zinc-950 dark:text-white'}`}>${yearly[index].toLocaleString('en-US')}</p>
            <p className={`text-xs ${tool.ours ? 'text-indigo-100' : 'text-zinc-500'}`}>per year · ${tool.monthly(seats).toLocaleString('en-US')}/mo</p>
            <ul className="mt-4 space-y-1.5 text-xs">{featureNames.map((feature, featureIndex) => <li key={feature} className={`flex items-center gap-2 ${tool.ours ? 'text-indigo-50' : 'text-zinc-600 dark:text-zinc-400'}`}>{tool.features[featureIndex] ? <Check aria-hidden className="size-3.5" /> : <Minus aria-hidden className="size-3.5 opacity-50" />}<span className={tool.features[featureIndex] ? '' : 'line-through opacity-60'}>{feature}</span><span className="sr-only">{tool.features[featureIndex] ? 'included' : 'not included'}</span></li>)}</ul>
          </article>
        ))}
      </div>
      <p aria-live="polite" className={`mt-5 rounded-xl px-4 py-3 text-sm font-medium ${saving > 0 ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200' : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'}`}>{saving > 0 ? `You save $${saving.toLocaleString('en-US')}/year vs Competitor A with ${seats} seats.` : `At ${seats} seats Competitor A is $${(-saving).toLocaleString('en-US')} cheaper — but without SSO or audit logs.`}</p>
    </section>
  );
}
