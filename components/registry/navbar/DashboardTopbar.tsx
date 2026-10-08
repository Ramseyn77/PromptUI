/**
 * @registry
 * name: Dashboard Topbar
 * category: Navbar
 * style: SaaS
 * tags: recent
 * description: Barre supérieure d'application : recherche ⌘K, bouton créer, aide, notifications et profil, compacte sur mobile.
 * prompt: Create a dashboard top bar: page title with breadcrumb, a search field with ⌘K hint (collapses to an icon button on mobile that expands the field), a "New" primary button, help and notifications icon buttons with a dot badge, and an avatar button; all icon buttons have aria-labels. Light and dark mode.
 */
'use client';
import { Bell, ChevronRight, HelpCircle, Plus, Search } from 'lucide-react';
import { useState } from 'react';

export function DashboardTopbar() {
  const [searching, setSearching] = useState(false);
  const icon = 'grid size-9 shrink-0 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100';

  return (
    <header className="flex w-full max-w-4xl items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950">
      {!searching && (
        <nav aria-label="Breadcrumb" className="min-w-0 flex-1 sm:flex-none">
          <ol className="flex items-center gap-1 text-sm"><li className="hidden text-zinc-500 sm:block">Analytics</li><li aria-hidden className="hidden sm:block"><ChevronRight className="size-4 text-zinc-300" /></li><li aria-current="page" className="truncate font-semibold text-zinc-900 dark:text-zinc-100">Overview</li></ol>
        </nav>
      )}
      <label className={`${searching ? 'flex' : 'hidden'} min-w-0 flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 sm:ml-4 sm:flex dark:border-zinc-800 dark:bg-zinc-900`}>
        <Search aria-hidden className="size-4 text-zinc-400" />
        <input aria-label="Search" placeholder="Search…" onBlur={() => setSearching(false)} className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none dark:text-zinc-100" />
        <kbd className="hidden rounded border border-zinc-200 px-1 font-mono text-[10px] text-zinc-500 sm:block dark:border-zinc-700">⌘K</kbd>
      </label>
      {!searching && <button type="button" aria-label="Search" onClick={() => setSearching(true)} className={`${icon} sm:hidden`}><Search aria-hidden className="size-4" /></button>}
      <button type="button" className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-teal-600 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-teal-500"><Plus aria-hidden className="size-4" /><span className="hidden sm:inline">New</span><span className="sr-only sm:hidden">New</span></button>
      <button type="button" aria-label="Help" className={`${icon} hidden sm:grid`}><HelpCircle aria-hidden className="size-4" /></button>
      <button type="button" aria-label="Notifications, 3 unread" className={`${icon} relative`}><Bell aria-hidden className="size-4" /><span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-950" /></button>
      <button type="button" aria-label="Account" className="size-8 shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 ring-2 ring-white dark:ring-zinc-950" />
    </header>
  );
}
