/**
 * @registry
 * name: Box Plot Chart
 * category: Charts
 * style: Minimal
 * tags: recent
 * description: Boîtes à moustaches de temps de réponse par région, avec médiane, quartiles et valeurs aberrantes.
 * prompt: Create a horizontal box plot of API response times per region (5 regions): each row shows whiskers (min–max), a box (Q1–Q3), a bold median line and outlier dots, on a shared ms axis with gridlines; hovering a row highlights it and shows its five-number summary in a caption. sr-only table. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const rows = [
  { region: 'Paris', stats: [38, 52, 61, 74, 96], outliers: [140] },
  { region: 'Lagos', stats: [61, 78, 92, 108, 150], outliers: [210, 230] },
  { region: 'Tokyo', stats: [44, 55, 63, 70, 88], outliers: [] },
  { region: 'São Paulo', stats: [70, 86, 101, 122, 168], outliers: [205] },
  { region: 'Virginia', stats: [30, 41, 48, 57, 79], outliers: [118] },
];

export function BoxPlotChart() {
  const [hover, setHover] = useState(1);
  const max = 240;
  const x = (value: number) => 70 + (value / max) * 270;
  const [min, q1, median, q3, top] = rows[hover].stats;

  return (
    <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Response time by region</h3>
      <p aria-live="polite" className="text-xs text-zinc-500 dark:text-zinc-400">{rows[hover].region}: min {min} · Q1 {q1} · median {median} · Q3 {q3} · max {top} ms</p>
      <svg viewBox="0 0 350 200" aria-hidden className="mt-3 w-full">
        {[0, 60, 120, 180, 240].map((tick) => <g key={tick}><line x1={x(tick)} x2={x(tick)} y1="5" y2="180" className="stroke-zinc-100 dark:stroke-zinc-800" /><text x={x(tick)} y="195" textAnchor="middle" className="fill-zinc-400 text-[9px]">{tick}</text></g>)}
        {rows.map((row, index) => {
          const y = 22 + index * 34;
          const [a, b, c, d, e] = row.stats;
          const active = hover === index;
          return (
            <g key={row.region} onMouseEnter={() => setHover(index)} className="cursor-default">
              <rect x="0" y={y - 15} width="350" height="30" fill="transparent" />
              <text x="62" y={y + 3} textAnchor="end" className={`text-[10px] ${active ? 'fill-zinc-900 font-semibold dark:fill-zinc-100' : 'fill-zinc-500'}`}>{row.region}</text>
              <line x1={x(a)} x2={x(e)} y1={y} y2={y} className="stroke-zinc-400" />
              <line x1={x(a)} x2={x(a)} y1={y - 6} y2={y + 6} className="stroke-zinc-400" />
              <line x1={x(e)} x2={x(e)} y1={y - 6} y2={y + 6} className="stroke-zinc-400" />
              <rect x={x(b)} y={y - 9} width={x(d) - x(b)} height="18" rx="3" className={active ? 'fill-teal-500/30 stroke-teal-600' : 'fill-teal-500/15 stroke-teal-500/60'} />
              <line x1={x(c)} x2={x(c)} y1={y - 9} y2={y + 9} strokeWidth="2.5" className="stroke-teal-700 dark:stroke-teal-300" />
              {row.outliers.map((outlier) => <circle key={outlier} cx={x(outlier)} cy={y} r="3" className="fill-rose-500" />)}
            </g>
          );
        })}
      </svg>
      <div className="sr-only"><table><caption>Response time (ms) five-number summary</caption><tbody>{rows.map((row) => <tr key={row.region}><td>{row.region}</td><td>{row.stats.join(', ')}</td></tr>)}</tbody></table></div>
    </section>
  );
}
