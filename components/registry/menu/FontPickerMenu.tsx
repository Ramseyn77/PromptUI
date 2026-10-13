/**
 * @registry
 * name: Font Picker Menu
 * category: Menu
 * style: Editorial
 * tags: recent
 * description: Sélecteur de police avec aperçu de chaque famille dans sa propre fonte, filtres Serif / Sans / Mono, recherche et graisse.
 * prompt: Create a font picker menu (open by default) for an editor toolbar: a trigger showing the current font name rendered in that font; the menu has a search field, category chips (All, Serif, Sans, Mono) and a listbox of fonts where each option previews "The quick brown fox" in its own CSS font stack; ArrowUp/Down + Enter selects; a weight segmented control (Regular, Medium, Bold) and a live preview paragraph below update with the chosen font. Light (paper) and dark mode.
 */
'use client';
import { Check, ChevronDown } from 'lucide-react';
import { useId, useState, type KeyboardEvent } from 'react';

const fonts = [
  ['Georgia', 'Serif', 'Georgia, serif'], ['Times', 'Serif', '"Times New Roman", Times, serif'], ['Palatino', 'Serif', 'Palatino, "Palatino Linotype", serif'],
  ['Helvetica', 'Sans', 'Helvetica, Arial, sans-serif'], ['Verdana', 'Sans', 'Verdana, Geneva, sans-serif'], ['System UI', 'Sans', 'system-ui, sans-serif'],
  ['Courier', 'Mono', '"Courier New", Courier, monospace'], ['Menlo', 'Mono', 'Menlo, Consolas, monospace'],
] as const;
const weights = [['Regular', 400], ['Medium', 500], ['Bold', 700]] as const;

export function FontPickerMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [font, setFont] = useState('Georgia');
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [weight, setWeight] = useState(400);
  const list = fonts.filter(([name, cat]) => (category === 'All' || cat === category) && name.toLowerCase().includes(query.toLowerCase()));
  const stack = fonts.find(([name]) => name === font)![2];

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') { event.preventDefault(); setActive((active + 1) % Math.max(1, list.length)); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActive((active - 1 + list.length) % Math.max(1, list.length)); }
    if (event.key === 'Enter' && list[active]) { event.preventDefault(); setFont(list[active][0]); }
    if (event.key === 'Escape') setOpen(false);
  }

  return (
    <div className="w-full max-w-sm">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-48 items-center justify-between rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" style={{ fontFamily: stack }}>{font}<ChevronDown aria-hidden className="size-4 text-zinc-400" /></button>
      {open && (
        <div className="mt-2 rounded-xl border border-zinc-200 bg-[#fdfbf6] p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900" onKeyDown={onKeyDown}>
          <input aria-label="Search fonts" role="combobox" aria-expanded aria-controls={`${uid}-list`} aria-activedescendant={list[active] ? `${uid}-${active}` : undefined} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} placeholder="Search fonts" className="w-full rounded-md bg-zinc-900/5 px-2.5 py-1.5 text-sm text-zinc-900 outline-none dark:bg-white/10 dark:text-zinc-100" />
          <div role="group" aria-label="Category" className="mt-2 flex gap-1">{['All', 'Serif', 'Sans', 'Mono'].map((name) => <button key={name} type="button" aria-pressed={category === name} onClick={() => { setCategory(name); setActive(0); }} className={`rounded-full px-2.5 py-0.5 text-xs ${category === name ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 hover:bg-zinc-900/5 dark:text-zinc-400 dark:hover:bg-white/10'}`}>{name}</button>)}</div>
          <ul id={`${uid}-list`} role="listbox" aria-label="Fonts" className="mt-2 max-h-52 overflow-y-auto" data-lenis-prevent>
            {list.map(([name, cat, family], index) => <li key={name} id={`${uid}-${index}`} role="option" aria-selected={font === name} onClick={() => setFont(name)} onMouseEnter={() => setActive(index)} className={`flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 ${active === index ? 'bg-zinc-900/5 dark:bg-white/10' : ''}`}><span className="flex-1"><span className="block text-[11px] text-zinc-500">{name} · {cat}</span><span className="block truncate text-base text-zinc-900 dark:text-zinc-100" style={{ fontFamily: family }}>The quick brown fox</span></span>{font === name && <Check aria-hidden className="size-4 text-zinc-900 dark:text-white" />}</li>)}
            {!list.length && <li className="px-2.5 py-3 text-sm text-zinc-500">No fonts found</li>}
          </ul>
          <div role="radiogroup" aria-label="Weight" className="mt-2 grid grid-cols-3 rounded-lg bg-zinc-900/5 p-0.5 text-xs dark:bg-white/10">{weights.map(([label, value]) => <button key={label} type="button" role="radio" aria-checked={weight === value} onClick={() => setWeight(value)} className={`rounded-md py-1 ${weight === value ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`} style={{ fontWeight: value }}>{label}</button>)}</div>
        </div>
      )}
      <p className="mt-3 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200" style={{ fontFamily: stack, fontWeight: weight }}>Good typography is invisible until it isn’t.</p>
    </div>
  );
}
