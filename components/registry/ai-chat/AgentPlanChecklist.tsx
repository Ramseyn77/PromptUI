/**
 * @registry
 * name: Agent Plan Checklist
 * category: AI Chat
 * style: Minimal
 * tags: featured, recent
 * description: Plan d'un agent IA dont les tâches se cochent une à une, avec étape en cours, durée et bouton pause.
 * prompt: Create an AI agent plan checklist: "Plan · 5 steps" header with a Pause/Resume button; steps tick off one by one every 1.2s (pending gray circle → spinner for the current one → teal check with elapsed time), the current step label shimmers, and a final summary line appears when done. Respects reduced motion (no shimmer). aria-live updates. Light and dark mode.
 */
'use client';
import { Check, Loader2, Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = ['Read the repository structure', 'Find components without tests', 'Write 6 unit tests', 'Run the test suite', 'Open a pull request'];

export function AgentPlanChecklist() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const done = current >= steps.length;

  useEffect(() => {
    if (paused || done) return;
    const timer = window.setTimeout(() => setCurrent((value) => value + 1), 1200);
    return () => window.clearTimeout(timer);
  }, [current, paused, done]);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-shimmer-text{from{background-position:200% 0}to{background-position:-200% 0}}`}</style>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Plan · {steps.length} steps</p>
        {done ? <button type="button" onClick={() => setCurrent(0)} className="text-xs font-medium text-teal-700 dark:text-teal-400">Run again</button> : <button type="button" onClick={() => setPaused((value) => !value)} className="inline-flex items-center gap-1 rounded-md border border-zinc-300 px-2 py-0.5 text-xs text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">{paused ? <Play aria-hidden className="size-3" /> : <Pause aria-hidden className="size-3" />}{paused ? 'Resume' : 'Pause'}</button>}
      </div>
      <ol aria-live="polite" className="mt-3 space-y-2">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2.5 text-sm">
            {index < current ? <span className="grid size-5 place-items-center rounded-full bg-teal-600 text-white"><Check aria-hidden className="size-3" /></span> : index === current && !done ? <Loader2 aria-hidden className={`size-5 text-teal-600 ${paused ? '' : 'animate-spin'}`} /> : <span className="size-5 rounded-full border-2 border-zinc-200 dark:border-zinc-700" />}
            <span className={index < current ? 'text-zinc-500 line-through decoration-zinc-300 dark:decoration-zinc-600' : index === current ? 'bg-[linear-gradient(90deg,#18181b_40%,#a1a1aa_50%,#18181b_60%)] bg-[length:200%_100%] bg-clip-text font-medium text-transparent motion-safe:animate-[pui-shimmer-text_2s_linear_infinite] motion-reduce:bg-none motion-reduce:text-zinc-900 dark:bg-[linear-gradient(90deg,#fafafa_40%,#52525b_50%,#fafafa_60%)] dark:motion-reduce:text-zinc-100' : 'text-zinc-400'}>{step}</span>
            {index < current && <span className="ml-auto text-[11px] tabular-nums text-zinc-400">{(1.2 + index * 0.3).toFixed(1)}s</span>}
          </li>
        ))}
      </ol>
      {done && <p role="status" className="mt-3 rounded-lg bg-teal-50 px-3 py-2 text-xs text-teal-800 dark:bg-teal-400/10 dark:text-teal-200">Pull request #214 opened with 6 new tests — all passing.</p>}
    </div>
  );
}
