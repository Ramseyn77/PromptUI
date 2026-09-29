/**
 * @registry
 * name: Split Logo Navbar
 * category: Navbar
 * style: Editorial
 * tags: recent
 * description: Navigation symetrique avec logo au centre et liens de part et d autre.
 * prompt: Create a symmetrical editorial navbar: links on the left and right with the wordmark centered in a serif font (3-column grid), collapsing to logo + menu button below md. Hairline bottom border, light and dark mode.
 */
'use client';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function SplitLogoNavbar() {
  const [open, setOpen] = useState(false);
  const linkClass = 'text-xs font-semibold uppercase tracking-[.18em] text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white';

  return (
    <header className="w-full max-w-5xl rounded-2xl bg-[#faf8f3] px-5 dark:bg-zinc-950">
      <nav aria-label="Main" className="grid h-16 grid-cols-[1fr_auto_1fr] items-center border-b border-zinc-900/15 dark:border-white/15">
        <ul className="hidden gap-6 md:flex">{['Shop', 'Journal'].map((link) => <li key={link}><a href="#" className={linkClass}>{link}</a></li>)}</ul>
        <span className="md:hidden" />
        <a href="#" className="font-serif text-2xl italic text-zinc-900 dark:text-white">Maison</a>
        <div className="flex justify-end">
          <ul className="hidden gap-6 md:flex">{['About', 'Cart (2)'].map((link) => <li key={link}><a href="#" className={linkClass}>{link}</a></li>)}</ul>
          <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid size-9 place-items-center text-zinc-800 md:hidden dark:text-zinc-200"><Menu className="size-5" /></button>
        </div>
      </nav>
      {open && <ul className="grid gap-3 py-4 md:hidden">{['Shop', 'Journal', 'About', 'Cart (2)'].map((link) => <li key={link}><a href="#" className={linkClass}>{link}</a></li>)}</ul>}
    </header>
  );
}
