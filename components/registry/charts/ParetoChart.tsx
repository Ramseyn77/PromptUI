/**
 * @registry
 * name: Pareto Chart
 * category: Charts
 * style: SaaS
 * tags: recent
 * description: Diagramme de Pareto : barres de causes triées et courbe cumulée avec seuil des 80 % mis en évidence.
 * prompt: Create a Pareto chart for support ticket causes: bars sorted descending with counts, a cumulative percentage line with dots on a right axis, a dashed 80% threshold line; bars contributing to the first 80% are highlighted and others muted; hovering or focusing a bar shows a tooltip with count and cumulative share; an accessible data table in a details element. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const data = [['Login issues', 142], ['Billing', 96], ['Slow sync', 61], ['Export bugs', 34], ['Notifications', 22], ['Other', 15]] as const;
const total = data.reduce((sum, [, value]) => sum + value, 0);

export function ParetoChart() {
  const [active, setActive] = useState<number | null>(null);
  let running = 0;
  const rows = data.map(([label, value]) => { running += value; return { label, value, cumulative: Math.round((running / total) * 100) }; });
  const max = data[0][1];
  const barX = (index: number) => 40 + index * 50;
  const cumY = (pct: number) => 170 - pct * 1.5;

  return (
    <figure className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <figcaption className="flex items-baseline justify-between"><span className="font-semibold text-zinc-900 dark:text-zinc-100">Ticket causes</span><span className="text-xs text-zinc-500">{total} tickets · 30 days</span></figcaption>
      <div className="relative mt-3">
        <svg viewBox="0 0 340 200" className="w-full" role="img" aria-label="Pareto chart: the top 3 causes account for 80% of tickets">
          {[0, 50, 100].map((pct) => <g key={pct}><line x1="34" x2="334" y1={cumY(pct)} y2={cumY(pct)} className="stroke-zinc-100 dark:stroke-zinc-800" /><text x="336" y={cumY(pct) + 3} className="fill-zinc-400 text-[9px]">{pct}%</text></g>)}
          <line x1="34" x2="334" y1={cumY(80)} y2={cumY(80)} strokeDasharray="4 3" className="stroke-rose-400" />
          <text x="36" y={cumY(80) - 3} className="fill-rose-500 text-[9px] font-semibold">80%</text>
          {rows.map((row, index) => {
            const height = (row.value / max) * 140;
            const vital = index === 0 || rows[index - 1].cumulative < 80;
            return (
              <g key={row.label} tabIndex={0} onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} className="outline-none">
                <rect x={barX(index)} y={170 - height} width="36" height={height} rx="4" className={`transition-opacity ${vital ? 'fill-indigo-500' : 'fill-zinc-300 dark:fill-zinc-700'} ${active !== null && active !== index ? 'opacity-50' : ''}`} />
                <text x={barX(index) + 18} y="184" textAnchor="middle" className="fill-zinc-500 text-[8px]">{row.label.split(' ')[0]}</text>
              </g>
            );
          })}
          <polyline points={rows.map((row, index) => `${barX(index) + 18},${cumY(row.cumulative)}`).join(' ')} fill="none" strokeWidth="2" className="stroke-amber-500" />
          {rows.map((row, index) => <circle key={row.label} cx={barX(index) + 18} cy={cumY(row.cumulative)} r={active === index ? 4.5 : 3} className="fill-white stroke-amber-500 dark:fill-zinc-950" strokeWidth="2" />)}
        </svg>
        {active !== null && <div role="status" className="pointer-events-none absolute top-0 rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs text-white shadow-lg dark:bg-white dark:text-zinc-900" style={{ left: `${((barX(active) + 18) / 340) * 100}%`, transform: 'translateX(-50%)' }}><strong>{rows[active].label}</strong> · {rows[active].value} · {rows[active].cumulative}% cumulative</div>}
      </div>
      <details className="mt-2 text-xs text-zinc-500"><summary className="cursor-pointer">Data table</summary><div><table className="mt-2 w-full"><tbody>{rows.map((row) => <tr key={row.label}><td>{row.label}</td><td className="text-right tabular-nums">{row.value}</td><td className="text-right tabular-nums">{row.cumulative}%</td></tr>)}</tbody></table></div></details>
    </figure>
  );
}
