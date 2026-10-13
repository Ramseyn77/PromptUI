/**
 * @registry
 * name: Budget Vs Actual Widget
 * category: Dashboard
 * style: SaaS
 * tags: featured, recent
 * description: Widget budget prévu contre réel par département : barres doubles, écart coloré (dépassement en rouge) et filtre de trimestre.
 * prompt: Create a budget vs actual widget: a quarter select (Q1–Q4) and a total line "Spent $412k of $450k (92%)"; rows per department (Engineering, Marketing, Sales, Ops, G&A) each with a light budget bar and a solid actual bar overlaid, the variance value colored emerald when under and rose when over with ▲/▼; the over-budget rows get a small "Over" badge; numbers are tabular; an sr-only summary lists departments over budget. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const data: Record<string, [string, number, number][]> = {
  Q3: [['Engineering', 180, 171], ['Marketing', 90, 104], ['Sales', 80, 72], ['Ops', 55, 41], ['G&A', 45, 24]],
  Q2: [['Engineering', 170, 168], ['Marketing', 85, 79], ['Sales', 80, 88], ['Ops', 50, 47], ['G&A', 45, 40]],
  Q1: [['Engineering', 160, 150], ['Marketing', 80, 70], ['Sales', 75, 70], ['Ops', 50, 52], ['G&A', 40, 38]],
};

export function BudgetVsActualWidget() {
  const [quarter, setQuarter] = useState('Q3');
  const rows = data[quarter];
  const budget = rows.reduce((sum, [, b]) => sum + b, 0);
  const actual = rows.reduce((sum, [, , a]) => sum + a, 0);
  const max = Math.max(...rows.map(([, b, a]) => Math.max(b, a)));
  const over = rows.filter(([, b, a]) => a > b).map(([name]) => name);

  return (
    <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-950 dark:text-white">Budget vs actual</h3>
        <select aria-label="Quarter" value={quarter} onChange={(event) => setQuarter(event.target.value)} className="rounded-lg border border-zinc-200 bg-transparent px-2 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">{Object.keys(data).map((key) => <option key={key}>{key}</option>)}</select>
      </div>
      <p aria-live="polite" className="mt-1 text-sm text-zinc-500">Spent <strong className="text-zinc-950 dark:text-white">${actual}k</strong> of ${budget}k ({Math.round((actual / budget) * 100)}%)</p>
      <p className="sr-only">{over.length ? `Over budget: ${over.join(', ')}.` : 'All departments within budget.'}</p>
      <ul className="mt-4 space-y-3">
        {rows.map(([name, b, a]) => {
          const diff = a - b;
          return (
            <li key={name}>
              <div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">{name}{diff > 0 && <span className="rounded bg-rose-100 px-1 text-[10px] font-semibold text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">Over</span>}</span><span className="tabular-nums text-zinc-500">${a}k / ${b}k <span className={`ml-1 font-semibold ${diff > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{diff > 0 ? '▲' : '▼'}{Math.abs(diff)}k</span></span></div>
              <div aria-hidden className="relative mt-1.5 h-3 rounded-full bg-zinc-100 dark:bg-zinc-900">
                <div className="absolute inset-y-0 left-0 rounded-full bg-zinc-300 transition-all duration-500 dark:bg-zinc-700" style={{ width: `${(b / max) * 100}%` }} />
                <div className={`absolute inset-y-0.5 left-0 rounded-full transition-all duration-500 ${diff > 0 ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${(a / max) * 100}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex gap-4 text-xs text-zinc-500"><span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-zinc-300 dark:bg-zinc-700" />Budget</span><span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-indigo-500" />Actual</span><span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-rose-500" />Over budget</span></div>
    </section>
  );
}
