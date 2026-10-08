/**
 * @registry
 * name: Autocomplete Input
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Recherche de ville avec suggestions filtrées, texte correspondant en gras et navigation clavier.
 * prompt: Create a city autocomplete: as the user types, show up to 5 matching suggestions (bold matched prefix, country in muted text) in a listbox; ArrowUp/Down move (aria-activedescendant), Enter selects and fills the input, Escape closes; results count announced via aria-live. Light and dark mode.
 */
'use client';
import { MapPin } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

const cities = [['Abidjan', "Côte d'Ivoire"], ['Accra', 'Ghana'], ['Addis Ababa', 'Ethiopia'], ['Amsterdam', 'Netherlands'], ['Athens', 'Greece'], ['Dakar', 'Senegal'], ['Lagos', 'Nigeria'], ['Lyon', 'France'], ['Paris', 'France']];

export function AutocompleteInput() {
  const [query, setQuery] = useState('A');
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(0);
  const matches = query ? cities.filter(([city]) => city.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5) : [];

  function choose(index: number) { setQuery(matches[index][0]); setOpen(false); }
  function onKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActive((index) => Math.min(index + 1, matches.length - 1)); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActive((index) => Math.max(index - 1, 0)); }
    if (event.key === 'Enter' && open && matches[active]) { event.preventDefault(); choose(active); }
    if (event.key === 'Escape') setOpen(false);
  }

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="city-input" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Destination</label>
      <div className="relative mt-1.5">
        <MapPin aria-hidden className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
        <input id="city-input" role="combobox" aria-autocomplete="list" aria-expanded={open && matches.length > 0} aria-controls="city-list" aria-activedescendant={open && matches[active] ? `city-${active}` : undefined} value={query} onChange={(event) => { setQuery(event.target.value); setOpen(true); setActive(0); }} onKeyDown={onKey} className="h-11 w-full rounded-xl border border-zinc-300 bg-white pl-9 pr-3 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white" />
      </div>
      <p aria-live="polite" className="sr-only">{open ? `${matches.length} suggestions` : ''}</p>
      {open && matches.length > 0 && (
        <ul id="city-list" role="listbox" className="mt-1.5 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          {matches.map(([city, country], index) => (
            <li key={city} id={`city-${index}`} role="option" aria-selected={index === active} onMouseEnter={() => setActive(index)} onMouseDown={(event) => { event.preventDefault(); choose(index); }} className={`flex cursor-pointer justify-between rounded-lg px-3 py-2 text-sm ${index === active ? 'bg-teal-500/10' : ''}`}>
              <span className="text-zinc-700 dark:text-zinc-300"><strong className="font-semibold text-zinc-900 dark:text-white">{city.slice(0, query.length)}</strong>{city.slice(query.length)}</span>
              <span className="text-xs text-zinc-400">{country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
