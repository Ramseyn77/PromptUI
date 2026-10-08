/**
 * @registry
 * name: Flickering Grid
 * category: Shaders
 * style: Minimal
 * tags: featured, recent
 * description: Grille de petits carrés qui scintillent aléatoirement, avec fondu radial, sur canvas.
 * prompt: Create a canvas flickering grid background: 4px squares on a 6px pitch, each with its own opacity that randomly re-rolls (probability per frame) to create a subtle shimmer; teal squares fade out toward the edges with a radial CSS mask; centered headline on top. Uses the theme to pick square color (zinc in light, teal in dark). DPR-aware, paused off screen, single static frame with reduced motion.
 */
'use client';
import { useEffect, useRef } from 'react';

export function FlickeringGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const size = 4;
    const pitch = 6;
    let cells = new Float32Array(0);
    let columns = 0;
    let rows = 0;
    let raf = 0;
    let visible = true;
    let last = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.ceil(canvas.clientWidth / pitch);
      rows = Math.ceil(canvas.clientHeight / pitch);
      cells = Float32Array.from({ length: columns * rows }, () => Math.random() * 0.3);
    };

    const draw = (time = 0) => {
      if (time - last > 60 || still) {
        last = time;
        const dark = !!canvas.closest('.dark');
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        context.fillStyle = dark ? '#2dd4bf' : '#3f3f46';
        for (let index = 0; index < cells.length; index++) {
          if (!still && Math.random() < 0.04) cells[index] = Math.random() * 0.35;
          context.globalAlpha = cells[index];
          context.fillRect((index % columns) * pitch, Math.floor(index / columns) * pitch, size, size);
        }
        context.globalAlpha = 1;
      }
      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    // Resizing clears the canvas: redraw one frame if the loop is paused (off screen or reduced motion).
    const observer = new ResizeObserver(() => { resize(); if (still || !visible) draw(); });
    observer.observe(canvas);
    resize();
    draw();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); };
  }, []);

  return (
    <div className="relative grid h-72 w-full max-w-xl place-items-center overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <div className="relative text-center">
        <p className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Flickering Grid</p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Quiet motion for hero backgrounds.</p>
      </div>
    </div>
  );
}
