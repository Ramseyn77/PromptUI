/**
 * @registry
 * name: Search Hero
 * category: Hero
 * style: Minimal
 * tags: recent
 * description: Hero de centre d aide avec grande recherche et suggestions populaires cliquables.
 * prompt: Create a help-center hero: headline, a large search input with a search icon and keyboard hint, and clickable "Popular" suggestion chips that fill the input. Accessible label, focus ring, light and dark mode.
 */
'use client';
import { Search } from 'lucide-react';
import { useState } from 'react';

const suggestions = ['Reset password', 'Invite teammates', 'Billing & invoices', 'API keys'];

export function SearchHero() {
  const [query, setQuery] = useState('');

  return (
    <section className="w-full max-w-4xl rounded-3xl bg-gradient-to-b from-teal-50 to-white px-6 py-14 text-center dark:from-teal-950/40 dark:to-zinc-950">
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">How can we help?</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">Search 400+ guides or ask the team.</p>
      <form role="search" onSubmit={(event) => event.preventDefault()} className="mx-auto mt-8 max-w-xl">
        <label htmlFor="help-search" className="sr-only">Search the help center</label>
        <div className="flex h-14 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 shadow-lg shadow-zinc-950/5 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/15 dark:border-zinc-800 dark:bg-zinc-900">
          <Search aria-hidden className="size-5 text-zinc-400" />
          <input id="help-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles…" className="min-w-0 flex-1 bg-transparent text-base text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white" />
          <kbd className="hidden rounded-md border border-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-500 sm:block dark:border-zinc-700">⌘K</kbd>
        </div>
      </form>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Popular:</span>
        {suggestions.map((item) => (
          <button key={item} type="button" onClick={() => setQuery(item)} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-teal-500 hover:text-teal-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-teal-300">
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
