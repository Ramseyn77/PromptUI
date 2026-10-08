/**
 * @registry
 * name: Tweet Card
 * category: Cards
 * style: Minimal
 * tags: featured, recent
 * description: Carte de publication sociale avec badge vérifié, mentions colorées, image et actions animées.
 * prompt: Create a social post card: gradient avatar, display name with verified badge, handle and date, body text where @mentions and #hashtags are highlighted, a media tile with gradient artwork, and an action row (reply, repost, like, share) where like toggles with a pop animation and an incrementing count (aria-pressed). Light and dark mode.
 */
'use client';
import { BadgeCheck, Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import { useState } from 'react';

const body = 'Just shipped the new component registry with @promptui — 40 fresh blocks, all accessible and dark-mode ready. #react #tailwind';

export function TweetCard() {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  return (
    <article className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-like-pop{0%{transform:scale(1)}40%{transform:scale(1.35)}100%{transform:scale(1)}}`}</style>
      <header className="flex items-start gap-3">
        <span aria-hidden className="size-11 shrink-0 rounded-full bg-gradient-to-br from-teal-400 via-sky-500 to-violet-500" />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 text-[15px] font-semibold text-zinc-950 dark:text-zinc-50">
            Lena Hart <BadgeCheck aria-label="Verified" className="size-4 fill-sky-500 text-white dark:text-zinc-950" />
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">@lenahart · Oct 2</p>
        </div>
        <span aria-hidden className="font-mono text-lg font-black text-zinc-950 dark:text-zinc-50">𝕏</span>
      </header>

      <p className="mt-3 text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-200">
        {body.split(/(\s+)/).map((word, index) =>
          /^[@#]/.test(word) ? <span key={index} className="text-sky-600 dark:text-sky-400">{word}</span> : word,
        )}
      </p>

      <div aria-hidden className="mt-4 grid h-44 place-items-center overflow-hidden rounded-xl border border-zinc-200 bg-[radial-gradient(circle_at_30%_20%,#5eead4,transparent_45%),radial-gradient(circle_at_80%_70%,#a78bfa,transparent_50%),linear-gradient(#0f172a,#0f172a)] dark:border-zinc-800">
        <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 font-mono text-xs text-white backdrop-blur">npx promptui add tweet-card</div>
      </div>

      <footer className="mt-4 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <button type="button" aria-label="Reply, 12 replies" className="flex items-center gap-1.5 rounded-full px-2 py-1 transition hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-sky-500/10"><MessageCircle aria-hidden className="size-4" />12</button>
        <button type="button" aria-label="Repost" aria-pressed={reposted} onClick={() => setReposted((value) => !value)} className={`flex items-center gap-1.5 rounded-full px-2 py-1 transition hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500/10 ${reposted ? 'text-emerald-600 dark:text-emerald-400' : ''}`}><Repeat2 aria-hidden className="size-4" />{reposted ? 49 : 48}</button>
        <button type="button" aria-label="Like" aria-pressed={liked} onClick={() => setLiked((value) => !value)} className={`flex items-center gap-1.5 rounded-full px-2 py-1 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 ${liked ? 'text-rose-600 dark:text-rose-400' : ''}`}>
          <Heart aria-hidden className={`size-4 ${liked ? 'fill-current motion-safe:animate-[pui-like-pop_.35s_ease-out]' : ''}`} />{liked ? 313 : 312}
        </button>
        <button type="button" aria-label="Share" className="rounded-full p-1.5 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"><Share aria-hidden className="size-4" /></button>
      </footer>
    </article>
  );
}
