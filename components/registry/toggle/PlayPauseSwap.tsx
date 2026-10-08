/**
 * @registry
 * name: Play Pause Swap
 * category: Toggle
 * style: Dark
 * tags: recent
 * description: Mini lecteur dont le bouton lecture/pause échange ses icônes, avec barres d'égaliseur qui s'animent.
 * prompt: Create a compact track player with a play/pause toggle button (aria-pressed, aria-label switches) whose icons swap with a scale+rotate transition; while playing, equalizer bars next to the title animate and a progress bar advances; paused freezes both. Reduced motion keeps bars static. Dark player in both themes.
 */
'use client';
import { Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

export function PlayPauseSwap() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(32);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setProgress((value) => (value >= 100 ? 0 : value + 0.5)), 200);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <div className="flex w-full max-w-sm items-center gap-4 rounded-2xl bg-zinc-900 p-4 text-white ring-1 ring-white/10">
      <style>{`@keyframes pui-eq{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}`}</style>
      <button type="button" aria-pressed={playing} aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying((value) => !value)} className="relative grid size-12 shrink-0 place-items-center rounded-full bg-white text-zinc-950 outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900">
        <Play aria-hidden className={`absolute size-5 fill-current transition duration-300 ${playing ? 'rotate-90 scale-0' : ''}`} />
        <Pause aria-hidden className={`absolute size-5 fill-current transition duration-300 ${playing ? '' : '-rotate-90 scale-0'}`} />
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold">Midnight Drive</p>
          <span aria-hidden className="flex h-3 items-end gap-0.5">
            {[0, 1, 2, 3].map((bar) => <span key={bar} className="w-0.5 origin-bottom rounded-full bg-teal-400" style={{ height: '100%', animation: playing ? `pui-eq ${0.6 + bar * 0.15}s ease-in-out infinite` : 'none', transform: playing ? undefined : 'scaleY(.3)' }} />)}
          </span>
        </div>
        <p className="text-xs text-zinc-400">Nova Lines</p>
        <div className="mt-2 h-1 rounded-full bg-white/15"><div className="h-full rounded-full bg-teal-400" style={{ width: `${progress}%` }} /></div>
      </div>
    </div>
  );
}
