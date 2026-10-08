/**
 * @registry
 * name: Load More Table
 * category: Tables
 * style: Minimal
 * tags: recent
 * description: Tableau de commandes qui charge les lignes suivantes par lot avec squelettes, compteur et fin de liste.
 * prompt: Create a "load more" orders table: shows 5 rows initially, a "Load 5 more" button appends skeleton rows for 700ms then real rows (deterministic data), "Showing 10 of 23" counter in an aria-live region, the button disappears at the end with "You've reached the end". Horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const all = Array.from({ length: 23 }, (_, index) => ({ id: `#${4820 - index}`, customer: ['Awa D.', 'Leo M.', 'Kofi A.', 'Mia S.', 'Yuki T.'][index % 5], total: 24 + ((index * 37) % 180), status: ['Paid', 'Shipped', 'Pending'][index % 3] }));
const badge = { Paid: 'text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-500/10', Shipped: 'text-sky-700 bg-sky-50 dark:text-sky-300 dark:bg-sky-500/10', Pending: 'text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-500/10' } as const;

export function LoadMoreTable() {
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const more = () => { setLoading(true); window.setTimeout(() => { setCount((value) => Math.min(all.length, value + 5)); setLoading(false); }, 700); };

  return (
    <div className="w-full max-w-lg">
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
        <table className="w-full min-w-[24rem] text-sm">
          <thead className="text-left text-xs text-zinc-500"><tr className="border-b border-zinc-200 dark:border-zinc-800"><th className="px-3 py-2 font-medium">Order</th><th className="font-medium">Customer</th><th className="font-medium">Status</th><th className="px-3 text-right font-medium">Total</th></tr></thead>
          <tbody aria-busy={loading}>
            {all.slice(0, count).map((row) => <tr key={row.id} className="border-b border-zinc-100 dark:border-zinc-900"><td className="px-3 py-2 font-mono text-xs text-zinc-500">{row.id}</td><td className="text-zinc-900 dark:text-zinc-100">{row.customer}</td><td><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge[row.status as keyof typeof badge]}`}>{row.status}</span></td><td className="px-3 text-right tabular-nums text-zinc-900 dark:text-zinc-100">€{row.total}</td></tr>)}
            {loading && Array.from({ length: Math.min(5, all.length - count) }, (_, index) => <tr key={`s${index}`} aria-hidden className="border-b border-zinc-100 dark:border-zinc-900">{[40, 60, 45, 30].map((width, cell) => <td key={cell} className="px-3 py-2.5"><span className="block h-3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" style={{ width: `${width}%` }} /></td>)}</tr>)}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <p aria-live="polite" className="text-zinc-500">Showing {count} of {all.length}</p>
        {count < all.length ? <button type="button" onClick={more} disabled={loading} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-1.5 font-medium text-zinc-800 disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-200">{loading && <Loader2 aria-hidden className="size-4 animate-spin" />}Load 5 more</button> : <p className="text-zinc-400">You’ve reached the end</p>}
      </div>
    </div>
  );
}
