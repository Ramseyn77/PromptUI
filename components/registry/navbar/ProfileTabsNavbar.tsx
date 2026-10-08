/**
 * @registry
 * name: Profile Tabs Navbar
 * category: Navbar
 * style: Minimal
 * tags: recent
 * description: En-tête de profil social avec couverture, avatar, compteurs et onglets avec compte (Posts, Réponses, Médias, J'aime).
 * prompt: Create a social profile header navbar: a gradient cover, overlapping avatar, name, handle, bio, follower/following counts and a Follow button; below, a scrollable tab bar (tablist) Posts / Replies / Media / Likes with counts and an animated underline indicator that slides to the active tab; tab panel shows a placeholder for the active tab. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const tabs = [['Posts', 128], ['Replies', 342], ['Media', 56], ['Likes', 1204]] as const;

export function ProfileTabsNavbar() {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div aria-hidden className="h-28 bg-gradient-to-r from-amber-300 via-rose-400 to-violet-500" />
      <div className="px-5">
        <div className="flex items-end justify-between"><span aria-hidden className="-mt-10 size-20 rounded-full border-4 border-white bg-gradient-to-br from-sky-400 to-teal-500 dark:border-zinc-950" /><button type="button" className="rounded-full bg-zinc-950 px-4 py-1.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Follow</button></div>
        <h2 className="mt-2 text-lg font-bold text-zinc-950 dark:text-zinc-50">Kemi Adeyemi</h2>
        <p className="text-sm text-zinc-500">@kemi.builds</p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Product designer · building tools for small teams in Lagos.</p>
        <p className="mt-2 flex gap-4 text-sm text-zinc-500"><span><strong className="text-zinc-900 dark:text-zinc-100">1,284</strong> following</span><span><strong className="text-zinc-900 dark:text-zinc-100">18.2K</strong> followers</span></p>
      </div>
      <div role="tablist" aria-label="Profile sections" className="relative mt-4 flex overflow-x-auto border-b border-zinc-200 dark:border-zinc-800" data-lenis-prevent>
        {tabs.map(([label, count], index) => <button key={label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-w-24 flex-1 py-3 text-sm font-medium ${active === index ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}>{label} <span className="text-xs text-zinc-400">{count.toLocaleString('en-US')}</span></button>)}
        <span aria-hidden className="absolute bottom-0 h-0.5 rounded-full bg-teal-500 transition-all duration-300" style={{ left: `calc(${active * 25}% + 1.5rem)`, width: 'calc(25% - 3rem)' }} />
      </div>
      <div role="tabpanel" className="grid h-24 place-items-center text-sm text-zinc-400">{tabs[active][0]} will appear here.</div>
    </div>
  );
}
