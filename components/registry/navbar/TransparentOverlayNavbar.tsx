/**
 * @registry
 * name: Transparent Overlay Navbar
 * category: Navbar
 * style: Glass
 * tags: recent
 * description: Navbar transparente posée sur une image plein cadre (hôtel, voyage), texte blanc lisible grâce à un dégradé, menu plein écran en verre sur mobile.
 * prompt: Create a transparent navbar over a full-bleed hero image (a CSS gradient landscape as placeholder): white logo, centered links and a "Book now" glass button, with a top dark-to-transparent gradient scrim to keep text readable; below md, a menu button (aria-expanded) opens a full-panel frosted-glass overlay with large stacked links and a close button; Escape closes it; the hero text sits at the bottom of the image. Works in light and dark (image stays dark-toned).
 */
'use client';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = ['Rooms', 'Dining', 'Spa', 'Experiences', 'Contact'];

export function TransparentOverlayNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-[26rem] w-full max-w-4xl overflow-hidden rounded-3xl bg-[linear-gradient(180deg,#0f172a_0%,#1e3a5f_35%,#c2410c_75%,#fbbf24_100%)]" onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(ellipse_at_50%_100%,#0f172a,transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />
      <header className="relative flex items-center gap-6 px-6 py-5 text-white">
        <a href="#" className="font-serif text-2xl tracking-wide">Lumière</a>
        <nav aria-label="Main" className="mx-auto hidden gap-6 text-sm text-white/85 md:flex">{links.map((link) => <a key={link} href="#" className="hover:text-white">{link}</a>)}</nav>
        <a href="#" className="ml-auto hidden rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/20 md:ml-0 md:block">Book now</a>
        <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className="ml-auto grid size-10 place-items-center rounded-full bg-white/10 backdrop-blur md:hidden"><Menu aria-hidden className="size-5" /></button>
      </header>
      <div className="absolute bottom-8 left-6 right-6 text-white"><p className="text-xs uppercase tracking-[0.3em] text-white/70">Essaouira · Morocco</p><h2 className="mt-2 font-serif text-4xl sm:text-5xl">Where the wind slows down</h2></div>
      {open && (
        <div role="dialog" aria-label="Menu" className="absolute inset-0 z-10 flex flex-col bg-white/15 p-6 text-white backdrop-blur-2xl">
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="ml-auto grid size-10 place-items-center rounded-full bg-white/15"><X aria-hidden className="size-5" /></button>
          <nav aria-label="Mobile" className="mt-6 space-y-3">{links.map((link) => <a key={link} href="#" onClick={() => setOpen(false)} className="block font-serif text-3xl">{link}</a>)}</nav>
          <a href="#" className="mt-auto rounded-full bg-white py-3 text-center text-sm font-semibold text-zinc-950">Book now</a>
        </div>
      )}
    </div>
  );
}
