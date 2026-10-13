/**
 * @registry
 * name: Dynamic Island Navbar
 * category: Navbar
 * style: Dark
 * tags: featured, recent
 * description: Navbar en pilule noire façon « Dynamic Island » qui s'étire en douceur pour révéler les liens, la recherche ou une notification.
 * prompt: Create a "dynamic island" navbar: a black pill centered at the top that morphs between three states with smooth width/height/radius transitions — compact (logo + menu dot), expanded nav (5 links + Sign in) and search (an input with Esc hint) — plus a transient notification state ("Deploy finished ✓") triggered by a demo button; the morph uses CSS transitions on a single element; keyboard: the menu button has aria-expanded, Escape returns to compact; reduced motion switches instantly. Dark in both themes.
 */
'use client';
import { Bell, Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Mode = 'compact' | 'nav' | 'search' | 'notice';
const sizes: Record<Mode, string> = { compact: 'w-44 h-11', nav: 'w-[34rem] max-w-[calc(100vw-2rem)] h-11', search: 'w-80 h-11', notice: 'w-72 h-16' };

export function DynamicIslandNavbar() {
  const [mode, setMode] = useState<Mode>('nav');

  useEffect(() => {
    if (mode !== 'notice') return;
    const timer = window.setTimeout(() => setMode('compact'), 2600);
    return () => window.clearTimeout(timer);
  }, [mode]);

  return (
    <div className="flex w-full flex-col items-center gap-4 bg-gradient-to-b from-zinc-200 to-zinc-50 px-4 py-8 dark:from-zinc-900 dark:to-zinc-950" onKeyDown={(event) => { if (event.key === 'Escape') setMode('compact'); }}>
      <header className={`flex items-center overflow-hidden rounded-full bg-black px-2 text-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(.3,1.3,.5,1)] motion-reduce:duration-0 ${sizes[mode]} ${mode === 'notice' ? 'rounded-[2rem]' : ''}`}>
        {mode === 'compact' && <><span className="ml-2 text-sm font-bold">isle</span><button type="button" aria-label="Open navigation" aria-expanded={false} onClick={() => setMode('nav')} className="ml-auto grid size-8 place-items-center rounded-full hover:bg-white/10"><Menu aria-hidden className="size-4" /></button><button type="button" aria-label="Search" onClick={() => setMode('search')} className="grid size-8 place-items-center rounded-full hover:bg-white/10"><Search aria-hidden className="size-4" /></button></>}
        {mode === 'nav' && (
          <nav aria-label="Main" className="flex w-full items-center gap-1 whitespace-nowrap">
            <span className="ml-2 mr-2 text-sm font-bold">isle</span>
            {['Product', 'Pricing', 'Docs', 'Blog'].map((link) => <a key={link} href="#" className="hidden rounded-full px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/10 hover:text-white sm:block">{link}</a>)}
            <button type="button" aria-label="Search" onClick={() => setMode('search')} className="ml-auto grid size-8 place-items-center rounded-full hover:bg-white/10"><Search aria-hidden className="size-4" /></button>
            <a href="#" className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black">Sign in</a>
            <button type="button" aria-label="Collapse navigation" aria-expanded onClick={() => setMode('compact')} className="grid size-8 place-items-center rounded-full hover:bg-white/10"><X aria-hidden className="size-4" /></button>
          </nav>
        )}
        {mode === 'search' && <div className="flex w-full items-center gap-2 px-2"><Search aria-hidden className="size-4 text-zinc-400" /><input aria-label="Search" placeholder="Search docs…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500" /><kbd className="rounded border border-white/20 px-1 font-mono text-[10px] text-zinc-400">Esc</kbd></div>}
        {mode === 'notice' && <div role="status" className="flex w-full items-center gap-3 px-3"><span className="grid size-9 place-items-center rounded-full bg-emerald-500"><Bell aria-hidden className="size-4" /></span><div><p className="text-sm font-semibold">Deploy finished ✓</p><p className="text-xs text-zinc-400">production · 42s</p></div></div>}
      </header>
      <div className="flex flex-wrap justify-center gap-2 text-xs">{(['compact', 'nav', 'search', 'notice'] as Mode[]).map((value) => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)} className={`rounded-full px-3 py-1 capitalize ring-1 ${mode === value ? 'bg-zinc-900 text-white ring-zinc-900 dark:bg-white dark:text-zinc-900' : 'text-zinc-600 ring-zinc-300 dark:text-zinc-400 dark:ring-zinc-700'}`}>{value === 'notice' ? 'Notify' : value}</button>)}</div>
    </div>
  );
}
