/**
 * @registry
 * name: App Header Navbar
 * category: Navbar
 * style: SaaS
 * tags: recent
 * description: En-tete d application avec fil d Ariane, recherche, notifications et avatar.
 * prompt: Create an application header: breadcrumb (Workspace / Projects / Website), a search field (hidden below md, replaced by an icon button), notification bell with unread dot, and avatar. aria-label on icon buttons. Light and dark mode.
 */
import { Bell, ChevronRight, Search } from 'lucide-react';

export function AppHeaderNavbar() {
  return (
    <header className="flex h-16 w-full max-w-5xl items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
      <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
        <ol className="flex items-center gap-1.5 text-sm">
          {['Workspace', 'Projects', 'Website'].map((crumb, index, all) => (
            <li key={crumb} className="flex min-w-0 items-center gap-1.5">
              {index > 0 && <ChevronRight aria-hidden className="size-4 shrink-0 text-zinc-400" />}
              <a href="#" aria-current={index === all.length - 1 ? 'page' : undefined} className={`truncate ${index === all.length - 1 ? 'font-semibold text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}`}>{crumb}</a>
            </li>
          ))}
        </ol>
      </nav>
      <label className="hidden h-9 w-56 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-zinc-400 focus-within:border-teal-500 md:flex dark:border-zinc-800">
        <Search aria-hidden className="size-4" />
        <input placeholder="Search…" aria-label="Search" className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none dark:text-white" />
      </label>
      <button type="button" aria-label="Search" className="grid size-9 place-items-center rounded-lg text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-300 dark:hover:bg-zinc-900"><Search className="size-5" /></button>
      <button type="button" aria-label="Notifications, 3 unread" className="relative grid size-9 place-items-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">
        <Bell className="size-5" />
        <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-950" />
      </button>
      <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-xs font-bold text-white">LM</span>
    </header>
  );
}
