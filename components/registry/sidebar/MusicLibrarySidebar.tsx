/**
 * @registry
 * name: Music Library Sidebar
 * category: Sidebar
 * style: Dark
 * tags: recent
 * description: Bibliotheque musicale laterale avec playlists en vignettes et mini lecteur en bas.
 * prompt: Create a music app sidebar: "Your library" header, filter chips (Playlists, Artists), playlist rows with gradient cover thumbnails, title and track count (active one highlighted), and a bottom mini player with cover, song, artist, play/pause toggle (aria-pressed) and a progress bar. Dark-first with a light variant.
 */
'use client';
import { Pause, Play } from 'lucide-react';
import { useState } from 'react';

const playlists = [['Focus flow', 42, 'from-teal-400 to-sky-600'], ['Late night drive', 28, 'from-violet-500 to-fuchsia-600'], ['Morning jazz', 35, 'from-amber-300 to-orange-500'], ['Gym mix', 51, 'from-rose-400 to-red-600']] as const;

export function MusicLibrarySidebar() {
  const [active, setActive] = useState('Focus flow');
  const [playing, setPlaying] = useState(true);
  const [chip, setChip] = useState('Playlists');

  return (
    <aside className="flex h-[26rem] w-72 flex-col rounded-2xl bg-zinc-100 p-3 text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <p className="px-1 font-bold">Your library</p>
      <div className="mt-3 flex gap-2">{['Playlists', 'Artists'].map((name) => <button key={name} type="button" aria-pressed={chip === name} onClick={() => setChip(name)} className={`rounded-full px-3 py-1 text-xs font-medium ${chip === name ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-white text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'}`}>{name}</button>)}</div>
      <ul className="mt-3 flex-1 space-y-1 overflow-y-auto">
        {playlists.map(([name, tracks, gradient]) => (
          <li key={name}>
            <button type="button" aria-current={active === name ? 'true' : undefined} onClick={() => setActive(name)} className={`flex w-full items-center gap-3 rounded-lg p-1.5 text-left ${active === name ? 'bg-white dark:bg-zinc-800' : 'hover:bg-white/60 dark:hover:bg-zinc-900'}`}>
              <span className={`size-11 shrink-0 rounded-md bg-gradient-to-br ${gradient}`} />
              <span className="min-w-0"><span className={`block truncate text-sm font-medium ${active === name ? 'text-teal-700 dark:text-teal-300' : ''}`}>{name}</span><span className="block text-xs text-zinc-500 dark:text-zinc-400">Playlist · {tracks} songs</span></span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-2 rounded-xl bg-white p-2.5 dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <span className="size-10 shrink-0 rounded-md bg-gradient-to-br from-teal-400 to-sky-600" />
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Weightless</p><p className="truncate text-xs text-zinc-500 dark:text-zinc-400">Marconi Union</p></div>
          <button type="button" aria-label={playing ? 'Pause' : 'Play'} aria-pressed={playing} onClick={() => setPlaying((value) => !value)} className="grid size-9 place-items-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">{playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}</button>
        </div>
        <div className="mt-2 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700"><div className="h-full w-2/5 rounded-full bg-teal-500" /></div>
      </div>
    </aside>
  );
}
