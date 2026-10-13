/**
 * @registry
 * name: Virtualized Table
 * category: Tables
 * style: Minimal
 * tags: featured, recent
 * description: Tableau virtualisé de 10 000 lignes : seules les lignes visibles sont rendues, en-tête collant, saut à une ligne et compteur de rendu.
 * prompt: Create a virtualized table of 10,000 generated log rows (deterministic data from the index): a fixed-height scroll container (data-lenis-prevent) with a sticky header grid, only the visible rows plus an overscan of 6 are rendered using absolute positioning inside a spacer of total height; a "Jump to row" number input scrolls to that row; a footer shows "Rendering 22 of 10,000 rows"; rows use role=row/cell with aria-rowcount and aria-rowindex. Light and dark mode.
 */
'use client';
import { useRef, useState } from 'react';

const total = 10000;
const rowHeight = 36;
const viewport = 288;
const overscan = 6;
const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
const services = ['api', 'auth', 'billing', 'worker', 'search'];
const row = (index: number) => ({ id: index + 1, level: levels[(index * 7) % 13 === 0 ? 2 : (index * 3) % 11 === 0 ? 1 : (index % 5 === 0 ? 3 : 0)], service: services[index % 5], ms: 12 + ((index * 37) % 480), time: `10:${String(Math.floor(index / 60) % 60).padStart(2, '0')}:${String(index % 60).padStart(2, '0')}` });
const tone: Record<string, string> = { INFO: 'text-sky-600 dark:text-sky-400', WARN: 'text-amber-600 dark:text-amber-400', ERROR: 'text-rose-600 dark:text-rose-400', DEBUG: 'text-zinc-400' };
const grid = 'grid grid-cols-[4.5rem_4.5rem_1fr_5rem_4rem] items-center gap-2 px-3';

export function VirtualizedTable() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [jump, setJump] = useState('');
  const start = Math.max(0, Math.floor(top / rowHeight) - overscan);
  const end = Math.min(total, Math.ceil((top + viewport) / rowHeight) + overscan);
  const rows = Array.from({ length: end - start }, (_, offset) => row(start + offset));

  return (
    <div className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <form onSubmit={(event) => { event.preventDefault(); const target = Math.min(total, Math.max(1, Number(jump) || 1)); scrollRef.current?.scrollTo({ top: (target - 1) * rowHeight }); }} className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2 text-xs dark:border-zinc-800">
        <span className="font-semibold text-zinc-950 dark:text-white">Logs</span>
        <label className="ml-auto flex items-center gap-1.5 text-zinc-500">Jump to row<input type="number" min={1} max={total} value={jump} onChange={(event) => setJump(event.target.value)} className="w-20 rounded-md border border-zinc-300 bg-transparent px-2 py-1 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100" /></label>
        <button type="submit" className="rounded-md bg-zinc-950 px-2 py-1 font-medium text-white dark:bg-white dark:text-zinc-950">Go</button>
      </form>
      <div role="table" aria-label="Logs" aria-rowcount={total + 1} className="text-xs">
        <div role="rowgroup"><div role="row" aria-rowindex={1} className={`${grid} h-8 border-b border-zinc-200 font-medium text-zinc-500 dark:border-zinc-800`}>{['#', 'Time', 'Service', 'Level', 'ms'].map((label) => <span key={label} role="columnheader">{label}</span>)}</div></div>
        <div ref={scrollRef} role="rowgroup" onScroll={(event) => setTop(event.currentTarget.scrollTop)} className="relative overflow-y-auto" style={{ height: viewport }} data-lenis-prevent>
          <div style={{ height: total * rowHeight }} />
          {rows.map((item) => (
            <div key={item.id} role="row" aria-rowindex={item.id + 1} className={`${grid} absolute inset-x-0 border-b border-zinc-100 font-mono dark:border-zinc-900 ${item.id % 2 ? '' : 'bg-zinc-50/60 dark:bg-zinc-900/40'}`} style={{ top: (item.id - 1) * rowHeight, height: rowHeight }}>
              <span role="cell" className="tabular-nums text-zinc-400">{item.id.toLocaleString('en-US')}</span>
              <span role="cell" className="tabular-nums text-zinc-600 dark:text-zinc-400">{item.time}</span>
              <span role="cell" className="text-zinc-900 dark:text-zinc-100">{item.service}</span>
              <span role="cell" className={`font-semibold ${tone[item.level]}`}>{item.level}</span>
              <span role="cell" className="text-right tabular-nums text-zinc-600 dark:text-zinc-400">{item.ms}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="border-t border-zinc-200 px-3 py-2 text-[11px] text-zinc-500 dark:border-zinc-800">Rendering {rows.length} of {total.toLocaleString('en-US')} rows</p>
    </div>
  );
}
