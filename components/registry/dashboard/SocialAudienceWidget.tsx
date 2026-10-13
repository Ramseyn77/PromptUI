/**
 * @registry
 * name: Social Audience Widget
 * category: Dashboard
 * style: Glass
 * tags: recent
 * description: Widget d'audience réseaux sociaux en verre : abonnés par plateforme, croissance, meilleur moment pour publier (heatmap) et top publication.
 * prompt: Create a glassy social audience widget on a gradient: platform tabs (neutral names: Photos, Short video, Professional) as a tablist switching the numbers; followers with weekly growth, engagement rate, a 7×6 "best time to post" heatmap (days × time blocks, deterministic intensities) with the best slot outlined and labelled, and a top post card with likes/comments; heatmap cells have aria-labels; light and dark mode.
 */
'use client';
import { Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const platforms = [
  { name: 'Photos', followers: '48.2k', growth: '+3.4%', engagement: '4.1%', seed: 3, post: 'Behind the scenes of our studio move', likes: '2.1k', comments: 184 },
  { name: 'Short video', followers: '126k', growth: '+9.8%', engagement: '7.6%', seed: 5, post: '30-second UI makeover', likes: '18.4k', comments: 932 },
  { name: 'Professional', followers: '12.9k', growth: '+1.2%', engagement: '2.3%', seed: 7, post: 'What we learned shipping weekly for a year', likes: '640', comments: 71 },
];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const blocks = ['6h', '9h', '12h', '15h', '18h', '21h'];

export function SocialAudienceWidget() {
  const [index, setIndex] = useState(1);
  const platform = platforms[index];
  const heat = days.map((_, d) => blocks.map((_, b) => ((d * 3 + b * 5 + platform.seed * 2) % 9) / 8 + (b === 4 ? 0.2 : 0)));
  const flat = heat.flat();
  const best = flat.indexOf(Math.max(...flat));

  return (
    <section className="w-full max-w-md rounded-3xl bg-[linear-gradient(135deg,#f9a8d4,#c4b5fd,#93c5fd)] p-4 dark:bg-[linear-gradient(135deg,#831843,#4c1d95,#1e3a8a)]">
      <div className="rounded-2xl border border-white/50 bg-white/60 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60">
        <div role="tablist" aria-label="Platform" className="grid grid-cols-3 gap-1 rounded-xl bg-white/60 p-1 text-xs dark:bg-white/10">{platforms.map((item, i) => <button key={item.name} type="button" role="tab" aria-selected={i === index} onClick={() => setIndex(i)} className={`rounded-lg py-1.5 font-medium ${i === index ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'text-zinc-700 dark:text-zinc-300'}`}>{item.name}</button>)}</div>
        <div role="tabpanel" aria-label={platform.name} className="mt-4">
          <div className="grid grid-cols-2 gap-3"><div><p className="text-xs text-zinc-600 dark:text-zinc-400">Followers</p><p className="text-2xl font-bold text-zinc-950 dark:text-white">{platform.followers}</p><p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{platform.growth} this week</p></div><div><p className="text-xs text-zinc-600 dark:text-zinc-400">Engagement</p><p className="text-2xl font-bold text-zinc-950 dark:text-white">{platform.engagement}</p></div></div>
          <p className="mt-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Best time to post · <span className="font-normal">{days[Math.floor(best / blocks.length)]} {blocks[best % blocks.length]}</span></p>
          <div className="mt-2 grid grid-cols-[2rem_repeat(6,1fr)] gap-1 text-[9px] text-zinc-600 dark:text-zinc-400">
            <span />{blocks.map((block) => <span key={block} className="text-center">{block}</span>)}
            {days.map((day, d) => <div key={day} className="contents"><span className="self-center">{day}</span>{blocks.map((block, b) => { const value = Math.min(1, heat[d][b]); const isBest = d * blocks.length + b === best; return <span key={block} role="img" aria-label={`${day} ${block}: ${Math.round(value * 100)}% activity${isBest ? ', best slot' : ''}`} className={`h-4 rounded-sm ${isBest ? 'ring-2 ring-zinc-950 dark:ring-white' : ''}`} style={{ background: `rgba(139, 92, 246, ${(0.1 + value * 0.85).toFixed(2)})` }} />; })}</div>)}
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/70 p-2.5 dark:bg-white/5"><span aria-hidden className="size-10 shrink-0 rounded-lg bg-gradient-to-br from-pink-400 to-violet-500" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-zinc-950 dark:text-white">{platform.post}</p><p className="flex gap-3 text-xs text-zinc-600 dark:text-zinc-400"><span className="flex items-center gap-1"><Heart aria-hidden className="size-3" />{platform.likes}</span><span className="flex items-center gap-1"><MessageCircle aria-hidden className="size-3" />{platform.comments}</span></p></div></div>
        </div>
      </div>
    </section>
  );
}
