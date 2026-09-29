/**
 * @registry
 * name: Dual Pane Sidebar
 * category: Sidebar
 * style: Dark
 * tags: featured, recent
 * description: Rail d icones sombre combine a un panneau secondaire dont le contenu change selon la section.
 * prompt: Create a dual-pane sidebar: a narrow dark icon rail (sections with aria-current and title tooltips) and a secondary light panel listing the selected section's sub-links with a heading; switching sections swaps the panel content. Light and dark mode.
 */
'use client';
import { BarChart3, Boxes, MessageSquare, Settings } from 'lucide-react';
import { useState } from 'react';

const sections = {
  Products: { icon: Boxes, links: ['All products', 'Collections', 'Inventory', 'Gift cards'] },
  Analytics: { icon: BarChart3, links: ['Overview', 'Live view', 'Reports'] },
  Inbox: { icon: MessageSquare, links: ['All messages', 'Assigned to me', 'Archived'] },
  Settings: { icon: Settings, links: ['Store details', 'Payments', 'Shipping', 'Users'] },
} as const;

export function DualPaneSidebar() {
  const [section, setSection] = useState<keyof typeof sections>('Products');

  return (
    <div className="flex h-96 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <nav aria-label="Sections" className="flex w-16 flex-col items-center gap-2 bg-zinc-950 py-4">
        <span className="mb-3 grid size-9 place-items-center rounded-xl bg-teal-400 text-sm font-bold text-teal-950">S</span>
        {(Object.keys(sections) as Array<keyof typeof sections>).map((name) => {
          const Icon = sections[name].icon;
          return <button key={name} type="button" title={name} aria-label={name} aria-current={section === name ? 'page' : undefined} onClick={() => setSection(name)} className={`grid size-10 place-items-center rounded-xl transition ${section === name ? 'bg-white/15 text-white' : 'text-zinc-500 hover:bg-white/10 hover:text-zinc-200'}`}><Icon className="size-5" /></button>;
        })}
      </nav>
      <div className="w-52 bg-white p-4 dark:bg-zinc-900">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{section}</h3>
        <ul className="mt-3 space-y-0.5">{sections[section].links.map((link, index) => <li key={link}><a href="#" aria-current={index === 0 ? 'page' : undefined} className={`block rounded-lg px-2.5 py-1.5 text-sm ${index === 0 ? 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-white' : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/60'}`}>{link}</a></li>)}</ul>
      </div>
    </div>
  );
}
