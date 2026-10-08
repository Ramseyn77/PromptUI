/**
 * @registry
 * name: Column Toggle Table
 * category: Tables
 * style: SaaS
 * tags: featured, recent
 * description: Data table façon shadcn avec filtre, colonnes masquables, sélection de lignes, statuts et pagination.
 * prompt: Create a shadcn-style data table: an email filter input, a "Columns" dropdown (menuitemcheckbox per column) to hide/show columns, a header checkbox that selects the visible page (indeterminate state), status badges, right-aligned formatted amounts, a footer with "2 of 8 row(s) selected" and Previous/Next pagination (4 rows per page). Wraps in a horizontal scroll container on small screens. Light and dark mode.
 */
'use client';
import { ChevronDown, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const rows = [
  { id: 'm5gr84i9', status: 'success', email: 'ken99@example.com', amount: 316 },
  { id: '3u1reuv4', status: 'success', email: 'abe45@example.com', amount: 242 },
  { id: 'derv1ws0', status: 'processing', email: 'monserrat44@example.com', amount: 837 },
  { id: '5kma53ae', status: 'success', email: 'silas22@example.com', amount: 874 },
  { id: 'bhqecj4p', status: 'failed', email: 'carmella@example.com', amount: 721 },
  { id: 'p0r8xk2m', status: 'processing', email: 'awa.diallo@example.com', amount: 150 },
  { id: 'q9z1lm3n', status: 'success', email: 'tomas.r@example.com', amount: 1290 },
  { id: 'w2e4r6t8', status: 'failed', email: 'yuki@example.com', amount: 64 },
] as const;

const columns = ['status', 'email', 'amount'] as const;
const badge = { success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300', processing: 'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300', failed: 'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300' };

export function ColumnToggleTable() {
  const [filter, setFilter] = useState('');
  const [visible, setVisible] = useState<Record<(typeof columns)[number], boolean>>({ status: true, email: true, amount: true });
  const [selected, setSelected] = useState<Set<string>>(new Set(['3u1reuv4', 'derv1ws0']));
  const [menu, setMenu] = useState(false);
  const [page, setPage] = useState(0);
  const headerBox = useRef<HTMLInputElement>(null);

  const filtered = rows.filter((row) => row.email.includes(filter.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filtered.length / 4));
  const current = filtered.slice(page * 4, page * 4 + 4);
  const pageSelected = current.filter((row) => selected.has(row.id)).length;

  useEffect(() => { if (headerBox.current) headerBox.current.indeterminate = pageSelected > 0 && pageSelected < current.length; }, [pageSelected, current.length]);

  function toggleRow(id: string) {
    setSelected((value) => { const next = new Set(value); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  }

  function togglePage() {
    setSelected((value) => {
      const next = new Set(value);
      const all = pageSelected === current.length;
      current.forEach((row) => (all ? next.delete(row.id) : next.add(row.id)));
      return next;
    });
  }

  const box = 'size-4 rounded border-zinc-300 accent-teal-600 dark:border-zinc-600';

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-2">
        <input aria-label="Filter emails" value={filter} onChange={(event) => { setFilter(event.target.value); setPage(0); }} placeholder="Filter emails…" className="w-full max-w-xs rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
        <div className="relative ml-auto">
          <button type="button" aria-haspopup="menu" aria-expanded={menu} onClick={() => setMenu((value) => !value)} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900">Columns <ChevronDown aria-hidden className="size-4" /></button>
          {menu && (
            <div role="menu" className="absolute right-0 top-full z-20 mt-1 w-40 rounded-lg border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
              {columns.map((column) => (
                <button key={column} type="button" role="menuitemcheckbox" aria-checked={visible[column]} onClick={() => setVisible((value) => ({ ...value, [column]: !value[column] }))} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm capitalize text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800">
                  <span className="grid size-4 place-items-center">{visible[column] && <Check aria-hidden className="size-4" />}</span>{column}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full min-w-[30rem] text-sm">
          <thead className="bg-zinc-50 text-left text-xs font-medium text-zinc-500 dark:bg-zinc-900/60 dark:text-zinc-400">
            <tr>
              <th className="w-10 px-3 py-2.5"><input ref={headerBox} type="checkbox" aria-label="Select page" checked={current.length > 0 && pageSelected === current.length} onChange={togglePage} className={box} /></th>
              {visible.status && <th className="px-3 py-2.5 font-medium">Status</th>}
              {visible.email && <th className="px-3 py-2.5 font-medium">Email</th>}
              {visible.amount && <th className="px-3 py-2.5 text-right font-medium">Amount</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {current.map((row) => (
              <tr key={row.id} aria-selected={selected.has(row.id)} className={selected.has(row.id) ? 'bg-teal-50/60 dark:bg-teal-400/5' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/40'}>
                <td className="px-3 py-2.5"><input type="checkbox" aria-label={`Select ${row.email}`} checked={selected.has(row.id)} onChange={() => toggleRow(row.id)} className={box} /></td>
                {visible.status && <td className="px-3 py-2.5"><span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${badge[row.status]}`}>{row.status}</span></td>}
                {visible.email && <td className="px-3 py-2.5 text-zinc-800 dark:text-zinc-200">{row.email}</td>}
                {visible.amount && <td className="px-3 py-2.5 text-right font-medium tabular-nums text-zinc-900 dark:text-zinc-100">{row.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>}
              </tr>
            ))}
            {current.length === 0 && <tr><td colSpan={4} className="px-3 py-8 text-center text-zinc-500">No results.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span aria-live="polite">{selected.size} of {rows.length} row(s) selected.</span>
        <div className="flex gap-2">
          <button type="button" disabled={page === 0} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 font-medium text-zinc-800 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200">Previous</button>
          <button type="button" disabled={page >= pages - 1} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 font-medium text-zinc-800 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200">Next</button>
        </div>
      </div>
    </div>
  );
}
