/**
 * @registry
 * name: Slope Chart
 * category: Charts
 * style: Editorial
 * tags: recent
 * description: Graphique de pente avant/après qui relie deux années, hausses en vert et baisses en rouge.
 * prompt: Create an editorial slope chart comparing two years (2025 → 2026) for 6 channels: two vertical axes, a line per channel colored emerald if up and rose if down, labels with values on both ends; hovering a line thickens it and dims the others. Serif title with a one-line takeaway. sr-only table. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const data = [['Organic', 42, 51], ['Paid search', 35, 28], ['Referral', 18, 24], ['Social', 26, 19], ['Email', 12, 21], ['Direct', 30, 33]] as const;

export function SlopeChart() {
  const [hover, setHover] = useState<string | null>(null);
  const y = (value: number) => 190 - (value / 60) * 170;

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-50">Where signups come from</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">Email nearly doubled while paid search slipped.</p>
      <svg viewBox="0 0 320 210" aria-hidden className="mt-3 w-full" onMouseLeave={() => setHover(null)}>
        <line x1="95" x2="95" y1="10" y2="195" className="stroke-zinc-300 dark:stroke-zinc-700" />
        <line x1="225" x2="225" y1="10" y2="195" className="stroke-zinc-300 dark:stroke-zinc-700" />
        <text x="95" y="208" textAnchor="middle" className="fill-zinc-500 text-[10px] font-semibold">2025</text>
        <text x="225" y="208" textAnchor="middle" className="fill-zinc-500 text-[10px] font-semibold">2026</text>
        {data.map(([name, before, after]) => {
          const up = after >= before;
          const color = up ? '#10b981' : '#f43f5e';
          const dim = hover && hover !== name;
          return (
            <g key={name} onMouseEnter={() => setHover(name)} style={{ opacity: dim ? 0.2 : 1 }} className="transition-opacity">
              <line x1="95" x2="225" y1={y(before)} y2={y(after)} stroke={color} strokeWidth={hover === name ? 3.5 : 2} />
              <circle cx="95" cy={y(before)} r="3.5" fill={color} />
              <circle cx="225" cy={y(after)} r="3.5" fill={color} />
              <text x="88" y={y(before) + 3} textAnchor="end" className="fill-zinc-600 text-[9px] dark:fill-zinc-300">{name} {before}%</text>
              <text x="232" y={y(after) + 3} className="fill-zinc-600 text-[9px] dark:fill-zinc-300">{after}%</text>
              <line x1="95" x2="225" y1={y(before)} y2={y(after)} stroke="transparent" strokeWidth="12" />
            </g>
          );
        })}
      </svg>
      <div className="sr-only"><table><caption>Share of signups (%)</caption><tbody>{data.map(([name, before, after]) => <tr key={name}><td>{name}</td><td>{before}</td><td>{after}</td></tr>)}</tbody></table></div>
    </section>
  );
}
