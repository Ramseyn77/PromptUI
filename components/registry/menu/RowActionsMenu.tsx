/**
 * @registry
 * name: Row Actions Menu
 * category: Menu
 * style: Minimal
 * tags: recent
 * description: Menu « … » sur une ligne de liste avec confirmation en deux temps pour la suppression.
 * prompt: Create a list row with a kebab (⋯) button (aria-haspopup, aria-expanded) that opens an actions menu (Edit, Duplicate, Archive, Delete); clicking Delete turns the item into an inline "Confirm delete?" with Yes/No instead of closing, and confirming removes the row. Closes on Escape/outside click. Light and dark mode.
 */
'use client';
import { Archive, Copy, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function RowActionsMenu() {
  const [open, setOpen] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => { if (!ref.current?.contains(event.target as Node)) { setOpen(false); setConfirm(false); } };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); setConfirm(false); } };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', onKey); };
  }, [open]);

  if (deleted) return <button type="button" onClick={() => { setDeleted(false); setConfirm(false); }} className="text-sm text-teal-700 underline dark:text-teal-400">Project deleted · Undo</button>;

  return (
    <div ref={ref} className="w-full max-w-md">
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
        <span className="size-9 rounded-xl bg-gradient-to-br from-teal-400 to-sky-500" />
        <div className="flex-1"><p className="text-sm font-semibold text-zinc-900 dark:text-white">Marketing site</p><p className="text-xs text-zinc-500">Edited 2h ago</p></div>
        <button type="button" aria-label="Project actions" aria-haspopup="menu" aria-expanded={open} onClick={() => { setOpen((value) => !value); setConfirm(false); }} className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"><MoreHorizontal className="size-4" /></button>
      </div>
      {open && (
        <div role="menu" className="ml-auto mt-2 w-52 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          {[[Pencil, 'Edit'], [Copy, 'Duplicate'], [Archive, 'Archive']].map(([Icon, label]) => {
            const IconComponent = Icon as typeof Pencil;
            return <button key={label as string} type="button" role="menuitem" onClick={() => setOpen(false)} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"><IconComponent aria-hidden className="size-4 text-zinc-400" />{label as string}</button>;
          })}
          <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" role="separator" />
          {confirm ? (
            <div className="flex items-center gap-2 px-2.5 py-1.5 text-sm">
              <span className="flex-1 text-rose-600 dark:text-rose-400">Delete?</span>
              <button type="button" onClick={() => setDeleted(true)} className="rounded-md bg-rose-600 px-2 py-0.5 text-xs font-semibold text-white">Yes</button>
              <button type="button" onClick={() => setConfirm(false)} className="rounded-md px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">No</button>
            </div>
          ) : (
            <button type="button" role="menuitem" onClick={() => setConfirm(true)} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"><Trash2 aria-hidden className="size-4" />Delete</button>
          )}
        </div>
      )}
    </div>
  );
}
