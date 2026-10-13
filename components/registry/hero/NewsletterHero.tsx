/**
 * @registry
 * name: Newsletter Hero
 * category: Hero
 * style: Editorial
 * tags: recent
 * description: Hero de newsletter éditoriale : nombre d'abonnés, avatars de lecteurs, formulaire e-mail validé et aperçu des trois derniers numéros.
 * prompt: Create an editorial newsletter hero: a small issue counter "Issue #142 · every Sunday", a large serif headline, subcopy, an email form (validation, aria-invalid, success state "Check your inbox to confirm" via aria-live), social proof with stacked reader initials and "Join 48,000 designers"; below, three recent issue cards (number, title, read time) as links; paper background; stacks on mobile. Light (paper) and dark mode.
 */
'use client';
import { useId, useState, type FormEvent } from 'react';

const issues = [['#141', 'The quiet return of skeuomorphism', '6 min'], ['#140', 'Designing for the second visit', '5 min'], ['#139', 'What makes an empty state kind', '4 min']];

export function NewsletterHero() {
  const uid = useId();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'ok'>('idle');

  function submit(event: FormEvent) {
    event.preventDefault();
    setState(/^\S+@\S+\.\S+$/.test(email) ? 'ok' : 'error');
  }

  return (
    <section className="w-full bg-[#f5f0e6] px-6 py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Issue #142 · every Sunday</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-zinc-950 sm:text-6xl dark:text-white">Ideas for people who make interfaces</h1>
        <p className="mx-auto mt-4 max-w-lg text-zinc-600 dark:text-zinc-400">One essay, three links and a tiny tool. Five minutes, no fluff.</p>
        <form onSubmit={submit} noValidate className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
          <label htmlFor={`${uid}-email`} className="sr-only">Email address</label>
          <input id={`${uid}-email`} type="email" value={email} aria-invalid={state === 'error'} aria-describedby={`${uid}-status`} onChange={(event) => { setEmail(event.target.value); setState('idle'); }} placeholder="you@studio.com" className={`min-w-0 flex-1 rounded-full border bg-white px-5 py-3 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/20 dark:bg-zinc-900 dark:text-zinc-100 ${state === 'error' ? 'border-rose-500' : 'border-zinc-900/15 dark:border-white/15'}`} />
          <button type="submit" className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Subscribe</button>
        </form>
        <p id={`${uid}-status`} aria-live="polite" className={`mt-2 h-5 text-sm ${state === 'error' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>{state === 'error' ? 'Please enter a valid email.' : state === 'ok' ? 'Check your inbox to confirm.' : ''}</p>
        <div className="mt-4 flex items-center justify-center gap-3"><ul aria-hidden className="flex -space-x-2">{['AD', 'LM', 'MT', 'KM', 'IR'].map((initials, index) => <li key={initials} className="grid size-8 place-items-center rounded-full text-[10px] font-bold text-white ring-2 ring-[#f5f0e6] dark:ring-zinc-950" style={{ background: `hsl(${index * 60 + 10} 50% 45%)` }}>{initials}</li>)}</ul><p className="text-sm text-zinc-600 dark:text-zinc-400">Join <strong className="text-zinc-950 dark:text-white">48,000</strong> designers</p></div>
      </div>
      <ul className="mx-auto mt-12 grid max-w-4xl gap-3 md:grid-cols-3">
        {issues.map(([number, title, time]) => <li key={number}><a href="#" className="block h-full rounded-2xl bg-white p-5 ring-1 ring-zinc-900/10 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900 dark:ring-white/10"><span className="font-mono text-xs text-zinc-500">{number} · {time}</span><span className="mt-2 block font-serif text-lg leading-snug text-zinc-950 dark:text-white">{title}</span></a></li>)}
      </ul>
    </section>
  );
}
