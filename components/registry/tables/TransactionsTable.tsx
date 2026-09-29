/**
 * @registry
 * name: Transactions Table
 * category: Tables
 * style: Minimal
 * tags: recent
 * description: Liste de transactions avec icone de categorie, montants credit ou debit colores et statut.
 * prompt: Create a transactions table: merchant with a category icon tile, date, status (Completed / Pending with spinner-free dot), and amount right-aligned, green with "+" for credits and neutral for debits; groups under a date heading row. Light and dark mode.
 */
import { ArrowDownLeft, Coffee, ShoppingCart, Zap } from 'lucide-react';

const transactions = [
  { day: 'Today', icon: Coffee, merchant: 'Blue Bottle', category: 'Food', amount: -6.4, status: 'Completed' },
  { day: 'Today', icon: ArrowDownLeft, merchant: 'Stripe payout', category: 'Income', amount: 1240, status: 'Pending' },
  { day: 'Yesterday', icon: ShoppingCart, merchant: 'Monoprix', category: 'Groceries', amount: -54.2, status: 'Completed' },
  { day: 'Yesterday', icon: Zap, merchant: 'EDF', category: 'Utilities', amount: -72, status: 'Completed' },
];

export function TransactionsTable() {
  const days = [...new Set(transactions.map((item) => item.day))];
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full text-sm">
        {days.map((day) => (
          <tbody key={day}>
            <tr><th colSpan={2} scope="colgroup" className="bg-zinc-50 px-4 py-2 text-left text-xs font-medium text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">{day}</th></tr>
            {transactions.filter((item) => item.day === day).map(({ icon: Icon, ...item }) => (
              <tr key={item.merchant} className="border-t border-zinc-100 dark:border-zinc-900">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className={`grid size-9 place-items-center rounded-xl ${item.amount > 0 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}><Icon aria-hidden className="size-4" /></span>
                    <span><span className="block font-medium text-zinc-900 dark:text-white">{item.merchant}</span><span className="block text-xs text-zinc-500 dark:text-zinc-400">{item.category} · {item.status === 'Pending' ? <span className="text-amber-600 dark:text-amber-400">Pending</span> : 'Completed'}</span></span>
                  </div>
                </td>
                <td className={`px-4 py-3 text-right font-semibold tabular-nums ${item.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-white'}`}>
                  {item.amount > 0 ? '+' : '−'}${Math.abs(item.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
