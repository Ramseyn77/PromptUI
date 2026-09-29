/**
 * @registry
 * name: Workspace Switcher Sidebar
 * category: Sidebar
 * style: Minimal
 * tags: recent
 * description: Barre laterale avec selecteur d espace de travail deroulant en haut et navigation groupee.
 * prompt: Create a sidebar with a workspace switcher at the top (logo tile, name, plan, chevrons; opens a listbox of workspaces with check and "Create workspace"), then grouped navigation sections with small uppercase headings. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { Check, ChevronsUpDown, FileText, LayoutDashboard, Plus, Settings, Users } from 'lucide-react';
import { useState } from 'react';

const workspaces = [['Acme', 'bg-teal-600', 'Pro'], ['Personal', 'bg-violet-600', 'Free'], ['Side project', 'bg-amber-500', 'Free']];

export function WorkspaceSwitcherSidebar({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [current, setCurrent] = useState('Acme');
  const workspace = workspaces.find(([name]) => name === current)!;

  return (
    <aside className="relative w-64 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-white dark:hover:bg-zinc-800">
        <span className={`grid size-8 place-items-center rounded-lg text-sm font-bold text-white ${workspace[1]}`}>{workspace[0][0]}</span>
        <span className="flex-1"><span className="block text-sm font-semibold text-zinc-900 dark:text-white">{workspace[0]}</span><span className="block text-xs text-zinc-500">{workspace[2]} plan</span></span>
        <ChevronsUpDown aria-hidden className="size-4 text-zinc-400" />
      </button>
      {open && (
        <ul role="listbox" aria-label="Workspaces" className="absolute inset-x-3 top-16 z-10 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          {workspaces.map(([name, color]) => (
            <li key={name} role="option" aria-selected={current === name}>
              <button type="button" onClick={() => { setCurrent(name); setOpen(false); }} className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"><span className={`size-5 rounded-md ${color}`} />{name}{current === name && <Check aria-hidden className="ml-auto size-4 text-teal-600" />}</button>
            </li>
          ))}
          <li className="mt-1 border-t border-zinc-200 pt-1 dark:border-zinc-800"><button type="button" className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"><Plus aria-hidden className="size-4" />Create workspace</button></li>
        </ul>
      )}
      <nav aria-label="Workspace" className="mt-4 space-y-5">
        {[['General', [[LayoutDashboard, 'Dashboard'], [FileText, 'Documents']]], ['Admin', [[Users, 'Members'], [Settings, 'Settings']]]].map(([title, links]) => (
          <div key={title as string}>
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{title as string}</p>
            <ul className="mt-1.5 space-y-0.5">
              {(links as Array<[typeof Users, string]>).map(([Icon, label]) => <li key={label}><a href="#" className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-zinc-700 hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-800"><Icon aria-hidden className="size-4 text-zinc-400" />{label}</a></li>)}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
