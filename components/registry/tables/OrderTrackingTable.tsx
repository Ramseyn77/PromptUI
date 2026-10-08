/**
 * @registry
 * name: Order Tracking Table
 * category: Tables
 * style: SaaS
 * tags: recent
 * description: Suivi de livraisons avec mini barre d'étapes par commande et date estimée.
 * prompt: Create a shipments table where each row shows order id, carrier, a 4-segment progress track (Ordered, Packed, Shipped, Delivered) filled up to the current stage with an sr-only stage label, and ETA. Light and dark mode.
 */
const stages = ['Ordered', 'Packed', 'Shipped', 'Delivered'];
const shipments = [
  { id: '#8841', carrier: 'DHL', stage: 3, eta: 'Delivered' },
  { id: '#8840', carrier: 'UPS', stage: 2, eta: 'Tomorrow' },
  { id: '#8839', carrier: 'La Poste', stage: 1, eta: 'Oct 3' },
  { id: '#8838', carrier: 'DHL', stage: 0, eta: 'Oct 5' },
];

export function OrderTrackingTable() {
  return (
    <div className="w-full max-w-xl overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full min-w-[440px] text-left text-sm">
        <thead className="border-b border-zinc-200 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"><tr><th className="px-4 py-3 font-medium">Order</th><th className="px-4 py-3 font-medium">Progress</th><th className="px-4 py-3 text-right font-medium">ETA</th></tr></thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td className="px-4 py-3"><p className="font-medium text-zinc-900 dark:text-white">{shipment.id}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">{shipment.carrier}</p></td>
              <td className="px-4 py-3">
                <div aria-hidden className="flex gap-1">{stages.map((stage, index) => <span key={stage} className={`h-1.5 flex-1 rounded-full ${index <= shipment.stage ? (shipment.stage === 3 ? 'bg-emerald-500' : 'bg-teal-500') : 'bg-zinc-200 dark:bg-zinc-800'}`} />)}</div>
                <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400">{stages[shipment.stage]}</p>
              </td>
              <td className={`px-4 py-3 text-right ${shipment.stage === 3 ? 'font-medium text-emerald-600 dark:text-emerald-400' : 'text-zinc-700 dark:text-zinc-300'}`}>{shipment.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
