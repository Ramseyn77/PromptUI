/**
 * @registry
 * name: Filter Tabs Table
 * category: Tables
 * style: SaaS
 * tags: featured, recent
 * description: Tableau de projets avec onglets de filtre compteurs, recherche et état vide.
 * prompt: Create a projects table with filter tabs (All, Active, Paused, Archived) showing live counts, a search input, and a filtered body; when nothing matches show an empty state row with a "Clear filters" button. Light and dark mode.
 */
'use client';
import { Search } from 'lucide-react';
import { useState } from 'react';

const projects = [
  { name: 'Website redesign', owner: 'Léa', status: 'Active' },
  { name: 'Mobile onboarding', owner: 'Noah', status: 'Active' },
  { name: 'Billing migration', owner: 'Inès', status: 'Paused' },
  { name: 'Legacy dashboard', owner: 'Tom', status: 'Archived' },
  { name: 'AI assistant', owner: 'Léa', status: 'Active' },
];
const tabs = ['All', 'Active', 'Paused', 'Archived'];

export function FilterTabsTable() {
  const [tab, setTab] = useState('All');
  const [query, setQuery] = useState('');
  const count = (name: string) => projects.filter((project) => name === 'All' || project.status === name).length;
  const rows = projects.filter((project) => (tab === 'All' || project.status === tab) && project.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-3 border-b border-zinc-200 p-3 sm:flex-row sm:items-center dark:border-zinc-800">
        <div role="tablist" aria-label="Status" className="flex gap-1 overflow-x-auto">
          {tabs.map((name) => (
            <button key={name} type="button" role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition ${tab === name ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}`}>
              {name} <span className="ml-1 text-xs text-zinc-400">{count(name)}</span>
            </button>
          ))}
        </div>
        <label className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 sm:ml-auto sm:w-52 dark:border-zinc-800">
          <Search aria-hidden className="size-4 text-zinc-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search projects" className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none dark:text-white" />
        </label>
      </div>
      <table className="w-full text-left text-sm">
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {rows.map((project) => (
            <tr key={project.name}>
              <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">{project.name}</td>
              <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">{project.owner}</td>
              <td className="px-4 py-3 text-right text-xs text-zinc-500 dark:text-zinc-400">{project.status}</td>
            </tr>
          ))}
          {!rows.length && (
            <tr><td colSpan={3} className="px-4 py-10 text-center"><p className="text-sm font-medium text-zinc-900 dark:text-white">No projects found</p><button type="button" onClick={() => { setTab('All'); setQuery(''); }} className="mt-2 text-sm text-teal-700 hover:underline dark:text-teal-400">Clear filters</button></td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
