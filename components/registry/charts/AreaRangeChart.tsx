/**
 * @registry
 * name: Area Range Chart
 * category: Charts
 * style: Gradient
 * tags: featured, recent
 * description: Aires empilées avec dégradé et sélecteur de période (7, 30, 90 jours), curseur vertical et info-bulle.
 * prompt: Create a shadcn-style area chart: two stacked smooth areas (Desktop, Mobile) filled with vertical gradients over 90 days of data; a segmented control (Last 3 months / 30 days / 7 days, role="radiogroup") filters the range; hovering the chart shows a vertical cursor line, dots on both series and a tooltip with the date and both values; legend below. sr-only summary. Light and dark mode.
 */
'use client';
import { useState, type MouseEvent } from 'react';

const start = new Date(2026, 6, 3);
const data = Array.from({ length: 90 }, (_, index) => ({
  date: new Date(start.getTime() + index * 86_400_000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  desktop: Math.round(180 + 90 * Math.sin(index * 0.21) + 60 * Math.sin(index * 0.67) + index),
  mobile: Math.round(120 + 70 * Math.cos(index * 0.17) + 40 * Math.sin(index * 0.53)),
}));
const ranges = [{ label: 'Last 3 months', days: 90 }, { label: 'Last 30 days', days: 30 }, { label: 'Last 7 days', days: 7 }];

function smooth(points: [number, number][]) {
  return points.reduce((path, [x, y], index) => {
    if (!index) return `M${x.toFixed(1)},${y.toFixed(1)}`;
    const [px, py] = points[index - 1];
    const cx = ((px + x) / 2).toFixed(1);
    return `${path} C${cx},${py.toFixed(1)} ${cx},${y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
  }, '');
}

export function AreaRangeChart() {
  const [days, setDays] = useState(90);
  const [hover, setHover] = useState<number | null>(null);
  const slice = data.slice(-days);
  const width = 600;
  const height = 200;
  const max = 680;
  const x = (index: number) => (index / (slice.length - 1)) * width;
  const y = (value: number) => height - (value / max) * height;
  const mobileLine = smooth(slice.map((point, index) => [x(index), y(point.mobile)]));
  const totalLine = smooth(slice.map((point, index) => [x(index), y(point.mobile + point.desktop)]));
  const mobileBase = `L${width},${height} L0,${height} Z`;

  function move(event: MouseEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    setHover(Math.round(((event.clientX - box.left) / box.width) * (slice.length - 1)));
  }

  const point = hover !== null ? slice[hover] : null;

  return (
    <section className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Area Chart · Interactive</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Total visitors for the selected period</p>
        </div>
        <div role="radiogroup" aria-label="Time range" className="flex rounded-lg border border-zinc-200 p-0.5 dark:border-zinc-800">
          {ranges.map((range) => (
            <button key={range.days} type="button" role="radio" aria-checked={days === range.days} onClick={() => { setDays(range.days); setHover(null); }} className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${days === range.days ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'}`}>{range.label}</button>
          ))}
        </div>
      </header>
      <div className="relative mt-5">
        {point && hover !== null && (
          <div aria-hidden className="pointer-events-none absolute top-0 z-10 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-zinc-700 dark:bg-zinc-900" style={{ left: `${(hover / (slice.length - 1)) * 100}%`, transform: `translateX(${hover > slice.length / 2 ? 'calc(-100% - 12px)' : '12px'})` }}>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">{point.date}</p>
            <p className="mt-1 flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300"><span className="size-2 rounded-sm bg-teal-500" />Desktop <strong className="ml-auto pl-3 tabular-nums text-zinc-900 dark:text-zinc-100">{point.desktop}</strong></p>
            <p className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300"><span className="size-2 rounded-sm bg-violet-500" />Mobile <strong className="ml-auto pl-3 tabular-nums text-zinc-900 dark:text-zinc-100">{point.mobile}</strong></p>
          </div>
        )}
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-52 w-full" onMouseMove={move} onMouseLeave={() => setHover(null)} aria-hidden>
          <defs>
            <linearGradient id="pui-area-desktop" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#14b8a6" stopOpacity=".7" /><stop offset="1" stopColor="#14b8a6" stopOpacity=".05" /></linearGradient>
            <linearGradient id="pui-area-mobile" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8b5cf6" stopOpacity=".7" /><stop offset="1" stopColor="#8b5cf6" stopOpacity=".05" /></linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((step) => <line key={step} x1="0" x2={width} y1={height * step} y2={height * step} vectorEffect="non-scaling-stroke" strokeDasharray="3 4" className="stroke-zinc-200 dark:stroke-zinc-800" />)}
          <path d={`${totalLine} ${mobileBase}`} fill="url(#pui-area-desktop)" />
          <path d={totalLine} fill="none" stroke="#14b8a6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d={`${mobileLine} ${mobileBase}`} fill="url(#pui-area-mobile)" />
          <path d={mobileLine} fill="none" stroke="#8b5cf6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          {point && hover !== null && <line x1={x(hover)} x2={x(hover)} y1="0" y2={height} vectorEffect="non-scaling-stroke" className="stroke-zinc-400 dark:stroke-zinc-500" />}
        </svg>
        <div className="mt-2 flex justify-between text-[11px] text-zinc-400">
          <span>{slice[0].date}</span><span>{slice[Math.floor(slice.length / 2)].date}</span><span>{slice[slice.length - 1].date}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-5 text-xs text-zinc-600 dark:text-zinc-400">
        <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-teal-500" />Desktop</span>
        <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-violet-500" />Mobile</span>
      </div>
      <p className="sr-only">Over the selected {days} days: {slice.reduce((sum, item) => sum + item.desktop, 0)} desktop and {slice.reduce((sum, item) => sum + item.mobile, 0)} mobile visitors.</p>
    </section>
  );
}
