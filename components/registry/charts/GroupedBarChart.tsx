/**
 * @registry
 * name: Grouped Bar Chart
 * category: Charts
 * style: SaaS
 * tags: featured, recent
 * description: Histogramme groupe sur deux series avec legende cliquable, grille et info-bulle au survol.
 * prompt: Create an SVG grouped bar chart (this year vs last year per month) with y-axis gridlines and labels, rounded bars, a legend whose items toggle each series (aria-pressed), a hover tooltip showing both values, and an sr-only data table. Responsive via viewBox. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const data = [['Jan', 32, 24], ['Feb', 41, 30], ['Mar', 38, 35], ['Apr', 52, 40], ['May', 61, 44], ['Jun', 58, 51]] as const;
const series = [{ key: 1, label: '2026', color: '#14b8a6' }, { key: 2, label: '2025', color: '#a78bfa' }] as const;

export function GroupedBarChart() {
  const [hidden, setHidden] = useState<number[]>([]);
  const [hover, setHover] = useState<number | null>(null);
  const max = 70;
  const y = (value: number) => 150 - (value / max) * 130;

  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-white">Signups</h3>
        <div className="flex gap-3">{series.map((item) => <button key={item.key} type="button" aria-pressed={!hidden.includes(item.key)} onClick={() => setHidden((current) => (current.includes(item.key) ? current.filter((key) => key !== item.key) : [...current, item.key]))} className="inline-flex items-center gap-1.5 text-xs text-zinc-600 aria-[pressed=false]:opacity-40 dark:text-zinc-400"><span className="size-2.5 rounded-sm" style={{ background: item.color }} />{item.label}</button>)}</div>
      </div>
      <div className="relative mt-4">
        <svg viewBox="0 0 360 170" className="w-full" aria-hidden onMouseLeave={() => setHover(null)}>
          {[0, 20, 40, 60].map((tick) => <g key={tick}><line x1="28" x2="360" y1={y(tick)} y2={y(tick)} className="stroke-zinc-100 dark:stroke-zinc-800" /><text x="0" y={y(tick) + 4} className="fill-zinc-400 text-[10px]">{tick}</text></g>)}
          {data.map(([month, current, previous], index) => {
            const x = 40 + index * 54;
            return (
              <g key={month} onMouseEnter={() => setHover(index)}>
                <rect x={x - 4} y="10" width="52" height="145" fill="transparent" />
                {series.map((item, s) => !hidden.includes(item.key) && <rect key={item.key} x={x + s * 20} y={y(s ? previous : current)} width="16" height={(s ? previous : current) / max * 130} rx="4" fill={item.color} opacity={hover === null || hover === index ? 1 : 0.35} className="transition-opacity" />)}
                <text x={x + 18} y="166" textAnchor="middle" className="fill-zinc-500 text-[10px]">{month}</text>
              </g>
            );
          })}
        </svg>
        {hover !== null && <div className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs text-white shadow-lg dark:bg-white dark:text-zinc-900" style={{ left: `${((58 + hover * 54) / 360) * 100}%` }}><strong>{data[hover][0]}</strong> · 2026: {data[hover][1]} · 2025: {data[hover][2]}</div>}
      </div>
      <table className="sr-only"><caption>Signups per month</caption><thead><tr><th>Month</th><th>2026</th><th>2025</th></tr></thead><tbody>{data.map(([month, a, b]) => <tr key={month}><td>{month}</td><td>{a}</td><td>{b}</td></tr>)}</tbody></table>
    </section>
  );
}
