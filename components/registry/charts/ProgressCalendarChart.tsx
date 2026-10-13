/**
 * @registry
 * name: Progress Calendar Chart
 * category: Charts
 * style: Dark
 * tags: recent
 * description: Calendrier de l'année en points (365 jours) : jours écoulés remplis, objectif de séances coloré, mois étiquetés et pourcentage de l'année.
 * prompt: Create a dark "year in dots" chart: 365 small dots arranged by month in 12 rows (each row up to 31 dots), days already passed (relative to a fixed demo date, Oct 13) are filled, workout days (deterministic pattern) are colored with intensity, today has a ring; month labels on the left, a header with "Day 286 of 365 · 78%" and a goal tracker "142 / 180 workouts"; hovering or focusing a dot shows its date and activity in a status line. Dark in both themes.
 */
'use client';
import { useState } from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const todayIndex = lengths.slice(0, 9).reduce((sum, value) => sum + value, 0) + 12;
const intensity = (day: number) => ((day * 7 + (day % 5) * 3) % 10 > 4 ? ((day * 13) % 3) + 1 : 0);

export function ProgressCalendarChart() {
  const [hover, setHover] = useState<string | null>(null);
  const workouts = Array.from({ length: todayIndex + 1 }, (_, day) => intensity(day)).filter(Boolean).length;
  let dayOfYear = 0;

  return (
    <figure className="w-full max-w-2xl rounded-3xl bg-zinc-950 p-5 text-zinc-300 ring-1 ring-white/10">
      <div className="flex flex-wrap items-end justify-between gap-2"><figcaption><span className="block text-xs text-zinc-500">2026</span><span className="text-lg font-semibold text-white">Day {todayIndex + 1} of 365 · {Math.round(((todayIndex + 1) / 365) * 100)}%</span></figcaption><p className="text-sm">{workouts} / 180 workouts<span className="ml-2 inline-block h-1.5 w-24 rounded-full bg-white/10 align-middle"><span className="block h-full rounded-full bg-lime-400" style={{ width: `${Math.min(100, (workouts / 180) * 100)}%` }} /></span></p></div>
      <p aria-live="polite" className="mt-2 h-4 text-xs text-zinc-400">{hover ?? 'Hover a day'}</p>
      <p className="sr-only">{workouts} workouts logged so far this year, out of a goal of 180.</p>
      <div aria-hidden className="mt-2 space-y-1 overflow-x-auto" data-lenis-prevent>
        {months.map((month, monthIndex) => (
          <div key={month} className="flex min-w-[34rem] items-center gap-1">
            <span className="w-8 shrink-0 text-[10px] text-zinc-500">{month}</span>
            {Array.from({ length: lengths[monthIndex] }, (_, date) => {
              const day = dayOfYear++;
              const past = day <= todayIndex;
              const level = past ? intensity(day) : 0;
              const label = `${month} ${date + 1}: ${!past ? 'upcoming' : level ? `workout, intensity ${level}` : 'rest day'}`;
              return <span key={date} onMouseEnter={() => setHover(label)} className={`size-3 shrink-0 rounded-full ${day === todayIndex ? 'ring-2 ring-white ring-offset-1 ring-offset-zinc-950' : ''} ${!past ? 'bg-white/5' : level === 3 ? 'bg-lime-300' : level === 2 ? 'bg-lime-500' : level === 1 ? 'bg-lime-700' : 'bg-white/25'}`} />;
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-zinc-500">Rest<span className="size-2.5 rounded-full bg-white/25" /><span className="size-2.5 rounded-full bg-lime-700" /><span className="size-2.5 rounded-full bg-lime-500" /><span className="size-2.5 rounded-full bg-lime-300" />Intense</div>
    </figure>
  );
}
