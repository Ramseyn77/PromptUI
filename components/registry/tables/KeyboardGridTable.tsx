/**
 * @registry
 * name: Keyboard Grid Table
 * category: Tables
 * style: SaaS
 * tags: recent
 * description: Grille de données navigable au clavier comme un tableur : flèches, Début/Fin, cellule active et édition à Entrée.
 * prompt: Create a spreadsheet-like data grid (role="grid") with roving focus: arrow keys move the active cell, Home/End jump within the row, Ctrl+Home to the first cell, Enter or F2 edits the cell inline (Enter commits, Escape cancels), active cell has a teal outline and its address (e.g. "B3") shows in a formula-bar style header with the value. Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

const columns = ['Product', 'Units', 'Price', 'Region'];

export function KeyboardGridTable() {
  const [data, setData] = useState([['Desk lamp', '42', '39', 'EU'], ['Notebook', '310', '6', 'US'], ['Mouse pad', '128', '12', 'EU'], ['Headset', '57', '89', 'AF']]);
  const [cell, setCell] = useState({ r: 0, c: 0 });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const refs = useRef<(HTMLTableCellElement | null)[][]>([]);
  const touched = useRef(false);

  useEffect(() => { if (touched.current && !editing) refs.current[cell.r]?.[cell.c]?.focus({ preventScroll: true }); }, [cell, editing]);

  function onKey(event: KeyboardEvent) {
    touched.current = true;
    if (editing) return;
    const { r, c } = cell;
    const moves: Record<string, () => { r: number; c: number }> = {
      ArrowUp: () => ({ r: Math.max(0, r - 1), c }), ArrowDown: () => ({ r: Math.min(data.length - 1, r + 1), c }),
      ArrowLeft: () => ({ r, c: Math.max(0, c - 1) }), ArrowRight: () => ({ r, c: Math.min(columns.length - 1, c + 1) }),
      Home: () => (event.ctrlKey ? { r: 0, c: 0 } : { r, c: 0 }), End: () => ({ r, c: columns.length - 1 }),
    };
    if (moves[event.key]) { event.preventDefault(); setCell(moves[event.key]()); }
    if (event.key === 'Enter' || event.key === 'F2') { event.preventDefault(); setDraft(data[r][c]); setEditing(true); }
  }

  const commit = () => { setData((rows) => rows.map((row, ri) => (ri === cell.r ? row.map((value, ci) => (ci === cell.c ? draft : value)) : row))); setEditing(false); };

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-1.5 font-mono text-xs dark:border-zinc-800 dark:bg-zinc-900">
        <span className="rounded bg-white px-1.5 py-0.5 font-semibold text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700">{String.fromCharCode(65 + cell.c)}{cell.r + 1}</span>
        <span className="text-zinc-400">fx</span><span className="truncate text-zinc-700 dark:text-zinc-300">{data[cell.r][cell.c]}</span>
      </div>
      <table role="grid" aria-label="Inventory" onKeyDown={onKey} className="w-full border-collapse text-sm">
        <thead><tr><th className="w-8 bg-zinc-50 dark:bg-zinc-900" />{columns.map((column, ci) => <th key={column} scope="col" className={`border-l border-zinc-200 px-2 py-1 text-left text-xs font-medium dark:border-zinc-800 ${ci === cell.c ? 'bg-teal-50 text-teal-800 dark:bg-teal-400/10 dark:text-teal-200' : 'bg-zinc-50 text-zinc-500 dark:bg-zinc-900'}`}>{column}</th>)}</tr></thead>
        <tbody>
          {data.map((row, r) => (
            <tr key={r} className="border-t border-zinc-200 dark:border-zinc-800">
              <th scope="row" className={`text-center text-xs font-normal ${r === cell.r ? 'bg-teal-50 text-teal-800 dark:bg-teal-400/10 dark:text-teal-200' : 'bg-zinc-50 text-zinc-400 dark:bg-zinc-900'}`}>{r + 1}</th>
              {row.map((value, c) => {
                const active = r === cell.r && c === cell.c;
                return (
                  <td key={c} ref={(node) => { (refs.current[r] ??= [])[c] = node; }} role="gridcell" tabIndex={active ? 0 : -1} aria-selected={active} onClick={() => { touched.current = true; setCell({ r, c }); setEditing(false); }} onDoubleClick={() => { setCell({ r, c }); setDraft(value); setEditing(true); }} className={`border-l border-zinc-200 px-2 py-1.5 outline-none dark:border-zinc-800 ${c > 0 && c < 3 ? 'text-right tabular-nums' : ''} ${active ? 'shadow-[inset_0_0_0_2px_#14b8a6]' : ''} text-zinc-800 dark:text-zinc-200`}>
                    {active && editing ? <input autoFocus aria-label={`Edit ${columns[c]}`} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') commit(); if (event.key === 'Escape') setEditing(false); }} onBlur={commit} className="w-full bg-transparent outline-none" /> : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-zinc-200 px-3 py-1.5 text-[11px] text-zinc-500 dark:border-zinc-800">Click a cell, then use arrow keys · Enter to edit</p>
    </div>
  );
}
