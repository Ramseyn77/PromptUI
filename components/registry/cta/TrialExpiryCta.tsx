/**
 * @registry
 * name: Trial Expiry CTA
 * category: CTA
 * style: SaaS
 * tags: recent
 * description: Bannière de fin d'essai avec jours restants en anneau, ce qui sera perdu et choix du plan pour continuer.
 * prompt: Create a trial-expiry CTA card: a circular progress ring showing "3 days left" of a 14-day trial, a heading "Your trial ends Friday", a short list of what the team will lose (with counts: 12 projects, 4 automations, 3 teammates), a monthly/yearly toggle that updates the Pro price, primary "Upgrade to Pro" and secondary "Talk to sales"; a dismiss link "Remind me tomorrow" collapses it into a slim bar. Light and dark mode.
 */
'use client';
import { Bot, FolderKanban, Users } from 'lucide-react';
import { useState } from 'react';

export function TrialExpiryCta() {
  const [yearly, setYearly] = useState(true);
  const [snoozed, setSnoozed] = useState(false);
  const left = 3;
  const circumference = 2 * 3.1416 * 26;

  if (snoozed) return <div className="flex w-full max-w-lg items-center justify-between rounded-xl bg-amber-50 px-4 py-2.5 text-sm text-amber-900 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-100 dark:ring-amber-500/20"><span>Trial ends in {left} days</span><button type="button" onClick={() => setSnoozed(false)} className="font-semibold underline">Upgrade</button></div>;

  return (
    <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-4">
        <div className="relative size-16 shrink-0">
          <svg viewBox="0 0 64 64" className="size-16 -rotate-90" aria-hidden><circle cx="32" cy="32" r="26" fill="none" strokeWidth="6" className="stroke-zinc-100 dark:stroke-zinc-800" /><circle cx="32" cy="32" r="26" fill="none" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference.toFixed(1)} strokeDashoffset={(circumference * (1 - left / 14)).toFixed(1)} className="stroke-amber-500" /></svg>
          <span className="absolute inset-0 grid place-items-center text-center text-[10px] leading-tight text-zinc-500"><span><strong className="block text-lg text-zinc-900 dark:text-zinc-100">{left}</strong>days</span></span>
        </div>
        <div><h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Your trial ends Friday</h3><p className="text-sm text-zinc-500">Upgrade to keep everything your team set up.</p></div>
      </div>
      <ul className="mt-5 grid grid-cols-3 gap-2 text-center">
        {[[FolderKanban, 12, 'projects'], [Bot, 4, 'automations'], [Users, 3, 'teammates']].map(([Icon, count, label]) => { const I = Icon as typeof Bot; return <li key={label as string} className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900"><I aria-hidden className="mx-auto size-4 text-zinc-400" /><p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">{count as number}</p><p className="text-[11px] text-zinc-500">{label as string}</p></li>; })}
      </ul>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"><input type="checkbox" role="switch" checked={yearly} onChange={(event) => setYearly(event.target.checked)} className="peer sr-only" /><span aria-hidden className="relative h-5 w-9 rounded-full bg-zinc-300 transition peer-checked:bg-indigo-600 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500/50 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-4 dark:bg-zinc-700" />Yearly <span className="rounded bg-emerald-100 px-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">−20%</span></label>
        <p className="text-sm text-zinc-500"><span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">${yearly ? 16 : 20}</span>/seat/mo</p>
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button type="button" className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">Upgrade to Pro</button>
        <button type="button" className="flex-1 rounded-xl border border-zinc-200 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900">Talk to sales</button>
      </div>
      <button type="button" onClick={() => setSnoozed(true)} className="mt-3 w-full text-center text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">Remind me tomorrow</button>
    </section>
  );
}
