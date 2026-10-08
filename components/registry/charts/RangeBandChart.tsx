/**
 * @registry
 * name: Range Band Chart
 * category: Charts
 * style: Minimal
 * tags: recent
 * description: Courbe de prévision avec bande d'incertitude (min–max) autour de la médiane et séparation réel / prévision.
 * prompt: Create a forecast range band chart: actual monthly revenue as a solid line, then a forecast median as a dashed line surrounded by a shaded uncertainty band (p10–p90) that widens over time; a vertical "Today" divider; a segmented control toggles 80% / 50% confidence (band narrows); legend and accessible summary. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const actual = [42, 45, 44, 49, 53, 56];
const forecast = [56, 59, 62, 64, 67, 70];

export function RangeBandChart() {
  const [confidence, setConfidence] = useState<80 | 50>(80);
  const x = (index: number) => 20 + index * 26;
  const y = (value: number) => 150 - (value - 30) * 2.4;
  const spread = (index: number) => index * (confidence === 80 ? 2.6 : 1.4);
  const upper = forecast.map((value, index) => `${x(index + 5)},${y(value + spread(index))}`);
  const lower = forecast.map((value, index) => `${x(index + 5)},${y(value - spread(index))}`).reverse();

  return (
    <figure className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <figcaption className="font-semibold text-zinc-900 dark:text-zinc-100">Revenue forecast <span className="font-normal text-zinc-500">($k)</span></figcaption>
        <div role="group" aria-label="Confidence interval" className="flex rounded-lg bg-zinc-100 p-0.5 text-xs dark:bg-zinc-900">{([80, 50] as const).map((value) => <button key={value} type="button" aria-pressed={confidence === value} onClick={() => setConfidence(value)} className={`rounded-md px-2.5 py-1 font-medium ${confidence === value ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{value}%</button>)}</div>
      </div>
      <svg viewBox="0 0 320 165" className="mt-3 w-full" role="img" aria-label={`Revenue grew from 42k to 56k; forecast reaches 70k in 5 months, ${confidence}% range ${70 - spread(5)}k to ${70 + spread(5)}k`}>
        {[40, 60, 80].map((tick) => <g key={tick}><line x1="20" x2="310" y1={y(tick)} y2={y(tick)} className="stroke-zinc-100 dark:stroke-zinc-800" /><text x="0" y={y(tick) + 3} className="fill-zinc-400 text-[9px]">{tick}</text></g>)}
        <polygon points={[...upper, ...lower].join(' ')} className="fill-violet-500/15 transition-all duration-500" />
        <line x1={x(5)} x2={x(5)} y1="10" y2="152" strokeDasharray="3 3" className="stroke-zinc-400" />
        <text x={x(5) + 4} y="18" className="fill-zinc-500 text-[9px]">Today</text>
        <polyline points={actual.map((value, index) => `${x(index)},${y(value)}`).join(' ')} fill="none" strokeWidth="2.5" className="stroke-zinc-900 dark:stroke-zinc-100" />
        <polyline points={forecast.map((value, index) => `${x(index + 5)},${y(value)}`).join(' ')} fill="none" strokeWidth="2" strokeDasharray="5 4" className="stroke-violet-500" />
      </svg>
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-zinc-500"><span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-zinc-900 dark:bg-zinc-100" />Actual</span><span className="flex items-center gap-1.5"><span className="h-0.5 w-4 border-t-2 border-dashed border-violet-500" />Median</span><span className="flex items-center gap-1.5"><span className="h-2.5 w-4 rounded-sm bg-violet-500/20" />{confidence}% range</span></div>
    </figure>
  );
}
