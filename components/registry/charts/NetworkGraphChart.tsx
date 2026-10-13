/**
 * @registry
 * name: Network Graph Chart
 * category: Charts
 * style: Glass
 * tags: recent
 * description: Graphe de réseau de microservices : nœuds dimensionnés par trafic, liens pondérés, sélection d'un nœud qui met en avant ses voisins et détails.
 * prompt: Create a service dependency network graph on a glassy panel: nodes at fixed coordinates sized by request volume and colored by health (ok, degraded, down), edges with thickness by calls/min; clicking or pressing Enter on a node selects it, highlights its direct neighbours and edges while dimming the rest, and shows a details card (requests/min, error rate, dependencies); Escape clears; nodes are focusable buttons in SVG with labels. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const nodes = [
  { id: 'gateway', x: 200, y: 40, load: 980, health: 'ok' }, { id: 'auth', x: 80, y: 120, load: 620, health: 'ok' }, { id: 'orders', x: 200, y: 140, load: 540, health: 'degraded' },
  { id: 'search', x: 320, y: 120, load: 410, health: 'ok' }, { id: 'payments', x: 140, y: 230, load: 280, health: 'down' }, { id: 'inventory', x: 270, y: 230, load: 330, health: 'ok' }, { id: 'postgres', x: 200, y: 310, load: 900, health: 'ok' },
] as const;
const edges = [['gateway', 'auth', 600], ['gateway', 'orders', 520], ['gateway', 'search', 400], ['orders', 'payments', 260], ['orders', 'inventory', 300], ['auth', 'postgres', 420], ['payments', 'postgres', 120], ['inventory', 'postgres', 280], ['search', 'inventory', 90]] as const;
const color = { ok: '#10b981', degraded: '#f59e0b', down: '#ef4444' };
const errors = { ok: '0.2%', degraded: '3.8%', down: '41%' };

export function NetworkGraphChart() {
  const [selected, setSelected] = useState<string | null>('orders');
  const linked = (id: string) => !selected || id === selected || edges.some(([a, b]) => (a === selected && b === id) || (b === selected && a === id));
  const node = nodes.find((item) => item.id === selected);
  const pos = (id: string) => nodes.find((item) => item.id === id)!;

  return (
    <figure className="w-full max-w-xl rounded-3xl bg-[linear-gradient(135deg,#c7d2fe,#a5f3fc,#bbf7d0)] p-4 dark:bg-[linear-gradient(135deg,#1e1b4b,#083344,#052e16)]" onKeyDown={(event) => { if (event.key === 'Escape') setSelected(null); }}>
      <div className="rounded-2xl border border-white/50 bg-white/60 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60">
        <figcaption className="flex items-center justify-between text-sm font-semibold text-zinc-950 dark:text-white">Service map<span className="flex gap-3 text-[11px] font-normal text-zinc-600 dark:text-zinc-400">{Object.entries(color).map(([key, value]) => <span key={key} className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: value }} />{key}</span>)}</span></figcaption>
        <svg viewBox="0 0 400 350" className="mt-2 w-full" role="group" aria-label="Service dependency graph">
          {edges.map(([a, b, calls]) => { const on = !selected || a === selected || b === selected; return <line key={`${a}-${b}`} x1={pos(a).x} y1={pos(a).y} x2={pos(b).x} y2={pos(b).y} strokeWidth={1 + calls / 120} strokeLinecap="round" className={`transition-opacity ${on ? 'stroke-zinc-500 dark:stroke-zinc-400' : 'stroke-zinc-300 opacity-30 dark:stroke-zinc-700'}`} />; })}
          {nodes.map((item) => {
            const radius = 10 + item.load / 70;
            return (
              <g key={item.id} role="button" tabIndex={0} aria-pressed={selected === item.id} aria-label={`${item.id}, ${item.health}, ${item.load} requests per minute`} onClick={() => setSelected(selected === item.id ? null : item.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(selected === item.id ? null : item.id); } }} className={`cursor-pointer outline-none transition-opacity [&:focus-visible>circle]:stroke-zinc-950 dark:[&:focus-visible>circle]:stroke-white ${linked(item.id) ? '' : 'opacity-25'}`}>
                <circle cx={item.x} cy={item.y} r={radius} fill={color[item.health]} fillOpacity={0.9} stroke="white" strokeWidth={selected === item.id ? 4 : 2} />
                <text x={item.x} y={item.y + radius + 13} textAnchor="middle" className="fill-zinc-800 text-[11px] font-medium dark:fill-zinc-200">{item.id}</text>
              </g>
            );
          })}
        </svg>
        <div aria-live="polite" className="min-h-[3.5rem] rounded-xl bg-white/70 p-3 text-xs dark:bg-zinc-900/70">
          {node ? <div className="grid grid-cols-3 gap-2"><div><p className="text-zinc-500">Service</p><p className="font-semibold text-zinc-950 dark:text-white">{node.id}</p></div><div><p className="text-zinc-500">Req/min</p><p className="font-semibold tabular-nums text-zinc-950 dark:text-white">{node.load}</p></div><div><p className="text-zinc-500">Errors</p><p className="font-semibold tabular-nums" style={{ color: color[node.health] }}>{errors[node.health]}</p></div></div> : <p className="text-zinc-500">Select a service to inspect its dependencies.</p>}
        </div>
      </div>
    </figure>
  );
}
