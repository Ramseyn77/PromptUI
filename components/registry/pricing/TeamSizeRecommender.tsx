/**
 * @registry
 * name: Team Size Recommender
 * category: Pricing
 * style: Minimal
 * tags: recent
 * description: Recommandeur de plan : taille d'équipe et besoins cochés déterminent le plan conseillé, mis en avant parmi trois cartes avec la raison du choix.
 * prompt: Create a plan recommender: inputs for team size (a stepper 1–500 with quick chips 1, 10, 50, 200) and needs as checkboxes (SSO, Audit logs, Priority support, Custom contracts); three plan cards (Starter, Team, Enterprise) where the recommended one gets a ring and a "Recommended for you" badge, with a one-line reason built from the inputs ("Because you need SSO and have 50 people"); the other cards dim slightly; recommendation changes are announced via aria-live. Light and dark mode.
 */
'use client';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const needs = ['SSO', 'Audit logs', 'Priority support', 'Custom contracts'];
const plans = [{ name: 'Starter', price: '$0', limit: 'Up to 5 people' }, { name: 'Team', price: '$12/seat', limit: 'Up to 100 people' }, { name: 'Enterprise', price: 'Custom', limit: 'Unlimited' }];

export function TeamSizeRecommender() {
  const [size, setSize] = useState(24);
  const [picked, setPicked] = useState<string[]>(['SSO']);
  const enterpriseNeeds = picked.filter((need) => need === 'Audit logs' || need === 'Custom contracts');
  const recommended = size > 100 || enterpriseNeeds.length ? 2 : size > 5 || picked.length ? 1 : 0;
  const reason = recommended === 2 ? (size > 100 ? `because you have ${size} people` : `because you need ${enterpriseNeeds.join(' and ').toLowerCase()}`) : recommended === 1 ? `for ${size} people${picked.length ? ` with ${picked.join(', ')}` : ''}` : 'for a small team just getting started';

  return (
    <section className="w-full max-w-3xl rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">Find the right plan</h3>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Team size</p>
          <div className="mt-2 flex items-center gap-2"><button type="button" aria-label="Fewer people" onClick={() => setSize(Math.max(1, size - 1))} className="grid size-9 place-items-center rounded-lg border border-zinc-300 dark:border-zinc-700"><Minus aria-hidden className="size-4" /></button><input aria-label="Team size" type="number" min={1} max={500} value={size} onChange={(event) => setSize(Math.min(500, Math.max(1, Number(event.target.value) || 1)))} className="w-20 rounded-lg border border-zinc-300 bg-transparent px-2 py-1.5 text-center text-sm tabular-nums text-zinc-900 dark:border-zinc-700 dark:text-zinc-100" /><button type="button" aria-label="More people" onClick={() => setSize(Math.min(500, size + 1))} className="grid size-9 place-items-center rounded-lg border border-zinc-300 dark:border-zinc-700"><Plus aria-hidden className="size-4" /></button></div>
          <div className="mt-2 flex gap-1.5">{[1, 10, 50, 200].map((value) => <button key={value} type="button" aria-pressed={size === value} onClick={() => setSize(value)} className={`rounded-full px-2.5 py-0.5 text-xs ${size === value ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>{value}</button>)}</div>
        </div>
        <fieldset><legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">You need</legend><div className="mt-2 grid grid-cols-2 gap-1.5">{needs.map((need) => <label key={need} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={picked.includes(need)} onChange={() => setPicked(picked.includes(need) ? picked.filter((item) => item !== need) : [...picked, need])} className="accent-indigo-600" />{need}</label>)}</div></fieldset>
      </div>
      <p aria-live="polite" className="mt-5 text-sm text-zinc-600 dark:text-zinc-400">We recommend <strong className="text-zinc-950 dark:text-white">{plans[recommended].name}</strong> {reason}.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {plans.map((plan, index) => (
          <article key={plan.name} className={`relative rounded-2xl border p-4 transition ${index === recommended ? 'border-indigo-600 ring-2 ring-indigo-600/20' : 'border-zinc-200 opacity-60 dark:border-zinc-800'}`}>
            {index === recommended && <span className="absolute -top-2.5 left-4 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">Recommended for you</span>}
            <p className="text-sm font-semibold text-zinc-950 dark:text-white">{plan.name}</p>
            <p className="mt-1 text-2xl font-bold text-zinc-950 dark:text-white">{plan.price}</p>
            <p className="text-xs text-zinc-500">{plan.limit}</p>
            <button type="button" className={`mt-3 w-full rounded-lg py-1.5 text-xs font-semibold ${index === recommended ? 'bg-indigo-600 text-white' : 'border border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300'}`}>{index === 2 ? 'Talk to sales' : 'Choose'}</button>
          </article>
        ))}
      </div>
    </section>
  );
}
