/**
 * @registry
 * name: On Call Schedule Widget
 * category: Dashboard
 * style: Dark
 * tags: recent
 * description: Widget d'astreinte : personne de garde maintenant, relais à venir sur une frise de 7 jours, escalade et bouton « Demander un échange ».
 * prompt: Create a dark on-call schedule widget: "On call now" card with avatar initials, name, rotation "Platform primary", time remaining "until Fri 09:00" and a Page button; a 7-day timeline bar split into colored shifts per person with day labels and a "now" marker; an escalation list (Primary, Secondary, Manager); a "Request swap" button that turns into "Swap requested" with an undo; aria-live status. Dark in both themes.
 */
'use client';
import { BellRing } from 'lucide-react';
import { useState } from 'react';

const shifts = [{ who: 'AD', name: 'Awa Diop', days: 3, color: 'bg-violet-500' }, { who: 'LM', name: 'Leo Martin', days: 2, color: 'bg-sky-500' }, { who: 'MK', name: 'Mei Kato', days: 2, color: 'bg-emerald-500' }];
const days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];

export function OnCallScheduleWidget() {
  const [swap, setSwap] = useState(false);

  return (
    <section className="w-full max-w-md rounded-2xl bg-zinc-950 p-5 text-zinc-300 ring-1 ring-white/10">
      <div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-white">On-call · Platform</h3><span className="text-xs text-zinc-500">Week 42</span></div>
      <div className="mt-4 flex items-center gap-3 rounded-xl bg-violet-500/10 p-3 ring-1 ring-violet-500/30">
        <span className="relative grid size-11 place-items-center rounded-full bg-violet-500 text-sm font-bold text-white">AD<span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-400 ring-2 ring-zinc-950" /></span>
        <div className="flex-1"><p className="text-xs text-violet-300">On call now</p><p className="font-semibold text-white">Awa Diop</p><p className="text-xs text-zinc-500">Primary · until Fri 09:00</p></div>
        <button type="button" className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-zinc-950"><BellRing aria-hidden className="size-3.5" />Page</button>
      </div>
      <div className="mt-5">
        <div className="relative flex h-8 overflow-hidden rounded-lg">
          {shifts.map((shift) => <div key={shift.who} className={`${shift.color} grid place-items-center text-[11px] font-bold text-white/90`} style={{ width: `${(shift.days / 7) * 100}%` }} title={shift.name}>{shift.who}</div>)}
          <span aria-hidden className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_6px_white]" style={{ left: `${(1.4 / 7) * 100}%` }} />
        </div>
        <div className="mt-1 grid grid-cols-7 text-center text-[10px] text-zinc-500">{days.map((day) => <span key={day}>{day}</span>)}</div>
        <p className="sr-only">Schedule: {shifts.map((shift) => `${shift.name} ${shift.days} days`).join(', ')}.</p>
      </div>
      <ol className="mt-5 space-y-1.5 text-sm">
        {[['Primary', 'Awa Diop', '0 min'], ['Secondary', 'Leo Martin', '+10 min'], ['Manager', 'Sam Okafor', '+30 min']].map(([level, name, delay], index) => <li key={level} className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full bg-white/10 text-[10px] font-bold">{index + 1}</span><span className="w-20 text-zinc-500">{level}</span><span className="flex-1 text-white">{name}</span><span className="text-xs tabular-nums text-zinc-500">{delay}</span></li>)}
      </ol>
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <p aria-live="polite" className="text-xs text-zinc-400">{swap ? 'Swap requested with Leo Martin' : 'Next handoff in 2d 6h'}</p>
        <button type="button" onClick={() => setSwap(!swap)} className="rounded-lg px-3 py-1.5 text-xs font-semibold ring-1 ring-white/15 hover:bg-white/5">{swap ? 'Undo' : 'Request swap'}</button>
      </div>
    </section>
  );
}
