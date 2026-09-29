/**
 * @registry
 * name: Forgot Password
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Recuperation de mot de passe en deux etats : saisie de l email puis confirmation avec renvoi temporise.
 * prompt: Create a forgot-password card: key icon, title and email field; after submit it switches to a "Check your email" state showing the address, an "Open email app" button and a "Resend" link disabled with a 30s countdown; "Back to log in" link at the bottom. Light and dark mode.
 */
'use client';
import { ArrowLeft, KeyRound, MailCheck } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [wait, setWait] = useState(0);

  useEffect(() => {
    if (!wait) return;
    const timer = window.setTimeout(() => setWait(wait - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [wait]);

  function submit(event: FormEvent) { event.preventDefault(); setSent(true); setWait(30); }

  return (
    <div className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-zinc-200 text-zinc-700 dark:border-zinc-800 dark:text-zinc-200">{sent ? <MailCheck aria-hidden className="size-5" /> : <KeyRound aria-hidden className="size-5" />}</span>
      {sent ? (
        <div role="status">
          <h2 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">Check your email</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">We sent a reset link to <strong className="text-zinc-900 dark:text-white">{email || 'you@company.com'}</strong></p>
          <button type="button" className="mt-6 w-full rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Open email app</button>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">Didn&apos;t receive it? <button type="button" disabled={wait > 0} onClick={() => setWait(30)} className="font-medium text-teal-700 enabled:hover:underline disabled:text-zinc-400 dark:text-teal-400">{wait ? `Resend in ${wait}s` : 'Resend'}</button></p>
        </div>
      ) : (
        <form onSubmit={submit}>
          <h2 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">Forgot password?</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">No worries, we&apos;ll send you reset instructions.</p>
          <label className="mt-6 block text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Email<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className="mt-1.5 h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white" /></label>
          <button type="submit" className="mt-5 w-full rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">Reset password</button>
        </form>
      )}
      <a href="#" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"><ArrowLeft aria-hidden className="size-4" /> Back to log in</a>
    </div>
  );
}
