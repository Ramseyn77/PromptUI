/**
 * @registry
 * name: Bubble Chart
 * category: Charts
 * style: SaaS
 * tags: recent
 * description: Nuage de bulles marché : prix × satisfaction, taille selon la part de marché, survol avec détails.
 * prompt: Create a bubble chart comparing competitors: x = price, y = satisfaction score, bubble radius = market share (sqrt scale), each bubble colored by segment with a legend; hovering or focusing a bubble (focusable circles with aria-label) enlarges it, dims others and shows a tooltip card. Axes with labels and grid. sr-only table. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const data = [
  { name: 'Acme', price: 29, score: 8.6, share: 31, segment: 'SMB' },
  { name: 'Globex', price: 79, score: 7.4, share: 22, segment: 'Enterprise' },
  { name: 'Initech', price: 49, score: 6.1, share: 12, segment: 'SMB' },
  { name: 'Umbrella', price: 99, score: 8.1, share: 18, segment: 'Enterprise' },
  { name: 'Hooli', price: 15, score: 6.8, share: 9, segment: 'Startup' },
  { name: 'Vandelay', price: 39, score: 9.0, share: 8, segment: 'Startup' },
];
const colors: Record<string, string> = { SMB: '#14b8a6', Enterprise: '#8b5cf6', Startup: '#f59e0b' };

export function BubbleChart() {
  const [focus, setFocus] = useState<number | null>(null);
  const x = (price: number) => 40 + (price / 110) * 290;
  const y = (score: number) => 180 - ((score - 5) / 5) * 165;
  const active = focus !== null ? data[focus] : null;

  return (
    <section className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Price vs satisfaction</h3>
      <div className="mt-1 flex gap-3 text-xs text-zinc-500">{Object.entries(colors).map(([segment, color]) => <span key={segment} className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: color }} />{segment}</span>)}</div>
      <svg viewBox="0 0 340 205" className="mt-2 w-full" onMouseLeave={() => setFocus(null)}>
        {[5, 6, 7, 8, 9, 10].map((tick) => <g key={tick}><line x1="40" x2="335" y1={y(tick)} y2={y(tick)} className="stroke-zinc-100 dark:stroke-zinc-800" /><text x="32" y={y(tick) + 3} textAnchor="end" className="fill-zinc-400 text-[8px]">{tick}</text></g>)}
        {[0, 25, 50, 75, 100].map((tick) => <text key={tick} x={x(tick)} y="198" textAnchor="middle" className="fill-zinc-400 text-[8px]">${tick}</text>)}
        {data.map((item, index) => (
          <circle key={item.name} tabIndex={0} aria-label={`${item.name}: $${item.price}, score ${item.score}, ${item.share}% share`} cx={x(item.price)} cy={y(item.score)} r={Math.sqrt(item.share) * 3.4 * (focus === index ? 1.15 : 1)} fill={colors[item.segment]} fillOpacity={focus === null || focus === index ? 0.75 : 0.2} stroke={colors[item.segment]} onMouseEnter={() => setFocus(index)} onFocus={() => setFocus(index)} onBlur={() => setFocus(null)} className="cursor-pointer outline-none transition-all duration-200" />
        ))}
      </svg>
      {active && (
        <div aria-hidden className="pointer-events-none absolute right-5 top-5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">{active.name}</p>
          <p className="text-zinc-500 dark:text-zinc-400">${active.price}/mo · {active.score}/10 · {active.share}% share</p>
        </div>
      )}
      <div className="sr-only"><table><caption>Competitors</caption><tbody>{data.map((item) => <tr key={item.name}><td>{item.name}</td><td>{item.price}</td><td>{item.score}</td><td>{item.share}</td></tr>)}</tbody></table></div>
    </section>
  );
}
