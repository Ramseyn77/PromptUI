/**
 * @registry
 * name: Editorial Navbar
 * category: Navbar
 * style: Editorial
 * tags: recent
 * description: En-tête de magazine : date et édition, grand titre serif centré et rubriques soulignées, menu sur mobile.
 * prompt: Create an editorial masthead navbar: a top utility line (date, edition, Subscribe link), a large centered serif wordmark, then a row of section links separated by thin rules with an active underline; on mobile the sections collapse behind a "Sections" button (aria-expanded) showing a vertical list. Cream background in light, deep ink in dark.
 */
'use client';
import { useState } from 'react';

const sections = ['World', 'Business', 'Tech', 'Culture', 'Design', 'Opinion'];

export function EditorialNavbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('Design');

  return (
    <header className="w-full max-w-4xl bg-[#f8f4ec] px-5 pb-0 pt-3 text-[#1b1a17] dark:bg-[#14130f] dark:text-[#ede7da]">
      <div className="flex items-center justify-between border-b border-current/15 pb-2 text-[11px] uppercase tracking-[0.18em] opacity-70">
        <span>Monday, October 5, 2026</span><span className="hidden sm:inline">Vol. XII · No. 41</span><a href="#subscribe" className="font-semibold underline-offset-4 hover:underline">Subscribe</a>
      </div>
      <p className="py-4 text-center font-serif text-4xl font-black tracking-tight sm:text-6xl">The Northbound</p>
      <nav aria-label="Sections" className="border-y-2 border-current/80 py-2">
        <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="w-full text-center text-xs font-semibold uppercase tracking-[0.2em] sm:hidden">Sections {open ? '−' : '+'}</button>
        <ul className={`${open ? 'mt-2 flex' : 'hidden'} flex-col items-center gap-2 sm:mt-0 sm:flex sm:flex-row sm:justify-center sm:gap-0`}>
          {sections.map((section, index) => (
            <li key={section} className="flex items-center">
              {index > 0 && <span aria-hidden className="mx-4 hidden h-3 w-px bg-current/30 sm:block" />}
              <a href={`#${section.toLowerCase()}`} aria-current={active === section ? 'page' : undefined} onClick={() => setActive(section)} className={`font-serif text-sm ${active === section ? 'italic underline decoration-2 underline-offset-[6px]' : 'opacity-80 hover:opacity-100'}`}>{section}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
