/**
 * @registry
 * name: Dot Plot Chart
 * category: Charts
 * style: Editorial
 * tags: recent
 * description: Graphique en haltères comparant deux années par pays : points reliés, écart affiché et tri par variation.
 * prompt: Create an editorial dumbbell dot plot comparing remote-work share in 2019 vs 2025 for six countries: each row has a label, a light track, two dots (hollow 2019, filled 2025) joined by a line and the +delta on the right; a sort toggle (by 2025 value / by change) reorders rows with a smooth transition; serif title and source note. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const rows = [
  { country: 'Netherlands', before: 14, after: 38 }, { country: 'United States', before: 9, after: 29 }, { country: 'France', before: 7, after: 24 },
  { country: 'Germany', before: 8, after: 26 }, { country: 'Japan', before: 4, after: 13 }, { country: 'Brazil', before: 5, after: 19 },
];

export function DotPlotChart() {
  const [sort, setSort] = useState<'value' | 'change'>('value');
  const order = [...rows].sort((a, b) => (sort === 'value' ? b.after - a.after : b.after - b.before - (a.after - a.before))).map((row) => row.country);

  return (
    <figure className="w-full max-w-lg rounded-2xl bg-[#fbfaf7] p-5 dark:bg-zinc-950">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <figcaption className="font-serif text-xl text-zinc-900 dark:text-zinc-100">Remote work, then and now</figcaption>
        <label className="text-xs text-zinc-500">Sort by <select value={sort} onChange={(event) => setSort(event.target.value as 'value' | 'change')} className="ml-1 rounded border border-zinc-300 bg-transparent px-1 py-0.5 dark:border-zinc-700"><option value="value">2025 share</option><option value="change">Change</option></select></label>
      </div>
      <div className="mt-2 flex gap-4 text-xs text-zinc-500"><span className="flex items-center gap-1"><span className="size-2.5 rounded-full border-2 border-zinc-400" />2019</span><span className="flex items-center gap-1"><span className="size-2.5 rounded-full bg-rose-600" />2025</span></div>
      <ul className="relative mt-3" style={{ height: rows.length * 36 }}>
        {rows.map((row) => (
          <li key={row.country} className="absolute inset-x-0 flex h-9 items-center gap-3 transition-transform duration-500" style={{ transform: `translateY(${order.indexOf(row.country) * 36}px)` }}>
            <span className="w-24 shrink-0 truncate text-sm text-zinc-700 dark:text-zinc-300">{row.country}</span>
            <span className="relative h-full flex-1">
              <span className="absolute inset-x-0 top-1/2 h-px bg-zinc-200 dark:bg-zinc-800" />
              <span className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-rose-300 dark:bg-rose-800" style={{ left: `${(row.before / 40) * 100}%`, width: `${((row.after - row.before) / 40) * 100}%` }} />
              <span className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-400 bg-[#fbfaf7] dark:bg-zinc-950" style={{ left: `${(row.before / 40) * 100}%` }} />
              <span className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600" style={{ left: `${(row.after / 40) * 100}%` }} />
            </span>
            <span className="w-10 text-right text-xs font-semibold tabular-nums text-rose-700 dark:text-rose-400">+{row.after - row.before}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-zinc-400">Share of workdays from home, %. Illustrative data.</p>
    </figure>
  );
}
