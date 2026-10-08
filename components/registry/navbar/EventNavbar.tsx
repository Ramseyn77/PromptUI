/**
 * @registry
 * name: Event Navbar
 * category: Navbar
 * style: Gradient
 * tags: recent
 * description: Navigation de conférence avec compte à rebours jusqu'à l'événement, ancres de programme et bouton billets.
 * prompt: Create a conference navbar: event logo with date/city, anchor links (Speakers, Schedule, Venue, FAQ) with the active one highlighted, a live countdown (days:hours:min:sec, computed from a fixed target and rendered after mount to stay hydration safe) and a gradient "Get tickets" button; on mobile the links hide behind a menu button (aria-expanded) and the countdown shrinks to days only. Light and dark mode.
 */
'use client';
import { Menu } from 'lucide-react';
import { useId, useEffect, useState } from 'react';

const target = new Date('2026-11-18T09:00:00Z').getTime();
const links = ['Speakers', 'Schedule', 'Venue', 'FAQ'];

export function EventNavbar() {
  const uid = useId();
  const [left, setLeft] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('Speakers');

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const parts = left === null ? null : [Math.floor(left / 86400000), Math.floor(left / 3600000) % 24, Math.floor(left / 60000) % 60, Math.floor(left / 1000) % 60];

  return (
    <header className="w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
      <nav aria-label="Event" className="flex items-center gap-4">
        <span className="leading-tight"><span className="block bg-gradient-to-r from-orange-500 to-fuchsia-600 bg-clip-text font-black text-transparent">CONFIG/26</span><span className="text-[11px] text-zinc-500">Nov 18–19 · Kigali</span></span>
        <ul className="hidden gap-1 md:flex">{links.map((link) => <li key={link}><a href={`#${link.toLowerCase()}`} onClick={() => setActive(link)} aria-current={active === link ? 'true' : undefined} className={`rounded-full px-3 py-1.5 text-sm ${active === link ? 'bg-zinc-100 font-medium text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50'}`}>{link}</a></li>)}</ul>
        <p aria-label="Time until the event" className="ml-auto font-mono text-xs tabular-nums text-zinc-600 dark:text-zinc-300">
          {parts ? <><span className="sm:hidden">{parts[0]} days</span><span className="hidden sm:inline">{parts.map((value, index) => <span key={index}>{String(value).padStart(2, '0')}<span className="text-zinc-400">{['d', 'h', 'm', 's'][index]}</span>{index < 3 ? ' ' : ''}</span>)}</span></> : '— days'}
        </p>
        <a href="#tickets" className="rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white">Get tickets</a>
        <button type="button" aria-label="Menu" aria-expanded={open} aria-controls={`${uid}-event-menu`} onClick={() => setOpen((value) => !value)} className="grid size-9 place-items-center rounded-lg text-zinc-700 md:hidden dark:text-zinc-200"><Menu aria-hidden className="size-5" /></button>
      </nav>
      {open && <ul id={`${uid}-event-menu`} className="mt-3 grid grid-cols-2 gap-1 border-t border-zinc-200 pt-3 md:hidden dark:border-zinc-800">{links.map((link) => <li key={link}><a href={`#${link.toLowerCase()}`} className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">{link}</a></li>)}</ul>}
    </header>
  );
}
