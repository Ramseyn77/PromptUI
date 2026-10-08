/**
 * @registry
 * name: Profile Cover Card
 * category: Cards
 * style: Gradient
 * tags: recent
 * description: Carte de profil avec couverture dégradée, avatar à cheval, statistiques et boutons Suivre / Message.
 * prompt: Create a profile card: gradient cover, an avatar overlapping the cover with an online ring, name with verified badge, role and location, three stats (Projects, Followers, Rating) separated by dividers, and Follow (aria-pressed toggle) + Message buttons. Light and dark mode.
 */
'use client';
import { BadgeCheck, MapPin } from 'lucide-react';
import { useState } from 'react';

export function ProfileCoverCard() {
  const [following, setFollowing] = useState(false);

  return (
    <article className="w-full max-w-xs overflow-hidden rounded-3xl border border-zinc-200 bg-white text-center dark:border-zinc-800 dark:bg-zinc-950">
      <div aria-hidden className="h-24 bg-gradient-to-r from-teal-400 via-sky-500 to-violet-500" />
      <span aria-hidden className="relative mx-auto -mt-10 block size-20 rounded-full border-4 border-white bg-gradient-to-br from-amber-300 to-rose-500 dark:border-zinc-950"><span className="absolute bottom-1 right-1 size-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950" /></span>
      <h3 className="mt-3 flex items-center justify-center gap-1 font-semibold text-zinc-950 dark:text-zinc-50">Ibrahim Keita<BadgeCheck aria-label="Verified" className="size-4 fill-sky-500 text-white dark:text-zinc-950" /></h3>
      <p className="text-sm text-zinc-500">Motion designer</p>
      <p className="mt-1 flex items-center justify-center gap-1 text-xs text-zinc-400"><MapPin aria-hidden className="size-3" />Abidjan</p>
      <dl className="mx-5 mt-4 grid grid-cols-3 divide-x divide-zinc-200 rounded-2xl bg-zinc-50 py-3 dark:divide-zinc-800 dark:bg-zinc-900">
        {[['Projects', '86'], ['Followers', (12400 + (following ? 1 : 0)).toLocaleString('en-US')], ['Rating', '4.9']].map(([label, value]) => <div key={label}><dt className="text-[11px] text-zinc-500">{label}</dt><dd className="font-bold tabular-nums text-zinc-900 dark:text-zinc-100">{value}</dd></div>)}
      </dl>
      <div className="grid grid-cols-2 gap-2 p-5">
        <button type="button" aria-pressed={following} onClick={() => setFollowing((value) => !value)} className={`rounded-xl py-2 text-sm font-semibold ${following ? 'border border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300' : 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'}`}>{following ? 'Following' : 'Follow'}</button>
        <button type="button" className="rounded-xl border border-zinc-300 py-2 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-200">Message</button>
      </div>
    </article>
  );
}
