/**
 * @registry
 * name: Comparison Diff Table
 * category: Tables
 * style: Minimal
 * tags: recent
 * description: Comparaison de deux versions d'une configuration : lignes ajoutées, supprimées et modifiées, filtre « différences seulement ».
 * prompt: Create a side-by-side comparison table of two config versions (v12 vs v13): rows for settings with old and new values, status icons and tints (added emerald, removed rose with strike-through, changed amber, unchanged plain), a "Show differences only" switch (role="switch"), and a summary "2 added · 1 removed · 3 changed". Horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const rows = [
  ['region', 'eu-west-1', 'eu-west-1'], ['instances', '4', '6'], ['timeout', '30s', '45s'], ['cache', 'redis', 'redis'],
  ['logLevel', 'info', 'warn'], ['legacyAuth', 'true', ''], ['rateLimit', '', '1000/min'], ['cdn', '', 'enabled'],
] as const;
const status = (before: string, after: string) => (!before ? 'added' : !after ? 'removed' : before === after ? 'same' : 'changed');
const tone = { added: 'bg-emerald-50 dark:bg-emerald-500/10', removed: 'bg-rose-50 dark:bg-rose-500/10', changed: 'bg-amber-50 dark:bg-amber-500/10', same: '' } as const;
const mark = { added: ['+', 'text-emerald-600'], removed: ['−', 'text-rose-600'], changed: ['~', 'text-amber-600'], same: ['', ''] } as const;

export function ComparisonDiffTable() {
  const [onlyDiff, setOnlyDiff] = useState(false);
  const counts = { added: 0, removed: 0, changed: 0, same: 0 };
  rows.forEach(([, before, after]) => { counts[status(before, after)] += 1; });
  const shown = rows.filter(([, before, after]) => !onlyDiff || status(before, after) !== 'same');

  return (
    <div className="w-full max-w-lg">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-zinc-500"><span className="text-emerald-600">{counts.added} added</span> · <span className="text-rose-600">{counts.removed} removed</span> · <span className="text-amber-600">{counts.changed} changed</span></span>
        <label className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">Differences only<button type="button" role="switch" aria-checked={onlyDiff} onClick={() => setOnlyDiff((value) => !value)} className={`relative h-5 w-9 rounded-full transition ${onlyDiff ? 'bg-teal-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}><span className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform ${onlyDiff ? 'translate-x-4' : 'translate-x-0.5'}`} /></button></label>
      </div>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
        <table className="w-full min-w-[26rem] font-mono text-xs">
          <thead className="text-left text-zinc-500"><tr className="border-b border-zinc-200 dark:border-zinc-800"><th className="w-6" /><th className="py-2 font-medium">key</th><th className="font-medium">v12</th><th className="font-medium">v13</th></tr></thead>
          <tbody>
            {shown.map(([key, before, after]) => {
              const state = status(before, after);
              return (
                <tr key={key} className={`border-b border-zinc-100 last:border-0 dark:border-zinc-900 ${tone[state]}`}>
                  <td className={`pl-3 font-bold ${mark[state][1]}`}><span aria-hidden>{mark[state][0]}</span><span className="sr-only">{state}</span></td>
                  <td className="py-2 text-zinc-800 dark:text-zinc-200">{key}</td>
                  <td className={`text-zinc-600 dark:text-zinc-400 ${state === 'removed' || state === 'changed' ? 'line-through decoration-rose-400' : ''}`}>{before || '—'}</td>
                  <td className="pr-3 text-zinc-900 dark:text-zinc-100">{after || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
