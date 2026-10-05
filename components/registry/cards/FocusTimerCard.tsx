/**
 * @registry
 * name: Focus Timer Card
 * category: Cards
 * style: Minimal
 * tags: recent
 * description: Minuteur de concentration compact avec progression circulaire, pause et remise a zero.
 * prompt: Create a responsive focus timer card with a circular countdown, a seconds marker that orbits the dial once per minute while running, start/pause and reset controls, plus selectable 25, 15 and 5 minute presets. Include reduced-motion support and accessible timer semantics.
 */
'use client';

import { Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

const presets = [25, 15, 5];

export function FocusTimerCard() {
  const [duration, setDuration] = useState(25 * 60);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [running, remaining]);

  useEffect(() => { if (remaining === 0) setRunning(false); }, [remaining]);

  const choose = (minutes: number) => {
    setRunning(false);
    setDuration(minutes * 60);
    setRemaining(minutes * 60);
  };
  const progress = 1 - remaining / duration;
  const elapsed = duration - remaining;
  const time = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;

  return (
    <section className="w-full max-w-sm rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-xl shadow-violet-500/10 dark:border-white/10 dark:bg-zinc-950 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-violet-500">Deep work</p><h2 className="mt-1 text-xl font-semibold text-zinc-950 dark:text-white">Focus session</h2></div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">No distractions</span>
      </div>
      <div className="relative mx-auto my-7 grid size-48 place-items-center sm:size-52">
        <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="5" className="text-zinc-100 dark:text-zinc-800" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="url(#focus-gradient)" strokeWidth="5" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress} className="transition-[stroke-dashoffset] duration-500 motion-reduce:transition-none" />
          {/* Seconds marker: one full turn per minute, so a running session visibly moves even when the main ring barely does. */}
          <circle cx="50" cy="50" r="37" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="0.6 3.27" className="text-zinc-200 dark:text-zinc-800" />
          <g style={{ transform: `rotate(${elapsed * 6}deg)`, transformOrigin: '50px 50px' }} className={running ? 'transition-transform duration-1000 ease-linear motion-reduce:transition-none' : ''}>
            <circle cx="87" cy="50" r="2.2" className={running ? 'fill-violet-500' : 'fill-zinc-300 dark:fill-zinc-700'} />
          </g>
          <defs><linearGradient id="focus-gradient"><stop stopColor="#8b5cf6" /><stop offset="1" stopColor="#ec4899" /></linearGradient></defs>
        </svg>
        <div className="text-center"><p role="timer" aria-live="off" className="font-mono text-4xl font-semibold tabular-nums text-zinc-950 dark:text-white sm:text-5xl">{time}</p><p className="mt-2 text-sm text-zinc-500">{running ? 'Stay in the flow' : remaining === 0 ? 'Session complete' : 'Ready when you are'}</p></div>
      </div>
      <div className="flex justify-center gap-2" aria-label="Timer presets">{presets.map((minutes) => <button key={minutes} type="button" onClick={() => choose(minutes)} aria-pressed={duration === minutes * 60} className={`rounded-full px-4 py-2 text-sm font-medium transition ${duration === minutes * 60 ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white'}`}>{minutes} min</button>)}</div>
      <div className="mt-5 flex gap-2">
        <button type="button" onClick={() => remaining === 0 ? choose(duration / 60) : setRunning((value) => !value)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-500">{running ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}{running ? 'Pause' : 'Start'}</button>
        <button type="button" onClick={() => { setRunning(false); setRemaining(duration); }} aria-label="Reset timer" className="grid size-12 place-items-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"><RotateCcw size={18} /></button>
      </div>
    </section>
  );
}
