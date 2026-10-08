/**
 * @registry
 * name: Floating Action Button
 * category: Buttons
 * style: Gradient
 * tags: recent
 * description: Bouton flottant étendu qui se réduit en rond quand on fait défiler la liste vers le bas et réapparaît en remontant.
 * prompt: Create a Material-style extended FAB inside a scrollable mobile list frame (data-lenis-prevent): the FAB shows icon + "Compose" label and shrinks to an icon-only circle (label width/opacity transition) while scrolling down, expanding again when scrolling up; gradient fill, shadow, aria-label always present. Light and dark mode.
 */
'use client';
import { Pencil } from 'lucide-react';
import { useRef, useState, type UIEvent } from 'react';

export function FloatingActionButton() {
  const [extended, setExtended] = useState(true);
  const last = useRef(0);

  function onScroll(event: UIEvent<HTMLDivElement>) {
    const top = event.currentTarget.scrollTop;
    setExtended(top < last.current || top < 20);
    last.current = top;
  }

  return (
    <div className="relative h-96 w-72 overflow-hidden rounded-[2rem] border-[6px] border-zinc-900 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div onScroll={onScroll} data-lenis-prevent className="h-full overflow-y-auto">
        <p className="sticky top-0 bg-white/90 px-4 py-3 text-sm font-semibold text-zinc-900 backdrop-blur dark:bg-zinc-950/90 dark:text-zinc-100">Inbox</p>
        <ul>{Array.from({ length: 14 }, (_, index) => <li key={index} className="flex gap-3 border-b border-zinc-100 px-4 py-3 dark:border-zinc-900"><span aria-hidden className="size-8 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800" /><span className="flex-1 space-y-1.5"><span className="block h-2 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" /><span className="block h-2 w-5/6 rounded bg-zinc-100 dark:bg-zinc-900" /></span></li>)}</ul>
      </div>
      <button type="button" aria-label="Compose" className="absolute bottom-4 right-4 flex h-14 items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 px-4 text-white shadow-lg shadow-violet-500/40 outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
        <Pencil aria-hidden className="size-5 shrink-0" />
        <span className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 ${extended ? 'ml-2 max-w-24 opacity-100' : 'max-w-0 opacity-0'}`}>Compose</span>
      </button>
    </div>
  );
}
