/**
 * @registry
 * name: Double Deck Navbar
 * category: Navbar
 * style: Minimal
 * tags: recent
 * description: Navigation à deux étages : barre utilitaire (aide, langue, connexion) au-dessus de la barre principale avec recherche.
 * prompt: Create a two-tier navbar for a large site: a slim dark utility bar (Help, Stores, Language, Sign in) above a white main bar with logo, category links, search field and cart; on mobile the utility bar keeps only Sign in, category links move behind a menu button (aria-expanded) that opens a panel, and search becomes full width below. Light and dark mode.
 */
'use client';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useId, useState } from 'react';

const categories = ['New', 'Women', 'Men', 'Home', 'Sale'];

export function DoubleDeckNavbar() {
  const uid = useId();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-end gap-5 bg-zinc-950 px-4 py-1.5 text-xs text-zinc-300">
        <a href="#help" className="hidden hover:text-white sm:inline">Help</a><a href="#stores" className="hidden hover:text-white sm:inline">Stores</a><span className="hidden sm:inline">🇫🇷 FR / EUR</span><a href="#signin" className="font-medium text-white">Sign in</a>
      </div>
      <div className="bg-white dark:bg-zinc-950">
        <nav aria-label="Main" className="flex items-center gap-4 px-4 py-3">
          <button type="button" aria-expanded={open} aria-controls={`${uid}-deck-menu`} aria-label="Categories" onClick={() => setOpen((value) => !value)} className="grid size-9 place-items-center rounded-lg text-zinc-700 md:hidden dark:text-zinc-200">{open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}</button>
          <span className="text-lg font-black tracking-tight text-zinc-950 dark:text-zinc-50">MAISON</span>
          <ul className="hidden gap-5 text-sm font-medium text-zinc-700 md:flex dark:text-zinc-300">{categories.map((category) => <li key={category}><a href={`#${category}`} className={`hover:text-zinc-950 dark:hover:text-white ${category === 'Sale' ? 'text-rose-600 dark:text-rose-400' : ''}`}>{category}</a></li>)}</ul>
          <label className="ml-auto hidden w-56 items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 sm:flex dark:bg-zinc-900"><Search aria-hidden className="size-4 text-zinc-400" /><input aria-label="Search products" placeholder="Search" className="w-full bg-transparent text-sm outline-none text-zinc-900 dark:text-zinc-100" /></label>
          <a href="#cart" aria-label="Cart, 2 items" className="relative ml-auto grid size-9 place-items-center rounded-lg text-zinc-700 sm:ml-0 dark:text-zinc-200"><ShoppingCart aria-hidden className="size-5" /><span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-zinc-950 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-950">2</span></a>
        </nav>
        <label className="mx-4 mb-3 flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-2 sm:hidden dark:bg-zinc-900"><Search aria-hidden className="size-4 text-zinc-400" /><input aria-label="Search products" placeholder="Search" className="w-full bg-transparent text-sm outline-none text-zinc-900 dark:text-zinc-100" /></label>
        {open && <ul id={`${uid}-deck-menu`} className="border-t border-zinc-200 px-4 py-2 md:hidden dark:border-zinc-800">{categories.map((category) => <li key={category}><a href={`#${category}`} className="block py-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">{category}</a></li>)}</ul>}
      </div>
    </header>
  );
}
