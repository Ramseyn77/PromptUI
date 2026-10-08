/**
 * @registry
 * name: Expandable Stat Card
 * category: Cards
 * style: Gradient
 * tags: recent
 * description: Carte de statistique qui s'agrandit au clic pour révéler un mini graphique et la répartition par source.
 * prompt: Create an expandable stat card: collapsed it shows a label, big number and delta; the whole header is a button (aria-expanded, aria-controls) that expands the card with a grid-rows transition to reveal a sparkline area SVG and a breakdown list with colored bars per source; chevron rotates. Gradient accent strip on the left. Light and dark mode.
 */
'use client';
import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';

const sources = [['Organic', 46, 'bg-teal-500'], ['Paid', 28, 'bg-violet-500'], ['Referral', 16, 'bg-amber-400'], ['Social', 10, 'bg-pink-500']] as const;
const points = [12, 18, 15, 22, 26, 24, 31, 35, 33, 40];

export function ExpandableStatCard() {
  const id = useId();
  const [open, setOpen] = useState(true);
  const path = points.map((value, index) => `${index === 0 ? 'M' : 'L'}${index * 20},${44 - value}`).join(' ');

  return (
    <article className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-teal-400 via-violet-500 to-pink-500" />
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)} className="flex w-full items-start justify-between p-5 text-left">
        <span><span className="block text-sm text-zinc-500">Visitors this week</span><span className="mt-1 block text-3xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">48,210</span><span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">▲ 12.4% vs last week</span></span>
        <ChevronDown aria-hidden className={`size-5 text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div id={id} className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5">
            <svg viewBox="0 0 180 46" aria-hidden className="h-16 w-full" preserveAspectRatio="none"><path d={`${path} L180,46 L0,46 Z`} className="fill-violet-500/15" /><path d={path} fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" className="stroke-violet-500" /></svg>
            <ul className="mt-3 space-y-2">{sources.map(([label, pct, tone]) => <li key={label} className="text-sm"><div className="flex justify-between text-zinc-600 dark:text-zinc-400"><span>{label}</span><span className="tabular-nums">{pct}%</span></div><div className="mt-1 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className={`h-full rounded-full ${tone}`} style={{ width: `${pct * 2}%` }} /></div></li>)}</ul>
          </div>
        </div>
      </div>
    </article>
  );
}
