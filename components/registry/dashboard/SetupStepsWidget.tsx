/**
 * @registry
 * name: Setup Steps Widget
 * category: Dashboard
 * style: SaaS
 * tags: recent
 * description: Widget de mise en route avec étapes façon daisyUI steps, progression et action pour l'étape en cours.
 * prompt: Create an onboarding setup widget: horizontal daisyUI-style steps (Connect domain, Invite team, Add payment, Launch) with numbered circles joined by lines, completed steps teal with checks; below, the current step's card with description and a primary action that completes it and advances; a dismiss button and "2 of 4 done" label. Steps become vertical on mobile. Light and dark mode.
 */
'use client';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

const steps = [
  { title: 'Connect domain', text: 'Point acme.com to your workspace in two DNS records.', action: 'Add records' },
  { title: 'Invite team', text: 'Bring in teammates so they can review and publish.', action: 'Send invites' },
  { title: 'Add payment', text: 'Add a card to keep your site online after the trial.', action: 'Add card' },
  { title: 'Launch', text: 'Everything is ready. Publish your site to the world.', action: 'Publish' },
];

export function SetupStepsWidget() {
  const [done, setDone] = useState(2);
  const [hidden, setHidden] = useState(false);

  if (hidden) return <button type="button" onClick={() => setHidden(false)} className="text-sm font-medium text-teal-700 underline dark:text-teal-400">Show setup guide</button>;

  return (
    <section className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Get set up</h3>
        <div className="flex items-center gap-3"><span aria-live="polite" className="text-xs text-zinc-500">{Math.min(done, steps.length)} of {steps.length} done</span><button type="button" aria-label="Dismiss setup guide" onClick={() => setHidden(true)} className="grid size-7 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"><X aria-hidden className="size-4" /></button></div>
      </div>
      <ol className="mt-5 flex flex-col gap-3 md:flex-row md:gap-0">
        {steps.map((step, index) => (
          <li key={step.title} className="flex items-center gap-3 md:flex-1 md:flex-col md:gap-2 md:text-center">
            <div className="relative flex items-center md:w-full md:justify-center">
              {index > 0 && <span aria-hidden className={`absolute right-1/2 hidden h-0.5 w-full md:block ${index <= done ? 'bg-teal-500' : 'bg-zinc-200 dark:bg-zinc-800'}`} />}
              <span className={`relative grid size-8 place-items-center rounded-full text-sm font-semibold ${index < done ? 'bg-teal-600 text-white' : index === done ? 'border-2 border-teal-600 bg-white text-teal-700 dark:bg-zinc-950 dark:text-teal-400' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'}`}>{index < done ? <Check aria-hidden className="size-4" /> : index + 1}</span>
            </div>
            <span className={`text-sm ${index === done ? 'font-semibold text-zinc-900 dark:text-zinc-100' : 'text-zinc-500'}`}>{step.title}<span className="sr-only">{index < done ? ' (done)' : index === done ? ' (current)' : ''}</span></span>
          </li>
        ))}
      </ol>
      {done < steps.length ? (
        <div className="mt-5 flex flex-col gap-3 rounded-xl bg-zinc-50 p-4 sm:flex-row sm:items-center dark:bg-zinc-900">
          <p className="flex-1 text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-zinc-100">{steps[done].title}.</strong> {steps[done].text}</p>
          <button type="button" onClick={() => setDone((value) => value + 1)} className="rounded-lg bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-500">{steps[done].action}</button>
        </div>
      ) : <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">🚀 You're live! <button type="button" onClick={() => setDone(0)} className="ml-2 underline">Reset demo</button></p>}
    </section>
  );
}
