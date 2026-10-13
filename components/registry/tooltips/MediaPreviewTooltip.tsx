/**
 * @registry
 * name: Media Preview Tooltip
 * category: Tooltips
 * style: Dark
 * tags: recent
 * description: Infobulle riche au survol d'une piste ou d'une vidéo : vignette, durée, artiste, barre de lecture et bouton d'écoute de 10 secondes.
 * prompt: Create a dark media preview tooltip: in a list of three tracks/videos, hovering or focusing an item opens (after a 300ms delay) a rich tooltip card below it with a gradient thumbnail, title, artist, duration, a mini progress bar and a "Preview 10s" button that animates the progress while playing (aria-pressed); the card stays open while hovered (hover bridge) and closes on Escape or blur; trigger uses aria-describedby. Dark in both themes.
 */
'use client';
import { Pause, Play } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

const tracks = [['Lagos Nights', 'Ayo Bello', '3:42', 'from-orange-500 to-rose-600'], ['Harmattan', 'Mariama Sow', '4:18', 'from-amber-400 to-yellow-600'], ['Blue Hour', 'Kofi & Lena', '2:57', 'from-sky-500 to-indigo-700']] as const;

export function MediaPreviewTooltip() {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const delay = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setProgress((value) => { if (value >= 100) { setPlaying(false); return 0; } return value + 2; }), 200);
    return () => window.clearInterval(timer);
  }, [playing]);

  const show = (index: number) => { window.clearTimeout(delay.current); delay.current = window.setTimeout(() => { setOpen(index); setPlaying(false); setProgress(0); }, 300); };
  const hide = () => { window.clearTimeout(delay.current); delay.current = window.setTimeout(() => setOpen(null), 150); };

  return (
    <ul className="w-full max-w-sm space-y-1 rounded-2xl bg-zinc-950 p-3 text-zinc-300 ring-1 ring-white/10" onKeyDown={(event) => { if (event.key === 'Escape') setOpen(null); }}>
      {tracks.map(([title, artist, duration, gradient], index) => (
        <li key={title} onMouseEnter={() => show(index)} onMouseLeave={hide}>
          <a href="#" aria-describedby={open === index ? `${uid}-tip` : undefined} onFocus={() => show(index)} onBlur={hide} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-white">
            <span aria-hidden className={`size-9 rounded-lg bg-gradient-to-br ${gradient}`} />
            <span className="flex-1"><span className="block text-sm font-medium text-white">{title}</span><span className="block text-xs text-zinc-500">{artist}</span></span>
            <span className="text-xs tabular-nums text-zinc-500">{duration}</span>
          </a>
          {open === index && (
            <div id={`${uid}-tip`} role="tooltip" onMouseEnter={() => window.clearTimeout(delay.current)} onMouseLeave={hide} className="mx-2 mt-1 rounded-2xl bg-zinc-900 p-3 shadow-2xl ring-1 ring-white/10">
              <div aria-hidden className={`relative h-24 rounded-xl bg-gradient-to-br ${gradient}`}><span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 text-[10px] tabular-nums text-white">{duration}</span></div>
              <p className="mt-2 text-sm font-semibold text-white">{title}</p>
              <p className="text-xs text-zinc-500">{artist} · Single · 2026</p>
              <div className="mt-2 flex items-center gap-2">
                <button type="button" aria-pressed={playing} onClick={() => setPlaying(!playing)} onFocus={() => window.clearTimeout(delay.current)} className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-zinc-950">{playing ? <Pause aria-hidden className="size-3" /> : <Play aria-hidden className="size-3" />}Preview 10s</button>
                <div className="h-1 flex-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-white transition-[width] duration-200" style={{ width: `${progress}%` }} /></div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
