/**
 * @registry
 * name: Specialist Picker
 * category: Cards
 * style: Minimal
 * tags: recent
 * description: Selection d'un professionnel avec specialite, note, tarif et prochaine disponibilite.
 * prompt: Create a responsive specialist selection card listing three professionals with avatar initials, specialty, rating, price and next available time. Allow selecting one provider with accessible radio behavior.
 */
'use client';

import { BadgeCheck, Clock, Star } from 'lucide-react';
import { useState } from 'react';

const specialists = [{ initials: 'AD', name: 'Dr. Ada Diallo', role: 'Physiotherapist', rating: '4.9', price: 45, next: 'Today · 14:30', color: 'from-rose-200 to-orange-300' }, { initials: 'KM', name: 'Kofi Mensah', role: 'Sports therapist', rating: '4.8', price: 38, next: 'Tomorrow · 09:00', color: 'from-cyan-200 to-blue-300' }, { initials: 'SN', name: 'Sara Nwosu', role: 'Wellness coach', rating: '5.0', price: 32, next: 'Today · 17:15', color: 'from-violet-200 to-fuchsia-300' }];

export function SpecialistPicker() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
      <div><h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Choose your specialist</h2><p className="mt-1 text-sm text-zinc-500">All professionals are identity verified.</p></div>
      <div className="mt-5 space-y-2" role="radiogroup" aria-label="Specialist">{specialists.map((person, index) => <button key={person.name} type="button" role="radio" aria-checked={selected === index} onClick={() => setSelected(index)} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition sm:p-4 ${selected === index ? 'border-emerald-500 bg-emerald-50/70 ring-1 ring-emerald-500 dark:bg-emerald-500/10' : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'}`}><span className={`grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${person.color} text-sm font-bold text-zinc-800`}>{person.initials}</span><span className="min-w-0 flex-1"><span className="flex items-center gap-1 font-semibold text-zinc-950 dark:text-white">{person.name}<BadgeCheck size={15} className="fill-blue-500 text-white dark:text-zinc-950" /></span><span className="block text-xs text-zinc-500">{person.role}</span><span className="mt-1 flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-300"><Clock size={12} />{person.next}</span></span><span className="text-right"><span className="flex items-center justify-end gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-300"><Star size={12} className="fill-amber-400 text-amber-400" />{person.rating}</span><span className="mt-1 block text-sm font-bold text-zinc-950 dark:text-white">${person.price}</span></span></button>)}</div>
    </section>
  );
}
