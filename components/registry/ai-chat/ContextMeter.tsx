/**
 * @registry
 * name: Context Meter
 * category: AI Chat
 * style: Minimal
 * tags: recent
 * description: Jauge circulaire de fenetre de contexte avec detail des tokens et alerte quand elle se remplit.
 * prompt: Create an AI context-window meter: a small SVG ring showing percent used (stroke-dasharray), color shifting from teal to amber to rose as it fills, a breakdown list (system, files, conversation) and a slider to simulate usage. role="meter" with aria-valuenow. Light and dark mode.
 */
'use client';
import { useState } from 'react';

export function ContextMeter() {
  const [used, setUsed] = useState(62);
  const color = used > 85 ? '#f43f5e' : used > 65 ? '#f59e0b' : '#14b8a6';
  const circumference = 2 * Math.PI * 16;

  return (
    <div className="w-full max-w-xs rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-4">
        <div role="meter" aria-label="Context used" aria-valuenow={used} aria-valuemin={0} aria-valuemax={100} className="relative size-16">
          <svg viewBox="0 0 40 40" className="size-16 -rotate-90">
            <circle cx="20" cy="20" r="16" fill="none" strokeWidth="4" className="stroke-zinc-100 dark:stroke-zinc-800" />
            <circle cx="20" cy="20" r="16" fill="none" strokeWidth="4" strokeLinecap="round" stroke={color} strokeDasharray={circumference} strokeDashoffset={circumference * (1 - used / 100)} className="transition-[stroke-dashoffset,stroke] duration-500" />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-xs font-semibold text-zinc-900 dark:text-white">{used}%</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Context window</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{Math.round(used * 2)}k / 200k tokens</p>
          {used > 85 && <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">Almost full, older messages will be summarized.</p>}
        </div>
      </div>
      <dl className="mt-4 space-y-1.5 text-xs">
        {[['System', 0.1], ['Files', 0.35], ['Conversation', 0.55]].map(([label, share]) => (
          <div key={label as string} className="flex justify-between text-zinc-600 dark:text-zinc-400"><dt>{label as string}</dt><dd className="font-mono">{Math.round(used * 2 * (share as number))}k</dd></div>
        ))}
      </dl>
      <label className="mt-4 block text-xs text-zinc-500 dark:text-zinc-400">
        Simulate usage
        <input type="range" min={0} max={100} value={used} onChange={(event) => setUsed(Number(event.target.value))} className="mt-1 w-full accent-teal-600" />
      </label>
    </div>
  );
}
