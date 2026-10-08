/**
 * @registry
 * name: Top Progress Bar
 * category: Loader
 * style: Minimal
 * tags: recent
 * description: Barre de chargement de page façon NProgress en haut d'une fenêtre, qui avance en ralentissant puis se termine.
 * prompt: Create a NProgress-style top loading bar inside a mock browser frame: clicking a nav link starts the bar (trickles toward 90% with decreasing increments and a glowing tip), the fake page content swaps after 1.4s, then the bar completes to 100% and fades; role="progressbar" with aria-valuenow, and the content region has aria-busy while loading. Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const pages = { Home: 'Welcome back, Ama.', Reports: '12 new reports this week.', Settings: 'Manage your workspace.' } as const;
type Page = keyof typeof pages;

export function TopProgressBar() {
  const [page, setPage] = useState<Page>('Home');
  const [progress, setProgress] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  function go(next: Page) {
    if (next === page || progress !== null) return;
    setProgress(8);
    const trickle = window.setInterval(() => setProgress((value) => (value === null ? null : value + (90 - value) * 0.12)), 120);
    timers.current.push(window.setTimeout(() => { window.clearInterval(trickle); setPage(next); setProgress(100); timers.current.push(window.setTimeout(() => setProgress(null), 350)); }, 1400));
  }

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative h-0.5">
        {progress !== null && <div role="progressbar" aria-label="Page loading" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} className={`h-full bg-teal-500 shadow-[0_0_10px_#14b8a6] transition-[width,opacity] duration-300 ${progress >= 100 ? 'opacity-0' : ''}`} style={{ width: `${progress}%` }} />}
      </div>
      <nav aria-label="Demo pages" className="flex gap-1 border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">{(Object.keys(pages) as Page[]).map((name) => <button key={name} type="button" aria-current={page === name ? 'page' : undefined} onClick={() => go(name)} className={`rounded-md px-2.5 py-1 text-sm ${page === name ? 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}>{name}</button>)}</nav>
      <div aria-busy={progress !== null} aria-live="polite" className="p-5">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{page}</h3>
        <p className="mt-1 text-sm text-zinc-500">{pages[page]}</p>
        <div className="mt-4 space-y-2">{[90, 70, 80].map((width) => <div key={width} className="h-2 rounded bg-zinc-100 dark:bg-zinc-800" style={{ width: `${width}%` }} />)}</div>
      </div>
    </div>
  );
}
