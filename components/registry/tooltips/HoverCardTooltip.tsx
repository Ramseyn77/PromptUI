/**
 * @registry
 * name: Hover Card Tooltip
 * category: Tooltips
 * style: SaaS
 * tags: featured, recent
 * description: Carte d apercu de profil qui apparait au survol d un @mention, avec avatar, bio et bouton suivre.
 * prompt: Create a hover card for an @mention link: on hover (300ms delay) or focus, a rich card appears below with gradient banner, avatar, name, handle, short bio, follower counts and a Follow button (aria-pressed toggle); the card stays open while hovered and closes on leave/Escape. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

/** defaultOpen shows the card immediately (handy for previews); pass false in your app. */
export function HoverCardTooltip({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [following, setFollowing] = useState(false);
  const root = useRef<HTMLParagraphElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const openLater = (delay: number) => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(true), delay); };
  const closeLater = () => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(false), 150); };

  useEffect(() => {
    // Listen on the document that renders the component: it may live in an iframe (previews, embeds).
    const doc = root.current?.ownerDocument ?? document;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    doc.addEventListener('keydown', onKey);
    return () => doc.removeEventListener('keydown', onKey);
  }, []);

  return (
    <p ref={root} className="max-w-sm text-sm leading-7 text-zinc-700 dark:text-zinc-300">
      Huge thanks to{' '}
      <span className="relative inline-block" onPointerEnter={() => openLater(300)} onPointerLeave={closeLater} onFocus={() => openLater(0)} onBlur={closeLater}>
        <a href="#" aria-describedby="hovercard-lea" className="font-semibold text-teal-700 hover:underline dark:text-teal-400">@leamoreau</a>
        <span id="hovercard-lea" role="tooltip" className={`absolute left-0 top-full z-10 mt-2 w-64 overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left shadow-xl transition duration-200 dark:border-zinc-800 dark:bg-zinc-950 ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'}`}>
          <span className="block h-14 bg-gradient-to-r from-teal-400 to-violet-500" />
          <span className="block px-4 pb-4">
            <span className="-mt-7 flex items-end justify-between">
              <span className="size-14 rounded-full border-4 border-white bg-amber-300 dark:border-zinc-950" />
              <button type="button" aria-pressed={following} onClick={() => setFollowing((value) => !value)} className={`rounded-full px-3 py-1 text-xs font-semibold ${following ? 'border border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-200' : 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'}`}>{following ? 'Following' : 'Follow'}</button>
            </span>
            <span className="mt-2 block font-semibold text-zinc-900 dark:text-white">Léa Moreau</span>
            <span className="block text-xs text-zinc-500">@leamoreau</span>
            <span className="mt-2 block text-xs leading-5 text-zinc-600 dark:text-zinc-400">Design engineer. Building calm software in Lyon.</span>
            <span className="mt-2 block text-xs text-zinc-500"><strong className="text-zinc-900 dark:text-white">2,418</strong> followers · <strong className="text-zinc-900 dark:text-white">312</strong> following</span>
          </span>
        </span>
      </span>{' '}
      for reviewing the new design tokens.
    </p>
  );
}
