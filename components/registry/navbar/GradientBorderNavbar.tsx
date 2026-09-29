/**
 * @registry
 * name: Gradient Border Navbar
 * category: Navbar
 * style: Gradient
 * tags: recent
 * description: Navigation avec bordure en degrade anime et CTA lumineux.
 * prompt: Create a navbar wrapped in a 1px animated gradient border (padding + background-position animation on a teal/violet/amber gradient), inner solid surface with logo, links (hidden below md, menu button) and a glowing CTA. Light and dark mode, reduced-motion safe.
 */
'use client';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function GradientBorderNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`@keyframes pui-border-pan{to{background-position:200% 0}}`}</style>
      <div className="w-full max-w-4xl rounded-2xl bg-[linear-gradient(90deg,#14b8a6,#8b5cf6,#f59e0b,#14b8a6)] bg-[length:200%_100%] p-px motion-safe:animate-[pui-border-pan_6s_linear_infinite]">
        <header className="rounded-[15px] bg-white px-5 dark:bg-zinc-950">
          <nav aria-label="Main" className="flex h-14 items-center justify-between">
            <span className="bg-gradient-to-r from-teal-500 to-violet-500 bg-clip-text font-bold text-transparent">Prism</span>
            <ul className="hidden gap-7 text-sm font-medium text-zinc-600 md:flex dark:text-zinc-400">
              {['Features', 'Showcase', 'Pricing'].map((link) => <li key={link}><a href="#" className="hover:text-zinc-900 dark:hover:text-white">{link}</a></li>)}
            </ul>
            <div className="flex items-center gap-2">
              <a href="#" className="rounded-lg bg-violet-600 px-3.5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500">Get Prism</a>
              <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid size-9 place-items-center rounded-lg text-zinc-700 md:hidden dark:text-zinc-300"><Menu className="size-5" /></button>
            </div>
          </nav>
          {open && <ul className="grid gap-1 pb-3 text-sm font-medium md:hidden">{['Features', 'Showcase', 'Pricing'].map((link) => <li key={link}><a href="#" className="block rounded-lg px-3 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">{link}</a></li>)}</ul>}
        </header>
      </div>
    </>
  );
}
