/**
 * @registry
 * name: Vinyl Player Card
 * category: Cards
 * style: Dark
 * tags: featured, recent
 * description: Carte lecteur vinyle : disque qui glisse hors de la pochette et tourne à la lecture, bras de lecture animé et liste des pistes.
 * prompt: Create a dark vinyl record player card: an album sleeve (gradient art, title, artist) with a black vinyl disc behind it that slides half out when playing and spins (grooves via repeating-radial-gradient, colored label in the center); a tonearm that swings onto the record; play/pause button (aria-pressed), previous/next, a track list where the current track is highlighted and clickable; spinning stops with reduced motion. Dark in both themes.
 */
'use client';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { useState } from 'react';

const tracks = [['Harmattan Morning', '3:41'], ['Dakar by Night', '4:12'], ['Saltwater', '3:05'], ['Slow Return', '5:20']];

export function VinylPlayerCard() {
  const [playing, setPlaying] = useState(true);
  const [track, setTrack] = useState(1);

  return (
    <article className="w-full max-w-md rounded-3xl bg-zinc-950 p-6 text-white ring-1 ring-white/10">
      <style>{`@keyframes pui-vinyl-spin { to { transform: rotate(360deg) } } @media (prefers-reduced-motion: reduce) { .pui-vinyl { animation: none !important } }`}</style>
      <div className="relative h-48">
        <div aria-hidden className={`pui-vinyl absolute top-2 size-44 rounded-full bg-[repeating-radial-gradient(circle,#111_0_2px,#1c1c1c_2px_4px)] shadow-2xl transition-[left] duration-700 ${playing ? 'left-24' : 'left-2'}`} style={{ animation: playing ? 'pui-vinyl-spin 2.4s linear infinite' : undefined }}>
          <span className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-400 to-rose-500" />
          <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-950" />
        </div>
        <div className="relative z-10 grid size-48 place-items-end rounded-xl bg-gradient-to-br from-amber-400 via-rose-500 to-violet-700 p-4 shadow-2xl">
          <div><p className="text-lg font-bold leading-tight">Slow Return</p><p className="text-xs text-white/80">Mariama Sow</p></div>
        </div>
        <span aria-hidden className={`absolute right-2 top-0 h-32 w-1.5 origin-top rounded-full bg-zinc-400 transition-transform duration-700 ${playing ? 'rotate-[22deg]' : 'rotate-0'}`}><span className="absolute -left-1.5 -top-1.5 size-4 rounded-full bg-zinc-300" /><span className="absolute -bottom-1 -left-0.5 h-3 w-2.5 rounded-sm bg-zinc-300" /></span>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <div className="min-w-0 flex-1"><p className="truncate font-semibold">{tracks[track][0]}</p><p className="text-xs text-zinc-500">Side A · track {track + 1}</p></div>
        <button type="button" aria-label="Previous track" onClick={() => setTrack((track - 1 + tracks.length) % tracks.length)} className="grid size-9 place-items-center rounded-full hover:bg-white/10"><SkipBack aria-hidden className="size-4" /></button>
        <button type="button" aria-pressed={playing} aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying(!playing)} className="grid size-11 place-items-center rounded-full bg-white text-zinc-950">{playing ? <Pause aria-hidden className="size-5" /> : <Play aria-hidden className="ml-0.5 size-5" />}</button>
        <button type="button" aria-label="Next track" onClick={() => setTrack((track + 1) % tracks.length)} className="grid size-9 place-items-center rounded-full hover:bg-white/10"><SkipForward aria-hidden className="size-4" /></button>
      </div>
      <ol className="mt-4 space-y-1">{tracks.map(([title, time], index) => <li key={title}><button type="button" aria-current={track === index ? 'true' : undefined} onClick={() => { setTrack(index); setPlaying(true); }} className={`flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm ${track === index ? 'bg-white/10 text-amber-300' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}><span className="w-4 text-xs tabular-nums">{index + 1}</span><span className="flex-1">{title}</span><span className="text-xs tabular-nums">{time}</span></button></li>)}</ol>
    </article>
  );
}
