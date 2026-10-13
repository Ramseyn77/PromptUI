/**
 * @registry
 * name: Venn Diagram Chart
 * category: Charts
 * style: Minimal
 * tags: recent
 * description: Diagramme de Venn à trois ensembles (web, mobile, API) en cercles semi-transparents : régions cliquables avec effectifs et légende.
 * prompt: Create a three-set Venn diagram of product usage (Web, Mobile, API users): three translucent overlapping SVG circles with mix-blend multiply (screen in dark mode), region counts placed in each of the 7 regions, region hit areas as focusable buttons that highlight and show "Web + Mobile only: 1,240 users (18%)" in a status line; a legend with set totals; and an sr-only table of all regions. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const regions = [
  { key: 'W', label: 'Web only', count: 2100, x: 95, y: 95 }, { key: 'M', label: 'Mobile only', count: 1650, x: 205, y: 95 }, { key: 'A', label: 'API only', count: 520, x: 150, y: 205 },
  { key: 'WM', label: 'Web + Mobile only', count: 1240, x: 150, y: 80 }, { key: 'WA', label: 'Web + API only', count: 610, x: 112, y: 152 }, { key: 'MA', label: 'Mobile + API only', count: 380, x: 188, y: 152 }, { key: 'WMA', label: 'All three', count: 430, x: 150, y: 130 },
];
const total = regions.reduce((sum, region) => sum + region.count, 0);
const sets = [{ key: 'W', name: 'Web', cx: 120, cy: 110, color: '#6366f1' }, { key: 'M', name: 'Mobile', cx: 180, cy: 110, color: '#ec4899' }, { key: 'A', name: 'API', cx: 150, cy: 162, color: '#f59e0b' }];

export function VennDiagramChart() {
  const [active, setActive] = useState<string | null>('WMA');
  const region = regions.find((item) => item.key === active);

  return (
    <figure className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <figcaption className="font-semibold text-zinc-950 dark:text-white">Where people use the product</figcaption>
      <p aria-live="polite" className="mt-1 h-5 text-sm text-zinc-600 dark:text-zinc-400">{region ? `${region.label}: ${region.count.toLocaleString('en-US')} users (${Math.round((region.count / total) * 100)}%)` : 'Select a region'}</p>
      <svg viewBox="0 0 300 250" className="mt-2 w-full" role="group" aria-label="Venn diagram of Web, Mobile and API users">
        {sets.map((set) => <circle key={set.key} cx={set.cx} cy={set.cy} r="72" fill={set.color} fillOpacity={active && !active.includes(set.key) ? 0.12 : 0.35} stroke={set.color} strokeWidth="1.5" className="mix-blend-multiply transition-[fill-opacity] dark:mix-blend-screen" />)}
        {regions.map((item) => (
          <g key={item.key} role="button" tabIndex={0} aria-pressed={active === item.key} aria-label={`${item.label}, ${item.count} users`} onClick={() => setActive(item.key)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setActive(item.key); } }} className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-zinc-950 dark:[&:focus-visible>circle]:stroke-white">
            <circle cx={item.x} cy={item.y} r="17" className={active === item.key ? 'fill-white stroke-zinc-900 dark:fill-zinc-900 dark:stroke-white' : 'fill-transparent stroke-transparent'} strokeWidth="2" />
            <text x={item.x} y={item.y + 4} textAnchor="middle" className="pointer-events-none fill-zinc-900 text-[10px] font-bold tabular-nums dark:fill-white">{item.count >= 1000 ? `${(item.count / 1000).toFixed(1)}k` : item.count}</text>
          </g>
        ))}
        {sets.map((set, index) => <text key={set.key} x={[48, 252, 150][index]} y={[40, 40, 246][index]} textAnchor="middle" fill={set.color} className="text-[12px] font-semibold">{set.name}</text>)}
      </svg>
      <ul className="mt-2 flex justify-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">{sets.map((set) => <li key={set.key} className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: set.color }} />{set.name} · {regions.filter((item) => item.key.includes(set.key)).reduce((sum, item) => sum + item.count, 0).toLocaleString('en-US')}</li>)}</ul>
      <table className="sr-only"><caption>Users per region</caption><tbody>{regions.map((item) => <tr key={item.key}><th scope="row">{item.label}</th><td>{item.count}</td></tr>)}</tbody></table>
    </figure>
  );
}
