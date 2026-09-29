/**
 * @registry
 * name: Terms Consent Form
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Cases de consentement obligatoire et optionnelle avec erreur si non cochee a l envoi.
 * prompt: Create signup consent checkboxes: a required "I agree to the Terms and Privacy Policy" (links inside the label) and an optional marketing opt-in with helper text; submitting without the required one shows an error (aria-invalid, aria-describedby, focus moved) and a success message otherwise. Light and dark mode.
 */
'use client';
import { useRef, useState, type FormEvent } from 'react';

export function TermsConsentForm() {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const required = useRef<HTMLInputElement>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!agreed) { setError(true); required.current?.focus(); return; }
    setDone(true);
  }

  return (
    <form onSubmit={submit} noValidate className="w-full max-w-sm space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <label className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
          <input ref={required} type="checkbox" checked={agreed} onChange={(event) => { setAgreed(event.target.checked); setError(false); }} aria-invalid={error} aria-describedby={error ? 'consent-error' : undefined} className="mt-0.5 size-4 accent-teal-600" />
          <span>I agree to the <a href="#" className="font-medium text-teal-700 underline dark:text-teal-400">Terms</a> and <a href="#" className="font-medium text-teal-700 underline dark:text-teal-400">Privacy Policy</a> <span aria-hidden className="text-rose-500">*</span></span>
        </label>
        {error && <p id="consent-error" className="ml-7 mt-1 text-xs text-rose-600 dark:text-rose-400">You need to accept the terms to continue.</p>}
      </div>
      <label className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
        <input type="checkbox" aria-describedby="marketing-hint" className="mt-0.5 size-4 accent-teal-600" />
        <span>Send me product news<span id="marketing-hint" className="block text-xs text-zinc-500">About one email a month. Unsubscribe anytime.</span></span>
      </label>
      <button type="submit" className="w-full rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">Create account</button>
      {done && <p role="status" className="text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">Account created 🎉</p>}
    </form>
  );
}
