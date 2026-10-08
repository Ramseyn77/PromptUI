/**
 * @registry
 * name: Time Field Input
 * category: Forms
 * style: SaaS
 * tags: recent
 * description: Saisie d'heure segmentée façon HeroUI (heures, minutes, AM/PM) éditable au clavier, avec créneaux rapides.
 * prompt: Create a HeroUI-style segmented time field: hour, minute and AM/PM segments are focusable spinbuttons (role="spinbutton", aria-valuenow/min/max) inside one bordered field; ArrowUp/Down change the focused segment, typing digits fills it and auto-advances, Tab moves between segments; quick slot chips below (09:00, 12:30, 18:00) set the value; a summary shows the 24h value. Light and dark mode.
 */
'use client';
import { Clock } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';

export function TimeFieldInput() {
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(30);
  const [pm, setPm] = useState(false);
  const minuteRef = useRef<HTMLSpanElement>(null);
  const periodRef = useRef<HTMLSpanElement>(null);
  const buffer = useRef('');
  const labelId = useId();

  function segmentKeys(event: KeyboardEvent, kind: 'h' | 'm' | 'p') {
    const delta = event.key === 'ArrowUp' ? 1 : event.key === 'ArrowDown' ? -1 : 0;
    if (delta) {
      event.preventDefault();
      if (kind === 'h') setHour((value) => ((value - 1 + delta + 12) % 12) + 1);
      if (kind === 'm') setMinute((value) => (value + delta * 5 + 60) % 60);
      if (kind === 'p') setPm((value) => !value);
      return;
    }
    if (kind === 'p' && /^[ap]$/i.test(event.key)) { setPm(event.key.toLowerCase() === 'p'); return; }
    if (!/^\d$/.test(event.key) || kind === 'p') return;
    buffer.current = (buffer.current + event.key).slice(-2);
    const number = Number(buffer.current);
    if (kind === 'h') { setHour(Math.min(12, Math.max(1, number))); if (buffer.current.length === 2 || number > 1) { buffer.current = ''; minuteRef.current?.focus(); } }
    else { setMinute(Math.min(59, number)); if (buffer.current.length === 2) { buffer.current = ''; periodRef.current?.focus(); } }
  }

  const segment = 'rounded px-0.5 tabular-nums outline-none focus:bg-teal-600 focus:text-white';
  const h24 = (hour % 12) + (pm ? 12 : 0);

  return (
    <div className="w-full max-w-xs">
      <p id={labelId} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Meeting time</p>
      <div role="group" aria-labelledby={labelId} className="mt-1.5 flex items-center gap-1 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus-within:border-teal-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
        <Clock aria-hidden className="mr-1 size-4 text-zinc-400" />
        <span role="spinbutton" tabIndex={0} aria-label="Hours" aria-valuenow={hour} aria-valuemin={1} aria-valuemax={12} onKeyDown={(event) => segmentKeys(event, 'h')} onBlur={() => { buffer.current = ''; }} className={segment}>{String(hour).padStart(2, '0')}</span>:
        <span ref={minuteRef} role="spinbutton" tabIndex={0} aria-label="Minutes" aria-valuenow={minute} aria-valuemin={0} aria-valuemax={59} onKeyDown={(event) => segmentKeys(event, 'm')} onBlur={() => { buffer.current = ''; }} className={segment}>{String(minute).padStart(2, '0')}</span>
        <span ref={periodRef} role="spinbutton" tabIndex={0} aria-label="AM or PM" aria-valuetext={pm ? 'PM' : 'AM'} onKeyDown={(event) => segmentKeys(event, 'p')} className={`${segment} ml-1`}>{pm ? 'PM' : 'AM'}</span>
      </div>
      <div className="mt-2 flex gap-1.5">{[[9, 0, false], [12, 30, true], [6, 0, true]].map(([h, m, p]) => <button key={`${h}${m}`} type="button" onClick={() => { setHour(h as number); setMinute(m as number); setPm(p as boolean); }} className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">{`${String((((h as number) % 12) + ((p as boolean) ? 12 : 0))).padStart(2, '0')}:${String(m).padStart(2, '0')}`}</button>)}</div>
      <p className="mt-2 text-xs text-zinc-500">Saved as {String(h24).padStart(2, '0')}:{String(minute).padStart(2, '0')} · Arrow keys or type digits</p>
    </div>
  );
}
