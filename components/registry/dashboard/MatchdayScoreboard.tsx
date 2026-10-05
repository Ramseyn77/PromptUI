/**
 * @registry
 * name: Matchday Scoreboard
 * category: Dashboard
 * style: Dark
 * tags: recent
 * description: Tableau de score sportif en direct : chronometre qui avance, but qui met a jour le score, statistiques et fil d evenements en temps reel.
 * prompt: Create a responsive live football match scoreboard with teams, a running match clock, a score that updates with a short highlight when a goal is scored, a recent event feed where new events slide in, live stats (shots, corners, saves) and a possession bar that drifts over time. Simulate the live match on the client without network calls, include a control to follow or unfollow the match, announce goals through aria-live and respect prefers-reduced-motion. Mobile-first: compact team badges and score under sm, no horizontal overflow at 320px.
 */
'use client';

import { Bell, BellRing, CircleDot, Flag, Goal, Hand, Target } from 'lucide-react';
import { useEffect, useState } from 'react';

type Stat = 'shots' | 'corners' | 'saves';
type MatchEvent = { at: number; kind: 'goal' | 'card' | Stat; label: string; away?: boolean };

const CLOCK_START = 67 * 60 + 24;
const history: MatchEvent[] = [
  { at: -384, kind: 'goal', label: 'Goal · M. Diallo' },
  { at: -804, kind: 'card', label: 'Yellow card · J. Cole' },
];
// Scripted moments, in seconds after the scoreboard mounts.
const script: MatchEvent[] = [
  { at: 5, kind: 'shots', label: 'Shot on target · Atlas City' },
  { at: 12, kind: 'corners', label: 'Corner · Rovers United', away: true },
  { at: 19, kind: 'saves', label: 'Save · K. Osei' },
  { at: 27, kind: 'goal', label: 'Goal · T. Brooks', away: true },
  { at: 38, kind: 'shots', label: 'Shot wide · Atlas City' },
];
const icons = { goal: Goal, card: CircleDot, shots: Target, corners: Flag, saves: Hand };
const iconColors = { goal: 'text-emerald-300', card: 'text-amber-300', shots: 'text-sky-300', corners: 'text-orange-300', saves: 'text-zinc-300' };
const minuteOf = (at: number) => `${Math.floor((CLOCK_START + at) / 60) + 1}′`;

export function MatchdayScoreboard() {
  const [following, setFollowing] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const happened = script.filter((event) => event.at <= elapsed);
  const count = (kind: Stat) => happened.filter((event) => event.kind === kind).length;
  const awayGoals = 1 + happened.filter((event) => event.kind === 'goal' && event.away).length;
  const lastGoal = [...happened].reverse().find((event) => event.kind === 'goal');
  const celebrating = lastGoal !== undefined && elapsed - lastGoal.at < 4;
  const feed = [...happened].reverse().concat(history).slice(0, 3);
  const possession = 58 + Math.round(Math.sin(elapsed / 5) * 3);
  const clock = CLOCK_START + elapsed;
  const time = `${String(Math.floor(clock / 60)).padStart(2, '0')}:${String(clock % 60).padStart(2, '0')}`;
  const stats = [['Shots', 12 + count('shots')], ['Corners', 5 + count('corners')], ['Saves', 3 + count('saves')]] as const;

  return (
    <section className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-[#071811] text-white shadow-2xl shadow-emerald-900/30">
      <style>{`@keyframes pui-score-pop{30%{transform:scale(1.2)}}@keyframes pui-feed-in{from{opacity:0;transform:translateY(-8px)}}@media(prefers-reduced-motion:reduce){.pui-pop,.pui-feed{animation:none!important}}`}</style>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-7 sm:py-4">
        <p className="flex min-w-0 items-center gap-2 text-[11px] font-bold uppercase tracking-[.16em] text-emerald-300 sm:text-xs sm:tracking-[.2em]"><span className="size-2 shrink-0 rounded-full bg-red-500 motion-safe:animate-pulse" /><span className="truncate">Live · Premier League</span></p>
        <button type="button" onClick={() => setFollowing((value) => !value)} aria-pressed={following} aria-label={following ? 'Unfollow match' : 'Follow match'} className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">{following ? <BellRing size={17} className="text-emerald-300" /> : <Bell size={17} />}</button>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-3 py-6 text-center sm:gap-8 sm:px-10 sm:py-7">
        <div className="min-w-0"><div className="mx-auto grid size-12 place-items-center rounded-2xl bg-sky-400 text-lg font-black text-sky-950 sm:size-16 sm:text-xl">AC</div><p className="mt-2 text-sm font-semibold sm:mt-3 sm:text-base">Atlas City</p></div>
        <div>
          <p role="timer" aria-live="off" className="font-mono text-xs tabular-nums text-emerald-300">{time}</p>
          {/* The live region stays mounted; the inner score remounts to replay the highlight. */}
          <div aria-live="polite" aria-atomic="true"><p key={awayGoals} aria-label={`Atlas City 2, Rovers United ${awayGoals}`} className="pui-pop mt-1 whitespace-nowrap text-4xl font-black tabular-nums tracking-wide motion-safe:animate-[pui-score-pop_.6s_ease-out] sm:text-5xl sm:tracking-widest">2–{awayGoals}</p></div>
          <p className={`mt-2 text-[10px] uppercase tracking-widest transition-colors ${celebrating ? 'font-bold text-emerald-300' : 'text-zinc-500'}`}>{celebrating ? 'Goal!' : 'Second half'}</p>
        </div>
        <div className="min-w-0"><div className="mx-auto grid size-12 place-items-center rounded-2xl bg-orange-400 text-lg font-black text-orange-950 sm:size-16 sm:text-xl">RU</div><p className="mt-2 text-sm font-semibold sm:mt-3 sm:text-base">Rovers United</p></div>
      </div>
      <div className="grid gap-4 border-t border-white/10 bg-black/15 p-4 sm:grid-cols-2 sm:p-7">
        <div>
          <div className="flex justify-between text-xs text-zinc-400"><span>Possession</span><span className="tabular-nums">{possession}% · {100 - possession}%</span></div>
          <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-orange-400"><span className="block h-full bg-sky-400 transition-[width] duration-700 motion-reduce:transition-none" style={{ width: `${possession}%` }} /></div>
          <div className="mt-4 grid grid-cols-3 text-center">
            {stats.map(([name, value]) => <div key={name}><p key={value} className="pui-pop font-semibold tabular-nums motion-safe:animate-[pui-score-pop_.5s_ease-out]">{value}</p><p className="text-[10px] text-zinc-500">{name}</p></div>)}
          </div>
        </div>
        <ul className="space-y-2 text-xs">
          {feed.map((event) => {
            const Icon = icons[event.kind];
            return <li key={`${event.at}-${event.label}`} className="pui-feed flex min-w-0 items-center gap-2 rounded-xl bg-white/[.06] p-2.5 motion-safe:animate-[pui-feed-in_.4s_ease-out]"><Icon size={15} className={`shrink-0 ${iconColors[event.kind]}`} /><span className="font-mono text-zinc-500">{minuteOf(event.at)}</span><span className="truncate">{event.label}</span></li>;
          })}
        </ul>
      </div>
    </section>
  );
}
