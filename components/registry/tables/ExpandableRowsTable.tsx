/**
 * @registry
 * name: Expandable Rows Table
 * category: Tables
 * style: Minimal
 * tags: recent
 * description: Tableau de commandes dont chaque ligne se deplie pour afficher le detail des articles.
 * prompt: Create an orders table where each row has a chevron toggle (aria-expanded, aria-controls) that reveals a detail row spanning all columns with line items and totals; chevron rotates. Light and dark mode.
 */
'use client';
import { ChevronRight } from 'lucide-react';
import { Fragment, useState } from 'react';

const orders = [
  { id: '#4821', customer: 'Nadia R.', total: 128, items: [['Linen shirt', 1, 68], ['Canvas tote', 2, 30]] },
  { id: '#4820', customer: 'Paul D.', total: 54, items: [['Ceramic mug', 3, 18]] },
  { id: '#4819', customer: 'Yuki T.', total: 212, items: [['Wool throw', 1, 142], ['Candle', 2, 35]] },
] as const;

export function ExpandableRowsTable() {
  const [open, setOpen] = useState<string | null>('#4821');

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-zinc-200 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"><tr><th className="w-10" /><th className="px-3 py-3 font-medium">Order</th><th className="px-3 py-3 font-medium">Customer</th><th className="px-4 py-3 text-right font-medium">Total</th></tr></thead>
        <tbody>
          {orders.map((order) => {
            const expanded = open === order.id;
            return (
              <Fragment key={order.id}>
                <tr className="border-t border-zinc-100 first:border-0 dark:border-zinc-900">
                  <td className="pl-3"><button type="button" aria-label={`Details for order ${order.id}`} aria-expanded={expanded} aria-controls={`order-${order.id}`} onClick={() => setOpen(expanded ? null : order.id)} className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"><ChevronRight className={`size-4 transition-transform ${expanded ? 'rotate-90' : ''}`} /></button></td>
                  <td className="px-3 py-3 font-medium text-zinc-900 dark:text-white">{order.id}</td>
                  <td className="px-3 py-3 text-zinc-600 dark:text-zinc-400">{order.customer}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-zinc-900 dark:text-white">${order.total}</td>
                </tr>
                {expanded && (
                  <tr id={`order-${order.id}`} className="bg-zinc-50 dark:bg-zinc-900/60">
                    <td colSpan={4} className="px-12 py-3">
                      <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                        {order.items.map(([name, qty, price]) => <li key={name} className="flex justify-between"><span>{qty} × {name}</span><span className="tabular-nums">${Number(qty) * Number(price)}</span></li>)}
                      </ul>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
