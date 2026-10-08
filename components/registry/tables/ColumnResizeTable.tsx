/**
 * @registry
 * name: Column Resize Table
 * category: Tables
 * style: SaaS
 * tags: recent
 * description: Tableau à colonnes redimensionnables par glisser ou au clavier, double-clic pour ajuster et largeur affichée.
 * prompt: Create a table with resizable columns: each header has a right-edge handle (role="separator", aria-orientation vertical, aria-valuenow width, tabIndex 0) dragged with pointer capture or nudged with ArrowLeft/Right (10px), double-click resets to the default width; table-layout fixed with colgroup widths, truncated cells with title tooltips, horizontal scroll container. Light and dark mode.
 */
'use client';
import { useState, type KeyboardEvent, type PointerEvent } from 'react';

const columns = [['Name', 160], ['Email', 220], ['Role', 110], ['Last active', 130]] as const;
const people = [['Awa Diop', 'awa.diop@lumen.dev', 'Owner', '2 min ago'], ['Leo Martin', 'leo.martin@lumen.dev', 'Admin', '1 h ago'], ['Yuki Tanaka', 'yuki.tanaka@lumen.dev', 'Editor', 'Yesterday'], ['Sam Okafor', 'sam.okafor@lumen.dev', 'Viewer', '3 days ago']];

export function ColumnResizeTable() {
  const [widths, setWidths] = useState<number[]>(columns.map(([, width]) => width));
  const setWidth = (index: number, value: number) => setWidths((list) => list.map((width, i) => (i === index ? Math.min(400, Math.max(70, Math.round(value))) : width)));

  const handle = (index: number) => ({
    onPointerDown: (event: PointerEvent<HTMLSpanElement>) => { event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.dataset.x = String(event.clientX); event.currentTarget.dataset.w = String(widths[index]); },
    onPointerMove: (event: PointerEvent<HTMLSpanElement>) => { if (!event.currentTarget.hasPointerCapture(event.pointerId)) return; setWidth(index, Number(event.currentTarget.dataset.w) + event.clientX - Number(event.currentTarget.dataset.x)); },
    onKeyDown: (event: KeyboardEvent) => { if (event.key === 'ArrowRight') { event.preventDefault(); setWidth(index, widths[index] + 10); } if (event.key === 'ArrowLeft') { event.preventDefault(); setWidth(index, widths[index] - 10); } },
    onDoubleClick: () => setWidth(index, columns[index][1]),
  });

  return (
    <div className="w-full max-w-2xl overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
      <table className="table-fixed border-collapse text-sm" style={{ width: widths.reduce((sum, width) => sum + width, 0) }}>
        <colgroup>{widths.map((width, index) => <col key={index} style={{ width }} />)}</colgroup>
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800">
            {columns.map(([label], index) => (
              <th key={label} scope="col" className="relative select-none px-3 py-2 text-left text-xs font-medium text-zinc-500">
                <span className="block truncate">{label} <span className="font-mono text-[10px] text-zinc-400">{widths[index]}px</span></span>
                <span role="separator" tabIndex={0} aria-orientation="vertical" aria-label={`Resize ${label} column`} aria-valuenow={widths[index]} aria-valuemin={70} aria-valuemax={400} {...handle(index)} className="group absolute -right-1 top-0 z-10 flex h-full w-3 cursor-col-resize touch-none justify-center outline-none">
                  <span className="h-full w-px bg-zinc-200 transition group-hover:w-0.5 group-hover:bg-teal-500 group-focus-visible:w-0.5 group-focus-visible:bg-teal-500 dark:bg-zinc-800" />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {people.map((person) => <tr key={person[1]}>{person.map((value, index) => <td key={index} title={value} className={`truncate px-3 py-2.5 ${index === 0 ? 'font-medium text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'}`}>{value}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}
