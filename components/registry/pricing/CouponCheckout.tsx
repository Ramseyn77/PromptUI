/**
 * @registry
 * name: Coupon Checkout
 * category: Pricing
 * style: Minimal
 * tags: recent
 * description: Recapitulatif de commande avec code promo valide ou refuse et remise appliquee au total.
 * prompt: Create an order summary with a coupon field: applying "LAUNCH20" shows a green removable chip and a -20% line, any other code shows an inline error (aria-invalid + aria-describedby); subtotal, discount and total update. Light and dark mode.
 */
'use client';
import { Tag, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';

const subtotal = 149;

export function CouponCheckout() {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState<string | null>(null);
  const [error, setError] = useState('');
  const discount = applied ? subtotal * 0.2 : 0;

  function apply(event: FormEvent) {
    event.preventDefault();
    if (code.trim().toUpperCase() === 'LAUNCH20') { setApplied('LAUNCH20'); setError(''); setCode(''); }
    else setError('This code is not valid. Try LAUNCH20.');
  }

  return (
    <section className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-white">Order summary</h3>
      <p className="mt-3 flex justify-between text-sm text-zinc-600 dark:text-zinc-400"><span>Pro annual plan</span><span className="tabular-nums">${subtotal.toFixed(2)}</span></p>
      {applied ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 py-1 pl-3 pr-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          <Tag aria-hidden className="size-3.5" /> {applied}
          <button type="button" aria-label="Remove coupon" onClick={() => setApplied(null)} className="grid size-5 place-items-center rounded-full hover:bg-emerald-500/20"><X className="size-3" /></button>
        </p>
      ) : (
        <form onSubmit={apply} className="mt-4 flex gap-2">
          <label htmlFor="coupon" className="sr-only">Coupon code</label>
          <input id="coupon" value={code} onChange={(event) => setCode(event.target.value)} placeholder="Coupon code" aria-invalid={Boolean(error)} aria-describedby={error ? 'coupon-error' : undefined} className="h-10 min-w-0 flex-1 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm uppercase text-zinc-900 outline-none focus:border-teal-500 aria-[invalid=true]:border-rose-500 dark:border-zinc-700 dark:text-white" />
          <button type="submit" className="rounded-xl border border-zinc-300 px-4 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900">Apply</button>
        </form>
      )}
      {error && <p id="coupon-error" className="mt-2 text-xs text-rose-600 dark:text-rose-400">{error}</p>}
      <dl className="mt-5 space-y-1.5 border-t border-zinc-200 pt-4 text-sm dark:border-zinc-800">
        {applied && <div className="flex justify-between text-emerald-700 dark:text-emerald-400"><dt>Discount (20%)</dt><dd className="tabular-nums">−${discount.toFixed(2)}</dd></div>}
        <div className="flex justify-between text-base font-semibold text-zinc-900 dark:text-white"><dt>Total</dt><dd className="tabular-nums">${(subtotal - discount).toFixed(2)}</dd></div>
      </dl>
    </section>
  );
}
