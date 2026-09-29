/**
 * @registry
 * name: Dark Minimal Navbar
 * category: Navbar
 * style: Dark
 * tags: recent
 * description: Navigation sobre sur fond sombre avec lien actif en point lumineux.
 * prompt: Create a minimal dark navbar (inverts to light in light mode): monogram, links where the active one shows a small glowing dot under it, and a ghost CTA with arrow; links hidden below sm with an accessible menu button. Clean and airy.
 */
'use client';
import { ArrowUpRight, Menu } from 'lucide-react';
import { useState } from 'react';

const links = ['Index', 'Projects', 'Notes', 'Contact'];

export function DarkMinimalNavbar() {
  const [active, setActive] = useState('Index');
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full max-w-4xl rounded-2xl bg-zinc-950 px-5 text-white dark:bg-white dark:text-zinc-950">
      <nav aria-label="Main" className="flex h-16 items-center justify-between">
        <span className="grid size-8 place-items-center rounded-full border border-current text-xs font-bold">JD</span>
        <ul className="hidden gap-8 sm:flex">
          {links.map((link) => (
            <li key={link} className="relative">
              <button type="button" aria-current={active === link ? 'page' : undefined} onClick={() => setActive(link)} className={`text-sm transition ${active === link ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}>{link}</button>
              {active === link && <span aria-hidden className="absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 rounded-full bg-teal-400 shadow-[0_0_8px_2px_rgba(45,212,191,.7)] dark:bg-teal-600" />}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#" className="inline-flex items-center gap-1 rounded-full border border-current/25 px-3.5 py-1.5 text-sm transition hover:bg-white/10 dark:hover:bg-zinc-950/5">Hire me <ArrowUpRight aria-hidden className="size-4" /></a>
          <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid size-9 place-items-center sm:hidden"><Menu className="size-5" /></button>
        </div>
      </nav>
      {open && <ul className="grid gap-2 pb-4 sm:hidden">{links.map((link) => <li key={link}><button type="button" onClick={() => { setActive(link); setOpen(false); }} className="text-sm opacity-80">{link}</button></li>)}</ul>}
    </header>
  );
}
