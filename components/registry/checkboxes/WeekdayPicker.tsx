/**
 * @registry
 * name: Weekday Picker
 * category: Checkboxes
 * style: SaaS
 * tags: recent
 * description: Choix des jours de la semaine en pastilles rondes avec raccourcis Semaine, Week-end et Tous.
 * prompt: Create a recurring-schedule weekday picker: seven round day toggles (sr-only checkboxes with full day names for screen readers, single letters visually), quick presets (Weekdays, Weekend, Every day) and a human summary ("Every weekday", "Mon, Wed, Fri"). Light and dark mode.
 */
'use client';
import { useState } from 'react';

const days = [['M', 'Monday'], ['T', 'Tuesday'], ['W', 'Wednesday'], ['T', 'Thursday'], ['F', 'Friday'], ['S', 'Saturday'], ['S', 'Sunday']];

export function WeekdayPicker() {
  const [picked, setPicked] = useState([0, 2, 4]);
  const toggle = (index: number) => setPicked((current) => (current.includes(index) ? current.filter((day) => day !== index) : [...current, index].sort()));
  const same = (list: number[]) => list.length === picked.length && list.every((day) => picked.includes(day));
  const summary = same([0, 1, 2, 3, 4]) ? 'Every weekday' : same([5, 6]) ? 'Every weekend' : picked.length === 7 ? 'Every day' : picked.length ? picked.map((day) => days[day][1].slice(0, 3)).join(', ') : 'No days selected';

  return (
    <fieldset className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <legend className="sr-only">Repeat on</legend>
      <p className="text-sm font-semibold text-zinc-900 dark:text-white">Repeat on</p>
      <div className="mt-3 flex justify-between gap-1">
        {days.map(([letter, name], index) => {
          const on = picked.includes(index);
          return (
            <label key={name} className="cursor-pointer">
              <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggle(index)} />
              <span aria-hidden className={`grid size-10 place-items-center rounded-full text-sm font-semibold transition peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-zinc-950 ${on ? 'bg-teal-600 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'}`}>{letter}</span>
              <span className="sr-only">{name}</span>
            </label>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {[['Weekdays', [0, 1, 2, 3, 4]], ['Weekend', [5, 6]], ['Every day', [0, 1, 2, 3, 4, 5, 6]]].map(([label, list]) => <button key={label as string} type="button" onClick={() => setPicked(list as number[])} className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900">{label as string}</button>)}
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">{summary}</p>
    </fieldset>
  );
}
