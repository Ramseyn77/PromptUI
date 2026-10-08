/**
 * @registry
 * name: Interactive Donut Chart
 * category: Charts
 * style: SaaS
 * tags: featured, recent
 * description: Donut façon shadcn avec sélecteur de mois : la part choisie ressort et sa valeur s'affiche au centre.
 * prompt: Create a shadcn-style interactive donut chart: a month select in the header (January–May); the SVG donut draws one arc per month with small gaps, the selected slice is pushed outward and thicker while others dim, and the center shows the selected value with "Visitors" caption; clicking a slice also selects it (slices are buttons with aria-label). sr-only table. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const data = [
  { month: 'January', value: 186, color: '#0d9488' },
  { month: 'February', value: 305, color: '#0ea5e9' },
  { month: 'March', value: 237, color: '#8b5cf6' },
  { month: 'April', value: 173, color: '#f59e0b' },
  { month: 'May', value: 209, color: '#f43f5e' },
];

function arc(start: number, end: number, inner: number, outer: number) {
  const point = (angle: number, radius: number) => `${(100 + radius * Math.cos(angle)).toFixed(2)} ${(100 + radius * Math.sin(angle)).toFixed(2)}`;
  const large = end - start > Math.PI ? 1 : 0;
  return `M${point(start, outer)} A${outer} ${outer} 0 ${large} 1 ${point(end, outer)} L${point(end, inner)} A${inner} ${inner} 0 ${large} 0 ${point(start, inner)} Z`;
}

export function InteractiveDonutChart() {
  const id = useId();
  const [selected, setSelected] = useState('February');
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cursor = -Math.PI / 2;
  const current = data.find((item) => item.month === selected)!;

  return (
    <section className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Pie Chart · Interactive</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">January – May 2026</p>
        </div>
        <label htmlFor={`${id}-month`} className="sr-only">Month</label>
        <select id={`${id}-month`} value={selected} onChange={(event) => setSelected(event.target.value)} className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-800 outline-none focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
          {data.map((item) => <option key={item.month}>{item.month}</option>)}
        </select>
      </header>
      <div className="relative mx-auto mt-4 w-60">
        <svg viewBox="0 0 200 200" className="w-full">
          {data.map((item) => {
            const sweep = (item.value / total) * Math.PI * 2;
            const start = cursor + 0.02;
            const end = cursor + sweep - 0.02;
            cursor += sweep;
            const active = item.month === selected;
            const mid = (start + end) / 2;
            return (
              <path
                key={item.month}
                role="button"
                tabIndex={0}
                aria-label={`${item.month}: ${item.value} visitors`}
                aria-pressed={active}
                d={arc(start, end, active ? 56 : 60, active ? 92 : 84)}
                fill={item.color}
                fillOpacity={active ? 1 : 0.35}
                transform={active ? `translate(${(Math.cos(mid) * 4).toFixed(2)} ${(Math.sin(mid) * 4).toFixed(2)})` : undefined}
                onClick={() => setSelected(item.month)}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(item.month); } }}
                className="cursor-pointer outline-none transition-[fill-opacity] duration-300 focus-visible:stroke-zinc-900 focus-visible:stroke-2 dark:focus-visible:stroke-white"
              />
            );
          })}
        </svg>
        <div aria-live="polite" className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-3xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">{current.value}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Visitors in {current.month}</p>
          </div>
        </div>
      </div>
      <div className="sr-only"><table><caption>Visitors per month</caption><tbody>{data.map((item) => <tr key={item.month}><td>{item.month}</td><td>{item.value}</td></tr>)}</tbody></table></div>
    </section>
  );
}
