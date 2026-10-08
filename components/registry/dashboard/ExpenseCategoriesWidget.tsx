/**
 * @registry
 * name: Expense Categories Widget
 * category: Dashboard
 * style: Minimal
 * tags: recent
 * description: Dépenses du mois par catégorie avec anneau segmenté, budget restant et catégorie mise en avant au survol.
 * prompt: Create a monthly expenses widget: an SVG donut with one stroke segment per category (Rent, Food, Transport, Software, Other), center showing total spent vs budget; a legend list where hovering/focusing an item highlights its segment (others dim) and shows percentage and amount; a budget bar "€2,340 of €3,000 · €660 left". sr-only summary. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const categories = [['Rent', 1100, '#14b8a6'], ['Food', 520, '#f59e0b'], ['Transport', 180, '#6366f1'], ['Software', 310, '#ec4899'], ['Other', 230, '#a1a1aa']] as const;
const total = categories.reduce((sum, [, amount]) => sum + amount, 0);

export function ExpenseCategoriesWidget() {
  const [focus, setFocus] = useState<string | null>(null);
  let offset = 0;

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">October spending</h3>
      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row">
        <div className="relative size-36 shrink-0">
          <svg viewBox="0 0 42 42" aria-hidden className="size-full -rotate-90">
            {categories.map(([name, amount, color]) => {
              const share = (amount / total) * 100;
              const segment = <circle key={name} cx="21" cy="21" r="15.915" fill="none" stroke={color} strokeWidth={focus === name ? 6 : 4.5} pathLength={100} strokeDasharray={`${share - 0.8} ${100 - share + 0.8}`} strokeDashoffset={-offset} style={{ opacity: focus && focus !== name ? 0.25 : 1, transition: 'opacity .2s, stroke-width .2s' }} />;
              offset += share;
              return segment;
            })}
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center"><span><span className="block text-xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">€{total.toLocaleString('en-US')}</span><span className="text-[10px] text-zinc-500">of €3,000</span></span></div>
        </div>
        <ul className="w-full space-y-1">
          {categories.map(([name, amount, color]) => <li key={name}><button type="button" onMouseEnter={() => setFocus(name)} onMouseLeave={() => setFocus(null)} onFocus={() => setFocus(name)} onBlur={() => setFocus(null)} className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"><span className="size-2.5 rounded-sm" style={{ background: color }} /><span className="flex-1 text-left text-zinc-700 dark:text-zinc-300">{name}</span><span className="text-xs text-zinc-400">{Math.round((amount / total) * 100)}%</span><span className="w-14 text-right tabular-nums text-zinc-900 dark:text-zinc-100">€{amount}</span></button></li>)}
        </ul>
      </div>
      <div className="mt-4"><div className="flex justify-between text-xs text-zinc-500"><span>€{total.toLocaleString('en-US')} of €3,000</span><span className="text-emerald-600 dark:text-emerald-400">€{3000 - total} left</span></div><div className="mt-1 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100" style={{ width: `${(total / 3000) * 100}%` }} /></div></div>
      <p className="sr-only">Spent {total} euros of a 3000 euro budget. Rent 1100, food 520, transport 180, software 310, other 230.</p>
    </section>
  );
}
