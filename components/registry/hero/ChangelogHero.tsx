/**
 * @registry
 * name: Changelog Hero
 * category: Hero
 * style: Editorial
 * tags: recent
 * description: Hero de page « Nouveautés » : version courante en vedette, liste de mises à jour récentes avec étiquettes et abonnement aux notes de version.
 * prompt: Create a changelog hero for a "What’s new" page: big serif headline with the current version pill "v5.2 · Oct 2026", a featured release card (gradient image area with a mock screenshot, title, summary, tags New/Improved/Fixed), and a side list of the last four releases with date, version and one-liner; an email field + Subscribe to release notes with validation and an aria-live confirmation; stacks on mobile. Light (paper) and dark mode.
 */
'use client';
import { useId, useState, type FormEvent } from 'react';

const releases = [['Oct 2', 'v5.1', 'Bulk edit for tables and boards'], ['Sep 18', 'v5.0', 'New editor, 2× faster load'], ['Sep 4', 'v4.9', 'Comments on any block'], ['Aug 21', 'v4.8', 'Dark mode for exports']];
const tags = [['New', 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300'], ['Improved', 'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300'], ['Fixed', 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300']];

export function ChangelogHero() {
  const uid = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'ok'>('idle');

  function submit(event: FormEvent) {
    event.preventDefault();
    setStatus(/^\S+@\S+\.\S+$/.test(email) ? 'ok' : 'error');
  }

  return (
    <section className="w-full bg-[#f7f4ee] px-6 py-14 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl">
        <span className="rounded-full border border-zinc-900/15 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/15 dark:text-zinc-300">v5.2 · Oct 2026</span>
        <h1 className="mt-5 max-w-2xl font-serif text-5xl leading-tight text-zinc-950 dark:text-white">What’s new in Ledger</h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <article className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-zinc-900">
            <div aria-hidden className="flex h-44 items-end justify-center bg-gradient-to-br from-amber-200 via-rose-200 to-violet-300 px-8 pt-8 dark:from-amber-500/30 dark:via-rose-500/30 dark:to-violet-500/30">
              <div className="h-full w-full rounded-t-xl bg-white/90 p-3 shadow-lg dark:bg-zinc-900/90"><div className="h-2 w-24 rounded bg-zinc-200 dark:bg-zinc-700" /><div className="mt-3 grid grid-cols-3 gap-2">{[0, 1, 2].map((index) => <div key={index} className="h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800" />)}</div></div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-1.5">{tags.map(([label, tone]) => <span key={label} className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${tone}`}>{label}</span>)}</div>
              <h2 className="mt-3 font-serif text-2xl text-zinc-950 dark:text-white">Reports you can schedule</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Send any dashboard as a PDF every Monday, filter it per recipient and track who opened it.</p>
            </div>
          </article>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Earlier releases</h2>
            <ol className="mt-3 divide-y divide-zinc-900/10 dark:divide-white/10">
              {releases.map(([date, version, text]) => <li key={version} className="py-3"><p className="text-xs text-zinc-500">{date} · <span className="font-mono">{version}</span></p><a href="#" className="text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100">{text}</a></li>)}
            </ol>
            <form onSubmit={submit} noValidate className="mt-6">
              <label htmlFor={`${uid}-email`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Get release notes by email</label>
              <div className="mt-2 flex gap-2"><input id={`${uid}-email`} type="email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus('idle'); }} aria-invalid={status === 'error'} placeholder="you@company.com" className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" /><button type="submit" className="rounded-lg bg-zinc-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Subscribe</button></div>
              <p aria-live="polite" className={`mt-1.5 h-4 text-xs ${status === 'error' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>{status === 'error' ? 'Enter a valid email.' : status === 'ok' ? 'Subscribed. See you next release!' : ''}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
