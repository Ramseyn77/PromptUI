/**
 * @registry
 * name: Availability Grid Checkboxes
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Grille de disponibilités jours × créneaux à cocher par glisser (façon When2meet), sélection de ligne ou colonne et résumé des heures.
 * prompt: Create a weekly availability grid: columns Mon–Fri, rows 9:00–17:00 in 1-hour slots; each cell is a checkbox-like button (aria-pressed, aria-label "Tuesday 14:00"); pointer drag paints cells on or off depending on the first cell's state; clicking a day header toggles the whole column and an hour label toggles the whole row; arrow keys move focus across the grid with Space to toggle; a summary shows total hours selected per day (aria-live) and a Clear button. Light and dark mode.
 */
'use client';
import { useRef, useState, type KeyboardEvent } from 'react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const longDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hours = [9, 10, 11, 12, 13, 14, 15, 16];

export function AvailabilityGridCheckboxes() {
  const [cells, setCells] = useState<Set<string>>(new Set(['0-1', '0-2', '1-5', '1-6', '2-1', '3-5', '3-6', '3-7']));
  const [focus, setFocus] = useState('0-0');
  const painting = useRef<boolean | null>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const set = (keys: string[], on: boolean) => setCells((current) => { const next = new Set(current); keys.forEach((key) => (on ? next.add(key) : next.delete(key))); return next; });
  const toggleMany = (keys: string[]) => set(keys, !keys.every((key) => cells.has(key)));

  function onKey(event: KeyboardEvent, day: number, hour: number) {
    const moves: Record<string, [number, number]> = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const key = `${Math.min(days.length - 1, Math.max(0, day + move[0]))}-${Math.min(hours.length - 1, Math.max(0, hour + move[1]))}`;
    setFocus(key);
    refs.current[key]?.focus();
  }

  return (
    <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950" onPointerUp={() => { painting.current = null; }} onPointerLeave={() => { painting.current = null; }}>
      <div className="flex items-center justify-between"><p className="text-sm font-semibold text-zinc-950 dark:text-white">When are you free?</p><button type="button" onClick={() => setCells(new Set())} className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">Clear</button></div>
      <div role="group" aria-label="Weekly availability" className="mt-3 grid select-none grid-cols-[3rem_repeat(5,1fr)] gap-1 touch-none">
        <span />
        {days.map((day, d) => <button key={day} type="button" onClick={() => toggleMany(hours.map((_, h) => `${d}-${h}`))} className="rounded-md py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">{day}</button>)}
        {hours.map((hour, h) => (
          <div key={hour} className="contents">
            <button type="button" onClick={() => toggleMany(days.map((_, d) => `${d}-${h}`))} className="rounded-md text-right text-[11px] tabular-nums text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">{hour}:00</button>
            {days.map((_, d) => {
              const key = `${d}-${h}`;
              const on = cells.has(key);
              return <button key={key} ref={(node) => { refs.current[key] = node; }} type="button" aria-pressed={on} aria-label={`${longDays[d]} ${hour}:00`} tabIndex={focus === key ? 0 : -1} onFocus={() => setFocus(key)} onKeyDown={(event) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); set([key], !on); } else onKey(event, d, h); }} onPointerDown={() => { painting.current = !on; set([key], !on); }} onPointerEnter={() => { if (painting.current !== null) set([key], painting.current); }} className={`h-7 rounded-md transition-colors ${on ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'}`} />;
            })}
          </div>
        ))}
      </div>
      <p aria-live="polite" className="mt-3 text-xs text-zinc-500">{days.map((day, d) => `${day} ${hours.filter((_, h) => cells.has(`${d}-${h}`)).length}h`).join(' · ')} — total {cells.size}h</p>
    </div>
  );
}
