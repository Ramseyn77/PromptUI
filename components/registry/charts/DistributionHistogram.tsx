/**
 * @registry
 * name: Distribution Histogram
 * category: Charts
 * style: Gradient
 * tags: recent
 * description: Histogramme de distribution des temps de réponse : bins ajustables, marqueurs médiane / p95, percentile sous le curseur et zone de queue.
 * prompt: Create a response-time distribution histogram: bars for bins computed from a deterministic sample of 600 latencies; a slider changes the bin count (10–40); vertical markers for median and p95 with labels; bars beyond p95 use a warm gradient "tail" color; hovering or focusing a bar shows its range, count and cumulative percentile in a status line; axis labels in ms. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const sample = Array.from({ length: 600 }, (_, index) => {
  const base = 60 + ((index * 53) % 97) + ((index * 31) % 71);
  return index % 17 === 0 ? base + 260 + ((index * 13) % 220) : base;
}).sort((a, b) => a - b);
const quantile = (q: number) => sample[Math.floor(q * (sample.length - 1))];
const min = sample[0];
const max = sample[sample.length - 1];

export function DistributionHistogram() {
  const uid = useId();
  const [bins, setBins] = useState(24);
  const [hover, setHover] = useState<number | null>(null);
  const width = (max - min) / bins;
  const counts = Array.from({ length: bins }, (_, index) => sample.filter((value) => value >= min + index * width && (index === bins - 1 ? value <= max : value < min + (index + 1) * width)).length);
  const peak = Math.max(...counts);
  const median = quantile(0.5);
  const p95 = quantile(0.95);
  const sx = (value: number) => 30 + ((value - min) / (max - min)) * 360;
  const cumulative = (index: number) => Math.round((counts.slice(0, index + 1).reduce((sum, count) => sum + count, 0) / sample.length) * 100);

  return (
    <figure className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <figcaption className="flex flex-wrap items-center justify-between gap-2"><span className="font-semibold text-zinc-950 dark:text-white">API latency distribution</span><label htmlFor={`${uid}-bins`} className="flex items-center gap-2 text-xs text-zinc-500">Bins {bins}<input id={`${uid}-bins`} type="range" min={10} max={40} value={bins} onChange={(event) => setBins(Number(event.target.value))} className="w-24 accent-violet-600" /></label></figcaption>
      <p aria-live="polite" className="mt-1 h-5 text-xs text-zinc-500">{hover !== null ? `${Math.round(min + hover * width)}–${Math.round(min + (hover + 1) * width)} ms · ${counts[hover]} requests · p${cumulative(hover)}` : `${sample.length} requests · median ${median} ms · p95 ${p95} ms`}</p>
      <svg viewBox="0 0 400 190" className="mt-2 w-full" role="group" aria-label="Latency histogram">
        <defs><linearGradient id={`${uid}-tail`.replace(/[^a-zA-Z0-9-]/g, '')} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fb7185" /><stop offset="1" stopColor="#f59e0b" /></linearGradient></defs>
        {counts.map((count, index) => {
          const x0 = sx(min + index * width);
          const height = (count / peak) * 140;
          const tail = min + index * width >= p95;
          return <rect key={index} x={x0.toFixed(1)} y={(160 - height).toFixed(1)} width={Math.max(1, 360 / bins - 1.5).toFixed(1)} height={height.toFixed(1)} rx="1.5" tabIndex={0} aria-label={`${Math.round(min + index * width)} to ${Math.round(min + (index + 1) * width)} ms: ${count}`} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(index)} onBlur={() => setHover(null)} fill={tail ? `url(#${`${uid}-tail`.replace(/[^a-zA-Z0-9-]/g, '')})` : undefined} className={`outline-none transition-opacity ${tail ? '' : 'fill-violet-500'} ${hover !== null && hover !== index ? 'opacity-50' : ''}`} />;
        })}
        {[[median, 'median'], [p95, 'p95']].map(([value, label]) => <g key={label as string}><line x1={sx(value as number).toFixed(1)} x2={sx(value as number).toFixed(1)} y1="12" y2="160" strokeDasharray="3 3" className="stroke-zinc-900 dark:stroke-zinc-100" /><text x={(sx(value as number) + 4).toFixed(1)} y="20" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">{label as string} {value as number}ms</text></g>)}
        <line x1="30" x2="390" y1="160" y2="160" className="stroke-zinc-200 dark:stroke-zinc-800" />
        {[min, Math.round((min + max) / 2), max].map((value) => <text key={value} x={sx(value).toFixed(1)} y="176" textAnchor="middle" className="fill-zinc-400 text-[10px]">{value} ms</text>)}
      </svg>
    </figure>
  );
}
