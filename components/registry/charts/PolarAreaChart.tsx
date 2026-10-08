/**
 * @registry
 * name: Polar Area Chart
 * category: Charts
 * style: Gradient
 * tags: recent
 * description: Diagramme en rose des vents : secteurs égaux dont le rayon varie selon la valeur, survol interactif.
 * prompt: Create an SVG polar area (rose) chart: equal-angle wedges whose radius scales with each value (sqrt for area accuracy), colored palette, hover/focus highlights a wedge and shows its label/value in the center; concentric guide circles; legend list with values. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const data = [['Mon', 42], ['Tue', 58], ['Wed', 71], ['Thu', 64], ['Fri', 88], ['Sat', 35], ['Sun', 22]] as const;
const palette = ['#14b8a6', '#0ea5e9', '#6366f1', '#8b5cf6', '#d946ef', '#f59e0b', '#f97316'];

function wedge(index: number, radius: number) {
  const step = (Math.PI * 2) / data.length;
  const start = index * step - Math.PI / 2;
  const end = start + step;
  const point = (angle: number) => `${100 + Math.cos(angle) * radius},${100 + Math.sin(angle) * radius}`;
  return `M100,100 L${point(start)} A${radius},${radius} 0 0 1 ${point(end)} Z`;
}

export function PolarAreaChart() {
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(...data.map(([, value]) => value));

  return (
    <section className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:flex-row dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 200 200" className="size-48 shrink-0" role="group" aria-label="Sessions by weekday">
        {[30, 60, 90].map((r) => <circle key={r} cx="100" cy="100" r={r} fill="none" className="stroke-zinc-200 dark:stroke-zinc-800" />)}
        {data.map(([day, value], index) => (
          <path key={day} d={wedge(index, Math.sqrt(value / max) * 90)} fill={palette[index]} fillOpacity={active === null || active === index ? 0.85 : 0.25} stroke="white" strokeWidth="1.5" tabIndex={0} aria-label={`${day}: ${value} sessions`} onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} className="cursor-pointer outline-none transition-[fill-opacity] dark:stroke-zinc-950" />
        ))}
        <text x="100" y="98" textAnchor="middle" className="pointer-events-none fill-zinc-900 text-[14px] font-semibold dark:fill-white">{active === null ? '380' : data[active][1]}</text>
        <text x="100" y="112" textAnchor="middle" className="pointer-events-none fill-zinc-500 text-[8px]">{active === null ? 'sessions' : data[active][0]}</text>
      </svg>
      <ul className="grid w-full grid-cols-2 gap-1.5 text-xs sm:grid-cols-1">
        {data.map(([day, value], index) => <li key={day} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"><span className="size-2.5 rounded-sm" style={{ background: palette[index] }} />{day}<span className="ml-auto font-semibold tabular-nums text-zinc-900 dark:text-white">{value}</span></li>)}
      </ul>
    </section>
  );
}
