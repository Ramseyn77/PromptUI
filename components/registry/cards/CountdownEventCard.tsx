/**
 * @registry
 * name: Countdown Event Card
 * category: Cards
 * style: Glass
 * tags: recent
 * description: Carte d'événement en verre avec compte à rebours (jours, heures, minutes, secondes), intervenants, ajout au calendrier et rappel.
 * prompt: Create a glassy event card over a vivid gradient: event type pill (Live workshop), title, date/time with timezone, a countdown of four boxes (days, hours, minutes, seconds) that ticks every second after mount from a fixed starting duration, speakers as stacked initials, an "Add to calendar" button and a "Remind me" toggle (aria-pressed) that changes to "Reminder set"; seconds updates are not announced (aria-hidden) but an sr-only line states the start time. Light and dark mode.
 */
'use client';
import { BellRing, CalendarPlus } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CountdownEventCard() {
  const [left, setLeft] = useState(3 * 86400 + 7 * 3600 + 24 * 60 + 9);
  const [remind, setRemind] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const parts = [['Days', Math.floor(left / 86400)], ['Hours', Math.floor((left % 86400) / 3600)], ['Min', Math.floor((left % 3600) / 60)], ['Sec', left % 60]] as const;

  return (
    <div className="w-full max-w-sm rounded-[2rem] bg-[linear-gradient(135deg,#7c3aed,#db2777,#f59e0b)] p-4">
      <article className="rounded-3xl border border-white/30 bg-white/15 p-5 text-white backdrop-blur-xl">
        <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider">Live workshop</span>
        <h3 className="mt-3 text-2xl font-bold leading-tight">Motion design for product teams</h3>
        <p className="mt-1 text-sm text-white/80">Thu, Oct 16 · 17:00 GMT · 90 min</p>
        <p className="sr-only">Starts Thursday October 16 at 17:00 GMT.</p>
        <div aria-hidden className="mt-5 grid grid-cols-4 gap-2 text-center">{parts.map(([label, value]) => <div key={label} className="rounded-2xl bg-black/20 py-2"><p className="text-2xl font-bold tabular-nums">{String(value).padStart(2, '0')}</p><p className="text-[10px] uppercase tracking-wider text-white/70">{label}</p></div>)}</div>
        <div className="mt-5 flex items-center gap-2"><ul className="flex -space-x-2">{['AD', 'LM', 'MT'].map((initials) => <li key={initials} className="grid size-8 place-items-center rounded-full bg-white/25 text-[10px] font-bold ring-2 ring-white/40">{initials}</li>)}</ul><p className="text-xs text-white/80">with Awa, Leo & Mei</p></div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a href="#" className="flex items-center justify-center gap-1.5 rounded-xl bg-white py-2.5 text-sm font-semibold text-zinc-950"><CalendarPlus aria-hidden className="size-4" />Add to calendar</a>
          <button type="button" aria-pressed={remind} onClick={() => setRemind(!remind)} className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold ring-1 ring-white/40 ${remind ? 'bg-white/30' : 'hover:bg-white/10'}`}><BellRing aria-hidden className="size-4" />{remind ? 'Reminder set' : 'Remind me'}</button>
        </div>
      </article>
    </div>
  );
}
