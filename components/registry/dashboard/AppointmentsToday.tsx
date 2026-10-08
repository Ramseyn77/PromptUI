/**
 * @registry
 * name: Appointments Today
 * category: Dashboard
 * style: SaaS
 * tags: recent
 * description: Agenda du jour avec ligne « maintenant », rendez-vous colorés par type, prochain rendez-vous mis en avant et check-in.
 * prompt: Create a "Today" appointments widget for a clinic/salon dashboard: a vertical list of time slots with colored left borders by type (Consultation, Follow-up, Video call), a "Now" red line between items, the next appointment highlighted with "in 25 min" and a Check in button (aria-pressed) that switches to "Checked in"; completed items dimmed. Light and dark mode.
 */
'use client';
import { Video } from 'lucide-react';
import { useState } from 'react';

const items = [
  { time: '09:00', name: 'Fatou Sow', type: 'Consultation', done: true, tone: 'border-teal-500', next: false },
  { time: '10:30', name: 'Marc Dupont', type: 'Follow-up', done: true, tone: 'border-violet-500', next: false },
  { time: '11:45', name: 'Leila Haddad', type: 'Video call', done: false, tone: 'border-sky-500', next: true },
  { time: '14:00', name: 'Noah Martin', type: 'Consultation', done: false, tone: 'border-teal-500', next: false },
  { time: '15:30', name: 'Ines Costa', type: 'Follow-up', done: false, tone: 'border-violet-500', next: false },
];

export function AppointmentsToday() {
  const [checked, setChecked] = useState(false);

  return (
    <section className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-baseline justify-between"><h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Today</h3><span className="text-xs text-zinc-500">Mon, Oct 5 · 5 appointments</span></div>
      <ol className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.time}>
            {item.next && <div role="separator" aria-label="Now, 11:20" className="relative my-3 h-px bg-rose-500"><span className="absolute -left-1 -top-1 size-2 rounded-full bg-rose-500" /><span className="absolute -top-2 right-0 bg-white px-1 text-[10px] font-semibold text-rose-500 dark:bg-zinc-950">11:20</span></div>}
            <div className={`flex items-center gap-3 rounded-xl border-l-4 px-3 py-2 ${item.tone} ${item.done ? 'opacity-50' : ''} ${item.next ? 'bg-sky-50 dark:bg-sky-500/10' : 'bg-zinc-50 dark:bg-zinc-900'}`}>
              <time className="w-11 text-xs font-semibold tabular-nums text-zinc-500">{item.time}</time>
              <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.name}</span><span className="flex items-center gap-1 text-xs text-zinc-500">{item.type === 'Video call' && <Video aria-hidden className="size-3" />}{item.type}{item.next && ' · in 25 min'}</span></span>
              {item.next && <button type="button" aria-pressed={checked} onClick={() => setChecked((value) => !value)} className={`rounded-lg px-2.5 py-1 text-xs font-semibold text-white ${checked ? 'bg-emerald-600' : 'bg-sky-600 hover:bg-sky-500'}`}>{checked ? 'Checked in' : 'Check in'}</button>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
