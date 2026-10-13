/**
 * @registry
 * name: Snooze Menu
 * category: Menu
 * style: Glass
 * tags: recent
 * description: Menu « Reporter » d'un e-mail ou d'une tâche : options rapides avec heure calculée (plus tard, demain, ce week-end, semaine prochaine) et date personnalisée.
 * prompt: Create a glassy snooze menu (open by default) for an inbox item: options Later today (18:00), Tomorrow (Wed 08:00), This weekend (Sat 09:00), Next week (Mon 08:00) computed from a fixed demo "now" (Tue 14:20) so they're hydration-safe, each showing its time on the right; a "Pick date & time" item reveals date and time inputs with a Snooze button; choosing an option collapses the item into "Snoozed until Wed 08:00 · Undo" (aria-live); arrow keys navigate and Escape closes. Light and dark mode.
 */
'use client';
import { AlarmClock, CalendarClock, Coffee, Moon, Sun } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

const options = [{ label: 'Later today', time: 'Tue 18:00', icon: Coffee }, { label: 'Tomorrow', time: 'Wed 08:00', icon: Sun }, { label: 'This weekend', time: 'Sat 09:00', icon: Moon }, { label: 'Next week', time: 'Mon 08:00', icon: AlarmClock }];

export function SnoozeMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [custom, setCustom] = useState(false);
  const [until, setUntil] = useState<string | null>(null);
  const [date, setDate] = useState('2026-10-16');
  const [time, setTime] = useState('09:30');
  const menuRef = useRef<HTMLDivElement>(null);

  function snooze(label: string) { setUntil(label); setOpen(false); setCustom(false); }
  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') { setOpen(false); return; }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    const index = items.indexOf(document.activeElement as HTMLElement);
    items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus();
  }

  return (
    <div className="w-full max-w-sm rounded-3xl bg-[linear-gradient(135deg,#fef3c7,#e0e7ff,#fce7f3)] p-4 dark:bg-[linear-gradient(135deg,#451a03,#1e1b4b,#500724)]">
      <div className="rounded-2xl border border-white/60 bg-white/70 p-3 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-sky-500 text-xs font-bold text-white">KB</span>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-zinc-950 dark:text-white">Kora Bank · Q4 renewal</p><p aria-live="polite" className="truncate text-xs text-zinc-600 dark:text-zinc-400">{until ? <>Snoozed until {until} · <button type="button" onClick={() => setUntil(null)} className="font-semibold underline">Undo</button></> : 'Can we move the call to Thursday?'}</p></div>
          <button type="button" aria-haspopup="menu" aria-expanded={open} aria-label="Snooze" onClick={() => setOpen(!open)} className="grid size-8 place-items-center rounded-full text-zinc-700 hover:bg-white/70 dark:text-zinc-300 dark:hover:bg-white/10"><AlarmClock aria-hidden className="size-4" /></button>
        </div>
        {open && (
          <div ref={menuRef} role="menu" aria-label="Snooze until" onKeyDown={onKeyDown} className="mt-3 rounded-xl bg-white/80 p-1 dark:bg-zinc-900/80">
            {options.map(({ label, time: when, icon: Icon }) => <button key={label} type="button" role="menuitem" onClick={() => snooze(when)} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-800 hover:bg-white focus:bg-white focus:outline-none dark:text-zinc-200 dark:hover:bg-white/10 dark:focus:bg-white/10"><Icon aria-hidden className="size-4 text-zinc-500" />{label}<span className="ml-auto text-xs tabular-nums text-zinc-500">{when}</span></button>)}
            <div role="separator" className="my-1 h-px bg-zinc-900/10 dark:bg-white/10" />
            <button type="button" role="menuitem" aria-expanded={custom} onClick={() => setCustom(!custom)} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-800 hover:bg-white focus:bg-white focus:outline-none dark:text-zinc-200 dark:hover:bg-white/10 dark:focus:bg-white/10"><CalendarClock aria-hidden className="size-4 text-zinc-500" />Pick date & time</button>
            {custom && <form onSubmit={(event) => { event.preventDefault(); snooze(`${date} ${time}`); }} className="flex flex-wrap gap-2 px-2.5 pb-2 pt-1"><input type="date" aria-label="Date" value={date} min="2026-10-13" onChange={(event) => setDate(event.target.value)} className="rounded-md bg-white px-2 py-1 text-xs dark:bg-zinc-800 dark:text-zinc-100 dark:[color-scheme:dark]" /><input type="time" aria-label="Time" value={time} onChange={(event) => setTime(event.target.value)} className="rounded-md bg-white px-2 py-1 text-xs dark:bg-zinc-800 dark:text-zinc-100 dark:[color-scheme:dark]" /><button type="submit" className="ml-auto rounded-md bg-zinc-950 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">Snooze</button></form>}
          </div>
        )}
      </div>
    </div>
  );
}
