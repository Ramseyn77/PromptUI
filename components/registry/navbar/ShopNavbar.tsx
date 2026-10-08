/**
 * @registry
 * name: Shop Navbar
 * category: Navbar
 * style: Minimal
 * tags: recent
 * description: Navigation e-commerce avec catégories, recherche, favoris et panier avec compteur.
 * prompt: Create an e-commerce navbar: logo, category links (hidden below lg), icon buttons for search, wishlist and cart with an item-count badge; clicking "Add" demo increments the badge with a bump animation. aria-labels include counts. Light and dark mode.
 */
'use client';
import { Heart, Search, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export function ShopNavbar() {
  const [items, setItems] = useState(2);

  return (
    <div className="w-full max-w-5xl space-y-3">
      <nav aria-label="Shop" className="flex h-16 items-center gap-6 rounded-2xl border border-zinc-200 bg-white px-5 dark:border-zinc-800 dark:bg-zinc-950">
        <span className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">KIND.</span>
        <ul className="hidden gap-6 text-sm font-medium text-zinc-600 lg:flex dark:text-zinc-400">
          {['New in', 'Women', 'Men', 'Home', 'Sale'].map((link) => <li key={link}><a href="#" className={link === 'Sale' ? 'text-rose-600 dark:text-rose-400' : 'hover:text-zinc-900 dark:hover:text-white'}>{link}</a></li>)}
        </ul>
        <div className="ml-auto flex items-center gap-1">
          {[[Search, 'Search'], [Heart, 'Wishlist']].map(([Icon, label]) => {
            const IconComponent = Icon as typeof Search;
            return <button key={label as string} type="button" aria-label={label as string} className="grid size-10 place-items-center rounded-full text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"><IconComponent className="size-5" /></button>;
          })}
          <button type="button" aria-label={`Cart, ${items} items`} className="relative grid size-10 place-items-center rounded-full text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">
            <ShoppingBag className="size-5" />
            <span key={items} className="absolute right-1 top-1 grid min-w-4 place-items-center rounded-full bg-zinc-950 px-1 text-[10px] font-bold leading-4 text-white motion-safe:animate-[pui-bump_.3s_ease-out] dark:bg-white dark:text-zinc-950">{items}</span>
          </button>
        </div>
      </nav>
      <style>{`@keyframes pui-bump{50%{transform:scale(1.4)}}`}</style>
      <button type="button" onClick={() => setItems((value) => value + 1)} className="text-xs font-medium text-zinc-500 underline underline-offset-4 dark:text-zinc-400">Demo: add to cart</button>
    </div>
  );
}
