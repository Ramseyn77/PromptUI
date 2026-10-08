/**
 * @registry
 * name: Multi Select Combobox
 * category: Forms
 * style: SaaS
 * tags: featured, recent
 * description: Sélection multiple avec pastilles supprimables, recherche filtrante et navigation clavier.
 * prompt: Create a multi-select combobox: selected values as removable chips inside the field, a text input that filters a listbox of options (role="combobox"/"listbox", aria-multiselectable, aria-activedescendant), ArrowUp/Down to move, Enter to toggle, Backspace on empty input removes the last chip. Light and dark mode.
 */
'use client';
import { Check, X } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

const options = ['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Astro', 'Qwik'];

export function MultiSelectCombobox() {
  const [selected, setSelected] = useState<string[]>(['React', 'Astro']);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(0);
  const matches = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));
  const toggle = (option: string) => setSelected((current) => (current.includes(option) ? current.filter((item) => item !== option) : [...current, option]));

  function onKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActive((index) => Math.min(index + 1, matches.length - 1)); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActive((index) => Math.max(index - 1, 0)); }
    if (event.key === 'Enter' && matches[active]) { event.preventDefault(); toggle(matches[active]); }
    if (event.key === 'Backspace' && !query) setSelected((current) => current.slice(0, -1));
    if (event.key === 'Escape') setOpen(false);
  }

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="framework-input" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Frameworks</label>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 rounded-xl border border-zinc-300 bg-white p-1.5 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/15 dark:border-zinc-700 dark:bg-zinc-900">
        {selected.map((item) => <span key={item} className="inline-flex items-center gap-1 rounded-lg bg-teal-500/10 py-1 pl-2 pr-1 text-xs font-medium text-teal-800 dark:text-teal-200">{item}<button type="button" aria-label={`Remove ${item}`} onClick={() => toggle(item)} className="grid size-4 place-items-center rounded hover:bg-teal-500/20"><X className="size-3" /></button></span>)}
        <input id="framework-input" role="combobox" aria-expanded={open} aria-controls="framework-list" aria-activedescendant={open && matches[active] ? `framework-${matches[active]}` : undefined} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); setOpen(true); }} onKeyDown={onKey} onFocus={() => setOpen(true)} placeholder={selected.length ? '' : 'Pick frameworks…'} className="min-w-20 flex-1 bg-transparent px-1.5 py-1 text-sm text-zinc-900 outline-none dark:text-white" />
      </div>
      {open && (
        <ul id="framework-list" role="listbox" aria-multiselectable="true" className="mt-1.5 max-h-48 overflow-y-auto rounded-xl border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          {matches.map((option, index) => (
            <li key={option} id={`framework-${option}`} role="option" aria-selected={selected.includes(option)} onMouseDown={(event) => { event.preventDefault(); toggle(option); }} onMouseEnter={() => setActive(index)} className={`flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm text-zinc-800 dark:text-zinc-200 ${index === active ? 'bg-zinc-100 dark:bg-zinc-900' : ''}`}>{option}{selected.includes(option) && <Check aria-hidden className="size-4 text-teal-600" />}</li>
          ))}
          {!matches.length && <li className="px-2.5 py-2 text-sm text-zinc-500">No match</li>}
        </ul>
      )}
    </div>
  );
}
