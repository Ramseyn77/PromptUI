/**
 * @registry
 * name: Wave Interference
 * category: Shaders
 * style: Glass
 * tags: recent
 * description: Interférence d'ondes circulaires de deux sources (dont une suit le pointeur), rendue en anneaux de points dont la taille varie.
 * prompt: Create a wave interference canvas: a grid of dots whose radius is driven by the sum of two circular waves — one fixed source and one that follows the pointer (and drifts on its own when idle) — producing moiré-like interference rings; dot color reads currentColor for light/dark and a glass caption card sits on top; DPR-aware, paused off screen, single static frame with reduced motion.
 */
'use client';
import { useEffect, useRef } from 'react';

export function WaveInterference() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0, active: false };
    let raf = 0;
    let visible = true;
    let time = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);
      context.fillStyle = getComputedStyle(canvas).color;
      const a = { x: width * 0.3, y: height * 0.5 };
      const b = pointer.active ? pointer : { x: width * 0.7 + Math.cos(time * 0.6) * 40, y: height * 0.5 + Math.sin(time * 0.8) * 50 };
      for (let y = 6; y < height; y += 12) {
        for (let x = 6; x < width; x += 12) {
          const wave = Math.sin(Math.hypot(x - a.x, y - a.y) * 0.08 - time * 2) + Math.sin(Math.hypot(x - b.x, y - b.y) * 0.08 - time * 2);
          const radius = 0.4 + ((wave + 2) / 4) * 3.2;
          context.globalAlpha = 0.25 + ((wave + 2) / 4) * 0.75;
          context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fill();
        }
      }
      context.globalAlpha = 1;
      time += 0.02;
      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => { resize(); if (still || !visible) draw(); });
    observer.observe(canvas);
    resize();
    draw();
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; cancelAnimationFrame(raf); if (visible && !still) raf = requestAnimationFrame(draw); });
    io.observe(canvas);
    const move = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = ((event.clientX - rect.left) / rect.width) * canvas.clientWidth; pointer.y = ((event.clientY - rect.top) / rect.height) * canvas.clientHeight; pointer.active = true; if (still) draw(); };
    const leave = () => { pointer.active = false; };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); };
  }, []);

  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-sky-50 dark:bg-zinc-950">
      <canvas ref={canvasRef} role="img" aria-label="Interference pattern of two circular waves" className="size-full text-sky-600 dark:text-cyan-300" />
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-2xl border border-white/60 bg-white/50 px-4 py-2.5 backdrop-blur-md dark:border-white/10 dark:bg-white/5"><p className="text-sm font-semibold text-zinc-900 dark:text-white">Interference</p><p className="text-xs text-zinc-600 dark:text-zinc-400">Move your pointer to steer the second wave</p></div>
    </div>
  );
}
