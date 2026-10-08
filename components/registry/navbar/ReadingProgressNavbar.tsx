/**
 * @registry
 * name: Reading Progress Navbar
 * category: Navbar
 * style: Editorial
 * tags: recent
 * description: Barre d'article avec titre, temps de lecture et barre de progression qui suit le défilement.
 * prompt: Create an article header bar showing the article title, minutes left and a thin progress bar that fills as the reader scrolls a scrollable article container (onScroll computes scrollTop / (scrollHeight - clientHeight)). role="progressbar" with aria-valuenow. Light and dark mode.
 */
'use client';
import { useState, type UIEvent } from 'react';

export function ReadingProgressNavbar() {
  const [progress, setProgress] = useState(0);

  function onScroll(event: UIEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    setProgress(Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100));
  }

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <header className="relative flex h-12 items-center justify-between px-4">
        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">Designing calm software</p>
        <p className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">{Math.max(1, Math.ceil(6 * (1 - progress / 100)))} min left</p>
        <div role="progressbar" aria-label="Reading progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} className="absolute inset-x-0 bottom-0 h-0.5 bg-zinc-100 dark:bg-zinc-800">
          <div className="h-full bg-gradient-to-r from-teal-500 to-violet-500 transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>
      </header>
      <div onScroll={onScroll} tabIndex={0} aria-label="Article" className="h-48 space-y-4 overflow-y-auto p-4 text-sm leading-7 text-zinc-600 outline-none dark:text-zinc-400">
        {['Calm software respects attention. It shows what matters and hides what does not.', 'Every notification is a small interruption. Batch them, rank them, and let people choose.', 'Defaults are decisions. A good default saves thousands of tiny choices every day.', 'Motion should explain, never decorate. If an animation does not teach, remove it.', 'Scroll this panel to watch the progress bar fill up as you read.'].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </div>
  );
}
