/**
 * @registry
 * name: Centered Search Navbar
 * category: Navbar
 * style: Minimal
 * tags: recent
 * description: Navigation de place de marché avec grande recherche centrale, filtre de catégorie intégré et suggestions récentes.
 * prompt: Create a marketplace navbar: logo left, a wide centered search with an embedded category select on the left and a round search button on the right; focusing the input shows a recent-searches dropdown in flow (clearable chips); right side has "Sell" link and avatar; on mobile the search wraps to a full-width second row. Light and dark mode.
 */
'use client';
import { Clock, Search, X } from 'lucide-react';
import { useState } from 'react';

export function CenteredSearchNavbar() {
  const [focused, setFocused] = useState(false);
  const [recent, setRecent] = useState(['vintage camera', 'standing desk', 'bike helmet']);

  return (
    <header className="w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
      <nav aria-label="Main" className="flex flex-wrap items-center gap-3">
        <span className="font-black tracking-tight text-emerald-600">tradeup</span>
        <form role="search" onSubmit={(event) => event.preventDefault()} className="order-last flex w-full items-center rounded-full border border-zinc-300 bg-white pl-1 focus-within:border-emerald-500 sm:order-none sm:mx-auto sm:w-auto sm:flex-1 sm:max-w-lg dark:border-zinc-700 dark:bg-zinc-900">
          <select aria-label="Category" className="rounded-full bg-zinc-100 px-2 py-1.5 text-xs text-zinc-700 outline-none dark:bg-zinc-800 dark:text-zinc-200"><option>All</option><option>Electronics</option><option>Home</option><option>Sports</option></select>
          <input aria-label="Search listings" onFocus={() => setFocused(true)} onBlur={() => window.setTimeout(() => setFocused(false), 150)} placeholder="What are you looking for?" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none dark:text-zinc-100" />
          <button type="submit" aria-label="Search" className="m-1 grid size-8 place-items-center rounded-full bg-emerald-600 text-white"><Search aria-hidden className="size-4" /></button>
        </form>
        <a href="#sell" className="ml-auto text-sm font-semibold text-zinc-800 sm:ml-0 dark:text-zinc-200">Sell</a>
        <span aria-hidden className="size-8 rounded-full bg-gradient-to-br from-emerald-300 to-sky-500" />
      </nav>
      {focused && recent.length > 0 && (
        <div className="mx-auto mt-2 max-w-lg rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800">
          <p className="flex items-center justify-between text-xs text-zinc-500">Recent searches<button type="button" onMouseDown={(event) => { event.preventDefault(); setRecent([]); }} className="font-medium text-emerald-700 dark:text-emerald-400">Clear all</button></p>
          <ul className="mt-2 flex flex-wrap gap-1.5">{recent.map((term) => <li key={term} className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"><Clock aria-hidden className="size-3" />{term}<button type="button" aria-label={`Remove ${term}`} onMouseDown={(event) => { event.preventDefault(); setRecent((list) => list.filter((item) => item !== term)); }}><X aria-hidden className="size-3" /></button></li>)}</ul>
        </div>
      )}
    </header>
  );
}
