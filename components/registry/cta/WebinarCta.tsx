/**
 * @registry
 * name: Webinar CTA
 * category: CTA
 * style: Editorial
 * tags: recent
 * description: Invitation à un webinaire avec date en grand, intervenants, places restantes et inscription en un champ.
 * prompt: Create a webinar registration CTA: a big date block (OCT 22, 18:00 CET) beside the title and agenda bullets, two speaker avatars with names and roles, a "38 seats left" badge, and an inline email + Register form that switches to a confirmation with "Add to calendar". Two columns from md, stacked on mobile. Light and dark mode.
 */
'use client';
import { CalendarPlus, Check } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export function WebinarCta() {
  const [done, setDone] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setDone(true); };

  return (
    <section className="grid w-full max-w-2xl gap-6 rounded-3xl border border-zinc-200 bg-[#fdfbf7] p-6 md:grid-cols-[auto_1fr] md:p-8 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex w-28 flex-col items-center justify-center rounded-2xl bg-zinc-950 p-4 text-white dark:bg-white dark:text-zinc-950">
        <span className="text-xs font-semibold tracking-[0.25em]">OCT</span>
        <span className="font-serif text-5xl font-bold leading-none">22</span>
        <span className="mt-1 text-xs opacity-70">18:00 CET</span>
      </div>
      <div>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">38 seats left</span>
        <h2 className="mt-3 font-serif text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Design systems that scale to 50 teams</h2>
        <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400"><li>• Tokens and theming without forks</li><li>• Governance that doesn't slow you down</li><li>• Live Q&A</li></ul>
        <div className="mt-4 flex gap-4">
          {[['Ines Duarte', 'Design lead, Northwind', 'from-rose-400 to-amber-300'], ['Sam Okafor', 'Staff engineer, Lumen', 'from-sky-400 to-indigo-500']].map(([name, role, tone]) => <div key={name} className="flex items-center gap-2"><span aria-hidden className={`size-8 rounded-full bg-gradient-to-br ${tone}`} /><span className="text-xs"><span className="block font-semibold text-zinc-900 dark:text-zinc-100">{name}</span><span className="text-zinc-500">{role}</span></span></div>)}
        </div>
        {done ? (
          <p role="status" className="mt-5 flex flex-wrap items-center gap-3 text-sm text-emerald-700 dark:text-emerald-400"><Check aria-hidden className="size-4" />You're registered.<button type="button" className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"><CalendarPlus aria-hidden className="size-3.5" />Add to calendar</button></p>
        ) : (
          <form onSubmit={submit} className="mt-5 flex flex-col gap-2 sm:flex-row">
            <input type="email" required aria-label="Work email" placeholder="you@company.com" className="min-w-0 flex-1 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
            <button type="submit" className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Register free</button>
          </form>
        )}
      </div>
    </section>
  );
}
