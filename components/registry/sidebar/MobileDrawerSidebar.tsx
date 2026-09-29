/**
 * @registry
 * name: Mobile Drawer Sidebar
 * category: Sidebar
 * style: SaaS
 * tags: featured, recent
 * description: Navigation laterale qui devient un tiroir coulissant sur mobile avec fond assombri et Echap.
 * prompt: Create a responsive layout shell: on lg the sidebar is always visible; below lg a header "Menu" button (aria-expanded, aria-controls) slides the sidebar in as a drawer over a dimmed backdrop, closing on backdrop click, Escape or link click. Contained demo frame; light and dark mode.
 */
'use client';
import { Calendar, Home, Menu, MessageSquare, Settings, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [[Home, 'Home'], [Calendar, 'Calendar'], [MessageSquare, 'Messages'], [Settings, 'Settings']] as const;

export function MobileDrawerSidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const nav = (
    <nav aria-label="Main" className="space-y-1">
      {links.map(([Icon, label]) => <a key={label} href="#" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"><Icon aria-hidden className="size-4" />{label}</a>)}
    </nav>
  );

  return (
    <div className="relative flex h-80 w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <aside className="hidden w-56 shrink-0 border-r border-zinc-200 bg-white p-3 lg:block dark:border-zinc-800 dark:bg-zinc-950">{nav}</aside>
      <div className="flex-1">
        <header className="flex h-12 items-center gap-3 border-b border-zinc-200 bg-white px-3 lg:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <button type="button" aria-expanded={open} aria-controls="drawer-nav" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"><Menu aria-hidden className="size-4" /> Menu</button>
        </header>
        <p className="p-5 text-sm text-zinc-500 dark:text-zinc-400">Page content. Resize below lg to use the drawer.</p>
      </div>
      <div aria-hidden className={`absolute inset-0 bg-zinc-950/40 transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setOpen(false)} />
      <aside id="drawer-nav" aria-label="Mobile navigation" className={`absolute inset-y-0 left-0 w-60 bg-white p-3 shadow-2xl transition-transform duration-300 lg:hidden dark:bg-zinc-950 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-3 flex items-center justify-between"><span className="px-2 font-semibold text-zinc-900 dark:text-white">Menu</span><button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid size-8 place-items-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"><X className="size-4" /></button></div>
        {nav}
      </aside>
    </div>
  );
}
