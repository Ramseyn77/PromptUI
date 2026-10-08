/**
 * @registry
 * name: Goal Gauge
 * category: Dashboard
 * style: Gradient
 * tags: recent
 * description: Jauge semi-circulaire d'objectif avec dégradé, valeur au centre et reste à atteindre.
 * prompt: Create a half-circle goal gauge: SVG arc track and a gradient progress arc (stroke-dasharray on a path), animated from 0 on mount, center value and "of $50k goal", plus two stat chips below. role="meter". Light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

export function GoalGauge() {
  const target = 72;
  const [value, setValue] = useState(0);
  useEffect(() => { const timer = window.setTimeout(() => setValue(target), 100); return () => window.clearTimeout(timer); }, []);
  const length = Math.PI * 80;

  return (
    <section className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="text-left font-semibold text-zinc-900 dark:text-white">Quarterly goal</h3>
      <div role="meter" aria-label="Goal progress" aria-valuenow={target} aria-valuemin={0} aria-valuemax={100} className="relative mx-auto mt-4 w-56">
        <svg viewBox="0 0 200 110" className="w-full">
          <defs><linearGradient id="gauge-gradient"><stop offset="0" stopColor="#14b8a6" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient></defs>
          <path d="M20 100 A80 80 0 0 1 180 100" fill="none" strokeWidth="16" strokeLinecap="round" className="stroke-zinc-100 dark:stroke-zinc-800" />
          <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="url(#gauge-gradient)" strokeWidth="16" strokeLinecap="round" strokeDasharray={length} strokeDashoffset={length * (1 - value / 100)} className="transition-[stroke-dashoffset] duration-1000 ease-out" />
        </svg>
        <div className="absolute inset-x-0 bottom-0">
          <p className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">$36k</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">of $50k goal · {target}%</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 text-left">
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900"><p className="text-xs text-zinc-500">Remaining</p><p className="font-semibold text-zinc-900 dark:text-white">$14k</p></div>
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900"><p className="text-xs text-zinc-500">Days left</p><p className="font-semibold text-zinc-900 dark:text-white">23</p></div>
      </div>
    </section>
  );
}
