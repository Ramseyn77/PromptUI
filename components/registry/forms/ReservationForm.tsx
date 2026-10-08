/**
 * @registry
 * name: Reservation Form
 * category: Forms
 * style: Editorial
 * tags: recent
 * description: Réservation de table : date, nombre de convives avec boutons, créneaux disponibles et demande spéciale.
 * prompt: Create a restaurant reservation form: a date input, a guests stepper (1–12 with −/+), a radiogroup of time slot chips where some are disabled "Full", an optional special request textarea and a summary line "Fri, Oct 9 · 4 guests · 20:00" above a Book button that turns into a confirmation with a reference code. Warm editorial styling. Light and dark mode.
 */
'use client';
import { Minus, Plus } from 'lucide-react';
import { useId, useState } from 'react';

// Formatted by hand: Node and browser ICU data disagree on punctuation ("Tuesday, 1 September" vs "Tuesday 1 September"), which breaks hydration.
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const slots = [['19:00', true], ['19:30', false], ['20:00', true], ['20:30', true], ['21:00', false], ['21:30', true]] as const;

export function ReservationForm() {
  const uid = useId();
  const [date, setDate] = useState('2026-10-09');
  const [guests, setGuests] = useState(4);
  const [slot, setSlot] = useState('20:00');
  const [booked, setBooked] = useState(false);
  const label = (() => { const day = new Date(`${date}T12:00:00`); return `${weekdayNames[day.getDay()].slice(0, 3)} ${day.getDate()} ${monthNames[day.getMonth()].slice(0, 3)}`; })();

  if (booked) return <div role="status" className="w-full max-w-sm rounded-3xl bg-[#fbf6ee] p-6 text-center dark:bg-[#1c1813]"><p className="font-serif text-2xl text-amber-950 dark:text-amber-50">See you soon!</p><p className="mt-2 text-sm text-amber-900/70 dark:text-amber-100/70">{label} · {guests} guests · {slot}</p><p className="mt-3 font-mono text-xs text-amber-900/60 dark:text-amber-100/60">Ref. LT-4821</p></div>;

  return (
    <form onSubmit={(event) => { event.preventDefault(); setBooked(true); }} className="w-full max-w-sm rounded-3xl bg-[#fbf6ee] p-6 dark:bg-[#1c1813]">
      <h3 className="font-serif text-2xl text-amber-950 dark:text-amber-50">Book a table</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="text-xs font-medium text-amber-900/70 dark:text-amber-100/60">Date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-1 w-full rounded-xl border border-amber-900/15 bg-white px-2 py-2 text-sm text-amber-950 dark:border-white/10 dark:bg-white/5 dark:text-amber-50 dark:[color-scheme:dark]" /></label>
        <div className="text-xs font-medium text-amber-900/70 dark:text-amber-100/60"><span id={`${uid}-guests-label`}>Guests</span>
          <div role="group" aria-labelledby={`${uid}-guests-label`} className="mt-1 flex h-[38px] items-center justify-between rounded-xl border border-amber-900/15 bg-white px-1 dark:border-white/10 dark:bg-white/5">
            <button type="button" aria-label="Fewer guests" disabled={guests <= 1} onClick={() => setGuests((value) => value - 1)} className="grid size-7 place-items-center rounded-lg text-amber-900 disabled:opacity-30 dark:text-amber-100"><Minus aria-hidden className="size-4" /></button>
            <output aria-live="polite" className="text-sm font-semibold text-amber-950 dark:text-amber-50">{guests}</output>
            <button type="button" aria-label="More guests" disabled={guests >= 12} onClick={() => setGuests((value) => value + 1)} className="grid size-7 place-items-center rounded-lg text-amber-900 disabled:opacity-30 dark:text-amber-100"><Plus aria-hidden className="size-4" /></button>
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs font-medium text-amber-900/70 dark:text-amber-100/60">Time</p>
      <div role="radiogroup" aria-label="Time" className="mt-1 grid grid-cols-3 gap-2">
        {slots.map(([time, open]) => <button key={time} type="button" role="radio" aria-checked={slot === time} disabled={!open} onClick={() => setSlot(time)} className={`rounded-xl py-2 text-sm font-medium transition ${!open ? 'cursor-not-allowed text-amber-900/30 line-through dark:text-amber-100/25' : slot === time ? 'bg-amber-900 text-amber-50 dark:bg-amber-200 dark:text-amber-950' : 'border border-amber-900/15 text-amber-950 hover:bg-white dark:border-white/10 dark:text-amber-50 dark:hover:bg-white/5'}`}>{time}{!open && <span className="sr-only"> full</span>}</button>)}
      </div>
      <label className="mt-4 block text-xs font-medium text-amber-900/70 dark:text-amber-100/60">Special request<textarea rows={2} placeholder="Birthday, allergies, high chair…" className="mt-1 w-full resize-none rounded-xl border border-amber-900/15 bg-white p-2 text-sm text-amber-950 placeholder:text-amber-900/40 dark:border-white/10 dark:bg-white/5 dark:text-amber-50" /></label>
      <p className="mt-4 text-sm text-amber-900 dark:text-amber-100">{label} · {guests} guests · {slot}</p>
      <button type="submit" className="mt-2 w-full rounded-xl bg-amber-900 py-2.5 text-sm font-semibold text-amber-50 dark:bg-amber-200 dark:text-amber-950">Book</button>
    </form>
  );
}
