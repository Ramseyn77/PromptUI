/**
 * @registry
 * name: Popconfirm Delete
 * category: Tooltips
 * style: Minimal
 * tags: featured, recent
 * description: Confirmation en bulle façon Ant Design Popconfirm avant de supprimer une ligne, avec annulation.
 * prompt: Create an Ant Design Popconfirm pattern: in a small list of API keys, each Delete button opens a compact popover with an arrow above it ("Delete this key?" + explanation, Cancel and Delete buttons, role="alertdialog" with aria-labelledby); confirming removes the row with a fade, Escape or Cancel closes and returns focus. defaultOpen shows the first popover for previews. Light and dark mode.
 */
'use client';
import { AlertTriangle, KeyRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function PopconfirmDelete({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [keys, setKeys] = useState(['Production', 'Staging', 'CI runner']);
  const [open, setOpen] = useState<string | null>(defaultOpen ? 'Production' : null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { triggers.current[open]?.focus(); setOpen(null); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <ul className="w-full max-w-sm divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
      {keys.map((key) => (
        <li key={key} className="relative flex items-center gap-3 px-4 py-3">
          <KeyRound aria-hidden className="size-4 text-zinc-400" />
          <span className="flex-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{key}</span>
          <button ref={(node) => { triggers.current[key] = node; }} type="button" aria-haspopup="dialog" aria-expanded={open === key} onClick={() => setOpen(open === key ? null : key)} className="rounded-md px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10">Delete</button>
          {open === key && (
            <div role="alertdialog" aria-labelledby={`pop-${key.replaceAll(" ", "-")}`} className="absolute right-2 top-full z-10 mt-1 w-60 rounded-xl border border-zinc-200 bg-white p-3 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
              <span aria-hidden className="absolute -top-1.5 right-6 size-3 rotate-45 border-l border-t border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900" />
              <p id={`pop-${key.replaceAll(" ", "-")}`} className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100"><AlertTriangle aria-hidden className="size-4 text-amber-500" />Delete this key?</p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Apps using “{key}” will stop working immediately.</p>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => { setOpen(null); triggers.current[key]?.focus(); }} className="rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-600 dark:text-zinc-200">Cancel</button>
                <button type="button" onClick={() => { setKeys((list) => list.filter((item) => item !== key)); setOpen(null); }} className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-rose-500">Delete</button>
              </div>
            </div>
          )}
        </li>
      ))}
      {!keys.length && <li className="px-4 py-6 text-center text-sm text-zinc-500">No API keys left.</li>}
    </ul>
  );
}
