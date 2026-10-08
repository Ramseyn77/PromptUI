/**
 * @registry
 * name: Density Toggle Table
 * category: Tables
 * style: Minimal
 * tags: recent
 * description: Tableau avec choix de densité compacte, normale ou aérée et affichage des colonnes.
 * prompt: Create a table toolbar with a density segmented control (Compact / Default / Relaxed changing row padding) and a "Columns" checkbox list to show or hide optional columns; the table re-renders accordingly. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const rows = [
  { name: 'Homepage', views: '48.2k', bounce: '32%', time: '1m 42s' },
  { name: 'Pricing', views: '12.9k', bounce: '41%', time: '2m 05s' },
  { name: 'Docs', views: '31.4k', bounce: '18%', time: '4m 11s' },
];
const densities = { Compact: 'py-1.5', Default: 'py-3', Relaxed: 'py-5' } as const;
const optional = ['bounce', 'time'] as const;

export function DensityToggleTable() {
  const [density, setDensity] = useState<keyof typeof densities>('Default');
  const [shown, setShown] = useState<string[]>(['bounce', 'time']);
  const pad = densities[density];

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center gap-3 border-b border-zinc-200 p-3 dark:border-zinc-800">
        <div role="radiogroup" aria-label="Row density" className="flex rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-900">
          {(Object.keys(densities) as Array<keyof typeof densities>).map((name) => (
            <button key={name} type="button" role="radio" aria-checked={density === name} onClick={() => setDensity(name)} className={`rounded-md px-2.5 py-1 text-xs font-medium ${density === name ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>{name}</button>
          ))}
        </div>
        <fieldset className="ml-auto flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
          <legend className="sr-only">Visible columns</legend>
          {optional.map((column) => (
            <label key={column} className="inline-flex items-center gap-1.5 capitalize">
              <input type="checkbox" checked={shown.includes(column)} onChange={() => setShown((current) => (current.includes(column) ? current.filter((item) => item !== column) : [...current, column]))} className="accent-teal-600" />{column}
            </label>
          ))}
        </fieldset>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-zinc-500 dark:text-zinc-400"><tr><th className="px-4 py-2 font-medium">Page</th><th className="px-4 py-2 text-right font-medium">Views</th>{shown.includes('bounce') && <th className="px-4 py-2 text-right font-medium">Bounce</th>}{shown.includes('time') && <th className="px-4 py-2 text-right font-medium">Avg. time</th>}</tr></thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {rows.map((row) => (
            <tr key={row.name} className="text-zinc-700 dark:text-zinc-300">
              <td className={`px-4 font-medium text-zinc-900 transition-all dark:text-white ${pad}`}>{row.name}</td>
              <td className={`px-4 text-right tabular-nums transition-all ${pad}`}>{row.views}</td>
              {shown.includes('bounce') && <td className={`px-4 text-right tabular-nums transition-all ${pad}`}>{row.bounce}</td>}
              {shown.includes('time') && <td className={`px-4 text-right tabular-nums transition-all ${pad}`}>{row.time}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
