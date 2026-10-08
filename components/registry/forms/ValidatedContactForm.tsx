/**
 * @registry
 * name: Validated Contact Form
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Formulaire de contact validé à l'envoi avec erreurs par champ, compteur de caractères et succès.
 * prompt: Create a contact form: name, email, topic <select>, and message textarea with a live character counter (max 500); on submit validate required fields and email format, show per-field errors (aria-invalid, aria-describedby) and focus the first invalid field; on success replace the form with a thank-you panel. 2-column name/email from sm. Light and dark mode.
 */
'use client';
import { CheckCircle2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

export function ValidatedContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const field = 'mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 aria-[invalid=true]:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white';

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};
    if (!String(data.get('name')).trim()) next.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(String(data.get('email')))) next.email = 'Enter a valid email address.';
    if (message.trim().length < 10) next.message = 'Tell us a bit more (10+ characters).';
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) (form.elements.namedItem(first) as HTMLElement).focus();
    else setSent(true);
  }

  if (sent) return (
    <div role="status" className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <CheckCircle2 aria-hidden className="mx-auto size-10 text-emerald-500" />
      <p className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">Message sent!</p>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">We usually reply within one business day.</p>
      <button type="button" onClick={() => { setSent(false); setMessage(''); }} className="mt-5 text-sm font-medium text-teal-700 hover:underline dark:text-teal-400">Send another</button>
    </div>
  );

  const error = (key: keyof Errors) => errors[key] && <p id={`contact-${key}-error`} className="mt-1 text-xs text-rose-600 dark:text-rose-400">{errors[key]}</p>;
  return (
    <form onSubmit={submit} noValidate className="w-full max-w-lg space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Name<input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} className={field} />{error('name')}</label>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email<input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} className={field} />{error('email')}</label>
      </div>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Topic<select name="topic" className={field}><option>General question</option><option>Sales</option><option>Support</option></select></label>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        <span className="flex justify-between">Message<span className="font-normal tabular-nums text-zinc-400">{message.length}/500</span></span>
        <textarea name="message" rows={4} maxLength={500} value={message} onChange={(event) => setMessage(event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} className={`${field} resize-none`} />
        {error('message')}
      </label>
      <button type="submit" className="h-11 w-full rounded-xl bg-teal-600 text-sm font-semibold text-white hover:bg-teal-700">Send message</button>
    </form>
  );
}
