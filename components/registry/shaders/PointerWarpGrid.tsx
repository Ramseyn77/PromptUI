/**
 * @registry
 * name: Pointer Warp Grid
 * category: Shaders
 * style: Minimal
 * tags: recent
 * description: Grille de lignes qui se déforme comme une lentille sous le curseur puis revient en douceur à plat.
 * prompt: Create a canvas grid that warps under the pointer like a magnifying lens: horizontal and vertical lines drawn as polylines whose points are pushed away from the pointer with a smooth falloff; the warp eases back when the pointer leaves; line color reads currentColor for light/dark; DPR-aware, paused off screen, flat static grid with reduced motion.
 */
'use client';
import { useEffect, useRef } from 'react';

export function PointerWarpGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0, strength: 0, target: 0 };
    let raf = 0;
    let visible = true;
    const gap = 22;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const warp = (x: number, y: number) => {
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy) || 1;
      const push = pointer.strength * 28 * Math.exp(-(distance * distance) / 9000);
      return [x + (dx / distance) * push, y + (dy / distance) * push];
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      pointer.strength += (pointer.target - pointer.strength) * 0.12;
      context.clearRect(0, 0, width, height);
      context.strokeStyle = getComputedStyle(canvas).color;
      context.lineWidth = 0.8;
      for (let y = 0; y <= height; y += gap) {
        context.beginPath();
        for (let x = 0; x <= width; x += 6) { const [px, py] = warp(x, y); if (x === 0) context.moveTo(px, py); else context.lineTo(px, py); }
        context.stroke();
      }
      for (let x = 0; x <= width; x += gap) {
        context.beginPath();
        for (let y = 0; y <= height; y += 6) { const [px, py] = warp(x, y); if (y === 0) context.moveTo(px, py); else context.lineTo(px, py); }
        context.stroke();
      }
      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => { resize(); if (still || !visible) draw(); });
    observer.observe(canvas);
    resize();
    draw();
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; cancelAnimationFrame(raf); if (visible && !still) raf = requestAnimationFrame(draw); });
    io.observe(canvas);
    const move = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = ((event.clientX - rect.left) / rect.width) * canvas.clientWidth; pointer.y = ((event.clientY - rect.top) / rect.height) * canvas.clientHeight; pointer.target = 1; };
    const leave = () => { pointer.target = 0; };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); };
  }, []);

  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <canvas ref={canvasRef} role="img" aria-label="Grid that warps under the pointer" className="h-full w-full text-zinc-300 dark:text-zinc-700" />
      <p className="pointer-events-none absolute bottom-4 left-5 text-sm font-medium text-zinc-500">Move your pointer across the grid</p>
    </div>
  );
}
