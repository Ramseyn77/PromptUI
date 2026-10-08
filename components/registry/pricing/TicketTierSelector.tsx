/**
 * @registry
 * name: Ticket Tier Selector
 * category: Pricing
 * style: Gradient
 * tags: recent
 * description: Sélecteur de billets pour événement sportif avec tarifs, disponibilité et quantité.
 * prompt: Create a responsive sports event ticket selector with three ticket tiers, availability indicators, quantity controls, calculated total and checkout button. Make selection state accessible.
 */
'use client';

import { Minus, Plus, Ticket } from 'lucide-react';
import { useState } from 'react';

const tiers = [{ name: 'Fan Zone', price: 24, note: 'Standing · Gate C', left: 84 }, { name: 'Grandstand', price: 58, note: 'Reserved seat · Gate A', left: 21 }, { name: 'VIP Lounge', price: 135, note: 'Hospitality included', left: 6 }];

export function TicketTierSelector() {
  const [selected, setSelected] = useState(1);
  const [quantity, setQuantity] = useState(2);
  const tier = tiers[selected];
  return (
    <section className="w-full max-w-lg rounded-3xl border border-violet-200 bg-white p-5 shadow-xl shadow-violet-500/10 dark:border-violet-500/20 dark:bg-zinc-950 sm:p-6">
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-violet-600 dark:text-violet-400">Saturday · 19:30</p><h2 className="mt-1 text-xl font-bold text-zinc-950 dark:text-white">Championship Final</h2><p className="mt-1 text-sm text-zinc-500">National Arena · Lagos</p></div><div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"><Ticket size={21} /></div></div>
      <fieldset className="mt-5 space-y-2"><legend className="sr-only">Choose ticket tier</legend>{tiers.map((item, index) => <label key={item.name} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition ${selected === index ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10' : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800'}`}><input type="radio" name="ticket-tier" checked={selected === index} onChange={() => setSelected(index)} className="size-4 accent-violet-600" /><span className="min-w-0 flex-1"><span className="block font-semibold text-zinc-900 dark:text-white">{item.name}</span><span className="block truncate text-xs text-zinc-500">{item.note}</span></span><span className="text-right"><span className="block font-bold text-zinc-950 dark:text-white">${item.price}</span><span className={`block text-[10px] ${item.left < 10 ? 'text-orange-500' : 'text-zinc-400'}`}>{item.left} left</span></span></label>)}</fieldset>
      <div className="mt-5 flex flex-col gap-4 border-t border-zinc-200 pt-5 dark:border-zinc-800 sm:flex-row sm:items-center"><div className="flex items-center justify-between gap-4 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900"><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Remove one ticket" className="grid size-9 place-items-center rounded-lg bg-white shadow-sm dark:bg-zinc-800"><Minus size={15} /></button><span className="min-w-6 text-center font-semibold tabular-nums text-zinc-900 dark:text-white">{quantity}</span><button type="button" onClick={() => setQuantity((value) => Math.min(6, value + 1))} aria-label="Add one ticket" className="grid size-9 place-items-center rounded-lg bg-white shadow-sm dark:bg-zinc-800"><Plus size={15} /></button></div><button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-bold text-white">Continue · ${tier.price * quantity}</button></div>
    </section>
  );
}
