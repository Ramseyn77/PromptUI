/**
 * @registry
 * name: Launch Badge Hero
 * category: Hero
 * style: Gradient
 * tags: recent
 * description: Hero de lancement avec badge « Produit du jour », compteur de votes cliquable et liste d'attente.
 * prompt: Create a launch-day hero: a "#1 Product of the Day" ribbon badge (generic, no third-party logos), a big two-color headline, a subtitle, an upvote button with count (aria-pressed, +1 with a bump animation) beside a "Join the waitlist" CTA, and a row of three short launch perks with icons. Soft orange/pink gradient backdrop. Light and dark mode.
 */
'use client';
import { ChevronUp, Gift, Rocket, Zap } from 'lucide-react';
import { useState } from 'react';

export function LaunchBadgeHero() {
  const [voted, setVoted] = useState(false);

  return (
    <section className="w-full max-w-4xl rounded-3xl bg-gradient-to-br from-orange-50 via-white to-pink-50 px-6 py-14 text-center dark:from-orange-950/30 dark:via-zinc-950 dark:to-pink-950/30">
      <style>{`@keyframes pui-bump{40%{transform:scale(1.25)}}`}</style>
      <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-500/25">🏆 #1 Product of the Day</span>
      <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-tight text-zinc-950 sm:text-6xl dark:text-zinc-50">Meeting notes that <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">write themselves.</span></h1>
      <p className="mx-auto mt-4 max-w-lg text-zinc-600 dark:text-zinc-400">Live transcripts, decisions and action items — in 40 languages, without a bot joining your call.</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button type="button" aria-pressed={voted} aria-label={`Upvote, ${1284 + (voted ? 1 : 0)} votes`} onClick={() => setVoted((value) => !value)} className={`inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition ${voted ? 'border-orange-500 bg-orange-500 text-white' : 'border-orange-300 bg-white text-orange-600 hover:border-orange-500 dark:bg-zinc-900 dark:text-orange-400'}`}>
          <ChevronUp aria-hidden className="size-4" /><span key={String(voted)} className="tabular-nums motion-safe:animate-[pui-bump_.3s]">{(1284 + (voted ? 1 : 0)).toLocaleString('en-US')}</span>
        </button>
        <a href="#waitlist" className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Join the waitlist</a>
      </div>
      <ul className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
        {([[Gift, '50% off for early birds'], [Zap, 'Live in under a minute'], [Rocket, 'Founders on support']] as const).map(([Icon, text]) => <li key={text} className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-sm text-zinc-700 shadow-sm dark:bg-white/5 dark:text-zinc-300"><Icon aria-hidden className="size-4 text-pink-500" />{text}</li>)}
      </ul>
    </section>
  );
}
