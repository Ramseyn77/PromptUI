/**
 * @registry
 * name: Revenue Overview
 * category: Dashboard
 * style: SaaS
 * tags: featured, recent
 * description: Carte de revenus avec courbe en aire SVG, onglets de période et point survolé avec valeur.
 * prompt: Create a revenue overview card: total and delta, period tabs (7D, 30D, 12M) that swap datasets, an SVG area chart with gradient fill and gridlines, and hover columns that show a marker + tooltip with the value. Keyboard-accessible via a visually hidden data table. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const datasets = {
  '7D': [12, 18, 15, 22, 19, 26, 30],
  '30D': [20, 24, 18, 28, 32, 27, 35, 38, 34, 42],
  '12M': [30, 34, 29, 40, 46, 44, 52, 58, 55, 63, 70, 76],
} as const;

export function RevenueOverview() {
  const [period, setPeriod] = useState<keyof typeof datasets>('30D');
  const [hover, setHover] = useState<number | null>(null);
  const data = datasets[period];
  const max = Math.max(...data) * 1.15;
  const x = (index: number) => (index / (data.length - 1)) * 100;
  const y = (value: number) => 60 - (value / max) * 60;
  const line = data.map((value, index) => `${x(index)},${y(value)}`).join(' ');

  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Revenue</p>
          <p className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">${data[data.length - 1]}.4k <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">+18%</span></p>
        </div>
        <div role="tablist" aria-label="Period" className="flex rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-900">
          {(Object.keys(datasets) as Array<keyof typeof datasets>).map((key) => (
            <button key={key} type="button" role="tab" aria-selected={period === key} onClick={() => { setPeriod(key); setHover(null); }} className={`rounded-md px-2.5 py-1 text-xs font-semibold ${period === key ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{key}</button>
          ))}
        </div>
      </div>
      <div className="relative mt-5 h-40" onMouseLeave={() => setHover(null)}>
        <svg aria-hidden viewBox="0 0 100 60" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <defs><linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#14b8a6" stopOpacity=".3" /><stop offset="1" stopColor="#14b8a6" stopOpacity="0" /></linearGradient></defs>
          {[15, 30, 45].map((line) => <line key={line} x1="0" x2="100" y1={line} y2={line} strokeDasharray="1 2" vectorEffect="non-scaling-stroke" className="stroke-zinc-200 dark:stroke-zinc-800" />)}
          <polygon points={`0,60 ${line} 100,60`} fill="url(#revenue-fill)" />
          <polyline points={line} fill="none" stroke="#14b8a6" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
        <div className="absolute inset-0 flex">
          {data.map((value, index) => <div key={index} className="flex-1" onMouseEnter={() => setHover(index)} />)}
        </div>
        {hover !== null && (
          <div className="pointer-events-none absolute" style={{ left: `${x(hover)}%`, top: `${(y(data[hover]) / 60) * 100}%` }}>
            <span className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-teal-500 shadow dark:border-zinc-950" />
            <span className="absolute -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap rounded-lg bg-zinc-900 px-2 py-1 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900">${data[hover]}.0k</span>
          </div>
        )}
      </div>
      <div className="sr-only"><table><caption>Revenue for {period}</caption><tbody>{data.map((value, index) => <tr key={index}><td>Point {index + 1}</td><td>${value}k</td></tr>)}</tbody></table></div>
    </section>
  );
}
