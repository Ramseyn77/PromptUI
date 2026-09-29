/**
 * @registry
 * name: Collapsible Icon Sidebar
 * category: Sidebar
 * style: SaaS
 * tags: featured, recent
 * description: Barre laterale qui se replie en rail d icones avec info-bulles et animation de largeur.
 * prompt: Create an app sidebar that collapses from 240px to a 64px icon rail (button with aria-expanded and aria-label), animating width; labels fade out when collapsed and each icon link gets a title tooltip; active item highlighted with aria-current. Light and dark mode.
 */
'use client';
import { BarChart3, FolderKanban, Home, Inbox, PanelLeftClose, PanelLeftOpen, Settings, Users } from 'lucide-react';
import { useState } from 'react';

const items = [
  { icon: Home, label: 'Home' },
  { icon: Inbox, label: 'Inbox', badge: 4 },
  { icon: FolderKanban, label: 'Projects' },
  { icon: BarChart3, label: 'Reports' },
  { icon: Users, label: 'Team' },
  { icon: Settings, label: 'Settings' },
];

export function CollapsibleIconSidebar() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState('Home');

  return (
    <aside className={`flex h-96 flex-col rounded-2xl border border-zinc-200 bg-white p-3 transition-[width] duration-300 dark:border-zinc-800 dark:bg-zinc-950 ${open ? 'w-60' : 'w-16'}`}>
      <div className="flex items-center justify-between">
        <span className={`overflow-hidden whitespace-nowrap font-semibold text-zinc-900 transition-all dark:text-white ${open ? 'w-auto px-2 opacity-100' : 'w-0 opacity-0'}`}>Acme</span>
        <button type="button" aria-expanded={open} aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'} onClick={() => setOpen((value) => !value)} className="grid size-9 shrink-0 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          {open ? <PanelLeftClose className="size-4" /> : <PanelLeftOpen className="size-4" />}
        </button>
      </div>
      <nav aria-label="Main" className="mt-4 flex-1 space-y-1">
        {items.map(({ icon: Icon, label, badge }) => (
          <a key={label} href="#" title={open ? undefined : label} aria-current={active === label ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(label); }} className={`relative flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${active === label ? 'bg-teal-500/10 text-teal-700 dark:text-teal-300' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'}`}>
            <Icon aria-hidden className="size-4 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity ${open ? 'opacity-100' : 'sr-only'}`}>{label}</span>
            {badge && <span className={`rounded-full bg-teal-600 px-1.5 text-[10px] font-bold text-white ${open ? 'ml-auto' : 'absolute right-1.5 top-1.5'}`}>{badge}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
