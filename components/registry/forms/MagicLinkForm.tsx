/**
 * @registry
 * name: Magic Link Form
 * category: Forms
 * style: Gradient
 * tags: featured, recent
 * description: Connexion sans mot de passe par lien magique : e-mail validé, écran « vérifiez votre boîte » avec raccourcis messagerie, renvoi avec délai et changement d'adresse.
 * prompt: Create a passwordless magic link sign-in: step 1 a card with logo, "Sign in to Nova", an email field with validation and a gradient "Send magic link" button (loading state); step 2 an animated envelope illustration, "Check your inbox" with the email in bold, text-only quick links (Open Gmail, Open Outlook), a resend button with a 30-second countdown, and "Use a different email" to go back with the field refilled; steps change with focus moved to the new heading and aria-live. Light and dark mode.
 */
'use client';
import { Loader2, Mail } from 'lucide-react';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';

export function MagicLinkForm() {
  const uid = useId();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'form' | 'sent'>('form');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [wait, setWait] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (wait <= 0) return;
    const timer = window.setTimeout(() => setWait(wait - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [wait]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError(true); return; }
    setBusy(true);
    window.setTimeout(() => { setBusy(false); setStep('sent'); setWait(30); window.requestAnimationFrame(() => headingRef.current?.focus()); }, 800);
  }

  return (
    <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-500 to-pink-500 p-px shadow-xl">
      <style>{`@keyframes pui-envelope { 0%, 100% { transform: translateY(0) rotate(-4deg) } 50% { transform: translateY(-6px) rotate(4deg) } }`}</style>
      <div className="rounded-3xl bg-white p-7 dark:bg-zinc-950" aria-live="polite">
        {step === 'form' ? (
          <form onSubmit={submit} noValidate>
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 font-black text-white">N</span>
            <h3 ref={headingRef} tabIndex={-1} className="mt-5 text-xl font-semibold text-zinc-950 outline-none dark:text-white">Sign in to Nova</h3>
            <p className="mt-1 text-sm text-zinc-500">We’ll email you a link. No password needed.</p>
            <label htmlFor={`${uid}-email`} className="mt-5 block text-sm font-medium text-zinc-900 dark:text-zinc-100">Work email</label>
            <input id={`${uid}-email`} type="email" autoComplete="email" value={email} aria-invalid={error} aria-describedby={error ? `${uid}-error` : undefined} onChange={(event) => { setEmail(event.target.value); setError(false); }} placeholder="you@company.com" className={`mt-1.5 w-full rounded-xl border bg-transparent px-3 py-2.5 text-sm text-zinc-900 outline-none focus:ring-2 dark:text-zinc-100 ${error ? 'border-rose-500 focus:ring-rose-500/20' : 'border-zinc-300 focus:ring-violet-500/20 dark:border-zinc-700'}`} />
            {error && <p id={`${uid}-error`} className="mt-1 text-xs text-rose-600 dark:text-rose-400">Enter a valid email address.</p>}
            <button type="submit" disabled={busy} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 py-2.5 text-sm font-semibold text-white disabled:opacity-70">{busy && <Loader2 aria-hidden className="size-4 motion-safe:animate-spin" />}{busy ? 'Sending…' : 'Send magic link'}</button>
          </form>
        ) : (
          <div className="text-center">
            <span aria-hidden className="mx-auto grid size-16 place-items-center rounded-2xl bg-violet-100 text-violet-600 motion-safe:animate-[pui-envelope_2.4s_ease-in-out_infinite] dark:bg-violet-500/15 dark:text-violet-300"><Mail className="size-8" /></span>
            <h3 ref={headingRef} tabIndex={-1} className="mt-5 text-xl font-semibold text-zinc-950 outline-none dark:text-white">Check your inbox</h3>
            <p className="mt-1 text-sm text-zinc-500">We sent a sign-in link to <strong className="text-zinc-900 dark:text-zinc-100">{email}</strong>. It expires in 15 minutes.</p>
            <div className="mt-5 grid grid-cols-2 gap-2">{['Open Gmail', 'Open Outlook'].map((label) => <a key={label} href="#" className="rounded-xl border border-zinc-200 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900">{label}</a>)}</div>
            <button type="button" disabled={wait > 0} onClick={() => setWait(30)} className="mt-4 text-sm font-medium text-violet-600 disabled:text-zinc-400 dark:text-violet-400">{wait > 0 ? `Resend in ${wait}s` : 'Resend link'}</button>
            <button type="button" onClick={() => { setStep('form'); window.requestAnimationFrame(() => headingRef.current?.focus()); }} className="mt-2 block w-full text-xs text-zinc-500 underline">Use a different email</button>
          </div>
        )}
      </div>
    </div>
  );
}
