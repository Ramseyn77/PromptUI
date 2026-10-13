/**
 * @registry
 * name: Cohort Retention Widget
 * category: Dashboard
 * style: Gradient
 * tags: featured, recent
 * description: Tableau de rétention par cohorte en triangle : cellules colorées selon le pourcentage, survol d'une cohorte et moyenne pondérée.
 * prompt: Create a cohort retention widget: a triangular table where rows are signup months (Apr–Sep) and columns are Month 0–5, each cell shows the retention % with a background intensity from a violet scale (computed deterministically), empty cells for future months; hovering/focusing a row highlights it and shows its size; a bottom "Average" row; a toggle between "% retained" and "users"; horizontal scroll on small screens. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const cohorts = [['Apr', 1240, [100, 46, 38, 33, 30, 28]], ['May', 1380, [100, 49, 40, 35, 32]], ['Jun', 1510, [100, 52, 43, 37]], ['Jul', 1620, [100, 55, 45]], ['Aug', 1700, [100, 58]], ['Sep', 1830, [100]]] as const;

export function CohortRetentionWidget() {
  const [mode, setMode] = useState<'pct' | 'users'>('pct');
  const [hover, setHover] = useState<number | null>(null);
  const average = Array.from({ length: 6 }, (_, col) => { const rows = cohorts.filter(([, , values]) => values.length > col); const size = rows.reduce((sum, [, n]) => sum + n, 0); return Math.round(rows.reduce((sum, [, n, values]) => sum + values[col] * n, 0) / size); });
  const cell = (value: number) => ({ background: `rgba(124, 58, 237, ${(value / 100) * 0.85 + 0.05})`, color: value > 45 ? 'white' : undefined });

  return (
    <section className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <div><h3 className="font-semibold text-zinc-950 dark:text-white">Retention by cohort</h3><p className="text-xs text-zinc-500">Users active N months after signup</p></div>
        <div role="group" aria-label="Display" className="flex rounded-lg bg-zinc-100 p-0.5 text-xs dark:bg-zinc-900">{([['pct', '%'], ['users', 'Users']] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)} className={`rounded-md px-2.5 py-1 font-medium ${mode === value ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{label}</button>)}</div>
      </div>
      <div className="mt-4 overflow-x-auto" data-lenis-prevent>
        <table className="w-full min-w-[30rem] border-separate border-spacing-1 text-xs">
          <thead><tr className="text-zinc-500"><th className="text-left font-medium">Cohort</th>{Array.from({ length: 6 }, (_, col) => <th key={col} className="font-medium">M{col}</th>)}</tr></thead>
          <tbody>
            {cohorts.map(([month, size, values], row) => (
              <tr key={month} tabIndex={0} onMouseEnter={() => setHover(row)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(row)} onBlur={() => setHover(null)} className={`outline-none transition-opacity ${hover !== null && hover !== row ? 'opacity-40' : ''}`}>
                <th scope="row" className="whitespace-nowrap pr-2 text-left font-medium text-zinc-800 dark:text-zinc-200">{month} <span className="font-normal text-zinc-400">{hover === row ? `· ${size.toLocaleString('en-US')}` : ''}</span></th>
                {Array.from({ length: 6 }, (_, col) => col < values.length ? <td key={col} className="h-8 rounded-md text-center tabular-nums text-zinc-900 dark:text-zinc-100" style={cell(values[col])}>{mode === 'pct' ? `${values[col]}%` : Math.round((values[col] / 100) * size).toLocaleString('en-US')}</td> : <td key={col} className="h-8 rounded-md bg-zinc-50 dark:bg-zinc-900" />)}
              </tr>
            ))}
            <tr className="font-semibold"><th scope="row" className="pt-1 text-left text-zinc-950 dark:text-white">Average</th>{average.map((value, col) => <td key={col} className="pt-1 text-center tabular-nums text-violet-700 dark:text-violet-300">{value}%</td>)}</tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
