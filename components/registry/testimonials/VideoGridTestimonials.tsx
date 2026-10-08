/**
 * @registry
 * name: Video Grid Testimonials
 * category: Testimonials
 * style: Dark
 * tags: recent
 * description: Grille de témoignages vidéo en portrait avec durée, nom, et lecteur qui s'ouvre en grand dans la grille.
 * prompt: Create a video testimonial grid on a dark section: 4 portrait gradient thumbnails (2 columns on mobile, 4 from md) with play buttons, duration chip, name and company overlay; clicking one expands it to span the full row as a "playing" state with progress bar and a close button (focus returns). Dark in both themes.
 */
'use client';
import { Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const videos = [
  { name: 'Lina K.', company: 'Fable Studio', time: '0:48', tone: 'from-rose-500 to-orange-400' },
  { name: 'Marcus O.', company: 'Northwind', time: '1:12', tone: 'from-sky-500 to-indigo-600' },
  { name: 'Aïcha D.', company: 'Kora', time: '0:57', tone: 'from-emerald-500 to-teal-600' },
  { name: 'Tom R.', company: 'Bluefin', time: '1:30', tone: 'from-violet-500 to-fuchsia-500' },
];

export function VideoGridTestimonials() {
  const [open, setOpen] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (open === null) return;
    setProgress(0);
    const timer = window.setInterval(() => setProgress((value) => Math.min(100, value + 1)), 120);
    return () => window.clearInterval(timer);
  }, [open]);

  const close = () => { const index = open; setOpen(null); window.setTimeout(() => index !== null && triggers.current[index]?.focus()); };

  return (
    <section className="w-full max-w-3xl rounded-3xl bg-zinc-950 p-5 text-white">
      <h3 className="text-lg font-semibold">Hear it from our customers</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {videos.map((video, index) => open === index ? (
          <div key={video.name} className={`relative col-span-2 aspect-video overflow-hidden rounded-2xl bg-gradient-to-br md:col-span-4 ${video.tone}`}>
            <p className="absolute left-4 top-4 text-sm font-semibold">{video.name} · {video.company}</p>
            <button type="button" autoFocus onClick={close} aria-label="Close video" className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-black/40 backdrop-blur hover:bg-black/60"><X aria-hidden className="size-4" /></button>
            <p className="absolute inset-0 grid place-items-center text-sm text-white/80">▶ Playing…</p>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20"><div className="h-full bg-white" style={{ width: `${progress}%` }} /></div>
          </div>
        ) : (
          <button key={video.name} ref={(node) => { triggers.current[index] = node; }} type="button" onClick={() => setOpen(index)} aria-label={`Play testimonial from ${video.name}, ${video.time}`} className={`group relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br text-left outline-none focus-visible:ring-2 focus-visible:ring-white ${video.tone}`}>
            <span className="absolute right-2 top-2 rounded bg-black/40 px-1.5 py-0.5 font-mono text-[10px]">{video.time}</span>
            <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/25 backdrop-blur transition group-hover:scale-110"><Play aria-hidden className="ml-0.5 size-5 fill-white" /></span>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3"><span className="block text-sm font-semibold">{video.name}</span><span className="block text-xs text-white/75">{video.company}</span></span>
          </button>
        ))}
      </div>
    </section>
  );
}
