/**
 * @registry
 * name: Video Demo CTA
 * category: CTA
 * style: Glass
 * tags: recent
 * description: Vignette de démo vidéo avec bouton lecture pulsant, chapitres cliquables et durée, sur fond flou.
 * prompt: Create a video demo CTA: a large gradient thumbnail with a glassy pulsing play button and a "2:14" duration chip; clicking play swaps to a fake playing state with a progress bar; a chapter list beside it (stacked on mobile) where clicking a chapter jumps the progress; title + "Book a live demo" secondary link. Light and dark mode.
 */
'use client';
import { Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

const chapters = [['Overview', 0], ['Build a page', 34], ['Collaborate', 78], ['Publish', 112]] as const;

export function VideoDemoCta() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setTime((value) => (value >= 134 ? 0 : value + 1)), 250);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <section className="grid w-full max-w-2xl gap-4 md:grid-cols-[1.6fr_1fr]">
      <style>{`@keyframes pui-play-ring{0%{box-shadow:0 0 0 0 rgba(255,255,255,.6)}100%{box-shadow:0 0 0 18px rgba(255,255,255,0)}}`}</style>
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_20%_20%,#5eead4,transparent_40%),radial-gradient(circle_at_80%_80%,#c084fc,transparent_45%),linear-gradient(#0f172a,#0f172a)]">
        <button type="button" aria-label={playing ? 'Pause demo' : 'Play demo'} onClick={() => setPlaying((value) => !value)} className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-white motion-safe:animate-[pui-play-ring_1.8s_ease-out_infinite]">
          {playing ? <Pause aria-hidden className="size-6 fill-current" /> : <Play aria-hidden className="ml-1 size-6 fill-current" />}
        </button>
        <span className="absolute bottom-3 right-3 rounded-md bg-black/50 px-1.5 py-0.5 font-mono text-xs text-white">{Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')} / 2:14</span>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20"><div className="h-full bg-teal-300" style={{ width: `${(time / 134) * 100}%` }} /></div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">See it in 2 minutes</h2>
        <ol className="mt-3 space-y-1">
          {chapters.map(([label, at], index) => {
            const active = time >= at && (index === chapters.length - 1 || time < chapters[index + 1][1]);
            return <li key={label}><button type="button" onClick={() => { setTime(at); setPlaying(true); }} className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm ${active ? 'bg-teal-50 font-medium text-teal-800 dark:bg-teal-400/10 dark:text-teal-200' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'}`}>{label}<span className="font-mono text-xs opacity-70">{Math.floor(at / 60)}:{String(at % 60).padStart(2, '0')}</span></button></li>;
          })}
        </ol>
        <a href="#demo" className="mt-3 inline-block text-sm font-semibold text-teal-700 hover:underline dark:text-teal-400">Book a live demo →</a>
      </div>
    </section>
  );
}
