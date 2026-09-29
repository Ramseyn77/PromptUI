/**
 * @registry
 * name: Sort Filter Menu
 * category: Menu
 * style: SaaS
 * tags: recent
 * description: Menu de tri et d affichage avec options radio exclusives et cases a cocher dans le meme panneau.
 * prompt: Create a "View" dropdown mixing a radio group (Sort by: Newest, Oldest, Name A–Z as menuitemradio with aria-checked and a dot) and checkbox items (Show archived, Compact rows as menuitemcheckbox with checks), with section labels and a Reset link; the trigger shows the active sort. defaultOpen prop. Light and dark mode.
 */
'use client';
import { ArrowDownUp, Check } from 'lucide-react';
import { useState } from 'react';

const sorts = ['Newest', 'Oldest', 'Name A–Z'];

export function SortFilterMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [sort, setSort] = useState('Newest');
  const [flags, setFlags] = useState({ 'Show archived': false, 'Compact rows': true });
  const row = 'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900';

  return (
    <div className="w-60">
      <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"><ArrowDownUp aria-hidden className="size-4" />{sort}</button>
      {open && (
        <div role="menu" className="mt-2 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          <p className="px-2.5 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Sort by</p>
          <div role="group" aria-label="Sort by">
            {sorts.map((option) => <button key={option} type="button" role="menuitemradio" aria-checked={sort === option} onClick={() => setSort(option)} className={row}><span className="grid size-4 place-items-center">{sort === option && <span className="size-2 rounded-full bg-teal-600" />}</span>{option}</button>)}
          </div>
          <div role="separator" className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          <p className="px-2.5 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Display</p>
          {(Object.keys(flags) as Array<keyof typeof flags>).map((flag) => <button key={flag} type="button" role="menuitemcheckbox" aria-checked={flags[flag]} onClick={() => setFlags((current) => ({ ...current, [flag]: !current[flag] }))} className={row}><span className="grid size-4 place-items-center">{flags[flag] && <Check aria-hidden className="size-4 text-teal-600" />}</span>{flag}</button>)}
          <button type="button" onClick={() => { setSort('Newest'); setFlags({ 'Show archived': false, 'Compact rows': false }); }} className="mt-1 w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-teal-700 hover:bg-zinc-100 dark:text-teal-400 dark:hover:bg-zinc-900">Reset view</button>
        </div>
      )}
    </div>
  );
}
