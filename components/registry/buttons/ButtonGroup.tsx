/**
 * @registry
 * name: Button Group
 * category: Buttons
 * style: SaaS
 * tags: recent
 * description: Groupes de boutons accolés façon shadcn : actions d'email, pagination et zoom avec séparateurs.
 * prompt: Create shadcn-style button groups: buttons sharing borders with only outer corners rounded. Show an email toolbar group (Archive, Report, Snooze), an icon-only pager group (previous/next with aria-labels) and a zoom group with an output value between minus/plus buttons (role="group" with aria-label each, live value). Wraps on mobile. Light and dark mode.
 */
'use client';
import { Archive, ChevronLeft, ChevronRight, Clock, Flag, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const segment = 'inline-flex h-9 items-center gap-1.5 border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-800 outline-none transition hover:bg-zinc-50 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-teal-500 disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 [&:not(:first-child)]:-ml-px first:rounded-l-lg last:rounded-r-lg';

export function ButtonGroup() {
  const [zoom, setZoom] = useState(100);
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div role="group" aria-label="Email actions" className="flex">
        <button type="button" className={segment}><Archive aria-hidden className="size-4" />Archive</button>
        <button type="button" className={segment}><Flag aria-hidden className="size-4" />Report</button>
        <button type="button" className={segment}><Clock aria-hidden className="size-4" />Snooze</button>
      </div>
      <div role="group" aria-label={`Page ${page} of 9`} className="flex">
        <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => setPage((value) => value - 1)} className={segment}><ChevronLeft aria-hidden className="size-4" /></button>
        <span className={`${segment} pointer-events-none tabular-nums`}>{page} / 9</span>
        <button type="button" aria-label="Next page" disabled={page === 9} onClick={() => setPage((value) => value + 1)} className={segment}><ChevronRight aria-hidden className="size-4" /></button>
      </div>
      <div role="group" aria-label="Zoom" className="flex">
        <button type="button" aria-label="Zoom out" disabled={zoom <= 50} onClick={() => setZoom((value) => value - 10)} className={segment}><Minus aria-hidden className="size-4" /></button>
        <output aria-live="polite" className={`${segment} w-16 justify-center tabular-nums`}>{zoom}%</output>
        <button type="button" aria-label="Zoom in" disabled={zoom >= 200} onClick={() => setZoom((value) => value + 10)} className={segment}><Plus aria-hidden className="size-4" /></button>
      </div>
    </div>
  );
}
