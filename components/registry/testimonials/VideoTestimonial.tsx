/**
 * @registry
 * name: Video Testimonial
 * category: Testimonials
 * style: Gradient
 * tags: recent
 * description: Temoignage video en format portrait avec bouton lecture, duree, sous-titre et citation courte.
 * prompt: Create a video testimonial card: portrait gradient "poster" with a play button (aria-label, toggles to a playing state with an animated progress bar), duration badge, captions-style quote overlay at the bottom, and the person's name and company below. Light and dark mode.
 */
'use client';
import { Pause, Play } from 'lucide-react';
import { useState } from 'react';

export function VideoTestimonial() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <style>{`@keyframes pui-video-bar{from{width:0}to{width:100%}}`}</style>
      <figure className="w-64">
        <div className="relative aspect-[9/14] overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_30%_25%,#fde68a,transparent_40%),linear-gradient(160deg,#f472b6,#7c3aed_60%,#1e1b4b)] shadow-xl">
          <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2 py-0.5 font-mono text-[11px] text-white backdrop-blur">0:48</span>
          <button type="button" aria-label={playing ? 'Pause testimonial video' : 'Play testimonial video'} aria-pressed={playing} onClick={() => setPlaying((value) => !value)} className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-zinc-900 shadow-lg transition hover:scale-105">
            {playing ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5 fill-current" />}
          </button>
          <p className="absolute inset-x-3 bottom-6 rounded-lg bg-black/55 px-2.5 py-1.5 text-center text-xs font-medium text-white">“It felt like hiring a senior designer overnight.”</p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">{playing && <div className="h-full bg-white motion-safe:animate-[pui-video-bar_48s_linear_forwards]" />}</div>
        </div>
        <figcaption className="mt-3 px-1"><p className="text-sm font-semibold text-zinc-900 dark:text-white">Grace Mensah</p><p className="text-xs text-zinc-500 dark:text-zinc-400">Founder, Kora Studio</p></figcaption>
      </figure>
    </>
  );
}
