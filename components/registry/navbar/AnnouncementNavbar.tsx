/**
 * @registry
 * name: Announcement Navbar
 * category: Navbar
 * style: Gradient
 * tags: recent
 * description: Navigation surmontée d'une bannière d'annonce en dégradé que l'on peut fermer.
 * prompt: Create a navbar topped by a dismissible gradient announcement bar (message + link + close button with aria-label). Below it, logo, links (hidden below md with a menu button) and CTA. Light and dark mode.
 */
'use client';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function AnnouncementNavbar() {
  const [banner, setBanner] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      {banner && (
        <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 via-sky-600 to-violet-600 px-10 py-2 text-center text-xs font-medium text-white sm:text-sm">
          <span>Series A: we raised $18M to build the future of support.</span>
          <a href="#" className="hidden font-semibold underline underline-offset-2 sm:inline">Read more</a>
          <button type="button" aria-label="Dismiss announcement" onClick={() => setBanner(false)} className="absolute right-3 grid size-6 place-items-center rounded-md hover:bg-white/20"><X className="size-4" /></button>
        </div>
      )}
      <nav aria-label="Main" className="flex h-16 items-center justify-between px-5">
        <span className="font-bold text-zinc-900 dark:text-white">Helix</span>
        <ul className="hidden gap-7 text-sm font-medium text-zinc-600 md:flex dark:text-zinc-400">
          {['Features', 'Customers', 'Pricing', 'Blog'].map((link) => <li key={link}><a href="#" className="hover:text-zinc-900 dark:hover:text-white">{link}</a></li>)}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#" className="rounded-lg bg-zinc-950 px-3.5 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Book a demo</a>
          <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid size-9 place-items-center rounded-lg text-zinc-700 md:hidden dark:text-zinc-300"><Menu className="size-5" /></button>
        </div>
      </nav>
      {open && <ul className="grid gap-1 border-t border-zinc-200 p-3 text-sm font-medium md:hidden dark:border-zinc-800">{['Features', 'Customers', 'Pricing', 'Blog'].map((link) => <li key={link}><a href="#" className="block rounded-lg px-3 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">{link}</a></li>)}</ul>}
    </header>
  );
}
