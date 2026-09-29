/**
 * @registry
 * name: Command Palette
 * category: Menu
 * style: SaaS
 * tags: featured, recent
 * description: Palette de commandes ⌘K avec recherche, groupes, raccourcis et navigation complete au clavier.
 * prompt: Create a ⌘K command palette: search input (role="combobox") filtering grouped commands (Navigation, Actions) in a listbox, ArrowUp/Down with wrap-around keeping the active option visible (scroll the list only, not the page), Enter runs (shows a toast line), Escape clears; each item has icon, label and shortcut; empty state. Rendered inline (defaultOpen) for previews, opens with ⌘/Ctrl+K. Light and dark mode.
 */
'use client';
import { FilePlus, Home, Search, Settings, UserPlus, type LucideIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';

type Command = { group: string; label: string; icon: LucideIcon; shortcut: string };
const commands: Command[] = [
  { group: 'Navigation', label: 'Go to dashboard', icon: Home, shortcut: 'G D' },
  { group: 'Navigation', label: 'Open settings', icon: Settings, shortcut: 'G S' },
  { group: 'Actions', label: 'Create new project', icon: FilePlus, shortcut: '⌘N' },
  { group: 'Actions', label: 'Invite teammate', icon: UserPlus, shortcut: '⌘I' },
];

export function CommandPalette({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [ran, setRan] = useState('');
  const listRef = useRef<HTMLUListElement>(null);
  const results = useMemo(() => commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase())), [query]);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setOpen(true); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Keep the active option visible by scrolling the list only (scrollIntoView would move the page).
  useEffect(() => {
    const list = listRef.current;
    const option = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !option) return;
    if (option.offsetTop < list.scrollTop) list.scrollTop = option.offsetTop;
    else if (option.offsetTop + option.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = option.offsetTop + option.offsetHeight - list.clientHeight;
  }, [active]);

  function onKey(event: KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); setActive((index) => (index + 1) % results.length); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActive((index) => (index - 1 + results.length) % results.length); }
    if (event.key === 'Enter') { setRan(results[active].label); }
    if (event.key === 'Escape') { setQuery(''); }
  }

  if (!open) return <button type="button" onClick={() => setOpen(true)} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">Open command menu <kbd className="ml-2 font-mono text-xs">⌘K</kbd></button>;

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
      <label className="flex items-center gap-3 border-b border-zinc-200 px-4 dark:border-zinc-800">
        <Search aria-hidden className="size-4 text-zinc-400" />
        <input role="combobox" aria-expanded aria-controls="command-list" aria-activedescendant={results[active] ? `command-${active}` : undefined} aria-label="Search commands" value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={onKey} placeholder="Type a command or search…" className="h-12 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white" />
        <kbd className="rounded border border-zinc-200 px-1.5 font-mono text-[10px] text-zinc-400 dark:border-zinc-700">ESC</kbd>
      </label>
      <ul ref={listRef} id="command-list" role="listbox" className="relative max-h-64 overflow-y-auto p-2">
        {results.map((command, index) => (
          <li key={command.label}>
            {(index === 0 || results[index - 1].group !== command.group) && <p className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400" aria-hidden>{command.group}</p>}
            <div id={`command-${index}`} role="option" aria-selected={index === active} onMouseEnter={() => setActive(index)} onClick={() => setRan(command.label)} className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm ${index === active ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>
              <command.icon aria-hidden className="size-4 text-zinc-400" />{command.label}<kbd className="ml-auto font-mono text-[11px] text-zinc-400">{command.shortcut}</kbd>
            </div>
          </li>
        ))}
        {!results.length && <li className="py-8 text-center text-sm text-zinc-500">No results for “{query}”.</li>}
      </ul>
      <p aria-live="polite" className="border-t border-zinc-200 px-4 py-2 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">{ran ? `Ran: ${ran}` : '↑↓ to navigate · ↵ to run'}</p>
    </div>
  );
}
