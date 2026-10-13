/**
 * @registry
 * name: Wizard Steps Sidebar
 * category: Sidebar
 * style: SaaS
 * tags: recent
 * description: Barre latérale d'assistant multi-étapes : étapes verticales avec statut (fait, en cours, à venir), aide contextuelle et contenu de l'étape à droite.
 * prompt: Create a wizard layout with a vertical steps sidebar: 5 steps (Company, Team, Integrations, Billing, Review) each with an icon circle showing done (check), current (ring) or upcoming state, a title and short description, connected by a vertical line that fills for completed steps; completed and current steps are clickable (aria-current="step"); the main panel shows the current step's simple form with Back / Continue; a help card at the sidebar bottom; on mobile the sidebar collapses into a horizontal "Step 2 of 5" progress header. Light and dark mode.
 */
'use client';
import { Check, LifeBuoy } from 'lucide-react';
import { useId, useState } from 'react';

const steps = [['Company', 'Name and size'], ['Team', 'Invite your teammates'], ['Integrations', 'Connect your tools'], ['Billing', 'Choose a plan'], ['Review', 'Confirm and launch']];

export function WizardStepsSidebar() {
  const uid = useId();
  const [current, setCurrent] = useState(1);
  const [reached, setReached] = useState(1);
  const go = (index: number) => { setCurrent(index); setReached(Math.max(reached, index)); };

  return (
    <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white sm:min-h-[26rem] sm:flex-row dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 p-4 sm:hidden dark:border-zinc-800"><p className="text-xs text-zinc-500">Step {current + 1} of {steps.length}</p><p className="font-semibold text-zinc-950 dark:text-white">{steps[current][0]}</p><div className="mt-2 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${((current + 1) / steps.length) * 100}%` }} /></div></div>
      <nav aria-label="Setup steps" className="hidden w-64 shrink-0 flex-col border-r border-zinc-200 bg-zinc-50 p-5 sm:flex dark:border-zinc-800 dark:bg-zinc-900">
        <ol className="flex-1">
          {steps.map(([title, hint], index) => {
            const done = index < current;
            const active = index === current;
            const reachable = index <= reached;
            return (
              <li key={title} className="relative pb-6 last:pb-0">
                {index < steps.length - 1 && <span aria-hidden className={`absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 ${done ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-700'}`} />}
                <button type="button" disabled={!reachable} aria-current={active ? 'step' : undefined} onClick={() => go(index)} className="flex w-full items-start gap-3 rounded-lg text-left disabled:cursor-not-allowed">
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${done ? 'bg-indigo-600 text-white' : active ? 'bg-white text-indigo-600 ring-2 ring-indigo-600 dark:bg-zinc-950' : 'bg-white text-zinc-400 ring-1 ring-zinc-300 dark:bg-zinc-950 dark:ring-zinc-700'}`}>{done ? <Check aria-hidden className="size-4" /> : index + 1}</span>
                  <span><span className={`block text-sm font-medium ${active ? 'text-indigo-700 dark:text-indigo-300' : reachable ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}>{title}</span><span className="block text-xs text-zinc-500">{hint}</span>{done && <span className="sr-only"> (completed)</span>}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-6 rounded-xl bg-white p-3 text-xs text-zinc-600 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:text-zinc-400 dark:ring-zinc-800"><LifeBuoy aria-hidden className="mb-1 size-4 text-indigo-600" />Stuck? <a href="#" className="font-medium text-indigo-600 underline dark:text-indigo-400">Book a 15-min setup call</a>.</div>
      </nav>
      <section aria-labelledby={`${uid}-title`} className="flex flex-1 flex-col p-6">
        <h3 id={`${uid}-title`} className="text-lg font-semibold text-zinc-950 dark:text-white">{steps[current][0]}</h3>
        <p className="text-sm text-zinc-500">{steps[current][1]}</p>
        <div className="mt-5 space-y-3">
          {current === 1 ? ['ava@kora.io', 'leo@kora.io', ''].map((value, index) => <input key={index} aria-label={`Teammate email ${index + 1}`} defaultValue={value} placeholder="name@company.com" className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100" />)
            : <div className="grid h-28 place-items-center rounded-xl border-2 border-dashed border-zinc-200 text-sm text-zinc-400 dark:border-zinc-800">{steps[current][0]} settings</div>}
        </div>
        <div className="mt-auto flex justify-between pt-6">
          <button type="button" disabled={current === 0} onClick={() => setCurrent(current - 1)} className="rounded-lg px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100 disabled:invisible dark:text-zinc-300 dark:hover:bg-zinc-800">Back</button>
          <button type="button" onClick={() => current < steps.length - 1 && go(current + 1)} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">{current === steps.length - 1 ? 'Launch workspace' : 'Continue'}</button>
        </div>
      </section>
    </div>
  );
}
