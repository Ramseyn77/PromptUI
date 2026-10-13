/**
 * @registry
 * name: Bump Chart
 * category: Charts
 * style: Dark
 * tags: featured, recent
 * description: Graphique de classement (bump chart) : évolution du rang de six frameworks sur six ans, courbes lissées et surlignage au survol.
 * prompt: Create a dark bump chart of framework popularity rankings over 6 years: each series is a smooth curve through its rank positions (rank 1 at top) with dots at each year and the name label at the end; colors per series; hovering or focusing a legend item highlights its line and dims the rest; year labels along the bottom and rank numbers on the left; an sr-only summary states the latest ranking. Dark in both themes.
 */
'use client';
import { useState } from 'react';

const years = [2021, 2022, 2023, 2024, 2025, 2026];
const series = [
  ['React', '#38bdf8', [1, 1, 1, 1, 1, 1]], ['Vue', '#34d399', [2, 2, 3, 3, 4, 4]], ['Angular', '#f87171', [3, 4, 4, 5, 5, 6]],
  ['Svelte', '#fb923c', [5, 3, 2, 2, 3, 3]], ['Solid', '#a78bfa', [6, 6, 6, 4, 6, 5]], ['Astro', '#f472b6', [4, 5, 5, 6, 2, 2]],
] as const;
const x = (index: number) => 40 + index * 64;
const y = (rank: number) => 20 + (rank - 1) * 34;

function curve(ranks: readonly number[]) {
  return ranks.map((rank, index) => {
    if (index === 0) return `M${x(0)},${y(rank)}`;
    const midX = (x(index - 1) + x(index)) / 2;
    return `C${midX},${y(ranks[index - 1])} ${midX},${y(rank)} ${x(index)},${y(rank)}`;
  }).join(' ');
}

export function BumpChart() {
  const [active, setActive] = useState<string | null>(null);
  const latest = [...series].sort((a, b) => a[2][5] - b[2][5]).map(([name]) => name);

  return (
    <figure className="w-full max-w-xl rounded-2xl bg-zinc-950 p-5 text-white ring-1 ring-white/10">
      <figcaption className="font-semibold">Framework ranking <span className="font-normal text-zinc-500">· developer survey</span></figcaption>
      <p className="sr-only">2026 ranking: {latest.join(', ')}.</p>
      <svg viewBox="0 0 420 230" className="mt-4 w-full" aria-hidden>
        {[1, 2, 3, 4, 5, 6].map((rank) => <text key={rank} x="14" y={y(rank) + 3} className="fill-zinc-600 text-[10px]">#{rank}</text>)}
        {years.map((year, index) => <text key={year} x={x(index)} y="222" textAnchor="middle" className="fill-zinc-500 text-[10px]">{year}</text>)}
        {series.map(([name, color, ranks]) => {
          const dim = active !== null && active !== name;
          return (
            <g key={name} className="transition-opacity duration-300" opacity={dim ? 0.12 : 1}>
              <path d={curve(ranks)} fill="none" stroke={color} strokeWidth={active === name ? 5 : 3} strokeLinecap="round" />
              {ranks.map((rank, index) => <circle key={index} cx={x(index)} cy={y(rank)} r="5" fill="#09090b" stroke={color} strokeWidth="2.5" />)}
              <text x={x(5) + 10} y={y(ranks[5]) + 4} fill={color} className="text-[10px] font-semibold">{name}</text>
            </g>
          );
        })}
      </svg>
      <ul className="mt-2 flex flex-wrap gap-2">{series.map(([name, color]) => <li key={name}><button type="button" aria-pressed={active === name} onMouseEnter={() => setActive(name)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(name)} onBlur={() => setActive(null)} className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-300 hover:bg-white/10"><span className="size-2 rounded-full" style={{ background: color }} />{name}</button></li>)}</ul>
    </figure>
  );
}
