/**
 * @registry
 * name: Podcast Footer
 * category: Footer
 * style: Gradient
 * tags: recent
 * description: Footer de podcast : mini-lecteur du dernier épisode avec onde animée, plateformes d'écoute, abonnement RSS copiable et liens.
 * prompt: Create a podcast footer on a warm gradient: a mini player card for the latest episode (cover square with episode number, title, guest, a play/pause button with aria-pressed, an animated waveform of deterministic bar heights that plays when active, and a scrubber showing 12:40 / 48:15); "Listen on" text-only pill links (Spotify, Apple Podcasts, YouTube, Overcast); a copyable RSS feed URL; link columns and copyright; stacks on mobile. Light and dark mode.
 */
'use client';
import { Pause, Play, Rss } from 'lucide-react';
import { useState } from 'react';

const bars = Array.from({ length: 36 }, (_, index) => 20 + ((index * 37) % 70));

export function PodcastFooter() {
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <footer className="w-full bg-gradient-to-br from-orange-100 via-rose-100 to-fuchsia-100 px-6 py-12 dark:from-orange-950/60 dark:via-rose-950/60 dark:to-fuchsia-950/60">
      <style>{`@keyframes pui-pod-wave { 0%, 100% { transform: scaleY(.4) } 50% { transform: scaleY(1) } } @media (prefers-reduced-motion: reduce) { .pui-pod-bar { animation: none !important } }`}</style>
      <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl bg-white/80 p-4 shadow-xl backdrop-blur dark:bg-zinc-900/80">
          <div className="flex items-center gap-4">
            <div aria-hidden className="grid size-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-fuchsia-600 text-2xl font-black text-white">#87</div>
            <div className="min-w-0 flex-1"><p className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">Latest episode</p><p className="truncate font-semibold text-zinc-950 dark:text-white">Designing for trust in fintech</p><p className="text-sm text-zinc-500">with Awa Diop</p></div>
            <button type="button" aria-pressed={playing} aria-label={playing ? 'Pause episode' : 'Play episode'} onClick={() => setPlaying(!playing)} className="grid size-12 shrink-0 place-items-center rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">{playing ? <Pause aria-hidden className="size-5" /> : <Play aria-hidden className="ml-0.5 size-5" />}</button>
          </div>
          <div aria-hidden className="mt-4 flex h-10 items-center gap-[3px]">{bars.map((height, index) => <span key={index} className={`pui-pod-bar flex-1 origin-center rounded-full ${index < 10 ? 'bg-rose-500' : 'bg-zinc-300 dark:bg-zinc-700'}`} style={{ height: `${height}%`, animation: playing ? `pui-pod-wave ${0.6 + (index % 5) * 0.12}s ease-in-out ${(index % 7) * 0.05}s infinite` : undefined }} />)}</div>
          <div className="mt-1 flex justify-between text-[11px] tabular-nums text-zinc-500"><span>12:40</span><span>48:15</span></div>
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-950 dark:text-white">Listen on</p>
          <ul className="mt-3 flex flex-wrap gap-2">{['Spotify', 'Apple Podcasts', 'YouTube', 'Overcast'].map((name) => <li key={name}><a href="#" className="block rounded-full bg-white/70 px-3 py-1.5 text-sm text-zinc-800 hover:bg-white dark:bg-white/10 dark:text-zinc-200 dark:hover:bg-white/20">{name}</a></li>)}</ul>
          <button type="button" onClick={() => { navigator.clipboard?.writeText('https://feeds.example.fm/margins').catch(() => {}); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }} className="mt-4 flex w-full items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-left text-xs text-zinc-700 dark:bg-white/10 dark:text-zinc-300"><Rss aria-hidden className="size-4 text-orange-500" /><span className="flex-1 truncate font-mono">feeds.example.fm/margins</span><span aria-live="polite" className="font-semibold">{copied ? 'Copied' : 'Copy RSS'}</span></button>
          <nav aria-label="Footer" className="mt-6 grid grid-cols-2 gap-2 text-sm text-zinc-700 dark:text-zinc-300">{['All episodes', 'Guests', 'Sponsor us', 'Transcripts', 'About', 'Contact'].map((link) => <a key={link} href="#" className="hover:underline">{link}</a>)}</nav>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-5xl text-xs text-zinc-500">© 2026 Margins Podcast. Recorded in Dakar & Paris.</p>
    </footer>
  );
}
