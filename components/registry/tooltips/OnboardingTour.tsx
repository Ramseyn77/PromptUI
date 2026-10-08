/**
 * @registry
 * name: Onboarding Tour
 * category: Tooltips
 * style: SaaS
 * tags: featured, recent
 * description: Visite guidée façon Ant Design Tour : la zone ciblée est mise en lumière et une bulle explique chaque étape.
 * prompt: Create an onboarding tour (Ant Design Tour / Mantine spotlight): a mini app layout (sidebar, search, new button); the current target gets a teal ring and lifts above a dimmed overlay, and a step popover with arrow appears next to it ("Step 2 of 3", title, text, Back/Next/Skip). Finish shows a "You're all set" toast. Popover is role="dialog" with aria-live step text. Light and dark mode.
 */
'use client';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

const steps = [
  { target: 'search', title: 'Find anything', text: 'Search projects, people and docs with ⌘K.' },
  { target: 'new', title: 'Create a project', text: 'Start from a template or a blank canvas.' },
  { target: 'nav', title: 'Your workspace', text: 'Switch between projects from the sidebar.' },
];

export function OnboardingTour() {
  const [step, setStep] = useState(0);
  const done = step >= steps.length;
  const current = steps[step];
  const ring = (target: string) => (!done && current.target === target ? 'relative z-20 ring-2 ring-teal-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950' : '');

  return (
    <div className="relative h-80 w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      {!done && <div aria-hidden className="absolute inset-0 z-10 bg-zinc-950/40 dark:bg-black/60" />}
      <div className="flex h-full">
        <nav className={`w-28 shrink-0 space-y-1 border-r border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900 ${ring('nav')}`}>
          {['Home', 'Projects', 'Team'].map((item) => <p key={item} className="rounded-md px-2 py-1 text-xs text-zinc-600 dark:text-zinc-300">{item}</p>)}
        </nav>
        <div className="flex-1 p-4">
          <div className="flex gap-2">
            <div className={`flex flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 ${ring('search')}`}><Search aria-hidden className="size-3.5" />Search…</div>
            <span className={`inline-flex items-center gap-1 rounded-lg bg-teal-600 px-2.5 text-xs font-semibold text-white ${ring('new')}`}><Plus aria-hidden className="size-3.5" />New</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">{[0, 1, 2, 3].map((tile) => <div key={tile} className="h-14 rounded-lg bg-zinc-100 dark:bg-zinc-900" />)}</div>
        </div>
      </div>
      {!done ? (
        <div role="dialog" aria-label="Product tour" className={`absolute z-30 w-60 rounded-xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 ${current.target === 'nav' ? 'left-32 top-6' : current.target === 'new' ? 'right-3 top-16' : 'left-36 top-16'}`}>
          <p aria-live="polite" className="text-[11px] font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">Step {step + 1} of {steps.length}</p>
          <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{current.title}</p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{current.text}</p>
          <div className="mt-3 flex items-center gap-2">
            <button type="button" onClick={() => setStep(steps.length)} className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">Skip</button>
            <button type="button" disabled={step === 0} onClick={() => setStep((value) => value - 1)} className="ml-auto rounded-md px-2 py-1 text-xs font-medium text-zinc-700 disabled:opacity-30 dark:text-zinc-300">Back</button>
            <button type="button" onClick={() => setStep((value) => value + 1)} className="rounded-md bg-teal-600 px-2.5 py-1 text-xs font-semibold text-white">{step === steps.length - 1 ? 'Finish' : 'Next'}</button>
          </div>
        </div>
      ) : (
        <div role="status" className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full bg-zinc-950 px-4 py-2 text-xs text-white shadow-lg dark:bg-white dark:text-zinc-950">You're all set 🎉<button type="button" onClick={() => setStep(0)} className="font-semibold underline">Replay</button></div>
      )}
    </div>
  );
}
