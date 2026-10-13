/**
 * @registry
 * name: Status Availability Toggle
 * category: Toggle
 * style: Glass
 * tags: recent
 * description: Sélecteur de statut de présence (Disponible, Absent, Occupé, Invisible) avec pastille animée, message personnalisé et expiration.
 * prompt: Create a presence status picker on a glass card: an avatar with a status dot, a radiogroup of four statuses (Available green, Away amber, Busy red, Invisible hollow) with arrow-key navigation and a dot that animates color between states; a custom status message input with emoji prefix and a "Clear after" select (Never, 1 hour, Today); a preview line shows how teammates see you; aria-live announces the change. Light and dark mode.
 */
'use client';
import { useRef, useState, type KeyboardEvent } from 'react';

const statuses = [['available', 'Available', 'bg-emerald-500'], ['away', 'Away', 'bg-amber-400'], ['busy', 'Do not disturb', 'bg-rose-500'], ['invisible', 'Invisible', 'border-2 border-zinc-400 bg-transparent']] as const;

export function StatusAvailabilityToggle() {
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState('In deep work until 3pm');
  const [clear, setClear] = useState('Today');
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent) {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    const next = (status + (event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1) + statuses.length) % statuses.length;
    setStatus(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="w-full max-w-sm rounded-3xl bg-[linear-gradient(135deg,#bbf7d0,#bfdbfe,#fbcfe8)] p-4 dark:bg-[linear-gradient(135deg,#052e16,#172554,#500724)]">
      <section className="rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60">
        <div className="flex items-center gap-3">
          <span className="relative grid size-12 place-items-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">AD<span className={`absolute -bottom-0.5 -right-0.5 size-4 rounded-full ring-[3px] ring-white transition-colors duration-300 dark:ring-zinc-900 ${statuses[status][2]}`} /></span>
          <div className="min-w-0"><p className="font-semibold text-zinc-950 dark:text-white">Awa Diop</p><p aria-live="polite" className="truncate text-xs text-zinc-600 dark:text-zinc-400">{statuses[status][1]}{message && status !== 3 ? ` · 💬 ${message}` : ''}</p></div>
        </div>
        <div role="radiogroup" aria-label="Status" onKeyDown={onKeyDown} className="mt-4 space-y-1">
          {statuses.map(([key, label, dot], index) => <button key={key} ref={(node) => { refs.current[index] = node; }} type="button" role="radio" aria-checked={status === index} tabIndex={status === index ? 0 : -1} onClick={() => setStatus(index)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm ${status === index ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white' : 'text-zinc-700 hover:bg-white/50 dark:text-zinc-300 dark:hover:bg-white/5'}`}><span className={`size-2.5 rounded-full ${dot}`} />{label}</button>)}
        </div>
        <div className="mt-4 space-y-2">
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Status message<div className="mt-1 flex items-center gap-2 rounded-lg bg-white/80 px-2 dark:bg-zinc-900"><span aria-hidden>💬</span><input value={message} maxLength={60} onChange={(event) => setMessage(event.target.value)} className="min-w-0 flex-1 bg-transparent py-2 text-sm text-zinc-900 outline-none dark:text-zinc-100" /></div></label>
          <label className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300">Clear after<select value={clear} onChange={(event) => setClear(event.target.value)} className="rounded-md bg-white/80 px-2 py-1 dark:bg-zinc-900">{['Never', '1 hour', 'Today'].map((value) => <option key={value}>{value}</option>)}</select></label>
        </div>
      </section>
    </div>
  );
}
