/**
 * @registry
 * name: Support Queue Board
 * category: Boards
 * style: SaaS
 * tags: featured, recent
 * description: Board de tickets support par statut (Nouveau, En cours, En attente, Résolu) avec SLA restant coloré, priorité, canal et prise en charge.
 * prompt: Create a support queue board with four columns (New, Open, Waiting on customer, Solved): ticket cards show subject, customer, channel icon (Email, Chat, Phone), priority flag, assignee initials or an "Assign to me" button, and an SLA countdown chip that is emerald (>2h), amber (<2h) or rose (breached); each card has a status select to move it; column headers show counts and the New column header pulses when it has urgent tickets; horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';

const statuses = ['New', 'Open', 'Waiting', 'Solved'] as const;
type Status = (typeof statuses)[number];
const channels = { Email: Mail, Chat: MessageCircle, Phone };
const initial: { id: number; subject: string; customer: string; channel: keyof typeof channels; priority: 'Urgent' | 'High' | 'Normal'; sla: number; owner: string | null; status: Status }[] = [
  { id: 412, subject: 'Card declined on renewal', customer: 'Kora Bank', channel: 'Email', priority: 'Urgent', sla: -12, owner: null, status: 'New' },
  { id: 415, subject: 'How do I add a teammate?', customer: 'Atelier', channel: 'Chat', priority: 'Normal', sla: 300, owner: null, status: 'New' },
  { id: 398, subject: 'Export stuck at 90%', customer: 'Northwind', channel: 'Email', priority: 'High', sla: 85, owner: 'LM', status: 'Open' },
  { id: 401, subject: 'SSO setup call', customer: 'Lumen', channel: 'Phone', priority: 'High', sla: 190, owner: 'AD', status: 'Waiting' },
  { id: 377, subject: 'Wrong VAT on invoice', customer: 'Shamba', channel: 'Email', priority: 'Normal', sla: 0, owner: 'AD', status: 'Solved' },
];
const flag = { Urgent: 'text-rose-600 dark:text-rose-400', High: 'text-amber-600 dark:text-amber-400', Normal: 'text-zinc-400' };

function sla(minutes: number, solved: boolean) {
  if (solved) return ['Met', 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'];
  if (minutes < 0) return [`Breached ${-minutes}m`, 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'];
  const label = minutes >= 60 ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : `${minutes}m`;
  return [label, minutes < 120 ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'];
}

export function SupportQueueBoard() {
  const [tickets, setTickets] = useState(initial);
  const update = (id: number, patch: Partial<(typeof initial)[number]>) => setTickets((list) => list.map((ticket) => (ticket.id === id ? { ...ticket, ...patch } : ticket)));

  return (
    <div className="flex w-full max-w-5xl gap-3 overflow-x-auto rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-900" data-lenis-prevent>
      {statuses.map((status) => {
        const column = tickets.filter((ticket) => ticket.status === status);
        const urgent = column.some((ticket) => ticket.priority === 'Urgent');
        return (
          <section key={status} aria-label={status} className="w-60 shrink-0">
            <h3 className="flex items-center gap-2 px-1 py-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">{status === 'Waiting' ? 'Waiting on customer' : status}<span className="rounded-full bg-white px-1.5 text-xs text-zinc-500 dark:bg-zinc-800">{column.length}</span>{status === 'New' && urgent && <span className="size-2 rounded-full bg-rose-500 motion-safe:animate-pulse"><span className="sr-only">Has urgent tickets</span></span>}</h3>
            <ul className="mt-2 space-y-2">
              {column.map((ticket) => {
                const Icon = channels[ticket.channel];
                const [label, tone] = sla(ticket.sla, ticket.status === 'Solved');
                return (
                  <li key={ticket.id} className="rounded-xl bg-white p-3 shadow-sm dark:bg-zinc-950">
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500"><Icon aria-label={ticket.channel} className="size-3.5" />#{ticket.id} · {ticket.customer}<span className={`ml-auto font-semibold ${flag[ticket.priority]}`}>⚑ {ticket.priority}</span></div>
                    <p className="mt-1.5 text-sm font-medium text-zinc-950 dark:text-white">{ticket.subject}</p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums ${tone}`}>SLA {label}</span>
                      {ticket.owner ? <span className="ml-auto grid size-6 place-items-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">{ticket.owner}</span> : <button type="button" onClick={() => update(ticket.id, { owner: 'ME', status: ticket.status === 'New' ? 'Open' : ticket.status })} className="ml-auto rounded-md border border-zinc-200 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">Assign to me</button>}
                    </div>
                    <select aria-label={`Status of ticket ${ticket.id}`} value={ticket.status} onChange={(event) => update(ticket.id, { status: event.target.value as Status })} className="mt-2 w-full rounded-md bg-zinc-50 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">{statuses.map((item) => <option key={item}>{item}</option>)}</select>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
