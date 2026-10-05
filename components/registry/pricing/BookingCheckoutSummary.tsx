/**
 * @registry
 * name: Booking Checkout Summary
 * category: Pricing
 * style: SaaS
 * tags: recent
 * description: Recapitulatif de reservation avec prestation, options, reduction et total dynamique.
 * prompt: Create a responsive booking checkout summary with appointment details, selectable add-ons, promo discount, itemized subtotal and total, cancellation policy and confirm button.
 */
'use client';

import { CalendarDays, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const extras = [{ name: 'Extended session', price: 18 }, { name: 'Written care plan', price: 9 }];

export function BookingCheckoutSummary() {
  const [chosen, setChosen] = useState<number[]>([1]);
  const toggle = (index: number) => setChosen((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index]);
  const subtotal = 45 + chosen.reduce((sum, index) => sum + extras[index].price, 0);
  const discount = subtotal >= 60 ? 8 : 0;
  return (
    <section className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-violet-600 dark:text-violet-400">Booking summary</p><h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-white">Physiotherapy session</h2>
      <div className="mt-4 grid gap-2 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"><p className="flex items-center gap-2"><CalendarDays size={16} className="text-violet-500" />Tue, 13 Oct · 09:45</p><p className="flex items-center gap-2"><MapPin size={16} className="text-violet-500" />Wellness Centre, Room 4</p><p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-violet-500" />Dr. Ada Diallo · 30 min</p></div>
      <fieldset className="mt-5"><legend className="text-sm font-semibold text-zinc-900 dark:text-white">Add to your visit</legend><div className="mt-2 space-y-2">{extras.map((extra, index) => <label key={extra.name} className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"><input type="checkbox" checked={chosen.includes(index)} onChange={() => toggle(index)} className="size-4 accent-violet-600" /><span className="flex-1 text-sm text-zinc-700 dark:text-zinc-300">{extra.name}</span><span className="text-sm font-semibold text-zinc-950 dark:text-white">+${extra.price}</span></label>)}</div></fieldset>
      <dl className="mt-5 space-y-2 border-t border-zinc-200 pt-4 text-sm dark:border-zinc-800"><div className="flex justify-between text-zinc-500"><dt>Subtotal</dt><dd>${subtotal}</dd></div>{discount > 0 && <div className="flex justify-between text-emerald-600"><dt>Bundle discount</dt><dd>−${discount}</dd></div>}<div className="flex justify-between pt-1 text-base font-bold text-zinc-950 dark:text-white"><dt>Total</dt><dd>${subtotal - discount}</dd></div></dl>
      <button type="button" className="mt-5 w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white hover:bg-violet-500">Confirm and pay</button><p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500"><ShieldCheck size={14} />Free cancellation up to 24 hours before</p>
    </section>
  );
}
