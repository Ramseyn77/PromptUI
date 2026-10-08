/**
 * @registry
 * name: Facet Count Checkboxes
 * category: Checkboxes
 * style: SaaS
 * tags: recent
 * description: Filtres de recherche à facettes avec nombre de résultats par option, « Afficher plus » et compteur de filtres actifs.
 * prompt: Create a faceted search filter group: a "Brand" facet with a search box, 8 brand checkboxes each showing a result count right-aligned, only the first 5 visible with a "Show 3 more" toggle (aria-expanded), a header badge with the number of active filters and a Clear link; options with 0 results are disabled. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const brands = [['Nordwave', 128], ['Kora', 96], ['Atlas', 74], ['Lumen', 51], ['Baobab', 38], ['Zenith', 12], ['Orbit', 4], ['Vega', 0]] as const;

export function FacetCountCheckboxes() {
  const [on, setOn] = useState<string[]>(['Kora']);
  const [query, setQuery] = useState('');
  const [all, setAll] = useState(false);
  const filtered = brands.filter(([name]) => name.toLowerCase().includes(query.toLowerCase()));
  const shown = all || query ? filtered : filtered.slice(0, 5);

  return (
    <fieldset className="w-full max-w-xs">
      <div className="flex items-center justify-between">
        <legend className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Brand{on.length > 0 && <span className="rounded-full bg-teal-600 px-1.5 text-[10px] font-bold text-white">{on.length}</span>}</legend>
        {on.length > 0 && <button type="button" onClick={() => setOn([])} className="text-xs text-teal-700 hover:underline dark:text-teal-400">Clear</button>}
      </div>
      <input aria-label="Search brands" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search brands" className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
      <ul className="mt-2 space-y-0.5">
        {shown.map(([name, count]) => (
          <li key={name}><label className={`flex items-center gap-2 rounded-md px-1 py-1 text-sm ${count === 0 ? 'cursor-not-allowed text-zinc-400 dark:text-zinc-600' : 'cursor-pointer text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900'}`}>
            <input type="checkbox" disabled={count === 0} checked={on.includes(name)} onChange={() => setOn((list) => (list.includes(name) ? list.filter((item) => item !== name) : [...list, name]))} className="size-4 accent-teal-600" />
            <span className="flex-1">{name}</span><span className="text-xs tabular-nums text-zinc-400">{count}</span>
          </label></li>
        ))}
      </ul>
      {!query && filtered.length > 5 && <button type="button" aria-expanded={all} onClick={() => setAll((value) => !value)} className="mt-1 text-xs font-medium text-teal-700 hover:underline dark:text-teal-400">{all ? 'Show less' : `Show ${filtered.length - 5} more`}</button>}
    </fieldset>
  );
}
