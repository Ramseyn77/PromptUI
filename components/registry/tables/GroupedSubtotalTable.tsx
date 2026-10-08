/**
 * @registry
 * name: Grouped Subtotal Table
 * category: Tables
 * style: Minimal
 * tags: recent
 * description: Tableau de ventes groupé par région avec en-têtes de groupe repliables, sous-totaux et total général.
 * prompt: Create a grouped table of sales by region: group header rows (th scope="rowgroup") with a collapse toggle and item count, item rows, a subtotal row per group, and a grand total footer; a "Group by" select switches grouping between Region and Product, recomputing groups. Right-aligned numbers, horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const sales = [
  { region: 'Europe', product: 'Pro', rep: 'Ana', amount: 12400 }, { region: 'Europe', product: 'Team', rep: 'Leo', amount: 18900 },
  { region: 'Africa', product: 'Pro', rep: 'Awa', amount: 9100 }, { region: 'Africa', product: 'Enterprise', rep: 'Kofi', amount: 42000 },
  { region: 'Americas', product: 'Team', rep: 'Mia', amount: 21500 }, { region: 'Americas', product: 'Pro', rep: 'Sam', amount: 7800 },
];
const money = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function GroupedSubtotalTable() {
  const [by, setBy] = useState<'region' | 'product'>('region');
  const [closed, setClosed] = useState<string[]>([]);
  const groups = [...new Set(sales.map((sale) => sale[by]))];
  const other = by === 'region' ? 'product' : 'region';

  return (
    <div className="w-full max-w-xl">
      <label className="mb-2 flex items-center justify-end gap-2 text-xs text-zinc-500">Group by
        <select value={by} onChange={(event) => { setBy(event.target.value as 'region' | 'product'); setClosed([]); }} className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"><option value="region">Region</option><option value="product">Product</option></select>
      </label>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
        <table className="w-full min-w-[26rem] text-sm">
          <thead className="text-left text-xs text-zinc-500"><tr className="border-b border-zinc-200 dark:border-zinc-800"><th className="px-3 py-2 font-medium capitalize">{other}</th><th className="px-3 font-medium">Rep</th><th className="px-3 text-right font-medium">Amount</th></tr></thead>
          {groups.map((group) => {
            const items = sales.filter((sale) => sale[by] === group);
            const isOpen = !closed.includes(group);
            return (
              <tbody key={group} className="border-b border-zinc-200 dark:border-zinc-800">
                <tr className="bg-zinc-50 dark:bg-zinc-900/60">
                  <th scope="rowgroup" colSpan={3} className="px-3 py-2 text-left">
                    <button type="button" aria-expanded={isOpen} onClick={() => setClosed((list) => (isOpen ? [...list, group] : list.filter((item) => item !== group)))} className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100"><ChevronDown aria-hidden className={`size-4 transition-transform ${isOpen ? '' : '-rotate-90'}`} />{group}<span className="text-xs font-normal text-zinc-500">({items.length})</span></button>
                  </th>
                </tr>
                {isOpen && items.map((sale) => <tr key={sale.rep}><td className="px-3 py-2 pl-9 text-zinc-700 dark:text-zinc-300">{sale[other]}</td><td className="px-3 text-zinc-700 dark:text-zinc-300">{sale.rep}</td><td className="px-3 text-right tabular-nums text-zinc-900 dark:text-zinc-100">{money(sale.amount)}</td></tr>)}
                <tr><td colSpan={2} className="px-3 py-1.5 pl-9 text-xs text-zinc-500">Subtotal</td><td className="px-3 text-right text-xs font-semibold tabular-nums text-zinc-700 dark:text-zinc-300">{money(items.reduce((total, sale) => total + sale.amount, 0))}</td></tr>
              </tbody>
            );
          })}
          <tfoot><tr><td colSpan={2} className="px-3 py-2.5 font-semibold text-zinc-900 dark:text-zinc-100">Total</td><td className="px-3 text-right font-bold tabular-nums text-zinc-950 dark:text-zinc-50">{money(sales.reduce((total, sale) => total + sale.amount, 0))}</td></tr></tfoot>
        </table>
      </div>
    </div>
  );
}
