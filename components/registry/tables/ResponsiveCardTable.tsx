/**
 * @registry
 * name: Responsive Card Table
 * category: Tables
 * style: Minimal
 * tags: featured, recent
 * description: Donnees affichees en tableau sur desktop et en cartes empilees sur mobile, sans defilement horizontal.
 * prompt: Create responsive tabular data: a real <table> from md up, and below md the same rows rendered as stacked cards (a <ul> with label/value pairs via <dl>). No horizontal scroll on mobile. Light and dark mode.
 */
const orders = [
  { id: 'ORD-301', customer: 'Nadia Rossi', date: 'Sep 24', total: '$128.00', status: 'Shipped' },
  { id: 'ORD-300', customer: 'Paul Dubois', date: 'Sep 23', total: '$54.00', status: 'Processing' },
  { id: 'ORD-299', customer: 'Yuki Tanaka', date: 'Sep 22', total: '$212.00', status: 'Delivered' },
];
const headers = ['Order', 'Customer', 'Date', 'Total', 'Status'] as const;

export function ResponsiveCardTable() {
  const values = (order: (typeof orders)[number]) => [order.id, order.customer, order.date, order.total, order.status];
  return (
    <div className="w-full max-w-3xl">
      <table className="hidden w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left text-sm md:table dark:border-zinc-800 dark:bg-zinc-950">
        <thead className="bg-zinc-50 text-xs text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400"><tr>{headers.map((header) => <th key={header} className="px-4 py-3 font-medium">{header}</th>)}</tr></thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {orders.map((order) => <tr key={order.id}>{values(order).map((value, index) => <td key={headers[index]} className={`px-4 py-3 ${index === 0 ? 'font-mono text-xs text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>{value}</td>)}</tr>)}
        </tbody>
      </table>
      <ul className="grid gap-3 md:hidden">
        {orders.map((order) => (
          <li key={order.id} className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {values(order).map((value, index) => (
                <div key={headers[index]} className={index === 1 ? 'col-span-2' : ''}>
                  <dt className="text-xs text-zinc-500 dark:text-zinc-400">{headers[index]}</dt>
                  <dd className="font-medium text-zinc-900 dark:text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
