/**
 * @registry
 * name: Editable Cell Table
 * category: Tables
 * style: Minimal
 * tags: recent
 * description: Tableau dont les cellules s'éditent sur place au clic, validation avec Entrée et annulation avec Échap.
 * prompt: Create a table with inline-editable cells: clicking (or pressing Enter on) a cell turns it into an input, Enter/blur saves, Escape cancels; edited cells flash briefly. A computed total column updates live. Light and dark mode.
 */
'use client';
import { useState, type KeyboardEvent } from 'react';

type Row = { id: number; product: string; qty: number; price: number };

export function EditableCellTable() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, product: 'Notebook', qty: 3, price: 12 },
    { id: 2, product: 'Pen set', qty: 5, price: 8 },
    { id: 3, product: 'Desk lamp', qty: 1, price: 49 },
  ]);
  const [editing, setEditing] = useState<{ id: number; key: 'qty' | 'price' } | null>(null);
  const [draft, setDraft] = useState('');
  const [flash, setFlash] = useState<string | null>(null);

  function start(id: number, key: 'qty' | 'price', value: number) { setEditing({ id, key }); setDraft(String(value)); }
  function save() {
    if (!editing) return;
    const value = Number(draft);
    if (!Number.isNaN(value) && value >= 0) {
      setRows((current) => current.map((row) => (row.id === editing.id ? { ...row, [editing.key]: value } : row)));
      setFlash(`${editing.id}-${editing.key}`);
      window.setTimeout(() => setFlash(null), 600);
    }
    setEditing(null);
  }
  function onKey(event: KeyboardEvent<HTMLInputElement>) { if (event.key === 'Enter') save(); if (event.key === 'Escape') setEditing(null); }

  const cell = (row: Row, key: 'qty' | 'price') => editing?.id === row.id && editing.key === key ? (
    <input autoFocus aria-label={`Edit ${key} for ${row.product}`} value={draft} onChange={(event) => setDraft(event.target.value)} onBlur={save} onKeyDown={onKey} inputMode="decimal" className="w-16 rounded-md border border-teal-500 bg-white px-2 py-1 text-right text-sm outline-none ring-4 ring-teal-500/15 dark:bg-zinc-900 dark:text-white" />
  ) : (
    <button type="button" onClick={() => start(row.id, key, row[key])} className={`rounded-md px-2 py-1 tabular-nums transition hover:bg-zinc-100 dark:hover:bg-zinc-800 ${flash === `${row.id}-${key}` ? 'bg-teal-500/20' : ''}`}>{key === 'price' ? `$${row[key]}` : row[key]}</button>
  );

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full text-sm">
        <thead className="border-b border-zinc-200 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"><tr><th className="px-4 py-3 text-left font-medium">Product</th><th className="px-2 py-3 text-right font-medium">Qty</th><th className="px-2 py-3 text-right font-medium">Price</th><th className="px-4 py-3 text-right font-medium">Total</th></tr></thead>
        <tbody className="divide-y divide-zinc-100 text-zinc-700 dark:divide-zinc-900 dark:text-zinc-300">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-4 py-2 font-medium text-zinc-900 dark:text-white">{row.product}</td>
              <td className="px-2 py-2 text-right">{cell(row, 'qty')}</td>
              <td className="px-2 py-2 text-right">{cell(row, 'price')}</td>
              <td className="px-4 py-2 text-right font-semibold tabular-nums text-zinc-900 dark:text-white">${row.qty * row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-zinc-200 px-4 py-2 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">Click a quantity or price to edit · Enter to save · Esc to cancel</p>
    </div>
  );
}
