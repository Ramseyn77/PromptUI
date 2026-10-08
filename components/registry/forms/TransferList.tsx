/**
 * @registry
 * name: Transfer List
 * category: Forms
 * style: SaaS
 * tags: featured, recent
 * description: Liste de transfert façon Ant Design : cocher des éléments et les faire passer d'une colonne à l'autre, avec recherche.
 * prompt: Create an Ant Design Transfer component: two panels (Available / Selected permissions) each with a header checkbox and count "2/6", a search field filtering the list, and checkable items; center arrow buttons (aria-label "Move to selected" / "Move to available", disabled when nothing checked) move checked items across. Panels stack vertically on mobile with rotated arrows. Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';

const all = ['Read projects', 'Edit projects', 'Delete projects', 'Invite members', 'Manage billing', 'View analytics', 'Export data', 'Manage API keys'];

function Panel({ title, items, checked, toggle, toggleAll }: { title: string; items: string[]; checked: string[]; toggle: (item: string) => void; toggleAll: (items: string[]) => void }) {
  const [query, setQuery] = useState('');
  const shown = items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  const picked = shown.filter((item) => checked.includes(item));

  return (
    <div className="flex h-72 w-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <label className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800">
        <input type="checkbox" checked={shown.length > 0 && picked.length === shown.length} onChange={() => toggleAll(shown)} className="accent-teal-600" />
        <span className="font-medium text-zinc-900 dark:text-zinc-100">{title}</span>
        <span className="ml-auto text-xs text-zinc-500">{picked.length}/{items.length}</span>
      </label>
      <div className="flex items-center gap-2 border-b border-zinc-100 px-3 py-1.5 dark:border-zinc-900"><Search aria-hidden className="size-3.5 text-zinc-400" /><input aria-label={`Search ${title.toLowerCase()}`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="w-full bg-transparent text-xs text-zinc-900 outline-none dark:text-zinc-100" /></div>
      <ul className="flex-1 overflow-y-auto p-1" data-lenis-prevent>
        {shown.map((item) => <li key={item}><label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"><input type="checkbox" checked={checked.includes(item)} onChange={() => toggle(item)} className="accent-teal-600" />{item}</label></li>)}
        {!shown.length && <li className="py-6 text-center text-xs text-zinc-400">No items</li>}
      </ul>
    </div>
  );
}

export function TransferList() {
  const [selected, setSelected] = useState(['Read projects', 'View analytics']);
  const [checked, setChecked] = useState<string[]>(['Edit projects']);
  const available = all.filter((item) => !selected.includes(item));
  const toggle = (item: string) => setChecked((list) => (list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item]));
  const toggleAll = (items: string[]) => setChecked((list) => (items.every((item) => list.includes(item)) ? list.filter((item) => !items.includes(item)) : [...new Set([...list, ...items])]));
  const move = (toSelected: boolean) => {
    const from = toSelected ? available : selected;
    const moving = from.filter((item) => checked.includes(item));
    setSelected((list) => (toSelected ? [...list, ...moving] : list.filter((item) => !moving.includes(item))));
    setChecked((list) => list.filter((item) => !moving.includes(item)));
  };
  const button = 'grid size-8 place-items-center rounded-lg border border-zinc-300 bg-white text-zinc-700 disabled:opacity-30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200';

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row">
      <Panel title="Available" items={available} checked={checked} toggle={toggle} toggleAll={toggleAll} />
      <div className="flex gap-2 sm:flex-col">
        <button type="button" aria-label="Move to selected" disabled={!available.some((item) => checked.includes(item))} onClick={() => move(true)} className={button}><ChevronRight aria-hidden className="size-4 rotate-90 sm:rotate-0" /></button>
        <button type="button" aria-label="Move to available" disabled={!selected.some((item) => checked.includes(item))} onClick={() => move(false)} className={button}><ChevronLeft aria-hidden className="size-4 rotate-90 sm:rotate-0" /></button>
      </div>
      <Panel title="Selected" items={selected} checked={checked} toggle={toggle} toggleAll={toggleAll} />
    </div>
  );
}
