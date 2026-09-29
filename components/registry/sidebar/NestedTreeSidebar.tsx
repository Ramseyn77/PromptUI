/**
 * @registry
 * name: Nested Tree Sidebar
 * category: Sidebar
 * style: Minimal
 * tags: recent
 * description: Navigation laterale a sous-menus depliables avec ligne de rattachement et element actif.
 * prompt: Create a sidebar with collapsible groups: parent buttons (aria-expanded, chevron rotation) reveal indented child links connected by a vertical guide line; the active child is highlighted and its group open by default. Smooth grid-rows height animation. Light and dark mode.
 */
'use client';
import { BookOpen, ChevronRight, Code2, Palette } from 'lucide-react';
import { useState } from 'react';

const groups = [
  { icon: BookOpen, label: 'Getting started', children: ['Introduction', 'Installation', 'Theming'] },
  { icon: Palette, label: 'Design', children: ['Colors', 'Typography', 'Spacing'] },
  { icon: Code2, label: 'Components', children: ['Button', 'Dialog', 'Tabs', 'Toast'] },
];

export function NestedTreeSidebar() {
  const [open, setOpen] = useState<string[]>(['Components']);
  const [active, setActive] = useState('Dialog');

  return (
    <nav aria-label="Documentation" className="w-64 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
      {groups.map(({ icon: Icon, label, children }) => {
        const expanded = open.includes(label);
        return (
          <div key={label}>
            <button type="button" aria-expanded={expanded} onClick={() => setOpen((current) => (expanded ? current.filter((item) => item !== label) : [...current, label]))} className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900">
              <Icon aria-hidden className="size-4 text-zinc-400" />{label}<ChevronRight aria-hidden className={`ml-auto size-4 text-zinc-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <ul className="ml-4 overflow-hidden border-l border-zinc-200 pl-3 dark:border-zinc-800">
                {children.map((child) => (
                  <li key={child}><a href="#" tabIndex={expanded ? 0 : -1} aria-current={active === child ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(child); }} className={`-ml-px block border-l-2 py-1.5 pl-3 text-sm ${active === child ? 'border-teal-500 font-medium text-teal-700 dark:text-teal-300' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}`}>{child}</a></li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
