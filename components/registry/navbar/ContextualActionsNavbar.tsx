/**
 * @registry
 * name: Contextual Actions Navbar
 * category: Navbar
 * style: SaaS
 * tags: recent
 * description: Barre d'en-tête qui se transforme en barre d'actions dès qu'on sélectionne des éléments : compteur, déplacer, archiver, supprimer, annuler.
 * prompt: Create an app header that switches to a contextual action bar when items are selected: by default it shows the title "Photos", a search button and an Upload button; below it a grid of 6 selectable photo tiles (checkbox in the corner); as soon as one is selected the header crossfades to an indigo bar with a close (clear selection) button, "3 selected" (aria-live), Select all, and icon actions Share / Move / Archive / Delete with labels hidden on small screens; Escape clears the selection. Light and dark mode.
 */
'use client';
import { Archive, Check, FolderInput, Search, Share2, Trash2, Upload, X } from 'lucide-react';
import { useState } from 'react';

const photos = ['from-rose-300 to-orange-300', 'from-sky-300 to-indigo-400', 'from-emerald-300 to-teal-500', 'from-amber-200 to-rose-300', 'from-violet-300 to-fuchsia-400', 'from-lime-200 to-emerald-400'];

export function ContextualActionsNavbar() {
  const [selected, setSelected] = useState<number[]>([1, 3]);
  const toggle = (index: number) => setSelected((list) => (list.includes(index) ? list.filter((item) => item !== index) : [...list, index]));
  const action = 'flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium hover:bg-white/15';

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" onKeyDown={(event) => { if (event.key === 'Escape') setSelected([]); }}>
      <header className="relative h-14">
        <div className={`absolute inset-0 flex items-center gap-2 px-4 transition-opacity ${selected.length ? 'pointer-events-none opacity-0' : 'opacity-100'}`} aria-hidden={selected.length > 0}>
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Photos</h2>
          <button type="button" tabIndex={selected.length ? -1 : 0} aria-label="Search" className="ml-auto grid size-9 place-items-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"><Search aria-hidden className="size-4" /></button>
          <button type="button" tabIndex={selected.length ? -1 : 0} className="flex items-center gap-1.5 rounded-lg bg-zinc-950 px-3 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"><Upload aria-hidden className="size-4" />Upload</button>
        </div>
        <div className={`absolute inset-0 flex items-center gap-1 bg-indigo-600 px-2 text-white transition-opacity ${selected.length ? 'opacity-100' : 'pointer-events-none opacity-0'}`} aria-hidden={!selected.length}>
          <button type="button" tabIndex={selected.length ? 0 : -1} aria-label="Clear selection" onClick={() => setSelected([])} className="grid size-9 place-items-center rounded-lg hover:bg-white/15"><X aria-hidden className="size-4" /></button>
          <p aria-live="polite" className="text-sm font-semibold">{selected.length} selected</p>
          <button type="button" tabIndex={selected.length ? 0 : -1} onClick={() => setSelected(photos.map((_, index) => index))} className="ml-2 hidden rounded-lg px-2 py-1 text-xs underline sm:block">Select all</button>
          <div className="ml-auto flex">
            {[[Share2, 'Share'], [FolderInput, 'Move'], [Archive, 'Archive'], [Trash2, 'Delete']].map(([Icon, label]) => { const I = Icon as typeof X; return <button key={label as string} type="button" tabIndex={selected.length ? 0 : -1} aria-label={label as string} className={action}><I aria-hidden className="size-4" /><span className="hidden sm:inline">{label as string}</span></button>; })}
          </div>
        </div>
      </header>
      <ul className="grid grid-cols-3 gap-2 p-3">
        {photos.map((gradient, index) => {
          const on = selected.includes(index);
          return (
            <li key={gradient}>
              <button type="button" aria-pressed={on} aria-label={`Photo ${index + 1}`} onClick={() => toggle(index)} className={`relative block aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br transition ${gradient} ${on ? 'scale-[0.94] ring-4 ring-indigo-500' : ''}`}>
                <span aria-hidden className={`absolute left-2 top-2 grid size-5 place-items-center rounded-full border-2 ${on ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-white/90 bg-black/10'}`}>{on && <Check className="size-3" />}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
