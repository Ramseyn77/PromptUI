/**
 * @registry
 * name: Do Not Disturb Toggle
 * category: Toggle
 * style: Dark
 * tags: recent
 * description: Interrupteur « Ne pas déranger » avec lune animée, durées rapides (1 h, jusqu'à demain, personnalisé) et exceptions pour les favoris.
 * prompt: Create a dark Do Not Disturb toggle card: a switch (role=switch) whose thumb shows a sun that morphs into a crescent moon when on, with the track turning indigo and tiny stars fading in; when enabled, quick duration chips appear (For 1 hour, Until tomorrow 8:00, Until I turn it off) as a radiogroup, plus a checkbox "Allow calls from favourites"; a status line "Silenced until 15:42" (computed from a fixed demo time) is announced via aria-live. Dark in both themes.
 */
'use client';
import { useState } from 'react';

const durations = [['1h', 'For 1 hour', 'Silenced until 15:42'], ['tomorrow', 'Until tomorrow 8:00', 'Silenced until tomorrow 8:00'], ['off', 'Until I turn it off', 'Silenced until you turn it off']] as const;

export function DoNotDisturbToggle() {
  const [on, setOn] = useState(true);
  const [duration, setDuration] = useState<string>('1h');
  const [favourites, setFavourites] = useState(true);

  return (
    <section className="w-full max-w-sm rounded-3xl bg-zinc-950 p-5 text-zinc-300 ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-4">
        <div><p className="font-semibold text-white">Do not disturb</p><p aria-live="polite" className="text-xs text-zinc-500">{on ? durations.find(([key]) => key === duration)![2] : 'Notifications on'}</p></div>
        <button type="button" role="switch" aria-checked={on} aria-label="Do not disturb" onClick={() => setOn(!on)} className={`relative h-9 w-16 shrink-0 overflow-hidden rounded-full transition-colors duration-500 ${on ? 'bg-indigo-600' : 'bg-sky-400'}`}>
          {[[10, 8], [18, 20], [26, 10]].map(([left, top]) => <span key={left} aria-hidden className={`absolute size-0.5 rounded-full bg-white transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`} style={{ left, top }} />)}
          <span aria-hidden className={`absolute top-1 size-7 rounded-full bg-amber-300 shadow transition-all duration-500 ${on ? 'left-8 bg-zinc-100' : 'left-1'}`}>
            <span className={`absolute right-0 top-0 size-5 rounded-full bg-indigo-600 transition-all duration-500 ${on ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`} style={{ marginTop: -2, marginRight: -3 }} />
          </span>
        </button>
      </div>
      {on && (
        <div className="mt-4 space-y-3">
          <div role="radiogroup" aria-label="Duration" className="flex flex-wrap gap-1.5">{durations.map(([key, label]) => <button key={key} type="button" role="radio" aria-checked={duration === key} onClick={() => setDuration(key)} className={`rounded-full px-3 py-1.5 text-xs ${duration === key ? 'bg-white text-zinc-950' : 'bg-white/5 ring-1 ring-white/10 hover:bg-white/10'}`}>{label}</button>)}</div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={favourites} onChange={(event) => setFavourites(event.target.checked)} className="accent-indigo-400" />Allow calls from favourites</label>
        </div>
      )}
    </section>
  );
}
