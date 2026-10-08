/**
 * @registry
 * name: Command Bar Navbar
 * category: Navbar
 * style: SaaS
 * tags: featured, recent
 * description: Navigation centrée sur une barre de commande : un clic ou ⌘K l'agrandit en palette avec résultats filtrés.
 * prompt: Create a navbar whose centerpiece is a command bar: a compact search pill with ⌘K hint that expands (width transition) into an inline command palette panel below the bar when clicked or when Ctrl/⌘+K is pressed; typing filters grouped results (Pages, Actions), ArrowUp/Down moves the active option (aria-activedescendant), Enter selects, Escape closes. Logo left, avatar right. Light and dark mode.
 */
'use client';
import { FileText, Search, Zap } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';

const items = [['Pages', 'Dashboard'], ['Pages', 'Billing'], ['Pages', 'Team members'], ['Actions', 'Create invoice'], ['Actions', 'Invite teammate'], ['Actions', 'Toggle dark mode']] as const;

export function CommandBarNavbar() {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const results = items.filter(([, label]) => label.toLowerCase().includes(query.toLowerCase()));

  // Scoped to the component so it never hijacks the host page's own ⌘K.
  function onShortcut(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setOpen(true); input.current?.focus(); }
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') { event.preventDefault(); setActive((value) => Math.min(results.length - 1, value + 1)); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActive((value) => Math.max(0, value - 1)); }
    if (event.key === 'Enter' && results[active]) { setPicked(results[active][1]); setOpen(false); setQuery(''); }
    if (event.key === 'Escape') { setOpen(false); input.current?.blur(); }
  }

  return (
    <header className="w-full max-w-3xl" onKeyDown={onShortcut}>
      <nav aria-label="Main" className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950">
        <span className="font-bold text-zinc-950 dark:text-zinc-50">linea</span>
        <label className={`mx-auto flex items-center gap-2 rounded-xl bg-zinc-100 px-3 py-1.5 transition-[width] duration-300 dark:bg-zinc-900 ${open ? 'w-full max-w-md' : 'w-48'}`}>
          <Search aria-hidden className="size-4 text-zinc-400" />
          <input ref={input} role="combobox" aria-expanded={open} aria-controls={`${uid}-list`} aria-activedescendant={open && results[active] ? `${uid}-${active}` : undefined} aria-label="Search or run a command" value={query} onFocus={() => setOpen(true)} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={onKeyDown} placeholder={picked ? `Opened ${picked}` : 'Search…'} className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-zinc-100" />
          <kbd className="rounded border border-zinc-300 px-1 font-mono text-[10px] text-zinc-500 dark:border-zinc-700">⌘K</kbd>
        </label>
        <span aria-hidden className="size-8 rounded-full bg-gradient-to-br from-sky-400 to-violet-500" />
      </nav>
      {open && (
        <ul id={`${uid}-list`} role="listbox" aria-label="Results" className="mx-auto mt-2 max-w-md rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          {results.map(([group, label], index) => (
            <li key={label} id={`${uid}-${index}`} role="option" aria-selected={active === index} onMouseEnter={() => setActive(index)} onMouseDown={(event) => { event.preventDefault(); setPicked(label); setOpen(false); setQuery(''); }} className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm ${active === index ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>
              {group === 'Pages' ? <FileText aria-hidden className="size-4 text-zinc-400" /> : <Zap aria-hidden className="size-4 text-amber-500" />}{label}<span className="ml-auto text-[11px] text-zinc-400">{group}</span>
            </li>
          ))}
          {!results.length && <li className="px-3 py-4 text-center text-sm text-zinc-500">No results</li>}
        </ul>
      )}
    </header>
  );
}
