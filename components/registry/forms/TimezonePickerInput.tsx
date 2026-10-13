/**
 * @registry
 * name: Timezone Picker Input
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Sélecteur de fuseau horaire avec recherche par ville, décalage UTC, heure locale calculée et regroupement par région.
 * prompt: Create a timezone picker combobox: an input showing the selected zone ("Lagos · UTC+1"), typing filters a grouped listbox (Africa, Europe, Americas, Asia) by city or abbreviation; each option shows city, UTC offset and the local time computed from a fixed reference time (12:00 UTC) so it is hydration-safe; ArrowUp/Down + Enter selects, Escape closes; a "Use my timezone" link picks Lagos in the demo; the list is open by default. Light and dark mode.
 */
'use client';
import { Check, Globe } from 'lucide-react';
import { useId, useState, type KeyboardEvent } from 'react';

const zones = [
  ['Africa', 'Lagos', 1], ['Africa', 'Nairobi', 3], ['Africa', 'Johannesburg', 2], ['Europe', 'London', 1], ['Europe', 'Paris', 2], ['Europe', 'Istanbul', 3],
  ['Americas', 'New York', -4], ['Americas', 'São Paulo', -3], ['Americas', 'Los Angeles', -7], ['Asia', 'Dubai', 4], ['Asia', 'Singapore', 8], ['Asia', 'Tokyo', 9],
] as const;
const offset = (hours: number) => `UTC${hours >= 0 ? '+' : '−'}${Math.abs(hours)}`;
const localTime = (hours: number) => `${String((12 + hours + 24) % 24).padStart(2, '0')}:00`;

export function TimezonePickerInput({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const uid = useId();
  const [selected, setSelected] = useState('Lagos');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(defaultOpen);
  const [active, setActive] = useState(0);
  const list = zones.filter(([, city, hours]) => !query || city.toLowerCase().includes(query.toLowerCase()) || offset(hours).toLowerCase().includes(query.toLowerCase()));
  const current = zones.find(([, city]) => city === selected)!;

  function choose(city: string) { setSelected(city); setQuery(''); setOpen(false); }
  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActive((active + 1) % Math.max(1, list.length)); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setActive((active - 1 + list.length) % Math.max(1, list.length)); }
    else if (event.key === 'Enter' && open && list[active]) { event.preventDefault(); choose(list[active][1]); }
    else if (event.key === 'Escape') setOpen(false);
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-baseline justify-between"><label htmlFor={`${uid}-input`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Timezone</label><button type="button" onClick={() => choose('Lagos')} className="text-xs text-indigo-600 hover:underline dark:text-indigo-400">Use my timezone</button></div>
      <div className="relative mt-1.5">
        <Globe aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
        <input id={`${uid}-input`} role="combobox" aria-expanded={open} aria-controls={`${uid}-list`} aria-autocomplete="list" aria-activedescendant={open && list[active] ? `${uid}-${list[active][1].replace(/\W/g, '')}` : undefined} value={query} placeholder={`${current[1]} · ${offset(current[2])}`} onChange={(event) => { setQuery(event.target.value); setActive(0); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={onKeyDown} className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-900 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-100" />
      </div>
      {open && (
        <ul id={`${uid}-list`} role="listbox" aria-label="Timezones" className="mt-1 max-h-60 overflow-y-auto rounded-xl border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900" data-lenis-prevent>
          {list.map(([region, city, hours], index) => (
            <li key={city} role="presentation">
              {(index === 0 || list[index - 1][0] !== region) && <p role="presentation" className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{region}</p>}
              <div id={`${uid}-${city.replace(/\W/g, '')}`} role="option" aria-selected={selected === city} onMouseDown={(event) => { event.preventDefault(); choose(city); }} onMouseEnter={() => setActive(index)} className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${active === index ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}>
                <span className="w-4">{selected === city && <Check aria-hidden className="size-3.5 text-indigo-600 dark:text-indigo-400" />}</span>
                <span className="flex-1 text-zinc-900 dark:text-zinc-100">{city}</span>
                <span className="text-xs text-zinc-500">{offset(hours)}</span>
                <span className="w-12 text-right text-xs tabular-nums text-zinc-400">{localTime(hours)}</span>
              </div>
            </li>
          ))}
          {!list.length && <li className="px-2 py-3 text-sm text-zinc-500">No timezone matches “{query}”</li>}
        </ul>
      )}
      <p className="mt-2 text-xs text-zinc-500">Times shown when it’s 12:00 UTC.</p>
    </div>
  );
}
