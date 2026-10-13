/**
 * @registry
 * name: Bulk Actions Table
 * category: Tables
 * style: Dark
 * tags: recent
 * description: Tableau avec sélection multiple (Shift pour une plage) et barre d'actions flottante : changer le statut, assigner, exporter, supprimer.
 * prompt: Create a dark table with bulk actions: a header checkbox (indeterminate when partial) and row checkboxes; Shift+click selects a range; when rows are selected a floating action bar slides up at the bottom of the table with "3 selected", a status select that applies to all selected rows, Assign, Export and Delete (with an undo toast); Escape clears the selection; selected rows are tinted; aria-live announces the count. Dark in both themes.
 */
'use client';
import { Download, Trash2, UserPlus, X } from 'lucide-react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';

const initial = [
  { id: 1, title: 'Fix login redirect loop', status: 'Todo', owner: 'AD' }, { id: 2, title: 'Add CSV export', status: 'In progress', owner: 'LM' }, { id: 3, title: 'Update pricing copy', status: 'Todo', owner: 'MT' },
  { id: 4, title: 'Audit log retention', status: 'Done', owner: 'KM' }, { id: 5, title: 'Dark mode for emails', status: 'Todo', owner: 'AD' }, { id: 6, title: 'Rate limit webhooks', status: 'In progress', owner: 'IR' },
];
const tone: Record<string, string> = { Todo: 'bg-white/10 text-zinc-300', 'In progress': 'bg-sky-400/15 text-sky-300', Done: 'bg-emerald-400/15 text-emerald-300' };

export function BulkActionsTable() {
  const [rows, setRows] = useState(initial);
  const [selected, setSelected] = useState<number[]>([2, 3]);
  const [deleted, setDeleted] = useState<typeof initial | null>(null);
  const last = useRef<number | null>(null);
  const allRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (allRef.current) allRef.current.indeterminate = selected.length > 0 && selected.length < rows.length; }, [selected, rows]);

  function toggle(id: number, event: MouseEvent) {
    if (event.shiftKey && last.current !== null) {
      const ids = rows.map((row) => row.id);
      const [a, b] = [ids.indexOf(last.current), ids.indexOf(id)].sort((x, y) => x - y);
      setSelected((list) => [...new Set([...list, ...ids.slice(a, b + 1)])]);
    } else setSelected((list) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]));
    last.current = id;
  }

  return (
    <div className="relative w-full max-w-xl overflow-hidden rounded-xl bg-zinc-950 pb-16 text-zinc-300 ring-1 ring-white/10" onKeyDown={(event) => { if (event.key === 'Escape') setSelected([]); }}>
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-zinc-500"><tr className="border-b border-white/10"><th className="w-10 px-3 py-2.5"><input ref={allRef} type="checkbox" aria-label="Select all" checked={rows.length > 0 && selected.length === rows.length} onChange={(event) => setSelected(event.target.checked ? rows.map((row) => row.id) : [])} className="accent-indigo-400" /></th><th className="font-medium">Issue</th><th className="font-medium">Status</th><th className="px-3 font-medium">Owner</th></tr></thead>
        <tbody>
          {rows.map((row) => {
            const on = selected.includes(row.id);
            return (
              <tr key={row.id} className={`border-b border-white/5 ${on ? 'bg-indigo-500/10' : 'hover:bg-white/5'}`}>
                <td className="px-3 py-2.5"><input type="checkbox" aria-label={`Select ${row.title}`} checked={on} onClick={(event) => toggle(row.id, event)} onChange={() => {}} className="accent-indigo-400" /></td>
                <td className="text-white">{row.title}</td>
                <td><span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tone[row.status]}`}>{row.status}</span></td>
                <td className="px-3"><span className="grid size-6 place-items-center rounded-full bg-white/10 text-[10px] font-bold">{row.owner}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="px-3 pt-2 text-[11px] text-zinc-500">Tip: Shift+click to select a range.</p>
      <div aria-live="polite" className={`absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-white p-2 text-zinc-900 shadow-2xl transition-transform duration-300 ${selected.length ? 'translate-y-0' : 'pointer-events-none translate-y-24'}`}>
        <button type="button" aria-label="Clear selection" tabIndex={selected.length ? 0 : -1} onClick={() => setSelected([])} className="grid size-7 place-items-center rounded-md hover:bg-zinc-100"><X aria-hidden className="size-4" /></button>
        <span className="text-sm font-semibold">{selected.length} selected</span>
        <select aria-label="Set status" tabIndex={selected.length ? 0 : -1} value="" onChange={(event) => setRows((list) => list.map((row) => (selected.includes(row.id) ? { ...row, status: event.target.value } : row)))} className="ml-auto rounded-md border border-zinc-200 px-2 py-1 text-xs"><option value="" disabled>Status…</option><option>Todo</option><option>In progress</option><option>Done</option></select>
        {[[UserPlus, 'Assign'], [Download, 'Export']].map(([Icon, label]) => { const I = Icon as typeof X; return <button key={label as string} type="button" tabIndex={selected.length ? 0 : -1} aria-label={label as string} className="grid size-8 place-items-center rounded-md hover:bg-zinc-100"><I aria-hidden className="size-4" /></button>; })}
        <button type="button" aria-label="Delete selected" tabIndex={selected.length ? 0 : -1} onClick={() => { setDeleted(rows); setRows((list) => list.filter((row) => !selected.includes(row.id))); setSelected([]); }} className="grid size-8 place-items-center rounded-md text-rose-600 hover:bg-rose-50"><Trash2 aria-hidden className="size-4" /></button>
      </div>
      {deleted && !selected.length && <div role="status" className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl bg-zinc-800 px-3 py-2 text-sm text-white">{deleted.length - rows.length} deleted<button type="button" onClick={() => { setRows(deleted); setDeleted(null); }} className="font-semibold text-indigo-300 underline">Undo</button></div>}
    </div>
  );
}
