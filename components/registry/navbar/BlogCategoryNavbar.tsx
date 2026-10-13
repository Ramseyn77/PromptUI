/**
 * @registry
 * name: Blog Category Navbar
 * category: Navbar
 * style: Editorial
 * tags: recent
 * description: En-tête de magazine : nom en serif centré, date du jour, rubriques soulignées et recherche dépliable, menu des rubriques sur mobile.
 * prompt: Create an editorial blog header: a top utility row with today's date (static string), Subscribe and Sign in; a centered large serif masthead; a section row of categories (World, Design, Tech, Culture, Opinion, Podcasts) where the active one gets a thick underline; a search icon expands an inline search field (aria-expanded) that can be closed with Escape; under md the section row becomes a "Sections" button with aria-expanded showing a 2-column grid. Light (paper) and dark mode.
 */
'use client';
import { ChevronDown, Search, X } from 'lucide-react';
import { useState } from 'react';

const sections = ['World', 'Design', 'Tech', 'Culture', 'Opinion', 'Podcasts'];

export function BlogCategoryNavbar() {
  const [active, setActive] = useState('Design');
  const [searching, setSearching] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <header className="w-full bg-[#faf8f3] px-4 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between border-b border-zinc-900/10 py-2 text-xs dark:border-white/10"><span className="text-zinc-500">Monday, October 12, 2026</span><div className="flex gap-4"><a href="#" className="font-semibold">Subscribe</a><a href="#" className="text-zinc-600 dark:text-zinc-400">Sign in</a></div></div>
        <a href="#" className="block py-5 text-center font-serif text-4xl font-bold tracking-tight sm:text-5xl">The Margin</a>
        <div className="flex items-center gap-2 border-y-2 border-zinc-900 py-1 dark:border-zinc-100">
          <nav aria-label="Sections" className="hidden flex-1 md:block">
            <ul className="flex justify-center gap-6">{sections.map((section) => <li key={section}><a href="#" aria-current={active === section ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(section); }} className={`block border-b-[3px] py-2 text-sm font-medium uppercase tracking-wider ${active === section ? 'border-zinc-900 dark:border-zinc-100' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}>{section}</a></li>)}</ul>
          </nav>
          <button type="button" aria-expanded={menu} onClick={() => setMenu(!menu)} className="flex flex-1 items-center gap-1 py-2 text-sm font-medium uppercase tracking-wider md:hidden">Sections<ChevronDown aria-hidden className={`size-4 transition-transform ${menu ? 'rotate-180' : ''}`} /></button>
          {searching ? (
            <div className="flex items-center gap-1" onKeyDown={(event) => { if (event.key === 'Escape') setSearching(false); }}>
              <input type="search" aria-label="Search articles" placeholder="Search…" className="w-36 border-b border-zinc-400 bg-transparent px-1 py-1 text-sm outline-none sm:w-48" />
              <button type="button" aria-label="Close search" onClick={() => setSearching(false)} className="grid size-8 place-items-center"><X aria-hidden className="size-4" /></button>
            </div>
          ) : <button type="button" aria-label="Search" aria-expanded={searching} onClick={() => setSearching(true)} className="grid size-8 place-items-center"><Search aria-hidden className="size-4" /></button>}
        </div>
        {menu && <ul className="grid grid-cols-2 gap-1 py-3 md:hidden">{sections.map((section) => <li key={section}><a href="#" aria-current={active === section ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(section); setMenu(false); }} className={`block px-2 py-2 text-sm ${active === section ? 'font-bold underline underline-offset-4' : ''}`}>{section}</a></li>)}</ul>}
      </div>
    </header>
  );
}
