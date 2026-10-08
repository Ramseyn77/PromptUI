/**
 * @registry
 * name: Date Range Calendar
 * category: Forms
 * style: SaaS
 * tags: featured, recent
 * description: Calendrier de sélection de plage avec raccourcis, survol de prévisualisation et deux mois sur grand écran.
 * prompt: Create a date range calendar: preset buttons (Today, Last 7 days, This month, Next 14 days) beside one month grid on mobile and two consecutive months from md; click a start date then an end date, with a hover preview band between them; start/end are solid pills and in-range days get a tinted band. Month navigation buttons with aria-labels, each day is a button with a full aria-label and aria-pressed, a summary line shows the chosen range and night count. Uses a fixed reference date (October 2026) to stay hydration safe. Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const today = new Date(2026, 9, 2);
const dayMs = 86_400_000;
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
// Formatted by hand: Node and browser ICU data disagree on punctuation ("Thursday, 1 October" vs "Thursday 1 October"), which breaks hydration.
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const format = (date: Date) => `${date.getDate()} ${monthNames[date.getMonth()].slice(0, 3)}`;
const longLabel = (date: Date) => `${weekdayNames[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

function Month({ year, month, start, end, hover, onPick, onHover }: { year: number; month: number; start: Date | null; end: Date | null; hover: Date | null; onPick: (date: Date) => void; onHover: (date: Date | null) => void }) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const last = end ?? (start && hover && hover > start ? hover : null);

  return (
    <div className="w-64">
      <p className="mb-3 text-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">{monthNames[month]} {year}</p>
      <div className="grid grid-cols-7 text-center text-[11px] font-medium text-zinc-400" aria-hidden>
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => <span key={day} className="py-1">{day}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-y-1" onMouseLeave={() => onHover(null)}>
        {Array.from({ length: offset }, (_, index) => <span key={`empty-${index}`} />)}
        {Array.from({ length: days }, (_, index) => {
          const date = new Date(year, month, index + 1);
          const isEdge = (start && sameDay(date, start)) || (last && sameDay(date, last));
          const inRange = start && last && date > start && date < last;
          const isToday = sameDay(date, today);
          return (
            <span key={index} className={`flex justify-center ${inRange ? 'bg-teal-50 dark:bg-teal-400/10' : ''} ${start && last && sameDay(date, start) ? 'rounded-l-full bg-teal-50 dark:bg-teal-400/10' : ''} ${start && last && sameDay(date, last) ? 'rounded-r-full bg-teal-50 dark:bg-teal-400/10' : ''}`}>
              <button
                type="button"
                aria-label={longLabel(date)}
                aria-pressed={!!isEdge || !!inRange}
                onClick={() => onPick(date)}
                onMouseEnter={() => onHover(date)}
                className={`grid size-9 place-items-center rounded-full text-sm tabular-nums outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500 ${isEdge ? 'bg-teal-600 font-semibold text-white dark:bg-teal-400 dark:text-teal-950' : 'text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800'} ${isToday && !isEdge ? 'font-bold text-teal-700 underline underline-offset-4 dark:text-teal-400' : ''}`}
              >{index + 1}</button>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function DateRangeCalendar() {
  const [view, setView] = useState({ year: 2026, month: 9 });
  const [start, setStart] = useState<Date | null>(new Date(2026, 9, 8));
  const [end, setEnd] = useState<Date | null>(new Date(2026, 9, 14));
  const [hover, setHover] = useState<Date | null>(null);

  function pick(date: Date) {
    if (!start || end || date < start) { setStart(date); setEnd(null); return; }
    setEnd(date);
  }

  function preset(from: Date, to: Date) {
    setStart(from); setEnd(to); setView({ year: from.getFullYear(), month: from.getMonth() });
  }

  const shift = (delta: number) => setView(({ year, month }) => ({ year: year + Math.floor((month + delta) / 12), month: (month + delta + 12) % 12 }));
  const next = { year: view.year + Math.floor((view.month + 1) / 12), month: (view.month + 1) % 12 };
  const nights = start && end ? Math.round((end.getTime() - start.getTime()) / dayMs) : 0;
  const presetClass = 'rounded-lg px-3 py-1.5 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800';

  return (
    <div className="w-fit rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-wrap gap-1 border-zinc-200 md:w-36 md:flex-col md:border-r md:pr-3 dark:border-zinc-800">
          <button type="button" className={presetClass} onClick={() => preset(today, today)}>Today</button>
          <button type="button" className={presetClass} onClick={() => preset(new Date(today.getTime() - 6 * dayMs), today)}>Last 7 days</button>
          <button type="button" className={presetClass} onClick={() => preset(new Date(2026, 9, 1), new Date(2026, 9, 31))}>This month</button>
          <button type="button" className={presetClass} onClick={() => preset(today, new Date(today.getTime() + 13 * dayMs))}>Next 14 days</button>
        </div>
        <div className="relative">
          <button type="button" aria-label="Previous month" onClick={() => shift(-1)} className="absolute left-0 top-0 grid size-7 place-items-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"><ChevronLeft aria-hidden className="size-4" /></button>
          <button type="button" aria-label="Next month" onClick={() => shift(1)} className="absolute right-0 top-0 grid size-7 place-items-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"><ChevronRight aria-hidden className="size-4" /></button>
          <div className="flex gap-6">
            <Month {...view} start={start} end={end} hover={hover} onPick={pick} onHover={setHover} />
            <div className="hidden md:block"><Month {...next} start={start} end={end} hover={hover} onPick={pick} onHover={setHover} /></div>
          </div>
        </div>
      </div>
      <p aria-live="polite" className="mt-4 border-t border-zinc-200 pt-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        {start && end ? <><span className="font-semibold text-zinc-900 dark:text-zinc-100">{format(start)} – {format(end)}</span> · {nights} night{nights === 1 ? '' : 's'}</> : start ? `From ${format(start)}, pick an end date` : 'Pick a start date'}
      </p>
    </div>
  );
}
