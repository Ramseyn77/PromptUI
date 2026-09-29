/**
 * @registry
 * name: Paginated Table
 * category: Tables
 * style: Minimal
 * tags: recent
 * description: Tableau pagine avec resume « 1-5 sur 23 », numeros de page et boutons precedent suivant.
 * prompt: Create a paginated table (5 rows per page from a 23-item dataset): footer with "Showing 1–5 of 23", previous/next buttons disabled at the ends, and numbered page buttons with aria-current on the active page (numbers hidden below sm). Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const data = Array.from({ length: 23 }, (_, index) => ({ id: `INV-${1040 + index}`, amount: 120 + ((index * 37) % 480), date: `Sep ${String((index % 28) + 1).padStart(2, '0')}` }));
const perPage = 5;

export function PaginatedTable() {
  const [page, setPage] = useState(1);
  const pages = Math.ceil(data.length / perPage);
  const rows = data.slice((page - 1) * perPage, page * perPage);
  const pageButton = 'grid size-8 place-items-center rounded-lg text-sm transition';

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-xs text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400"><tr><th className="px-4 py-2.5 font-medium">Invoice</th><th className="px-4 py-2.5 font-medium">Date</th><th className="px-4 py-2.5 text-right font-medium">Amount</th></tr></thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {rows.map((row) => <tr key={row.id}><td className="px-4 py-3 font-mono text-xs text-zinc-900 dark:text-white">{row.id}</td><td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.date}</td><td className="px-4 py-3 text-right tabular-nums text-zinc-900 dark:text-white">${row.amount}.00</td></tr>)}
        </tbody>
      </table>
      <nav aria-label="Pagination" className="flex items-center justify-between gap-2 border-t border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, data.length)} of {data.length}</p>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => setPage(page - 1)} className={`${pageButton} text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-300 dark:hover:bg-zinc-900`}><ChevronLeft className="size-4" /></button>
          {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
            <button key={number} type="button" aria-current={page === number ? 'page' : undefined} onClick={() => setPage(number)} className={`${pageButton} hidden sm:grid ${page === number ? 'bg-zinc-950 font-semibold text-white dark:bg-white dark:text-zinc-950' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'}`}>{number}</button>
          ))}
          <button type="button" aria-label="Next page" disabled={page === pages} onClick={() => setPage(page + 1)} className={`${pageButton} text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-300 dark:hover:bg-zinc-900`}><ChevronRight className="size-4" /></button>
        </div>
      </nav>
    </div>
  );
}
