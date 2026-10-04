/**
 * @registry
 * name: Seller Trust Card
 * category: Cards
 * style: SaaS
 * tags: recent
 * description: Carte vendeur marketplace avec verification, reputation, delai de reponse et actions.
 * prompt: Create a responsive marketplace seller trust card with verified status, rating, completed sales, response time, location, follow toggle and contact button. Include light and dark mode.
 */
'use client';

import { BadgeCheck, MapPin, MessageCircle, PackageCheck, Star } from 'lucide-react';
import { useState } from 'react';

export function SellerTrustCard() {
  const [following, setFollowing] = useState(false);
  return (
    <article className="w-full max-w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white p-4 shadow-xl shadow-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-950 sm:max-w-md sm:p-6">
      <div className="flex min-w-0 items-start gap-2 sm:gap-4">
        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-cyan-500 text-base font-bold text-emerald-950 sm:size-14 sm:text-xl">KO</div>
        <div className="min-w-0 flex-1"><div className="flex items-center gap-1.5"><h2 className="truncate font-semibold text-zinc-950 dark:text-white">Kora Outdoor</h2><BadgeCheck size={17} className="shrink-0 fill-blue-500 text-white dark:text-zinc-950" aria-label="Verified seller" /></div><p className="mt-1 flex items-center gap-1 text-sm text-zinc-500"><MapPin size={14} />Accra, Ghana</p></div>
        <button type="button" onClick={() => setFollowing((value) => !value)} aria-pressed={following} className={`shrink-0 rounded-full px-2 py-1.5 text-[11px] font-semibold transition sm:px-3 sm:text-xs ${following ? 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200' : 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'}`}>{following ? 'Following' : 'Follow'}</button>
      </div>
      <div className="mt-5 grid grid-cols-3 divide-x divide-zinc-200 rounded-2xl bg-zinc-50 py-4 text-center dark:divide-zinc-800 dark:bg-zinc-900">
        <div><p className="flex items-center justify-center gap-1 font-semibold text-zinc-950 dark:text-white"><Star size={14} className="fill-amber-400 text-amber-400" />4.9</p><p className="mt-1 text-[11px] text-zinc-500">1.2k reviews</p></div>
        <div><p className="font-semibold text-zinc-950 dark:text-white">3.8k</p><p className="mt-1 text-[11px] text-zinc-500">Sales</p></div>
        <div><p className="font-semibold text-zinc-950 dark:text-white">&lt; 1h</p><p className="mt-1 text-[11px] text-zinc-500">Replies</p></div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300"><PackageCheck size={17} /><span>Ships on time · 98% of orders</span></div>
      <button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"><MessageCircle size={17} />Contact seller</button>
    </article>
  );
}
