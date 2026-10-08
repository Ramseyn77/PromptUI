/**
 * @registry
 * name: Battery Charge Loader
 * category: Loader
 * style: Gradient
 * tags: recent
 * description: Loader en batterie qui se remplit par segments, couleur du rouge au vert, éclair pulsant et pourcentage.
 * prompt: Create a battery charging loader: a rounded battery outline with a terminal nub, five inner segments that fill one by one in a loop, the fill color shifts from rose to amber to emerald with charge, a pulsing lightning bolt overlay, a percentage label that counts with the progress (aria-valuenow on a progressbar), and "Charging…" caption; reduced motion shows a static 60% state. Light and dark mode.
 */
'use client';
import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BatteryChargeLoader() {
  const [level, setLevel] = useState(60);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setLevel((value) => (value >= 100 ? 0 : value + 4)), 120);
    return () => window.clearInterval(timer);
  }, []);

  const filled = Math.ceil(level / 20);
  const color = level < 35 ? 'from-rose-500 to-orange-400' : level < 70 ? 'from-amber-400 to-yellow-300' : 'from-emerald-500 to-lime-400';

  return (
    <div className="flex flex-col items-center gap-3 p-6">
      <div role="progressbar" aria-label="Battery charge" aria-valuemin={0} aria-valuemax={100} aria-valuenow={level} className="relative flex items-center">
        <div className="flex h-16 w-32 gap-1 rounded-xl border-[3px] border-zinc-800 p-1.5 dark:border-zinc-200">
          {[0, 1, 2, 3, 4].map((index) => <span key={index} className={`flex-1 rounded-[4px] bg-gradient-to-b transition-opacity duration-150 ${color} ${index < filled ? 'opacity-100' : 'opacity-10'}`} />)}
        </div>
        <span aria-hidden className="ml-0.5 h-6 w-1.5 rounded-r-md bg-zinc-800 dark:bg-zinc-200" />
        <Zap aria-hidden className="absolute left-1/2 top-1/2 size-8 -translate-x-[60%] -translate-y-1/2 fill-white stroke-zinc-900 drop-shadow motion-safe:animate-pulse dark:stroke-zinc-950" />
      </div>
      <p className="text-sm text-zinc-500"><span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{level}%</span> · Charging…</p>
    </div>
  );
}
