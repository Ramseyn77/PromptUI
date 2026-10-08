/**
 * @registry
 * name: Admin Groups Sidebar
 * category: Sidebar
 * style: SaaS
 * tags: recent
 * description: Barre latérale d'administration avec groupes repliables, badges, élément actif et carte de stockage en bas.
 * prompt: Create an admin sidebar: logo + workspace name header, collapsible groups (Overview, Commerce, Settings) with chevrons (aria-expanded) and items with icons, count badges and an active item with a left accent bar; a storage usage card at the bottom with a progress bar and Upgrade link; on mobile it is hidden behind a "Menu" button (aria-expanded) that reveals it as a panel. Light and dark mode.
 */
'use client';
import { BarChart3, Box, ChevronDown, CreditCard, Home, Menu, Settings, ShoppingBag, Users, type LucideIcon } from 'lucide-react';
import { useId, useState } from 'react';

const groups: [string, [LucideIcon, string, number?][]][] = [
  ['Overview', [[Home, 'Dashboard'], [BarChart3, 'Analytics']]],
  ['Commerce', [[ShoppingBag, 'Orders', 12], [Box, 'Products'], [Users, 'Customers', 3]]],
  ['Settings', [[CreditCard, 'Billing'], [Settings, 'General']]],
];

export function AdminGroupsSidebar() {
  const uid = useId();
  const [open, setOpen] = useState<Record<string, boolean>>({ Overview: true, Commerce: true, Settings: false });
  const [active, setActive] = useState('Orders');
  const [mobile, setMobile] = useState(false);

  return (
    <div className="w-full max-w-xs">
      <button type="button" aria-expanded={mobile} aria-controls={`${uid}-admin-groups-nav`} onClick={() => setMobile((value) => !value)} className="mb-2 inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 sm:hidden dark:border-zinc-700 dark:text-zinc-300"><Menu aria-hidden className="size-4" />Menu</button>
      <aside id={`${uid}-admin-groups-nav`} className={`${mobile ? 'flex' : 'hidden'} h-[30rem] w-64 flex-col rounded-2xl border border-zinc-200 bg-white p-3 sm:flex dark:border-zinc-800 dark:bg-zinc-950`}>
        <div className="flex items-center gap-2 px-2 py-1"><span className="grid size-8 place-items-center rounded-lg bg-teal-600 text-sm font-bold text-white">S</span><span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Shopfront</span></div>
        <nav aria-label="Admin" className="mt-4 flex-1 space-y-3 overflow-y-auto" data-lenis-prevent>
          {groups.map(([group, items]) => (
            <div key={group}>
              <button type="button" aria-expanded={open[group]} onClick={() => setOpen((value) => ({ ...value, [group]: !value[group] }))} className="flex w-full items-center justify-between px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{group}<ChevronDown aria-hidden className={`size-3.5 transition-transform ${open[group] ? '' : '-rotate-90'}`} /></button>
              {open[group] && (
                <ul className="mt-1 space-y-0.5">
                  {items.map(([Icon, label, count]) => (
                    <li key={label}><a href={`#${label.toLowerCase()}`} aria-current={active === label ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(label); }} className={`relative flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm ${active === label ? 'bg-teal-50 font-medium text-teal-800 dark:bg-teal-400/10 dark:text-teal-200' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'}`}>
                      {active === label && <span aria-hidden className="absolute -left-3 top-1.5 h-5 w-1 rounded-r bg-teal-600" />}
                      <Icon aria-hidden className="size-4" />{label}{count ? <span className="ml-auto rounded-full bg-zinc-200 px-1.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{count}</span> : null}
                    </a></li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">
          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Storage</p>
          <div className="mt-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800"><div className="h-full w-[72%] rounded-full bg-teal-500" /></div>
          <p className="mt-1.5 flex justify-between text-[11px] text-zinc-500"><span>7.2 of 10 GB</span><a href="#upgrade" className="font-semibold text-teal-700 dark:text-teal-400">Upgrade</a></p>
        </div>
      </aside>
    </div>
  );
}
