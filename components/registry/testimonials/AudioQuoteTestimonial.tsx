/**
 * @registry
 * name: Audio Quote Testimonial
 * category: Testimonials
 * style: Editorial
 * tags: recent
 * description: Témoignage client audio avec citation, progression de lecture et portrait.
 * prompt: Create an editorial audio testimonial card with a customer portrait, quote, play/pause button, waveform-style progress and responsive layout. Simulate playback without external audio.
 */
'use client';

import { Pause, Play, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';

const waveform = [30, 48, 72, 40, 82, 55, 90, 46, 68, 36, 78, 58, 86, 44, 64, 34, 74, 50, 80, 42, 62, 32, 70, 48];

export function AudioQuoteTestimonial() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(24);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setProgress((value) => value >= 100 ? 0 : value + 1), 180);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <figure className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-[#17150f] p-9 text-stone-100 shadow-2xl">
      <div className="absolute -right-16 -top-20 size-56 rounded-full bg-amber-400/15 blur-3xl" aria-hidden="true" />
      <Quote className="text-amber-300" size={30} aria-hidden="true" />
      <blockquote className="relative mt-5 max-w-xl font-serif text-2xl leading-snug sm:text-3xl">“We stopped designing screens and started designing moments people remember.”</blockquote>
      <figcaption className="mt-7 flex items-center gap-3"><div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-orange-500 font-semibold text-stone-950">AM</div><div><p className="text-sm font-semibold">Amina Mensah</p><p className="text-xs text-stone-400">Creative director · Studio North</p></div></figcaption>
      <div className="relative mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.06] p-4">
        <button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause testimonial' : 'Play testimonial'} className="grid size-11 shrink-0 place-items-center rounded-full bg-amber-300 text-stone-950 hover:bg-amber-200">{playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}</button>
        <div className="min-w-0 flex-1"><div className="flex h-8 items-center gap-0.5" aria-hidden="true">{waveform.map((height, index) => <span key={index} style={{ height: `${height}%` }} className={`min-w-0 flex-1 rounded-full ${index / waveform.length * 100 <= progress ? 'bg-amber-300' : 'bg-white/20'}`} />)}</div><div className="mt-1 flex justify-between font-mono text-[10px] text-stone-400"><span>0:{String(Math.floor(progress * .37)).padStart(2, '0')}</span><span>0:37</span></div></div>
      </div>
    </figure>
  );
}
