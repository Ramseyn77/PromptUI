/**
 * @registry
 * name: Sortable Table
 * category: Tables
 * style: Minimal
 * tags: featured, recent
 * description: Tableau triable par colonne avec indicateur de sens et aria-sort.
 * prompt: Create a sortable data table: clicking a column header toggles ascending/descending sort (numbers and strings), shows an arrow indicator and sets aria-sort on the <th>. Horizontal scroll wrapper on small screens. Light and dark mode.
 */
'use client';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';

type Row = { name: string; plan: string; seats: number; mrr: number };
const rows: Row[] = [
  { name: 'Acme', plan: 'Enterprise', seats: 120, mrr: 9800 },
  { name: 'Lumen', plan: 'Pro', seats: 24, mrr: 1440 },
  { name: 'Orbit', plan: 'Pro', seats: 42, mrr: 2520 },
  { name: 'Kite', plan: 'Starter', seats: 5, mrr: 95 },
];
const columns: Array<{ key: keyof Row; label: string; numeric?: boolean }> = [
  { key: 'name', label: 'Company' },
  { key: 'plan', label: 'Plan' },
  { key: 'seats', label: 'Seats', numeric: true },
  { key: 'mrr', label: 'MRR', numeric: true },
];

export function SortableTable() {
  const [sort, setSort] = useState<{ key: keyof Row; dir: 'asc' | 'desc' }>({ key: 'mrr', dir: 'desc' });
  const sorted = useMemo(() => [...rows].sort((a, b) => {
    const result = a[sort.key] > b[sort.key] ? 1 : a[sort.key] < b[sort.key] ? -1 : 0;
    return sort.dir === 'asc' ? result : -result;
  }), [sort]);

  return (
    <div className="w-full max-w-2xl overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead className="border-b border-zinc-200 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <tr>
            {columns.map((column) => {
              const active = sort.key === column.key;
              const Icon = !active ? ArrowUpDown : sort.dir === 'asc' ? ArrowUp : ArrowDown;
              return (
                <th key={column.key} aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'} className={`px-4 py-3 font-medium ${column.numeric ? 'text-right' : ''}`}>
                  <button type="button" onClick={() => setSort({ key: column.key, dir: active && sort.dir === 'desc' ? 'asc' : 'desc' })} className={`inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white ${active ? 'text-zinc-900 dark:text-white' : ''}`}>
                    {column.label}<Icon aria-hidden className="size-3.5" />
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {sorted.map((row) => (
            <tr key={row.name} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
              <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">{row.name}</td>
              <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.plan}</td>
              <td className="px-4 py-3 text-right tabular-nums text-zinc-600 dark:text-zinc-400">{row.seats}</td>
              <td className="px-4 py-3 text-right font-medium tabular-nums text-zinc-900 dark:text-white">${row.mrr.toLocaleString('en-US')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
