/**
 * @registry
 * name: Sliding Hover Navbar
 * category: Navbar
 * style: Minimal
 * tags: featured, recent
 * description: Navbar dont un fond arrondi glisse sous le lien survolé ou focalisé puis revient sur la page active, avec menu mobile accessible.
 * prompt: Create a navbar with a sliding hover highlight: a rounded pill element measures the hovered or keyboard-focused link (offsetLeft/offsetWidth) and slides under it with a spring-like transition, then returns to the active link when the pointer leaves; the active link also has a small dot; logo left, Sign in + Get started right; under md the links collapse into a menu button with aria-expanded revealing a vertical list. Light and dark mode.
 */
'use client';
import { Menu, X } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';

const links = ['Product', 'Solutions', 'Customers', 'Pricing', 'Docs'];

export function SlidingHoverNavbar() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const [open, setOpen] = useState(false);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const target = hovered ?? active;

  useLayoutEffect(() => {
    const node = refs.current[target];
    if (node) setPill({ left: node.offsetLeft, width: node.offsetWidth });
  }, [target]);

  return (
    <header className="w-full border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-6">
        <a href="#" className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">slide.</a>
        <nav aria-label="Main" className="relative hidden md:block" onMouseLeave={() => setHovered(null)}>
          <span aria-hidden className="absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-zinc-100 transition-all duration-300 ease-[cubic-bezier(.3,1.4,.5,1)] dark:bg-zinc-800" style={{ left: pill.left, width: pill.width }} />
          <ul className="relative flex">
            {links.map((link, index) => (
              <li key={link}>
                <a ref={(node) => { refs.current[index] = node; }} href="#" aria-current={active === index ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(index); }} onMouseEnter={() => setHovered(index)} onFocus={() => setHovered(index)} onBlur={() => setHovered(null)} className={`relative block rounded-full px-4 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 ${active === index ? 'font-semibold text-zinc-950 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}>
                  {link}{active === index && <span aria-hidden className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-zinc-950 dark:bg-white" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto hidden items-center gap-2 md:flex"><a href="#" className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-300">Sign in</a><a href="#" className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Get started</a></div>
        <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)} className="ml-auto grid size-10 place-items-center rounded-full text-zinc-700 hover:bg-zinc-100 md:hidden dark:text-zinc-200 dark:hover:bg-zinc-800">{open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}</button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="pb-4 md:hidden">
          <ul className="space-y-1">{links.map((link, index) => <li key={link}><a href="#" aria-current={active === index ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(index); setOpen(false); }} className={`block rounded-xl px-3 py-2.5 text-sm ${active === index ? 'bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-800 dark:text-white' : 'text-zinc-600 dark:text-zinc-300'}`}>{link}</a></li>)}</ul>
          <a href="#" className="mt-3 block rounded-full bg-zinc-950 py-2.5 text-center text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Get started</a>
        </nav>
      )}
    </header>
  );
}
