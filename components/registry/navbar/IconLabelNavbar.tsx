/**
 * @registry
 * name: Icon Label Navbar
 * category: Navbar
 * style: SaaS
 * tags: recent
 * description: Barre d'icônes compacte dont le libellé de l'onglet actif se déplie dans une pastille qui s'élargit.
 * prompt: Create an icon navbar where only the active item shows its label: items are icon buttons (aria-label, aria-current), and the active one expands into a pill with the label next to the icon using a width transition; a notification dot on one item; works as a top bar on desktop and stays compact on mobile. Light and dark mode.
 */
'use client';
import { Bell, Compass, Home, MessageCircle, User, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

const items: [LucideIcon, string, string][] = [[Home, 'Home', 'bg-teal-100 text-teal-800 dark:bg-teal-400/15 dark:text-teal-200'], [Compass, 'Explore', 'bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-200'], [MessageCircle, 'Messages', 'bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-200'], [Bell, 'Alerts', 'bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200'], [User, 'Profile', 'bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-200']];

export function IconLabelNavbar() {
  const [active, setActive] = useState('Explore');

  return (
    <nav aria-label="Main" className="flex w-fit items-center gap-1 rounded-full border border-zinc-200 bg-white p-1.5 shadow-lg shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-950">
      {items.map(([Icon, label, tone]) => {
        const on = active === label;
        return (
          <a key={label} href={`#${label.toLowerCase()}`} aria-label={on ? undefined : label} aria-current={on ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(label); }} className={`relative flex h-10 items-center rounded-full px-3 transition-all duration-300 ${on ? tone : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900'}`}>
            <Icon aria-hidden className="size-5 shrink-0" />
            <span className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 ${on ? 'ml-2 max-w-24 opacity-100' : 'max-w-0 opacity-0'}`}>{label}</span>
            {label === 'Alerts' && <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-950"><span className="sr-only"> (new)</span></span>}
          </a>
        );
      })}
    </nav>
  );
}
