/**
 * @registry
 * name: Social Post Cards
 * category: Testimonials
 * style: SaaS
 * tags: recent
 * description: Temoignages au format publication sociale avec pseudo, badge verifie, date et reactions.
 * prompt: Create social-post style testimonials: cards with avatar, display name + verified badge, @handle, post text with highlighted @mention, date, and interaction counts (replies, reposts, likes) with a like button that toggles (aria-pressed) and increments. 2 columns from md. Light and dark mode.
 */
'use client';
import { BadgeCheck, Heart, MessageCircle, Repeat2 } from 'lucide-react';
import { useState } from 'react';

const posts = [
  { name: 'Fatou Sow', handle: 'fatou_codes', text: 'Built a full SaaS landing with @promptui in one evening. The dark mode is 🔥', likes: 248, date: 'Sep 24' },
  { name: 'Ben Carter', handle: 'bencarter', text: 'Hot take: @promptui prompts are better docs than most docs.', likes: 131, date: 'Sep 21' },
];

export function SocialPostCards() {
  const [liked, setLiked] = useState<string[]>([]);

  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      {posts.map((post) => {
        const on = liked.includes(post.handle);
        return (
          <article key={post.handle} className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <header className="flex items-center gap-3">
              <span className="size-10 rounded-full bg-gradient-to-br from-sky-400 to-violet-500" />
              <div><p className="flex items-center gap-1 text-sm font-semibold text-zinc-900 dark:text-white">{post.name}<BadgeCheck aria-label="Verified" className="size-4 text-sky-500" /></p><p className="text-xs text-zinc-500">@{post.handle}</p></div>
            </header>
            <p className="mt-3 text-sm leading-6 text-zinc-800 dark:text-zinc-200">{post.text.split(/(@\w+)/).map((part, index) => (part.startsWith('@') ? <span key={index} className="text-sky-600 dark:text-sky-400">{part}</span> : part))}</p>
            <p className="mt-3 text-xs text-zinc-500">{post.date}</p>
            <footer className="mt-3 flex items-center gap-6 border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-900">
              <span className="inline-flex items-center gap-1.5"><MessageCircle aria-hidden className="size-4" />12</span>
              <span className="inline-flex items-center gap-1.5"><Repeat2 aria-hidden className="size-4" />34</span>
              <button type="button" aria-pressed={on} aria-label={on ? 'Unlike' : 'Like'} onClick={() => setLiked((current) => (on ? current.filter((item) => item !== post.handle) : [...current, post.handle]))} className={`inline-flex items-center gap-1.5 transition ${on ? 'text-rose-500' : 'hover:text-rose-500'}`}><Heart aria-hidden className={`size-4 ${on ? 'fill-current' : ''}`} />{post.likes + (on ? 1 : 0)}</button>
            </footer>
          </article>
        );
      })}
    </div>
  );
}
