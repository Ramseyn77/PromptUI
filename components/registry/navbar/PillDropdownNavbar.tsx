/**
 * @registry
 * name: Pill Dropdown Navbar
 * category: Navbar
 * style: Glass
 * tags: recent
 * description: Navigation en pilule vitrée dont les entrées ouvrent des panneaux déroulants riches qui glissent de l'une à l'autre.
 * prompt: Create a glass pill navbar with three dropdown triggers (Product, Solutions, Resources) and a CTA; hovering or clicking a trigger opens a shared panel below (in flow) whose content swaps with a slide direction based on which trigger is to the left/right of the previous one; each panel has 2–4 icon links with descriptions; aria-expanded on triggers, Escape closes. defaultOpen shows Product for previews. Light and dark mode.
 */
'use client';
import { BarChart3, BookOpen, Building2, Code2, LifeBuoy, Rocket, Users, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

const menus: Record<string, [LucideIcon, string, string][]> = {
  Product: [[BarChart3, 'Analytics', 'Understand every visit'], [Code2, 'API', 'Build on our platform'], [Rocket, 'Launches', 'Ship and announce']],
  Solutions: [[Building2, 'Enterprise', 'SSO, SLAs, audit'], [Users, 'Startups', 'Credits and support']],
  Resources: [[BookOpen, 'Docs', 'Guides and references'], [LifeBuoy, 'Help center', 'Answers in minutes']],
};
const order = Object.keys(menus);

export function PillDropdownNavbar({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ? 'Product' : null);
  const [direction, setDirection] = useState(0);

  const show = (name: string) => { if (open) setDirection(order.indexOf(name) - order.indexOf(open)); setOpen(name); };

  return (
    <div className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-sky-100 to-violet-100 p-4 dark:from-sky-950/50 dark:to-violet-950/50" onKeyDown={(event) => { if (event.key === 'Escape') setOpen(null); }}>
      <style>{`@keyframes pui-panel-right{from{opacity:0;transform:translateX(24px)}}@keyframes pui-panel-left{from{opacity:0;transform:translateX(-24px)}}`}</style>
      <nav aria-label="Main" className="mx-auto flex w-fit items-center gap-1 rounded-full border border-white/60 bg-white/60 p-1 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
        <span className="px-3 text-sm font-bold text-zinc-900 dark:text-white">orbit</span>
        {order.map((name) => <button key={name} type="button" aria-expanded={open === name} onMouseEnter={() => show(name)} onClick={() => (open === name ? setOpen(null) : show(name))} className={`rounded-full px-3 py-1.5 text-sm ${open === name ? 'bg-white text-zinc-950 shadow-sm dark:bg-white/15 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>{name}</button>)}
        <a href="#start" className="rounded-full bg-zinc-950 px-3 py-1.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Start</a>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-md overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80">
          <ul key={open} className={`grid gap-1 sm:grid-cols-2 ${direction >= 0 ? 'motion-safe:animate-[pui-panel-right_.25s_ease-out]' : 'motion-safe:animate-[pui-panel-left_.25s_ease-out]'}`}>
            {menus[open].map(([Icon, title, text]) => <li key={title}><a href={`#${title.toLowerCase()}`} className="flex gap-3 rounded-xl p-2.5 hover:bg-white dark:hover:bg-white/5"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"><Icon aria-hidden className="size-4" /></span><span><span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</span><span className="block text-xs text-zinc-500">{text}</span></span></a></li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
