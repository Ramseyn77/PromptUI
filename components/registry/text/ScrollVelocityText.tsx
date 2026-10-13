/**
 * @registry
 * name: Scroll Velocity Text
 * category: Text
 * style: Dark
 * tags: featured, recent
 * description: Deux bandeaux de texte géants en sens opposés dont la vitesse s'accélère avec le défilement de la molette dans la zone, inspiré de Magic UI.
 * prompt: Create a scroll-velocity marquee inspired by Magic UI: two huge text rows ("Design · Build · Ship ·") moving in opposite directions with requestAnimationFrame; scrolling the wheel over the block (or dragging on touch) adds velocity that decays smoothly and also skews the rows slightly; the text repeats seamlessly via a translated track with duplicated content (aria-hidden copies, sr-only full text); paused off screen and static with reduced motion. Dark in both themes.
 */
'use client';
import { useEffect, useRef } from 'react';

const phrase = 'Design · Build · Ship · ';

export function ScrollVelocityText() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current!;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let visible = true;
    let velocity = 0;
    let offset = 0;
    let lastY = 0;

    const tick = () => {
      velocity *= 0.92;
      offset += 0.6 + Math.abs(velocity) * 0.25;
      rows.current.forEach((row, index) => {
        if (!row) return;
        const width = row.scrollWidth / 2;
        const x = -((offset * (index === 0 ? 1 : -1)) % width + width) % width;
        row.style.transform = `translateX(${x}px) skewX(${Math.max(-12, Math.min(12, velocity * -0.4))}deg)`;
      });
      if (visible) raf = requestAnimationFrame(tick);
    };
    const wheel = (event: WheelEvent) => { velocity += event.deltaY * 0.08; };
    const touchStart = (event: TouchEvent) => { lastY = event.touches[0].clientX; };
    const touchMove = (event: TouchEvent) => { velocity += (lastY - event.touches[0].clientX) * 0.3; lastY = event.touches[0].clientX; };
    wrap.addEventListener('wheel', wheel, { passive: true });
    wrap.addEventListener('touchstart', touchStart, { passive: true });
    wrap.addEventListener('touchmove', touchMove, { passive: true });
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; cancelAnimationFrame(raf); if (visible) raf = requestAnimationFrame(tick); });
    io.observe(wrap);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); wrap.removeEventListener('wheel', wheel); wrap.removeEventListener('touchstart', touchStart); wrap.removeEventListener('touchmove', touchMove); };
  }, []);

  return (
    <div ref={wrapRef} className="w-full max-w-3xl overflow-hidden rounded-3xl bg-zinc-950 py-10">
      <p className="sr-only">Design, build, ship.</p>
      {[0, 1].map((row) => (
        <div key={row} aria-hidden className="overflow-hidden">
          <div ref={(node) => { rows.current[row] = node; }} className={`flex w-max whitespace-nowrap text-6xl font-black uppercase tracking-tight will-change-transform sm:text-7xl ${row === 0 ? 'text-white' : 'text-transparent [-webkit-text-stroke:2px_#a78bfa]'}`}>
            {[0, 1].map((copy) => <span key={copy} className="pr-4">{phrase.repeat(3)}</span>)}
          </div>
        </div>
      ))}
      <p className="mt-6 text-center text-xs text-zinc-500">Scroll over me</p>
    </div>
  );
}
