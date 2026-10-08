/**
 * @registry
 * name: Range Select List
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Liste d'emails à cocher où Maj+clic sélectionne toute une plage, avec barre d'actions groupées.
 * prompt: Create an inbox-style checkbox list where Shift+click selects the whole range between the last clicked row and the current one (like Gmail); a header checkbox (indeterminate when partial) selects all; a bulk action bar shows "3 selected" with Archive/Delete buttons when anything is selected. Hint text explains Shift+click. Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState, type MouseEvent } from 'react';

const mails = ['Weekly report is ready', 'Your invoice #2041', 'Design review moved', 'New comment on PR #88', 'Welcome to the beta', 'Security alert: new login'];

export function RangeSelectList() {
  const [selected, setSelected] = useState<Set<number>>(new Set([1]));
  const last = useRef<number | null>(null);
  const header = useRef<HTMLInputElement>(null);

  useEffect(() => { if (header.current) header.current.indeterminate = selected.size > 0 && selected.size < mails.length; }, [selected]);

  function click(index: number, event: MouseEvent<HTMLInputElement>) {
    setSelected((current) => {
      const next = new Set(current);
      const value = !current.has(index);
      if (event.shiftKey && last.current !== null) {
        const [from, to] = [Math.min(last.current, index), Math.max(last.current, index)];
        for (let i = from; i <= to; i++) value ? next.add(i) : next.delete(i);
      } else value ? next.add(index) : next.delete(index);
      return next;
    });
    last.current = index;
  }

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-11 items-center gap-3 border-b border-zinc-200 bg-zinc-50 px-4 dark:border-zinc-800 dark:bg-zinc-900/60">
        <input ref={header} type="checkbox" aria-label="Select all" checked={selected.size === mails.length} onChange={() => setSelected(selected.size === mails.length ? new Set() : new Set(mails.map((_, i) => i)))} className="size-4 accent-teal-600" />
        {selected.size ? (
          <>
            <span aria-live="polite" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{selected.size} selected</span>
            <button type="button" className="ml-auto rounded-md px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800">Archive</button>
            <button type="button" className="rounded-md px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10">Delete</button>
          </>
        ) : <span className="text-xs text-zinc-500">Tip: Shift+click to select a range</span>}
      </div>
      <ul>
        {mails.map((mail, index) => (
          <li key={mail} className={`flex items-center gap-3 border-b border-zinc-100 px-4 py-2.5 last:border-0 dark:border-zinc-900 ${selected.has(index) ? 'bg-teal-50/70 dark:bg-teal-400/5' : ''}`}>
            <input type="checkbox" aria-label={mail} checked={selected.has(index)} onClick={(event) => click(index, event)} onChange={() => {}} className="size-4 accent-teal-600" />
            <span className="truncate text-sm text-zinc-800 dark:text-zinc-200">{mail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
