/**
 * @registry
 * name: Sunburst Chart
 * category: Charts
 * style: Gradient
 * tags: featured, recent
 * description: Diagramme sunburst à deux anneaux (catégories puis sous-catégories) avec focus au clic et fil d'Ariane.
 * prompt: Create a two-ring sunburst chart of cloud spend: the inner ring shows services (Compute, Storage, Network, Data), the outer ring their sub-items; clicking an inner segment focuses it (others fade) and the center shows its name and total; a breadcrumb "All › Compute" resets; segments are keyboard-focusable buttons with labels; legend list below. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const groups = [
  { name: 'Compute', color: '#8b5cf6', items: [['VMs', 38], ['Functions', 12], ['GPU', 20]] },
  { name: 'Storage', color: '#ec4899', items: [['Objects', 14], ['Block', 8]] },
  { name: 'Network', color: '#f59e0b', items: [['Egress', 11], ['CDN', 5]] },
  { name: 'Data', color: '#06b6d4', items: [['Warehouse', 16], ['Streams', 6]] },
] as const;
const total = groups.reduce((sum, group) => sum + group.items.reduce((acc, [, value]) => acc + value, 0), 0);

function arc(start: number, end: number, inner: number, outer: number) {
  const point = (angle: number, radius: number) => `${(100 + radius * Math.sin(angle)).toFixed(2)} ${(100 - radius * Math.cos(angle)).toFixed(2)}`;
  const large = end - start > Math.PI ? 1 : 0;
  return `M${point(start, outer)} A${outer} ${outer} 0 ${large} 1 ${point(end, outer)} L${point(end, inner)} A${inner} ${inner} 0 ${large} 0 ${point(start, inner)}Z`;
}

export function SunburstChart() {
  const [focus, setFocus] = useState<string | null>(null);
  let cursor = 0;
  const segments = groups.map((group) => {
    const value = group.items.reduce((sum, [, amount]) => sum + amount, 0);
    const start = cursor;
    let inner = cursor;
    const children = group.items.map(([label, amount]) => { const from = inner; inner += (amount / total) * Math.PI * 2; return { label, amount, from, to: inner }; });
    cursor += (value / total) * Math.PI * 2;
    return { ...group, value, start, end: cursor, children };
  });
  const current = segments.find((segment) => segment.name === focus);

  return (
    <figure className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <nav aria-label="Breadcrumb" className="text-xs text-zinc-500"><button type="button" onClick={() => setFocus(null)} className="hover:text-zinc-900 dark:hover:text-zinc-100">All</button>{current && <> › <span className="font-medium text-zinc-900 dark:text-zinc-100">{current.name}</span></>}</nav>
      <svg viewBox="0 0 200 200" className="mx-auto mt-2 w-full max-w-[16rem]" role="group" aria-label="Cloud spend sunburst">
        {segments.map((segment) => (
          <g key={segment.name} className={`transition-opacity ${focus && focus !== segment.name ? 'opacity-20' : ''}`}>
            <path d={arc(segment.start, segment.end, 38, 66)} fill={segment.color} stroke="currentColor" strokeWidth="1.5" className="cursor-pointer text-white outline-none focus-visible:opacity-80 dark:text-zinc-950" tabIndex={0} role="button" aria-label={`${segment.name}: $${segment.value}k`} aria-pressed={focus === segment.name} onClick={() => setFocus(focus === segment.name ? null : segment.name)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setFocus(focus === segment.name ? null : segment.name); } }} />
            {segment.children.map((child) => <path key={child.label} d={arc(child.from, child.to, 68, 94)} fill={segment.color} fillOpacity="0.55" stroke="currentColor" strokeWidth="1.5" className="text-white dark:text-zinc-950"><title>{`${child.label}: $${child.amount}k`}</title></path>)}
          </g>
        ))}
        <text x="100" y="96" textAnchor="middle" className="fill-zinc-500 text-[9px]">{current ? current.name : 'Total'}</text>
        <text x="100" y="112" textAnchor="middle" className="fill-zinc-900 text-[15px] font-bold dark:fill-zinc-100">${current ? current.value : total}k</text>
      </svg>
      <ul className="mt-3 grid grid-cols-2 gap-1.5 text-xs">
        {(current ? current.children.map((child) => ({ name: child.label, value: child.amount, color: current.color })) : segments.map((segment) => ({ name: segment.name, value: segment.value, color: segment.color }))).map((entry) => <li key={entry.name} className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400"><span className="size-2.5 rounded-sm" style={{ background: entry.color }} />{entry.name}<span className="ml-auto tabular-nums text-zinc-900 dark:text-zinc-100">${entry.value}k</span></li>)}
      </ul>
    </figure>
  );
}
