/**
 * @registry
 * name: Percent Counter Loader
 * category: Loader
 * style: Editorial
 * tags: recent
 * description: Écran de chargement plein cadre avec grand pourcentage qui grimpe, barre fine et étapes nommées, façon portfolio.
 * prompt: Create a portfolio-style preloader screen in a framed box: a huge tabular percentage counting 0→100 with an ease-out curve, a hairline progress bar, a status word that changes by range (Loading assets, Preparing fonts, Almost there), then a curtain slides up revealing "Hello." with a Replay button. role="progressbar" on the counter; reduced motion jumps to the end. Dark preloader in both themes.
 */
'use client';
import { useEffect, useState } from 'react';

export function PercentCounterLoader() {
  const [value, setValue] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(100); return; }
    setValue(0);
    let frame = 0;
    const start = performance.now();
    const step = (time: number) => { const t = Math.min(1, (time - start) / 2600); setValue(Math.round(100 * (1 - (1 - t) ** 3))); if (t < 1) frame = requestAnimationFrame(step); };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [run]);

  const label = value < 40 ? 'Loading assets' : value < 85 ? 'Preparing fonts' : 'Almost there';
  const done = value >= 100;

  return (
    <div className="relative h-72 w-full max-w-lg overflow-hidden rounded-2xl bg-[#efece6] dark:bg-zinc-900">
      <div className="grid h-full place-items-center"><p className="font-serif text-5xl text-zinc-900 dark:text-zinc-50">Hello.</p><button type="button" onClick={() => setRun((count) => count + 1)} className="absolute bottom-4 right-4 text-xs text-zinc-600 underline dark:text-zinc-400">Replay</button></div>
      <div className={`absolute inset-0 flex flex-col justify-between bg-zinc-950 p-6 text-white transition-transform delay-200 duration-700 ease-[cubic-bezier(.77,0,.18,1)] ${done ? '-translate-y-full' : ''}`}>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{label}…</p>
        <div>
          <p role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label="Loading" className="text-right font-mono text-7xl font-light tabular-nums">{value}<span className="text-3xl text-zinc-500">%</span></p>
          <div className="mt-3 h-px bg-white/15"><div className="h-full bg-white" style={{ width: `${value}%` }} /></div>
        </div>
      </div>
    </div>
  );
}
