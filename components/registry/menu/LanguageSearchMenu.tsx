/**
 * @registry
 * name: Language Search Menu
 * category: Menu
 * style: Minimal
 * tags: recent
 * description: Sélecteur de langue avec drapeaux, champ de recherche filtrant et langues récentes en tête.
 * prompt: Create a language picker menu: trigger shows the current flag and language; the panel (in flow) has a search field that filters as you type, a "Recent" group and an "All languages" group with flags, native names and English names; the selected one shows a check; ArrowDown from the search focuses the first result. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { Check, ChevronDown, Search } from 'lucide-react';
import { useRef, useState } from 'react';

const languages = [
  ['🇫🇷', 'Français', 'French'], ['🇬🇧', 'English', 'English'], ['🇪🇸', 'Español', 'Spanish'], ['🇩🇪', 'Deutsch', 'German'],
  ['🇵🇹', 'Português', 'Portuguese'], ['🇯🇵', '日本語', 'Japanese'], ['🇸🇳', 'Wolof', 'Wolof'], ['🇮🇹', 'Italiano', 'Italian'],
] as const;
const recent = ['English', 'French'];

export function LanguageSearchMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState('');
  const [current, setCurrent] = useState('English');
  const list = useRef<HTMLDivElement>(null);
  const match = languages.filter(([, native, english]) => `${native} ${english}`.toLowerCase().includes(query.toLowerCase()));
  const flag = languages.find((item) => item[2] === current)![0];

  const row = ([emoji, native, english]: (typeof languages)[number]) => (
    <button key={english} type="button" role="menuitemradio" aria-checked={current === english} onClick={() => setCurrent(english)} className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm outline-none hover:bg-zinc-100 focus-visible:bg-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800">
      <span aria-hidden>{emoji}</span><span className="text-zinc-900 dark:text-zinc-100">{native}</span><span className="text-xs text-zinc-400">{english}</span>
      {current === english && <Check aria-hidden className="ml-auto size-4 text-teal-600" />}
    </button>
  );

  return (
    <div className="w-64">
      <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"><span aria-hidden>{flag}</span>{current}<ChevronDown aria-hidden className="ml-auto size-4 text-zinc-400" /></button>
      {open && (
        <div className="mt-1.5 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          <label className="flex items-center gap-2 rounded-lg bg-zinc-100 px-2 py-1.5 dark:bg-zinc-900">
            <Search aria-hidden className="size-4 text-zinc-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); list.current?.querySelector('button')?.focus(); } }} placeholder="Search language" aria-label="Search language" className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100" />
          </label>
          <div ref={list} role="menu" aria-label="Languages" className="mt-1 max-h-56 overflow-y-auto" data-lenis-prevent>
            {!query && <><p className="px-2 pt-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Recent</p>{languages.filter((item) => recent.includes(item[2])).map(row)}<p className="px-2 pt-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">All languages</p></>}
            {match.map(row)}
            {!match.length && <p className="px-2 py-3 text-center text-xs text-zinc-500">No language found</p>}
          </div>
        </div>
      )}
    </div>
  );
}
