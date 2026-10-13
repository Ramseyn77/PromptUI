/**
 * @registry
 * name: Subscription Manage Card
 * category: Cards
 * style: SaaS
 * tags: recent
 * description: Carte de gestion d'abonnement : plan actuel, prochaine facture, moyen de paiement, utilisation et actions pause / annulation avec confirmation.
 * prompt: Create a subscription management card: plan name "Pro · Monthly" with price and an Active badge, next invoice date and amount, card on file "Visa •••• 4242" with an Update link, a seats usage bar (7 of 10), and actions: Change plan, Pause for 1 month (toggles to a Paused badge with Resume), and Cancel which reveals an inline confirmation with "Keep subscription" and "Cancel at period end"; status changes are announced via aria-live. Light and dark mode.
 */
'use client';
import { CreditCard } from 'lucide-react';
import { useState } from 'react';

export function SubscriptionManageCard() {
  const [status, setStatus] = useState<'active' | 'paused' | 'canceling'>('active');
  const [confirming, setConfirming] = useState(false);
  const badge = { active: ['Active', 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'], paused: ['Paused', 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300'], canceling: ['Ends Nov 8', 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'] }[status];

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div><p className="text-xs uppercase tracking-wider text-zinc-500">Current plan</p><h3 className="mt-1 text-xl font-semibold text-zinc-950 dark:text-white">Pro · Monthly</h3><p className="text-sm text-zinc-500">$24 per month</p></div>
        <span aria-live="polite" className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge[1]}`}>{badge[0]}</span>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-zinc-50 p-4 text-sm dark:bg-zinc-800/60">
        <div><dt className="text-xs text-zinc-500">Next invoice</dt><dd className="font-semibold text-zinc-950 dark:text-white">{status === 'active' ? 'Nov 8 · $24.00' : '—'}</dd></div>
        <div><dt className="text-xs text-zinc-500">Payment</dt><dd className="flex items-center gap-1.5 font-semibold text-zinc-950 dark:text-white"><CreditCard aria-hidden className="size-4 text-zinc-400" />•••• 4242 <a href="#" className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Update</a></dd></div>
      </dl>
      <div className="mt-4"><div className="flex justify-between text-xs text-zinc-500"><span>Seats</span><span>7 of 10</span></div><div className="mt-1.5 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full w-[70%] rounded-full bg-indigo-600" /></div></div>
      {confirming ? (
        <div role="group" aria-label="Confirm cancellation" className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/30 dark:bg-rose-500/10">
          <p className="text-sm font-medium text-rose-900 dark:text-rose-100">Cancel Pro? You’ll keep access until Nov 8, then move to Free.</p>
          <div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => setConfirming(false)} className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-zinc-900 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-white dark:ring-zinc-700">Keep subscription</button><button type="button" onClick={() => { setStatus('canceling'); setConfirming(false); }} className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-500">Cancel at period end</button></div>
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" className="rounded-lg bg-zinc-950 px-3 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Change plan</button>
          {status === 'canceling' ? <button type="button" onClick={() => setStatus('active')} className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">Renew</button>
            : <button type="button" onClick={() => setStatus(status === 'paused' ? 'active' : 'paused')} className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">{status === 'paused' ? 'Resume' : 'Pause 1 month'}</button>}
          {status !== 'canceling' && <button type="button" onClick={() => setConfirming(true)} className="ml-auto px-2 py-2 text-sm font-medium text-rose-600 hover:underline dark:text-rose-400">Cancel</button>}
        </div>
      )}
    </section>
  );
}
