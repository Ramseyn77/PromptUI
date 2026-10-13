/**
 * @registry
 * name: Coupon Code Input
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Champ code promo de panier : application avec chargement, codes valides / expirés / invalides, remise affichée en puce retirable et total recalculé.
 * prompt: Create a checkout coupon code field: a collapsible "Have a promo code?" link that reveals an input + Apply button; Apply shows a short spinner, then validates against demo codes (WELCOME10 = 10% off, FREESHIP = shipping removed, SUMMER24 = expired, anything else = invalid) with inline error messages and aria-invalid; a valid code becomes a removable chip ("WELCOME10 −$8.40 ×"); the order summary (subtotal, shipping, discount, total) updates live via aria-live. Light and dark mode.
 */
'use client';
import { Loader2, Tag, X } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';

const subtotal = 84;
const shippingBase = 6;

export function CouponCodeInput() {
  const uid = useId();
  const [open, setOpen] = useState(true);
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const discount = applied === 'WELCOME10' ? subtotal * 0.1 : 0;
  const shipping = applied === 'FREESHIP' ? 0 : shippingBase;
  const total = subtotal - discount + shipping;

  function apply(event: FormEvent) {
    event.preventDefault();
    const value = code.trim().toUpperCase();
    if (!value) return;
    setBusy(true); setError('');
    window.setTimeout(() => {
      setBusy(false);
      if (value === 'WELCOME10' || value === 'FREESHIP') { setApplied(value); setCode(''); }
      else setError(value === 'SUMMER24' ? 'This code expired on Sep 30.' : 'That code isn’t valid.');
    }, 700);
  }

  return (
    <section className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-950 dark:text-white">Order summary</h3>
      {!applied && <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="mt-3 text-sm text-zinc-600 underline underline-offset-4 dark:text-zinc-400">Have a promo code?</button>}
      {open && !applied && (
        <form onSubmit={apply} className="mt-2">
          <div className="flex gap-2">
            <label htmlFor={`${uid}-code`} className="sr-only">Promo code</label>
            <input id={`${uid}-code`} value={code} aria-invalid={Boolean(error)} aria-describedby={`${uid}-error`} onChange={(event) => { setCode(event.target.value); setError(''); }} placeholder="Try WELCOME10" className={`min-w-0 flex-1 rounded-lg border bg-transparent px-3 py-2 font-mono text-sm uppercase text-zinc-900 outline-none placeholder:normal-case focus:ring-2 dark:text-zinc-100 ${error ? 'border-rose-500 focus:ring-rose-500/20' : 'border-zinc-300 focus:ring-zinc-900/10 dark:border-zinc-700'}`} />
            <button type="submit" disabled={!code.trim() || busy} className="flex w-20 items-center justify-center rounded-lg bg-zinc-950 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-zinc-950">{busy ? <Loader2 aria-label="Checking" className="size-4 motion-safe:animate-spin" /> : 'Apply'}</button>
          </div>
          <p id={`${uid}-error`} className="mt-1 h-4 text-xs text-rose-600 dark:text-rose-400">{error}</p>
        </form>
      )}
      {applied && <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 py-1 pl-2.5 pr-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300"><Tag aria-hidden className="size-3.5" />{applied} {applied === 'WELCOME10' ? `−$${discount.toFixed(2)}` : 'free shipping'}<button type="button" aria-label={`Remove code ${applied}`} onClick={() => setApplied(null)} className="grid size-5 place-items-center rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-500/20"><X aria-hidden className="size-3" /></button></p>}
      <dl aria-live="polite" className="mt-4 space-y-2 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-800">
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400"><dt>Subtotal</dt><dd className="tabular-nums">${subtotal.toFixed(2)}</dd></div>
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400"><dt>Shipping</dt><dd className="tabular-nums">{shipping ? `$${shipping.toFixed(2)}` : 'Free'}</dd></div>
        {discount > 0 && <div className="flex justify-between text-emerald-700 dark:text-emerald-400"><dt>Discount</dt><dd className="tabular-nums">−${discount.toFixed(2)}</dd></div>}
        <div className="flex justify-between font-semibold text-zinc-950 dark:text-white"><dt>Total</dt><dd className="tabular-nums">${total.toFixed(2)}</dd></div>
      </dl>
    </section>
  );
}
