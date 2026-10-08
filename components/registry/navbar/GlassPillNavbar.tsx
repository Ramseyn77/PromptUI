/**
 * @registry
 * name: Glass Pill Navbar
 * category: Navbar
 * style: Glass
 * tags: featured, recent
 * description: Navigation flottante en pilule de verre avec lien actif surligné.
 * prompt: Create a floating glassmorphism pill navbar over a colorful backdrop: logo, links with an active pill background, CTA; links collapse behind a menu button below sm (aria-expanded). Backdrop blur, light and dark mode.
 */
'use client';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const links = ['Home', 'Work', 'Studio', 'Contact'];

export function GlassPillNavbar() {
  const [active, setActive] = useState('Home');
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-3xl rounded-3xl bg-[linear-gradient(120deg,#99f6e4,#c4b5fd,#fde68a)] p-6 dark:bg-[linear-gradient(120deg,#134e4a,#3b0764,#78350f)]">
      <nav aria-label="Main" className="relative mx-auto flex items-center justify-between gap-2 rounded-full border border-white/60 bg-white/60 p-1.5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/50">
        <span className="pl-3 text-sm font-bold text-zinc-900 dark:text-white">studio.</span>
        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <li key={link}>
              <button type="button" aria-current={active === link ? 'page' : undefined} onClick={() => setActive(link)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${active === link ? 'bg-white text-zinc-900 shadow-sm dark:bg-white/15 dark:text-white' : 'text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white'}`}>{link}</button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <button type="button" className="rounded-full bg-zinc-950 px-4 py-1.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Let&apos;s talk</button>
          <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid size-8 place-items-center rounded-full text-zinc-800 sm:hidden dark:text-white"><Menu className="size-4" /></button>
        </div>
        {open && (
          <ul className="absolute inset-x-0 top-full mt-2 grid gap-1 rounded-2xl border border-white/60 bg-white/80 p-2 shadow-xl backdrop-blur-xl sm:hidden dark:border-white/10 dark:bg-zinc-950/80">
            {links.map((link) => <li key={link}><button type="button" onClick={() => { setActive(link); setOpen(false); }} className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-zinc-800 dark:text-zinc-100">{link}</button></li>)}
          </ul>
        )}
      </nav>
    </div>
  );
}
