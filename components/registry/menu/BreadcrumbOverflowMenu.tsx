/**
 * @registry
 * name: Breadcrumb Overflow Menu
 * category: Menu
 * style: Minimal
 * tags: recent
 * description: Fil d'Ariane long replié en « … » qui ouvre un menu avec les niveaux intermédiaires.
 * prompt: Create a long breadcrumb that collapses middle levels into an ellipsis button (aria-haspopup="menu", aria-expanded, aria-label "Show hidden path") opening a small menu of the hidden levels with folder icons; first and last two levels stay visible, current page has aria-current. defaultOpen prop. Light and dark mode.
 */
'use client';
import { ChevronRight, Folder } from 'lucide-react';
import { useState } from 'react';

const path = ['Workspace', 'Clients', 'Lumen', 'Brand 2026', 'Web', 'Homepage'];

export function BreadcrumbOverflowMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const hidden = path.slice(1, -2);
  const separator = <ChevronRight aria-hidden className="size-4 shrink-0 text-zinc-400" />;

  return (
    <nav aria-label="Breadcrumb" className="w-full max-w-lg">
      <ol className="flex items-center gap-1.5 text-sm">
        <li><a href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">{path[0]}</a></li>
        {separator}
        <li className="relative">
          <button type="button" aria-label="Show hidden path" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="rounded-md px-1.5 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">…</button>
          {open && (
            <ul role="menu" className="absolute left-0 top-full z-10 mt-2 w-44 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
              {hidden.map((level) => <li key={level} role="none"><a href="#" role="menuitem" className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"><Folder aria-hidden className="size-4 text-zinc-400" />{level}</a></li>)}
            </ul>
          )}
        </li>
        {path.slice(-2).map((level, index) => (
          <li key={level} className="flex items-center gap-1.5">
            {separator}
            <a href="#" aria-current={index === 1 ? 'page' : undefined} className={index === 1 ? 'font-semibold text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}>{level}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
