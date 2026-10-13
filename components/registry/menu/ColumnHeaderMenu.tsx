/**
 * @registry
 * name: Column Header Menu
 * category: Menu
 * style: Minimal
 * tags: recent
 * description: Menu d'en-tête de colonne de tableau : trier croissant/décroissant, épingler, masquer, filtrer et renommer, appliqué à un mini tableau.
 * prompt: Create a table column header menu: a small table (Name, Plan, MRR) where each header has a chevron button opening an in-flow menu (the MRR menu is open by default) with menuitemradio sort options (Ascending, Descending, None), "Pin to left" checkbox item, "Hide column", a filter sub-section with a min value input, and "Rename…" which turns the header into an inline input; changes apply to the table live; arrow keys move focus within the menu and Escape closes it. Light and dark mode.
 */
'use client';
import { ArrowDown, ArrowUp, ChevronDown, EyeOff, Pencil, Pin } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

const data = [['Kora Bank', 'Enterprise', 4200], ['Atelier', 'Pro', 480], ['Northwind', 'Team', 1250], ['Lumen', 'Pro', 640], ['Shamba', 'Team', 980]] as const;

export function ColumnHeaderMenu() {
  const [columns, setColumns] = useState([{ key: 0, label: 'Name' }, { key: 1, label: 'Plan' }, { key: 2, label: 'MRR' }]);
  const [open, setOpen] = useState<number | null>(2);
  const [sort, setSort] = useState<{ key: number; dir: 'asc' | 'desc' } | null>({ key: 2, dir: 'desc' });
  const [pinned, setPinned] = useState<number | null>(null);
  const [hidden, setHidden] = useState<number[]>([]);
  const [min, setMin] = useState(0);
  const [renaming, setRenaming] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const visible = columns.filter((column) => !hidden.includes(column.key)).sort((a, b) => (a.key === pinned ? -1 : b.key === pinned ? 1 : 0));
  const rows = data.filter((row) => row[2] >= min).slice().sort((a, b) => { if (!sort) return 0; const x = a[sort.key]; const y = b[sort.key]; return (x > y ? 1 : x < y ? -1 : 0) * (sort.dir === 'asc' ? 1 : -1); });

  function onMenuKey(event: KeyboardEvent) {
    if (event.key === 'Escape') { setOpen(null); return; }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]') ?? []);
    const index = items.indexOf(document.activeElement as HTMLElement);
    items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus();
  }

  const item = 'flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm text-zinc-700 hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800';
  const current = columns.find((column) => column.key === open);

  return (
    <div className="w-full max-w-lg">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-zinc-200 bg-zinc-50 text-left text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
            {visible.map((column) => (
              <th key={column.key} aria-sort={sort?.key === column.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : undefined} className={`px-3 py-2 font-medium ${column.key === 2 ? 'text-right' : ''}`}>
                {renaming === column.key ? <input aria-label="Column name" defaultValue={column.label} onBlur={(event) => { const label = event.target.value.trim() || column.label; setColumns((list) => list.map((c) => (c.key === column.key ? { ...c, label } : c))); setRenaming(null); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === 'Escape') event.currentTarget.blur(); }} className="w-24 rounded border border-indigo-400 bg-white px-1 text-xs text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100" /> : (
                  <button type="button" aria-haspopup="menu" aria-expanded={open === column.key} onClick={() => setOpen(open === column.key ? null : column.key)} className="inline-flex items-center gap-1 rounded px-1 hover:bg-zinc-200/60 dark:hover:bg-zinc-800">
                    {column.key === pinned && <Pin aria-label="Pinned" className="size-3" />}{column.label}
                    {sort?.key === column.key && (sort.dir === 'asc' ? <ArrowUp aria-hidden className="size-3" /> : <ArrowDown aria-hidden className="size-3" />)}
                    <ChevronDown aria-hidden className="size-3 opacity-60" />
                  </button>
                )}
              </th>
            ))}
          </tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900">{visible.map((column) => <td key={column.key} className={`px-3 py-2 text-zinc-800 dark:text-zinc-200 ${column.key === 2 ? 'text-right tabular-nums' : ''}`}>{column.key === 2 ? `$${row[2].toLocaleString('en-US')}` : row[column.key]}</td>)}</tr>)}</tbody>
        </table>
      </div>
      {hidden.length > 0 && <button type="button" onClick={() => setHidden([])} className="mt-2 text-xs text-indigo-600 hover:underline dark:text-indigo-400">Show {hidden.length} hidden column</button>}
      {current && (
        <div ref={menuRef} role="menu" aria-label={`${current.label} column`} onKeyDown={onMenuKey} className="mt-2 w-60 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          {([['asc', 'Ascending', ArrowUp], ['desc', 'Descending', ArrowDown]] as const).map(([dir, label, Icon]) => <button key={dir} type="button" role="menuitemradio" aria-checked={sort?.key === current.key && sort.dir === dir} onClick={() => setSort({ key: current.key, dir })} className={item}><Icon aria-hidden className="size-4 text-zinc-400" />{label}{sort?.key === current.key && sort.dir === dir && <span className="ml-auto text-xs text-indigo-600 dark:text-indigo-400">●</span>}</button>)}
          <button type="button" role="menuitemradio" aria-checked={sort?.key !== current.key} onClick={() => setSort(null)} className={item}><span className="size-4" />No sort</button>
          <div className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />
          <button type="button" role="menuitemcheckbox" aria-checked={pinned === current.key} onClick={() => setPinned(pinned === current.key ? null : current.key)} className={item}><Pin aria-hidden className="size-4 text-zinc-400" />Pin to left</button>
          <button type="button" role="menuitem" onClick={() => { setHidden([...hidden, current.key]); setOpen(null); }} className={item}><EyeOff aria-hidden className="size-4 text-zinc-400" />Hide column</button>
          <button type="button" role="menuitem" onClick={() => { setRenaming(current.key); setOpen(null); }} className={item}><Pencil aria-hidden className="size-4 text-zinc-400" />Rename…</button>
          {current.key === 2 && <><div className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" /><label className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-500">Min MRR<input type="number" min={0} step={100} value={min} onChange={(event) => setMin(Number(event.target.value))} className="w-20 rounded-md border border-zinc-300 bg-transparent px-2 py-1 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100" /></label></>}
        </div>
      )}
    </div>
  );
}
