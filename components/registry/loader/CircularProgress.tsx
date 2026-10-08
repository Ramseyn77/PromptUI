/**
 * @registry
 * name: Circular Progress
 * category: Loader
 * style: SaaS
 * tags: recent
 * description: Progression circulaire déterminée qui avance jusqu'à 100 % puis affiche une coche.
 * prompt: Create a determinate circular progress (SVG ring with stroke-dashoffset) that simulates an upload from 0 to 100% with percentage text in the center, then turns green and shows a check icon; a Restart button replays it. role="progressbar" with aria-valuenow. Light and dark mode.
 */
'use client';
import { Check, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CircularProgress() {
  const [value, setValue] = useState(0);
  const [run, setRun] = useState(0);
  const done = value >= 100;
  const circumference = 2 * Math.PI * 28;

  useEffect(() => {
    setValue(0);
    const timer = window.setInterval(() => setValue((current) => Math.min(100, current + Math.ceil(Math.random() * 9))), 180);
    return () => window.clearInterval(timer);
  }, [run]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div role="progressbar" aria-label="Uploading file" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} className="relative size-20">
        <svg viewBox="0 0 64 64" className="size-20 -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" strokeWidth="6" className="stroke-zinc-200 dark:stroke-zinc-800" />
          <circle cx="32" cy="32" r="28" fill="none" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - value / 100)} className={`transition-[stroke-dashoffset,stroke] duration-200 ${done ? 'stroke-emerald-500' : 'stroke-teal-500'}`} />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-sm font-semibold tabular-nums text-zinc-900 dark:text-white">{done ? <Check aria-hidden className="size-6 text-emerald-500" /> : `${value}%`}</span>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{done ? 'Upload complete' : 'Uploading report.pdf…'}</p>
      {done && <button type="button" onClick={() => setRun((current) => current + 1)} className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 hover:underline dark:text-teal-400"><RotateCcw aria-hidden className="size-3.5" /> Restart</button>}
    </div>
  );
}
