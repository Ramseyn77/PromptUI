/**
 * @registry
 * name: Steps Loader
 * category: Loader
 * style: SaaS
 * tags: featured, recent
 * description: Chargement en etapes nommees qui defilent : envoi, analyse, generation, termine.
 * prompt: Create a multi-step loading indicator: a list of steps (Uploading, Analyzing, Generating preview, Done) where the current step shows a spinner, completed steps show checks and future steps are muted; steps advance every second and loop. Current step announced via aria-live. Light and dark mode.
 */
'use client';
import { Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = ['Uploading files', 'Analyzing layout', 'Generating preview', 'Ready'];

export function StepsLoader() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % (steps.length + 1)), 1100);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <ol className="space-y-3">
        {steps.map((step, index) => {
          const state = index < current ? 'done' : index === current ? 'active' : 'todo';
          return (
            <li key={step} className="flex items-center gap-3 text-sm">
              <span className={`grid size-6 place-items-center rounded-full ${state === 'done' ? 'bg-emerald-500 text-white' : state === 'active' ? 'bg-teal-500/15 text-teal-600 dark:text-teal-400' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                {state === 'done' ? <Check aria-hidden className="size-3.5" /> : state === 'active' ? <Loader2 aria-hidden className="size-3.5 motion-safe:animate-spin" /> : null}
              </span>
              <span className={state === 'todo' ? 'text-zinc-400' : 'font-medium text-zinc-900 dark:text-white'}>{step}</span>
            </li>
          );
        })}
      </ol>
      <p aria-live="polite" className="sr-only">{steps[Math.min(current, steps.length - 1)]}</p>
    </div>
  );
}
