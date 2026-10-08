/**
 * @registry
 * name: Live Price Table
 * category: Tables
 * style: Dark
 * tags: featured, recent
 * description: Tableau de cotations en direct : prix qui clignotent en vert ou rouge à chaque tick, variation et volume.
 * prompt: Create a live market table on a dark panel: ticker, name, last price, change %, volume; every 1.2s a random row ticks up or down and its price cell flashes emerald or rose briefly (key-based animation); a "Live" pulsing badge and a Pause button stop the feed; reduced motion disables the flashing; sort by change on header click (aria-sort). Dark in both themes.
 */
'use client';
import { useEffect, useState } from 'react';

const initial = [
  { ticker: 'SNTS', name: 'Sonatel', price: 25500, change: 1.2 },
  { ticker: 'ORAC', name: 'Orange CI', price: 15200, change: -0.4 },
  { ticker: 'SGBC', name: 'SG Bank CI', price: 18900, change: 0.8 },
  { ticker: 'ETIT', name: 'Ecobank TI', price: 18, change: -2.1 },
  { ticker: 'PALC', name: 'Palm CI', price: 7650, change: 3.5 },
];

export function LivePriceTable() {
  const [rows, setRows] = useState(initial.map((row) => ({ ...row, tick: 0, up: true })));
  const [paused, setPaused] = useState(false);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setRows((list) => {
        const index = Math.floor(Math.random() * list.length);
        return list.map((row, i) => {
          if (i !== index) return row;
          const delta = (Math.random() - 0.48) * row.price * 0.01;
          const price = Math.max(1, Math.round(row.price + delta));
          return { ...row, price, change: Math.round((row.change + (delta / row.price) * 100) * 100) / 100, tick: row.tick + 1, up: delta >= 0 };
        });
      });
    }, 1200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const shown = sorted ? [...rows].sort((a, b) => b.change - a.change) : rows;

  return (
    <section className="w-full max-w-lg rounded-2xl bg-zinc-950 p-4 text-white ring-1 ring-white/10">
      <style>{`@keyframes pui-flash-up{from{background:rgba(16,185,129,.35)}}@keyframes pui-flash-down{from{background:rgba(244,63,94,.35)}}`}</style>
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">BRVM · Top stocks</h3>
        <span className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${paused ? 'bg-white/10 text-zinc-400' : 'bg-rose-500/15 text-rose-300'}`}><span className={`size-1.5 rounded-full ${paused ? 'bg-zinc-500' : 'animate-pulse bg-rose-400'}`} />{paused ? 'Paused' : 'Live'}</span>
        <button type="button" onClick={() => setPaused((value) => !value)} className="rounded-md border border-white/15 px-2 py-0.5 text-xs text-zinc-300 hover:bg-white/5">{paused ? 'Resume' : 'Pause'}</button>
      </div>
      <div className="mt-3 overflow-x-auto" data-lenis-prevent>
        <table className="w-full min-w-[26rem] text-sm">
          <thead className="text-left text-xs text-zinc-500"><tr><th className="py-2 font-medium">Ticker</th><th className="text-right font-medium">Last (XOF)</th><th aria-sort={sorted ? 'descending' : 'none'} className="text-right font-medium"><button type="button" onClick={() => setSorted((value) => !value)} className="hover:text-white">Change {sorted ? '↓' : '↕'}</button></th></tr></thead>
          <tbody className="divide-y divide-white/5">
            {shown.map((row) => (
              <tr key={row.ticker}>
                <td className="py-2.5"><span className="block font-semibold">{row.ticker}</span><span className="text-xs text-zinc-500">{row.name}</span></td>
                <td className="text-right"><span key={row.tick} className="inline-block rounded px-1.5 font-mono tabular-nums" style={{ animation: row.tick ? `${row.up ? 'pui-flash-up' : 'pui-flash-down'} .9s ease-out` : 'none' }}>{row.price.toLocaleString('en-US')}</span></td>
                <td className={`text-right font-mono tabular-nums ${row.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{row.change >= 0 ? '+' : ''}{row.change.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
