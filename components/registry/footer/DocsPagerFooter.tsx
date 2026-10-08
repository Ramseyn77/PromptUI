/**
 * @registry
 * name: Docs Pager Footer
 * category: Footer
 * style: Minimal
 * tags: recent
 * description: Pied de page de documentation : précédent / suivant, « Cette page vous a aidé ? » et lien d'édition.
 * prompt: Create a documentation page footer: two large pager cards (Previous / Next) with section labels and arrows, a "Was this page helpful?" Yes/No feedback that turns into a thank-you, an "Edit this page" link and "Last updated" date. Pager cards stack on mobile. Light and dark mode.
 */
'use client';
import { ArrowLeft, ArrowRight, Pencil, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

export function DocsPagerFooter() {
  const [vote, setVote] = useState<'yes' | 'no' | null>(null);

  return (
    <footer className="w-full max-w-2xl">
      <div className="grid gap-3 sm:grid-cols-2">
        <a href="#installation" className="group rounded-2xl border border-zinc-200 p-4 hover:border-teal-500 dark:border-zinc-800">
          <span className="text-xs text-zinc-500">Previous</span>
          <span className="mt-1 flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100"><ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-1" />Installation</span>
        </a>
        <a href="#theming" className="group rounded-2xl border border-zinc-200 p-4 text-right hover:border-teal-500 dark:border-zinc-800">
          <span className="text-xs text-zinc-500">Next</span>
          <span className="mt-1 flex items-center justify-end gap-2 font-semibold text-zinc-900 dark:text-zinc-100">Theming<ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" /></span>
        </a>
      </div>
      <div className="mt-6 flex flex-col gap-3 border-t border-zinc-200 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <div aria-live="polite" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          {vote ? <span>Thanks for your feedback!</span> : (
            <>Was this page helpful?
              <button type="button" aria-label="Yes" onClick={() => setVote('yes')} className="grid size-8 place-items-center rounded-lg border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"><ThumbsUp aria-hidden className="size-4" /></button>
              <button type="button" aria-label="No" onClick={() => setVote('no')} className="grid size-8 place-items-center rounded-lg border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"><ThumbsDown aria-hidden className="size-4" /></button>
            </>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <a href="#edit" className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100"><Pencil aria-hidden className="size-3.5" />Edit this page</a>
          <span>Last updated Oct 4, 2026</span>
        </div>
      </div>
    </footer>
  );
}
