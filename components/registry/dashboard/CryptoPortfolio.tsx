/**
 * @registry
 * name: Crypto Portfolio
 * category: Dashboard
 * style: Dark
 * tags: recent
 * description: Portefeuille d'actifs avec valeur totale, répartition en barre segmentée et lignes avec mini-courbes.
 * prompt: Create a portfolio widget on a dark panel: total balance with 24h change, a segmented allocation bar (BTC, ETH, SOL, USDC as generic colored token badges — no brand logos), and holding rows with amount, value, 24h change colored and a tiny SVG sparkline from deterministic data; a 1D/1W/1M segmented control changes the sparklines. Dark in both themes.
 */
'use client';
import { useState } from 'react';

const assets = [
  { symbol: 'BTC', amount: 0.42, value: 27140, change: 2.4, color: '#f59e0b', seed: 1 },
  { symbol: 'ETH', amount: 3.1, value: 9920, change: -1.2, color: '#818cf8', seed: 2 },
  { symbol: 'SOL', amount: 48, value: 6720, change: 6.8, color: '#2dd4bf', seed: 3 },
  { symbol: 'USDC', amount: 2400, value: 2400, change: 0, color: '#a1a1aa', seed: 4 },
];
const ranges = { '1D': 1, '1W': 2.5, '1M': 5 } as const;
type Range = keyof typeof ranges;

export function CryptoPortfolio() {
  const [range, setRange] = useState<Range>('1W');
  const total = assets.reduce((sum, asset) => sum + asset.value, 0);
  const spark = (seed: number, trend: number) => Array.from({ length: 16 }, (_, i) => `${i * 4},${(14 - Math.sin(i * 0.9 + seed) * ranges[range] * 1.6 - (trend * i) / 6).toFixed(1)}`).join(' ');

  return (
    <section className="w-full max-w-md rounded-2xl bg-zinc-950 p-5 text-white ring-1 ring-white/10">
      <div className="flex items-start justify-between">
        <div><p className="text-xs text-zinc-400">Total balance</p><p className="text-3xl font-bold tabular-nums">${total.toLocaleString('en-US')}</p><p className="text-xs text-emerald-400">+$1,284 (2.8%) today</p></div>
        <div role="radiogroup" aria-label="Range" className="flex rounded-lg bg-white/5 p-0.5">{(Object.keys(ranges) as Range[]).map((name) => <button key={name} type="button" role="radio" aria-checked={range === name} onClick={() => setRange(name)} className={`rounded-md px-2 py-0.5 text-xs ${range === name ? 'bg-white/15 text-white' : 'text-zinc-400'}`}>{name}</button>)}</div>
      </div>
      <div className="mt-4 flex h-2 overflow-hidden rounded-full">{assets.map((asset) => <span key={asset.symbol} style={{ width: `${(asset.value / total) * 100}%`, background: asset.color }} />)}</div>
      <ul className="mt-4 divide-y divide-white/5">
        {assets.map((asset) => (
          <li key={asset.symbol} className="flex items-center gap-3 py-2.5">
            <span className="grid size-8 place-items-center rounded-full text-[10px] font-bold text-zinc-950" style={{ background: asset.color }}>{asset.symbol.slice(0, 3)}</span>
            <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{asset.symbol}</span><span className="text-xs text-zinc-500">{asset.amount.toLocaleString('en-US')}</span></span>
            <svg viewBox="0 0 60 28" aria-hidden className="h-7 w-16"><polyline points={spark(asset.seed, asset.change)} fill="none" stroke={asset.change > 0 ? '#34d399' : asset.change < 0 ? '#fb7185' : '#a1a1aa'} strokeWidth="1.5" /></svg>
            <span className="w-20 text-right"><span className="block text-sm tabular-nums">${asset.value.toLocaleString('en-US')}</span><span className={`text-xs tabular-nums ${asset.change > 0 ? 'text-emerald-400' : asset.change < 0 ? 'text-rose-400' : 'text-zinc-500'}`}>{asset.change > 0 ? '+' : ''}{asset.change}%</span></span>
          </li>
        ))}
      </ul>
    </section>
  );
}
