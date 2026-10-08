/**
 * @registry
 * name: Gauge Chart
 * category: Charts
 * style: Gradient
 * tags: featured, recent
 * description: Jauge semi-circulaire façon Ant Design avec zones colorées, aiguille animée et curseur pour tester.
 * prompt: Create an Ant Design-style gauge: a 180° SVG arc split into red/amber/green zones, tick labels 0–100, a needle that rotates with a spring transition to the value, the value and label in the center, and a range input below (labelled) to change the value live. role="meter" with aria-valuenow. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

export function GaugeChart() {
  const id = useId();
  const [value, setValue] = useState(72);
  const arc = (from: number, to: number) => {
    const point = (v: number) => { const a = Math.PI * (1 - v / 100); return `${(100 + 80 * Math.cos(a)).toFixed(2)} ${(100 - 80 * Math.sin(a)).toFixed(2)}`; };
    return `M${point(from)} A80 80 0 0 1 ${point(to)}`;
  };
  const label = value < 40 ? 'At risk' : value < 70 ? 'Fair' : 'Healthy';

  return (
    <section className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Customer health</h3>
      <div role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label="Customer health score" className="relative mt-2">
        <svg viewBox="0 0 200 115" aria-hidden className="w-full">
          <path d={arc(0, 39)} fill="none" stroke="#f43f5e" strokeWidth="14" />
          <path d={arc(40, 69)} fill="none" stroke="#f59e0b" strokeWidth="14" />
          <path d={arc(70, 100)} fill="none" stroke="#10b981" strokeWidth="14" />
          {[0, 25, 50, 75, 100].map((tick) => { const a = Math.PI * (1 - tick / 100); return <text key={tick} x={(100 + 62 * Math.cos(a)).toFixed(1)} y={(104 - 62 * Math.sin(a)).toFixed(1)} textAnchor="middle" className="fill-zinc-400 text-[8px]">{tick}</text>; })}
          <g style={{ transform: `rotate(${(value / 100) * 180 - 90}deg)`, transformOrigin: '100px 100px', transition: 'transform .6s cubic-bezier(.34,1.56,.64,1)' }}>
            <path d="M97 100 L100 34 L103 100 Z" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>
          <circle cx="100" cy="100" r="6" className="fill-zinc-900 dark:fill-zinc-100" />
        </svg>
        <p className="-mt-1 text-center text-3xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">{value}</p>
        <p className="text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
      </div>
      <label htmlFor={id} className="mt-4 block text-xs text-zinc-500">Simulate score</label>
      <input id={id} type="range" min={0} max={100} value={value} onChange={(event) => setValue(Number(event.target.value))} className="mt-1 w-full accent-teal-600" />
    </section>
  );
}
