/**
 * @registry
 * name: Glass Dock Sidebar
 * category: Sidebar
 * style: Glass
 * tags: featured, recent
 * description: Barre latérale flottante en verre, icônes qui grossissent au survol et étiquettes qui glissent.
 * prompt: Create a floating vertical glass dock sidebar over a colorful backdrop: rounded translucent pill with backdrop blur, icon buttons that scale up on hover/focus with a label sliding out to the right (tooltip role), and an active indicator dot. Light and dark mode.
 */
'use client';
import { Camera, Compass, Heart, Home, Search } from 'lucide-react';
import { useState } from 'react';

const items = [[Home, 'Home'], [Search, 'Search'], [Compass, 'Explore'], [Heart, 'Saved'], [Camera, 'Create']] as const;

export function GlassDockSidebar() {
  const [active, setActive] = useState('Home');

  return (
    <div className="flex h-96 w-full max-w-sm items-center rounded-3xl bg-[radial-gradient(circle_at_20%_20%,#5eead4,transparent_45%),radial-gradient(circle_at_80%_70%,#c4b5fd,transparent_50%),linear-gradient(#f4f4f5,#f4f4f5)] p-6 dark:bg-[radial-gradient(circle_at_20%_20%,#115e59,transparent_45%),radial-gradient(circle_at_80%_70%,#4c1d95,transparent_50%),linear-gradient(#09090b,#09090b)]">
      <nav aria-label="Main" className="flex flex-col gap-2 rounded-full border border-white/60 bg-white/50 p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
        {items.map(([Icon, label]) => (
          <div key={label} className="group relative">
            <button type="button" aria-label={label} aria-current={active === label ? 'page' : undefined} onClick={() => setActive(label)} className={`grid size-11 place-items-center rounded-full transition duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-110 focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${active === label ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'text-zinc-700 hover:bg-white/70 dark:text-zinc-200 dark:hover:bg-white/15'}`}>
              <Icon className="size-5" />
            </button>
            <span role="tooltip" className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-x-1 -translate-y-1/2 whitespace-nowrap rounded-lg bg-zinc-950 px-2 py-1 text-xs font-medium text-white opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 dark:bg-white dark:text-zinc-950">{label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
