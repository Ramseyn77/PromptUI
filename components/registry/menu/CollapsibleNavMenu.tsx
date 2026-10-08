/**
 * @registry
 * name: Collapsible Nav Menu
 * category: Menu
 * style: Minimal
 * tags: featured, recent
 * description: Menu vertical façon daisyUI avec sous-menus dépliables, badges de compteur et élément actif.
 * prompt: Create a daisyUI-style vertical menu: a titled list where some items expand into nested submenus (button with aria-expanded and a rotating chevron, grid-rows height transition), counters as small badges, an active item with a filled background, and a "New" badge on one item. Light and dark mode.
 */
'use client';
import { ChevronRight, FileText, Folder, Inbox, Settings } from 'lucide-react';
import { useState } from 'react';

export function CollapsibleNavMenu() {
  const [open, setOpen] = useState<Record<string, boolean>>({ Projects: true });
  const [active, setActive] = useState('Website redesign');
  const item = (name: string) => `flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm transition ${active === name ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'}`;
  const groups = { Projects: ['Website redesign', 'Mobile app', 'Brand refresh'], Documents: ['Specs', 'Contracts'] };

  return (
    <nav aria-label="Workspace" className="w-60 rounded-2xl border border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Workspace</p>
      <button type="button" onClick={() => setActive('Inbox')} className={item('Inbox')}><Inbox aria-hidden className="size-4" />Inbox<span className="ml-auto rounded-full bg-teal-600 px-1.5 text-[10px] font-semibold text-white">12</span></button>
      {(Object.keys(groups) as (keyof typeof groups)[]).map((group) => (
        <div key={group}>
          <button type="button" aria-expanded={!!open[group]} onClick={() => setOpen((value) => ({ ...value, [group]: !value[group] }))} className={item('')}>
            {group === 'Projects' ? <Folder aria-hidden className="size-4" /> : <FileText aria-hidden className="size-4" />}{group}
            <ChevronRight aria-hidden className={`ml-auto size-4 text-zinc-400 transition-transform ${open[group] ? 'rotate-90' : ''}`} />
          </button>
          <div className={`grid transition-[grid-template-rows] duration-200 ${open[group] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <ul className="ml-5 overflow-hidden border-l border-zinc-200 pl-2 dark:border-zinc-800">
              {groups[group].map((child) => <li key={child}><button type="button" tabIndex={open[group] ? 0 : -1} onClick={() => setActive(child)} className={item(child)}>{child}{child === 'Brand refresh' && <span className="ml-auto rounded bg-violet-100 px-1 text-[10px] font-semibold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">New</span>}</button></li>)}
            </ul>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => setActive('Settings')} className={item('Settings')}><Settings aria-hidden className="size-4" />Settings</button>
    </nav>
  );
}
