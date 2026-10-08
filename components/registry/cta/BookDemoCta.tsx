/**
 * @registry
 * name: Book Demo CTA
 * category: CTA
 * style: Minimal
 * tags: featured, recent
 * description: Appel à réserver une démo avec choix rapide d'un créneau horaire et confirmation.
 * prompt: Create a "Book a demo" CTA card: presenter avatar + name, a day selector (next three days as segmented buttons) and time-slot chips (radio behavior, aria-pressed), and a confirm button that shows the chosen slot and becomes a success message. Light and dark mode.
 */
'use client';
import { CalendarCheck } from 'lucide-react';
import { useState } from 'react';

const days = ['Tue 30', 'Wed 1', 'Thu 2'];
const slots = ['09:30', '11:00', '14:00', '16:30'];

export function BookDemoCta() {
  const [day, setDay] = useState(days[0]);
  const [slot, setSlot] = useState<string | null>('11:00');
  const [booked, setBooked] = useState(false);

  return (
    <section className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-3">
        <span className="size-11 rounded-full bg-gradient-to-br from-amber-300 to-rose-400" />
        <div><p className="font-semibold text-zinc-900 dark:text-white">Book a 20-min demo</p><p className="text-xs text-zinc-500 dark:text-zinc-400">with Inès, Solutions engineer</p></div>
      </div>
      {booked ? (
        <p role="status" className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-500/10 p-4 text-sm font-medium text-emerald-700 dark:text-emerald-400"><CalendarCheck aria-hidden className="size-5" /> Booked for {day} at {slot}. Invite sent!</p>
      ) : (
        <>
          <div role="group" aria-label="Day" className="mt-5 grid grid-cols-3 gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">{days.map((item) => <button key={item} type="button" aria-pressed={day === item} onClick={() => setDay(item)} className={`rounded-lg py-1.5 text-sm font-medium ${day === item ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{item}</button>)}</div>
          <div role="group" aria-label="Time" className="mt-3 grid grid-cols-4 gap-2">{slots.map((item) => <button key={item} type="button" aria-pressed={slot === item} onClick={() => setSlot(item)} className={`rounded-lg border py-2 text-sm tabular-nums ${slot === item ? 'border-teal-500 bg-teal-500/10 font-semibold text-teal-800 dark:text-teal-200' : 'border-zinc-200 text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-300'}`}>{item}</button>)}</div>
          <button type="button" disabled={!slot} onClick={() => setBooked(true)} className="mt-5 w-full rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-40">Confirm {day}{slot ? ` · ${slot}` : ''}</button>
        </>
      )}
    </section>
  );
}
