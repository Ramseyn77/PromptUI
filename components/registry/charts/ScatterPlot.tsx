/**
 * @registry
 * name: Scatter Plot
 * category: Charts
 * style: SaaS
 * tags: recent
 * description: Nuage de points taille/couleur par segment, avec focus clavier et info-bulle par point.
 * prompt: Create an SVG scatter plot (price vs. satisfaction) where each point is a focusable circle (tabIndex, aria-label with values) sized by customers and colored by segment; hover/focus shows a tooltip and enlarges the point; axes with ticks and titles; legend. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const points = [
  { name: 'Acme', price: 20, score: 72, size: 8, segment: 'SMB' },
  { name: 'Lumen', price: 45, score: 81, size: 14, segment: 'Mid' },
  { name: 'Orbit', price: 70, score: 64, size: 10, segment: 'Mid' },
  { name: 'Kite', price: 30, score: 90, size: 6, segment: 'SMB' },
  { name: 'Helix', price: 85, score: 88, size: 18, segment: 'Enterprise' },
  { name: 'Nova', price: 60, score: 76, size: 12, segment: 'Enterprise' },
];
const colors: Record<string, string> = { SMB: '#14b8a6', Mid: '#8b5cf6', Enterprise: '#f59e0b' };

export function ScatterPlot() {
  const [active, setActive] = useState<number | null>(null);
  const x = (price: number) => 40 + (price / 100) * 300;
  const y = (score: number) => 150 - ((score - 50) / 50) * 130;

  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-semibold text-zinc-900 dark:text-white">Price vs. satisfaction</h3><div className="flex gap-3">{Object.entries(colors).map(([name, color]) => <span key={name} className="inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400"><span className="size-2.5 rounded-full" style={{ background: color }} />{name}</span>)}</div></div>
      <div className="relative mt-3">
        <svg viewBox="0 0 360 180" className="w-full" role="group" aria-label="Scatter plot of customers">
          {[50, 75, 100].map((tick) => <g key={tick}><line x1="40" x2="340" y1={y(tick)} y2={y(tick)} className="stroke-zinc-100 dark:stroke-zinc-800" /><text x="30" y={y(tick) + 3} textAnchor="end" className="fill-zinc-400 text-[9px]">{tick}</text></g>)}
          {[0, 50, 100].map((tick) => <text key={tick} x={x(tick)} y="166" textAnchor="middle" className="fill-zinc-400 text-[9px]">${tick}</text>)}
          <text x="190" y="178" textAnchor="middle" className="fill-zinc-500 text-[9px]">Price per seat</text>
          {points.map((point, index) => (
            <circle key={point.name} tabIndex={0} aria-label={`${point.name}: $${point.price}, satisfaction ${point.score}, ${point.segment}`} cx={x(point.price)} cy={y(point.score)} r={active === index ? point.size / 1.4 + 3 : point.size / 1.4} fill={colors[point.segment]} fillOpacity=".75" stroke={colors[point.segment]} strokeWidth="1.5" onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} className="cursor-pointer outline-none transition-all focus-visible:stroke-zinc-900 dark:focus-visible:stroke-white" />
          ))}
        </svg>
        {active !== null && <div className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs text-white shadow-lg dark:bg-white dark:text-zinc-900" style={{ left: `${(x(points[active].price) / 360) * 100}%`, top: `${((y(points[active].score) - 14) / 180) * 100}%` }}><strong>{points[active].name}</strong> · ${points[active].price} · {points[active].score}</div>}
      </div>
    </section>
  );
}
