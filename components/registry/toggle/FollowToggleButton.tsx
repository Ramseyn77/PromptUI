/**
 * @registry
 * name: Follow Toggle Button
 * category: Toggle
 * style: SaaS
 * tags: recent
 * description: Bouton Suivre / Abonné qui change de style, affiche « Ne plus suivre » au survol et met à jour le compteur.
 * prompt: Create a follow toggle button on a creator card: "Follow" (solid) becomes "Following" (outline with check) when pressed (aria-pressed), and while hovering a followed state it reads "Unfollow" in rose; follower count updates with tabular numbers. Card shows avatar, name and handle. Light and dark mode.
 */
'use client';
import { Check, Plus } from 'lucide-react';
import { useState } from 'react';

export function FollowToggleButton() {
  const [following, setFollowing] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <span aria-hidden className="size-12 shrink-0 rounded-full bg-gradient-to-br from-fuchsia-400 to-orange-300" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-zinc-900 dark:text-zinc-100">Maya Okoro</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">@maya.designs · <span className="tabular-nums">{(12480 + (following ? 1 : 0)).toLocaleString('en-US')}</span> followers</p>
      </div>
      <button
        type="button"
        aria-pressed={following}
        onClick={() => setFollowing((value) => !value)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`inline-flex w-28 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500 ${following ? (hover ? 'border border-rose-300 text-rose-600 dark:border-rose-500/50 dark:text-rose-400' : 'border border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200') : 'bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950'}`}
      >
        {following ? (hover ? 'Unfollow' : <><Check aria-hidden className="size-4" />Following</>) : <><Plus aria-hidden className="size-4" />Follow</>}
      </button>
    </div>
  );
}
