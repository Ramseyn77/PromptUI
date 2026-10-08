/**
 * @registry
 * name: Hide On Scroll Navbar
 * category: Navbar
 * style: Glass
 * tags: featured, recent
 * description: Navigation qui se cache en descendant et réapparaît en remontant, devient vitrée après le haut de page.
 * prompt: Create a hide-on-scroll navbar demonstrated inside a scrollable page frame (data-lenis-prevent): the bar slides up (translateY -100%) when scrolling down past 80px and slides back when scrolling up; once not at the top it gains a blurred glass background and a hairline border; content below has long sections. Links collapse into a menu button with aria-expanded on mobile. Light and dark mode.
 */
'use client';
import { Menu, X } from 'lucide-react';
import { useId, useRef, useState, type UIEvent } from 'react';

export function HideOnScrollNavbar() {
  const uid = useId();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  function onScroll(event: UIEvent<HTMLDivElement>) {
    const top = event.currentTarget.scrollTop;
    setScrolled(top > 8);
    setHidden(top > 80 && top > last.current && !open);
    last.current = top;
  }

  return (
    <div className="relative h-96 w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-b from-sky-50 to-white dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
      <header className={`absolute inset-x-0 top-0 z-10 transition duration-300 ${hidden ? '-translate-y-full' : ''} ${scrolled ? 'border-b border-zinc-200/70 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/70' : ''}`}>
        <nav aria-label="Main" className="flex items-center justify-between px-5 py-3">
          <span className="font-bold text-zinc-950 dark:text-zinc-50">drift</span>
          <ul className="hidden gap-6 text-sm text-zinc-600 sm:flex dark:text-zinc-300">{['Product', 'Customers', 'Pricing'].map((link) => <li key={link}><a href={`#${link}`} className="hover:text-zinc-950 dark:hover:text-white">{link}</a></li>)}</ul>
          <a href="#start" className="hidden rounded-full bg-zinc-950 px-4 py-1.5 text-sm font-semibold text-white sm:block dark:bg-white dark:text-zinc-950">Start</a>
          <button type="button" aria-expanded={open} aria-controls={`${uid}-hide-nav-menu`} aria-label="Menu" onClick={() => setOpen((value) => !value)} className="grid size-9 place-items-center rounded-lg text-zinc-700 sm:hidden dark:text-zinc-200">{open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}</button>
        </nav>
        {open && <ul id={`${uid}-hide-nav-menu`} className="space-y-1 border-t border-zinc-200 bg-white px-5 py-3 text-sm sm:hidden dark:border-zinc-800 dark:bg-zinc-950">{['Product', 'Customers', 'Pricing', 'Start'].map((link) => <li key={link}><a href={`#${link}`} className="block py-1 text-zinc-700 dark:text-zinc-300">{link}</a></li>)}</ul>}
      </header>
      <div onScroll={onScroll} data-lenis-prevent className="h-full overflow-y-auto px-5 pb-10 pt-20">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Scroll down ↓</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">The bar hides while you read and comes back as soon as you scroll up.</p>
        {Array.from({ length: 6 }, (_, index) => <div key={index} className="mt-4 h-24 rounded-xl bg-white/80 shadow-sm ring-1 ring-zinc-200/60 dark:bg-white/5 dark:ring-white/10" />)}
      </div>
    </div>
  );
}
