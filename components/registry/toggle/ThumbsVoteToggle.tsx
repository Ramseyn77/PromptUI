/**
 * @registry
 * name: Thumbs Vote Toggle
 * category: Toggle
 * style: Minimal
 * tags: recent
 * description: Vote pouce haut / pouce bas exclusif avec compteurs, animation de rebond, pourcentage d'approbation et raison demandée après un vote négatif.
 * prompt: Create a thumbs up / down toggle pair for an answer or article: two mutually exclusive toggle buttons (aria-pressed) with counts; clicking the active one un-votes; switching moves the vote; the chosen thumb pops (scale bounce) and fills; an approval bar shows the up percentage; after a thumbs-down a small chip row asks "What went wrong?" (Inaccurate, Unclear, Too long) and confirms "Thanks for the feedback" via aria-live; reduced motion removes the bounce. Light and dark mode.
 */
'use client';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

export function ThumbsVoteToggle() {
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const up = 128 + (vote === 'up' ? 1 : 0);
  const down = 14 + (vote === 'down' ? 1 : 0);
  const percent = Math.round((up / (up + down)) * 100);
  const pick = (value: 'up' | 'down') => { setVote(vote === value ? null : value); setReason(null); };

  return (
    <div className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-thumb-pop { 0% { transform: scale(1) } 40% { transform: scale(1.35) rotate(-8deg) } 100% { transform: scale(1) } }`}</style>
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Was this answer helpful?</p>
      <div className="mt-3 flex gap-2">
        {([['up', ThumbsUp, up, 'Helpful'], ['down', ThumbsDown, down, 'Not helpful']] as const).map(([value, Icon, count, label]) => (
          <button key={value} type="button" aria-pressed={vote === value} aria-label={`${label}, ${count} votes`} onClick={() => pick(value)} className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-sm font-medium transition ${vote === value ? (value === 'up' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300') : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400'}`}>
            <Icon aria-hidden key={vote === value ? 'on' : 'off'} className={`size-4 ${vote === value ? 'fill-current motion-safe:animate-[pui-thumb-pop_.4s_ease-out]' : ''}`} /><span className="tabular-nums">{count}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500"><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-rose-200 dark:bg-rose-500/30"><span className="block h-full rounded-full bg-emerald-500 transition-[width]" style={{ width: `${percent}%` }} /></span>{percent}% found it helpful</div>
      <div aria-live="polite">
        {vote === 'down' && !reason && <div className="mt-3"><p className="text-xs text-zinc-600 dark:text-zinc-400">What went wrong?</p><div className="mt-1.5 flex flex-wrap gap-1.5">{['Inaccurate', 'Unclear', 'Too long'].map((value) => <button key={value} type="button" onClick={() => setReason(value)} className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900">{value}</button>)}</div></div>}
        {(vote === 'up' || reason) && <p className="mt-3 text-xs text-emerald-600 dark:text-emerald-400">Thanks for the feedback{reason ? ` (${reason.toLowerCase()})` : ''}.</p>}
      </div>
    </div>
  );
}
