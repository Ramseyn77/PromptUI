/**
 * @registry
 * name: Marimekko Chart
 * category: Charts
 * style: SaaS
 * tags: recent
 * description: Graphique Marimekko : largeur des colonnes = taille du marché par région, hauteur des segments = part de chaque acteur, focus au survol.
 * prompt: Create a Marimekko (mosaic) chart of market share: columns for four regions whose widths are proportional to market size and whose stacked segments show each vendor's share (You, Competitor A, Competitor B, Others); segments are focusable with a tooltip line showing region, vendor, share and value; hovering a vendor in the legend highlights it across all columns; region labels and sizes under columns; an accessible data table in a details element. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const vendors = [['You', '#6366f1'], ['Competitor A', '#f59e0b'], ['Competitor B', '#10b981'], ['Others', '#a1a1aa']] as const;
const regions = [['Europe', 420, [34, 28, 18, 20]], ['Americas', 610, [22, 38, 24, 16]], ['Africa', 180, [46, 14, 12, 28]], ['APAC', 290, [18, 26, 30, 26]]] as const;
const total = regions.reduce((sum, [, size]) => sum + size, 0);

export function MarimekkoChart() {
  const [vendor, setVendor] = useState<number | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  let x = 0;

  return (
    <figure className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <figcaption className="font-semibold text-zinc-950 dark:text-white">Market share by region <span className="font-normal text-zinc-500">($M)</span></figcaption>
      <p aria-live="polite" className="mt-1 h-5 text-xs text-zinc-500">{focus ?? 'Hover or focus a segment'}</p>
      <svg viewBox="0 0 400 220" className="mt-2 w-full" role="group" aria-label="Marimekko chart">
        {regions.map(([region, size, shares]) => {
          const width = (size / total) * 396;
          const left = x;
          x += width + (4 / regions.length);
          let y = 0;
          return (
            <g key={region}>
              {shares.map((share, index) => {
                const height = (share / 100) * 190;
                const top = y;
                y += height;
                const label = `${region} · ${vendors[index][0]} · ${share}% · $${Math.round((share / 100) * size)}M`;
                return <rect key={index} x={left.toFixed(1)} y={top.toFixed(1)} width={Math.max(0, width - 2).toFixed(1)} height={Math.max(0, height - 2).toFixed(1)} rx="3" fill={vendors[index][1]} tabIndex={0} aria-label={label} onMouseEnter={() => setFocus(label)} onFocus={() => setFocus(label)} className={`cursor-pointer outline-none transition-opacity focus-visible:stroke-zinc-950 focus-visible:stroke-2 dark:focus-visible:stroke-white ${vendor !== null && vendor !== index ? 'opacity-25' : ''}`} />;
              })}
              <text x={(left + width / 2).toFixed(1)} y="206" textAnchor="middle" className="fill-zinc-700 text-[10px] font-medium dark:fill-zinc-300">{region}</text>
              <text x={(left + width / 2).toFixed(1)} y="218" textAnchor="middle" className="fill-zinc-400 text-[9px]">${size}M</text>
            </g>
          );
        })}
      </svg>
      <ul className="mt-3 flex flex-wrap gap-3 text-xs">{vendors.map(([name, color], index) => <li key={name}><button type="button" onMouseEnter={() => setVendor(index)} onMouseLeave={() => setVendor(null)} onFocus={() => setVendor(index)} onBlur={() => setVendor(null)} className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400"><span className="size-2.5 rounded-sm" style={{ background: color }} />{name}</button></li>)}</ul>
      <details className="mt-3 text-xs text-zinc-500"><summary className="cursor-pointer">Data table</summary><div><table className="mt-2 w-full"><thead><tr><th className="text-left">Region</th>{vendors.map(([name]) => <th key={name} className="text-right">{name}</th>)}</tr></thead><tbody>{regions.map(([region, , shares]) => <tr key={region}><td>{region}</td>{shares.map((share, index) => <td key={index} className="text-right tabular-nums">{share}%</td>)}</tr>)}</tbody></table></div></details>
    </figure>
  );
}
