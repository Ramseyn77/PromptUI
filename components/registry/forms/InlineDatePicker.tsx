/**
 * @registry
 * name: Inline Date Picker
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Calendrier mensuel avec navigation, jour selectionne, aujourd hui marque et jours passes desactives.
 * prompt: Create an inline month calendar date picker: header with month/year and prev/next buttons, weekday row, a grid of day buttons (Monday-first) with today ringed, past days disabled, the selected day filled (aria-pressed), and a footer showing the chosen date formatted with Intl. Fixed demo month to avoid hydration drift. Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const today = new Date(2026, 8, 29);

export function InlineDatePicker() {
  const [month, setMonth] = useState(new Date(2026, 8, 1));
  const [selected, setSelected] = useState(new Date(2026, 9, 2));
  const offset = (month.getDay() + 6) % 7;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const same = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  const label = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(month);

  return (
    <div className="w-72 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <button type="button" aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="grid size-8 place-items-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"><ChevronLeft className="size-4 text-zinc-600 dark:text-zinc-300" /></button>
        <p aria-live="polite" className="text-sm font-semibold text-zinc-900 dark:text-white">{label}</p>
        <button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="grid size-8 place-items-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"><ChevronRight className="size-4 text-zinc-600 dark:text-zinc-300" /></button>
      </div>
      <div className="mt-3 grid grid-cols-7 text-center text-[11px] font-medium text-zinc-400">{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => <span key={day}>{day}</span>)}</div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: offset }, (_, index) => <span key={`empty-${index}`} />)}
        {Array.from({ length: days }, (_, index) => {
          const date = new Date(month.getFullYear(), month.getMonth(), index + 1);
          const past = date < today && !same(date, today);
          const isSelected = same(date, selected);
          return (
            <button key={index} type="button" disabled={past} aria-pressed={isSelected} aria-label={new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date)} onClick={() => setSelected(date)} className={`grid aspect-square place-items-center rounded-lg text-sm transition disabled:text-zinc-300 dark:disabled:text-zinc-700 ${isSelected ? 'bg-teal-600 font-semibold text-white' : same(date, today) ? 'font-semibold text-teal-700 ring-1 ring-teal-500 dark:text-teal-300' : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900'}`}>{index + 1}</button>
          );
        })}
      </div>
      <p className="mt-3 border-t border-zinc-200 pt-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">Selected: <strong className="text-zinc-900 dark:text-white">{new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(selected)}</strong></p>
    </div>
  );
}
