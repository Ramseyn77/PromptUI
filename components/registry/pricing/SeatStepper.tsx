/**
 * @registry
 * name: Seat Stepper
 * category: Pricing
 * style: SaaS
 * tags: recent
 * description: Ajustement du nombre de places avec boutons plus et moins, total recalcule et limites.
 * prompt: Create a team seats stepper: minus/plus buttons (disabled at 1 and 50) around an editable number input, price per seat, a total that updates with a small bump animation, and a note when the team discount (10+ seats, -15%) applies. aria-live on the total. Light and dark mode.
 */
'use client';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const perSeat = 15;

export function SeatStepper() {
  const [seats, setSeats] = useState(8);
  const clamp = (value: number) => Math.min(50, Math.max(1, Math.round(value) || 1));
  const discount = seats >= 10 ? 0.15 : 0;
  const total = seats * perSeat * (1 - discount);
  const button = 'grid size-10 place-items-center rounded-xl border border-zinc-300 text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900';

  return (
    <>
      <style>{`@keyframes pui-total-bump{50%{transform:scale(1.06)}}`}</style>
      <section className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="font-semibold text-zinc-900 dark:text-white">Team seats</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">${perSeat} per seat / month</p>
        <div className="mt-5 flex items-center gap-2">
          <button type="button" aria-label="Remove a seat" disabled={seats <= 1} onClick={() => setSeats(clamp(seats - 1))} className={button}><Minus className="size-4" /></button>
          <label htmlFor="seat-count" className="sr-only">Seats</label>
          <input id="seat-count" inputMode="numeric" value={seats} onChange={(event) => setSeats(clamp(Number(event.target.value)))} className="h-10 w-16 rounded-xl border border-zinc-300 bg-transparent text-center text-lg font-semibold text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:text-white" />
          <button type="button" aria-label="Add a seat" disabled={seats >= 50} onClick={() => setSeats(clamp(seats + 1))} className={button}><Plus className="size-4" /></button>
        </div>
        <p className={`mt-3 text-xs font-medium transition ${discount ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500 dark:text-zinc-400'}`}>{discount ? 'Team discount applied: −15%' : `Add ${10 - seats} more seats to save 15%`}</p>
        <div className="mt-5 flex items-end justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Total</span>
          <span key={total} aria-live="polite" className="text-3xl font-semibold tabular-nums text-zinc-900 motion-safe:animate-[pui-total-bump_.25s_ease-out] dark:text-white">${total.toFixed(2)}</span>
        </div>
      </section>
    </>
  );
}
