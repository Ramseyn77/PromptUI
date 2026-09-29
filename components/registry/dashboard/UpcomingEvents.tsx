/**
 * @registry
 * name: Upcoming Events
 * category: Dashboard
 * style: Minimal
 * tags: recent
 * description: Mini calendrier de la semaine avec jour selectionnable et liste des evenements du jour.
 * prompt: Create an upcoming-events widget: a 7-day strip (weekday + date) where days with events show a dot and the selected day is filled (aria-pressed); below, the selected day's events with colored left border, time range and meeting type; empty days show "Nothing planned". Light and dark mode.
 */
'use client';
import { useState } from 'react';

const days = [['Mon', 28], ['Tue', 29], ['Wed', 30], ['Thu', 1], ['Fri', 2], ['Sat', 3], ['Sun', 4]] as const;
const events: Record<number, Array<{ title: string; time: string; tone: string }>> = {
  29: [{ title: 'Design review', time: '10:00 – 11:00', tone: 'border-teal-500' }, { title: 'Investor call', time: '15:30 – 16:00', tone: 'border-violet-500' }],
  30: [{ title: 'Sprint planning', time: '09:30 – 10:30', tone: 'border-amber-500' }],
  2: [{ title: 'Launch party 🎉', time: '18:00 – 21:00', tone: 'border-rose-500' }],
};

export function UpcomingEvents() {
  const [selected, setSelected] = useState(29);
  const list = events[selected] ?? [];

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-white">This week</h3>
      <div className="mt-4 grid grid-cols-7 gap-1">
        {days.map(([weekday, date]) => (
          <button key={date} type="button" aria-pressed={selected === date} onClick={() => setSelected(date)} className={`flex flex-col items-center gap-1 rounded-xl py-2 text-xs transition ${selected === date ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'}`}>
            <span className="opacity-70">{weekday}</span>
            <span className="text-sm font-semibold">{date}</span>
            <span className={`size-1 rounded-full ${events[date] ? (selected === date ? 'bg-teal-300 dark:bg-teal-600' : 'bg-teal-500') : 'bg-transparent'}`} />
          </button>
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {list.map((event) => (
          <li key={event.title} className={`rounded-r-xl border-l-4 bg-zinc-50 px-3 py-2 dark:bg-zinc-900 ${event.tone}`}>
            <p className="text-sm font-medium text-zinc-900 dark:text-white">{event.title}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{event.time}</p>
          </li>
        ))}
        {!list.length && <li className="rounded-xl border border-dashed border-zinc-200 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">Nothing planned</li>}
      </ul>
    </section>
  );
}
