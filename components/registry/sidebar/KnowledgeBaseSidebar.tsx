/**
 * @registry
 * name: Knowledge Base Sidebar
 * category: Sidebar
 * style: Editorial
 * tags: recent
 * description: Barre latérale de centre d'aide : sélecteur de produit, recherche avec raccourci, catégories dépliables et articles lus.
 * prompt: Create a help-center sidebar: product switcher select at the top, a search field with "/" shortcut hint that filters article titles live (matching text highlighted with mark), collapsible categories (details/summary) with article counts, read articles shown with a check, and the current article marked aria-current. Light and dark mode.
 */
'use client';
import { Check, Search } from 'lucide-react';
import { useState } from 'react';

const categories = {
  'Getting started': ['Create your account', 'Invite your team', 'Import data'],
  Billing: ['Change your plan', 'Download invoices', 'Refund policy'],
  Integrations: ['Connect Slack', 'Webhooks', 'API keys'],
};
const read = new Set(['Create your account', 'Invite your team']);

export function KnowledgeBaseSidebar() {
  const [query, setQuery] = useState('');
  const [current, setCurrent] = useState('Import data');

  const mark = (title: string) => {
    if (!query) return title;
    const start = title.toLowerCase().indexOf(query.toLowerCase());
    if (start < 0) return title;
    return <>{title.slice(0, start)}<mark className="rounded bg-amber-200 text-inherit dark:bg-amber-500/40">{title.slice(start, start + query.length)}</mark>{title.slice(start + query.length)}</>;
  };

  return (
    <aside className="w-72 rounded-2xl border border-zinc-200 bg-[#fcfcfa] p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <label className="text-xs text-zinc-500">Product<select className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"><option>Acme Cloud</option><option>Acme Mobile</option></select></label>
      <label className="mt-3 flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"><Search aria-hidden className="size-4 text-zinc-400" /><input aria-label="Search articles" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles" className="w-full bg-transparent text-sm text-zinc-900 outline-none dark:text-zinc-100" /><kbd className="rounded border border-zinc-200 px-1 font-mono text-[10px] text-zinc-500 dark:border-zinc-700">/</kbd></label>
      <nav aria-label="Help articles" className="mt-4 space-y-2">
        {Object.entries(categories).map(([category, articles]) => {
          const shown = articles.filter((title) => title.toLowerCase().includes(query.toLowerCase()));
          if (!shown.length) return null;
          return (
            <details key={category} open className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-1 py-1 font-serif text-sm font-semibold text-zinc-900 dark:text-zinc-100">{category}<span className="font-sans text-xs font-normal text-zinc-400">{shown.length}</span></summary>
              <ul className="ml-1 mt-1 space-y-0.5 border-l border-zinc-200 pl-3 dark:border-zinc-800">
                {shown.map((title) => <li key={title}><a href={`#${title}`} aria-current={current === title ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setCurrent(title); }} className={`flex items-center gap-2 rounded-md px-2 py-1 text-sm ${current === title ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50'}`}><span className="flex-1">{mark(title)}</span>{read.has(title) && <Check aria-label="Read" className="size-3.5 text-emerald-500" />}</a></li>)}
              </ul>
            </details>
          );
        })}
      </nav>
    </aside>
  );
}
