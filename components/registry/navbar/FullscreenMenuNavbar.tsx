/**
 * @registry
 * name: Fullscreen Menu Navbar
 * category: Navbar
 * style: Dark
 * tags: featured, recent
 * description: Navigation d'agence : le bouton Menu ouvre un rideau plein cadre avec grands liens qui entrent en cascade.
 * prompt: Create an agency navbar whose "Menu" button (aria-expanded, aria-controls) opens a full-frame dark overlay that slides down like a curtain; huge serif links stagger in from below with numbers, a contact column and socials; Escape or the Close button closes and returns focus. The demo is contained in a fixed-height frame. Reduced motion: fade only. Dark overlay in both themes.
 */
'use client';
import { useId, useEffect, useRef, useState } from 'react';

const links = ['Work', 'Studio', 'Services', 'Journal', 'Contact'];

export function FullscreenMenuNavbar() {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); button.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="relative h-96 w-full max-w-2xl overflow-hidden rounded-2xl bg-[#ece8e1] dark:bg-zinc-900">
      <header className="relative z-20 flex items-center justify-between px-6 py-4">
        <span className={`font-serif text-xl font-bold ${open ? 'text-white' : 'text-zinc-950 dark:text-zinc-50'}`}>Oak & Ash</span>
        <button ref={button} type="button" aria-expanded={open} aria-controls={`${uid}-fullscreen-menu`} onClick={() => setOpen((value) => !value)} className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${open ? 'border-white/40 text-white' : 'border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50'}`}>{open ? 'Close' : 'Menu'}</button>
      </header>
      <p className="px-6 pt-10 font-serif text-4xl leading-tight text-zinc-950 dark:text-zinc-50">Brands with a quiet kind of confidence.</p>
      <nav id={`${uid}-fullscreen-menu`} aria-label="Main" aria-hidden={!open} className={`absolute inset-0 z-10 grid bg-zinc-950 px-6 pb-6 pt-20 text-white transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(.77,0,.18,1)] motion-reduce:transition-opacity sm:grid-cols-[1fr_auto] ${open ? '[clip-path:inset(0_0_0_0)] opacity-100' : 'pointer-events-none [clip-path:inset(0_0_100%_0)] opacity-0 motion-reduce:[clip-path:none]'}`}>
        <ol className="space-y-1">
          {links.map((link, index) => (
            <li key={link} className="overflow-hidden">
              <a href={`#${link.toLowerCase()}`} tabIndex={open ? 0 : -1} className={`flex items-baseline gap-3 font-serif text-4xl transition duration-700 hover:italic sm:text-5xl ${open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} style={{ transitionDelay: open ? `${200 + index * 70}ms` : '0ms' }}><span className="font-sans text-xs text-zinc-500">0{index + 1}</span>{link}</a>
            </li>
          ))}
        </ol>
        <div className={`mt-6 text-sm text-zinc-400 transition-opacity delay-500 duration-500 sm:mt-0 ${open ? 'opacity-100' : 'opacity-0'}`}><p className="text-white">hello@oakash.studio</p><p>+33 1 84 00 21 21</p><p className="mt-4">Paris · Dakar</p></div>
      </nav>
    </div>
  );
}
