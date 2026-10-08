/**
 * @registry
 * name: Expandable Search Dock
 * category: Menu
 * style: Glass
 * tags: featured, recent
 * description: Dock compact dont la recherche s'ouvre en douceur pendant que les actions secondaires s'effacent.
 * prompt: Create a floating glass dock with Home, Search, Favorites and Profile actions. Search expands into an input inside the dock while the secondary actions collapse and fade away (they stay mounted but become inert); Escape and the close button restore the compact dock and return focus to Search. Use aria-expanded, accessible labels, keyboard focus, smooth width and opacity transitions, a mobile-safe maximum width and prefers-reduced-motion. Support light/dark mode.
 */
'use client';

import { Heart, Home, Search, UserRound, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const iconBase = 'grid size-12 shrink-0 place-items-center rounded-full text-zinc-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset';
const iconButton = `${iconBase} hover:bg-zinc-100 hover:text-zinc-950 focus-visible:ring-teal-500 dark:hover:bg-zinc-800 dark:hover:text-white`;

export function ExpandableSearchDock() {
  const [open, setOpen] = useState(false);
  const searchButton = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    searchButton.current?.focus();
  }

  return (
    <nav aria-label="Quick actions" onKeyDown={(event) => { if (event.key === 'Escape' && open) close(); }} className={`flex h-16 w-full items-center rounded-full border border-white/60 bg-white/75 p-2 shadow-2xl shadow-zinc-900/10 backdrop-blur-xl transition-[max-width] duration-500 motion-reduce:transition-none dark:border-white/10 dark:bg-zinc-950/75 ${open ? 'max-w-md' : 'max-w-xs'}`}>
      {/* Home stays on larger screens; on mobile it folds away to give the input room. */}
      <div className={`shrink-0 overflow-hidden transition-all duration-300 motion-reduce:transition-none ${open ? 'invisible w-0 opacity-0 sm:visible sm:w-12 sm:opacity-100' : 'w-12'}`}>
        <button type="button" aria-label="Home" className={iconButton}><Home className="size-5" /></button>
      </div>
      <button ref={searchButton} type="button" aria-label="Open search" aria-expanded={open} aria-controls="dock-search" onClick={() => (open ? input.current?.focus() : setOpen(true))} className={`grid size-12 shrink-0 place-items-center rounded-full shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 motion-reduce:transform-none ${open ? 'bg-teal-600 text-white' : 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'}`}><Search className="size-5" /></button>
      <div id="dock-search" inert={!open} className={`flex min-w-0 basis-0 items-center gap-2 overflow-hidden transition-[flex-grow,opacity] duration-500 motion-reduce:transition-none ${open ? 'grow pl-3 opacity-100' : 'grow-0 opacity-0'}`}>
        <input ref={input} aria-label="Search components" placeholder="Search components…" className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white" />
        <button type="button" onClick={close} aria-label="Close search" className="grid size-9 shrink-0 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:hover:bg-zinc-800"><X className="size-4" /></button>
      </div>
      <div inert={open} className={`flex shrink-0 overflow-hidden transition-all duration-300 motion-reduce:transition-none ${open ? 'w-0 opacity-0' : 'w-24 opacity-100'}`}>
        <button type="button" aria-label="Favorites" className={`${iconBase} hover:bg-rose-500/10 hover:text-rose-500 focus-visible:ring-rose-500`}><Heart className="size-5" /></button>
        <button type="button" aria-label="Profile" className={iconButton}><UserRound className="size-5" /></button>
      </div>
    </nav>
  );
}
