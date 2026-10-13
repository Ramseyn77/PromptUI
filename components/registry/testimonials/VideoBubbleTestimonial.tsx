/**
 * @registry
 * name: Video Bubble Testimonial
 * category: Testimonials
 * style: Dark
 * tags: recent
 * description: Bulle vidéo de témoignage flottante (style widget) qui s'agrandit en lecteur avec sous-titres défilants, contrôle du son et fermeture.
 * prompt: Create a floating video testimonial bubble widget on a dark page mock: a small circular "video" (gradient + initials, animated ring) in the corner with a "Hear from Awa" label; clicking expands it into a vertical player card with a play/pause button, mute toggle (aria-pressed), a progress bar advancing while playing and synced captions that change over time (aria-live), plus a close button that shrinks it back; Escape closes; reduced motion removes the ring animation. Dark in both themes.
 */
'use client';
import { Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const captions = [[0, 'Before, every launch meant a week of design debt.'], [25, 'Now our team reuses the same blocks everywhere.'], [55, 'We shipped the new checkout in nine days.'], [80, 'Honestly, I can’t imagine going back.']] as const;

export function VideoBubbleTestimonial() {
  const [open, setOpen] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    if (!open || !playing) return;
    const timer = window.setInterval(() => setProgress((value) => (value >= 100 ? 0 : value + 1)), 150);
    return () => window.clearInterval(timer);
  }, [open, playing]);

  const caption = [...captions].reverse().find(([at]) => progress >= at)![1];

  return (
    <div className="relative h-[26rem] w-full max-w-lg overflow-hidden rounded-3xl bg-zinc-950 p-6 text-white ring-1 ring-white/10" onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}>
      <style>{`@keyframes pui-bubble-ring { to { transform: rotate(360deg) } }`}</style>
      <div aria-hidden className="space-y-3"><div className="h-5 w-48 rounded bg-white/10" /><div className="h-3 w-72 max-w-full rounded bg-white/5" /><div className="h-3 w-60 max-w-full rounded bg-white/5" /><div className="mt-6 grid grid-cols-3 gap-2">{[0, 1, 2].map((index) => <div key={index} className="h-20 rounded-xl bg-white/5" />)}</div></div>
      {open ? (
        <section aria-label="Video testimonial from Awa Diop" className="absolute bottom-4 right-4 w-52 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 shadow-2xl">
          <div className="relative aspect-[9/14]">
            <span aria-hidden className="absolute left-1/2 top-1/3 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-2xl font-bold">AD</span>
            <button type="button" aria-label="Close video" onClick={() => setOpen(false)} className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-black/30"><X aria-hidden className="size-4" /></button>
            <p aria-live="polite" className="absolute inset-x-3 bottom-14 rounded-lg bg-black/45 px-2 py-1.5 text-center text-xs leading-snug">{caption}</p>
            <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
              <button type="button" aria-pressed={playing} aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying(!playing)} className="grid size-8 place-items-center rounded-full bg-white text-zinc-950">{playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="ml-0.5 size-4" />}</button>
              <div className="h-1 flex-1 rounded-full bg-white/30"><div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} /></div>
              <button type="button" aria-pressed={!muted} aria-label={muted ? 'Unmute' : 'Mute'} onClick={() => setMuted(!muted)} className="grid size-8 place-items-center rounded-full bg-black/30">{muted ? <VolumeX aria-hidden className="size-4" /> : <Volume2 aria-hidden className="size-4" />}</button>
            </div>
          </div>
          <p className="bg-black/30 px-3 py-2 text-xs"><strong>Awa Diop</strong> · Kora Bank</p>
        </section>
      ) : (
        <button type="button" onClick={() => { setOpen(true); setPlaying(true); }} className="absolute bottom-4 right-4 flex items-center gap-3 rounded-full bg-white/5 py-1.5 pl-1.5 pr-4 text-sm ring-1 ring-white/10 hover:bg-white/10">
          <span className="relative grid size-14 place-items-center"><span aria-hidden className="absolute inset-0 rounded-full bg-[conic-gradient(#8b5cf6,#ec4899,#f97316,#8b5cf6)] motion-safe:animate-[pui-bubble-ring_3s_linear_infinite]" /><span className="relative grid size-12 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-orange-500 text-xs font-bold">AD</span></span>
          Hear from Awa
        </button>
      )}
    </div>
  );
}
