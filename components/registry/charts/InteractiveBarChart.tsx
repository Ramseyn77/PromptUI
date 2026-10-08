/**
 * @registry
 * name: Interactive Bar Chart
 * category: Charts
 * style: SaaS
 * tags: featured, recent
 * description: Histogramme quotidien façon shadcn avec onglets Desktop/Mobile affichant les totaux et info-bulle au survol.
 * prompt: Create a shadcn-style interactive bar chart card: header with title and description on the left and two metric tabs on the right (Desktop / Mobile, each showing its 30-day total, aria-pressed) that switch the plotted series; 30 daily SVG bars with dashed horizontal grid, date ticks every 7 days, and a tooltip (date + value with color dot) that follows the hovered or focused bar (bars are focusable with aria-label). Stacked header on mobile. Includes an sr-only table. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const days = Array.from({ length: 30 }, (_, index) => ({
  label: `Sep ${index + 1}`,
  desktop: Math.round(220 + 110 * Math.sin(index * 0.7) + 70 * Math.sin(index * 0.23) + index * 3),
  mobile: Math.round(160 + 80 * Math.cos(index * 0.5) + 60 * Math.sin(index * 0.31) + index * 2),
}));
const series = { desktop: { label: 'Desktop', color: '#0d9488' }, mobile: { label: 'Mobile', color: '#8b5cf6' } } as const;
type Key = keyof typeof series;

export function InteractiveBarChart() {
  const [active, setActive] = useState<Key>('desktop');
  const [hover, setHover] = useState<number | null>(null);
  const max = 520;
  const width = 600;
  const height = 150;
  const barWidth = width / days.length;
  const total = (key: Key) => days.reduce((sum, day) => sum + day[key], 0);

  return (
    <section className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <header className="flex flex-col border-b border-zinc-200 sm:flex-row dark:border-zinc-800">
        <div className="flex-1 px-5 py-4">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Bar Chart · Interactive</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Total visitors for the last 30 days</p>
        </div>
        <div className="flex">
          {(Object.keys(series) as Key[]).map((key) => (
            <button key={key} type="button" aria-pressed={active === key} onClick={() => setActive(key)} className={`flex flex-1 flex-col justify-center gap-0.5 border-t px-5 py-3 text-left transition sm:border-l sm:border-t-0 dark:border-zinc-800 ${active === key ? 'bg-zinc-50 dark:bg-zinc-900' : 'hover:bg-zinc-50/60 dark:hover:bg-zinc-900/50'}`}>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">{series[key].label}</span>
              <span className="text-2xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">{total(key).toLocaleString('en-US')}</span>
            </button>
          ))}
        </div>
      </header>
      <div className="relative p-5">
        {hover !== null && (
          <div aria-hidden className="pointer-events-none absolute top-2 z-10 -translate-x-1/2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-zinc-700 dark:bg-zinc-900" style={{ left: `calc(1.25rem + ${((hover + 0.5) / days.length) * 100}% - ${((hover + 0.5) / days.length) * 2.5}rem)` }}>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">{days[hover].label}</p>
            <p className="mt-1 flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300"><span className="size-2 rounded-sm" style={{ background: series[active].color }} />{series[active].label}<strong className="ml-2 tabular-nums text-zinc-900 dark:text-zinc-100">{days[hover][active]}</strong></p>
          </div>
        )}
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-44 w-full" onMouseLeave={() => setHover(null)}>
          {[0.25, 0.5, 0.75, 1].map((step) => <line key={step} x1="0" x2={width} y1={height - step * height} y2={height - step * height} vectorEffect="non-scaling-stroke" strokeDasharray="3 4" className="stroke-zinc-200 dark:stroke-zinc-800" />)}
          {days.map((day, index) => {
            const value = day[active];
            const barHeight = (value / max) * height;
            return (
              <rect
                key={day.label}
                tabIndex={0}
                aria-label={`${day.label}: ${value} ${series[active].label.toLowerCase()} visitors`}
                x={index * barWidth + 2}
                y={height - barHeight}
                width={barWidth - 4}
                height={barHeight}
                rx="3"
                fill={series[active].color}
                fillOpacity={hover === null || hover === index ? 1 : 0.45}
                onMouseEnter={() => setHover(index)}
                onFocus={() => setHover(index)}
                onBlur={() => setHover(null)}
                className="outline-none transition-[fill-opacity,height,y] duration-300"
              />
            );
          })}
        </svg>
        <div aria-hidden className="relative mt-2 h-4 text-[11px] text-zinc-400">
          {days.map((day, index) => index % 7 === 0 && <span key={day.label} className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${((index + 0.5) / days.length) * 100}%` }}>{day.label}</span>)}
        </div>
      </div>
      <div className="sr-only"><table><caption>Daily visitors</caption><thead><tr><th>Day</th><th>Desktop</th><th>Mobile</th></tr></thead><tbody>{days.map((day) => <tr key={day.label}><td>{day.label}</td><td>{day.desktop}</td><td>{day.mobile}</td></tr>)}</tbody></table></div>
    </section>
  );
}
