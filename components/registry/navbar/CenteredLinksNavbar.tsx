/**
 * @registry
 * name: Centered Links Navbar
 * category: Navbar
 * style: Minimal
 * tags: recent
 * description: Barre de navigation avec liens centres, connexion et CTA, menu mobile accessible.
 * prompt: Create a navbar with logo left, centered links (hidden below md), "Log in" link and CTA right, plus a md:hidden menu button (aria-expanded, aria-controls) opening a stacked panel. Active link underlined. Light and dark mode.
 */
'use client';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = ['Product', 'Solutions', 'Pricing', 'Docs'];

export function CenteredLinksNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full max-w-5xl rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <nav className="flex h-16 items-center justify-between px-4 sm:px-6" aria-label="Main">
        <a href="#" className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white"><span className="grid size-7 place-items-center rounded-lg bg-teal-600 text-xs text-white">N</span>Northwind</a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link, index) => (
            <li key={link}><a href="#" aria-current={index === 0 ? 'page' : undefined} className="text-sm font-medium text-zinc-600 underline-offset-8 transition hover:text-zinc-900 aria-[current=page]:text-zinc-900 aria-[current=page]:underline dark:text-zinc-400 dark:hover:text-white dark:aria-[current=page]:text-white">{link}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#" className="hidden text-sm font-medium text-zinc-700 sm:block dark:text-zinc-300">Log in</a>
          <a href="#" className="rounded-lg bg-zinc-950 px-3.5 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Sign up</a>
          <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="centered-nav-menu" onClick={() => setOpen((value) => !value)} className="grid size-9 place-items-center rounded-lg text-zinc-700 hover:bg-zinc-100 md:hidden dark:text-zinc-300 dark:hover:bg-zinc-900">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul id="centered-nav-menu" className="grid gap-1 border-t border-zinc-200 p-3 md:hidden dark:border-zinc-800">
          {links.map((link) => <li key={link}><a href="#" className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">{link}</a></li>)}
        </ul>
      )}
    </header>
  );
}
