/**
 * @registry
 * name: Floating Island Sidebar
 * category: Sidebar
 * style: Glass
 * tags: recent
 * description: Barre latérale flottante en îlots vitrés séparés (navigation, projets, profil) au-dessus d'un fond coloré.
 * prompt: Create a floating sidebar made of three separate glass islands stacked with gaps over a colorful gradient canvas: a navigation island with icon + label links and an active indicator, a projects island with colored dots and an add button, and a profile island at the bottom with avatar and status; each island has backdrop blur and a hairline border. Light and dark mode.
 */
'use client';
import { Compass, LayoutGrid, MessageSquare, Plus, Star, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

const nav: [LucideIcon, string][] = [[LayoutGrid, 'Overview'], [Compass, 'Discover'], [MessageSquare, 'Messages'], [Star, 'Starred']];
const projects = [['Atlas', 'bg-teal-400'], ['Beacon', 'bg-amber-400'], ['Cobalt', 'bg-indigo-400']];

export function FloatingIslandSidebar() {
  const [active, setActive] = useState('Discover');
  const island = 'rounded-2xl border border-white/60 bg-white/60 p-2 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/60';

  return (
    <div className="flex h-[28rem] w-full max-w-md gap-3 rounded-3xl bg-[radial-gradient(circle_at_20%_20%,#a7f3d0,transparent_45%),radial-gradient(circle_at_80%_70%,#c4b5fd,transparent_45%),linear-gradient(#f8fafc,#f8fafc)] p-3 dark:bg-[radial-gradient(circle_at_20%_20%,#064e3b,transparent_45%),radial-gradient(circle_at_80%_70%,#3b0764,transparent_45%),linear-gradient(#09090b,#09090b)]">
      <aside className="flex w-52 shrink-0 flex-col gap-3">
        <nav aria-label="Main" className={island}>
          <ul className="space-y-0.5">{nav.map(([Icon, label]) => <li key={label}><a href={`#${label.toLowerCase()}`} aria-current={active === label ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(label); }} className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm ${active === label ? 'bg-white font-medium text-zinc-900 shadow-sm dark:bg-white/10 dark:text-white' : 'text-zinc-600 hover:bg-white/50 dark:text-zinc-300 dark:hover:bg-white/5'}`}><Icon aria-hidden className="size-4" />{label}</a></li>)}</ul>
        </nav>
        <section aria-label="Projects" className={island}>
          <div className="flex items-center justify-between px-3 py-1"><span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Projects</span><button type="button" aria-label="Add project" className="grid size-6 place-items-center rounded-md text-zinc-500 hover:bg-white/60 dark:hover:bg-white/10"><Plus aria-hidden className="size-3.5" /></button></div>
          <ul>{projects.map(([name, dot]) => <li key={name}><a href={`#${name.toLowerCase()}`} className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-sm text-zinc-700 hover:bg-white/50 dark:text-zinc-300 dark:hover:bg-white/5"><span aria-hidden className={`size-2 rounded-full ${dot}`} />{name}</a></li>)}</ul>
        </section>
        <div className={`${island} mt-auto flex items-center gap-2.5 px-3 py-2.5`}>
          <span className="relative"><span aria-hidden className="block size-8 rounded-full bg-gradient-to-br from-pink-400 to-orange-300" /><span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" /></span>
          <span className="text-xs"><span className="block font-semibold text-zinc-900 dark:text-zinc-100">Zara Bello</span><span className="text-zinc-500">Available</span></span>
        </div>
      </aside>
      <div className={`${island} hidden flex-1 p-4 sm:block`}><p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{active}</p><div className="mt-3 space-y-2">{[80, 60, 70].map((width) => <div key={width} className="h-2 rounded bg-zinc-900/10 dark:bg-white/10" style={{ width: `${width}%` }} />)}</div></div>
    </div>
  );
}
