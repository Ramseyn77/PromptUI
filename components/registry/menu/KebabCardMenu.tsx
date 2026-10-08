/**
 * @registry
 * name: Kebab Card Menu
 * category: Menu
 * style: Minimal
 * tags: recent
 * description: Carte de projet avec menu « ⋮ » : renommer en ligne, dupliquer, archiver et supprimer.
 * prompt: Create a project card with a kebab (⋮) menu button (aria-haspopup="menu", aria-expanded); the menu (in flow, aligned right) has Rename (switches the title to an inline input, Enter saves, Escape cancels), Duplicate (adds " copy" counter), Archive (shows an "Archived" badge) and a separated destructive Delete that dims the card with an Undo link. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { Archive, Copy, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function KebabCardMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [title, setTitle] = useState('Marketing site');
  const [editing, setEditing] = useState(false);
  const [copies, setCopies] = useState(0);
  const [archived, setArchived] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const item = 'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800';

  return (
    <div className="w-72">
      <article className={`rounded-2xl border border-zinc-200 bg-white p-4 transition dark:border-zinc-800 dark:bg-zinc-950 ${deleted ? 'opacity-40' : ''}`}>
        <div className="flex items-start gap-3">
          <span aria-hidden className="size-10 shrink-0 rounded-xl bg-gradient-to-br from-teal-400 to-sky-500" />
          <div className="min-w-0 flex-1">
            {editing ? (
              <input autoFocus aria-label="Project name" defaultValue={title} onKeyDown={(event) => { if (event.key === 'Enter') { setTitle(event.currentTarget.value || title); setEditing(false); } if (event.key === 'Escape') setEditing(false); }} onBlur={() => setEditing(false)} className="w-full rounded-md border border-teal-500 bg-transparent px-1.5 py-0.5 text-sm font-semibold text-zinc-900 outline-none dark:text-zinc-100" />
            ) : <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</p>}
            <p className="text-xs text-zinc-500">Edited 2h ago{copies ? ` · ${copies} cop${copies > 1 ? 'ies' : 'y'}` : ''}</p>
            {archived && <span className="mt-1 inline-block rounded bg-amber-100 px-1.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">Archived</span>}
          </div>
          <button type="button" aria-label="Project actions" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><MoreVertical aria-hidden className="size-4" /></button>
        </div>
        {deleted && <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300">Moved to trash · <button type="button" onClick={() => setDeleted(false)} className="font-semibold underline">Undo</button></p>}
      </article>
      {open && (
        <div role="menu" aria-label="Project actions" className="ml-auto mt-1.5 w-44 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          <button type="button" role="menuitem" onClick={() => { setEditing(true); setOpen(false); }} className={item}><Pencil aria-hidden className="size-4 text-zinc-400" />Rename</button>
          <button type="button" role="menuitem" onClick={() => setCopies((value) => value + 1)} className={item}><Copy aria-hidden className="size-4 text-zinc-400" />Duplicate</button>
          <button type="button" role="menuitem" onClick={() => setArchived((value) => !value)} className={item}><Archive aria-hidden className="size-4 text-zinc-400" />{archived ? 'Unarchive' : 'Archive'}</button>
          <div role="separator" className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          <button type="button" role="menuitem" onClick={() => { setDeleted(true); setOpen(false); }} className={`${item} text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10`}><Trash2 aria-hidden className="size-4" />Delete</button>
        </div>
      )}
    </div>
  );
}
