/**
 * @registry
 * name: Inventory Alerts Widget
 * category: Dashboard
 * style: SaaS
 * tags: recent
 * description: Widget de stock : produits sous le seuil avec jauge de niveau, jours restants estimés et bouton de réassort.
 * prompt: Create an inventory alerts widget: header with "4 items low" badge; rows for products with thumbnail initial, SKU, a stock level bar colored by severity (out = rose, low = amber), "~3 days left" estimate and a Reorder button that switches to "Ordered · arrives Fri" (aria-live); a filter toggle Low / Out of stock. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const items = [
  { name: 'Ceramic mug', sku: 'MUG-014', stock: 0, max: 120, days: 0 },
  { name: 'Linen tote', sku: 'TOT-203', stock: 8, max: 80, days: 3 },
  { name: 'Notebook A5', sku: 'NBK-511', stock: 14, max: 200, days: 5 },
  { name: 'Brass pen', sku: 'PEN-090', stock: 0, max: 60, days: 0 },
];

export function InventoryAlertsWidget() {
  const [ordered, setOrdered] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'out'>('all');
  const shown = items.filter((item) => filter === 'all' || item.stock === 0);

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Inventory</h3>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">{items.length} items low</span>
        <div role="radiogroup" aria-label="Filter" className="ml-auto flex rounded-md bg-zinc-100 p-0.5 text-xs dark:bg-zinc-900">{(['all', 'out'] as const).map((value) => <button key={value} type="button" role="radio" aria-checked={filter === value} onClick={() => setFilter(value)} className={`rounded px-2 py-0.5 ${filter === value ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{value === 'all' ? 'Low' : 'Out of stock'}</button>)}</div>
      </div>
      <ul className="mt-3 space-y-3">
        {shown.map((item) => {
          const pct = (item.stock / item.max) * 100;
          const done = ordered.includes(item.sku);
          return (
            <li key={item.sku} className="flex items-center gap-3">
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-lg bg-zinc-100 text-sm font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{item.name[0]}</span>
              <div className="min-w-0 flex-1">
                <p className="flex justify-between text-sm"><span className="truncate font-medium text-zinc-900 dark:text-zinc-100">{item.name}</span><span className={`text-xs ${item.stock ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}`}>{item.stock ? `${item.stock} left · ~${item.days}d` : 'Out of stock'}</span></p>
                <div className="mt-1 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className={`h-full rounded-full ${item.stock ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${Math.max(pct, 2)}%` }} /></div>
                <p className="mt-0.5 font-mono text-[10px] text-zinc-400">{item.sku}</p>
              </div>
              <button type="button" disabled={done} onClick={() => setOrdered((list) => [...list, item.sku])} aria-live="polite" className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold ${done ? 'text-emerald-600 dark:text-emerald-400' : 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'}`}>{done ? 'Ordered · Fri' : 'Reorder'}</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
