/**
 * @registry
 * name: Recurring Subscriptions Widget
 * category: Dashboard
 * style: Minimal
 * tags: recent
 * description: Widget des abonnements récurrents : total mensuel, prochains prélèvements, abonnement inutilisé signalé et annulation simulée avec économies.
 * prompt: Create a personal finance subscriptions widget: total "$128.40 / month" with a small donut by category (Streaming, Software, Fitness, News); a list of subscriptions with colored initials, name, price, billing day "renews in 3 days" and a flag "Not used in 60 days" on one; each row has a "Cancel" action that asks for inline confirmation and then moves the row to a "Cancelled" section and updates the total and an annual savings line (aria-live); sort toggle by date / by price. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const initial = [
  { id: 1, name: 'StreamFlix', category: 'Streaming', price: 15.99, renews: 3, color: '#ef4444', unused: false },
  { id: 2, name: 'Cloudnote Pro', category: 'Software', price: 9.99, renews: 6, color: '#6366f1', unused: false },
  { id: 3, name: 'PulseGym', category: 'Fitness', price: 49, renews: 12, color: '#10b981', unused: true },
  { id: 4, name: 'Daily Ledger', category: 'News', price: 12, renews: 18, color: '#f59e0b', unused: false },
  { id: 5, name: 'Designly', category: 'Software', price: 24.42, renews: 21, color: '#ec4899', unused: false },
  { id: 6, name: 'Tunes+', category: 'Streaming', price: 17, renews: 27, color: '#0ea5e9', unused: false },
];
const categoryColors: Record<string, string> = { Streaming: '#ef4444', Software: '#6366f1', Fitness: '#10b981', News: '#f59e0b' };

export function RecurringSubscriptionsWidget() {
  const [active, setActive] = useState(initial);
  const [cancelled, setCancelled] = useState<typeof initial>([]);
  const [confirm, setConfirm] = useState<number | null>(null);
  const [sort, setSort] = useState<'date' | 'price'>('date');
  const total = active.reduce((sum, item) => sum + item.price, 0);
  const saved = cancelled.reduce((sum, item) => sum + item.price, 0) * 12;
  const byCategory = Object.keys(categoryColors).map((category) => [category, active.filter((item) => item.category === category).reduce((sum, item) => sum + item.price, 0)] as const);
  let acc = 0;
  const donut = byCategory.map(([category, value]) => { const start = acc; acc += total ? (value / total) * 100 : 0; return `${categoryColors[category]} ${start.toFixed(1)}% ${acc.toFixed(1)}%`; }).join(', ');
  const sorted = [...active].sort((a, b) => (sort === 'date' ? a.renews - b.renews : b.price - a.price));

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-4">
        <span aria-hidden className="relative size-16 shrink-0 rounded-full" style={{ background: `conic-gradient(${donut || '#e4e4e7 0 100%'})` }}><span className="absolute inset-3 rounded-full bg-white dark:bg-zinc-950" /></span>
        <div><p className="text-xs text-zinc-500">Subscriptions</p><p aria-live="polite" className="text-2xl font-bold tabular-nums text-zinc-950 dark:text-white">${total.toFixed(2)}<span className="text-sm font-normal text-zinc-500"> / month</span></p>{saved > 0 && <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Saving ${saved.toFixed(0)} a year</p>}</div>
        <div role="group" aria-label="Sort" className="ml-auto flex flex-col gap-1 text-[11px]">{(['date', 'price'] as const).map((value) => <button key={value} type="button" aria-pressed={sort === value} onClick={() => setSort(value)} className={`rounded px-2 py-0.5 capitalize ${sort === value ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-500'}`}>By {value}</button>)}</div>
      </div>
      <ul className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
        {sorted.map((item) => (
          <li key={item.id} className="py-2.5">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl text-xs font-bold text-white" style={{ background: item.color }}>{item.name.slice(0, 2)}</span>
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-zinc-950 dark:text-white">{item.name}</p><p className="text-xs text-zinc-500">{item.renews <= 3 ? <span className="text-amber-600 dark:text-amber-400">Renews in {item.renews} days</span> : `Renews in ${item.renews} days`}{item.unused && <span className="ml-1.5 rounded bg-rose-100 px-1 text-[10px] font-semibold text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">Not used in 60 days</span>}</p></div>
              <span className="text-sm tabular-nums text-zinc-900 dark:text-zinc-100">${item.price.toFixed(2)}</span>
              {confirm !== item.id && <button type="button" onClick={() => setConfirm(item.id)} className="text-xs text-zinc-500 hover:text-rose-600">Cancel</button>}
            </div>
            {confirm === item.id && <div className="mt-2 flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-900 dark:bg-rose-500/10 dark:text-rose-200"><span className="flex-1">Cancel {item.name}? You’ll save ${(item.price * 12).toFixed(0)}/year.</span><button type="button" onClick={() => setConfirm(null)} className="underline">Keep</button><button type="button" onClick={() => { setActive(active.filter((entry) => entry.id !== item.id)); setCancelled([...cancelled, item]); setConfirm(null); }} className="rounded bg-rose-600 px-2 py-1 font-semibold text-white">Cancel it</button></div>}
          </li>
        ))}
      </ul>
      {cancelled.length > 0 && <p className="mt-3 text-xs text-zinc-500">Cancelled: {cancelled.map((item) => item.name).join(', ')} · <button type="button" onClick={() => { setActive([...active, ...cancelled]); setCancelled([]); }} className="underline">Undo all</button></p>}
    </section>
  );
}
