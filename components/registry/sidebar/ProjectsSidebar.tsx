/**
 * @registry
 * name: Projects Sidebar
 * category: Sidebar
 * style: SaaS
 * tags: recent
 * description: Liste de projets avec pastilles de couleur, favoris epingles et creation rapide en ligne.
 * prompt: Create a projects sidebar: "Favorites" and "Projects" sections, each project with a colored square dot, name and a star toggle (aria-pressed) that pins it to Favorites; a "+" button reveals an inline input to add a project (Enter to save, Escape to cancel). Light and dark mode.
 */
'use client';
import { Plus, Star } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

type Project = { name: string; color: string; starred: boolean };
const palette = ['bg-teal-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-sky-500'];

export function ProjectsSidebar() {
  const [projects, setProjects] = useState<Project[]>([
    { name: 'Website v3', color: 'bg-teal-500', starred: true },
    { name: 'Mobile app', color: 'bg-violet-500', starred: false },
    { name: 'Brand refresh', color: 'bg-amber-500', starred: false },
  ]);
  const [adding, setAdding] = useState(false);

  function onKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') setAdding(false);
    if (event.key === 'Enter' && event.currentTarget.value.trim()) {
      const name = event.currentTarget.value.trim();
      setProjects((current) => [...current, { name, color: palette[current.length % palette.length], starred: false }]);
      setAdding(false);
    }
  }

  const row = (project: Project) => (
    <li key={project.name} className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">
      <span className={`size-2.5 rounded-[3px] ${project.color}`} /><a href="#" className="flex-1 truncate">{project.name}</a>
      <button type="button" aria-label={`${project.starred ? 'Unpin' : 'Pin'} ${project.name}`} aria-pressed={project.starred} onClick={() => setProjects((current) => current.map((item) => (item.name === project.name ? { ...item, starred: !item.starred } : item)))} className={`transition ${project.starred ? 'text-amber-500' : 'text-zinc-400 opacity-0 group-hover:opacity-100 focus:opacity-100'}`}><Star className={`size-3.5 ${project.starred ? 'fill-current' : ''}`} /></button>
    </li>
  );

  return (
    <aside className="w-60 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Favorites</p>
      <ul className="mt-1">{projects.filter((project) => project.starred).map(row)}</ul>
      <div className="mt-4 flex items-center justify-between px-2"><p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Projects</p><button type="button" aria-label="Add project" aria-expanded={adding} onClick={() => setAdding(true)} className="grid size-6 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"><Plus className="size-4" /></button></div>
      <ul className="mt-1">{projects.filter((project) => !project.starred).map(row)}</ul>
      {adding && <input autoFocus aria-label="New project name" placeholder="Project name" onKeyDown={onKey} onBlur={() => setAdding(false)} className="mt-1 h-8 w-full rounded-lg border border-teal-500 bg-transparent px-2 text-sm text-zinc-900 outline-none dark:text-white" />}
    </aside>
  );
}
