/**
 * @registry
 * name: Review With Reply
 * category: Testimonials
 * style: SaaS
 * tags: recent
 * description: Avis client avec note, utilite « Cet avis vous a aide ? » et reponse de l equipe depliable.
 * prompt: Create a product review item: author, star rating, date, title and text, "Was this helpful?" Yes/No buttons that record a vote (aria-pressed) with a thank-you, and a collapsible "Response from the team" block (aria-expanded) with the company avatar. Light and dark mode.
 */
'use client';
import { ChevronDown, Star } from 'lucide-react';
import { useState } from 'react';

export function ReviewWithReply() {
  const [vote, setVote] = useState<'yes' | 'no' | null>(null);
  const [reply, setReply] = useState(true);

  return (
    <article className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-full bg-sky-500/15 text-sm font-semibold text-sky-700 dark:text-sky-300">M</span><div><p className="text-sm font-semibold text-zinc-900 dark:text-white">Moussa K.</p><p className="flex text-amber-400" aria-label="4 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden className={`size-3.5 ${index < 4 ? 'fill-current' : 'text-zinc-300 dark:text-zinc-700'}`} />)}</p></div></div>
        <time className="text-xs text-zinc-500" dateTime="2026-09-18">Sep 18, 2026</time>
      </header>
      <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-white">Great kit, needs more charts</h3>
      <p className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">Everything I needed for the marketing site. I hope the chart section grows soon.</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        {vote ? <span role="status">Thanks for your feedback!</span> : <>Was this helpful?{(['yes', 'no'] as const).map((value) => <button key={value} type="button" aria-pressed={vote === value} onClick={() => setVote(value)} className="rounded-full border border-zinc-300 px-2.5 py-0.5 capitalize hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">{value}</button>)}</>}
      </div>
      <button type="button" aria-expanded={reply} aria-controls="team-reply" onClick={() => setReply((value) => !value)} className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-teal-700 dark:text-teal-400">Response from the team <ChevronDown aria-hidden className={`size-3.5 transition-transform ${reply ? 'rotate-180' : ''}`} /></button>
      {reply && (
        <div id="team-reply" className="mt-2 flex gap-2.5 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-zinc-950 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-950">P</span>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">Thanks Moussa! Ten new charts land next month, including funnels and radars.</p>
        </div>
      )}
    </article>
  );
}
