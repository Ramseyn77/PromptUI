/**
 * @registry
 * name: Invoice Table
 * category: Tables
 * style: Editorial
 * tags: recent
 * description: Facture avec lignes d articles, quantites, sous-total, TVA et total mis en avant.
 * prompt: Create an invoice line-items table: description with muted detail, qty, unit price, amount; a <tfoot> with subtotal, tax (20%) and a bold total row; right-aligned tabular numbers and an "Invoice #" header. Light and dark mode.
 */
const lines = [
  { item: 'Design system audit', detail: '12 hours', qty: 12, price: 90 },
  { item: 'Component library', detail: '24 components', qty: 1, price: 2400 },
  { item: 'Prompt pack', detail: 'FR + EN', qty: 1, price: 350 },
];

export function InvoiceTable() {
  const subtotal = lines.reduce((sum, line) => sum + line.qty * line.price, 0);
  const tax = subtotal * 0.2;
  const money = (value: number) => `€${value.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}`;

  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Invoice #2026-014</h3>
        <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">Due Oct 12</span>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead className="border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            <tr><th className="py-2 text-left font-medium">Item</th><th className="py-2 text-right font-medium">Qty</th><th className="py-2 text-right font-medium">Price</th><th className="py-2 text-right font-medium">Amount</th></tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {lines.map((line) => (
              <tr key={line.item}>
                <td className="py-3"><p className="font-medium text-zinc-900 dark:text-white">{line.item}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">{line.detail}</p></td>
                <td className="py-3 text-right tabular-nums text-zinc-600 dark:text-zinc-400">{line.qty}</td>
                <td className="py-3 text-right tabular-nums text-zinc-600 dark:text-zinc-400">{money(line.price)}</td>
                <td className="py-3 text-right tabular-nums text-zinc-900 dark:text-white">{money(line.qty * line.price)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="text-sm">
            <tr><td colSpan={3} className="pt-4 text-right text-zinc-500 dark:text-zinc-400">Subtotal</td><td className="pt-4 text-right tabular-nums text-zinc-900 dark:text-white">{money(subtotal)}</td></tr>
            <tr><td colSpan={3} className="pt-1 text-right text-zinc-500 dark:text-zinc-400">VAT 20%</td><td className="pt-1 text-right tabular-nums text-zinc-900 dark:text-white">{money(tax)}</td></tr>
            <tr><td colSpan={3} className="pt-3 text-right font-semibold text-zinc-900 dark:text-white">Total</td><td className="pt-3 text-right text-lg font-semibold tabular-nums text-teal-700 dark:text-teal-400">{money(subtotal + tax)}</td></tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
