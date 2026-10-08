/**
 * @registry
 * name: Availability Slot Picker
 * category: Forms
 * style: SaaS
 * tags: recent
 * description: Sélecteur de créneaux avec dates, disponibilités, fuseau horaire et confirmation.
 * prompt: Create a responsive appointment availability picker with a horizontal day selector, morning and afternoon time slots, disabled unavailable slots, timezone label and selection summary. Use accessible pressed and disabled states.
 */
'use client';

import { Check, Clock3, Globe2 } from 'lucide-react';
import { useState } from 'react';

const days = [{ day: 'Mon', date: 12 }, { day: 'Tue', date: 13 }, { day: 'Wed', date: 14 }, { day: 'Thu', date: 15 }, { day: 'Fri', date: 16 }];
const slots = [{ time: '08:30', period: 'Morning' }, { time: '09:45', period: 'Morning' }, { time: '11:00', period: 'Morning', busy: true }, { time: '13:30', period: 'Afternoon' }, { time: '15:00', period: 'Afternoon' }, { time: '16:15', period: 'Afternoon', busy: true }];

export function AvailabilitySlotPicker() {
  const [day, setDay] = useState(1);
  const [time, setTime] = useState('09:45');
  return (
    <section className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-5 shadow-xl shadow-blue-500/10 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
      <div className="flex items-start justify-between gap-4"><div><h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Choose a time</h2><p className="mt-1 text-sm text-zinc-500">30-minute consultation</p></div><span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"><Globe2 size={13} />GMT+1</span></div>
      <div className="mt-5 grid grid-cols-5 gap-1.5" role="group" aria-label="Appointment date">{days.map((item, index) => <button key={item.day} type="button" onClick={() => setDay(index)} aria-pressed={day === index} className={`rounded-xl py-2.5 text-center transition ${day === index ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-zinc-50 text-zinc-500 hover:text-zinc-900 dark:bg-zinc-900 dark:hover:text-white'}`}><span className="block text-[10px] uppercase tracking-wide">{item.day}</span><span className="mt-0.5 block text-base font-semibold">{item.date}</span></button>)}</div>
      {['Morning', 'Afternoon'].map((period) => <div key={period} className="mt-5"><p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400"><Clock3 size={13} />{period}</p><div className="grid grid-cols-3 gap-2">{slots.filter((slot) => slot.period === period).map((slot) => <button key={slot.time} type="button" disabled={slot.busy} onClick={() => setTime(slot.time)} aria-pressed={time === slot.time} className={`rounded-xl border py-2.5 text-sm font-medium tabular-nums transition disabled:cursor-not-allowed disabled:border-transparent disabled:bg-zinc-100 disabled:text-zinc-300 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-700 ${time === slot.time ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300' : 'border-zinc-200 text-zinc-700 hover:border-blue-300 dark:border-zinc-800 dark:text-zinc-300'}`}>{slot.time}</button>)}</div></div>)}
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-zinc-950 p-3.5 text-white dark:bg-white dark:text-zinc-950"><Check size={18} className="text-blue-400" /><p className="min-w-0 flex-1 truncate text-sm"><strong>{days[day].day} {days[day].date}</strong> at {time}</p><button type="button" className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white">Continue</button></div>
    </section>
  );
}
