/**
 * @registry
 * name: Contact Form Footer
 * category: Footer
 * style: SaaS
 * tags: recent
 * description: Footer avec mini formulaire de contact (e-mail + message), coordonnées et liens, confirmation après envoi.
 * prompt: Create a footer with an inline contact form: left side has brand, address, email and phone with icons; right side a compact form (email, message textarea with character counter, Send button) that validates email, shows a loading state then a success message (aria-live) and resets; link row and copyright at the bottom; stacks on mobile. Light and dark mode.
 */
'use client';
import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';

export function ContactFormFooter() {
  const uid = useId();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setState('error'); return; }
    setState('sending');
    window.setTimeout(() => { setState('sent'); setEmail(''); setMessage(''); }, 900);
  }

  return (
    <footer className="w-full border-t border-zinc-200 bg-white px-6 py-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <div>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Northwind Studio</p>
          <p className="mt-2 max-w-xs text-sm text-zinc-500">Product design and engineering for teams who ship.</p>
          <ul className="mt-5 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex items-center gap-2"><MapPin aria-hidden className="size-4 text-zinc-400" />12 Canal Street, Amsterdam</li>
            <li className="flex items-center gap-2"><Mail aria-hidden className="size-4 text-zinc-400" />hello@northwind.studio</li>
            <li className="flex items-center gap-2"><Phone aria-hidden className="size-4 text-zinc-400" />+31 20 555 0134</li>
          </ul>
        </div>
        <form onSubmit={submit} noValidate className="space-y-3">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Get in touch</p>
          <div>
            <label htmlFor={`${uid}-email`} className="sr-only">Email</label>
            <input id={`${uid}-email`} type="email" value={email} onChange={(event) => { setEmail(event.target.value); if (state === 'error') setState('idle'); }} placeholder="you@company.com" aria-invalid={state === 'error'} aria-describedby={state === 'error' ? `${uid}-error` : undefined} className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500/30 dark:text-zinc-100 ${state === 'error' ? 'border-rose-500' : 'border-zinc-300 dark:border-zinc-700'}`} />
            {state === 'error' && <p id={`${uid}-error`} className="mt-1 text-xs text-rose-600 dark:text-rose-400">Enter a valid email address.</p>}
          </div>
          <div>
            <label htmlFor={`${uid}-message`} className="sr-only">Message</label>
            <textarea id={`${uid}-message`} rows={3} maxLength={280} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell us about your project" className="w-full resize-none rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:text-zinc-100" />
            <p className="text-right text-[11px] tabular-nums text-zinc-400">{message.length}/280</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" disabled={state === 'sending'} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60">{state === 'sending' ? 'Sending…' : 'Send'}</button>
            <p aria-live="polite" className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">{state === 'sent' && <><Check aria-hidden className="size-4" />Thanks, we’ll reply within a day.</>}</p>
          </div>
        </form>
      </div>
      <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-3 border-t border-zinc-100 pt-6 text-xs text-zinc-500 sm:flex-row sm:justify-between dark:border-zinc-900">
        <p>© 2026 Northwind Studio</p>
        <nav aria-label="Footer" className="flex gap-4">{['Work', 'Services', 'Careers', 'Privacy'].map((link) => <a key={link} href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">{link}</a>)}</nav>
      </div>
    </footer>
  );
}
