/**
 * @registry
 * name: Recent Sales
 * category: Dashboard
 * style: Minimal
 * tags: recent
 * description: Liste des ventes recentes avec client, email, montant et resume du mois.
 * prompt: Create a "Recent sales" widget: subtitle "You made 265 sales this month", then rows with avatar initials, customer name and email (truncated), and a right-aligned "+$1,999.00" amount. Light and dark mode.
 */
const sales = [
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: 1999 },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: 39 },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: 299 },
  { name: 'William Kim', email: 'will@email.com', amount: 99 },
];

export function RecentSales() {
  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-white">Recent sales</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">You made 265 sales this month.</p>
      <ul className="mt-5 space-y-4">
        {sales.map((sale, index) => (
          <li key={sale.email} className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200" style={{ boxShadow: `inset 0 0 0 2px hsl(${index * 70 + 170} 60% 55% / .5)` }}>{sale.name.split(' ').map((part) => part[0]).join('')}</span>
            <div className="min-w-0 flex-1"><p className="text-sm font-medium text-zinc-900 dark:text-white">{sale.name}</p><p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{sale.email}</p></div>
            <p className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-white">+${sale.amount.toLocaleString('en-US')}.00</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
