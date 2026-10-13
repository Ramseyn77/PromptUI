/**
 * @registry
 * name: Payment Method Tabs
 * category: Forms
 * style: SaaS
 * tags: recent
 * description: Formulaire de paiement à onglets : carte, mobile money et virement, chacun avec ses champs, validation et récapitulatif du montant.
 * prompt: Create a payment form with method tabs (Card, Mobile money, Bank transfer) as an accessible tablist with arrow-key navigation; Card shows number (formatted in groups of 4), expiry MM/YY and CVC; Mobile money shows a provider radio group (MTN, Orange, Wave) and a phone field; Bank transfer shows copyable account details and a reference; a Pay button shows the amount and validates the active tab's fields with inline errors, then a success state (aria-live). Light and dark mode.
 */
'use client';
import { Building2, CreditCard, Smartphone } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';

const tabs = [{ id: 'card', label: 'Card', icon: CreditCard }, { id: 'mobile', label: 'Mobile money', icon: Smartphone }, { id: 'bank', label: 'Bank transfer', icon: Building2 }] as const;

export function PaymentMethodTabs() {
  const uid = useId();
  const [tab, setTab] = useState(0);
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' });
  const [provider, setProvider] = useState('Wave');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [paid, setPaid] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const next = (tab + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setTab(next); setErrors([]); refs.current[next]?.focus();
  }

  function pay() {
    const next: string[] = [];
    if (tab === 0) { if (card.number.replace(/\s/g, '').length !== 16) next.push('number'); if (!/^\d{2}\/\d{2}$/.test(card.expiry)) next.push('expiry'); if (!/^\d{3,4}$/.test(card.cvc)) next.push('cvc'); }
    if (tab === 1 && phone.replace(/\D/g, '').length < 8) next.push('phone');
    setErrors(next);
    if (!next.length) setPaid(true);
  }

  const field = (bad: boolean) => `mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 dark:bg-zinc-900 dark:text-zinc-100 ${bad ? 'border-rose-500 focus:ring-rose-500/20' : 'border-zinc-300 focus:ring-indigo-500/20 dark:border-zinc-700'}`;

  if (paid) return <div role="status" className="w-full max-w-md rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-500/30 dark:bg-emerald-500/10"><p className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Payment received</p><p className="mt-1 text-sm text-emerald-800 dark:text-emerald-200">$48.00 via {tabs[tab].label}</p><button type="button" onClick={() => setPaid(false)} className="mt-4 text-sm underline">Start over</button></div>;

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div role="tablist" aria-label="Payment method" onKeyDown={onKeyDown} className="grid grid-cols-3 gap-2">
        {tabs.map(({ id, label, icon: Icon }, index) => <button key={id} ref={(node) => { refs.current[index] = node; }} id={`${uid}-tab-${id}`} type="button" role="tab" aria-selected={tab === index} aria-controls={`${uid}-panel`} tabIndex={tab === index ? 0 : -1} onClick={() => { setTab(index); setErrors([]); }} className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-xs font-medium ${tab === index ? 'border-indigo-600 bg-indigo-50 text-indigo-900 dark:bg-indigo-500/10 dark:text-indigo-100' : 'border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400'}`}><Icon aria-hidden className="size-5" />{label}</button>)}
      </div>
      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tabs[tab].id}`} className="mt-5 space-y-3">
        {tab === 0 && <>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Card number<input inputMode="numeric" autoComplete="cc-number" value={card.number} aria-invalid={errors.includes('number')} onChange={(event) => setCard({ ...card, number: event.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ') })} placeholder="1234 5678 9012 3456" className={`${field(errors.includes('number'))} font-mono`} /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Expiry<input inputMode="numeric" autoComplete="cc-exp" value={card.expiry} aria-invalid={errors.includes('expiry')} onChange={(event) => { const digits = event.target.value.replace(/\D/g, '').slice(0, 4); setCard({ ...card, expiry: digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits }); }} placeholder="MM/YY" className={field(errors.includes('expiry'))} /></label>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">CVC<input inputMode="numeric" autoComplete="cc-csc" value={card.cvc} aria-invalid={errors.includes('cvc')} onChange={(event) => setCard({ ...card, cvc: event.target.value.replace(/\D/g, '').slice(0, 4) })} placeholder="123" className={field(errors.includes('cvc'))} /></label>
          </div>
        </>}
        {tab === 1 && <>
          <fieldset><legend className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Provider</legend><div className="mt-1 grid grid-cols-3 gap-2">{['MTN', 'Orange', 'Wave'].map((name) => <label key={name} className={`cursor-pointer rounded-lg border py-2 text-center text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-500 ${provider === name ? 'border-indigo-600 font-semibold text-indigo-900 dark:text-indigo-100' : 'border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300'}`}><input type="radio" name={`${uid}-provider`} checked={provider === name} onChange={() => setProvider(name)} className="sr-only" />{name}</label>)}</div></fieldset>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Phone number<input type="tel" autoComplete="tel" value={phone} aria-invalid={errors.includes('phone')} onChange={(event) => setPhone(event.target.value)} placeholder="+221 77 123 45 67" className={field(errors.includes('phone'))} /></label>
        </>}
        {tab === 2 && <dl className="space-y-2 rounded-xl bg-zinc-50 p-4 text-sm dark:bg-zinc-900">{[['Bank', 'Ecobank Senegal'], ['IBAN', 'SN08 SN01 0152 0000 1234 5678 9012'], ['Reference', 'INV-2291']].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt className="text-zinc-500">{label}</dt><dd className="text-right font-mono text-xs text-zinc-900 dark:text-zinc-100">{value}</dd></div>)}</dl>}
        {errors.length > 0 && <p role="alert" className="text-xs text-rose-600 dark:text-rose-400">Check the highlighted fields.</p>}
      </div>
      <button type="button" onClick={pay} className="mt-5 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">{tab === 2 ? 'I’ve sent $48.00' : 'Pay $48.00'}</button>
    </div>
  );
}
