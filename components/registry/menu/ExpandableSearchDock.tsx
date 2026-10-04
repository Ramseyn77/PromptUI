/**
 * @registry
 * name: Expandable Search Dock
 * category: Menu
 * style: Glass
 * tags: featured, recent
 * description: Dock compact dont la recherche s ouvre sans deplacer les actions essentielles.
 * prompt: Create a floating glass dock with Home, Search, Favorites and Profile actions. Search expands into an input inside the dock while the secondary actions fade away; Escape and the close button restore the compact dock and return focus to Search. Use aria-expanded, accessible labels, keyboard focus, smooth width transitions and a mobile-safe maximum width. Support light/dark mode.
 */
'use client';

import { Heart, Home, Search, UserRound, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function ExpandableSearchDock() {
  const [open, setOpen] = useState(false);
  const searchButton = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    window.requestAnimationFrame(() => searchButton.current?.focus());
  }

  return (
    <nav aria-label="Quick actions" onKeyDown={(event) => { if (event.key === 'Escape' && open) close(); }} className={`flex h-16 w-full items-center rounded-full border border-white/60 bg-white/75 p-2 shadow-2xl shadow-zinc-900/10 backdrop-blur-xl transition-[max-width] duration-500 dark:border-white/10 dark:bg-zinc-950/75 ${open ? 'max-w-md' : 'max-w-xs'}`}>
      <button aria-label="Home" className={`grid size-12 shrink-0 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:hover:bg-zinc-800 dark:hover:text-white ${open ? 'hidden sm:grid' : ''}`}><Home className="size-5" /></button>
      {open ? <div className="flex min-w-0 flex-1 items-center gap-2 px-2"><Search aria-hidden className="size-4 shrink-0 text-teal-600" /><input ref={input} aria-label="Search components" placeholder="Search components…" className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white" /><button type="button" onClick={close} aria-label="Close search" className="grid size-9 shrink-0 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><X className="size-4" /></button></div> : <>
        <button ref={searchButton} type="button" aria-label="Open search" aria-expanded={open} onClick={() => setOpen(true)} className="grid size-12 shrink-0 place-items-center rounded-full bg-zinc-950 text-white shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-950"><Search className="size-5" /></button>
        <button aria-label="Favorites" className="grid size-12 shrink-0 place-items-center rounded-full text-zinc-500 transition hover:bg-rose-500/10 hover:text-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"><Heart className="size-5" /></button>
        <button aria-label="Profile" className="grid size-12 shrink-0 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:hover:bg-zinc-800 dark:hover:text-white"><UserRound className="size-5" /></button>
      </>}
    </nav>
  );
}
