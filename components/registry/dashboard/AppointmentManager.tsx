/**
 * @registry
 * name: Appointment Manager
 * category: Dashboard
 * style: Gradient
 * tags: recent
 * description: Carte de rendez-vous confirme avec statut, itineraire, report et annulation.
 * prompt: Create a responsive upcoming appointment manager card with confirmed status, date block, provider details, location, add-to-calendar, directions, reschedule and cancellation confirmation interactions.
 */
'use client';

import { CalendarPlus, CheckCircle2, MapPin, Navigation, RotateCw, X } from 'lucide-react';
import { useState } from 'react';

export function AppointmentManager() {
  const [status, setStatus] = useState<'confirmed' | 'rescheduled' | 'cancelled'>('confirmed');
  if (status === 'cancelled') return <section className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950"><div className="mx-auto grid size-12 place-items-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-900"><X size={22} /></div><h2 className="mt-4 font-semibold text-zinc-950 dark:text-white">Appointment cancelled</h2><p className="mt-1 text-sm text-zinc-500">No fee was charged.</p><button type="button" onClick={() => setStatus('confirmed')} className="mt-4 text-sm font-semibold text-violet-600 hover:underline">Restore demo</button></section>;
  return (
    <section className="w-full max-w-xl overflow-hidden rounded-3xl border border-violet-200 bg-white shadow-xl shadow-violet-500/10 dark:border-violet-500/20 dark:bg-zinc-950">
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-5 text-white sm:p-6"><div className="flex items-center justify-between gap-3"><p className="flex items-center gap-2 text-sm font-semibold"><CheckCircle2 size={17} />{status === 'rescheduled' ? 'Appointment rescheduled' : 'Appointment confirmed'}</p><span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">Upcoming</span></div></div>
      <div className="p-5 sm:p-6"><div className="flex gap-4"><div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-violet-50 text-center dark:bg-violet-500/10"><span><span className="block text-[10px] font-bold uppercase text-violet-500">Oct</span><span className="block text-2xl font-black text-zinc-950 dark:text-white">{status === 'rescheduled' ? '15' : '13'}</span></span></div><div className="min-w-0"><h2 className="font-semibold text-zinc-950 dark:text-white">Physiotherapy session</h2><p className="mt-1 text-sm text-zinc-500">with Dr. Ada Diallo · {status === 'rescheduled' ? '14:30' : '09:45'}</p><p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500"><MapPin size={14} />Wellness Centre, Room 4</p></div></div>
        <div className="mt-5 grid grid-cols-2 gap-2"><button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 py-2.5 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"><CalendarPlus size={16} />Calendar</button><button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 py-2.5 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"><Navigation size={16} />Directions</button></div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row"><button type="button" onClick={() => setStatus('rescheduled')} disabled={status === 'rescheduled'} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-zinc-950"><RotateCw size={15} />Reschedule</button><button type="button" onClick={() => setStatus('cancelled')} className="rounded-xl px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10">Cancel appointment</button></div>
      </div>
    </section>
  );
}
