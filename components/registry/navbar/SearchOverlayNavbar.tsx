/**
 * @registry
 * name: Search Overlay Navbar
 * category: Navbar
 * style: Editorial
 * tags: recent
 * description: Navbar dont l'icône loupe ouvre une recherche plein panneau : recherches récentes, suggestions filtrées et résultats par type, navigation clavier.
 * prompt: Create a navbar with a search overlay (open by default): the header has a serif logo, links and a search icon button (aria-expanded); the overlay covers the panel with a large search input, "Recent" searches as removable chips, and as you type a results list grouped by type (Articles, Topics, Authors) filtered from static data with the match highlighted using <mark>; ArrowUp/Down moves the active result (aria-activedescendant), Enter "opens" it (announced), Escape closes and returns focus. Light (paper) and dark mode.
 */
'use client';
import { Search, X } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';

const data = [['Articles', 'The quiet power of default settings'], ['Articles', 'Designing for slow networks'], ['Articles', 'A short history of the progress bar'], ['Topics', 'Design systems'], ['Topics', 'Accessibility'], ['Authors', 'Awa Diop'], ['Authors', 'Leo Martin']];

function Highlight({ text, query }: { text: string; query: string }) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (!query || index < 0) return <>{text}</>;
  return <>{text.slice(0, index)}<mark className="rounded bg-amber-200 px-0.5 text-inherit dark:bg-amber-500/40">{text.slice(index, index + query.length)}</mark>{text.slice(index + query.length)}</>;
}

export function SearchOverlayNavbar({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState('des');
  const [recent, setRecent] = useState(['typography', 'dark mode', 'empty states']);
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const results = query ? data.filter(([, title]) => title.toLowerCase().includes(query.toLowerCase())) : [];

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') { setOpen(false); triggerRef.current?.focus(); }
    if (!results.length) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); setActive((active + 1) % results.length); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActive((active - 1 + results.length) % results.length); }
    if (event.key === 'Enter') { event.preventDefault(); setOpened(results[Math.min(active, results.length - 1)][1]); }
  }

  return (
    <div className="relative min-h-[24rem] w-full max-w-3xl overflow-hidden rounded-2xl bg-[#faf7f0] dark:bg-zinc-950">
      <header className="flex items-center gap-6 border-b border-zinc-900/10 px-5 py-4 dark:border-white/10">
        <a href="#" className="font-serif text-2xl text-zinc-950 dark:text-white">Margin</a>
        <nav aria-label="Main" className="hidden gap-5 text-sm text-zinc-600 sm:flex dark:text-zinc-400">{['Essays', 'Interviews', 'Newsletter'].map((link) => <a key={link} href="#">{link}</a>)}</nav>
        <button ref={triggerRef} type="button" aria-label="Search" aria-expanded={open} onClick={() => setOpen(true)} className="ml-auto grid size-9 place-items-center rounded-full text-zinc-700 hover:bg-zinc-900/5 dark:text-zinc-300 dark:hover:bg-white/10"><Search aria-hidden className="size-4" /></button>
      </header>
      {open && (
        <div role="dialog" aria-label="Search" onKeyDown={onKeyDown} className="absolute inset-0 z-10 bg-[#faf7f0] p-6 dark:bg-zinc-950">
          <div className="flex items-center gap-3 border-b-2 border-zinc-900 pb-2 dark:border-zinc-100">
            <Search aria-hidden className="size-5 text-zinc-500" />
            <input role="combobox" aria-expanded={results.length > 0} aria-controls={`${uid}-results`} aria-activedescendant={results.length ? `${uid}-r${Math.min(active, results.length - 1)}` : undefined} aria-label="Search the magazine" value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); setOpened(''); }} placeholder="Search essays, topics, authors" className="min-w-0 flex-1 bg-transparent font-serif text-2xl text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-white" />
            <button type="button" aria-label="Close search" onClick={() => { setOpen(false); triggerRef.current?.focus(); }} className="grid size-9 place-items-center rounded-full hover:bg-zinc-900/5 dark:hover:bg-white/10"><X aria-hidden className="size-5" /></button>
          </div>
          {!query && <div className="mt-5"><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Recent</p><ul className="mt-2 flex flex-wrap gap-2">{recent.map((item) => <li key={item} className="flex items-center gap-1 rounded-full bg-zinc-900/5 py-1 pl-3 pr-1 text-sm text-zinc-700 dark:bg-white/10 dark:text-zinc-300"><button type="button" onClick={() => setQuery(item)}>{item}</button><button type="button" aria-label={`Remove ${item}`} onClick={() => setRecent(recent.filter((value) => value !== item))} className="grid size-5 place-items-center rounded-full hover:bg-zinc-900/10"><X aria-hidden className="size-3" /></button></li>)}</ul></div>}
          <ul id={`${uid}-results`} role="listbox" aria-label="Results" className="mt-4 space-y-1">
            {results.map(([type, title], index) => (
              <li key={title} role="presentation">
                {(index === 0 || results[index - 1][0] !== type) && <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">{type}</p>}
                <div id={`${uid}-r${index}`} role="option" aria-selected={active === index} onMouseEnter={() => setActive(index)} onClick={() => setOpened(title)} className={`cursor-pointer rounded-lg px-3 py-2 font-serif text-lg text-zinc-900 dark:text-zinc-100 ${active === index ? 'bg-zinc-900/5 dark:bg-white/10' : ''}`}><Highlight text={title} query={query} /></div>
              </li>
            ))}
            {query && !results.length && <li className="py-6 text-center text-sm text-zinc-500">No results for “{query}”</li>}
          </ul>
          <p aria-live="polite" className="mt-3 text-xs text-zinc-500">{opened ? `Opening “${opened}”` : ''}</p>
        </div>
      )}
    </div>
  );
}
