/**
 * @registry
 * name: Credit Card Form
 * category: Forms
 * style: Gradient
 * tags: featured, recent
 * description: Formulaire de carte bancaire avec carte en aperçu qui se retourne pour le CVC, formatage et détection du réseau.
 * prompt: Create a credit card form with a live card preview: number field auto-formats in groups of 4 and detects the network (VISA starts with 4, Mastercard 51–55, AMEX 34/37) shown on the card; name and expiry (MM/YY auto slash) update the preview; focusing CVC flips the card in 3D to show the back. autocomplete attributes (cc-number, cc-name, cc-exp, cc-csc). Flip is instant with reduced motion. Light and dark mode.
 */
'use client';
import { useState } from 'react';

function network(number: string) {
  if (/^4/.test(number)) return 'VISA';
  if (/^5[1-5]/.test(number)) return 'Mastercard';
  if (/^3[47]/.test(number)) return 'AMEX';
  return '';
}

export function CreditCardForm() {
  const [number, setNumber] = useState('4242 4242 4242');
  const [name, setName] = useState('ADA OKAFOR');
  const [expiry, setExpiry] = useState('09/29');
  const [cvc, setCvc] = useState('');
  const [back, setBack] = useState(false);
  const digits = number.replace(/\D/g, '');
  const field = 'mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100';

  return (
    <form onSubmit={(event) => event.preventDefault()} className="w-full max-w-sm">
      <div className="mx-auto h-44 w-72 [perspective:1000px]">
        <div className="relative size-full transition-transform duration-700 [transform-style:preserve-3d] motion-reduce:transition-none" style={{ transform: back ? 'rotateY(180deg)' : 'none' }}>
          <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 p-5 text-white shadow-xl [backface-visibility:hidden]">
            <div className="flex justify-between"><span aria-hidden className="h-7 w-10 rounded-md bg-gradient-to-br from-amber-200 to-amber-500" /><span className="text-sm font-bold italic">{network(digits)}</span></div>
            <p className="font-mono text-lg tracking-[0.15em]">{(digits.padEnd(16, '•').match(/.{1,4}/g) ?? []).join(' ')}</p>
            <div className="flex justify-between text-xs uppercase"><span className="truncate">{name || 'Your name'}</span><span>{expiry || 'MM/YY'}</span></div>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="mt-6 h-9 bg-black/70" />
            <div className="mx-5 mt-4 flex h-8 items-center justify-end rounded bg-white px-3 font-mono text-sm text-zinc-900">{cvc.padEnd(3, '•')}</div>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <label className="col-span-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">Card number<input inputMode="numeric" autoComplete="cc-number" value={number} onChange={(event) => setNumber(event.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})(?=.)/g, '$1 '))} className={`${field} font-mono`} /></label>
        <label className="col-span-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">Name on card<input autoComplete="cc-name" value={name} onChange={(event) => setName(event.target.value.toUpperCase())} className={field} /></label>
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Expiry<input inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" value={expiry} onChange={(event) => { const value = event.target.value.replace(/\D/g, '').slice(0, 4); setExpiry(value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value); }} className={field} /></label>
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">CVC<input inputMode="numeric" autoComplete="cc-csc" value={cvc} onFocus={() => setBack(true)} onBlur={() => setBack(false)} onChange={(event) => setCvc(event.target.value.replace(/\D/g, '').slice(0, 4))} className={field} /></label>
        <button type="submit" className="col-span-2 mt-1 rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Pay €48.00</button>
      </div>
    </form>
  );
}
