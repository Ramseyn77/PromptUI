/**
 * @registry
 * name: Population Pyramid Chart
 * category: Charts
 * style: Editorial
 * tags: recent
 * description: Pyramide des âges en barres opposées (femmes / hommes) par tranche d'âge, comparaison entre deux années et valeur au survol.
 * prompt: Create a population pyramid chart: horizontal bars for 9 age groups (0–9 … 80+) extending left for women and right for men from a central axis with the age labels in the middle; a year toggle (2000 / 2025) animates the bar lengths and draws the other year as a faint outline for comparison; hovering or focusing a row shows exact percentages in a status line; serif title, source note and an sr-only summary. Light (paper) and dark mode.
 */
'use client';
import { useState } from 'react';

const groups = ['80+', '70–79', '60–69', '50–59', '40–49', '30–39', '20–29', '10–19', '0–9'];
const data = {
  2000: { women: [1.4, 2.6, 3.6, 4.6, 6.2, 7.4, 8.1, 8.6, 8.9], men: [0.8, 2.0, 3.3, 4.5, 6.1, 7.5, 8.3, 9.0, 9.3] },
  2025: { women: [2.6, 4.2, 5.6, 6.3, 6.6, 6.9, 6.7, 6.4, 5.9], men: [1.6, 3.5, 5.2, 6.2, 6.6, 7.0, 6.9, 6.7, 6.2] },
};
type Year = keyof typeof data;

export function PopulationPyramidChart() {
  const [year, setYear] = useState<Year>(2025);
  const [hover, setHover] = useState<number | null>(null);
  const other: Year = year === 2025 ? 2000 : 2025;
  const scale = (value: number) => `${(value / 10) * 100}%`;

  return (
    <figure className="w-full max-w-xl rounded-2xl bg-[#faf7f0] p-6 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-3">
        <figcaption className="font-serif text-2xl text-zinc-950 dark:text-white">An ageing population</figcaption>
        <div role="group" aria-label="Year" className="flex rounded-full bg-zinc-900/5 p-0.5 text-xs dark:bg-white/10">{([2000, 2025] as const).map((value) => <button key={value} type="button" aria-pressed={year === value} onClick={() => setYear(value)} className={`rounded-full px-3 py-1 font-semibold ${year === value ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'text-zinc-500'}`}>{value}</button>)}</div>
      </div>
      <p className="sr-only">In {year}, the largest group is {groups[data[year].women.indexOf(Math.max(...data[year].women))]} for women. Older age groups grew compared with {other}.</p>
      <div className="mt-3 flex justify-between text-xs font-semibold"><span className="text-rose-600 dark:text-rose-400">Women</span><span className="text-sky-600 dark:text-sky-400">Men</span></div>
      <p aria-live="polite" className="h-4 text-center text-xs text-zinc-500">{hover !== null ? `${groups[hover]}: women ${data[year].women[hover]}% · men ${data[year].men[hover]}%` : ''}</p>
      <ul className="mt-2 space-y-1">
        {groups.map((group, index) => (
          <li key={group} tabIndex={0} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(index)} onBlur={() => setHover(null)} className={`grid grid-cols-[1fr_3.5rem_1fr] items-center rounded outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${hover === index ? 'bg-zinc-900/5 dark:bg-white/5' : ''}`}>
            <span className="relative flex h-5 justify-end">
              <span aria-hidden className="absolute inset-y-0 right-0 border border-dashed border-rose-400/60" style={{ width: scale(data[other].women[index]) }} />
              <span aria-hidden className="relative h-full rounded-l bg-rose-500/80 transition-[width] duration-500" style={{ width: scale(data[year].women[index]) }} />
            </span>
            <span className="text-center text-[11px] tabular-nums text-zinc-600 dark:text-zinc-400">{group}</span>
            <span className="relative flex h-5">
              <span aria-hidden className="absolute inset-y-0 left-0 border border-dashed border-sky-400/60" style={{ width: scale(data[other].men[index]) }} />
              <span aria-hidden className="relative h-full rounded-r bg-sky-500/80 transition-[width] duration-500" style={{ width: scale(data[year].men[index]) }} />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-zinc-500">Share of population, %. Dashed outline: {other}. Illustrative data.</p>
    </figure>
  );
}
