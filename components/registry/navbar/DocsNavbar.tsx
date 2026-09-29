/**
 * @registry
 * name: Docs Navbar
 * category: Navbar
 * style: Dark
 * tags: recent
 * description: Navigation de documentation avec selecteur de version, recherche et etoiles GitHub.
 * prompt: Create a documentation navbar: logo + "Docs" label, a version <select> (v3.2, v3.1, v2.x), a search trigger with ⌘K hint (full width on mobile as icon), and a GitHub stars pill. Light and dark mode.
 */
import { GitBranch, Search, Star } from 'lucide-react';

export function DocsNavbar() {
  return (
    <nav aria-label="Documentation" className="flex h-14 w-full max-w-5xl items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
      <span className="font-semibold text-zinc-900 dark:text-white">Orbit <span className="font-normal text-zinc-400">/ Docs</span></span>
      <label className="sr-only" htmlFor="docs-version">Version</label>
      <select id="docs-version" className="rounded-md border border-zinc-200 bg-transparent px-2 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
        <option>v3.2</option><option>v3.1</option><option>v2.x</option>
      </select>
      <button type="button" className="ml-auto hidden h-9 w-64 items-center gap-2 rounded-lg bg-zinc-100 px-3 text-sm text-zinc-500 transition hover:bg-zinc-200 sm:flex dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800">
        <Search aria-hidden className="size-4" /> Search docs
        <kbd className="ml-auto rounded border border-zinc-300 px-1.5 font-mono text-[10px] dark:border-zinc-700">⌘K</kbd>
      </button>
      <button type="button" aria-label="Search docs" className="ml-auto grid size-9 place-items-center rounded-lg text-zinc-600 sm:hidden dark:text-zinc-300"><Search className="size-5" /></button>
      <a href="#" className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900">
        <GitBranch aria-hidden className="size-4" /> GitHub <Star aria-hidden className="size-3.5 fill-amber-400 text-amber-400" /> 18.2k
      </a>
    </nav>
  );
}
