/**
 * @registry
 * name: Hover Expand Sidebar
 * category: Sidebar
 * style: Dark
 * tags: featured, recent
 * description: Rail d'icônes façon MUI « mini variant » qui s'élargit au survol ou au focus pour révéler les libellés.
 * prompt: Create a MUI mini-variant drawer: a dark icon rail (64px) that expands to 220px on hover or focus-within, revealing labels with a fade and showing a section title; active item has a teal pill; a pin button (aria-pressed) keeps it expanded; content area beside it reflows. Expansion is instant with reduced motion. Dark rail in both themes.
 */
'use client';
import { Calendar, FolderOpen, Home, Inbox, Pin, Settings, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

const items: [LucideIcon, string][] = [[Home, 'Home'], [Inbox, 'Inbox'], [FolderOpen, 'Projects'], [Calendar, 'Calendar'], [Settings, 'Settings']];

export function HoverExpandSidebar() {
  const [active, setActive] = useState('Projects');
  const [pinned, setPinned] = useState(false);

  return (
    <div className="flex h-80 w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <nav aria-label="Main" className={`group flex shrink-0 flex-col bg-zinc-950 py-3 text-zinc-400 transition-[width] duration-300 motion-reduce:transition-none ${pinned ? 'w-[220px]' : 'w-16 hover:w-[220px] focus-within:w-[220px]'}`}>
        <div className="mb-3 flex items-center gap-3 px-4">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-teal-500 font-bold text-zinc-950">N</span>
          <span className={`whitespace-nowrap text-sm font-semibold text-white transition-opacity ${pinned ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'}`}>Northwind</span>
        </div>
        <ul className="flex-1 space-y-1 px-2">
          {items.map(([Icon, label]) => (
            <li key={label}><a href={`#${label.toLowerCase()}`} aria-current={active === label ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(label); }} className={`flex h-10 items-center gap-3 rounded-xl px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${active === label ? 'bg-teal-500/15 text-teal-300' : 'hover:bg-white/5 hover:text-white'}`}>
              <Icon aria-hidden className="size-5 shrink-0" />
              <span className={`whitespace-nowrap transition-opacity ${pinned ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'}`}>{label}</span>
            </a></li>
          ))}
        </ul>
        <button type="button" aria-pressed={pinned} aria-label="Keep sidebar expanded" onClick={() => setPinned((value) => !value)} className={`mx-2 flex h-10 items-center gap-3 rounded-xl px-3 text-sm hover:bg-white/5 ${pinned ? 'text-teal-300' : ''}`}><Pin aria-hidden className={`size-5 shrink-0 ${pinned ? 'fill-current' : ''}`} /><span className={`whitespace-nowrap transition-opacity ${pinned ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'}`}>{pinned ? 'Pinned' : 'Pin open'}</span></button>
      </nav>
      <main className="min-w-0 flex-1 bg-white p-5 dark:bg-zinc-900">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{active}</h3>
        <p className="mt-1 text-sm text-zinc-500">Hover or tab into the rail to expand it.</p>
        <div className="mt-4 grid grid-cols-2 gap-2">{[0, 1, 2, 3].map((tile) => <div key={tile} className="h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800" />)}</div>
      </main>
    </div>
  );
}
