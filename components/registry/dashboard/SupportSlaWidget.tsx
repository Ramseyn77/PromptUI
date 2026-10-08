/**
 * @registry
 * name: Support SLA Widget
 * category: Dashboard
 * style: Minimal
 * tags: recent
 * description: File de tickets support triée par urgence avec compte à rebours SLA, priorité et assignation en un clic.
 * prompt: Create a support SLA widget: header with open tickets count and "2 breaching" badge; rows sorted by remaining SLA time, each with priority pill (Urgent/High/Normal), subject, customer, and a countdown that turns amber under 1h and rose when breached ("−12 min"); an "Assign to me" button per row that swaps to the agent's avatar. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const tickets = [
  { id: 4812, subject: 'Checkout fails on Safari', customer: 'Lumen', priority: 'Urgent', minutes: -12 },
  { id: 4809, subject: 'Invoice shows wrong VAT', customer: 'Kora', priority: 'High', minutes: -3 },
  { id: 4815, subject: 'Cannot invite new members', customer: 'Atlas', priority: 'High', minutes: 38 },
  { id: 4817, subject: 'Export to CSV is slow', customer: 'Pillar', priority: 'Normal', minutes: 190 },
];
const pill = { Urgent: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300', High: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300', Normal: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300' } as const;

export function SupportSlaWidget() {
  const [mine, setMine] = useState<number[]>([4809]);
  const time = (minutes: number) => (minutes < 0 ? `−${-minutes} min` : minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`);

  return (
    <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Open tickets</h3>
        <span className="text-sm text-zinc-500">{tickets.length}</span>
        <span className="ml-auto rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">2 breaching</span>
      </div>
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="flex items-center gap-3 px-4 py-3">
            <span className={`w-16 shrink-0 text-right font-mono text-xs font-semibold tabular-nums ${ticket.minutes < 0 ? 'text-rose-600 dark:text-rose-400' : ticket.minutes < 60 ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-500'}`}>{time(ticket.minutes)}</span>
            <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{ticket.subject}</span><span className="text-xs text-zinc-500">#{ticket.id} · {ticket.customer} · <span className={`rounded px-1 font-medium ${pill[ticket.priority as keyof typeof pill]}`}>{ticket.priority}</span></span></span>
            {mine.includes(ticket.id) ? <span title="Assigned to you" className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-sky-500 text-[10px] font-bold text-white">YOU</span> : <button type="button" onClick={() => setMine((list) => [...list, ticket.id])} className="rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">Assign to me</button>}
          </li>
        ))}
      </ul>
    </section>
  );
}
