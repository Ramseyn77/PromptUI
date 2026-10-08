/**
 * @registry
 * name: Link Preview Tooltip
 * category: Tooltips
 * style: Editorial
 * tags: recent
 * description: Lien dans un paragraphe qui affiche au survol une carte d'aperçu du site (image, titre, domaine).
 * prompt: Create a link preview tooltip inside an article paragraph: hovering or focusing the underlined link shows, after a 250ms delay, a card above it with a gradient thumbnail, page title, description and favicon + domain; it fades/slides in and hides on leave or Escape. Uses role="tooltip" and aria-describedby. Light and dark mode.
 */
'use client';
import { Globe } from 'lucide-react';
import { useId, useRef, useState } from 'react';

export function LinkPreviewTooltip() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef(0);
  const show = () => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(true), 250); };
  const hide = () => { window.clearTimeout(timer.current); setOpen(false); };

  return (
    <p className="max-w-md pt-40 font-serif text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
      Most design systems start small. The team at{' '}
      <span className="relative inline-block">
        <a href="#northwind" aria-describedby={id} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide} onKeyDown={(event) => { if (event.key === 'Escape') hide(); }} className="font-sans font-medium text-teal-700 underline decoration-teal-300 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-teal-400 dark:decoration-teal-700">Northwind</a>
        <span id={id} role="tooltip" className={`pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-zinc-200 bg-white text-left font-sans shadow-2xl transition duration-200 dark:border-zinc-700 dark:bg-zinc-900 ${open ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}>
          <span aria-hidden className="block h-20 bg-gradient-to-br from-teal-300 via-sky-300 to-violet-400" />
          <span className="block p-3">
            <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">Northwind Design System</span>
            <span className="mt-0.5 block text-xs leading-snug text-zinc-500 dark:text-zinc-400">Tokens, components and guidelines for every product team.</span>
            <span className="mt-2 flex items-center gap-1.5 text-[11px] text-zinc-400"><Globe aria-hidden className="size-3" />design.northwind.dev</span>
          </span>
        </span>
      </span>{' '}
      shipped their first 12 components in a single sprint.
    </p>
  );
}
