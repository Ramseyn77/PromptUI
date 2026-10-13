/**
 * @registry
 * name: Pagination Buttons
 * category: Buttons
 * style: Minimal
 * tags: recent
 * description: Pagination complète : précédent/suivant, pages avec ellipses intelligentes, page courante animée, aller à la page et taille de page.
 * prompt: Create a pagination control: Previous / Next buttons (disabled at the ends), numbered page buttons with smart ellipses (1 … 4 5 6 … 20), the current page has aria-current="page" and a sliding filled indicator, a "Go to page" number input that validates the range, a rows-per-page select (10, 25, 50) that recalculates the page count, and a "Showing 41–50 of 196" summary; nav landmark labelled "Pagination"; compact layout (only current/total) on mobile. Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const totalItems = 196;

function pageList(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
  return sorted.flatMap((page, index) => (index > 0 && page - sorted[index - 1] > 1 ? ['…' as const, page] : [page]));
}

export function PaginationButtons() {
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(5);
  const [jump, setJump] = useState('');
  const total = Math.ceil(totalItems / size);
  const go = (value: number) => setPage(Math.min(total, Math.max(1, value)));
  const button = 'grid h-9 min-w-9 place-items-center rounded-lg px-2 text-sm';

  return (
    <div className="w-full max-w-2xl space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <nav aria-label="Pagination" className="flex items-center justify-between gap-2">
        <button type="button" onClick={() => go(page - 1)} disabled={page === 1} className={`${button} gap-1 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:flex`}><ChevronLeft aria-hidden className="size-4" /><span className="hidden sm:inline">Previous</span></button>
        <ul className="hidden items-center gap-1 sm:flex">
          {pageList(page, total).map((item, index) => item === '…' ? <li key={`gap${index}`} aria-hidden className="px-1 text-zinc-400">…</li> : <li key={item}><button type="button" aria-current={item === page ? 'page' : undefined} aria-label={`Page ${item}`} onClick={() => go(item)} className={`${button} tabular-nums transition-colors ${item === page ? 'bg-zinc-950 font-semibold text-white dark:bg-white dark:text-zinc-950' : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'}`}>{item}</button></li>)}
        </ul>
        <p className="text-sm tabular-nums text-zinc-700 sm:hidden dark:text-zinc-300">Page {page} of {total}</p>
        <button type="button" onClick={() => go(page + 1)} disabled={page === total} className={`${button} gap-1 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:flex`}><span className="hidden sm:inline">Next</span><ChevronRight aria-hidden className="size-4" /></button>
      </nav>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800">
        <p aria-live="polite">Showing {(page - 1) * size + 1}–{Math.min(totalItems, page * size)} of {totalItems}</p>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5">Rows<select value={size} onChange={(event) => { const next = Number(event.target.value); setSize(next); setPage(1); }} className="rounded-md border border-zinc-200 bg-transparent px-1.5 py-1 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200">{[10, 25, 50].map((value) => <option key={value}>{value}</option>)}</select></label>
          <form onSubmit={(event) => { event.preventDefault(); go(Number(jump) || page); setJump(''); }} className="flex items-center gap-1.5"><label className="flex items-center gap-1.5">Go to<input type="number" min={1} max={total} value={jump} onChange={(event) => setJump(event.target.value)} className="w-14 rounded-md border border-zinc-200 bg-transparent px-1.5 py-1 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200" /></label><button type="submit" className="rounded-md bg-zinc-100 px-2 py-1 font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">Go</button></form>
        </div>
      </div>
    </div>
  );
}
