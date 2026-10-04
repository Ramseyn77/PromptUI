/**
 * @registry
 * name: Matchday Scoreboard
 * category: Dashboard
 * style: Dark
 * tags: recent
 * description: Tableau de score sportif en direct avec chronometre, evenements et statistiques essentielles.
 * prompt: Create a responsive live football match scoreboard with teams, score, match clock, recent event feed and possession bar. Include a control to follow or unfollow the match.
 */
'use client';

import { Bell, BellRing, CircleDot, Goal } from 'lucide-react';
import { useState } from 'react';

export function MatchdayScoreboard() {
  const [following, setFollowing] = useState(false);
  return (
    <section className="w-full max-w-full overflow-hidden sm:max-w-2xl rounded-[2rem] bg-[#071811] text-white shadow-2xl shadow-emerald-900/30">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-emerald-300"><span className="size-2 animate-pulse rounded-full bg-red-500" />Live · Premier League</p><button type="button" onClick={() => setFollowing((value) => !value)} aria-pressed={following} aria-label={following ? 'Unfollow match' : 'Follow match'} className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/15">{following ? <BellRing size={17} className="text-emerald-300" /> : <Bell size={17} />}</button></div>
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1 px-2 py-7 text-center sm:gap-8 sm:px-10"><div><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-sky-400 text-xl font-black text-sky-950 sm:size-16">AC</div><p className="mt-3 text-sm font-semibold sm:text-base">Atlas City</p></div><div><p className="font-mono text-xs text-emerald-300">67:24</p><p className="mt-1 text-4xl font-black tracking-widest sm:text-5xl">2–1</p><p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-500">Second half</p></div><div><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-orange-400 text-xl font-black text-orange-950 sm:size-16">RU</div><p className="mt-3 text-sm font-semibold sm:text-base">Rovers United</p></div></div>
      <div className="grid gap-4 border-t border-white/10 bg-black/15 p-5 sm:grid-cols-2 sm:p-7"><div><div className="flex justify-between text-xs text-zinc-400"><span>Possession</span><span>58% · 42%</span></div><div className="mt-2 flex h-2 overflow-hidden rounded-full bg-orange-400"><span className="block h-full bg-sky-400" style={{ width: '58%' }} /></div><div className="mt-4 grid grid-cols-3 text-center"><div><p className="font-semibold">12</p><p className="text-[10px] text-zinc-500">Shots</p></div><div><p className="font-semibold">5</p><p className="text-[10px] text-zinc-500">Corners</p></div><div><p className="font-semibold">3</p><p className="text-[10px] text-zinc-500">Saves</p></div></div></div><div className="space-y-2 text-xs"><div className="flex items-center gap-2 rounded-xl bg-white/[.06] p-2.5"><Goal size={15} className="text-emerald-300" /><span className="font-mono text-zinc-500">61′</span><span className="truncate">Goal · M. Diallo</span></div><div className="flex items-center gap-2 rounded-xl bg-white/[.06] p-2.5"><CircleDot size={15} className="text-amber-300" /><span className="font-mono text-zinc-500">54′</span><span className="truncate">Yellow card · J. Cole</span></div></div></div>
    </section>
  );
}
