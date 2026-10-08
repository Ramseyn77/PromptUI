/**
 * @registry
 * name: Radial Bar Chart
 * category: Charts
 * style: Minimal
 * tags: recent
 * description: Barres radiales concentriques par navigateur qui se dessinent à l'apparition, avec légende et tendance.
 * prompt: Create a shadcn-style radial bar chart card: five concentric SVG arcs (Chrome, Safari, Firefox, Edge, Other) on faint background tracks, lengths proportional to visitors, drawn in with a stroke-dashoffset animation on mount and highlighted on legend hover; legend with color dots and values; footer with "Trending up by 5.2% this month" and a caption. sr-only table. Light and dark mode; static with reduced motion.
 */
'use client';
import { TrendingUp } from 'lucide-react';
import { useState } from 'react';

const data = [
  { name: 'Chrome', value: 275, color: '#0d9488' },
  { name: 'Safari', value: 200, color: '#0ea5e9' },
  { name: 'Firefox', value: 187, color: '#8b5cf6' },
  { name: 'Edge', value: 173, color: '#f59e0b' },
  { name: 'Other', value: 90, color: '#f43f5e' },
];

export function RadialBarChart() {
  const [focus, setFocus] = useState<string | null>(null);
  const max = 300;

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-radial-draw{from{stroke-dashoffset:100}}`}</style>
      <h3 className="text-center font-semibold text-zinc-900 dark:text-zinc-50">Radial Chart</h3>
      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">January – June 2026</p>
      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row">
        <svg viewBox="0 0 200 200" aria-hidden className="w-52 shrink-0 -rotate-90">
          {data.map((item, index) => {
            const r = 88 - index * 15;
            const length = (item.value / max) * 75;
            return (
              <g key={item.name} style={{ opacity: focus && focus !== item.name ? 0.25 : 1 }} className="transition-opacity">
                <circle cx="100" cy="100" r={r} fill="none" strokeWidth="10" pathLength={100} strokeDasharray="75 100" strokeLinecap="round" className="stroke-zinc-100 dark:stroke-zinc-900" />
                <circle cx="100" cy="100" r={r} fill="none" strokeWidth="10" stroke={item.color} pathLength={100} strokeDasharray={`${length} 100`} strokeLinecap="round" className="motion-safe:animate-[pui-radial-draw_1s_ease-out_both]" style={{ animationDelay: `${index * 0.1}s` }} />
              </g>
            );
          })}
        </svg>
        <ul className="grid w-full gap-1.5">
          {data.map((item) => (
            <li key={item.name} onMouseEnter={() => setFocus(item.name)} onMouseLeave={() => setFocus(null)} className="flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <span className="size-2.5 rounded-sm" style={{ background: item.color }} />
              <span className="text-zinc-600 dark:text-zinc-400">{item.name}</span>
              <span className="ml-auto font-medium tabular-nums text-zinc-900 dark:text-zinc-100">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <footer className="mt-4 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-800">
        <p className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-100">Trending up by 5.2% this month <TrendingUp aria-hidden className="size-4 text-emerald-500" /></p>
        <p className="text-zinc-500 dark:text-zinc-400">Showing total visitors for the last 6 months</p>
      </footer>
      <div className="sr-only"><table><caption>Visitors by browser</caption><tbody>{data.map((item) => <tr key={item.name}><td>{item.name}</td><td>{item.value}</td></tr>)}</tbody></table></div>
    </section>
  );
}
