/**
 * @registry
 * name: Tabs Overflow Menu
 * category: Menu
 * style: SaaS
 * tags: recent
 * description: Barre d'onglets qui range les onglets en trop dans un menu « Plus » et les ramène quand on les choisit.
 * prompt: Create a tab bar with overflow: the first 3 tabs are visible, the rest live in a "More" dropdown (aria-haspopup, in flow); choosing a tab from More swaps it into the visible row as the active tab and pushes the last visible tab into the menu. Active tab has an underline; tablist semantics on the row. defaultOpen prop shows the menu for previews. Light and dark mode.
 */
'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function TabsOverflowMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [visible, setVisible] = useState(['Overview', 'Activity', 'Members']);
  const [hidden, setHidden] = useState(['Billing', 'Integrations', 'API keys', 'Audit log']);
  const [active, setActive] = useState('Overview');
  const [open, setOpen] = useState(defaultOpen);

  function promote(tab: string) {
    const last = visible[visible.length - 1];
    setVisible([...visible.slice(0, -1), tab]);
    setHidden([last, ...hidden.filter((item) => item !== tab)]);
    setActive(tab);
    setOpen(false);
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800">
        <div role="tablist" aria-label="Settings sections" className="flex">
          {visible.map((tab) => <button key={tab} type="button" role="tab" aria-selected={active === tab} onClick={() => setActive(tab)} className={`-mb-px whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium ${active === tab ? 'border-teal-600 text-zinc-900 dark:text-zinc-100' : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}>{tab}</button>)}
        </div>
        <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">More<ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} /></button>
      </div>
      {open && (
        <div role="menu" aria-label="More sections" className="ml-auto mt-1.5 w-44 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          {hidden.map((tab) => <button key={tab} type="button" role="menuitem" onClick={() => promote(tab)} className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800">{tab}</button>)}
        </div>
      )}
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">Showing <strong className="text-zinc-900 dark:text-zinc-100">{active}</strong> settings.</p>
    </div>
  );
}
