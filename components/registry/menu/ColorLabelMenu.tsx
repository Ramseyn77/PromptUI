/**
 * @registry
 * name: Color Label Menu
 * category: Menu
 * style: Minimal
 * tags: recent
 * description: Menu d'étiquettes colorées à cocher avec recherche, création d'étiquette à la volée et aperçu sur l'élément.
 * prompt: Create a label picker menu (rendered open by default) anchored to an issue chip: a search input filters labels; each label row shows a color dot and is a menuitemcheckbox toggling aria-checked with a check icon; typing a new name shows "Create label “x”" which adds it with the next palette color; the selected labels render as colored pills on the trigger chip. Arrow keys move between items. Light and dark mode.
 */
'use client';
import { Check, Plus, Tag } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';

const palette = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

export function ColorLabelMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [labels, setLabels] = useState([{ name: 'Bug', color: palette[0] }, { name: 'Design', color: palette[4] }, { name: 'Backend', color: palette[3] }, { name: 'Quick win', color: palette[2] }]);
  const [selected, setSelected] = useState<string[]>(['Bug', 'Design']);
  const [query, setQuery] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const visible = labels.filter((label) => label.name.toLowerCase().includes(query.toLowerCase()));
  const canCreate = query.trim() && !labels.some((label) => label.name.toLowerCase() === query.trim().toLowerCase());

  function toggle(name: string) { setSelected((list) => (list.includes(name) ? list.filter((item) => item !== name) : [...list, name])); }
  function create() { const name = query.trim(); setLabels((list) => [...list, { name, color: palette[list.length % palette.length] }]); setSelected((list) => [...list, name]); setQuery(''); }
  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]') ?? []);
    const index = items.indexOf(document.activeElement as HTMLElement);
    items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus();
  }

  return (
    <div className="w-72">
      <button type="button" aria-expanded={open} aria-controls={`${uid}-menu`} onClick={() => setOpen(!open)} className="flex w-full flex-wrap items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-2 text-left text-sm dark:border-zinc-800 dark:bg-zinc-950">
        <Tag aria-hidden className="size-4 text-zinc-400" />
        {selected.length ? selected.map((name) => { const label = labels.find((item) => item.name === name)!; return <span key={name} className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: `${label.color}22`, color: label.color }}>{name}</span>; }) : <span className="text-zinc-500">Add labels</span>}
      </button>
      {open && (
        <div id={`${uid}-menu`} ref={listRef} onKeyDown={onKeyDown} className="mt-2 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && canCreate) create(); }} placeholder="Search or create…" aria-label="Search labels" className="w-full rounded-md bg-zinc-100 px-2.5 py-1.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-100" />
          <div role="menu" aria-label="Labels" className="mt-1">
            {visible.map((label) => (
              <button key={label.name} type="button" role="menuitemcheckbox" aria-checked={selected.includes(label.name)} onClick={() => toggle(label.name)} className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800">
                <span className="size-2.5 rounded-full" style={{ background: label.color }} />{label.name}
                {selected.includes(label.name) && <Check aria-hidden className="ml-auto size-4 text-zinc-500" />}
              </button>
            ))}
            {canCreate && <button type="button" role="menuitem" onClick={create} className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"><Plus aria-hidden className="size-4 text-zinc-400" />Create label “{query.trim()}”</button>}
            {!visible.length && !canCreate && <p className="px-2.5 py-2 text-sm text-zinc-500">No labels</p>}
          </div>
        </div>
      )}
    </div>
  );
}
