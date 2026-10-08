/**
 * @registry
 * name: Realtime Visitors
 * category: Dashboard
 * style: Dark
 * tags: featured, recent
 * description: Compteur de visiteurs en temps réel avec point pulsant et histogramme qui défile chaque seconde.
 * prompt: Create a realtime visitors widget: pulsing "Live" dot, a big number that updates every second with small random changes, and a 30-bar histogram that shifts left as new values arrive (last bar highlighted); top pages list below. aria-live="off" for the ticking number with an sr-only summary. Light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

const seed = Array.from({ length: 30 }, (_, index) => 40 + Math.round(Math.sin(index / 3) * 12 + (index % 5) * 3));

export function RealtimeVisitors() {
  const [bars, setBars] = useState(seed);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setBars((current) => [...current.slice(1), Math.max(20, Math.min(80, current[current.length - 1] + Math.round((Math.random() - 0.5) * 14)))]);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const now = bars[bars.length - 1];
  return (
    <>
      <style>{`@keyframes pui-live{0%{box-shadow:0 0 0 0 rgba(16,185,129,.6)}100%{box-shadow:0 0 0 8px rgba(16,185,129,0)}}`}</style>
      <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400"><span className="size-2 rounded-full bg-emerald-500 motion-safe:animate-[pui-live_1.4s_ease-out_infinite]" /> Live visitors</p>
        <p className="mt-2 text-4xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-white" aria-hidden>{now * 3}</p>
        <p className="sr-only">About {Math.round(now / 10) * 30} visitors right now</p>
        <div aria-hidden className="mt-4 flex h-16 items-end gap-[3px]">
          {bars.map((value, index) => <span key={index} className={`flex-1 rounded-sm transition-all duration-500 ${index === bars.length - 1 ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-800'}`} style={{ height: `${value}%` }} />)}
        </div>
        <ul className="mt-4 space-y-1.5 text-sm">
          {[['/pricing', 42], ['/docs/getting-started', 31], ['/blog/launch', 18]].map(([path, share]) => (
            <li key={path as string} className="flex justify-between text-zinc-600 dark:text-zinc-400"><span className="truncate font-mono text-xs">{path}</span><span className="tabular-nums">{share}%</span></li>
          ))}
        </ul>
      </section>
    </>
  );
}
