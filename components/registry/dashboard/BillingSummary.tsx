/**
 * @registry
 * name: Billing Summary
 * category: Dashboard
 * style: SaaS
 * tags: recent
 * description: Résumé de facturation avec plan actuel, prochaine facture, utilisation et carte enregistrée.
 * prompt: Create a billing summary card: current plan with price and "Change plan", next invoice date and amount, two usage meters (seats, API calls) with warning color above 80%, and the saved card (brand badge, •••• 4242, expiry) with "Update". Light and dark mode.
 */
import { CreditCard } from 'lucide-react';

const usage = [
  { label: 'Seats', used: 8, limit: 10 },
  { label: 'API calls', used: 612, limit: 1000, unit: 'k' },
];

export function BillingSummary() {
  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Current plan</p>
          <p className="text-xl font-semibold text-zinc-900 dark:text-white">Pro · $49<span className="text-sm font-normal text-zinc-500">/mo</span></p>
        </div>
        <button type="button" className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900">Change plan</button>
      </div>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">Next invoice <strong className="text-zinc-900 dark:text-white">$49.00</strong> on Oct 14</p>
      <div className="mt-5 space-y-4">
        {usage.map((item) => {
          const share = item.used / item.limit;
          return (
            <div key={item.label}>
              <div className="flex justify-between text-sm"><span className="text-zinc-700 dark:text-zinc-300">{item.label}</span><span className="tabular-nums text-zinc-500 dark:text-zinc-400">{item.used}{item.unit ?? ''} / {item.limit}{item.unit ?? ''}</span></div>
              <div role="progressbar" aria-label={`${item.label} usage`} aria-valuenow={Math.round(share * 100)} aria-valuemin={0} aria-valuemax={100} className="mt-1.5 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className={`h-full rounded-full ${share >= 0.8 ? 'bg-amber-500' : 'bg-teal-500'}`} style={{ width: `${share * 100}%` }} /></div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
        <span className="grid h-8 w-11 place-items-center rounded-md bg-gradient-to-br from-indigo-500 to-sky-500 text-white"><CreditCard aria-hidden className="size-4" /></span>
        <div className="flex-1 text-sm"><p className="font-medium text-zinc-900 dark:text-white">Visa •••• 4242</p><p className="text-xs text-zinc-500 dark:text-zinc-400">Expires 08/28</p></div>
        <button type="button" className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-400">Update</button>
      </div>
    </section>
  );
}
