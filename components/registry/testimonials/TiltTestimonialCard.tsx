/**
 * @registry
 * name: Tilt Testimonial Card
 * category: Testimonials
 * style: Glass
 * tags: featured, recent
 * description: Carte de témoignage qui s'incline en 3D selon la position du curseur, reflet lumineux inclus.
 * prompt: Create a 3D tilt testimonial card: on pointermove compute rotateX/rotateY (max 10°) from the cursor position inside a perspective wrapper and move a radial glare highlight; reset smoothly on leave; disabled with prefers-reduced-motion. Glass card on a gradient backdrop, light and dark mode.
 */
'use client';
import { useRef, useState, type PointerEvent } from 'react';

export function TiltTestimonialCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });
  const reduce = useRef(false);

  function move(event: PointerEvent<HTMLDivElement>) {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - py) * 20, y: (px - 0.5) * 20, gx: px * 100, gy: py * 100 });
  }

  return (
    <div className="grid w-full max-w-md place-items-center rounded-3xl bg-gradient-to-br from-teal-200 via-sky-100 to-violet-200 p-10 [perspective:900px] dark:from-teal-950 dark:via-zinc-950 dark:to-violet-950">
      <figure
        onPointerMove={move}
        onPointerLeave={() => setTilt({ x: 0, y: 0, gx: 50, gy: 50 })}
        className="relative w-full overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-200 ease-out dark:border-white/10 dark:bg-white/5"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,.55), transparent 55%)` }} />
        <blockquote className="relative text-lg font-medium leading-7 text-zinc-900 dark:text-white">“The attention to detail is unreal. It feels premium in every interaction.”</blockquote>
        <figcaption className="relative mt-5 flex items-center gap-3"><span className="size-10 rounded-full bg-gradient-to-br from-amber-300 to-rose-400" /><span><span className="block text-sm font-semibold text-zinc-900 dark:text-white">Élodie Martin</span><span className="block text-xs text-zinc-600 dark:text-zinc-300">Creative Director, Nova</span></span></figcaption>
      </figure>
    </div>
  );
}
