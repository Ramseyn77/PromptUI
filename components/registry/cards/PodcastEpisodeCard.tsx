/**
 * @registry
 * name: Podcast Episode Card
 * category: Cards
 * style: Glass
 * tags: recent
 * description: Carte d'épisode de podcast avec pochette, lecture/pause, barre de progression cliquable et vitesse de lecture.
 * prompt: Create a podcast episode card: cover art (gradient), show name, episode title and date, play/pause button (aria-pressed) that advances a progress bar while playing, a seekable progress range (labelled, aria-valuetext "12:30 of 48:00"), elapsed/remaining times, 15s back/forward buttons and a speed toggle (1×/1.5×/2×). Glassy card on a soft gradient. Light and dark mode.
 */
'use client';
import { Pause, Play, RotateCcw, RotateCw } from 'lucide-react';
import { useEffect, useState } from 'react';

const total = 48 * 60;
const time = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export function PodcastEpisodeCard() {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(750);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setPosition((value) => Math.min(total, value + speed)), 1000);
    return () => window.clearInterval(timer);
  }, [playing, speed]);

  return (
    <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-violet-200 to-sky-200 p-3 dark:from-violet-900/60 dark:to-sky-900/60">
      <article className="rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70">
        <div className="flex gap-3">
          <span aria-hidden className="size-16 shrink-0 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400" />
          <div className="min-w-0"><p className="text-xs font-semibold text-violet-700 dark:text-violet-300">Build in Public · Ep. 42</p><h3 className="font-semibold leading-snug text-zinc-900 dark:text-zinc-100">Pricing your first SaaS without guessing</h3><p className="text-xs text-zinc-500">Oct 2 · 48 min</p></div>
        </div>
        <input type="range" min={0} max={total} value={position} aria-label="Seek" aria-valuetext={`${time(position)} of ${time(total)}`} onChange={(event) => setPosition(Number(event.target.value))} className="mt-4 w-full accent-violet-600" />
        <div className="flex justify-between text-[11px] tabular-nums text-zinc-500"><span>{time(position)}</span><span>-{time(total - position)}</span></div>
        <div className="mt-2 flex items-center justify-center gap-4">
          <button type="button" aria-label="Back 15 seconds" onClick={() => setPosition((value) => Math.max(0, value - 15))} className="grid size-9 place-items-center rounded-full text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10"><RotateCcw aria-hidden className="size-4" /></button>
          <button type="button" aria-pressed={playing} aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying((value) => !value)} className="grid size-12 place-items-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/30">{playing ? <Pause aria-hidden className="size-5 fill-current" /> : <Play aria-hidden className="ml-0.5 size-5 fill-current" />}</button>
          <button type="button" aria-label="Forward 15 seconds" onClick={() => setPosition((value) => Math.min(total, value + 15))} className="grid size-9 place-items-center rounded-full text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10"><RotateCw aria-hidden className="size-4" /></button>
          <button type="button" aria-label={`Playback speed ${speed}×`} onClick={() => setSpeed((value) => (value === 1 ? 1.5 : value === 1.5 ? 2 : 1))} className="w-10 rounded-md border border-zinc-300 py-0.5 text-xs font-semibold text-zinc-700 dark:border-zinc-600 dark:text-zinc-200">{speed}×</button>
        </div>
      </article>
    </div>
  );
}
