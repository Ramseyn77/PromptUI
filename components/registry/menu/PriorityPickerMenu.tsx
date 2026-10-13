/**
 * @registry
 * name: Priority Picker Menu
 * category: Menu
 * style: Dark
 * tags: recent
 * description: Menu de priorité façon gestionnaire de tickets : icônes de barres, raccourcis numériques 0–4, élément courant coché et application sur une liste.
 * prompt: Create a dark priority picker like Linear: an issue row whose priority icon button opens an in-flow menu (open by default) with menuitemradio options — No priority, Urgent (red exclamation box), High / Medium / Low (3/2/1 filled signal bars) — each with its number shortcut 0–4 shown as a kbd; pressing a number while the menu is focused selects that priority; the current one has a check; the selection updates the row icon and a small toast "Priority set to High" (aria-live). Dark in both themes.
 */
'use client';
import { Check } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

const priorities = [{ key: '0', label: 'No priority', level: -1 }, { key: '1', label: 'Urgent', level: 4 }, { key: '2', label: 'High', level: 3 }, { key: '3', label: 'Medium', level: 2 }, { key: '4', label: 'Low', level: 1 }];

function Icon({ level }: { level: number }) {
  if (level === 4) return <span aria-hidden className="grid size-4 place-items-center rounded-[4px] bg-orange-500 text-[10px] font-black text-zinc-950">!</span>;
  if (level === -1) return <span aria-hidden className="flex size-4 items-center justify-center gap-0.5">{[0, 1, 2].map((dot) => <span key={dot} className="h-0.5 w-0.5 rounded-full bg-zinc-500" />)}</span>;
  return <span aria-hidden className="flex size-4 items-end gap-0.5">{[1, 2, 3].map((bar) => <span key={bar} className={`w-1 rounded-sm ${bar <= level ? 'bg-zinc-200' : 'bg-zinc-600'}`} style={{ height: `${bar * 33}%` }} />)}</span>;
}

export function PriorityPickerMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [value, setValue] = useState('2');
  const [toast, setToast] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const current = priorities.find((item) => item.key === value)!;

  function choose(key: string) {
    setValue(key);
    setToast(`Priority set to ${priorities.find((item) => item.key === key)!.label}`);
    setOpen(false);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') setOpen(false);
    if (/^[0-4]$/.test(event.key)) { event.preventDefault(); choose(event.key); }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitemradio"]') ?? []);
      const index = items.indexOf(document.activeElement as HTMLElement);
      items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus();
    }
  }

  return (
    <div className="w-full max-w-sm text-zinc-300">
      <div className="flex items-center gap-3 rounded-lg bg-zinc-950 px-3 py-2.5 text-sm ring-1 ring-white/10">
        <button type="button" aria-haspopup="menu" aria-expanded={open} aria-label={`Priority: ${current.label}`} onClick={() => setOpen(!open)} className="grid size-7 place-items-center rounded-md hover:bg-white/10"><Icon level={current.level} /></button>
        <span className="font-mono text-xs text-zinc-500">PUI-231</span>
        <span className="flex-1 truncate text-zinc-100">Keyboard shortcuts for every menu</span>
      </div>
      {open && (
        <div ref={menuRef} role="menu" aria-label="Set priority" onKeyDown={onKeyDown} className="mt-2 w-56 rounded-xl bg-zinc-900 p-1 text-sm shadow-2xl ring-1 ring-white/10">
          <p className="px-2.5 pb-1 pt-1.5 text-[11px] text-zinc-500">Set priority to…</p>
          {priorities.map((item) => <button key={item.key} type="button" role="menuitemradio" aria-checked={value === item.key} aria-keyshortcuts={item.key} onClick={() => choose(item.key)} className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left hover:bg-white/10 focus:bg-white/10 focus:outline-none"><Icon level={item.level} /><span className="flex-1 text-zinc-100">{item.label}</span>{value === item.key && <Check aria-hidden className="size-4" />}<kbd className="rounded bg-white/10 px-1 font-mono text-[10px] text-zinc-400">{item.key}</kbd></button>)}
        </div>
      )}
      <p aria-live="polite" className="mt-3 h-5 text-xs text-zinc-500">{toast}</p>
    </div>
  );
}
