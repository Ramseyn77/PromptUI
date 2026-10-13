/**
 * @registry
 * name: Market Watch Table
 * category: Tables
 * style: Dark
 * tags: featured, recent
 * description: Tableau de cotations en direct : prix qui clignotent vert/rouge à chaque mise à jour, variation 24 h, mini sparkline, favoris et tri.
 * prompt: Create a dark market watch table: rows of 6 assets (symbol, name, price, 24h change %, a 20-point SVG sparkline, volume) where prices tick on an interval after mount with deterministic pseudo-random steps and the price cell flashes green or red briefly on change; a star toggle per row (aria-pressed) and a "Watchlist only" filter; sortable columns by price and change with aria-sort; horizontal scroll on small screens; no live region spam (the table is not announced on every tick). Dark in both themes.
 */
'use client';
import { ArrowDown, ArrowUp, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const assets = [['NOVA', 'Nova Energy', 182.4], ['KORA', 'Kora Bank', 54.12], ['VELA', 'Vela Robotics', 312.9], ['LUMN', 'Lumen Health', 27.33], ['ATLS', 'Atlas Freight', 96.75], ['ORBT', 'Orbit Media', 141.08]] as const;
const step = (seed: number) => (((seed * 9301 + 49297) % 233280) / 233280 - 0.5) * 0.012;

export function MarketWatchTable() {
  const [tick, setTick] = useState(0);
  const [history, setHistory] = useState(() => assets.map(([, , price], index) => Array.from({ length: 20 }, (_, point) => price * (1 + step(index * 31 + point) * point * 0.4))));
  const [stars, setStars] = useState<string[]>(['KORA']);
  const [only, setOnly] = useState(false);
  const [sort, setSort] = useState<{ key: 'price' | 'change'; dir: 1 | -1 } | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => { setTick((value) => value + 1); setHistory((list) => list.map((series, index) => { const last = series[series.length - 1]; return [...series.slice(1), last * (1 + step(index * 17 + series.length + Date.now() % 97))]; })); }, 1500);
    return () => window.clearInterval(timer);
  }, []);

  const rows = assets.map(([symbol, name], index) => { const series = history[index]; const price = series[series.length - 1]; const prev = series[series.length - 2]; return { symbol, name, series, price, up: price >= prev, change: ((price - series[0]) / series[0]) * 100, volume: `${(1.2 + index * 0.7).toFixed(1)}M` }; })
    .filter((row) => !only || stars.includes(row.symbol))
    .sort((a, b) => (sort ? (a[sort.key] - b[sort.key]) * sort.dir : 0));
  const header = (key: 'price' | 'change', label: string) => <th aria-sort={sort?.key === key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'} className="px-3 text-right font-medium"><button type="button" onClick={() => setSort({ key, dir: sort?.key === key && sort.dir === -1 ? 1 : -1 })} className="inline-flex items-center gap-1 hover:text-white">{label}{sort?.key === key && (sort.dir === 1 ? <ArrowUp aria-hidden className="size-3" /> : <ArrowDown aria-hidden className="size-3" />)}</button></th>;

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-zinc-950 text-zinc-300 ring-1 ring-white/10">
      <style>{`@keyframes pui-flash-up { from { background: rgba(16,185,129,.35) } } @keyframes pui-flash-down { from { background: rgba(244,63,94,.35) } }`}</style>
      <div className="flex items-center justify-between px-4 py-3"><h3 className="text-sm font-semibold text-white">Markets</h3><label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={only} onChange={(event) => setOnly(event.target.checked)} className="accent-amber-400" />Watchlist only</label></div>
      <div className="overflow-x-auto" data-lenis-prevent>
        <table className="w-full min-w-[34rem] text-sm">
          <thead className="text-left text-xs text-zinc-500"><tr className="border-y border-white/10"><th className="w-10 px-3 py-2"><span className="sr-only">Watch</span></th><th className="font-medium">Asset</th>{header('price', 'Price')}{header('change', '24h')}<th className="font-medium"><span className="sr-only">Trend</span></th><th className="px-3 text-right font-medium">Volume</th></tr></thead>
          <tbody>
            {rows.map((row) => {
              const min = Math.min(...row.series); const max = Math.max(...row.series);
              const points = row.series.map((value, index) => `${(index * 5).toFixed(1)},${(22 - ((value - min) / (max - min || 1)) * 20).toFixed(1)}`).join(' ');
              return (
                <tr key={row.symbol} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-3"><button type="button" aria-pressed={stars.includes(row.symbol)} aria-label={`Watch ${row.name}`} onClick={() => setStars(stars.includes(row.symbol) ? stars.filter((item) => item !== row.symbol) : [...stars, row.symbol])}><Star aria-hidden className={`size-4 ${stars.includes(row.symbol) ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'}`} /></button></td>
                  <td className="py-2.5"><p className="font-mono text-sm font-semibold text-white">{row.symbol}</p><p className="text-[11px] text-zinc-500">{row.name}</p></td>
                  <td className="px-3 text-right"><span key={tick} className="rounded px-1 font-mono tabular-nums text-white" style={{ animation: `${row.up ? 'pui-flash-up' : 'pui-flash-down'} .8s ease-out` }}>{row.price.toFixed(2)}</span></td>
                  <td className={`px-3 text-right font-mono text-xs tabular-nums ${row.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{row.change >= 0 ? '+' : ''}{row.change.toFixed(2)}%</td>
                  <td className="w-28"><svg viewBox="0 0 95 24" className="h-6 w-24" aria-hidden><polyline points={points} fill="none" strokeWidth="1.5" className={row.change >= 0 ? 'stroke-emerald-400' : 'stroke-rose-400'} /></svg></td>
                  <td className="px-3 text-right text-xs tabular-nums text-zinc-400">{row.volume}</td>
                </tr>
              );
            })}
            {!rows.length && <tr><td colSpan={6} className="py-8 text-center text-sm text-zinc-500">Star an asset to build your watchlist.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
