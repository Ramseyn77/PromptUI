/**
 * @registry
 * name: Shortcuts Help Popover
 * category: Tooltips
 * style: Dark
 * tags: recent
 * description: Popover d'aide des raccourcis clavier groupés par section, avec filtre et bascule Mac / Windows des touches.
 * prompt: Create a keyboard shortcuts help popover (open by default) triggered by a "?" button: dark panel with a filter input, a Mac/Windows segmented toggle that swaps ⌘/Ctrl and ⌥/Alt in key caps, shortcuts grouped by section (General, Navigation, Editing) as description lists with kbd caps; filtering hides empty sections and shows "No shortcuts match"; Escape closes. Dark in both themes.
 */
'use client';
import { useState } from 'react';

const sections = {
  General: [['Search', ['Mod', 'K']], ['Show shortcuts', ['?']], ['Toggle theme', ['Mod', 'Shift', 'L']]],
  Navigation: [['Go to inbox', ['G', 'I']], ['Go to projects', ['G', 'P']], ['Next item', ['J']], ['Previous item', ['K']]],
  Editing: [['Bold', ['Mod', 'B']], ['Duplicate', ['Mod', 'D']], ['Move line up', ['Alt', '↑']], ['Undo', ['Mod', 'Z']]],
} as const;

export function ShortcutsHelpPopover({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState('');
  const [mac, setMac] = useState(true);
  const label = (key: string) => (key === 'Mod' ? (mac ? '⌘' : 'Ctrl') : key === 'Alt' ? (mac ? '⌥' : 'Alt') : key === 'Shift' ? (mac ? '⇧' : 'Shift') : key);
  const filtered = Object.entries(sections).map(([name, items]) => [name, items.filter(([text]) => text.toLowerCase().includes(query.toLowerCase()))] as const).filter(([, items]) => items.length);

  return (
    <div className="w-full max-w-sm">
      <button type="button" aria-label="Keyboard shortcuts" aria-expanded={open} onClick={() => setOpen(!open)} className="grid size-8 place-items-center rounded-full bg-zinc-900 text-sm font-bold text-white ring-1 ring-white/10 dark:bg-zinc-800">?</button>
      {open && (
        <div role="dialog" aria-label="Keyboard shortcuts" onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }} className="mt-2 rounded-2xl bg-zinc-950 p-4 text-white shadow-2xl ring-1 ring-white/10">
          <div className="flex items-center gap-2">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter shortcuts" aria-label="Filter shortcuts" className="min-w-0 flex-1 rounded-lg bg-white/5 px-3 py-1.5 text-sm outline-none ring-1 ring-white/10 placeholder:text-zinc-500 focus:ring-white/30" />
            <div role="group" aria-label="Keyboard layout" className="flex rounded-lg bg-white/5 p-0.5 text-xs">{[['Mac', true], ['Win', false]].map(([name, value]) => <button key={name as string} type="button" aria-pressed={mac === value} onClick={() => setMac(value as boolean)} className={`rounded-md px-2 py-1 ${mac === value ? 'bg-white text-zinc-900' : 'text-zinc-400'}`}>{name as string}</button>)}</div>
          </div>
          <div className="mt-3 max-h-64 space-y-4 overflow-y-auto pr-1" data-lenis-prevent>
            {filtered.map(([name, items]) => (
              <section key={name}>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{name}</h4>
                <dl className="mt-1.5 space-y-1">
                  {items.map(([text, keys]) => <div key={text} className="flex items-center justify-between text-sm"><dt className="text-zinc-300">{text}</dt><dd className="flex gap-1">{keys.map((key) => <kbd key={key} className="min-w-6 rounded-md border border-white/15 border-b-2 bg-white/5 px-1.5 text-center font-mono text-xs leading-5">{label(key)}</kbd>)}</dd></div>)}
                </dl>
              </section>
            ))}
            {!filtered.length && <p className="py-4 text-center text-sm text-zinc-500">No shortcuts match “{query}”</p>}
          </div>
        </div>
      )}
    </div>
  );
}
