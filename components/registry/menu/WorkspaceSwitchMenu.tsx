/**
 * @registry
 * name: Workspace Switch Menu
 * category: Menu
 * style: Dark
 * tags: recent
 * description: Menu de changement d'espace de travail avec logos, rôle, raccourcis ⌘1-3 et bouton créer.
 * prompt: Create a workspace switcher menu on a dark surface: trigger shows the current workspace logo, name and plan; the menu (in flow) lists workspaces with colored initials, member count, role and ⌘1–⌘3 shortcut hints, a check on the current one, then "Create workspace" and "Join with code" actions. menuitemradio semantics. defaultOpen prop for previews. Dark in both themes.
 */
'use client';
import { Check, ChevronsUpDown, Plus, Ticket } from 'lucide-react';
import { useState } from 'react';

const spaces = [
  { name: 'Acme Inc.', role: 'Owner', members: 24, color: 'bg-teal-500', plan: 'Business' },
  { name: 'Side Project', role: 'Admin', members: 3, color: 'bg-violet-500', plan: 'Free' },
  { name: 'Design Guild', role: 'Member', members: 128, color: 'bg-amber-500', plan: 'Pro' },
];

export function WorkspaceSwitchMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [current, setCurrent] = useState('Acme Inc.');
  const active = spaces.find((space) => space.name === current)!;

  return (
    <div className="w-72 rounded-2xl bg-zinc-950 p-2 text-white ring-1 ring-white/10">
      <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-white/5">
        <span className={`grid size-9 place-items-center rounded-lg text-sm font-bold ${active.color}`}>{active.name[0]}</span>
        <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{active.name}</span><span className="block text-xs text-zinc-400">{active.plan} plan</span></span>
        <ChevronsUpDown aria-hidden className="size-4 text-zinc-500" />
      </button>
      {open && (
        <div role="menu" aria-label="Workspaces" className="mt-1 border-t border-white/10 pt-1">
          {spaces.map((space, index) => (
            <button key={space.name} type="button" role="menuitemradio" aria-checked={current === space.name} onClick={() => setCurrent(space.name)} className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-white/5 focus-visible:bg-white/10 focus-visible:outline-none">
              <span className={`grid size-7 place-items-center rounded-md text-xs font-bold ${space.color}`}>{space.name[0]}</span>
              <span className="min-w-0 flex-1"><span className="block truncate text-sm">{space.name}</span><span className="block text-[11px] text-zinc-500">{space.role} · {space.members} members</span></span>
              {current === space.name ? <Check aria-hidden className="size-4 text-teal-400" /> : <kbd className="font-mono text-[10px] text-zinc-500">⌘{index + 1}</kbd>}
            </button>
          ))}
          <div role="separator" className="my-1 h-px bg-white/10" />
          <button type="button" role="menuitem" className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-zinc-300 hover:bg-white/5"><span className="grid size-7 place-items-center rounded-md border border-dashed border-white/20"><Plus aria-hidden className="size-4" /></span>Create workspace</button>
          <button type="button" role="menuitem" className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-zinc-300 hover:bg-white/5"><span className="grid size-7 place-items-center rounded-md border border-white/10"><Ticket aria-hidden className="size-4" /></span>Join with code</button>
        </div>
      )}
    </div>
  );
}
