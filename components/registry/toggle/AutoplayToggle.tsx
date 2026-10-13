/**
 * @registry
 * name: Autoplay Toggle
 * category: Toggle
 * style: Dark
 * tags: recent
 * description: Interrupteur d'autoplay de lecteur vidéo : compte à rebours circulaire vers l'épisode suivant, annulation et préférence mémorisée dans la session.
 * prompt: Create a dark video player "up next" autoplay toggle: an autoplay switch (role=switch) in the player bar; when on, an "Up next" card shows the next episode thumbnail with a circular countdown (10 → 0, after mount) around a play button and a Cancel button; when the countdown ends it shows "Playing Episode 5"; turning autoplay off hides the countdown and shows a manual "Play next" button; state changes announced via aria-live; reduced motion keeps the countdown but no ring animation smoothing. Dark in both themes.
 */
'use client';
import { Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const circumference = 2 * 3.1416 * 22;

export function AutoplayToggle() {
  const [autoplay, setAutoplay] = useState(true);
  const [seconds, setSeconds] = useState(10);
  const [cancelled, setCancelled] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!autoplay || cancelled || playing) return;
    if (seconds <= 0) { setPlaying(true); return; }
    const timer = window.setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [autoplay, cancelled, playing, seconds]);

  const reset = () => { setSeconds(10); setCancelled(false); setPlaying(false); };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-zinc-950 text-white ring-1 ring-white/10">
      <div aria-hidden className="relative aspect-video bg-gradient-to-br from-indigo-900 via-zinc-900 to-rose-900"><span className="absolute bottom-3 left-3 text-sm font-semibold">Episode 4 · The long night</span></div>
      <div className="flex items-center justify-between px-4 py-2.5 text-sm">
        <span className="text-xs text-zinc-400">41:58 / 42:10</span>
        <div className="flex items-center gap-2 text-xs"><span aria-hidden>Autoplay</span><button type="button" role="switch" aria-checked={autoplay} aria-label="Autoplay next episode" onClick={() => { setAutoplay(!autoplay); reset(); }} className={`relative h-5 w-9 rounded-full transition-colors ${autoplay ? 'bg-white' : 'bg-white/25'}`}><span className={`absolute top-0.5 grid size-4 place-items-center rounded-full transition-all ${autoplay ? 'left-[1.1rem] bg-zinc-950 text-white' : 'left-0.5 bg-white text-zinc-950'}`}><Play aria-hidden className="size-2.5 fill-current" /></span></button></div>
      </div>
      <div aria-live="polite" className="border-t border-white/10 p-4">
        {playing ? <p className="text-sm">Playing <strong>Episode 5</strong>… <button type="button" onClick={reset} className="ml-2 text-xs text-zinc-400 underline">Replay demo</button></p> : (
          <div className="flex items-center gap-4">
            <div className="relative size-14 shrink-0">
              {autoplay && !cancelled && <svg viewBox="0 0 48 48" aria-hidden className="absolute inset-0 -rotate-90"><circle cx="24" cy="24" r="22" fill="none" strokeWidth="3" className="stroke-white/15" /><circle cx="24" cy="24" r="22" fill="none" strokeWidth="3" strokeLinecap="round" strokeDasharray={circumference.toFixed(1)} strokeDashoffset={(circumference * (seconds / 10)).toFixed(1)} className="stroke-white transition-[stroke-dashoffset] duration-1000 ease-linear motion-reduce:transition-none" /></svg>}
              <button type="button" aria-label="Play Episode 5 now" onClick={() => setPlaying(true)} className="absolute inset-1.5 grid place-items-center rounded-full bg-white/10 hover:bg-white/20"><Play aria-hidden className="ml-0.5 size-4 fill-current" /></button>
            </div>
            <div className="min-w-0 flex-1"><p className="text-xs text-zinc-400">{autoplay && !cancelled ? `Up next in ${seconds}s` : 'Up next'}</p><p className="truncate text-sm font-semibold">Episode 5 · First light</p></div>
            {autoplay && !cancelled ? <button type="button" aria-label="Cancel autoplay" onClick={() => setCancelled(true)} className="grid size-8 place-items-center rounded-full hover:bg-white/10"><X aria-hidden className="size-4" /></button> : <button type="button" onClick={() => setPlaying(true)} className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-zinc-950">Play next</button>}
          </div>
        )}
      </div>
    </div>
  );
}
