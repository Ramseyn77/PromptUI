/**
 * @registry
 * name: Music Player Card
 * category: Cards
 * style: Gradient
 * tags: featured, recent
 * description: Lecteur musical en carte : pochette qui tourne comme un vinyle, piste, contrôles, j'aime et file d'attente.
 * prompt: Create a music player card: a round vinyl-like cover that spins while playing (paused with reduced motion), track title and artist, a seek bar with times, previous/play-pause/next controls (aria-labels, aria-pressed on play), a like toggle and shuffle/repeat toggles; next/previous switch between 3 tracks with different gradient covers. Gradient card, light and dark mode.
 */
'use client';
import { Heart, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import { useEffect, useState } from 'react';

const tracks = [
  { title: 'Golden Hour', artist: 'Ama Lou', length: 214, cover: 'from-amber-300 via-orange-400 to-rose-500' },
  { title: 'Blue Lagoon', artist: 'Kofi Sound', length: 189, cover: 'from-sky-300 via-cyan-400 to-indigo-500' },
  { title: 'Velvet Night', artist: 'Mira K.', length: 241, cover: 'from-fuchsia-400 via-violet-500 to-indigo-700' },
];
const time = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

export function MusicPlayerCard() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(48);
  const [liked, setLiked] = useState(false);
  const [toggles, setToggles] = useState({ shuffle: false, repeat: true });
  const track = tracks[index];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setPosition((value) => (value >= track.length ? 0 : value + 1)), 1000);
    return () => window.clearInterval(timer);
  }, [playing, track.length]);

  const go = (delta: number) => { setIndex((value) => (value + delta + tracks.length) % tracks.length); setPosition(0); };
  const small = (on: boolean) => `grid size-8 place-items-center rounded-full ${on ? 'text-pink-600 dark:text-pink-400' : 'text-zinc-400'}`;

  return (
    <article className="w-full max-w-xs rounded-3xl bg-gradient-to-b from-pink-50 to-white p-6 text-center shadow-xl shadow-pink-500/10 dark:from-pink-950/40 dark:to-zinc-950">
      <style>{`@keyframes pui-vinyl{to{transform:rotate(360deg)}}`}</style>
      <div aria-hidden className={`relative mx-auto size-40 rounded-full bg-gradient-to-br shadow-xl ${track.cover} motion-safe:animate-[pui-vinyl_8s_linear_infinite]`} style={{ animationPlayState: playing ? 'running' : 'paused' }}>
        <span className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle,transparent_0_6px,rgba(0,0,0,.08)_6px_7px)]" />
        <span className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-4 ring-black/10 dark:bg-zinc-900" />
      </div>
      <div className="mt-5 flex items-center justify-between text-left">
        <div><h3 className="font-semibold text-zinc-950 dark:text-zinc-50">{track.title}</h3><p className="text-sm text-zinc-500">{track.artist}</p></div>
        <button type="button" aria-pressed={liked} aria-label="Like" onClick={() => setLiked((value) => !value)} className="text-pink-500"><Heart aria-hidden className={`size-5 ${liked ? 'fill-current' : ''}`} /></button>
      </div>
      <input type="range" min={0} max={track.length} value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label="Seek" aria-valuetext={`${time(position)} of ${time(track.length)}`} className="mt-4 w-full accent-pink-500" />
      <div className="flex justify-between text-[11px] tabular-nums text-zinc-500"><span>{time(position)}</span><span>{time(track.length)}</span></div>
      <div className="mt-3 flex items-center justify-between">
        <button type="button" aria-pressed={toggles.shuffle} aria-label="Shuffle" onClick={() => setToggles((value) => ({ ...value, shuffle: !value.shuffle }))} className={small(toggles.shuffle)}><Shuffle aria-hidden className="size-4" /></button>
        <button type="button" aria-label="Previous track" onClick={() => go(-1)} className="grid size-10 place-items-center rounded-full text-zinc-800 dark:text-zinc-100"><SkipBack aria-hidden className="size-5 fill-current" /></button>
        <button type="button" aria-pressed={playing} aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying((value) => !value)} className="grid size-14 place-items-center rounded-full bg-pink-500 text-white shadow-lg shadow-pink-500/30">{playing ? <Pause aria-hidden className="size-6 fill-current" /> : <Play aria-hidden className="ml-0.5 size-6 fill-current" />}</button>
        <button type="button" aria-label="Next track" onClick={() => go(1)} className="grid size-10 place-items-center rounded-full text-zinc-800 dark:text-zinc-100"><SkipForward aria-hidden className="size-5 fill-current" /></button>
        <button type="button" aria-pressed={toggles.repeat} aria-label="Repeat" onClick={() => setToggles((value) => ({ ...value, repeat: !value.repeat }))} className={small(toggles.repeat)}><Repeat aria-hidden className="size-4" /></button>
      </div>
    </article>
  );
}
