/**
 * @registry
 * name: Bottom Tab Bar
 * category: Navbar
 * style: SaaS
 * tags: featured, recent
 * description: Barre d'onglets mobile en bas d'écran avec indicateur actif et bouton central.
 * prompt: Create a mobile bottom tab bar: four tabs (icon + label) with the active tab tinted and a raised circular "+" action in the middle; aria-current on the active tab, safe-area padding. Light and dark mode.
 */
'use client';
import { Home, Plus, Search, User, Wallet } from 'lucide-react';
import { useState } from 'react';

const tabs = [
  { label: 'Home', icon: Home },
  { label: 'Search', icon: Search },
  { label: 'Wallet', icon: Wallet },
  { label: 'Profile', icon: User },
];

export function BottomTabBar() {
  const [active, setActive] = useState('Home');
  const tab = (item: (typeof tabs)[number]) => {
    const Icon = item.icon;
    return (
      <button key={item.label} type="button" aria-current={active === item.label ? 'page' : undefined} onClick={() => setActive(item.label)} className={`flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium transition ${active === item.label ? 'text-teal-600 dark:text-teal-400' : 'text-zinc-500 dark:text-zinc-400'}`}>
        <Icon aria-hidden className="size-5" />{item.label}
      </button>
    );
  };

  return (
    <nav aria-label="Primary" className="flex w-full max-w-sm items-center rounded-3xl border border-zinc-200 bg-white px-2 pb-[max(.5rem,env(safe-area-inset-bottom))] pt-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      {tabs.slice(0, 2).map(tab)}
      <button type="button" aria-label="Create" className="-mt-8 grid size-14 shrink-0 place-items-center rounded-full bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-4 ring-white transition active:scale-95 dark:ring-zinc-950"><Plus className="size-6" /></button>
      {tabs.slice(2).map(tab)}
    </nav>
  );
}
