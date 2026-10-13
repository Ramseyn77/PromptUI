/**
 * @registry
 * name: Marketplace Navbar
 * category: Navbar
 * style: SaaS
 * tags: recent
 * description: Navbar e-commerce à deux niveaux : livraison, recherche avec sélecteur de catégorie, favoris, panier avec compteur et rangée de catégories défilante.
 * prompt: Create a two-row marketplace navbar: top row with logo, a "Deliver to Lagos" location button, a search field with a category select prefix and search button, wishlist and cart icon buttons with count badges, and an account link; bottom row a horizontally scrollable list of categories with "Deals" highlighted; on mobile the search moves to its own full-width row and the category row stays scrollable. Light and dark mode.
 */
'use client';
import { Heart, MapPin, Search, ShoppingCart, User } from 'lucide-react';
import { useId, useState } from 'react';

const categories = ['Deals', 'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports', 'Books', 'Toys', 'Groceries', 'Auto'];

export function MarketplaceNavbar() {
  const uid = useId();
  const [category, setCategory] = useState('All');
  const [active, setActive] = useState('Deals');
  const search = (
    <form role="search" onSubmit={(event) => event.preventDefault()} className="flex h-10 min-w-0 flex-1 overflow-hidden rounded-lg ring-2 ring-amber-400">
      <label htmlFor={`${uid}-cat`} className="sr-only">Category</label>
      <select id={`${uid}-cat`} value={category} onChange={(event) => setCategory(event.target.value)} className="max-w-24 border-r border-zinc-200 bg-zinc-100 px-2 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"><option>All</option>{categories.slice(1).map((item) => <option key={item}>{item}</option>)}</select>
      <input type="search" aria-label="Search products" placeholder="Search products, brands…" className="min-w-0 flex-1 bg-white px-3 text-sm text-zinc-900 outline-none dark:bg-zinc-900 dark:text-zinc-100" />
      <button type="submit" aria-label="Search" className="grid w-11 place-items-center bg-amber-400 text-zinc-950 hover:bg-amber-300"><Search aria-hidden className="size-4" /></button>
    </form>
  );

  return (
    <header className="w-full bg-white dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <a href="#" className="text-xl font-black tracking-tight text-zinc-950 dark:text-white">mar<span className="text-amber-500">ket</span></a>
        <button type="button" className="hidden items-center gap-1 rounded-md px-2 py-1 text-left text-xs text-zinc-600 hover:bg-zinc-100 lg:flex dark:text-zinc-300 dark:hover:bg-zinc-800"><MapPin aria-hidden className="size-4" /><span>Deliver to<strong className="block text-sm text-zinc-950 dark:text-white">Lagos</strong></span></button>
        <div className="hidden min-w-0 flex-1 md:flex">{search}</div>
        <nav aria-label="Account" className="ml-auto flex items-center gap-1">
          <a href="#" aria-label="Account" className="grid size-10 place-items-center rounded-full text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"><User aria-hidden className="size-5" /></a>
          <a href="#" aria-label="Wishlist, 4 items" className="relative grid size-10 place-items-center rounded-full text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"><Heart aria-hidden className="size-5" /><span aria-hidden className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">4</span></a>
          <a href="#" aria-label="Cart, 2 items" className="relative grid size-10 place-items-center rounded-full text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"><ShoppingCart aria-hidden className="size-5" /><span aria-hidden className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-amber-400 text-[10px] font-bold text-zinc-950">2</span></a>
        </nav>
      </div>
      <div className="px-4 pb-3 md:hidden">{search}</div>
      <nav aria-label="Categories" className="border-t border-zinc-200 dark:border-zinc-800">
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2" data-lenis-prevent>
          {categories.map((item) => <li key={item} className="shrink-0"><a href="#" aria-current={active === item ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(item); }} className={`block rounded-full px-3 py-1.5 text-sm ${item === 'Deals' ? 'font-semibold text-rose-600 dark:text-rose-400' : 'text-zinc-700 dark:text-zinc-300'} ${active === item ? 'bg-zinc-100 dark:bg-zinc-800' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}>{item}</a></li>)}
        </ul>
      </nav>
    </header>
  );
}
