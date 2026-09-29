/**
 * @registry
 * name: Agent Trace
 * category: AI Chat
 * style: Dark
 * tags: featured, recent
 * description: Chronologie d un agent IA qui execute ses etapes une a une : recherche, outil, redaction.
 * prompt: Create an AI agent run trace: a vertical timeline of steps (Plan, Search docs, Run tool, Write answer) that complete one after another; each shows a spinner while running, a check when done, a duration and a muted detail line. "Replay" restarts it. role="list", light and dark mode.
 */
'use client';
import { Check, Loader2, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = [
  { title: 'Plan the task', detail: 'Split into 3 sub-goals', time: '0.4s' },
  { title: 'Search docs', detail: '12 pages · 3 relevant', time: '1.2s' },
  { title: 'Run tool: lint', detail: '0 errors, 2 warnings', time: '0.8s' },
  { title: 'Write the answer', detail: '214 tokens', time: '1.6s' },
];

export function AgentTrace() {
  const [done, setDone] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    setDone(0);
    const timer = window.setInterval(() => setDone((value) => Math.min(value + 1, steps.length)), 900);
    return () => window.clearInterval(timer);
  }, [run]);

  return (
    <section className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-900 dark:text-white">Agent run</p>
        <button type="button" onClick={() => setRun((value) => value + 1)} className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"><RotateCcw aria-hidden className="size-3.5" /> Replay</button>
      </div>
      <ol className="mt-4">
        {steps.map((step, index) => {
          const state = index < done ? 'done' : index === done ? 'running' : 'waiting';
          return (
            <li key={step.title} className="relative flex gap-3 pb-5 last:pb-0">
              {index < steps.length - 1 && <span aria-hidden className={`absolute left-[11px] top-7 h-[calc(100%-1.5rem)] w-px ${state === 'done' ? 'bg-teal-500' : 'bg-zinc-200 dark:bg-zinc-800'}`} />}
              <span className={`grid size-6 shrink-0 place-items-center rounded-full ${state === 'done' ? 'bg-teal-500 text-white' : state === 'running' ? 'bg-violet-500/15 text-violet-600 dark:text-violet-400' : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800'}`}>
                {state === 'done' ? <Check aria-hidden className="size-3.5" /> : state === 'running' ? <Loader2 aria-hidden className="size-3.5 motion-safe:animate-spin" /> : <span className="size-1.5 rounded-full bg-current" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className={`flex justify-between text-sm font-medium ${state === 'waiting' ? 'text-zinc-400' : 'text-zinc-900 dark:text-white'}`}>{step.title}{state === 'done' && <span className="font-mono text-xs text-zinc-400">{step.time}</span>}</p>
                {state !== 'waiting' && <p className="text-xs text-zinc-500 dark:text-zinc-400">{state === 'running' ? 'Working…' : step.detail}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
