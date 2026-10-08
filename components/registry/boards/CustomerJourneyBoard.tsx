/**
 * @registry
 * name: Customer Journey Board
 * category: Boards
 * style: Gradient
 * tags: recent
 * description: Carte du parcours client par étapes avec actions, émotions en courbe, points de friction et opportunités.
 * prompt: Create a customer journey map board: five stage columns (Discover, Sign up, Onboard, Use, Renew) with rows for Actions (sticky notes), an Emotion curve drawn in SVG across the stages with emoji markers, Pain points (rose notes) and Opportunities (emerald notes); clicking a stage header highlights its column; horizontal scroll on small screens. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const stages = [
  { name: 'Discover', action: 'Finds us on a podcast', mood: 2, pain: 'Unclear pricing', idea: 'Pricing calculator' },
  { name: 'Sign up', action: 'Creates an account', mood: 3, pain: 'Email verification lost', idea: 'Magic link' },
  { name: 'Onboard', action: 'Imports first project', mood: 1, pain: 'CSV errors', idea: 'Guided import' },
  { name: 'Use', action: 'Invites the team', mood: 4, pain: 'Roles are confusing', idea: 'Role presets' },
  { name: 'Renew', action: 'Upgrades to yearly', mood: 3, pain: 'Invoice details', idea: 'Self-serve invoices' },
];
const faces = ['😣', '😕', '🙂', '😄', '🤩'];

export function CustomerJourneyBoard() {
  const [active, setActive] = useState<number | null>(2);
  const points = stages.map((stage, index) => `${index * 100 + 50},${70 - stage.mood * 14}`).join(' ');

  return (
    <div className="w-full max-w-3xl overflow-x-auto rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
      <div className="min-w-[36rem]">
        <div className="grid grid-cols-5 gap-2">
          {stages.map((stage, index) => <button key={stage.name} type="button" aria-pressed={active === index} onClick={() => setActive(active === index ? null : index)} className={`rounded-lg py-2 text-sm font-semibold text-white transition ${active === index ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500' : 'bg-zinc-800 dark:bg-zinc-700'}`}>{stage.name}</button>)}
        </div>
        {[['Actions', 'action', 'bg-sky-100 text-sky-900 dark:bg-sky-500/15 dark:text-sky-100'], ['Pain points', 'pain', 'bg-rose-100 text-rose-900 dark:bg-rose-500/15 dark:text-rose-100'], ['Opportunities', 'idea', 'bg-emerald-100 text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-100']].map(([label, key, tone], row) => (
          <div key={label}>
            {row === 1 && (
              <div className="relative mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Emotion</p>
                <svg viewBox="0 0 500 80" aria-hidden className="h-20 w-full" preserveAspectRatio="none"><polyline points={points} fill="none" strokeWidth="2.5" vectorEffect="non-scaling-stroke" className="stroke-violet-500" /></svg>
                <div className="absolute inset-x-0 top-4 grid h-20 grid-cols-5">{stages.map((stage, index) => <span key={stage.name} className="relative"><span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg" style={{ top: `${((70 - stage.mood * 14) / 80) * 100}%` }} role="img" aria-label={`${stage.name} mood ${stage.mood + 1} of 5`}>{faces[stage.mood]}</span></span>)}</div>
              </div>
            )}
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
            <div className="mt-1 grid grid-cols-5 gap-2">{stages.map((stage, index) => <p key={stage.name} className={`rounded-lg p-2 text-xs shadow-sm transition-opacity ${tone} ${active !== null && active !== index ? 'opacity-35' : ''}`}>{stage[key as 'action' | 'pain' | 'idea']}</p>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
