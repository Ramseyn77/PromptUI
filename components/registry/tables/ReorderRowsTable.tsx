/**
 * @registry
 * name: Reorder Rows Table
 * category: Tables
 * style: Minimal
 * tags: recent
 * description: Tableau de priorités réordonnable : glisser la poignée ou utiliser les flèches, rang recalculé et annoncé.
 * prompt: Create a reorderable priority table: each row has a drag handle (native HTML5 drag and drop between rows with a drop indicator line) plus accessible Move up / Move down buttons; rank numbers recompute, the moved row flashes, and an aria-live message announces "Search moved to position 2 of 5". Light and dark mode.
 */
'use client';
import { ArrowDown, ArrowUp, GripVertical } from 'lucide-react';
import { useState, type DragEvent } from 'react';

export function ReorderRowsTable() {
  const [rows, setRows] = useState(['Onboarding flow', 'Search', 'Billing page', 'Dark mode', 'API docs']);
  const [drag, setDrag] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [flash, setFlash] = useState<string | null>(null);

  function move(from: number, to: number) {
    if (to < 0 || to >= rows.length || from === to) return;
    const next = [...rows];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setRows(next);
    setFlash(item);
    setMessage(`${item} moved to position ${to + 1} of ${rows.length}`);
    window.setTimeout(() => setFlash(null), 700);
  }

  const drop = (event: DragEvent, index: number) => { event.preventDefault(); if (drag !== null) move(drag, index); setDrag(null); setOver(null); };
  const icon = 'grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 disabled:opacity-25 dark:hover:bg-zinc-800';

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full text-sm">
        <thead className="border-b border-zinc-200 text-left text-xs text-zinc-500 dark:border-zinc-800"><tr><th className="w-10 px-3 py-2 font-medium">#</th><th className="font-medium">Feature</th><th className="w-24 px-3 text-right font-medium"><span className="sr-only">Reorder</span></th></tr></thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row} draggable onDragStart={() => setDrag(index)} onDragOver={(event) => { event.preventDefault(); setOver(index); }} onDragEnd={() => { setDrag(null); setOver(null); }} onDrop={(event) => drop(event, index)} className={`border-b border-zinc-100 transition-colors last:border-0 dark:border-zinc-900 ${flash === row ? 'bg-teal-50 dark:bg-teal-400/10' : ''} ${drag === index ? 'opacity-40' : ''} ${over === index && drag !== index ? 'shadow-[inset_0_2px_0_#14b8a6]' : ''}`}>
              <td className="px-3 py-2 font-mono text-xs tabular-nums text-zinc-500">{index + 1}</td>
              <td className="py-2 text-zinc-900 dark:text-zinc-100"><span className="flex items-center gap-2"><GripVertical aria-hidden className="size-4 cursor-grab text-zinc-400" />{row}</span></td>
              <td className="px-3 text-right"><span className="inline-flex"><button type="button" aria-label={`Move ${row} up`} disabled={index === 0} onClick={() => move(index, index - 1)} className={icon}><ArrowUp aria-hidden className="size-4" /></button><button type="button" aria-label={`Move ${row} down`} disabled={index === rows.length - 1} onClick={() => move(index, index + 1)} className={icon}><ArrowDown aria-hidden className="size-4" /></button></span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p aria-live="polite" className="sr-only">{message}</p>
    </div>
  );
}
