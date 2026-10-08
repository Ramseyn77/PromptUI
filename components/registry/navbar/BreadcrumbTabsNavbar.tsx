/**
 * @registry
 * name: Breadcrumb Tabs Navbar
 * category: Navbar
 * style: Dark
 * tags: recent
 * description: En-tête de projet façon Vercel : fil d'Ariane avec sélecteurs, puis onglets du projet en dessous.
 * prompt: Create a Vercel-style project header on a dark surface: a top row with logo, breadcrumb segments (team / project) each with a chevrons switcher button and a "Pro" badge, plus Feedback and avatar on the right; a second row of tabs (Overview, Deployments, Analytics, Logs, Settings) with an active underline and hover pill; tabs scroll horizontally on mobile. Dark in both themes.
 */
'use client';
import { ChevronsUpDown, Slash } from 'lucide-react';
import { useState } from 'react';

const tabs = ['Overview', 'Deployments', 'Analytics', 'Logs', 'Settings'];

export function BreadcrumbTabsNavbar() {
  const [active, setActive] = useState('Deployments');

  return (
    <header className="w-full max-w-4xl rounded-2xl bg-black text-white ring-1 ring-white/10">
      <div className="flex items-center gap-2 px-4 pt-3">
        <span aria-hidden className="size-6 bg-white [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1 text-sm">
          <Slash aria-hidden className="size-4 -rotate-12 text-zinc-700" />
          <span className="flex items-center gap-1.5 truncate"><span aria-hidden className="size-5 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500" />Kora Labs<span className="rounded-full bg-white/10 px-1.5 text-[10px]">Pro</span></span>
          <button type="button" aria-label="Switch team" className="grid size-6 place-items-center rounded text-zinc-500 hover:bg-white/10"><ChevronsUpDown aria-hidden className="size-3.5" /></button>
          <Slash aria-hidden className="size-4 -rotate-12 text-zinc-700" />
          <span className="truncate font-medium">storefront</span>
          <button type="button" aria-label="Switch project" className="grid size-6 place-items-center rounded text-zinc-500 hover:bg-white/10"><ChevronsUpDown aria-hidden className="size-3.5" /></button>
        </nav>
        <button type="button" className="ml-auto hidden rounded-md border border-white/15 px-2.5 py-1 text-xs text-zinc-300 sm:block">Feedback</button>
        <span aria-hidden className="size-7 rounded-full bg-gradient-to-br from-pink-400 to-amber-300" />
      </div>
      <nav aria-label="Project" className="mt-2 flex overflow-x-auto px-2" data-lenis-prevent>
        {tabs.map((tab) => <a key={tab} href={`#${tab.toLowerCase()}`} aria-current={active === tab ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(tab); }} className={`relative whitespace-nowrap px-3 py-3 text-sm ${active === tab ? 'text-white' : 'text-zinc-400 hover:text-white'}`}><span className="rounded-md px-2 py-1 hover:bg-white/10">{tab}</span>{active === tab && <span aria-hidden className="absolute inset-x-3 bottom-0 h-0.5 bg-white" />}</a>)}
      </nav>
    </header>
  );
}
