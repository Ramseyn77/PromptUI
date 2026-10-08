/**
 * @registry
 * name: Icon Select Menu
 * category: Menu
 * style: Minimal
 * tags: recent
 * description: Liste déroulante personnalisée avec icônes et descriptions, navigation clavier et sélection.
 * prompt: Create a custom select (button with aria-haspopup="listbox" + listbox) for issue status: options with colored status icons and descriptions, the trigger shows the selected icon/label, ArrowUp/Down move the active option, Enter/Space select, Escape closes, Home/End jump. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { Check, ChevronsUpDown, Circle, CircleCheck, CircleDashed, CircleDot } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

const statuses = [
  { label: 'Backlog', text: 'Not planned yet', icon: CircleDashed, tone: 'text-zinc-400' },
  { label: 'Todo', text: 'Ready to start', icon: Circle, tone: 'text-zinc-500' },
  { label: 'In progress', text: 'Someone is on it', icon: CircleDot, tone: 'text-amber-500' },
  { label: 'Done', text: 'Shipped', icon: CircleCheck, tone: 'text-emerald-500' },
];

export function IconSelectMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [value, setValue] = useState(2);
  const [active, setActive] = useState(2);
  const current = statuses[value];

  function onKey(event: KeyboardEvent) {
    if (!open && (event.key === 'ArrowDown' || event.key === 'Enter')) { event.preventDefault(); setOpen(true); return; }
    if (event.key === 'ArrowDown') { event.preventDefault(); setActive((index) => Math.min(index + 1, statuses.length - 1)); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActive((index) => Math.max(index - 1, 0)); }
    if (event.key === 'Home') setActive(0);
    if (event.key === 'End') setActive(statuses.length - 1);
    if ((event.key === 'Enter' || event.key === ' ') && open) { event.preventDefault(); setValue(active); setOpen(false); }
    if (event.key === 'Escape') setOpen(false);
  }

  return (
    <div className="w-64">
      <p id="status-label" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Status</p>
      <button type="button" aria-haspopup="listbox" aria-expanded={open} aria-labelledby="status-label" aria-activedescendant={open ? `status-${active}` : undefined} onClick={() => setOpen((value) => !value)} onKeyDown={onKey} className="mt-1.5 flex w-full items-center gap-2.5 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-left text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
        <current.icon aria-hidden className={`size-4 ${current.tone}`} />{current.label}<ChevronsUpDown aria-hidden className="ml-auto size-4 text-zinc-400" />
      </button>
      {open && (
        <ul role="listbox" aria-labelledby="status-label" className="mt-1.5 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          {statuses.map((status, index) => (
            <li key={status.label} id={`status-${index}`} role="option" aria-selected={value === index} onMouseEnter={() => setActive(index)} onClick={() => { setValue(index); setOpen(false); }} className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 ${active === index ? 'bg-zinc-100 dark:bg-zinc-900' : ''}`}>
              <status.icon aria-hidden className={`size-4 ${status.tone}`} />
              <span><span className="block text-sm text-zinc-900 dark:text-white">{status.label}</span><span className="block text-xs text-zinc-500">{status.text}</span></span>
              {value === index && <Check aria-hidden className="ml-auto size-4 text-teal-600" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
