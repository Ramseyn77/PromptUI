/**
 * @registry
 * name: Download Progress Button
 * category: Buttons
 * style: SaaS
 * tags: recent
 * description: Bouton de telechargement qui se remplit comme une barre de progression puis confirme.
 * prompt: Create a download button whose background fills left-to-right as a progress bar while "Downloading 42%" updates (aria-live), then shows a check and "Downloaded" before resetting after 2s; width stays stable. Light and dark mode.
 */
'use client';
import { Check, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DownloadProgressButton() {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    if (progress === null) return;
    if (progress >= 100) { const reset = window.setTimeout(() => setProgress(null), 2000); return () => window.clearTimeout(reset); }
    const timer = window.setTimeout(() => setProgress((value) => Math.min(100, (value ?? 0) + 4 + Math.round(Math.random() * 6))), 120);
    return () => window.clearTimeout(timer);
  }, [progress]);

  const done = progress === 100;
  return (
    <button type="button" disabled={progress !== null} onClick={() => setProgress(0)} className="relative h-12 w-56 overflow-hidden rounded-xl border border-zinc-300 bg-white text-sm font-semibold text-zinc-900 transition disabled:cursor-default dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
      <span aria-hidden className={`absolute inset-y-0 left-0 transition-[width] duration-150 ${done ? 'bg-emerald-500' : 'bg-teal-500/25'}`} style={{ width: `${progress ?? 0}%` }} />
      <span aria-live="polite" className={`relative inline-flex items-center gap-2 ${done ? 'text-white' : ''}`}>
        {done ? <Check aria-hidden className="size-4" /> : <Download aria-hidden className="size-4" />}
        {progress === null ? 'Download report' : done ? 'Downloaded' : `Downloading ${progress}%`}
      </span>
    </button>
  );
}
