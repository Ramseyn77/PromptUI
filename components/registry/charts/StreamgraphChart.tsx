/**
 * @registry
 * name: Streamgraph Chart
 * category: Charts
 * style: Dark
 * tags: recent
 * description: Streamgraph de genres musicaux écoutés par mois : couches empilées autour d'un axe central, survol pour isoler une couche.
 * prompt: Create a dark streamgraph of listening time by music genre across 12 months: smooth stacked layers centered around a horizontal baseline (wiggle layout), vivid gradient palette; hovering or focusing a legend chip isolates its layer and shows its total; month labels along the bottom; data computed deterministically. Dark in both themes.
 */
'use client';
import { useState } from 'react';

const genres = [
  { name: 'Pop', color: '#f472b6', values: [8, 9, 10, 12, 11, 10, 12, 14, 13, 11, 10, 12] },
  { name: 'Hip-hop', color: '#a78bfa', values: [6, 7, 7, 8, 10, 12, 11, 9, 8, 9, 10, 9] },
  { name: 'Electronic', color: '#22d3ee', values: [4, 4, 5, 6, 8, 10, 13, 12, 9, 7, 5, 4] },
  { name: 'Jazz', color: '#fbbf24', values: [5, 5, 4, 3, 3, 2, 2, 3, 4, 5, 7, 8] },
  { name: 'Indie', color: '#34d399', values: [3, 4, 5, 5, 6, 6, 5, 5, 6, 7, 6, 5] },
];
const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

function smooth(points: number[][]) {
  return points.map(([px, py], index) => {
    if (index === 0) return `M${px},${py}`;
    const [qx, qy] = points[index - 1];
    const mid = (qx + px) / 2;
    return `C${mid},${qy} ${mid},${py} ${px},${py}`;
  }).join(' ');
}

export function StreamgraphChart() {
  const [active, setActive] = useState<string | null>(null);
  const x = (index: number) => index * (300 / 11);
  const totals = months.map((_, index) => genres.reduce((sum, genre) => sum + genre.values[index], 0));
  const layers = genres.map((genre, layer) => {
    const top: number[][] = [];
    const bottom: number[][] = [];
    months.forEach((_, index) => {
      const base = 80 - totals[index] * 1.6 + genres.slice(0, layer).reduce((sum, item) => sum + item.values[index], 0) * 3.2;
      top.push([x(index), base]);
      bottom.push([x(index), base + genre.values[index] * 3.2]);
    });
    const reversed = [...bottom].reverse();
    return { ...genre, d: `${smooth(top)} L${reversed[0][0]},${reversed[0][1]} ${smooth(reversed).slice(1)} Z`, total: genre.values.reduce((sum, value) => sum + value, 0) };
  });

  return (
    <figure className="w-full max-w-xl rounded-2xl bg-zinc-950 p-5 text-white ring-1 ring-white/10">
      <figcaption className="flex items-baseline justify-between"><span className="font-semibold">Listening by genre</span><span className="text-xs text-zinc-500">{active ? `${active}: ${layers.find((layer) => layer.name === active)?.total} h` : 'hours / month'}</span></figcaption>
      <svg viewBox="0 0 300 160" preserveAspectRatio="none" className="mt-4 h-44 w-full" aria-hidden>
        {layers.map((layer) => <path key={layer.name} d={layer.d} fill={layer.color} className="transition-opacity duration-300" opacity={active && active !== layer.name ? 0.12 : 0.9} />)}
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-zinc-500" aria-hidden>{months.map((month, index) => <span key={index}>{month}</span>)}</div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {layers.map((layer) => <li key={layer.name}><button type="button" onMouseEnter={() => setActive(layer.name)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(layer.name)} onBlur={() => setActive(null)} className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-300 hover:bg-white/10"><span className="size-2 rounded-full" style={{ background: layer.color }} />{layer.name} <span className="text-zinc-500">{layer.total}h</span></button></li>)}
      </ul>
    </figure>
  );
}
