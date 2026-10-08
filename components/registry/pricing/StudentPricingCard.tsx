/**
 * @registry
 * name: Student Pricing Card
 * category: Pricing
 * style: Editorial
 * tags: recent
 * description: Offre étudiante : vérification par email universitaire, prix réduit qui se débloque et éligibilité expliquée.
 * prompt: Create a student pricing card: crossed regular price and a locked student price; a school email field that validates .edu/.ac.* domains (aria-invalid + message) and a Verify button that shows a short pending state then unlocks the price with a confetti-free success badge; small print about eligibility. Editorial serif heading. Light and dark mode.
 */
'use client';
import { GraduationCap, Lock, LockOpen } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export function StudentPricingCard() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'pending' | 'verified'>('idle');

  function verify(event: FormEvent) {
    event.preventDefault();
    if (!/@[^@]+\.(edu|ac\.[a-z]{2,})$/i.test(email)) { setState('error'); return; }
    setState('pending');
    window.setTimeout(() => setState('verified'), 900);
  }

  return (
    <section className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <GraduationCap aria-hidden className="size-8 text-indigo-600 dark:text-indigo-400" />
      <h3 className="mt-3 font-serif text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Student plan</h3>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="text-zinc-400 line-through">$16</span>
        <span className={`text-4xl font-bold transition ${state === 'verified' ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-300 blur-[2px] dark:text-zinc-700'}`}>$4</span>
        <span className="text-sm text-zinc-500">/mo</span>
        {state === 'verified' ? <LockOpen aria-label="Unlocked" className="size-4 text-emerald-500" /> : <Lock aria-label="Locked" className="size-4 text-zinc-400" />}
      </p>
      {state === 'verified' ? (
        <p role="status" className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">Verified — 75% off for 12 months.</p>
      ) : (
        <form onSubmit={verify} className="mt-4">
          <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">School email
            <input type="email" value={email} aria-invalid={state === 'error'} onChange={(event) => { setEmail(event.target.value); setState('idle'); }} placeholder="you@university.edu" className={`mt-1 w-full rounded-xl border bg-transparent px-3 py-2 text-sm font-normal text-zinc-900 outline-none dark:text-zinc-100 ${state === 'error' ? 'border-rose-500' : 'border-zinc-300 focus:border-indigo-500 dark:border-zinc-700'}`} />
          </label>
          {state === 'error' && <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">Use your .edu or .ac school address.</p>}
          <button type="submit" disabled={state === 'pending'} className="mt-3 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{state === 'pending' ? 'Verifying…' : 'Verify and unlock'}</button>
        </form>
      )}
      <p className="mt-3 text-xs text-zinc-500">For students and teachers at accredited schools. Renew yearly.</p>
    </section>
  );
}
