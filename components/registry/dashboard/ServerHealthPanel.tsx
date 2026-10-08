/**
 * @registry
 * name: Server Health Panel
 * category: Dashboard
 * style: Dark
 * tags: featured, recent
 * description: Panneau de santé serveur en temps réel : CPU, mémoire et disque en anneaux, latence et journal d'événements.
 * prompt: Create a live server health panel on a dark surface: three ring gauges (CPU, Memory, Disk) whose values drift every second within bounds (stops with reduced motion), colors switching teal → amber → rose by threshold, a latency sparkline of the last 20 samples, uptime, and a mini event log with timestamps. role="meter" on gauges. Dark in both themes.
 */
'use client';
import { useEffect, useState } from 'react';

const ring = (value: number) => (value > 85 ? '#f43f5e' : value > 65 ? '#f59e0b' : '#2dd4bf');

export function ServerHealthPanel() {
  const [stats, setStats] = useState({ cpu: 42, memory: 68, disk: 81 });
  const [latency, setLatency] = useState(() => Array.from({ length: 20 }, (_, i) => 40 + ((i * 7) % 15)));

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setStats((value) => ({ cpu: Math.min(97, Math.max(12, value.cpu + Math.round((Math.random() - 0.5) * 14))), memory: Math.min(95, Math.max(40, value.memory + Math.round((Math.random() - 0.5) * 6))), disk: value.disk }));
      setLatency((list) => [...list.slice(1), Math.round(35 + Math.random() * 30)]);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const max = Math.max(...latency);
  const points = latency.map((value, i) => `${((i / 19) * 160).toFixed(1)},${(40 - (value / max) * 36).toFixed(1)}`).join(' ');

  return (
    <section className="w-full max-w-lg rounded-2xl bg-zinc-950 p-5 text-white ring-1 ring-white/10">
      <div className="flex items-center justify-between"><h3 className="font-semibold">api-eu-1</h3><span className="flex items-center gap-1.5 text-xs text-emerald-400"><span className="size-2 animate-pulse rounded-full bg-emerald-400" />Healthy · 41d uptime</span></div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {(Object.entries(stats) as [string, number][]).map(([name, value]) => (
          <div key={name} role="meter" aria-label={name} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} className="text-center">
            <div className="relative mx-auto grid size-20 place-items-center rounded-full transition-[background] duration-700" style={{ background: `conic-gradient(${ring(value)} ${value}%, #ffffff14 0)` }}>
              <span className="grid size-16 place-items-center rounded-full bg-zinc-950 text-lg font-bold tabular-nums">{value}%</span>
            </div>
            <p className="mt-1.5 text-xs capitalize text-zinc-400">{name}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl bg-white/5 p-3">
        <div className="flex justify-between text-xs text-zinc-400"><span>p95 latency</span><span className="tabular-nums text-white">{latency[latency.length - 1]} ms</span></div>
        <svg viewBox="0 0 160 42" aria-hidden className="mt-1 h-10 w-full" preserveAspectRatio="none"><polyline points={points} fill="none" stroke="#2dd4bf" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg>
      </div>
      <ul className="mt-4 space-y-1 font-mono text-[11px] text-zinc-400">
        <li><span className="text-zinc-600">14:02:11</span> autoscale +1 node</li>
        <li><span className="text-zinc-600">13:58:40</span> <span className="text-amber-300">disk usage above 80%</span></li>
        <li><span className="text-zinc-600">13:41:05</span> deploy v4.2.1 succeeded</li>
      </ul>
    </section>
  );
}
