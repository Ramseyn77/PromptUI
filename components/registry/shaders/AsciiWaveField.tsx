/**
 * @registry
 * name: ASCII Wave Field
 * category: Shaders
 * style: Dark
 * tags: recent
 * description: Champ de caractères ASCII animé : une onde de densité parcourt la grille et module les glyphes ( .:-=+*#%@ ), avec perturbation au pointeur.
 * prompt: Create an ASCII wave field: a monospace grid of characters rendered as text in a <pre> (rows×cols computed from the container size via ResizeObserver) where each cell's character is picked from the ramp " .:-=+*#%@" based on a time-varying wave function plus a radial ripple from the pointer; colored with a green-to-cyan gradient via background-clip text; updates on requestAnimationFrame at ~30fps, paused off screen, static with reduced motion; aria-hidden with an sr-only label. Dark in both themes.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const ramp = ' .:-=+*#%@';

export function AsciiWaveField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const wrap = wrapRef.current!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -100, y: -100 };
    let cols = 60;
    let rows = 20;
    let raf = 0;
    let visible = true;
    let time = 0;
    let last = 0;

    const render = () => {
      const lines: string[] = [];
      for (let y = 0; y < rows; y += 1) {
        let line = '';
        for (let x = 0; x < cols; x += 1) {
          const wave = Math.sin(x * 0.18 + time) + Math.cos(y * 0.35 - time * 0.8) + Math.sin((x + y) * 0.08 + time * 0.5);
          const distance = Math.hypot((x - pointer.x) * 0.5, y - pointer.y);
          const ripple = distance < 12 ? Math.cos(distance - time * 4) * (1 - distance / 12) * 1.5 : 0;
          const value = (wave + ripple + 3.5) / 7;
          line += ramp[Math.max(0, Math.min(ramp.length - 1, Math.floor(value * ramp.length)))];
        }
        lines.push(line);
      }
      setText(lines.join('\n'));
    };
    const loop = (now: number) => { if (now - last > 33) { time += 0.08; render(); last = now; } if (!still && visible) raf = requestAnimationFrame(loop); };
    const observer = new ResizeObserver(() => { cols = Math.max(20, Math.floor(wrap.clientWidth / 7.2)); rows = Math.max(8, Math.floor(wrap.clientHeight / 13)); render(); });
    observer.observe(wrap);
    if (!still) raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; cancelAnimationFrame(raf); if (visible && !still) raf = requestAnimationFrame(loop); });
    io.observe(wrap);
    const move = (event: PointerEvent) => { const rect = wrap.getBoundingClientRect(); pointer.x = ((event.clientX - rect.left) / rect.width) * cols; pointer.y = ((event.clientY - rect.top) / rect.height) * rows; if (still) render(); };
    const leave = () => { pointer.x = -100; pointer.y = -100; };
    wrap.addEventListener('pointermove', move);
    wrap.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); wrap.removeEventListener('pointermove', move); wrap.removeEventListener('pointerleave', leave); };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-zinc-950 p-2">
      <span className="sr-only">Animated ASCII wave pattern</span>
      <pre aria-hidden className="select-none bg-gradient-to-br from-lime-300 via-emerald-400 to-cyan-400 bg-clip-text font-mono text-[12px] leading-[13px] text-transparent">{text}</pre>
      <p className="pointer-events-none absolute bottom-3 right-4 rounded bg-black/60 px-2 py-0.5 font-mono text-[11px] text-emerald-300">move your pointer</p>
    </div>
  );
}
