/**
 * @registry
 * name: Chart Point Tooltip
 * category: Tooltips
 * style: Glass
 * tags: recent
 * description: Infobulle de graphique en verre avec réticule vertical qui suit le pointeur : valeurs des séries au point le plus proche, écart et date.
 * prompt: Create a line chart tooltip pattern: two series (This year, Last year) over 12 months drawn in SVG; moving the pointer or using arrow keys on the focusable chart snaps a vertical crosshair to the nearest month, highlights both points and shows a glass tooltip card that follows horizontally (clamped inside the chart) with the month, each series' value with color swatches and the year-over-year change; leaving hides it (keyboard keeps the last point); an sr-only description of the selected point is announced via aria-live. Light and dark mode.
 */
'use client';
import { useState, type KeyboardEvent, type PointerEvent } from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const current = [42, 48, 45, 56, 61, 58, 70, 74, 69, 80, 86, 92];
const previous = [38, 40, 43, 44, 50, 52, 55, 60, 58, 63, 66, 72];
const x = (index: number) => 20 + index * 32;
const y = (value: number) => 150 - (value - 30) * 1.9;
const line = (data: number[]) => data.map((value, index) => `${index ? 'L' : 'M'}${x(index)},${y(value).toFixed(1)}`).join(' ');

export function ChartPointTooltip() {
  const [index, setIndex] = useState<number | null>(9);

  function onPointer(event: PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const svgX = ((event.clientX - rect.left) / rect.width) * 392;
    setIndex(Math.min(11, Math.max(0, Math.round((svgX - 20) / 32))));
  }
  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') setIndex(Math.min(11, (index ?? -1) + 1));
    if (event.key === 'ArrowLeft') setIndex(Math.max(0, (index ?? 1) - 1));
  }

  const change = index !== null ? Math.round(((current[index] - previous[index]) / previous[index]) * 100) : 0;

  return (
    <figure className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-sky-100 via-white to-violet-100 p-5 dark:from-sky-950/50 dark:via-zinc-950 dark:to-violet-950/50">
      <figcaption className="flex items-center justify-between text-sm font-semibold text-zinc-950 dark:text-white">Active users (k)<span className="flex gap-3 text-xs font-normal text-zinc-500"><span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-violet-500" />This year</span><span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-zinc-400" />Last year</span></span></figcaption>
      <p aria-live="polite" className="sr-only">{index !== null ? `${months[index]}: this year ${current[index]}k, last year ${previous[index]}k, ${change}% change` : ''}</p>
      <div className="relative mt-3">
        <svg viewBox="0 0 392 170" className="w-full cursor-crosshair touch-none rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-violet-500" tabIndex={0} role="img" aria-label="Active users by month, use left and right arrows to inspect points" onPointerMove={onPointer} onPointerDown={onPointer} onKeyDown={onKeyDown}>
          {[50, 70, 90].map((tick) => <line key={tick} x1="20" x2="372" y1={y(tick)} y2={y(tick)} className="stroke-zinc-900/5 dark:stroke-white/5" />)}
          <path d={line(previous)} fill="none" strokeWidth="2" strokeDasharray="4 4" className="stroke-zinc-400" />
          <path d={line(current)} fill="none" strokeWidth="2.5" className="stroke-violet-500" />
          {index !== null && <><line x1={x(index)} x2={x(index)} y1="10" y2="155" className="stroke-zinc-900/30 dark:stroke-white/30" strokeDasharray="3 3" /><circle cx={x(index)} cy={y(previous[index])} r="4" className="fill-white stroke-zinc-400 dark:fill-zinc-950" strokeWidth="2" /><circle cx={x(index)} cy={y(current[index])} r="5" className="fill-white stroke-violet-500 dark:fill-zinc-950" strokeWidth="2.5" /></>}
          {months.map((month, i) => i % 2 === 0 && <text key={month} x={x(i)} y="167" textAnchor="middle" className="fill-zinc-400 text-[9px]">{month}</text>)}
        </svg>
        {index !== null && (
          <div aria-hidden className="pointer-events-none absolute top-0 w-40 rounded-xl border border-white/60 bg-white/70 p-2.5 text-xs shadow-lg backdrop-blur-md transition-[left] duration-150 dark:border-white/10 dark:bg-zinc-900/70" style={{ left: `clamp(0px, calc(${((x(index) / 392) * 100).toFixed(2)}% - 5rem), calc(100% - 10rem))` }}>
            <p className="font-semibold text-zinc-950 dark:text-white">{months[index]} 2026</p>
            <p className="mt-1 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300"><span className="size-2 rounded-full bg-violet-500" />This year<span className="ml-auto font-semibold tabular-nums">{current[index]}k</span></p>
            <p className="flex items-center gap-1.5 text-zinc-500"><span className="size-2 rounded-full bg-zinc-400" />Last year<span className="ml-auto tabular-nums">{previous[index]}k</span></p>
            <p className={`mt-1 font-semibold ${change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>{change >= 0 ? '▲' : '▼'} {Math.abs(change)}% YoY</p>
          </div>
        )}
      </div>
    </figure>
  );
}
