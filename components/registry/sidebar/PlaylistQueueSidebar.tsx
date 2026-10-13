/**
 * @registry
 * name: Playlist Queue Sidebar
 * category: Sidebar
 * style: Dark
 * tags: featured, recent
 * description: Panneau latéral « File d'attente » de lecteur musical : titre en cours avec égaliseur, prochains titres réordonnables, lecture aléatoire et vider.
 * prompt: Create a dark music queue sidebar next to a now-playing area: the sidebar shows "Now playing" with cover gradient, title, artist and an animated equalizer when playing; a "Next up" list where each track has move up/down buttons and remove, plus "Play next" on hover; header actions Shuffle (aria-pressed) and Clear; on mobile the sidebar becomes a bottom sheet toggled by a "Queue" button with aria-expanded. Dark in both themes.
 */
'use client';
import { ChevronDown, ChevronUp, ListMusic, Pause, Play, Shuffle, X } from 'lucide-react';
import { useId, useState } from 'react';

const initial = [['Harmattan', 'Mariama Sow', '4:18', 'from-amber-400 to-orange-600'], ['Blue Hour', 'Kofi & Lena', '2:57', 'from-sky-400 to-indigo-600'], ['Saltwater', 'Inès R.', '3:31', 'from-teal-400 to-emerald-600'], ['Night Bus', 'The Okafors', '3:05', 'from-violet-400 to-fuchsia-600'], ['Paper Planes', 'Lumen', '2:44', 'from-rose-400 to-pink-600']] as const;

export function PlaylistQueueSidebar() {
  const uid = useId();
  const [queue, setQueue] = useState<(typeof initial)[number][]>([...initial]);
  const [playing, setPlaying] = useState(true);
  const [shuffle, setShuffle] = useState(false);
  const [sheet, setSheet] = useState(false);
  const move = (index: number, delta: number) => setQueue((list) => { const next = [...list]; [next[index], next[index + delta]] = [next[index + delta], next[index]]; return next; });

  return (
    <div className="relative flex h-[26rem] w-full max-w-2xl overflow-hidden rounded-2xl bg-zinc-950 text-zinc-300 ring-1 ring-white/10 sm:min-w-[34rem]">
      <style>{`@keyframes pui-eq { 0%, 100% { transform: scaleY(.3) } 50% { transform: scaleY(1) } }`}</style>
      <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <div aria-hidden className="size-36 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-400 shadow-2xl" />
        <div><p className="font-semibold text-white">Lagos Nights</p><p className="text-sm text-zinc-500">Ayo Bello</p></div>
        <button type="button" aria-pressed={playing} aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying(!playing)} className="grid size-12 place-items-center rounded-full bg-white text-zinc-950">{playing ? <Pause aria-hidden className="size-5" /> : <Play aria-hidden className="ml-0.5 size-5" />}</button>
        <button type="button" aria-expanded={sheet} aria-controls={`${uid}-queue`} onClick={() => setSheet(!sheet)} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ring-1 ring-white/15 sm:hidden"><ListMusic aria-hidden className="size-3.5" />Queue</button>
      </main>
      <aside id={`${uid}-queue`} aria-label="Queue" className={`${sheet ? 'visible translate-y-0' : 'invisible translate-y-full sm:visible'} absolute inset-x-0 bottom-0 max-h-[75%] overflow-y-auto rounded-t-2xl bg-zinc-900 p-4 transition-transform sm:static sm:max-h-none sm:w-72 sm:translate-y-0 sm:rounded-none sm:border-l sm:border-white/10`} data-lenis-prevent>
        <div className="flex items-center gap-1"><h3 className="flex-1 text-sm font-semibold text-white">Queue</h3><button type="button" aria-pressed={shuffle} aria-label="Shuffle" onClick={() => setShuffle(!shuffle)} className={`grid size-8 place-items-center rounded-md hover:bg-white/10 ${shuffle ? 'text-emerald-400' : ''}`}><Shuffle aria-hidden className="size-4" /></button><button type="button" onClick={() => setQueue([])} className="rounded-md px-2 py-1 text-xs hover:bg-white/10">Clear</button></div>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Now playing</p>
        <div className="mt-2 flex items-center gap-3 rounded-xl bg-white/5 p-2"><span aria-hidden className="size-10 rounded-lg bg-gradient-to-br from-rose-500 to-amber-400" /><div className="flex-1"><p className="text-sm font-medium text-emerald-400">Lagos Nights</p><p className="text-xs text-zinc-500">Ayo Bello</p></div><span aria-hidden className="flex h-4 items-end gap-0.5">{[0, 1, 2].map((bar) => <span key={bar} className="w-1 origin-bottom rounded-sm bg-emerald-400" style={{ height: '100%', animation: playing ? `pui-eq ${0.7 + bar * 0.15}s ease-in-out infinite` : undefined, transform: playing ? undefined : 'scaleY(.3)' }} />)}</span></div>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Next up · {queue.length}</p>
        <ol className="mt-2 space-y-1">
          {queue.map(([title, artist, duration, gradient], index) => (
            <li key={title} className="group flex items-center gap-2 rounded-lg p-1.5 hover:bg-white/5 focus-within:bg-white/5">
              <span aria-hidden className={`size-9 shrink-0 rounded-md bg-gradient-to-br ${gradient}`} />
              <div className="min-w-0 flex-1"><p className="truncate text-sm text-zinc-100">{title}</p><p className="truncate text-xs text-zinc-500">{artist} · {duration}</p></div>
              <div className="flex opacity-60 group-hover:opacity-100 group-focus-within:opacity-100">
                <button type="button" aria-label={`Move ${title} up`} disabled={index === 0} onClick={() => move(index, -1)} className="grid size-6 place-items-center rounded hover:bg-white/10 disabled:opacity-30"><ChevronUp aria-hidden className="size-3.5" /></button>
                <button type="button" aria-label={`Move ${title} down`} disabled={index === queue.length - 1} onClick={() => move(index, 1)} className="grid size-6 place-items-center rounded hover:bg-white/10 disabled:opacity-30"><ChevronDown aria-hidden className="size-3.5" /></button>
                <button type="button" aria-label={`Remove ${title}`} onClick={() => setQueue((list) => list.filter((_, item) => item !== index))} className="grid size-6 place-items-center rounded hover:bg-white/10"><X aria-hidden className="size-3.5" /></button>
              </div>
            </li>
          ))}
          {!queue.length && <li className="py-6 text-center text-sm text-zinc-500">Your queue is empty</li>}
        </ol>
      </aside>
    </div>
  );
}
