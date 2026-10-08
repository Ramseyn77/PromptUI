/**
 * @registry
 * name: Calendar Sidebar
 * category: Sidebar
 * style: Minimal
 * tags: recent
 * description: Barre latérale d'agenda : mini calendrier du mois, bouton créer et calendriers colorés à afficher ou masquer.
 * prompt: Create a calendar app sidebar: a "Create" button, a mini month calendar (October 2026, fixed for hydration safety) with today ringed and a selectable day (aria-pressed), month navigation buttons, then "My calendars" with colored checkboxes (Work, Personal, Birthdays, Holidays) toggling visibility, and an "Other calendars" add link. Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

const calendars = [['Work', 'accent-teal-600', 'bg-teal-500'], ['Personal', 'accent-violet-600', 'bg-violet-500'], ['Birthdays', 'accent-amber-500', 'bg-amber-400'], ['Holidays', 'accent-rose-600', 'bg-rose-500']] as const;

export function CalendarSidebar() {
  const [month, setMonth] = useState(9);
  const [day, setDay] = useState(7);
  const [shown, setShown] = useState<string[]>(['Work', 'Personal', 'Birthdays']);
  const first = new Date(2026, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(2026, month + 1, 0).getDate();

  return (
    <aside className="w-64 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <button type="button" className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 shadow-md ring-1 ring-zinc-200 hover:shadow-lg dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700"><Plus aria-hidden className="size-4 text-teal-600" />Create</button>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        <div className="flex"><button type="button" aria-label="Previous month" onClick={() => setMonth((value) => Math.max(0, value - 1))} className="grid size-7 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><ChevronLeft aria-hidden className="size-4" /></button><button type="button" aria-label="Next month" onClick={() => setMonth((value) => Math.min(11, value + 1))} className="grid size-7 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><ChevronRight aria-hidden className="size-4" /></button></div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-center text-[10px] text-zinc-400" aria-hidden>{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((letter, index) => <span key={index}>{letter}</span>)}</div>
      <div className="mt-1 grid grid-cols-7 gap-y-0.5 text-center">
        {Array.from({ length: offset }, (_, index) => <span key={`e${index}`} />)}
        {Array.from({ length: days }, (_, index) => {
          const date = index + 1;
          const today = month === 9 && date === 5;
          return <button key={date} type="button" aria-pressed={day === date} aria-label={new Date(2026, month, date).toDateString()} onClick={() => setDay(date)} className={`mx-auto grid size-7 place-items-center rounded-full text-xs tabular-nums ${day === date ? 'bg-teal-600 font-semibold text-white' : today ? 'font-bold text-teal-700 ring-1 ring-teal-600 dark:text-teal-400' : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'}`}>{date}</button>;
        })}
      </div>
      <fieldset className="mt-5">
        <legend className="text-xs font-semibold uppercase tracking-wider text-zinc-500">My calendars</legend>
        <div className="mt-2 space-y-1.5">{calendars.map(([name, accent, dot]) => <label key={name} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={shown.includes(name)} onChange={() => setShown((list) => (list.includes(name) ? list.filter((item) => item !== name) : [...list, name]))} className={`size-4 ${accent}`} />{name}<span aria-hidden className={`ml-auto size-2 rounded-full ${dot}`} /></label>)}</div>
      </fieldset>
      <a href="#add" className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-teal-700 hover:underline dark:text-teal-400"><Plus aria-hidden className="size-3.5" />Other calendars</a>
    </aside>
  );
}
