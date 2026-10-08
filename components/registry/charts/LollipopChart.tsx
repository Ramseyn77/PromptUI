/**
 * @registry
 * name: Lollipop Chart
 * category: Charts
 * style: Editorial
 * tags: recent
 * description: Classement en sucettes des fonctionnalités les plus utilisées, triable et animé à l'apparition.
 * prompt: Create a horizontal lollipop chart ranking feature adoption (7 features, %): thin stems with round heads, value labels at the end, a sort toggle (By value / A–Z) that re-orders rows with a transform transition, stems grow in on mount. Editorial serif title. sr-only table. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const data = [['Search', 84], ['Dashboards', 71], ['Exports', 38], ['Comments', 62], ['Automations', 45], ['API', 27], ['Templates', 55]] as const;

export function LollipopChart() {
  const [byValue, setByValue] = useState(true);
  const sorted = [...data].sort((a, b) => (byValue ? b[1] - a[1] : a[0].localeCompare(b[0])));

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-stem{from{transform:scaleX(0)}}`}</style>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-50">Feature adoption</h3>
        <button type="button" onClick={() => setByValue((value) => !value)} className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">{byValue ? 'Sort A–Z' : 'Sort by value'}</button>
      </div>
      <div className="relative mt-4" style={{ height: data.length * 32 }}>
        {data.map(([name, value]) => {
          const rank = sorted.findIndex((row) => row[0] === name);
          return (
            <div key={name} className="absolute inset-x-0 flex items-center gap-3 transition-transform duration-500" style={{ transform: `translateY(${rank * 32}px)` }}>
              <span className="w-24 shrink-0 text-right text-sm text-zinc-600 dark:text-zinc-400">{name}</span>
              <div className="relative h-6 flex-1">
                <span className="absolute left-0 top-1/2 h-0.5 origin-left -translate-y-1/2 bg-zinc-300 motion-safe:animate-[pui-stem_.8s_ease-out] dark:bg-zinc-700" style={{ width: `${value}%` }} />
                <span className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600 ring-4 ring-violet-500/15 dark:bg-violet-400" style={{ left: `${value}%` }} />
                <span className="absolute top-1/2 -translate-y-1/2 pl-3 text-xs font-semibold tabular-nums text-zinc-900 dark:text-zinc-100" style={{ left: `${value}%` }}>{value}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sr-only"><table><caption>Feature adoption (%)</caption><tbody>{sorted.map(([name, value]) => <tr key={name}><td>{name}</td><td>{value}</td></tr>)}</tbody></table></div>
    </section>
  );
}
