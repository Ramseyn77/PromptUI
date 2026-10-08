/**
 * @registry
 * name: Hold To Confirm Button
 * category: Buttons
 * style: Dark
 * tags: recent
 * description: Bouton de suppression qu'il faut maintenir enfoncé, une jauge se remplit avant de valider.
 * prompt: Create a destructive "hold to delete" button: pressing (pointer or Space/Enter held) fills a rose overlay left-to-right over 1.2s via a CSS transition; releasing early cancels and drains it, completing triggers a "Deleted" state that resets after 2s. Instruction text for screen readers, light and dark mode.
 */
'use client';
import { Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';

const duration = 1200;

export function HoldToConfirmButton() {
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  function start() {
    if (done) return;
    setHolding(true);
    timer.current = window.setTimeout(() => { setDone(true); setHolding(false); window.setTimeout(() => setDone(false), 2000); }, duration);
  }
  function cancel() {
    window.clearTimeout(timer.current);
    setHolding(false);
  }

  return (
    <button
      type="button"
      aria-describedby="hold-hint"
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onKeyDown={(event) => { if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) { event.preventDefault(); start(); } }}
      onKeyUp={(event) => { if (event.key === ' ' || event.key === 'Enter') cancel(); }}
      className="relative h-12 w-56 select-none overflow-hidden rounded-xl border border-rose-300 bg-white text-sm font-semibold text-rose-700 dark:border-rose-500/40 dark:bg-zinc-900 dark:text-rose-300"
    >
      <span aria-hidden className="absolute inset-y-0 left-0 bg-rose-500" style={{ width: holding || done ? '100%' : '0%', transition: `width ${holding ? duration : 250}ms ${holding ? 'linear' : 'ease-out'}` }} />
      <span className={`relative inline-flex items-center gap-2 transition-colors ${holding || done ? 'text-white' : ''}`}><Trash2 aria-hidden className="size-4" />{done ? 'Deleted' : holding ? 'Keep holding…' : 'Hold to delete'}</span>
      <span id="hold-hint" className="sr-only">Press and hold for about one second to confirm deletion.</span>
    </button>
  );
}
