/**
 * @registry
 * name: Sparkline Grid
 * category: Charts
 * style: Minimal
 * tags: recent
 * description: Grille de petits multiples : une sparkline par indicateur avec dernière valeur, variation colorée et zone min-max, période commune 7j / 30j.
 * prompt: Create a small-multiples sparkline grid: six metric tiles (MRR, Signups, Churn, NPS, Latency, Tickets) each with a name, the latest value, a delta colored by whether up is good or bad for that metric, and an SVG sparkline with a faint area fill, a dot on the last point and a dashed average line; a 7d / 30d segmented control switches all series (deterministic data); 3 columns on desktop, 2 on tablet, 1 on mobile. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const metrics = [['MRR', '$', 1, true, 48], ['Signups', '', 3, true, 120], ['Churn', '%', 7, false, 2.4], ['NPS', '', 11, true, 52], ['Latency', ' ms', 5, false, 180], ['Tickets', '', 2, false, 64]] as const;
// Smooth deterministic series: two sine waves plus a trend (same result on server and client).
const series = (seed: number, base: number, length: number) => Array.from({ length }, (_, index) => { const t = index / (length - 1); return base * (1 + 0.05 * Math.sin(t * 7 + seed) + 0.025 * Math.sin(t * 19 + seed * 2) + (seed % 2 ? 0.1 : -0.06) * t); });

export function SparklineGrid() {
  const [range, setRange] = useState<7 | 30>(30);

  return (
    <section className="w-full max-w-3xl">
      <div className="mb-3 flex items-center justify-between"><h3 className="font-semibold text-zinc-950 dark:text-white">Health</h3><div role="group" aria-label="Range" className="flex rounded-lg bg-zinc-100 p-0.5 text-xs dark:bg-zinc-900">{([7, 30] as const).map((value) => <button key={value} type="button" aria-pressed={range === value} onClick={() => setRange(value)} className={`rounded-md px-2.5 py-1 font-medium ${range === value ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{value}d</button>)}</div></div>
      <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map(([name, unit, seed, upGood, base]) => {
          const data = series(seed, base, range);
          const min = Math.min(...data);
          const max = Math.max(...data);
          const avg = data.reduce((sum, value) => sum + value, 0) / data.length;
          const px = (index: number) => (index / (data.length - 1)) * 120;
          const py = (value: number) => 36 - ((value - min) / (max - min || 1)) * 32;
          const line = data.map((value, index) => `${px(index).toFixed(1)},${py(value).toFixed(1)}`).join(' ');
          const delta = ((data[data.length - 1] - data[0]) / data[0]) * 100;
          const good = delta >= 0 === upGood;
          const last = data[data.length - 1];
          const format = (value: number) => (unit === '$' ? `$${value.toFixed(1)}k` : `${value < 10 ? value.toFixed(1) : Math.round(value)}${unit}`);
          return (
            <li key={name} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-baseline justify-between"><p className="text-xs text-zinc-500">{name}</p><span className={`text-xs font-semibold ${good ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{delta >= 0 ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%</span></div>
              <p className="text-xl font-bold tabular-nums text-zinc-950 dark:text-white">{format(last)}</p>
              <svg viewBox="-2 -2 124 42" className="mt-2 h-10 w-full" preserveAspectRatio="none" role="img" aria-label={`${name} over ${range} days, from ${format(data[0])} to ${format(last)}`}>
                <polygon points={`0,38 ${line} 120,38`} className={good ? 'fill-emerald-500/10' : 'fill-rose-500/10'} />
                <line x1="0" x2="120" y1={py(avg).toFixed(1)} y2={py(avg).toFixed(1)} strokeDasharray="2 3" vectorEffect="non-scaling-stroke" className="stroke-zinc-300 dark:stroke-zinc-700" />
                <polyline points={line} fill="none" strokeWidth="1.6" vectorEffect="non-scaling-stroke" className={good ? 'stroke-emerald-500' : 'stroke-rose-500'} />
                <circle cx="120" cy={py(last).toFixed(1)} r="2.2" className={good ? 'fill-emerald-500' : 'fill-rose-500'} />
              </svg>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
