/**
 * @registry
 * name: Assignee Picker Menu
 * category: Menu
 * style: SaaS
 * tags: recent
 * description: Menu d'assignation multi-personnes : recherche, « m'assigner », suggestions récentes, statut de présence, charge de travail et avatars empilés.
 * prompt: Create an assignee picker menu (open by default) from an avatar-stack trigger: a search field, an "Assign to me" shortcut, a "Suggested" section and an "Everyone" section; each person row is a menuitemcheckbox with avatar initials, presence dot (online, away, offline), name and a workload hint ("3 open tasks", amber when > 5); multiple people can be selected and they appear stacked on the trigger with "+N"; Arrow keys move, Escape closes. Light and dark mode.
 */
'use client';
import { Check, UserPlus } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

const people = [['Awa Diop', 'online', 3, true], ['Leo Martin', 'away', 7, true], ['Mei Tanaka', 'online', 2, false], ['Kofi Mensah', 'offline', 5, false], ['Inès Romero', 'online', 1, false], ['Noah Kim', 'away', 6, false]] as const;
const presence = { online: 'bg-emerald-500', away: 'bg-amber-400', offline: 'bg-zinc-400' };

export function AssigneePickerMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>(['Leo Martin', 'Mei Tanaka', 'Inès Romero']);
  const menuRef = useRef<HTMLDivElement>(null);
  const list = people.filter(([name]) => name.toLowerCase().includes(query.toLowerCase()));
  const initials = (name: string) => name.split(' ').map((part) => part[0]).join('');
  const toggle = (name: string) => setSelected((value) => (value.includes(name) ? value.filter((item) => item !== name) : [...value, name]));

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') { setOpen(false); return; }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]') ?? []);
    const index = items.indexOf(document.activeElement as HTMLElement);
    items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus();
  }

  const row = (name: string, status: keyof typeof presence, load: number) => (
    <button key={name} type="button" role="menuitemcheckbox" aria-checked={selected.includes(name)} onClick={() => toggle(name)} className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm text-zinc-800 hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800">
      <span className="relative grid size-7 place-items-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">{initials(name)}<span className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-white dark:ring-zinc-900 ${presence[status]}`}><span className="sr-only">{status}</span></span></span>
      <span className="flex-1">{name}<span className={`block text-[11px] ${load > 5 ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-500'}`}>{load} open tasks</span></span>
      {selected.includes(name) && <Check aria-hidden className="size-4 text-indigo-600 dark:text-indigo-400" />}
    </button>
  );

  return (
    <div className="w-72">
      <button type="button" aria-haspopup="menu" aria-expanded={open} aria-label={`Assignees: ${selected.join(', ') || 'none'}`} onClick={() => setOpen(!open)} className="flex items-center rounded-full border border-zinc-200 bg-white py-1 pl-1 pr-3 dark:border-zinc-800 dark:bg-zinc-950">
        <span className="flex -space-x-2">{selected.slice(0, 3).map((name) => <span key={name} className="grid size-7 place-items-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-950">{initials(name)}</span>)}{selected.length > 3 && <span className="grid size-7 place-items-center rounded-full bg-zinc-200 text-[10px] font-bold ring-2 ring-white dark:bg-zinc-700 dark:ring-zinc-950">+{selected.length - 3}</span>}{!selected.length && <span className="grid size-7 place-items-center rounded-full border border-dashed border-zinc-300 text-zinc-400"><UserPlus aria-hidden className="size-3.5" /></span>}</span>
        <span className="ml-2 text-xs text-zinc-600 dark:text-zinc-400">{selected.length ? `${selected.length} assigned` : 'Assign'}</span>
      </button>
      {open && (
        <div ref={menuRef} onKeyDown={onKeyDown} className="mt-2 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <input aria-label="Search people" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people" className="w-full rounded-md bg-zinc-100 px-2.5 py-1.5 text-sm text-zinc-900 outline-none dark:bg-zinc-800 dark:text-zinc-100" />
          <div role="menu" aria-label="Assignees" className="mt-1">
            {!query && <button type="button" role="menuitem" onClick={() => toggle('Awa Diop')} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50 focus:bg-indigo-50 focus:outline-none dark:text-indigo-300 dark:hover:bg-indigo-500/10 dark:focus:bg-indigo-500/10"><UserPlus aria-hidden className="size-4" />{selected.includes('Awa Diop') ? 'Unassign me' : 'Assign to me'}</button>}
            {!query && <p className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Suggested</p>}
            {(query ? [] : list.filter((person) => person[3])).map(([name, status, load]) => row(name, status, load))}
            <p className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{query ? 'Results' : 'Everyone'}</p>
            {(query ? list : list.filter((person) => !person[3])).map(([name, status, load]) => row(name, status, load))}
            {!list.length && <p className="px-2 py-3 text-sm text-zinc-500">No one found</p>}
          </div>
        </div>
      )}
    </div>
  );
}
