/**
 * @registry
 * name: Wizard Form
 * category: Forms
 * style: SaaS
 * tags: featured, recent
 * description: Formulaire en plusieurs étapes avec indicateur de progression, retour et récapitulatif final.
 * prompt: Create a 3-step onboarding wizard (Account → Team → Review): a progress header with numbered steps (completed = check), step content with fields that persist in state, Back/Continue buttons (Back disabled on step 1), and a review step summarizing answers with "Edit" links that jump back. Focus moves to the step heading on change. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const steps = ['Account', 'Team', 'Review'];

export function WizardForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: 'Camille', company: 'Lumen', size: '11–50' });
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const field = 'mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white';

  useEffect(() => { if (first.current) { first.current = false; return; } heading.current?.focus(); }, [step]);

  return (
    <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <ol className="flex items-center gap-2">
        {steps.map((label, index) => (
          <li key={label} aria-current={index === step ? 'step' : undefined} className="flex flex-1 items-center gap-2">
            <span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${index < step ? 'bg-teal-600 text-white' : index === step ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800'}`}>{index < step ? <Check aria-hidden className="size-3.5" /> : index + 1}</span>
            <span className={`hidden text-xs font-medium sm:block ${index === step ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>{label}</span>
            {index < steps.length - 1 && <span aria-hidden className={`h-px flex-1 ${index < step ? 'bg-teal-600' : 'bg-zinc-200 dark:bg-zinc-800'}`} />}
          </li>
        ))}
      </ol>
      <h3 ref={heading} tabIndex={-1} className="mt-6 text-lg font-semibold text-zinc-900 outline-none dark:text-white">{steps[step]}</h3>
      <div className="mt-4 min-h-32 space-y-4">
        {step === 0 && <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Your name<input value={data.name} onChange={(event) => setData({ ...data, name: event.target.value })} className={field} /></label>}
        {step === 1 && (
          <>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Company<input value={data.company} onChange={(event) => setData({ ...data, company: event.target.value })} className={field} /></label>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Team size<select value={data.size} onChange={(event) => setData({ ...data, size: event.target.value })} className={field}><option>1–10</option><option>11–50</option><option>51+</option></select></label>
          </>
        )}
        {step === 2 && (
          <dl className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 text-sm dark:divide-zinc-900 dark:border-zinc-800">
            {[['Name', data.name, 0], ['Company', data.company, 1], ['Team size', data.size, 1]].map(([label, value, target]) => (
              <div key={label as string} className="flex items-center justify-between px-3 py-2.5"><dt className="text-zinc-500">{label as string}</dt><dd className="flex items-center gap-3 font-medium text-zinc-900 dark:text-white">{value as string}<button type="button" onClick={() => setStep(target as number)} className="text-xs font-normal text-teal-700 hover:underline dark:text-teal-400">Edit</button></dd></div>
            ))}
          </dl>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-300 dark:hover:bg-zinc-900">Back</button>
        <button type="button" onClick={() => setStep(Math.min(step + 1, steps.length - 1))} className="rounded-xl bg-teal-600 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-700">{step === steps.length - 1 ? 'Create workspace' : 'Continue'}</button>
      </div>
    </div>
  );
}
