/**
 * @registry
 * name: Sticky CTA Navbar
 * category: Navbar
 * style: SaaS
 * tags: recent
 * description: Navbar collante qui se compacte après défilement et fait apparaître un bouton d'action principal et une barre de progression de lecture.
 * prompt: Create a sticky navbar inside a scrollable demo page (data-lenis-prevent): at the top it is tall and transparent with logo, links and a ghost Sign in; after 60px of scroll it shrinks, gains a blurred background and border, the "Start free trial" CTA slides in from the right and a thin reading progress bar appears under it; scroll position is tracked on the container; links collapse into a menu button with aria-expanded below md. Light and dark mode.
 */
'use client';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function StickyCtaNavbar() {
  const [scroll, setScroll] = useState({ top: 0, progress: 0 });
  const [menu, setMenu] = useState(false);
  const compact = scroll.top > 60;

  return (
    <div className="relative h-[26rem] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" onScroll={(event) => { const node = event.currentTarget; setScroll({ top: node.scrollTop, progress: node.scrollTop / Math.max(1, node.scrollHeight - node.clientHeight) }); }} data-lenis-prevent>
      <header className={`sticky top-0 z-10 transition-all duration-300 ${compact ? 'border-b border-zinc-200 bg-white/80 py-2 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80' : 'py-5'}`}>
        <div className="flex items-center gap-6 px-5">
          <a href="#" className={`font-bold tracking-tight text-zinc-950 transition-all dark:text-white ${compact ? 'text-base' : 'text-xl'}`}>Flowly</a>
          <nav aria-label="Main" className="hidden gap-5 text-sm text-zinc-600 md:flex dark:text-zinc-400">{['Features', 'Pricing', 'Customers', 'Docs'].map((link) => <a key={link} href="#" className="hover:text-zinc-950 dark:hover:text-white">{link}</a>)}</nav>
          <div className="ml-auto flex items-center gap-2">
            <a href="#" className="hidden text-sm text-zinc-600 sm:block dark:text-zinc-400">Sign in</a>
            <a href="#" tabIndex={compact ? 0 : -1} aria-hidden={!compact} className={`rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white transition-all duration-300 ${compact ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-4 opacity-0'}`}>Start free trial</a>
            <button type="button" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)} className="grid size-9 place-items-center rounded-lg text-zinc-700 hover:bg-zinc-100 md:hidden dark:text-zinc-200 dark:hover:bg-zinc-800"><Menu aria-hidden className="size-5" /></button>
          </div>
        </div>
        {menu && <nav aria-label="Mobile" className="mt-2 space-y-1 px-5 pb-2 md:hidden">{['Features', 'Pricing', 'Customers', 'Docs'].map((link) => <a key={link} href="#" className="block rounded-lg px-2 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">{link}</a>)}</nav>}
        <span aria-hidden className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-indigo-500 transition-opacity ${compact ? 'opacity-100' : 'opacity-0'}`} style={{ transform: `scaleX(${scroll.progress.toFixed(3)})` }} />
      </header>
      <main className="px-5 pb-10">
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">Automate the boring parts</h2>
        <p className="mt-2 text-sm text-zinc-500">Scroll this panel to see the navbar compact and the CTA appear.</p>
        {Array.from({ length: 6 }, (_, index) => <div key={index} className="mt-6 rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-900"><div className="h-3 w-40 rounded bg-zinc-200 dark:bg-zinc-800" /><div className="mt-3 h-2 w-full rounded bg-zinc-100 dark:bg-zinc-800/60" /><div className="mt-2 h-2 w-4/5 rounded bg-zinc-100 dark:bg-zinc-800/60" /></div>)}
      </main>
    </div>
  );
}
