/**
 * @registry
 * name: Seat Map Checkboxes
 * category: Checkboxes
 * style: Dark
 * tags: featured, recent
 * description: Plan de salle de cinéma : sièges à cocher (libres, pris, PMR, premium), écran incurvé, limite de 6 places et récapitulatif du prix.
 * prompt: Create a cinema seat picker on a dark panel: a curved screen glow at the top, 6 rows (A–F) × 10 seats rendered as checkbox-like buttons (aria-pressed, aria-label "Row C seat 5, premium, $14") with an aisle gap; taken seats are disabled, two wheelchair spaces and a premium back row use different colors; max 6 seats with a hint; a legend; the summary lists selected seat codes and the total, and "Continue" is disabled until at least one seat is chosen. Dark in both themes.
 */
'use client';
import { useState } from 'react';

const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
const taken = new Set(['A3', 'A4', 'B6', 'C5', 'C6', 'D1', 'D2', 'E8', 'F4', 'F5']);
const accessible = new Set(['A1', 'A10']);
const price = (row: string) => (row === 'F' ? 14 : 10);

export function SeatMapCheckboxes() {
  const [picked, setPicked] = useState<string[]>(['C3', 'C4']);
  const max = 6;
  const total = picked.reduce((sum, seat) => sum + price(seat[0]), 0);

  function toggle(seat: string) {
    setPicked((list) => (list.includes(seat) ? list.filter((item) => item !== seat) : list.length >= max ? list : [...list, seat]));
  }

  return (
    <div className="w-full max-w-lg rounded-3xl bg-zinc-950 p-5 text-zinc-300 ring-1 ring-white/10">
      <div aria-hidden className="mx-auto h-2 w-4/5 rounded-[50%] bg-sky-300 shadow-[0_8px_30px_rgba(125,211,252,0.6)]" />
      <p className="mt-2 text-center text-[10px] uppercase tracking-[0.3em] text-zinc-500">Screen</p>
      <div role="group" aria-label="Seats" className="mt-5 space-y-1.5">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-center gap-1">
            <span className="w-4 text-[10px] text-zinc-500">{row}</span>
            {Array.from({ length: 10 }, (_, index) => {
              const seat = `${row}${index + 1}`;
              const isTaken = taken.has(seat);
              const on = picked.includes(seat);
              const kind = accessible.has(seat) ? 'wheelchair' : row === 'F' ? 'premium' : 'standard';
              return (
                <span key={seat} className={`flex ${index === 4 ? 'mr-3' : ''}`}>
                  <button type="button" aria-pressed={on} disabled={isTaken || (!on && picked.length >= max)} aria-label={`Row ${row} seat ${index + 1}, ${isTaken ? 'taken' : kind}, $${price(row)}`} onClick={() => toggle(seat)} className={`grid size-6 place-items-center rounded-t-lg rounded-b-sm text-[9px] font-bold transition sm:size-7 ${isTaken ? 'cursor-not-allowed bg-zinc-800 text-zinc-600' : on ? 'bg-emerald-400 text-zinc-950' : kind === 'wheelchair' ? 'bg-sky-500/30 text-sky-200 hover:bg-sky-500/50' : kind === 'premium' ? 'bg-amber-400/25 text-amber-200 hover:bg-amber-400/40' : 'bg-white/10 hover:bg-white/20'} disabled:opacity-60`}>{kind === 'wheelchair' ? '♿' : on ? '✓' : ''}</button>
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <ul className="mt-5 flex flex-wrap justify-center gap-3 text-[11px]">{[['bg-white/10', 'Available $10'], ['bg-amber-400/25', 'Premium $14'], ['bg-sky-500/30', 'Accessible'], ['bg-zinc-800', 'Taken'], ['bg-emerald-400', 'Selected']].map(([tone, label]) => <li key={label} className="flex items-center gap-1.5"><span className={`size-3 rounded-sm ${tone}`} />{label}</li>)}</ul>
      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <div aria-live="polite" className="min-w-0 flex-1 text-sm"><p className="truncate text-white">{picked.length ? picked.join(', ') : 'No seats selected'}</p><p className="text-xs text-zinc-500">{picked.length >= max ? 'Maximum 6 seats' : `${picked.length} of ${max} seats`} · <span className="font-semibold text-white">${total}</span></p></div>
        <button type="button" disabled={!picked.length} className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 disabled:opacity-40">Continue</button>
      </div>
    </div>
  );
}
